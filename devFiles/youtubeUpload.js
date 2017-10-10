const Youtube = require("youtube-api")
const fs = require("fs")
const readJson = require("r-json")
const Lien = require("lien")
const Logger = require("bug-killer")
const opn = require("opn")
const prettyBytes = require("pretty-bytes")
const path = require("path")
const async = require("async")

const models = require("../models")

// I downloaded the file from OAuth2 -> Download JSON
const CREDENTIALS = readJson(`${__dirname}/credentials.json`)

// Init lien server
let server = new Lien({
  host: "localhost",
  port: 3000
})

// Authenticate
// You can access the Youtube resources via OAuth2 only.
// https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
let oauth = Youtube.authenticate({
  type: "oauth",
  client_id: CREDENTIALS.web.client_id,
  client_secret: CREDENTIALS.web.client_secret,
  redirect_url: CREDENTIALS.web.redirect_uris[0]
})

opn(
  oauth.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.upload"]
  })
)

// Handle oauth2 callback
server.addPage("/oauth2callback", lien => {
  Logger.log("Trying to get the token using the following code: " + lien.query.code)
  oauth.getToken(lien.query.code, (err, tokens) => {
    if (err) {
      lien.lien(err, 400)
      return Logger.log(err)
    }

    Logger.log("Got the tokens.")

    oauth.setCredentials(tokens)

    lien.end(
      "The video is being uploaded. Check out the logs in the terminal. You're youtube thing for videos is https://www.youtube.com/my_videos?o=U&sq="
    )

    const uploadVideo = (fileName, next) => {
      // format: apple.mp4
      const title = fileName.replace(".mp4", "").replace(/_/g, " ")
      const filePath = "../10/" + fileName

      let description = "ASL sign for " + title || "video upload via YouTube API"
      var req = Youtube.videos.insert(
        {
          resource: {
            // Video title and description
            snippet: {
              categoryId: "27",
              title: title,
              description: description
            },
            // I don't want to spam my subscribers
            status: {
              privacyStatus: "unlisted"
            }
          },
          // This is for the callback function
          part: "snippet,status",

          // Create the readable stream to upload the video
          media: {
            body: fs.createReadStream(filePath)
          }
        },
        (err, data) => {
          console.log(err)
          const newVideo = models.Videos
            .build({
              videoURL: "https://www.youtube.com/watch?v=" + data.id,
              dominateHand: "",
              nonDominateHand: "",
              orientation: "",
              location: "",
              movement: "",
              expression: ""
            })
            .save()
            .then(databaseASLStrong => {
              const newWordsAndCats = models.CategoriesAndWords
                .build({
                  videoId: databaseASLStrong.id,
                  categories: [],
                  words: [title]
                })
                .save()
                .then(databaseASLStrong2 => {
                  console.log("yay!!")
                  if (next) {
                    next()
                  }
                })
            })
            .catch(err => {
              console.log(err)
            })
        }
      )

      setInterval(function() {
        Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded.`)
      }, 250)
    }

    // get all files in that folder

    var tasks = fs
      .readdirSync("../10")
      .filter(file => path.extname(file) === ".mp4")
      .map(file => {
        return next => {
          console.log("You are now here")
          uploadVideo(file, next)
        }
      })
    // loop over them and upload each one,
    console.log("test", typeof tasks[0], tasks.length, tasks)
    async.waterfall(tasks, err => {
      console.log("donezo")
      process.exit()
    })
  })
})
// videoId: DataTypes.INTEGER,
// categories: DataTypes.ARRAY(DataTypes.STRING),
// words: DataTypes.ARRAY(DataTypes.STRING)

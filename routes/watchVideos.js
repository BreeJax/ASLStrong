var express = require("express")
var watchVideos = express.Router()

/* GET users listing. */
watchVideos.get("/", function(req, res, next) {
  res.send("respond with a resource")
})

module.exports = watchVideos

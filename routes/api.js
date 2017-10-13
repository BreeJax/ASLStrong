const express = require("express")
const api = express.Router()
const Sequelize = require("sequelize")
const models = require("../models")
const sequelize = models.sequelize

/**
 * @api {get} /api/allwords getting all of the words(in array form) and their corresponding video Id, along with their categories(in array form)
 * @apiName get-all-words
 * @apiGroup search by English words
 *
 * @apiSuccess {Array} words Array of objects tht have words and videoId.
 * @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "words": [
          {
            "words": [
              "point of interest"
            ],
            "videoId": 41
            }
          ]
*     }
 */
////Getting all of the words
api.get("/allwords", (req, res) => {
  models.CategoriesAndWords
    .findAll({ attributes: ["words", "videoId", "categories"] })
    .then(words => {
      res.json({ words })
    })
    .catch(err => {
      console.log(err)
    })
})

/**
 * @api {get} /api/letter/:letter getting all arrays with a word starting with a searched letter in it
 * @apiName get-all-words-starting-with-letter
 * @apiGroup search by English words
 *
 * @apiSuccess {Array} words Array of objects tht have words and categories.
 * @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "words": [
            {
            "id": 12,
            "videoId": 17,
            "categories": [
              "Nature",
              "Geography",
              "ASL For Baby"
            ],
            "words": [
              "Beach"
            ],{
            "id": 21,
            "videoId": 26,
            "categories": [
            "Animals"
            ],
            "words": [
              "Bee"
            ],
            "createdAt": "2017-10-06T21:04:48.575Z",
            "updatedAt": "2017-10-06T21:04:48.575Z"
            },

          },
          ]
*     }
 */

api.get("/letter/:letter", (req, res) => {
  const letter = req.params.letter
  const Op = Sequelize.Op
  const query =
    'SELECT word_list.*  FROM   "CategoriesAndWords" word_list, unnest(words) unnested_word WHERE  lower(unnested_word) ILIKE :letter;'

  sequelize
    .query(query, {
      replacements: { letter: letter + "%" },
      type: Sequelize.QueryTypes.SELECT
    })
    .then(words => {
      return res.json({ words })
    })
    .catch(err => res.json(err))
})
/**
 * @api {get} /api/categories getting all available categories found in the table
 * @apiName get-all-categories-in-table
 * @apiGroup search by Categories
 *
 * @apiSuccess {Array} words Array of words that belong to Categories- non repeating.
 * @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*
*       [
          "Alphabet",
          "Animals",
          "ASL For Baby",
          "Baby",
          "Body",
          "Clothes",
          "Country",
          "Family",
          "Food",
          "Geography",
          "Health",
          "Holidays",
          "House",
          "Music",
          "Nature",
          "occupations",
          "Recreation",
          "Religious",
          "School",
          "Time",
          "Wedding"
        ]
*
 */

//Getting the list of categories
api.get("/categories", (req, res) => {
  const flatten = arr => {
    return arr.reduce(function(flat, toFlatten) {
      return flat.concat(toFlatten.categories)
    }, [])
  }

  const distinct = arr => {
    let rv = Array.from(new Set(arr))
    return rv
  }
  const sort = (a, b) => {
    console.log({ a, b })
    var nameA = a.toUpperCase() // ignore upper and lowercase
    var nameB = b.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    // names must be equal
    return 0
  }

  models.CategoriesAndWords
    .findAll({ order: [["categories", "ASC"]], attributes: ["categories"] })
    .then(categories => {
      res.json(distinct(flatten(categories)).sort(sort))
    })
    .catch(err => {
      res.json(err)
    })
})
/**
 * @api {get} /api/word/:wordid getting specific word array and all info associated with it by it's specific id (not including category).
 * @apiName get-all-words-by-id-with-url-and-HOLMEs
 * @apiGroup search by English words
 *
 * @apiSuccess {Array} words Array of objects tht have words and categories.
 * @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
{
  "words": {
    "words": [
      "yard measurement"
      ],
      "videoId": 111
      },
      "video": {
        "id": 111,
        "videoURL": "https://www.youtube.com/watch?v=OzRwnJEjXBU",
        "dominateHand": "",
        "nonDominateHand": "",
        "orientation": "",
        "location": "",
        "movement": "",
        "expression": "",
        "createdAt": "2017-10-09T16:04:35.443Z",
        "updatedAt": "2017-10-09T16:04:35.443Z"
      }
}
 */

//get just the word and the video ID- after commit, adding Video info
api.get("/word/:wordid", (req, res) => {
  const id = parseInt(req.params.wordid)

  models.CategoriesAndWords
    .findOne({ where: { id: id }, attributes: ["words", "videoId"] })
    .then(words => {
      models.Videos.findOne({ where: { id: words.videoId } }).then(video => {
        res.json({ words, video })
      })
    })
    .catch(err => {
      console.log(err)
    })
})
/**
 * @api {get} /api/categories/:category getting all of the words by their category
 * @apiName get-all-words-by-their-category
 * @apiGroup search by Categories
 *
 * @apiSuccess {Array} words Array of objects tht have words and videoId.
 * @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
        "info": [
          {
            "id": 30,
            "videoId": 35,
            "categories": [
            "Food",
            "ASL For Baby"
          ],
          "words": [
            "Soup"
          ],
          "createdAt": "2017-10-07T18:45:12.518Z",
          "updatedAt": "2017-10-07T18:45:12.518Z"
          },
        {
        "id": 35,
        "videoId": 40,
        "categories": [
        "Food"
        ],
        "words": [
          "Sour"
        ],
        "createdAt": "2017-10-07T18:45:14.017Z",
        "updatedAt": "2017-10-07T18:45:14.017Z"
        },*
      }
 */

//Get words the belong to a particular category
api.get("/categories/:category", (req, res) => {
  const categoryWord = req.params.category
  console.log("searching for", categoryWord)
  const Op = Sequelize.Op
  models.CategoriesAndWords.findAll({ where: { categories: { [Op.contains]: [categoryWord] } } }).then(info => {
    res.json({ info })
  })
})

// api.get("/categories/:word", (req, res) => {
//   const _word = req.params.word
//   console.log("searching for", categoryWord)
//   const Op = Sequelize.Op
//   models.CategoriesAndWords.findAll({ where: { words: { [Op.contains]: [_word] } } }).then(info => {
//     res.json(info)
//   })
// })
api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

module.exports = api

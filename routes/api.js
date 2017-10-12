const express = require("express")
const api = express.Router()
const Sequelize = require("sequelize")
const models = require("../models")
const sequelize = models.sequelize

/**
 * @api {get} /api/allwords getting all of the words and their corresponding video Id
 * @apiName aslstrongapi
 *
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
////Getting all of the words
api.get("/allwords", (req, res) => {
  const flatten = arr => {
    return arr.reduce(function(flat, toFlatten) {
      return flat.concat(toFlatten.words)
    }, [])
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
    .findAll({ attributes: ["words", "videoId"] })
    .then(words => {
      res.json(words)
    })
    .catch(err => {
      console.log(err)
    })
})

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
      return res.json(words)
    })
    .catch(err => res.json(err))
})

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

//Get words the belong to a particular category
api.get("/categories/:category", (req, res) => {
  const categoryWord = req.params.category
  console.log("searching for", categoryWord)
  const Op = Sequelize.Op
  models.CategoriesAndWords.findAll({ where: { categories: { [Op.contains]: [categoryWord] } } }).then(info => {
    res.json(info)
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

////Please see the changes git

module.exports = api

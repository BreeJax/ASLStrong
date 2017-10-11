const express = require("express")
const api = express.Router()
const Sequelize = require("sequelize")
const models = require("../models")

/* GET users listing. */
api.get("/", function(req, res, next) {
  res.json({ hellow: "wordl" })
})

////Getting all of the words
api.get("/allwords", (req, res) => {
  models.CategoriesAndWords
    .findAll({ attributes: ["words"] })
    .then(words => {
      res.json(words)
    })
    .catch(err => {
      console.log(err)
    })
})

// api.get("allwords/:letter", (req, res) => {})

//get just the word and the video ID- after commit, adding Video info
api.get("/allwords/:id", (req, res) => {
  const id = parseInt(req.params.id)
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

  models.CategoriesAndWords
    .findAll({ order: [["categories", "ASC"]], attributes: ["categories"] })
    .then(categories => {
      res.json(distinct(flatten(categories)))
    })
    .catch(err => {
      console.log(err)
    })
})

//Get words via category
api.get("/categories/:category", (req, res) => {
  const categoryWord = req.params.category
  console.log("searching for", categoryWord)
  const Op = Sequelize.Op
  models.CategoriesAndWords.findAll({ where: { categories: { [Op.contains]: [categoryWord] } } }).then(info => {
    res.json(info)
  })
})

module.exports = api

const express = require("express")
const api = express.Router()

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

//get just the word and the video ID- after commit, adding Video info
api.get("/allwords/:id", (req, res) => {
  const id = parseInt(req.params.id)
  models.CategoriesAndWords
    .findOne({ where: { id: id }, attributes: ["words", "videoId"] })
    .then(words => {
      res.json(words)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = api

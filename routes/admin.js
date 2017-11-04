const express = require("express")
const admin = express.Router()
const Sequelize = require("sequelize")
const models = require("../models")
const sequelize = models.sequelize

admin.get("/addVideo", function(req, res, next) {
  res.render("adminAddVideo", { title: "Express" })
})

module.exports = admin

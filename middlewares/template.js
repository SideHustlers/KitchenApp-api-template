'use strict'

// An example middleware file

const models = require('../models');
const responses = require('../helpers/responses');

module.exports = {
  checkIfEmailExists: async function(req, res, next) {
    try {
      let template = await models.User.findOne({
        where: {
          id: req.body.id
        }
      });
      if (template) {
        return responses.returnBadRequest(req, res, "Template with that id already exists");
      } else {
        next();
      }
    }
    catch (err) {
      console.log(err);
      return responses.returnBadRequest(req, res, "Something went wrong, please try again.");
    }
  }
}
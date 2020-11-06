'use strict'

// An example route file

const express = require('express');
const router = express.Router();
const bodyValidator = require('express-validation');

const models = require('../models');
const cleaner = require('../helpers/cleaner');
const authMiddleware = require('../middlewares/auth');
const responses = require('../helpers/responses');
const newTemplateBody = require('../validation/new_template');
const updateTemplateBody = require('../validation/update_template');

router.post('/create', 
  authMiddleware.verifyAccessToken,
  bodyValidator(newTemplateBody),
  async function(req, res) {
    try {
      let template = await models.Template.create({
        label: req.body.label
      });
      return responses.returnSuccessResponse(req, res, true, template);
    } catch (error) {
      console.log(error);
      return responses.returnBadRequest(req, res, "Something went wrong");
    }
  }
);

router.get('/:id', 
  authMiddleware.verifyAccessToken,
  async function(req, res) {
    try {
    let template = await models.Template.findOne({
        where: {
          template_id: req.params.id
        }
      });
      return responses.returnSuccessResponse(req, res, true, template);
    } catch (error) {
      console.log(error);
      return responses.returnBadRequest(req, res, "Something went wrong");
    }
  }
)

router.put('/:id/update',
  authMiddleware.verifyAccessToken,
  bodyValidator(updateTemplateBody),
  async function(req, res) {
    try {
      let template = await models.Template.findOne({
        where: {
          template_id: req.params.id
        }
      })
      let templateUpdate = {
        label: req.body.label
      };
      let clean = cleaner.clean(templateUpdate);
      template = await template.update(clean);
      return responses.returnSuccessResponse(req, res, true, template);
      
    } catch (error) {
      console.log(error);
      return responses.returnBadRequest(req, res, "Something went wrong");
    }
  }
);

module.exports = router;
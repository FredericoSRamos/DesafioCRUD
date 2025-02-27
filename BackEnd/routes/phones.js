var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Phones = require('../models/phones');
const { phoneSchema } = require('../phoneSchema');

router.use(bodyParser.json());

async function validatePhoneData(req, res, next) {
  try {
    await phoneSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Erro na validação dos dados do celular.',
      errors: error.inner.map(e => e.message)
    });
  }
}

router.route('/')
  .get(async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const phone = await Phones.find({});
      res.statusCode = 200;
      res.json(phone);
    } catch (err) {
      console.log(err);
      res.statusCode = 404;
      res.json({});
    }
  })
  .post(validatePhoneData, async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const phone = await Phones.create(req.body);
      res.statusCode = 200;
      res.json(phone);
    } catch (err) {
      console.log(err);
      res.statusCode = 404;
      res.json({});
    }
  });

router.route('/:id')
  .get(async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const phone = await Phones.findById(req.params.id);
      if (phone != null) {
        res.statusCode = 200;
        res.json(phone);
      } else {
        let err = {};
        res.statusCode = 404;
        res.json(err);
      }
    } catch (err) {
      console.log(err);
      res.statusCode = 404;
      res.json({});
    }
  })
  .put(validatePhoneData, async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const phone = await Phones.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      });
      res.statusCode = 200;
      res.json(phone);
    } catch (err) {
      console.log(err);
      res.statusCode = 404;
      res.json({});
    }
  })
  .delete(async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const response = await Phones.findByIdAndDelete(req.params.id);
      res.statusCode = 200;
      res.json(response.id);
    } catch (err) {
      console.log(err);
      res.statusCode = 404;
      res.json({});
    }
  });

module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Models
const { User, UserType } = require('../helper/db');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res) => {
  const { email, password, user_type_id, name } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = {
      email,
      password: hash,
      user_type_id,
      name
    };

    User.findOne({ where: { email } }).then((user) => {
      if (user) {
        res.json({
          result: false,
          message: 'already'
        });
        exit = true;
      }
    });

    const promise = User.create(user);

    promise.then((user) => {

      const token = jwt.sign({ user_id: user.user_id, user_type_id: user.user_type_id, status: user.status, name: user.name }, req.app.get('api_secret_key'), {
        expiresIn: 43200
      });

      res.json({
        result: { user_id: user.user_id, user_type_id: user.user_type_id, status: user.status, name: user.name },
        token
      });
    }).catch((err) => {
      res.json(err);
    });
  });

});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user) {
      res.json({
        result: false,
        message: 'not_found'
      });
    } else {


      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            result: false,
            message: 'wrong'
          });
        } else {
          if (!user.status) {
            res.json({
              result: false,
              message: 'ban'
            });
          } else {
            const token = jwt.sign({ user_id: user.user_id, user_type_id: user.user_type_id, status: user.status, name: user.name }, req.app.get('api_secret_key'), {
              expiresIn: 43200
            });

            res.json({
              result: true,
              token
            });
          }


        }
      });


    }
  }, (err) => {
    throw err;
  });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");

const router = express.Router();

const registerInputValidate = require("../../inputFieldValidation/registerValidation");
const loginInputValidate = require("../../inputFieldValidation/loginValidation");

const User = require("../../models/Users");

router.post("/register", (req, res) => {
  const { errors, isValid } = registerInputValidate(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = loginInputValidate(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 7200 }, 
            (err, token) => {
              res.json({
                success: true,
                token: token
              });
            }
          );
        } else {
          errors.password = "Wrong Password";
          return res.status(400).json(errors);
        }
      });
  });
});

router.get('/show_users', function(req, res) {
    User.find({},function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

module.exports = router;

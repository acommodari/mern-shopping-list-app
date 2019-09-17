const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const jwtSecret = require('../../config/config').jwtSecret;

const route = express.Router();

module.exports = app => {
  app.use('/users', route);

  /**
   * @route POST api/users
   * @desc  Register New User
   * @acess Public
   */
  route.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        const savedUser = await newUser.save();
        jwt.sign(
          {
            id: savedUser.id
          },
          jwtSecret,
          { expiresIn: 3600 }, // 1 hr
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({
              token,
              user: {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email
              }
            });
          }
        );
      });
    });
  });
};

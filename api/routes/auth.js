const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const jwtSecret = require('../../config/config').jwtSecret;
const isAuth = require('../middleware/isAuth');

const route = express.Router();

module.exports = app => {
  app.use('/auth', route);

  /**
   * @route POST api/auth
   * @desc  Auth User
   * @acess Public
   */
  route.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: 'Invalid credentials' });
    }

    jwt.sign(
      {
        id: user.id
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
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      }
    );
  });

  /**
   * @route GET api/auth/user
   * @desc  Get User Date
   * @acess Private
   */
  route.get('/user', isAuth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  });
};

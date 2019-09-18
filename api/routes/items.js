const express = require('express');
const Item = require('../../models/Item');
const isAuth = require('../middleware/isAuth');

const route = express.Router();

module.exports = app => {
  app.use('/items', route);

  /**
   * @route GET api/items
   * @desc  Get All Items
   * @acess Public
   */
  route.get('/', async (req, res) => {
    const items = await Item.find().sort({
      date: -1 // sort in descending order of date
    });

    res.json(items);
  });

  /**
   * @route POST api/items
   * @desc  Create An Item
   * @acess Private
   */
  route.post('/', isAuth, async (req, res) => {
    const newItem = new Item({
      name: req.body.name
    });

    const savedItem = await newItem.save();

    res.json(savedItem);
  });

  /**
   * @route DELETE api/items/:id
   * @desc  Delete An Item
   * @acess Private
   */
  route.delete('/:id', isAuth, async (req, res) => {
    await Item.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) {
        res.status(404).json({ success: false });
      } else {
        res.json({ sucess: true });
      }
    });
  });
};

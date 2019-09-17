const express = require('express');
const Item = require('../../models/Item');

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
   * @acess Public
   */
  route.post('/', async (req, res) => {
    const newItem = new Item({
      name: req.body.name
    });

    const savedItem = await newItem.save();

    res.json(savedItem);
  });

  /**
   * @route DELETE api/items/:id
   * @desc  Delete An Item
   * @acess Public
   */
  route.delete('/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) {
        res.status(404).json({ success: false });
      } else {
        res.json({ sucess: true });
      }
    });
  });
};

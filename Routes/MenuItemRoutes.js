const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem.js'); // Your Mongoose model

// 🔹 POST menu item
 router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
      console.log('Menu item saved');
      res.status(200).json(response);
    } catch (error) {
      console.error('Error saving menu item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  // 🔹 GET all menu items  
 router.get('/', async (req, res) => {
    try {
      const menuItems = await MenuItem.find();
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// 🔹 GET menu items by taste
router.get('/:taste', async (req, res) => {
    try {
      const taste = req.params.taste;
      
      if (taste === 'spicy' || taste === 'sweet' || taste === 'sour') {
        const menuItems = await MenuItem.find({ taste: taste });
        res.status(200).json(menuItems);
      } else {
        res.status(400).json({ error: 'Invalid taste type' });
      }
    } catch (error) {
      console.error('Error fetching menu items by taste:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  //comment added
  module.exports = router;
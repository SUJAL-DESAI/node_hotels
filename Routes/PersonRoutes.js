const express = require('express');
const router = express.Router();
const Person = require('./../models/Person.js'); // Your Mongoose model


// 🔹 POST person
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('Data saved');
    res.status(200).json(response);
  } catch (error) {
    console.error('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔹 GET all persons
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:workType', async (req,res) => {
  try{
    const workType = req.params.workType;
    if (workType == 'Chef' || workType == 'Waiter' || workType == 'Manager' ) {
      const persons = await Person.find({ work: workType });
      res.status(200).json(persons);
    } else {
      res.status(400).json({ error: 'Invalid work type' });
    }

  }catch (error) {
    console.error('Error fetching persons by work type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, { 
      new: true,
      runValidators: true,
    })
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('Person updated');
    res.status(200).json(response);
  
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    } else {        
      console.log('Person deleted');
      res.status(200).json({ message: 'Person deleted successfully' });
    } 
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
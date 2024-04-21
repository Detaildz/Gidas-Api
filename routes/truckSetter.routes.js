const { Router } = require('express');
const { truckCreate } = require('../controllers');

const Truck = require('../models/truckModel');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const {
      customId,
      category,
      week,
      carrier,
      truckNumber,
      price,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      inputsDisabled,
    } = req.body;

    const newTruck = new Truck({
      customId,
      category,
      week,
      carrier,
      truckNumber,
      price,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      inputsDisabled,
    });

    await newTruck.save();

    res.status(201).json(newTruck);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const customId = req.params.id;
    const updateFields = req.body;
    const updatedTruck = await Truck.findOneAndUpdate(
      { customId: customId },
      updateFields,
      { new: true }
    );

    if (!updatedTruck) {
      return res.status(404).json({ error: 'Truck not found' });
    }

    res.status(200).json(updatedTruck);
  } catch (error) {
    console.error('Error updating truck:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

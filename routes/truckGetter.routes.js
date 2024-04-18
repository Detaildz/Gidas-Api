const { Router } = require('express');
const { truckGetByID, trucksGet } = require('../controllers');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await trucksGet();
    res.status(200).json(data);
    return 'Found';
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const customId = req.params.id;
    const data = await truckGetByID(customId);
    console.log('Custom id:', customId);
    res.status(200).json(data);
    return 'Found';
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const truck = await truckGetByID(req.params.id);
    await truck.deleteOne();
    res.status(200).json({ message: 'Truck deleted successfully' });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

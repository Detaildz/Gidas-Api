const { Router } = require('express');
const { userCreate, userLogin } = require('../controllers');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = await userCreate(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await userLogin(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

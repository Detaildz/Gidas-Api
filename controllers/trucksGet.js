const Truck = require('../models/truckModel');

async function trucksGet() {
  try {
    const trucks = await Truck.find();
    return trucks;
  } catch (error) {
    console.log('Error:', error.message);
    throw error;
  }
}

module.exports = trucksGet;

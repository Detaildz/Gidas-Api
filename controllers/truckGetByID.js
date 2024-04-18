const Truck = require('../models/truckModel');

async function truckGetByID(customId) {
  try {
    const truck = await Truck.findOne({ customId });
    if (!truck) {
      throw new Error('Truck not found');
    }
    return truck;
  } catch (error) {
    console.log('Error:', error.message);
    throw error;
  }
}

module.exports = truckGetByID;

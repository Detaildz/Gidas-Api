const Truck = require('../models/truckModel');

async function truckCreate(props) {
  try {
    // Check if a document with the same customId already exists
    const existingTruck = await Truck.findOne({ customId: props.customId });
    if (existingTruck) {
      throw new Error(
        `A truck with customId ${props.customId} already exists.`
      );
    }

    // If no existing document found, create and save the new truck
    const newTruck = new Truck({
      customId: props.customId,
      ...props,
    });

    await newTruck.save();

    console.log('Truck created:', newTruck);
    return newTruck;
  } catch (error) {
    console.error('Error creating truck:', error);
    throw error;
  }
}

module.exports = truckCreate;

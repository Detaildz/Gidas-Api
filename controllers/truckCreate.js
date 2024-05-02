const Truck = require('../models/truckModel');

async function truckCreate(props) {
  try {
    const existingTruck = await Truck.findOne({ customId: props.customId });
    if (existingTruck) {
      throw new Error(
        `A truck with customId ${props.customId} already exists.`
      );
    }

    const newTruck = new Truck({
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

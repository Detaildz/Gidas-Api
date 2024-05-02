const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  customId: { type: Number, unique: true, required: true },
  week: { type: Number, required: true },
  category: {
    type: String,
    required: true,
  },
  country: { type: String, required: true },
  carrier: { type: String },
  truckNumber: { type: String },
  price: { type: String },
  monday: { type: String },
  tuesday: { type: String },
  wednesday: { type: String },
  thursday: { type: String },
  friday: { type: String },
  saturday: { type: String },
  sunday: { type: String },
  inputsDisabled: { type: Boolean },
});

const Truck = mongoose.model('Truck', truckSchema);
module.exports = Truck;

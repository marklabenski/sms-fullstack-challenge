const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const cityContractSchema = new Schema({
  id: { type: Number, unique: true, dropDubs: true },
  city: { type: String, required: true },
  start_date: { type: Date },
  end_date: { type: Date },
  price: { type: String, required: true },
  status: { type: String },
  color: { type: String, match: /#[0-9a-fA-F]{6}/ },
});

// add paginate plugin
cityContractSchema.plugin(mongoosePaginate);

// change float values with variable length to fixed length currency strings
cityContractSchema.path('price').set((value) => {
  let returnNumber = 0;
  if (typeof value === 'number') {
    returnNumber = value.toFixed(2);
  } else {
    returnNumber = parseInt(value, 10).toFixed(2);
  }
  return returnNumber.toString();
});

module.exports = mongoose.model('CityContract', cityContractSchema);

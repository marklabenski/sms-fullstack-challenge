const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// {"id":1,"city":"Neftegorsk",
// "start_date":"4/13/2013","end_date":"5/18/2013",
// "price":"55.82","status":"Seldom",
// "color":"#fd4e19"},

const cityContractSchema = new Schema({
  id: { type: Number },
  city: { type: String, required: true },
  start_date: { type: Date },
  end_date: { type: Date },
  price: { type: Number, required: true },
  status: { type: String },
  color: { type: String, match: /#[0-9a-fA-F]{6}/ },
});

cityContractSchema.path('price').set(value => value.toFixed(2));

module.exports = mongoose.model('CityContract', cityContractSchema);

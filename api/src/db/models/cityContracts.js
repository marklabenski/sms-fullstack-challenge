const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
// {"id":1,"city":"Neftegorsk",
// "start_date":"4/13/2013","end_date":"5/18/2013",
// "price":"55.82","status":"Seldom",
// "color":"#fd4e19"},

const cityContractSchema = new Schema({
  id: { type: Number, unique: true, dropDubs: true },
  city: { type: String, required: true },
  start_date: { type: Date },
  end_date: { type: Date },
  price: { type: String, required: true },
  status: { type: String },
  color: { type: String, match: /#[0-9a-fA-F]{6}/ },
});
cityContractSchema.plugin(mongoosePaginate);

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

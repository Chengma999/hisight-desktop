let mongoose = require('mongoose');

let closedaySchema = mongoose.Schema({
  closeday: {
    type: [Number],
    require:true
  }
},
{
  collection: 'closeday'

});

let Bezorgstatus = module.exports = mongoose.model('Closeday', closedaySchema);

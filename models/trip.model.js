const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema ({
  title: String,
  description: String,
  themes: String,
  continent: String,
  pays: String,
  maps: {
    latitude: String,
    longitude: String
  },
  typeTrip: String,
  status: String,
  destination: String,
  date_from: Date,
  date_to: Date,
  Days: Array,
  spotedIn: Number,
  spotedOut: Number,
  price: Number,
  included: Array,
  exclusion: Array,
  blogger: {
    idUser: {type:  Schema.Types.ObjectId, ref:'User'},
    first_name: String,
    last_name: String,
    username: String,
    pictureUrl: String
  },
  pictures: {
    cover: String,
    other: Array,
    area: Array
  },
  participants: [
    {
      idUser: {type:  Schema.Types.ObjectId, ref:'User'},
      first_name: String,
      last_name: String,
      username: String,
      pictureUrl: String
    }
  ],
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
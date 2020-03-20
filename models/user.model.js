var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String,
    adresse: String,
    code_postal: String,
    ville: String,
    gouvernement: String,
    pays: String,
    telephone: String,
    date_naissance: Date,
    role: String,
    type_account: String,
    profilePictureUrl: String,
    last_signIn: Date,
    last_signOut: Date,
    isConnected: Boolean,
    activated: Boolean,
    createdAt: Date,
    updatedAt: Date,
    linkedAccount: [],
    notification: [],
    note: {},
    trips: [],
    ownerTrips: [{
        trip: Object
    }],
    wallet: Number,
    history: {}
})

var User = mongoose.model('User', userSchema);

module.exports = User
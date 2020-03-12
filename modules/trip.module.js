const Trip = require('../models/trip.model.js')
const User = require('../models/user.model.js')

module.exports.addTrip = (trip) => {
  return new Promise((resolve, reject) => {
    let newTrip = new Trip(trip)
    newTrip.save((err, res) => {
      if(err) reject(err)
      else {
        resolve(res)
      }
    })
  })
}

module.exports.updateTrip = () => {
  return new Promise((resolve, reject) => {

  })
}

module.exports.deleteTrip = (id) => {
  return new Promise((resolve, reject) => {
    Trip.remove({_id: id}).then(data => {
      resolve(data)
    }).catch(err => reject(err))
  })
}

module.exports.getAllTrips = () => {
  return new Promise((resolve, reject) => {
    Trip.find().then(data => {
      if(data && data.length && data.length > 0) {
        resolve(data)
      }else {
        resolve('no trips here')
      }
    }).catch(err => reject(err))
  })
}

module.exports.getTripById = ( id ) => {
  return new Promise((resolve, reject) => {
    Trip.findOne({_id: id}).then(data => {
      if(data && data.length && data.length > 0) {
        resolve(data)
      }else {
        resolve('trip not found')
      }
    }).catch(err => reject(err))
  })
}

module.exports.getAllPastTrips = () => {
  return new Promise((resolve, reject) => {
    Trip.find({typeTrip: 'past'}).then(data => {
      if(data && data.length && data.length > 0) {
        resolve(data)
      }else {
        resolve('no past trip here')
      }
    }).catch(err => reject(err))
  })
}

module.exports.getAllUpcomingTrips = () => {
  return new Promise((resolve, reject) => {
    Trip.find({typeTrip: 'upcoming'}).then(data => {
      if(data && data.length && data.length > 0) {
        resolve(data)
      }else {
        resolve('no upcoming trip here')
      }
    }).catch(err => reject(err))
  })
}

module.exports.getAllNoTagsTrips = () => {
  return new Promise((resolve, reject) => {
    Trip.find({typeTrip: 'notags'}).then(data => {
      if(data && data.length && data.length > 0) {
        resolve(data)
      }else {
        resolve('no upcoming trip here')
      }
    }).catch(err => reject(err))
  })
}

module.exports.getAllUpcomingConfirmedTrips = () => {
  return new Promise((resolve, reject) => {
    Trip.find({typeTrip: 'upcoming', status: 'confirmed'}).then(data => {
      if(data && data.length && data.length > 0) {
        resolve(data)
      }else {
        resolve('no upcoming trip here')
      }
    }).catch(err => reject(err))
  })
}

module.exports.getAllUpcomingFullyBookedTrips = () => {
  return new Promise((resolve, reject) => {
    Trip.find({typeTrip: 'upcoming', status: 'fully_booked'}).then(data => {
      if(data && data.length && data.length > 0) {
        resolve(data)
      }else {
        resolve('no upcoming trip here')
      }
    }).catch(err => reject(err))
  })
}

module.exports.getAllTripByIdBlogger = (id) => {
  return new Promise((resolve, reject) => {
    Trip.findOne( {"blogger.idUser": id}).then(data => {
      if(data && data.length && data.length > 0) {
        resolve(data)
      }else {
        resolve('You dont have any trip')
      }
    }).catch(err => reject(err))
  })
}
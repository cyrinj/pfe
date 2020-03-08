const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');












module.exports.getInfoFromToken = (token) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.decode(token);
        User.find({ email: decoded.email }).then(data => {
            if (data && data.length && data.length > 0) {
                resolve(data[0])
            } else {
                reject('user not Founnd')
            }
        })
    });
}

module.exports.getImageProfileById = (id) => {
    return new Promise((resolve, reject) => {
        User.find({ _id: id }).then(data => {
            let urlImg = data[0].profilePictureUrl
            resolve(urlImg)
        })
    })
}

module.exports.changePassword = (email, password, newPassword) => {
    return new Promise((resolve, reject) => {
        User.find({ email: email }).then((data) => {
            if (data !== null && data.length && data.length > 0) {
                if (data[0].password === password) {
                    let user = new Object();
                    user = data[0];
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(newPassword, salt);
                    user.password = hash;
                    user.salt = salt;
                    user.updatedAt = Date.now()
                    let id = user._id;
                    User.findByIdAndUpdate({ _id: id }, user).then(() => {
                        user._id = id;
                        resolve(user);
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    let msg = "mot de passe erroné"
                    reject(msg);
                }
            } else {
                let msg = "utilisateur n'existe pas"
                reject(msg);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports.updateInfoUser = (id, user) => {
    return new Promise((resolve, reject) => {
        User.find({ _id: id }).then((data) => {
            if (typeof data == undefined && data == null) {
                reject("utilisateur n'existe pas")
            } else {
                let upUser = data[0]
                upUser.first_name = user.first_name
                upUser.last_name = user.last_name
                upUser.username = user.username
                if (upUser.email != user.email) {
                    User.find({ email: user.email }).then(userExist => {
                        if (userExist && userExist.length && userExist.length > 0) {
                            reject("mail existe deja")
                        } else {
                            upUser.email = user.email
                            upUser.updatedAt = Date.now()
                            User.findOneAndUpdate({ _id: upUser._id }, upUser, { new: true }).then(response => {
                                resolve(upUser)
                            })
                        }
                    })
                } else {
                    user.updatedAt = Date.now()
                    User.findOneAndUpdate({ _id: user._id }, user, (err, userUp) => {
                        if (err) reject('mise a jour erroné')
                        else {
                            resolve(user)
                        }
                    })
                }
            }
        })
    })
}

module.exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find().then(data => {
            let list = []
            if (data && data.length && data.length > 0) {
                data.forEach((elm, index) => {
                    if (elm.role != 'admin' || elm.role != 'professeurva') {
                        list.push(elm)
                    }
                    if (data.length == (index + 1)) {
                        resolve(list)
                    }
                })
            }
        })
    })
}

module.exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.find({ _id: id }).then(data => {
            if (data && data.length && data.length > 0) {
                resolve(data[0])
            } else {
                reject('User NOt Found ')
            }
        })
    })
}
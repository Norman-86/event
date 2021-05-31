const User = require('../models/user');
const bcrypt = require('bcryptjs');
let password = 'a1b2c3'

exports.seedAdmin = () => {
//check if admin account exists
    User.findOne({ role: 'admin' }, (err, admin) => {
        if(err) throw err;
        if (admin) {
            return 'admin account already exists'
        }
        //if there's none, create admin account
        User.create({
            first_name: 'Park',
            last_name: 'Norman',
            username: 'thePark',
            email: 'park@nomail.org',
            role: 'admin'
        }, (err, user) => {
            if (err) throw err;
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save((err, savedUser) => {
                        if (err) throw err;
                        return 'admin account created successfully'
                    })
                })
            })
        })
    })
}

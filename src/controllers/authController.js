const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiry = Number(process.env.TOKEN_EXPIRY);

exports.registerNewUser = (req, res) => {
    // fetch user details from req.body
    // check if a user with this email exists
    User.findOne({ email: req.body.email }, (err, existingEmail) => {
        if (err) {
            return res.status(500).json({ err })
        }
        if (existingEmail) {
            return res.status(400).json({ message: 'this email already exists' })
        }
        //create new user
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
        }, (err, newUser) => {
            if (err) {
                return res.status(500).json({ err })
            }
            //hash newUser's password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({ err })
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).json({ err })
                    }
                    //save hashedPassword to the database
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if (err) {
                            return res.status(500).json({ err })
                        }
                        //create jwt for newUser
                        jwt.sign({
                            id: newUser._id,
                            first_name: newUser.first_name,
                            last_name: newUser.last_name,
                            username: newUser.username,
                            email: newUser.email,
                            role: newUser.role
                        }, secret, { expiresIn: expiry }, (err, token) => {
                            if (err) {
                                return res.status(500).json({ err })
                            }
                            //send token to the user
                            return res.status(200).json({ message: 'user registration successful', token })
                        })
                    })
                })
            })
        })
    })
};

exports.loginUser = (req, res) => {
    //check if user exists
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) {
           return res.status(500).json({ err })
        }
        if (!foundUser) {
           return  res.status(401).json({ message: 'incorrect email address' })
        }
        //check if password is correct
        let match = bcrypt.compareSync(req.body.password, foundUser.password);
        if (!match) {
            return res.status(401).json({ message: 'incorrect password' })
        }
        //create a token
        jwt.sign({
            id: foundUser._id,
            first_name: foundUser.first_name,
            last_name: foundUser.last_name,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role
        }, secret, { expiresIn: expiry }, (err, token) => {
            if (err) {
                return res.status(500).json({ err })
            } else {
                return res.status(200).json({ message: 'login successful', token })
            }
        })
    })
}
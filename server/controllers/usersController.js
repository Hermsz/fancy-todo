const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_TOKEN_ID)

class UserController {

    static findAll(req, res) {
        User
            .find({})
            .then(allUser => {
                res.status(200).json(allUser)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static findOne(req, res) {
        User
            .findById(req.params.id)
            .then(foundUser => {
                res.status(200).json(foundUser)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static webLogin(req, res) {
        User
            .findOne({
                'email': req.body.email
            })
            .then(foundUser => {
                if (!foundUser) {
                    res.status(401).json({
                        message: 'Invalid Email/Password'
                    })
                } else {
                    const verifyPassword = bcrypt.compareSync(req.body.password, foundUser.password)
                    if (!verifyPassword) {
                        res.status(401).json({
                            message: 'Wrong password'
                        })
                      } else {
                        let token = jwt.sign({
                          id: foundUser._id,
                          email: foundUser.email
                        }, process.env.JWT_SECRET)
                        req.headers.token = token
                        res.status(200).json({
                            token: token,
                            foundUser
                        })
                    }
                }
            })
            .catch(err => {
              console.log(err.message)
            })
    }

    static googleLogin(req, res) {
        let payload;
        client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_TOKEN_ID
            })
            .then(ticket => {
                payload = ticket.getPayload()
                const userId = payload['sub']
                return User
                    .findOne({
                        email: payload.email
                    })
            })
            .then(foundUser => {
                if (!foundUser) {
                    return User
                        .create({
                            email: payload.email,
                            fullName: payload.name,
                            profilePicture: payload.picture,
                            password: process.env.GOOGLE_SECRET
                        })
                        .then(registerUser => {
                            const token = jwt.sign({
                                    email: registerUser.email
                                }, process.env.JWT_SECRET)
                            res.status(200).json({
                              token,
                              registerUser
                            })
                        })
                } else {
                    const token = jwt.sign({
                                email: foundUser.email
                            },
                            process.env.JWT_SECRET)
                    res.status(200).json({
                        token: token,
                        fullName: foundUser.fullName,
                        email: foundUser.email,
                        password: foundUser.password,
                        userId: foundUser._id
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static register(req, res) {
        User
            .findOne({
                'email': req.body.email
            })
            .then(user => {
                if (user) {
                    res.status(401).json({
                        message: `Email Already exist. Please register using another email address`
                    })
                } else {
                    return User
                        .create({
                            fullName: `${req.body.firstName} ${req.body.lastName}`,
                            email: req.body.email,
                            password: req.body.password
                        })
                }
            })
            .then(newUser => {
                res.status(200).json(newUser)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController
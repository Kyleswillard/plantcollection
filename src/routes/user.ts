const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

// Create User
router.post('/', async (req, res) => {
    const user = req.body
    try {
        await user.save()
        const token = await user.generateAuth()
        res.status(201).send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Login User
router.post('/login', auth, async (req, res) => {
    try {
        const user = await User.findByCreds(
            req.body.userName,
            req.body.password
        )
        const token = user.generateAuth()
        res.send({ user, token })
    } catch (err) {
        res.status(400).send()
    }
})

// Logout User -  NEED TO AUTH MIDDLEWARE ONCE CREATED!!
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

// Logout ALL - NEED TO ADD AUTH MIDDLEWARE ONCE CREATED!!
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

// Get User - NEED TO ADD AUTH MIDDLEWARE ONCE CREATED!!
router.get('/me', auth, async (req, res) => {
    res.send(req.user)
})

// Delete User - NEED TO ADD AUTH MIDDLEWARE ONCE CREATED!!
router.delete('/', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (err) {
        res.status(500).send()
    }
})

module.exports = router

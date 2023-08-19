const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createToken = (_id) => {
    return jwt.sign({ _id }, "konso840kmn*72nddj11", { expiresIn: '3d' })
}
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const email = req.body.email
    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            isPublisher: false
        })
        const token = createToken(user._id)
        const email = req.body.email
        res.status(200).json({ email, token, success: true })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})
module.exports = router
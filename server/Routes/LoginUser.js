const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createToken = (_id) => {
    return jwt.sign({ _id }, "konso840kmn*72nddj11", { expiresIn: '3d' })
}
router.post('/loginuser', [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        // let user = [];
        const user = await User.find({
            email: req.body.email
        })
        if (user.length == 0) {
            return res.status(404).json({ errors: "User Not found" })
        }
        else {
            const check = await bcrypt.compare(req.body.password, user[0].password)
            if (check) {
                const token = createToken(user[0]._id)
                const email = user[0].email
                res.status(200).json({ email, token, success: true })
            }
            else {
                res.status(400).json({ message: "Incorrect Password", success: false })
            }
            console.log(check)
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})
module.exports = router
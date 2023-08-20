require('dotenv').config();
const express = require('express');
const app = express();
const mongoDB = require('./db')
const cors = require('cors');
const bodyParser = require('body-parser');
const webrtc = require("wrtc");
const User = require('./models/Users')
const forgotRouter = require("./Routes/forgotPass")
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
require("./socket")
const createToken = (_id, isPublisher) => {
    return jwt.sign({ _id, isPublisher }, secretKey, { expiresIn: '3d' })
}
let senderStream;
mongoDB();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",forgotRouter)
app.post("/consumer", async ({ body }, res) => {
    try {
        const peer = new webrtc.RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                }
            ]
        });
        const desc = new webrtc.RTCSessionDescription(body.sdp);
        await peer.setRemoteDescription(desc);
        senderStream.getTracks().forEach(track => peer.addTrack(track, senderStream));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        const payload = {
            sdp: peer.localDescription
        }
        console.log("OK");
        res.json(payload);
    } catch (err) {
        res.json({ message: "Currently there are no Live Streams" })
    }
});

app.post('/broadcast', async ({ body }, res) => {
    console.log("Working");
    const peer = new webrtc.RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            }
        ]
    });
    // console.log(peer);
    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
        sdp: peer.localDescription
    }
    console.log(payload);
    res.json(payload);
});

function handleTrackEvent(e, peer) {
    senderStream = e.streams[0];
};
app.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const email = req.body.email
    const name = req.body.name
    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email
        })
        const token = createToken(user._id, user.isPublisher)
        const email = req.body.email
        res.status(200).json({ name, email, token, success: true })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})
app.post('/loginuser', [
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
                const token = createToken(user[0]._id, user[0].isPublisher)
                const email = user[0].email
                const name = user[0].name
                const publisher = user[0].isPublisher
                res.status(200).json({ name, publisher, email, token, success: true })
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


app.listen(5000, () => console.log('server started'));
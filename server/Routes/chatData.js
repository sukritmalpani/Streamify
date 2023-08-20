const express = require("express")
require("../db")
const ChatModel = require("../models/chatModel.js")

const router = express.Router()

router.put("/",async (req,res)=>{
    try {
        const chatData = await ChatModel.findById(req.body._id)
        chatData.chat.push(req.body.message)
        res.json(resp)
    } catch (error) {
        res.json(error)
    }
})

router.post("/",async (req,res)=>{
    try {
        const newRoom = new ChatModel(req.body)
        await newRoom.save()
        res.json(newRoom)
    } catch (error) {
        res.json(error)
    }
})

router.get("/:chatId",async (req,res)=>{
    try {
        const resp = await ChatModel.findById(req.params.chatId , {_id:0})
        res.json(resp)
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:chatId", async (req, res) => {
    try {
        const chatId = req.params.chatId;
        console.log("got the id"+chatId)
        const chatData = await ChatModel.findById(chatId);
        chatData.chat = []; // Clear the chat messages array
        await chatData.save(); // Save the changes back to the database
        res.json(chatData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

const addChatMessage = async (data) => {
    try {
        const chatData = await ChatModel.findById(data.id)
        chatData.chat.push(data.message)
        await chatData.save()
    } catch (error) {
        console.log(error);
    }
};


module.exports = {router,addChatMessage}
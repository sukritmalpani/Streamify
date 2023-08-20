const express = require("express")
const chatRouterModule = require("./Routes/chatData")
const cors = require("cors")
const app = express()
// const server = require("http").Server(app)
const io = require("socket.io")(5001,{
    cors:{
        origin:["http://localhost:3000"]
    }
})

const { router:chatRouter , addChatMessage } = chatRouterModule

app.use(cors())
app.use(express.json())

app.use("/chats",chatRouter)

io.on("connection",(socket)=>{
    // console.log("User connected")
    // console.log(socket.id)
    socket.on("send-chat-message",(data)=>{
            socket.broadcast.emit("receive-chat-message",data)
    })
    socket.on("save-chat",(data)=>{
        addChatMessage(data)
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected")
    })
})

app.listen(3001)
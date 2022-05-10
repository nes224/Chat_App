const express = require('express')
const app = express()
const cors = require('cors')
const dotenv  =require('dotenv').config()
const port = 5000
const db = require('./models/chatUser')
const socket = require('socket.io')
app.use(cors())
app.use(express.json())




app.use("/api/auth",require('./routes/userRoutes'))
app.use("/api/messages",require('./routes/messagesRoute'))

const server = app.listen(5000,() => console.log('Server started on port 5000'))

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    }
})

//store all of our online users inside this map 
global.onlineUsers = new Map()

//user connection 
io.on("connection",(socket) =>{
    console.log('a user connected' +socket.id)
    global.chatSocket = socket // store the chat socket inside the global chat
    socket.on('disconnect',()=>{
        console.log("user disconnected" +socket.id)
    })

    socket.on("add-user",(userId)=>{
        //set onlineusers.set 
        //emit add user from the front-end whenever the user is logged in   
        //establish a socket connection by add user
        //grab the user id and the current socket id 
        //and set it inside the Map()
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        console.log(data)
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            // .to emit this message to whoever is in
            //that room 
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})
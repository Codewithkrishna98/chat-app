import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http';

const port = 3000;
const app = express()

const server = createServer(app)

const io = new Server(server , {
  cors:{
    origin:"*",
    methods:["GET","POST"],
    credentials:true
  }
})

app.use((req, res, next) => {
  const allowedOrigins = ['https://667bd732f69c40d514ee74be--tangerine-daifuku-85610d.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get("/", (req,res)=>{
  res.send("Hello World")
})


io.on("connection", (socket)=>{
console.log("user connected", socket.id)

//  socket.emit("welcome"  ,`welcome to the server ${socket.id}`  )
//  socket.broadcast.emit("welcome", `${socket.id} has join the server`)

socket.on("meassage", ({meassage,room})=>{
 console.log({meassage,room})
 socket.to(room).emit("meassage-recieved", meassage)
})

 socket.on("join-room",(room)=>{
   socket.join(room)
   console.log(`user  has join the room ${room}`)
 })


socket.on("disconnect", ()=>{

   console.log("user disconnected", socket.id)
})
})

server.listen(port, ()=>{
console.log(`server is running${port} `)
})

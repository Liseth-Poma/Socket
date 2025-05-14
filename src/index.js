const { count } = require('console');
const express = require('express'); //express framework
const path = require('path');
const { createServer } = require('http'); //HTTp Server
const { Server }= require('socket.io');//socket.io

const app = express();//crear una app con express
const httpServer = createServer(app); //crear un http server
const io= new Server(httpServer); //creaer un servidor soket.io

app.use(express.static(path.join(__dirname, "views")));


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) =>{
    console.log("users conectados verificado desde el cliente: ", io.engine.clientsCount);
    console.log("Id del socket conectado:", socket.id);

    socket.on("disconnect", ()=>{
        console.log("El socket " + socket.id + " se ha desconectado desde el cliente")
    });
});

httpServer.listen(3000);

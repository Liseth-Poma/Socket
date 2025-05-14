const socket = io();
socket.on("connect", ()=>{
    console.log("Usuarios conectado verificado desde el cliente");
});
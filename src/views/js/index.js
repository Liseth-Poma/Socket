const socket = io();
socket.on("Bienvenido", (data) => {
    /* console.log(data); */
    const text = document.querySelector("#text");
    text.textContent = data;

    const emitToServer = document.querySelector("#emit-to-server");

    emitToServer.addEventListener("click", () => {
        socket.emit("server", "Hola desde el servider");
    });
    socket.on("everyone", (massage) => {
        console.log(massage);
    });

    const emitToLast = document.querySelector("#emit-to-last");
    emitToLast.addEventListener("click", () => {
        socket.emit("last", "Hola desde el servidor");
    });

    socket.on("saludoUnico", (massage) => {
        console.log(massage);
    });


    // Diferencia entre on, once y off
    socket.on("on", () => {
        console.log("Se emite varias veces");
    });
    socket.once("once", () => {
        console.log("Se emite una sola vez");
    });

    const listener = () => {
        console.log("Se apago el evento");
    };

    socket.on("off", listener);

    setTimeout(() => {
        socket.off("off", listener);
    }, 2000);

});

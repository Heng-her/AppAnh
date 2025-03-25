const io = require("socket.io")(3001, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", (msg) => {
        io.emit("newMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

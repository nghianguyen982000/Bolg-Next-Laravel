var io = require("socket.io")(6001);
console.log("Connected to port 6001");
io.on("error", (socket) => {
    console.log("error");
});
io.on("connection", (socket) => {
    console.log("Someone just connected " + socket.id);
});
var Redis = require("ioredis");
var redis = new Redis(6379);
redis.psubscribe("*", (error, count) => {
    //
});
redis.on("pmessage", (partner, channel, message) => {
    console.log("channel", channel);
    console.log("message", message);
    console.log("partner", partner);
    message = JSON.parse(message);
    io.emit(
        channel +
            ":" +
            message.event +
            "." +
            message.data.message.conversation_id,
        message.data.message
    );
    console.log("sent");
});

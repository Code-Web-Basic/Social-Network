require("dotenv").config();
const express = require("express");
const passport = require("passport");
const ApiV1 = require("./routes/v1");
const db = require("./config/mongodb");
const env = require("./config/environment");
const path = require("path");
const cors = require("cors");
const cookieSession = require("cookie-session");
db.connectDB()
  .then(() => console.log("Connected Successfully"))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();
  app.use(express.json());
  app.use(require("serve-static")(__dirname + "/../../public"));
  app.use(require("cookie-parser")());
  app.use(
    cookieSession({
      name: "session",
      keys: ["compile"],
      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    cors({
      origin: `http://${env.APP_HOST}:${env.APP_CLIENT_PORT}`,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  // use api
  app.use("/v1", ApiV1);
  const server = app.listen(env.APP_PORT, () =>
    console.log(
      `Example app listening on port http://${env.APP_HOST}:${env.APP_PORT}`
    )
  );
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3050",
    },
  });
  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId == userId) &&
      users.push({ userId, socketId });
  };
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  io.on('connection', (socket) => {
    console.log("connect")
    socket.on('send_message', data => {
      socket.broadcast.emit('receive_message', data)
    });
    socket.on("add-user", (userId) => {
      if (userId) {
        addUser(userId, socket.id);
        socket.broadcast.emit("get-online-user", users);
      }
    });
    socket.on("disconnecting", () => {
      console.log("disconect")
      removeUser(socket.id);
      io.emit("get-online-user", users);
    });
  })
};

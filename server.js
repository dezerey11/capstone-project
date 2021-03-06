require("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000, SECRET } = process.env;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("./db/db");
const AuthRouter = require("./controllers/user");
const auth = require("./auth");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

// origin: "*" allows any domain to talk to us
const io = new Server(server, {
  cors: { origin: "*" },
});

////// MIDDLEWARE //////
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

////// ROUTERS //////
app.get("/", auth, (req, res) => {
  res.json(req.payload);
});

app.use("/auth", AuthRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    const payload = jwt.verify(msg.token, SECRET);
    if (payload) {
      io.emit("chat message", { text: msg.text, username: payload.username });
    } else {
      console.log("Invalid");
    }
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

////// LISTENER /////
server.listen(PORT, () => {
  console.log(`You are listening on Port ${PORT}`);
});

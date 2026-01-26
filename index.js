const express = require("express");
const mongoose = require("mongoose");
const clientrouter = require("./router/ClientRouter");
const adminrouter = require("./router/AdminRouter");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://aarogyapath-frontend-admin.vercel.app",
  "https://geethas-aarogyapath1.vercel.app",
  "https://geethas-aarogyapath.vercel.app"
];

const io = new Server(server, {
  cors: { origin: allowedOrigins }
});

// Attach io to every request
app.use((req, res, next) => {
  console.log(req.method, req.path);
  req.io = io;
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("<p>HI its Backend</p>");
});

app.use("/client", clientrouter);
app.use("/admin", adminrouter);

io.on("connection", (socket) => {
  console.log("Socket client connected");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("Mongo Connected and App Started");
    });
  })
  .catch((error) => {
    console.log(error);
  });

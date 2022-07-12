require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
var morgan = require("morgan");
var cors = require("cors");

//Routers
const userRoutes = require("./routes/user");
const dashboardRoutes = require("./routes/dashboard");
//Routers

// Middleware
const middleware = [
  cors(),
  morgan("tiny"),
  express.json(),
  express.static("public"),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
];
app.use(middleware);
// Middleware

// MongoDB configuration
const db = require("./config/db");
mongoose
  .connect(db.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log(err));
// MongoDB configuration

//Use Routes
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
//Use Routes

//Initialize Socket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET, POST"],
  },
});
//Initialize Socket

//Use Socker IO
const onConnection = (socket) => {
  console.log(`New User Connected: ${socket.id}`);
};

io.on("connection", onConnection);
global.io = io;
//Use Socker IO

//error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
//error handling

//serve app
const port = process.env.PORT || 9090;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//serve app

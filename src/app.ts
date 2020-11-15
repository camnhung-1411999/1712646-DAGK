import express from "express";
import bodyParser from "body-parser";
import routes from "./routers";
import cors from "cors";
import logger from './utils/log';
const app = express();
// const http = require("http");
// const socketio = require("socket.io");
// let server = http.createServer(app);
// // set up socket.io and bind it to our
// // http server.
// // let io = require('socket.io')(http);
// const io = socketio(server);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


app.use("/", routes);

export default app;

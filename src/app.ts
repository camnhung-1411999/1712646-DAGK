import express from "express";
import bodyParser from "body-parser";
import routes from "./routers";
import cors from "cors";
import { Socket } from "socket.io";
import taskSocket from './socket/task.socket';
import logger from './utils/log';
const app = express();
// const http = require("http");
// const socketio = require("socket.io");
// let server = http.createServer(app);
// // set up socket.io and bind it to our
// // http server.
// // let io = require('socket.io')(http);
// const io = socketio(server);


let server = require("http").Server(app);
let io = require("socket.io")(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

io.on("connection", (socket: Socket, callback: any) => {
 logger.info("Connected to client");
  taskSocket(socket);
});
app.use("/", routes);

export default server;

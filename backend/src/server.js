import http from "http";

import { env } from "./config/env.js";
import app from "./app.js";
import { connectDB } from "./config/database.js";

import { initializeSocket } from "./sockets/socket.js";


const PORT = env.port || 5000;

const server = http.createServer(app)

connectDB().then(()=>{
    initializeSocket(server);
    server.listen(PORT, ()=>{
        console.log(`Server running on port: ${PORT}`);
    });
});
import express from 'express'
import usuarioRouter from './routes/usuarioRoute.js';
const server = express();
server.use(express.json());//Trasnformar String para JSON
server.use("/usuario", usuarioRouter);




server.listen(5000, function() {
    console.log("backend em funcionamento!");
})

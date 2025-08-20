import express from 'express'
import usuarioRouter from './routes/usuarioRoute.js';
server.use(express.json());//Trasnformar String para JSON
server.use("/usuario", usuarioRouter);
import swaggerUI from 'swagger-ui-express'
import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const outputJson = require("./swaggerOutput.json")
const server = express();


server.listen(5000, function() {
    console.log("backend em funcionamento!");
})

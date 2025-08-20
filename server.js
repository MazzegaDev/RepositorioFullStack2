import express from "express";
const server = express();
import usuarioRouter from "./routes/usuarioRoute.js";
server.use(express.json()); //Trasnformar String para JSON

import swaggerUI from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swaggerOutput.json");

server.use("/doc", swaggerUI.serve, swaggerUI.setup(outputJson));
server.use("/usuario", usuarioRouter);


server.listen(5000, function () {
  console.log("backend em funcionamento!");
});

import express from "express";
import LocacaoController from "../controllers/locacaoController.js";
import AuthMiddleware from "../middleware/authMiddleWare.js";
const Auht = new AuthMiddleware();
const locarRouter = express.Router();

const ctrl = new LocacaoController();
locarRouter.post("/", Auht.validarToken, (req, res)=>{

    ctrl.locar(req, res);
});

export default locarRouter
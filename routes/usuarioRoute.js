import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", ctrl.listar);
router.post("/", ctrl.cadastrar);
router.delete("/:email", ctrl.deletar);
export default router;

import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", ctrl.listar);
router.post("/", ctrl.cadastrar);
router.put("/", ctrl.atualizar);
router.delete("/:id", ctrl.deletar);
export default router;

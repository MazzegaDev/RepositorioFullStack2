import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", (req, res) => {
    //Comentarios do swagger
    // #swagger.tags = ['usuario']
    // #swagger.summary = 'Listar todos os usuarios'

    //Definimos uma descrição personalizada para esta resposta
    /*  #swagger.responses[404] = {
        description: 'nenhum usuario encontrado na consulta',
        schema:  {$ref: '#/components/schemas/erro'}}
    */
    ctrl.listar(req, res)
});
router.post("/", (req, res) => {
    //Comentarios do swagger
    // #swagger.tags = ['usuario']
    // #swagger.summary = 'Cadastra um novo usuario'

    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/components/schemas/usuario'
                }
            }
        }
    } */
    ctrl.cadastrar(req, res)
});
router.put("/", (req, res) => {
    //Comentarios do swagger
    // #swagger.tags = ['usuario']
    // #swagger.summary = 'Atualiza um usuario'
    ctrl.atualizar(req, res)
});
router.delete("/:id", (req, res) => {
    //Comentarios do swagger
    // #swagger.tags = ['usuario']
    // #swagger.summary = 'Deleta um usuario'
    ctrl.deletar(req, res)
});
export default router;

import express from 'express'
import UsuarioController from '../controllers/usuarioController.js';

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", (req, res) => {
    //comentarios do swagger
    // #swagger.tags = ['Usuário']
    // #swagger.summary = 'Listar todos os usuários'

    /* #swagger.responses[404] = {
        description: 'Nenhum usuário encontrado na consulta',
        schema: { $ref: '#/components/schemas/erro' }
    }
    */
    ctrl.listar(req, res)
});
router.post("/", (req, res) => {

    // #swagger.tags = ['Usuário']
    // #swagger.summary = 'Cadastra um novo usuário'
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/components/schemas/usuario'
                }
            }
        }
    }
    */
    ctrl.cadastrar(req, res);
});
router.put("/", (req, res) => {

    // #swagger.tags = ['Usuário']
    // #swagger.summary = 'Altera um usuário existente'
        /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/components/schemas/usuario'
                }
            }
        }
    }
    */
    ctrl.atualizar(req, res);
});
router.delete("/:id", (req, res) => {

    // #swagger.tags = ['Usuário']
    // #swagger.summary = 'Deleta permanentemente um usuário'
    ctrl.deletar(req, res);
});
router.get("/:id", (req, res) => {

    // #swagger.tags = ['Usuário']
    // #swagger.summary = 'Recupera um usuário através de um ID'
    ctrl.obterPorId(req, res);
});


export default router;
import express from 'express';
import ImovelController from '../controllers/imovelController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new ImovelController();
let auth = new AuthMiddleware();
router.get("/", auth.validarToken, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Lista todos os imóveis cadastrados'
    ctrl.listar(req, res);
})

router.post("/", auth.validarToken, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Cadastra um novo imóvel'
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/components/schemas/imovel'
                }
            }
        }
    }
    */
    ctrl.cadastrar(req, res);
})

router.put("/", auth.validarToken, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Altera um imóvel existente'
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: '#/components/schemas/imovel'
                }
            }
        }
    }
    */
    ctrl.alterar(req, res)
})

router.delete("/:id", auth.validarToken, (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Exclui um imóvel existente'
    /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
    ctrl.deletar(req, res);
})

router.get("/:id", auth.validarToken, (req, res) => {
    /* #swagger.security = [{
        "bearerAuth": []
    }]
    */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = 'Busca um imóvel pelo id'

    ctrl.obterPorId(req, res);
})

export default router;
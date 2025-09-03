import express from "express";
import ImovelController from "../controllers/imovelController.js";

const ctrl = new ImovelController();
const router = express.Router();

router.get("/", (req, res) => {
    // #swagger.tags = ['Imovel']
    // #swagger.summary = 'Lista todos os imoveis'
    /*
        #swagger.response[404] = {
            description: 'Nenhum imovel encontrado na consulta',
        schema: { $ref: '#/components/schemas/erro' }
        }
    */


  ctrl.listar(req, res);
});

router.post("/", (req, res) => {
  // #swagger.tags = ['Imovel']
  // #swagger.summary = 'Cadastra um novo imovel'
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
});
export default router;

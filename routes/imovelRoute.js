import express from "express";
import ImovelController from "../controllers/imovelController.js";
import AuthMiddleware from "../middleware/authMiddleWare.js";

const ctrl = new ImovelController();
const router = express.Router();

const Auth = new AuthMiddleware();

router.get("/", Auth.validarToken, (req, res) => {
  // #swagger.tags = ['Imovel']
  // #swagger.summary = 'Lista todos os imoveis'
  /*
        #swagger.response[404] = {
            description: 'Nenhum imovel encontrado na consulta',
        schema: { $ref: '#/components/schemas/erro' }
        }
    */

  /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */

  ctrl.listar(req, res);
});

router.post("/", Auth.validarToken, (req, res) => {
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

  /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */
  ctrl.cadastrar(req, res);
});

router.get("/:id", Auth.validarToken, (req, res) => {
  ctrl.obterPorId(req, res);
});
export default router;

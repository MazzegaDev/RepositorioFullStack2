import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import AuthMiddleware from "../middleware/authMiddleWare.js";

const router = express.Router();
const Auth = new AuthMiddleware();

let ctrl = new UsuarioController();
//toda rota que necessite ser privada colocamos o metodo validar token nos parametros
router.get("/", Auth.validarToken, (req, res) => {
  //comentarios do swagger
  // #swagger.tags = ['Usuário']
  // #swagger.summary = 'Listar todos os usuários'

  /* #swagger.responses[404] = {
        description: 'Nenhum usuário encontrado na consulta',
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

  /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */
  ctrl.cadastrar(req, res);
});
router.put("/", Auth.validarToken, (req, res) => {
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

  /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */
  ctrl.atualizar(req, res);
});
router.delete("/:id", Auth.validarToken, (req, res) => {
  // #swagger.tags = ['Usuário']
  // #swagger.summary = 'Deleta permanentemente um usuário'

  /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */
  ctrl.deletar(req, res);
});
router.get("/:id", Auth.validarToken, (req, res) => {
  // #swagger.tags = ['Usuário']
  // #swagger.summary = 'Recupera um usuário através de um ID'

  /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */
  ctrl.obterPorId(req, res);
});

export default router;

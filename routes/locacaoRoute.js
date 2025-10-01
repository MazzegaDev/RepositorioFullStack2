
import express from 'express';
import LocacaoController from '../controllers/locacaoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new LocacaoController();
let auth = new AuthMiddleware();
router.post("/", auth.validarToken, (req, res) => {

    // #swagger.tags = ['Locação']
    // #swagger.tags = 'Inicia o processo para locar um imóvel'

    /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */

    ctrl.locar(req, res);
})

export default router;

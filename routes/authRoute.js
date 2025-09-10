import express from "express";
import Auth from "../controllers/authController.js"

const router = express.Router();
const ctrl = new Auth();

router.post("/token", (req, res) => {
    ctrl.token(req, res);
})

export default  router;
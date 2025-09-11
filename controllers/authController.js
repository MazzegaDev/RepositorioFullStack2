
import UsuarioRepository from "../repositories/usuarioRepository.js";
import AuthMiddleware from "../middleware/authMiddleWare.js";

export default class Auth {
  #UsuarioRepo;
  constructor() {
    this.#UsuarioRepo = new UsuarioRepository();
  }
  //Gera um token para um determinado usuario
  async token(req, res) {
    try {
      let { email, senha } = req.body;
      if (email && senha) {
        //Chama o repository para encontrar esse usuario
        let usuario = await this.#UsuarioRepo.validarAcesso(email, senha);
        if (usuario) {
          //gerar o token para o usuario encontrado

          //nova instancia da classe auth responsavel por criar e validar os tokens
          let auth = new AuthMiddleware();

          //Cria o token com os dados do usuario // erro no usuario
          let token = auth.gerarToken(usuario.id, usuario.email, usuario.nome, usuario.perfil.id);

          return res.status(200).json({token: token});
        } else {
          return res.status(404).json({ msg: "Usuario nao encontrado" });
        }
      } else {
        return res.status(400).json({ msg: "Informe um email e senha valido" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro ao gerar token de acesso" });
    }
  }
}

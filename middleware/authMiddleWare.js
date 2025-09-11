import jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/usuarioRepository.js";

const secret = "PFS2@@@2$FP";

export default class AuthMiddleware {
  gerarToken(id, email, nome, perfil) {
    //recebe os dados do usuario para gerar o token
    let jsonWebToken = jwt.sign(
      {
        //nosso payload com os dados do usuario
        id: id,
        email: email,
        nome: nome,
        perfil: perfil,
      },
      secret, // segredo do token
      {
        expiresIn: 3000, //tempo de expiração do token
      }
    );

    return jsonWebToken;
  }

  async validarToken(req, res, next) {
    if (req.headers.authorization) {
      //Verifica se no cabeçalho nosso token existe. Verfica se tem algo no atributo athoriztion.

      //Se existe retorna o valor
      //Aqui estamos pegando o token no cabeçalho da req

      let token = req.headers.authorization.split(" ")[1];
      
      /*athorization: "Bearer <token> "
      Recorta a string depois do espaço e pega a primeira posição -> split faz um array. */

      try {
        //Verify verifica se token e a chave secreta sao validos

        //Se deu certo ele decodifica o corpo <- retorna as infos do usuario
        let payload = jwt.verify(token, secret);
        /*
          O jwt verify nos retorna as informações do usuario correspondente a esse token
          { <- esse e o payload
            id: 3, <- essas sao as informações que passamos na hora de criar o token na AuthController
            email: 'john.doe@example.com',
            nome: 'John Doe',
            perfil: null,
            iat: 1757545780,
            exp: 1757548780
          }
        */

        let usuarioRepository = new UsuarioRepository();

        //Valida o usuario pelo id no payload no banco de dados
        let usuario = await usuarioRepository.buscarPorId(payload.id);
        if (usuario) {
          //se o usuario existe
          if (usuario.ativo) {
            // se o usuario esta ativo
            next(); // se ativo, conclui a req
          } else {
            return res.status(401).json({ msg: "Usuario inativo" });
          }
        } else {
          return res.status(404).json({ msg: "Usuario nao encontrado" });
        }
        console.log(payload);
      } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "Token invalido!" });
      }
    } else {
      return res.status(401).json({ msg: "Token não autorizado" });
    }
  }
}

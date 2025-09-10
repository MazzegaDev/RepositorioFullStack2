import jwt from "jsonwebtoken";

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
        expiresIn: 300000,//tempo de expiração do token
      }
    );

    return jsonWebToken;
  }

  validarToken() {}
}

import Usuario from "../entities/usuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class UsuarioController {
  listar(req, res) {
    try {
      let usuariosRepo = new UsuarioRepository();
      let lista = usuariosRepo.listar();
      if (lista.length > 0) {
        res.status(200).json(lista);
      } else {
        res.status(404).json({ msg: "Nenhum usuário foi encontrado!" });
      }
    } catch (exeception) {
      console.log(exeception);
      res.status(500).json({ msg: "erro ao processar requisicao" });
    }
  }

  cadastrar(req, res) {
    try {
      //recuperar as informacoes do usuario no corpo da requisicao Pega exatamente essas propriedades do body e atribui a essas variaveis !Precissa ser exatamente esse nome!
      let { nome, email } = req.body;
      if (nome && email) {
        //Diferente de undefined
        let entidade = new Usuario(nome, email);
        let usuariosRepo = new UsuarioRepository();
        let inseriu = usuariosRepo.cadastrar(entidade);
        if (inseriu == true) {
          return res.status(200).json({ msg: "Usuario cadastrado" });
        } else {
          //Nao inseriu no bd
          throw new Error(
            "Erro ao cadastrar usuario. Nao foi possivel persistir no banco de dados"
          );
        }
      } else {
        //Undefined
        //Return recomendado antes dos res0
        return res
          .status(400)
          .json({ msg: "O usuario precisa ter nome e email definidos !" });
      }
    } catch (exeception) {
      console.log(exeception);
      res.status(500).json({ msg: "Nao foi possivel cadastrar" });
    }
  }
  deletar(req, res) {
    try {
      let { email } = req.params;
      let usuarioRepo = new UsuarioRepository();
      if (usuarioRepo.buscarPorEmail(email)) {
        //Usuario apto para delecao
        usuarioRepo.deletar(email);
        return res.status(200).json({ msg: "Usuario excluido com sucesso!" });
      } else {
        //Usuario nao existe para delecao
        return res.status(400).json({ msg: "Usuario nao existe para deleção" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }
}

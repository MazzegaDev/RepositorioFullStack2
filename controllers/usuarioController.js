import Usuario from "../entities/usuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class UsuarioController {

  #repositorio;

  constructor(){
    this.#repositorio = new UsuarioRepository();
  }

  listar(req, res) {
    try {
      
      let lista = this.#repositorio.listar();
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
        //Cria um ID pela hora
        let id = Date.now()
        let entidade = new Usuario(id, nome, email);
        let inseriu = this.#repositorio.cadastrar(entidade);
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
      let { id } = req.params;

      if (this.#repositorio.buscarPorid(id)) {
        //Usuario apto para delecao
        this.#repositorio.deletar(id);
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

  atualizar(req, res) {
    try {
      let { id, nome, email } = req.body;
      if (id && nome && email) {
        if (this.#repositorio.buscarPorid(id)) {
          /*
            Cria uma nova entidade na controller e quando chama o metodo atualizar 
            procura uma entidade com os mesmos dados e atribui a nova entidade a ela
          */
          let entidade = new Usuario(id, nome, email);
          this.#repositorio.atualizar(entidade);
          return res.status(200).json({msg: "Usuario alterado"})
        } else {
          return res.status(404).json({ msg: "Usuario nao existe" });
        }
      }else{
        return res.status(404).json({msg: "As informações nao estao corretas"})
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ms: error.message });
    }
  }
}

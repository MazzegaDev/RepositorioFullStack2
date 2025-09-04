import Imovel from "../entities/imovel.js";
import ImovelRepository from "../repositories/imovelRepository.js";

export default class ImovelController {
  #ImovelRepo;
  constructor() {
    this.#ImovelRepo = new ImovelRepository();
  }

  async listar(req, res) {
    try {
      let lista = await this.#ImovelRepo.listar();
      if (lista.length > 0) {
        return res.status(200).json(lista);
      } else {
        return res.status(404).json({ msg: "Nenhum imovel para listar." });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Nao foi possivel processar a requisicao" });
    }
  }

  async cadastrar(req, res) {
    try {
      let { descricao, cep, endereco, bairro, cidade, valor, disponivel } =
        req.body;
      if (
        descricao &&
        cep &&
        endereco &&
        bairro &&
        cidade &&
        valor &&
        disponivel
      ) {
        let novoImovel = new Imovel(
          0,
          descricao,
          cep,
          endereco,
          bairro,
          cidade,
          valor,
          disponivel
        );
        if (await this.#ImovelRepo.cadastrar(novoImovel)) {
          return res.status(200).json({ msg: "Imovel cadastrado com sucesso" });
        } else {
          throw new Error("Erro ao gravar imovel no banco");
        }
      } else {
        return res.status(404).json({ msg: "O imovel possui dados invalidos" });
      }
    } catch (error) {}
  }

  async alterar(req, res){
    try {
      let {id, descricao, cep, endereco, bairro, cidade, valor, disponivel } =
        req.body;
      if (
        id &&
        descricao &&
        cep &&
        endereco &&
        bairro &&
        cidade &&
        valor &&
        disponivel
      ){
          let novoImovel = new Imovel(id, descricao, cep, endereco, bairro, cidade, valor, disponivel);
          if(await this.#ImovelRepo.obterPorId(id)){
            if(await this.#ImovelRepo.alterar(novoImovel)){
              return res.status(200).json({msg: "Imovel alterado"});
            }else{
              throw new Error("Nao foi possivel alterar os dados do imovel no banco");
            }
          }else{
            return res.status(404).json({msg: "nao existe nenhum imovel com esse id"})
          }
      }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Nao foi possivel processa a requisição"});
    }
  }

  async deletar(req, res){
    try {
      let {id} = req.body;
      if(await this.#ImovelRepo.obterPorId(id)){
        if(await this.#ImovelRepo.deletar(id)){
          return res.status(200).json({msg: "imovel deletado com sucesso!"})
        }else{
          throw new Error("erro ao excluir");
        }
      }else{
        return res.status(404).json({msg: "imovel n encontrado"})
      }
    } catch (error) {
      
    }
  }

  //Fazer o get por id aqui e na rota
}

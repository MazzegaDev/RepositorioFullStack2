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
}

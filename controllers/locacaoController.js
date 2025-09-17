import ImovelRepository from "../repositories/imovelRepository.js";
import ContratoRepository from "../repositories/contratoRepository.js";
import ContratoEntity from "../entities/contratoEntity.js";

export default class LocacaoController {
  #imovelRepo;
  #contratoRepo;

  constructor() {
    this.#imovelRepo = new ImovelRepository();
    this.#contratoRepo = new ContratoRepository();
  }

  async locar(req, res) {
    try {
      let { idImovel } = req.body;
      if (idImovel) {
        let imovel = await this.#imovelRepo.obterPorId(idImovel);
        if (imovel && imovel.disponivel == "S") {
            //Inicia o processo de locação.

            //Cria um novo contrato

            let contrato = new ContratoEntity();
            contrato.imovel = imovel;
            contrato.usuario = req.usuarioLogado;
            if(await this.#contratoRepo.gravar(contrato)){

            }else{
                throw new Error("Erro ao gerar contrato no banco")
            }

        } else {
          return res.status(400).json({ msg: "Imovel invalido para a locação" });
        }
      } else {
        return res.status(400).json({ msg: "O id do imovel nao foi enviado" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Erro ao processar a requisição" });
    }
  }
}

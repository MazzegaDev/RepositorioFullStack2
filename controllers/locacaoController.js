import ImovelRepository from "../repositories/imovelRepository.js";
import ContratoRepository from "../repositories/contratoRepository.js";
import ContratoEntity from "../entities/contratoEntity.js";
import AluguelEntity from "../entities/aluguel.js";
import AluguelRepository from "../repositories/aluguelRepository.js";
import Database from "../db/database.js";

export default class LocacaoController {
  #imovelRepo;
  #contratoRepo;
  #aluguelRepo;
  constructor() {
    this.#imovelRepo = new ImovelRepository();
    this.#contratoRepo = new ContratoRepository();
    this.#aluguelRepo = new AluguelRepository();
  }

  async locar(req, res) {
    let banco = new Database();
    try {
      this.#aluguelRepo.db = banco;
      this.#imovelRepo.db = banco;
      this.#contratoRepo.db = banco;
      let { idImovel } = req.body;
      if (idImovel) {
        let imovel = await this.#imovelRepo.obterPorId(idImovel);

        if (imovel && imovel.disponivel == "S") {
          //Inicia o processo de locação.

          //Cria um novo contrato

          let contrato = new ContratoEntity();

          contrato.imovel = imovel; //Imovel que encontramos na busca
          contrato.usuario = req.usuarioLogado; // O contrato recbe o valor do usuario que estava logado, ou seja quem gerou o contrato
          await banco.AbreTransacao(); // a tranção sempre começa antes do primeiro await
          if (await this.#contratoRepo.gravar(contrato)) {
            //O Contrato tera uma duraçao de 12 meses
            //Gera um aluguel de 12 meses
            for (let i = 0; i < 12; i++) {
              let Aluguel = new AluguelEntity();
              Aluguel.valor = imovel.valor;
              Aluguel.contrato = contrato;
              Aluguel.pago = "N";
              let Data = new Date();
              let mes = Data.getMonth() + 1; // pega o mes que ele criou o aluguel
              Aluguel.mes = mes;
              let mesVenc = Data.setMonth(Data.getMonth() + i); //Faz a data do vencimento vencer nesse dia no proximo mes
              Aluguel.vencimento = mesVenc;
              if ((await this.#aluguelRepo.gravar(Aluguel)) == false)
                throw new Error(`Erro ao gerar o aluguel do mes ${mes}`);
            }
            imovel.disponivel = "N"; //Marca o imovel com nao disponivel se ele conseguir fazer o contrato
            if (await this.#imovelRepo.alterar(imovel)) {
              // Alterar o status do imovel para nao disponivel
              await banco.Commit(); // O Commit sempre acontece quando da tudo certo
              return res
                .status(200)
                .json({ msg: "Imovel locado com sucesso!" });
              
            } else {
              throw new Error("Erro ao atualizar o imovel");
            }
          } else {
            throw new Error("Erro ao gerar contrato no banco");
          }
        } else {
          return res
            .status(400)
            .json({ msg: "Imovel invalido para a locação" });
        }
      } else {
        return res.status(400).json({ msg: "O id do imovel nao foi enviado" });
      }
    } catch (error) {
      await banco.Rollback(); // Rollback sempre ocorre no catch pq e onde sempre da errado
      console.log(error);
      return res.status(500).json({ msg: "Erro ao processar a requisição" });
    }
  }
}

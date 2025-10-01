import Database from "../db/database.js";
import Aluguel from "../entities/aluguel.js";
import Contrato from "../entities/contrato.js";
import AluguelRepository from "../repositories/aluguelRepository.js";
import ContratoRepository from "../repositories/contratoRepository.js";
import ImovelRepository from "../repositories/imovelRepository.js";


export default class LocacaoController {

    #imovelRepository;
    #contratoRepository;
    #aluguelRepository;

   constructor(){
        this.#imovelRepository = new ImovelRepository();
        this.#contratoRepository = new ContratoRepository();
        this.#aluguelRepository = new AluguelRepository();
   }

    async locar(req, res) {
        let banco = new Database();
        try{
            
            //todos os repos usarão a conexão com transação aberta
            this.#aluguelRepository.banco = banco;
            this.#contratoRepository.banco = banco;
            this.#imovelRepository.banco = banco;
            let {idImovel} = req.body;
            if(idImovel) {
                let imovel = await this.#imovelRepository.obterPorId(idImovel);
                if(imovel && imovel.disponivel == "S") {
                    //iniciar processo de locação;
                    let contrato = new Contrato();
                    contrato.imovel = imovel;
                    //utiliza o usuário criado pelo middleware através do JWT
                    contrato.usuario = req.usuarioLogado;
                    await banco.AbreTransacao();
                    if(await this.#contratoRepository.gravar(contrato)) {
                        //iniciar a geração do aluguel
                        //contrato terá duração de 1 ano
                        //gerar 12 meses de aluguel
                        for(let i =1; i<=12; i++) {
                            let aluguel = new Aluguel();
                            aluguel.valor = imovel.valor;
                            aluguel.contrato = contrato;
                            aluguel.pago = "N";
                            let dataAtual = new Date();
                            dataAtual.setMonth(dataAtual.getMonth() + i);
                            let mes = dataAtual.getMonth() + 1;
                            aluguel.mes = mes;
                            aluguel.vencimento = dataAtual;

                            if(await this.#aluguelRepository.gravar(aluguel) == false)
                                throw new Error(`Erro ao gerar o aluguel do mês ${mes}`);
                        }

                        //marcar o imóvel como indisponível
                        imovel.disponivel = "N";
                        if(await this.#imovelRepository.alterar(imovel)) {
                            await banco.Commit();
                            res.status(200).json({msg: "Imóvel locado com sucesso!"});
                        }
                        else
                            throw new Error("Erro ao atualizar situação do imóvel");
                    }
                    else
                        throw new Error("Erro ao gerar contrato no banco!");
                }
                else{
                    return res.status(400).json({msg: "Imóvel inválido para locação!"})
                }
            }
            else{
                return res.status(400).json({msg: "O Id do imóvel não foi enviado!"})
            }

        }
        catch(ex) {
            await banco.Rollback();
            console.log(ex);
            return res.status(500).json({msg: "Erro durante o processo de locação"})
        }
    }
}
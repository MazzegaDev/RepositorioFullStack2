import Database from "../db/database.js";


export default class ContratoRepository {

    #banco;

    //para transações
    set banco(value) {
        this.#banco = value;
    }

    constructor() {
        this.#banco = new Database()
    }

    async gravar(contrato) {

        const sql = "insert into tb_contrato (imv_id, usu_id) values (?, ?)";

        const valores = [contrato.imovel.id, contrato.usuario.id];

        const result = await this.#banco.ExecutaComandoLastInserted(sql, valores);

        if(result) {
            contrato.id = result;

            return true;
        }

        return false;
    }

}
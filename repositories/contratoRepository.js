import Database from "../db/database.js";
import ContratoEntity from "../entities/contratoEntity.js";

export default class ContratoRepository {
  #db;

   set db(db) {
    this.#db = db;
  }

  constructor() {
    this.#db = new Database();
  }

  async gravar(novoContraro) {
    const sql = "insert into tb_contrato (imv_id, usu_is) values (?, ?)";

    const values = [novoContraro.imovel.id, novoContraro.usuario.id];

    //Retorna o id do contrato que foi gerado.
    const result = await this.#db.ExecutaComandoLastInserted(sql, values);

    //Coloca o id do contrato retornado no id do contrado
    if (result) {
      novoContraro.id = result;
      return true;
    }

    return result;
  }
}

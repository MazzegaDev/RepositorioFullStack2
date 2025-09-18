import AluguelEntity from "../entities/aluguel.js";
import Database from "../db/database.js";

export default class AluguelRepository{

    #db;
    //Possibilita as transsações no banco
    set db(db){
        this.#db = db;
    }

    constructor(){
        this.#db = new Database();
    }

    async gravar(aluguel){
        const sql = "insert into tb_aluguel (alu_mes, alu_vencimento, alu_valor, alu_pago, ctr_id) values (?, ?, ?, ?, ?)";

        const valor = [aluguel.mes, aluguel.vencimento, aluguel.valor, aluguel.pago, aluguel.contrato.id];

        const result = await this.#db.ExecutaComandoNonQuery(sql, valor);

        return result;
    }

    async listarPorUsuario(id){
        const sql = "select * from tb_aluguel a inner join tb_contrato c on a.ctr_id = c.ctr_id where c.ctr_id = ?";

        const valores = [id];

        const rows = await this.#db.ExecutaComando(sql, valores);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            lista.push(this.toMap(row));
            
        }
        return lista;
    }
    
    async marcarComoPago(id){
        const sql = "update tb_aluguel set alu_pago = 'S' where alu_id = ?";
        const valores = [id];

        const result = await this.#db.ExecutaComandoNonQuery(sql, valores);

        return result;

    }


    toMap(row){
        let aluguel = new AluguelEntity();
        aluguel.id = row["alu_id"];
        aluguel.mes = row["alu_mes"];
        aluguel.vencimento = row["alu_vencimento"];
        aluguel.valor = row["alu_valor"];
        aluguel.pago = row["alu_pago"];
        aluguel.contrato.id = row["ctr_id"];

        return aluguel;
    }
}
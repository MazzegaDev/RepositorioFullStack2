import Database from "../db/database";
import Imovel from "../entities/imovel";
import Usuario from "../entities/usuario";


export default class ImovelRepository {

    #banco;

    constructor() {
        this.#banco = new Database();
    }

    async listar() {
        const sql = "select * from tb_imovel";

        const rows = await this.#banco.ExecutaComando(sql);

        let lista = [];

        for(let i = 0; i<rows.length; i++) {
            let row = rows[i];
            let imovel = this.toMap(row);
            lista.push(imovel);
        }

        return lista;
    }

    async cadastrar(entidade) {
        const sql = "insert into tb_imovel (imv_descricao, imv_cep, imv_endereco, imv_bairro, imv_cidade, imv_valor, imv_disponivel) values (?, ?, ?, ?, ?, ?, ?)";

        const valores = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterar(entidade) {
        const sql = `update tb_imovel set imv_descricao = ?,
                                          imv_cep = ?,
                                          imv_endereco = ?,
                                          imv_bairro = ?,
                                          imv_cidade = ?,
                                          imv_valor = ?,
                                          imv_disponivel = ?
                        where imv_id = ?`

        const valores = [entidade.descricao, entidade.cep, entidade.endereco, entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel, entidade.id];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar(id) {
        const sql = "delete from tb_imovel where imv_id = ?";
        const valores = [id]; 

        const result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obterPorId(id) {
        const sql = "select * from tb_imovel where imv_id = ?";
        const valores = [id];

        const rows = await this.#banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            //é esperado que retorne apenas uma posição (id único)
            let imovel = this.toMap(rows[0]);
            return imovel;
        }

        return null;
    }

    toMap(row) {
        let imovel = new Imovel();
        imovel.id = row["imv_id"];
        imovel.descricao = row["imv_descricao"];
        imovel.cep = row["imv_cep"];
        imovel.endereco = row["imv_endereco"];
        imovel.cidade = row["imv_cidade"];
        imovel.bairro = row["imv_bairro"];
        imovel.valor = row["imv_valor"];
        imovel.disponivel = row["imv_disponivel"];

        return imovel;
    }
}
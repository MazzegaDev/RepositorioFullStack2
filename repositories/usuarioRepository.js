import Database from "../db/database.js";
import Perfil from "../entities/perfil.js";
import Usuario from "../entities/usuario.js";


export default class UsuarioRepository {

    #banco;

    constructor() {
        this.#banco = new Database();
    }

    async buscarPorId(id) {
        //criação do comando sql;
        const sql = "select * from tb_usuario where usu_id = ?";
        const params = [id];
        
        const rows = await this.#banco.ExecutaComando(sql, params);

        if(rows.length > 0) {
            const row = rows[0];
            const usuario = this.toMap(row);

            return usuario;
        }

        return null;
    }

    async listar() {
        
        const sql = "select * from tb_usuario";
        const rows = await this.#banco.ExecutaComando(sql);
        let usuarios = [];

        for(let i = 0; i<rows.length; i++) {
            const row = rows[i];
            usuarios.push(this.toMap(row));
        }

        return usuarios;
    }

    async cadastrar(usuarioEntidade) {
        const sql = "insert into tb_usuario (usu_nome, usu_email, usu_senha, usu_ativo, per_id) values (?, ?, ?, ?, ?)";

        const params = [usuarioEntidade.nome, usuarioEntidade.email, usuarioEntidade.senha, usuarioEntidade.ativo, usuarioEntidade.perfil.id];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }

    async deletar(id) {
        const sql = "delete from tb_usuario where usu_id = ?";
        const params = [id];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

        return result;
    }

    async alterar(entidadeAtualizada) {
        const sql = `update tb_usuario set usu_nome = ?,
                                           usu_email = ?,
                                           usu_senha = ?,
                                           usu_ativo = ?,
                                           per_id = ?
                    where usu_id = ?`

        const valores = [entidadeAtualizada.nome, entidadeAtualizada.email, entidadeAtualizada.senha, entidadeAtualizada.ativo, entidadeAtualizada.perfil.id, entidadeAtualizada.id];

        const result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    toMap(row) {
        let usuario = new Usuario();
        usuario.id = row["usu_id"];
        usuario.nome = row["usu_nome"];
        usuario.email = row["usu_email"];
        usuario.senha = row["usu_senha"];
        usuario.ativo = row["usu_ativo"];
        usuario.perfil = new Perfil(row["per_id"]);
        if(row["per_descricao"]){
            usuario.perfil.descricao = row["per_descricao"];
        }

        return usuario;
    }

}
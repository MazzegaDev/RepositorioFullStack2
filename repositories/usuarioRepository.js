import Database from "../db/database.js";
import PerfilEntity from "../entities/perfilEntity.js";
import Usuario from "../entities/usuarioEntity.js";

export default class UsuarioRepository {
  #banco;

  constructor() {
    this.#banco = new Database();
  }

  async buscarPorid(id) {
    const sql = "select * from tb_usuario where usu_id = ?";
    const valores = [id];

    const rows = await this.#banco.ExecutaComando(sql, valores);

    if (rows.length > 0) {
      const row = rows[0];
      const usuario = new Usuario(
        row["usu_id"],
        row["usu_nome"],
        row["usu_email"],
        row["usu_senha"],
        row["usu_ativo"],
        new PerfilEntity(row["per_id"])
      );

      return usuario;
    }
    return null;
  }

  async listar() {
    const sql = "select * from tb_usuario";
    const rows = await this.#banco.ExecutaComando(sql);
    let usuarios = [];
    for(let i = 0; i<rows.length; i ++){
      const row = rows[i];
      usuarios.push(new Usuario(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_senha"], row["usu_ativo"]))
    }

    return usuarios;
  }

  async cadastrar(usuarioEntidade) {
    const sql = "insert into tb_usuario (usu_nome, usu_email, usu_senha, usu_ativo, per_id) values (? ,? ,? ,? ,?)";

    const params = [usuarioEntidade.nome, usuarioEntidade.email, usuarioEntidade.senha, usuarioEntidade.ativo, usuarioEntidade.perfil.id];

    const result = await this.#banco.ExecutaComandoNonQuery(sql, params);

    return result;
  }

  deletar(id) {
    usuarios = usuarios.filter((x) => x.id != id);
  }

  atualizar(entidadeAtualizada) {
    //Index falamos qual posição da lista deve ser atualizada
    usuarios.forEach((us, index) => {
      if (us.id == entidadeAtualizada.id) {
        //Alteramos diretamente o vetor na posição determinada
        usuarios[index] = entidadeAtualizada;
      }
    });
  }
}

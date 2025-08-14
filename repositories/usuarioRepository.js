import Usuario from "../entities/usuarioEntity.js";

let usuarios = [];

usuarios.push(new Usuario("Fulvio", "fulvio@unoeste.br"));
usuarios.push(new Usuario("Fulano de Tal", "fulano@unoeste.br"));
usuarios.push(new Usuario("Ciclano de Tal", "ciclano@unoeste.br"));

export default class UsuarioRepository {
  buscarPorEmail(email) {
    let usuario = usuarios.filter((x) => x.email == email);
    //Verifica se existe
    return usuario.length > 0;
  }

  listar() {
    //faria o acesso ao banco
    //mapeamento para a entidade
    //devolução da lista de entidades
    return usuarios;
  }

  cadastrar(usuarioEntidade) {
    //recebe uma entidade usuário para persistir
    //Com banco de dados usariamos a entidade para montar o comando insert
    usuarios.push(usuarioEntidade);
    return true;
  }

  deletar(email) {
    usuarios = usuarios.filter((x) => x.email != email);
  }
}

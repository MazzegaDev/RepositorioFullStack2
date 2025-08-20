import Usuario from "../entities/usuarioEntity.js";

let usuarios = [];

usuarios.push(new Usuario(1, "Fulvio", "fulvio@unoeste.br"));
usuarios.push(new Usuario(2, "Fulano de Tal", "fulano@unoeste.br"));
usuarios.push(new Usuario(3, "Ciclano de Tal", "ciclano@unoeste.br"));

export default class UsuarioRepository {
  buscarPorid(id) {
    let usuario = usuarios.filter((x) => x.id == id);
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

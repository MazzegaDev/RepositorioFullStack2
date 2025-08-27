export default class UsuarioEntity {
  #id;
  #nome;
  #email;
  #senha;
  #ativo;
  #perfil;

  get id() {
    return this.#id;
  }

  set id(id){
    this.#id = id
  }

  get email() {
    return this.#email;
  }

  set email(email){
    this.#email = email;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nome){
    this.#nome = nome;
  }

  get senha(){
    return this.#senha;
  }

  set senha(senha){
    this.senha = senha;
  }

  get ativo(){
    return this.#ativo;
  }

  set ativo(ativo){
    this.#ativo = ativo
  }

  get perfil(){
    return this.#perfil
  }

  set perfil(perfil){
    this.#perfil = perfil;
  }

  constructor(id, nome, email, senha, ativo, perfil) {
    this.#email = email;
    this.#nome = nome;
    this.#id = id;
    this.#senha = senha;
    this.#ativo = ativo;
    this.#perfil = perfil;

  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      email: this.#email,
      ativo: this.#ativo,
      perfil: this.#perfil,
    };
  }
}

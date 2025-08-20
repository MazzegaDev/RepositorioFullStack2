export default class Usuario {
  #id;
  #nome;
  #email;

  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  get nome() {
    return this.#nome;
  }

  constructor(id, nome, email) {
    this.#email = email;
    this.#nome = nome;
    this.#id = id;
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      email: this.#email,
    };
  }
}

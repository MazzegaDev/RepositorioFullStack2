

export default class Usuario {

    #nome;
    #email;

    get email() {
        return this.#email;
    }

    get nome() {
        return this.#nome;
    }

    constructor(nome, email) {
        this.#email = email;
        this.#nome = nome;
    }

    toJSON() {
        return {
            nome: this.#nome,
            email: this.#email
        }
    }
}
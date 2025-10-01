import Base from "./base.js";


export default class Usuario extends Base {

    #id;
    #nome;
    #email;
    #senha
    #ativo;
    #perfil;

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#nome = value;
    }

    
    get senha() {
        return this.#senha;
    }

    set senha(value) {
        this.#senha = value;
    }

    get ativo() {
        return this.#ativo;
    }

    set ativo(value) {
        this.#ativo = value;
    }

    get perfil() {
        return this.#perfil;
    }

    set perfil(value) {
        this.#perfil = value;
    }


    constructor(id, nome, email, senha, ativo, perfil) {
        super();     
        this.#id = id;
        this.#email = email;
        this.#nome = nome;
        this.#senha = senha;
        this.#ativo = ativo;
        this.#perfil = perfil;
    }
}
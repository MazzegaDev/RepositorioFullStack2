import Base from "./base.js";

export default class ContratoEntity extends Base{
    #id;
    #imovel;// chave estrangeira
    #usuario;// chave estrangeira

    get id(){

        return this.#id;
    }
    set id(id){

        this.#id = id;
    }

    get imovel(){
        return this.#imovel
    }
    set imovel(imovel){
        this.#imovel = imovel;
    }

    get usuario(){
        return this.#usuario
    }
    set usuario(usuario){
        this.#usuario = usuario;
    }

    constructor(id, imovel, usuario){
        super();

        this.#id = id;

        this.#imovel = imovel;

        this.#usuario = usuario;
    }
}
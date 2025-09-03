export default class Base{
    constructor(){

    }

    toJSON(){           
        //getOwnPropertyNames -> pega os atributos da classe que instanciou
        //Object.getPrototypeOf(this) -> pega o esqueleto da classe que instanciou o metodo
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    }
}
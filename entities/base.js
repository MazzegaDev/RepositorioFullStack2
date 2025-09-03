export default class Base{
    constructor(){

    }

    toJSON(){           
        //getOwnPropertyNames -> pega os atributos da classe que instanciou
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    }
}
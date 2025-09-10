export default class Base{
    constructor(){

    }

    toJSON(){           
        //getOwnPropertyNames -> pega o esqueleto da classe e retorna as propriedades
        //Object.getPrototypeOf(this) -> pega o esqueleto da classe que instanciou o metodo
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        let json = {}
        
        for(let prop of props){
            //Atribui o valor de cada atribuito encontrado no json
            /*
                essas props sao recuperadas pelo getPropertyNames, assim temos seu nome
                com o this[props] acessamos seu valor

                json[prop] = this[prop] é a mesma coisa que json[id] = this[valor do id] isso mudaria a cada iteração
            */
            json[prop] = this[prop]

            
        }
        return json
    }
}
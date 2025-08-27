export default class PerfilEntity{

    #id;
    #descricao;

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get descricao(){
        return this.#descricao;
    }
    
    set descricao(descricao){
        this.#descricao = descricao;
    }

    toJSON(){
        return{
            id: this.#id,
            descricao: this.descricao,
        }
    }
}
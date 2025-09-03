import Perfil from "../entities/perfil.js";
import Usuario from "../entities/usuario.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class UsuarioController {

    #repositorio;

    constructor() {
        this.#repositorio = new UsuarioRepository();
        //poderia ter mais repositórios dependendo do uso
    }

    async listar(req, res) {
        console.log(req.query);
        try {
            let lista = await this.#repositorio.listar();
            if(lista.length > 0)
                res.status(200).json(lista);
            else 
                res.status(404).json({msg: "Nenhum usuário foi encontrado!"});
        }
        catch(exception) {
            console.log(exception);
            res.status(500).json({msg: "Erro ao processar requisição"});
        }
    }

    async cadastrar(req, res) {
        try {
            //recuperar as informações do usuario no corpo da requisição
            let {nome, email, senha, ativo, perfil} = req.body;
            if(nome && email && senha && ativo && perfil && perfil.id) {
                //nome e email são diferentes de undefined
                // Date.now() gera um id aleatório simulando o id do banco
                let entidade = new Usuario(0, nome, email, senha, ativo, new Perfil(perfil.id));
                let inseriu = await this.#repositorio.cadastrar(entidade);
                if(inseriu == true) {
                    return res.status(200).json({msg: "Usuário cadastro com sucesso"});
                }
                else {
                    //não inseriu no bd
                    throw new Error("Erro ao cadastrar usuário. Não foi possível persisti-lo no banco de dados");
                }
                //
            }
            else {
                //nome ou email são undefined
                return res.status(400).json({msg: "O usuário precisa ter nome e e-mail definidos!"})
            }
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: exception.message});
        }
    }

    async deletar(req, res) {
        try{
            let {id} = req.params;
            if(await this.#repositorio.buscarPorId(id)) {
                //o usuario para deleção existe;
                if(await this.#repositorio.deletar(id))
                    return res.status(200).json({msg: "Usuário excluído com sucesso!"});
                else
                    throw new Error("Erro ao deletar usuário no banco de dados")
            }
            else {
                //usuario para deleção não existe;
                return res.status(404).json({msg: "Usuário não encontrado para deleção"});
            }

        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: exception.message});
        }
    }

    async atualizar(req, res) {
        try {
            let {id, nome, email, senha, ativo, perfil} = req.body;

            if(id && nome && email && senha && ativo && perfil && perfil.id) {
                if(await this.#repositorio.buscarPorId(id)) {
                    let entidade = new Usuario(id, nome, email, senha, ativo, new Perfil(perfil.id));
                    if(await this.#repositorio.alterar(entidade))
                        res.status(200).json({msg: "Usuário alterado!"});
                    else
                        throw new Error("Erro ao alterar usuário no banco de dados");
                }
                else {
                    res.status(404).json({msg: "Usuário não encontrado para alteração"});
                }
            }
            else {
                res.status(400).json({msg: "As informações do usuário não estão corretas!"})
            }

        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: exception.message});
        }
    }

    async obterPorId(req, res) {
        try{
            let {id} = req.params;
            let usuario = await this.#repositorio.buscarPorId(id);
            if(usuario) {
                return res.status(200).json(usuario);
            }
            else
                return res.status(404).json({msg: "Usuário não encontrado!"});
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: exception.message});
        }
    }
}
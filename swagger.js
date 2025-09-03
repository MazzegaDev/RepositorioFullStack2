import swaggerAutogen from "swagger-autogen";

const doc = {
    host: "localhost:5000",
    info: {
        title: "API REST - PFS2",
        description: "API REST para a construção do backend na disciplina de PFS2"
    },
    components: {
        schemas: {
            erro: {
                msg: 'Mensagem de erro'
            },
            usuario: {
                nome: "Fulano de Tal",
                email: "fulano@unoeste.br",
                senha: "123abc",
                ativo: true,
                perfil: {
                    id: 1
                }
            },
            imovel: {
                descricao: "casa na praia",
                cep: "666-666",
                endereco: "Bairro teste",
                bairro: "Caixa prego",
                cidade: "Bostinopolis",
                valor: 869.21,
                disponivel: "S", 
            }
        }
    }
}

const routes = ['./server.js']
const outputJson = './swaggerOutput.json';
swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then(async () => {
  await import("./server.js");
})

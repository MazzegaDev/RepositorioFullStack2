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
                id: 999,
                nome: "Fulano de Tal",
                email: "fulano@unoeste.br",
                senha: "123abc",
                ativo: true,
                perfil: {
                    id: 1
                }
            },
            imovel: {
                id: 999,
                descricao: "Casa na praia",
                cep: "19000-000",
                endereco: "Rua dos bobos, número 0",
                bairro: "Bairro teste",
                cidade: "Presidente Prudente",
                valor: 850.60,
                disponivel: "S"
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
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

import swaggerAutogen from "swagger-autogen";

//Documentação da nossa API
const docs = {
  host: "localhost:5000",
  info: {
    tittle: "API REST - PFS2",
    description: "API REST para a construção do backend na disciplina",
  },
  components: {
    schemas: {
      erro:{
        msg: "mensagem de erro"
      },
      usuario:{
        nome: "nome do usuario",
        email: "email do usuario",
        senha: "123abc",
        ativo: true,
        perfil: {
          id: 1,
        }
      }
    }
  }
}

const routes = ["./server.js"];
const outputJson = "./swaggerOutput.json";

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, docs)

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, docs)
.then(async () => {
  //Quando executa o swagger.js ele documenta nossa API e executa a aplicacao, assim automatizando tudo
  await import("./server.js")
})

/*
    "scripts": 
    "start": "node swagger.js",
    essa configuração no package.json faz com oque o npm start execute o swagger e a aplicação

  },
*/


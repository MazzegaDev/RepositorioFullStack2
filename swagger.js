import swaggerAutogen from "swagger-autogen";

//Documentação da nossa API
const doc = {
  host: "localhost:5000",
  info: {
    tittle: "API REST - PFS2",
    description: "API REST para a construção do backend na disciplina",
  },
};

const routes = ["./server.js"];
const outputJson = "./swaggerOutput.json";
swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
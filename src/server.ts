import express from "express";
import { AppDataSourceInstance }  from "./data-source";

const app = express();
app.use(express.json());
 

AppDataSourceInstance.initialize() 
  .then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((error) => console.log(error));

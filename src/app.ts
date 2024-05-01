import express, { Response } from 'express';
import router from "./routes";
import "reflect-metadata";
import {AppDataSource} from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(() => {
    console.log("Banco de dados conectado.");
}).catch(erro => {
    console.log(erro);
})

app.get("/", (_, res:Response) => {
    res.send("Bem vindo ao curso de TypeScript!");
});

export default app;
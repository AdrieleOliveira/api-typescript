import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { Request, Response } from "express";
import PetEntity from "../entities/PetEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteController{
    constructor(private repository: AdotanteRepository) { }

    async criaAdotante(req: Request, res:Response){
        try {
            const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

            const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

            await this.repository.criaAdotante(novoAdotante);

            return res.status(201).json(novoAdotante);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o adotante' });
        }
    }

    async listaAdotantes(req: Request, res:Response){
        const lista = await this.repository.listaAdotantes();
        return res.status(200).json(lista);
    }

    async atualizaAdotante(req: Request, res:Response){
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaAdotante(Number(id), req.body as AdotanteEntity);

        if (!success){
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async deletaAdotante(req: Request, res: Response){
        const { id } = req.params;
        const { success, message } = await this.repository.deletaAdotante(Number(id));

        if (!success){
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(req: Request, res: Response){
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaEnderecoAdotante(Number(id), req.body as EnderecoEntity);

        if (!success){
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }
}
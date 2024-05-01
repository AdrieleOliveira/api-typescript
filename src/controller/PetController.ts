import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

//let listaDePets:TipoPet[] = [];
let listaDePets: Array<TipoPet> = [];

let id = 0;

function geraId() {
    id = id + 1;
    return id;
}

export default class PetController {

    constructor(private repository: PetRepository) { }

    criaPet(req: Request, res:Response){
        const { adotado, especie, dataDeNascimento, nome } = <PetEntity> req.body;

        if(!adotado || !especie || !nome || !dataDeNascimento){
            return res.status(400).json({ error: "Todos os campos são obrigatórios. " })
        }

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({ error: "Espécie inválida "});
        }

        const novoPet = new PetEntity();
        novoPet.adotado = adotado;
        novoPet.nome = nome;
        novoPet.dataDeNascimento = dataDeNascimento;
        novoPet.especie = especie;

        this.repository.criaPet(novoPet);

        return res.status(201).json(novoPet);
    }

    async listaPets(req: Request, res:Response){
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res:Response){
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(Number(id), req.body as PetEntity);

        if (!success){
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async deletaPet(req: Request, res: Response){
        const { id } = req.params;
        const { success, message } = await this.repository.deletaPet(Number(id));

        if (!success){
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }
}
import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

//let listaDePets:TipoPet[] = [];
let listaDePets: Array<TipoPet> = [];

let id = 0;

function geraId() {
    id = id + 1;
    return id;
}

export default class PetController {

    constructor(private repository: PetRepository) { }

    async criaPet(req: Request, res:Response){
        const { adotado, especie, dataDeNascimento, nome, porte } = <PetEntity> req.body;

        if(!adotado || !especie || !nome || !dataDeNascimento){
            return res.status(400).json({ error: "Todos os campos são obrigatórios. " })
        }

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({ error: "Espécie inválida "});
        }

        if(porte && !(porte in EnumPorte)){
            return res.status(400).json({ error: "Porte inválido "});
        }

        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

        await this.repository.criaPet(novoPet);

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

    async adotaPet(req: Request, res: Response){
        const { pet_id, id_adotante } = req.params;
        const { success, message } = await this.repository.adotaPet(Number(pet_id), Number(id_adotante));

        if (!success){
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async buscaPet(req: Request, res: Response){
        const { campo, valor } = req.query;
        const lista = await this.repository.buscaPet(campo as keyof PetEntity, valor as string);

        return res.status(200).json(lista);
    }
}
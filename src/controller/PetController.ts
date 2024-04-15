import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";

//let listaDePets:TipoPet[] = [];
let listaDePets: Array<TipoPet> = [];

export default class PetController {
    criaPet(req: Request, res:Response){
        //const novoPet = req.body as TipoPet;
        const { id, adotado, especie, idade, nome } = <TipoPet> req.body;
        const novoPet:TipoPet = { id, adotado, especie, idade, nome };

        listaDePets.push(novoPet);

        return res.status(201).json(novoPet);
    }

    listaPets(req: Request, res:Response){
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req: Request, res:Response){
        const { id } = req.params;
        const { adotado, especie, idade, nome } = req.body as TipoPet;
        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet){
            return res.status(404).json({ erro: "Pet não encontrado "});
        }

        pet.nome = nome;
        pet.idade = idade;
        pet.especie = especie;
        pet.adotado = adotado;

        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res: Response){
        const { id } = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet){
            return res.status(404).json({ erro: "Pet não encontrado" });
        }

        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);

        return res.status(200).json({ mensagem: "Pet deletado com sucesso." });
    }
}
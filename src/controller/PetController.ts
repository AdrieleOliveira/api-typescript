import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";

//let listaDePets:TipoPet[] = [];
let listaDePets: Array<TipoPet> = [];


let id = 0;
function geraId() {
    id = id + 1;
    return id;
}

export default class PetController {
    criaPet(req: Request, res:Response){
        //const novoPet = req.body as TipoPet;
        const { adotado, especie, dataNascimento, nome } = <TipoPet> req.body;

        if(!adotado || !especie || !nome || !dataNascimento){
            return res.status(400).json({ error: "Todos os campos são obrigatórios. " })
        }

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({ error: "Espécie inválida "});
        }

        const novoPet:TipoPet = { id: Number(geraId()), adotado, especie, dataNascimento, nome };

        listaDePets.push(novoPet);

        return res.status(201).json(novoPet);
    }

    listaPets(req: Request, res:Response){
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req: Request, res:Response){
        const { id } = req.params;
        const { adotado, especie, dataNascimento, nome } = req.body as TipoPet;
        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet){
            return res.status(404).json({ error: "Pet não encontrado "});
        }

        pet.nome = nome;
        pet.dataNascimento = dataNascimento;
        pet.especie = especie;
        pet.adotado = adotado;

        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res: Response){
        const { id } = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet){
            return res.status(404).json({ error: "Pet não encontrado" });
        }

        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);

        return res.status(200).json({ mensagem: "Pet deletado com sucesso." });
    }
}
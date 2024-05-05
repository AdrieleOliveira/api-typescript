import PetEntity from "../../entities/PetEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository{
    criaPet(pet:PetEntity):void;
    listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> | void;
    deletaPet(id: number): Promise<{ success: boolean; message?: string }> | void;
    adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }> | void;
    buscaPet<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> | PetEntity[];
}
import EnumEspecie from "../enum/EnumEspecie";

type TipoPet = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    adotado: boolean;
    dataNascimento: Date;
}

export default TipoPet;
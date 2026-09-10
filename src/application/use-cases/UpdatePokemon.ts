import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepository } from "@domain/repositories/pokemon-repository"; 

interface UpdatePokemonDTO{
    nome?: string;
    tipos?: string[];
    nivel?: number;
    hp?: number;
}

export class UpdatePokemonUseCase{
    constructor(private pokemonrepository: IPokemonRepository){}

    async execute(id: string, data: UpdatePokemonDTO): Promise <Pokemon>{
        const existpokemon = await this.pokemonrepository.findById(id);
        if(!existpokemon){
            throw new Error("Esse Pokemón não existe!");
        }

        const UpdatedPokemon = new Pokemon({
            id: existpokemon.id,
            nome: data.nome ?? existpokemon.nome,
            tipos: data.tipos ?? existpokemon.tipos,
            nivel: data.nivel ?? existpokemon.nivel,
            hp: data.nivel ?? existpokemon.nivel
        });

        const result = await this.pokemonrepository.update(id, UpdatedPokemon);
            if(!result){
                throw new Error("Erro ao atualizar o Pokemón!")
            }
            return result;
        }
    }

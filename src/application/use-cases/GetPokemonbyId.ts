import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepository } from "@domain/repositories/pokemon-repository";

export class GetPokemonbyIdUseCase{
    constructor( private pokemonrepository: IPokemonRepository){}

    async execute(id: string): Promise <Pokemon>{
        const pokemon = await this.pokemonrepository.findById(id);
        if(!pokemon){
            throw new Error("Pokemón não encontrado!");
        }
        return pokemon;
    }

    
}
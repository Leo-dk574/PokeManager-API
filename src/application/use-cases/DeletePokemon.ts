import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepository } from "@domain/repositories/pokemon-repository";

export class DeletePokemonUseCase{
    constructor(private pokemonrepository: IPokemonRepository){}

    async execute(id: string): Promise <void>{
        const deleted = await this.pokemonrepository.delete(id);
        if(!deleted){
            throw new Error("Pokemón não encontrado!");
        }
    }
}
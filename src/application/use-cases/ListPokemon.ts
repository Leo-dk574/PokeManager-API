import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepository } from "@domain/repositories/pokemon-repository";

interface ListPokemonsDTO{
    tipo?: string;
}

export class ListPokemonUseCase{
    constructor(private pokemonrepository: IPokemonRepository){}

    async execute(tipo?: ListPokemonsDTO): Promise<Pokemon[]>{
        return this.pokemonrepository.findAll(tipo);
    }

}
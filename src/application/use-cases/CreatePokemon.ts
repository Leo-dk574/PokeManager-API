import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepository } from "@domain/repositories/pokemon-repository";

interface CreatePokemonDTO{
    id?: string;
    nome: string;
    tipos: string[]; // pokemóns podem ter até dois tipos por exemplo: ['Fogo', 'Voador']
    nivel: number;
    hp: number;
}

export class CreatePokemonUseCase {
    constructor(private pokemonrepository: IPokemonRepository){}

 async execute(data: CreatePokemonDTO): Promise <Pokemon>{
    const pokemon = new Pokemon(data);
    await this.pokemonrepository.create(pokemon);
    return pokemon;
 }  
}
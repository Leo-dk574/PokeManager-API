import { Pokemon } from "@domain/entities/pokemon";

export interface IPokemonRepository{
    create(pokemon: Pokemon): Promise <void>;
    findAll(filters?: { tipo?: string }): Promise <Pokemon[]>;
    findById(id: string): Promise <Pokemon | null>;
    update(id: string, pokemon: Pokemon): Promise <Pokemon | null>;
    delete(id: string): Promise <boolean>;
}
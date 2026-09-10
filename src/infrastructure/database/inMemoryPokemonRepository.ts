import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  public items: Pokemon[] = [];

  async create(pokemon: Pokemon): Promise<void> {
    this.items.push(pokemon);
  }

  async findAll(filters?: { tipo?: string }): Promise<Pokemon[]> {
    if (filters?.tipo) {
      return this.items.filter((item) =>
        item.tipos.some(
          (t) => t.toLowerCase() === filters.tipo?.toLowerCase()
        )
      );
    }
    return this.items;
  }

  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = this.items.find((item) => item.id === id);
    return pokemon ?? null;
  }

  async update(id: string, pokemon: Pokemon): Promise<Pokemon | null> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.items[index] = pokemon;
    return this.items[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }
}
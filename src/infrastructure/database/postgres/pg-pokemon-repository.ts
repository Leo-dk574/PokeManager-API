import { postgresPool } from './connection';
import { IPokemonRepository } from '@domain/repositories/pokemon-repository';
import { Pokemon } from '@domain/entities/pokemon';

export class PgPokemonRepository implements IPokemonRepository {
  private mapToEntity(row: any): Pokemon {
    return new Pokemon({
      id: row.id,
      nome: row.nome,
      tipos: row.tipos,
      nivel: Number(row.nivel),
      hp: Number(row.hp)
    });
  }

  async create(pokemon: Pokemon): Promise<void> {
    const query = `
      INSERT INTO pokemons (id, nome, tipos, nivel, hp)
      VALUES ($1, $2, $3, $4, $5);
    `;

    await postgresPool.query(query, [
      pokemon.id,
      pokemon.nome,
      pokemon.tipos, // Array do JS é convertido automaticamente para TEXT[] no PostgreSQL
      pokemon.nivel,
      pokemon.hp
    ]);
  }

  async findAll(): Promise<Pokemon[]> {
    const query = `SELECT id, nome, tipos, nivel, hp FROM pokemons;`;
    const { rows } = await postgresPool.query(query);
    return rows.map(row => this.mapToEntity(row));
  }

  async findById(id: string): Promise<Pokemon | null> {
    const query = `SELECT id, nome, tipos, nivel, hp FROM pokemons WHERE id = $1;`;
    const { rows } = await postgresPool.query(query, [id]);
    return rows[0] ? this.mapToEntity(rows[0]) : null;
  }

  async update(id: string, pokemon: Partial<Pokemon>): Promise<Pokemon | null> {
    const query = `
      UPDATE pokemons
      SET nome = COALESCE($1, nome),
          tipos = COALESCE($2, tipos),
          nivel = COALESCE($3, nivel),
          hp = COALESCE($4, hp)
      WHERE id = $5
      RETURNING id, nome, tipos, nivel, hp;
    `;

    const { rows } = await postgresPool.query(query, [
      (pokemon as any).nome,
      (pokemon as any).tipos,
      (pokemon as any).nivel ?? (pokemon as any).level,
      (pokemon as any).hp,
      id
    ]);

    return rows[0] ? this.mapToEntity(rows[0]) : null;
  }

  async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM pokemons WHERE id = $1;`;
    const result = await postgresPool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async updateLevel(id: string, newLevel: number): Promise<void> {
    const query = `UPDATE pokemons SET nivel = $1 WHERE id = $2;`;
    await postgresPool.query(query, [newLevel, id]);
  }

  async searchByName(term: string): Promise<Pokemon[]> {
    const query = `SELECT id, nome, tipos, nivel, hp FROM pokemons WHERE nome ILIKE $1;`;
    const { rows } = await postgresPool.query(query, [`%${term}%`]);
    return rows.map(row => this.mapToEntity(row));
  }
}
export interface PokemonProps{
id?: string;
nome: string;
tipos: string[]; // pokemóns podem ter até dois tipos por exemplo: ['Fogo', 'Voador']
nivel: number;
hp: number;
}

export class Pokemon {
private props: PokemonProps;

    constructor(props: PokemonProps){
        if(!props.nome || props.nome.trim() === ''){     
            throw new Error("O Pokemón deve ter um nome!");
        }
        if(!props.nivel || props.nivel < 1 || props.nivel > 100){
            throw new Error("O Pokemón deve ter nível entre 1 e 100!");
        }
        if(!props.tipos || props.tipos.length === 0 || props.tipos.length > 2){
            throw new Error("Pokemóns devem ter 1 ou 2 tipos!"); 
        }
        if(!props.hp || props.hp < 0){
            throw new Error("O Pokemón não pode ter HP negativo!");
        }
        
        this.props = {
            ...props,
            nome: props.nome.trim(),
            id: props.id ?? crypto.randomUUID(), 
        };    
    }

    get id(){
    return this.props.id!;
    }

    get nome(){
    return this.props.nome;
    }

    get tipos(){
    return this.props.tipos;
    }

    get nivel(){
    return this.props.nivel;
    }

    get hp(){
    return this.props.hp;
    }
}
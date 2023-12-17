export interface AppTypeInitialState {
  toasts: string[]
}

export interface PokemonTypeInitialState {
  // either it is undefined or array[] of genericPokemonType
  allPokemon: undefined | genericPokemonType[]
  randomPokemons: undefined | generatedPokemonType[]
  compareQueue: generatedPokemonType[]
}

export interface genericPokemonType {
  name: string
  url: string
}

export interface generatedPokemonType {
  name: string
  id: number
  image: string
  types: pokemonTypeInterface[]
}

export interface pokemonTypeInterface {
  [key: string]: {
    image: string
    strength: string[]
    weakness: string[]
    resistance: string[]
    vulnerable: string[]
  }
}

export interface userPokemonsType extends generatedPokemonType {
  /**
   * Optional property: firebaseId of pokemon which
   * we are going to store inside the firebase
   */
  firebaseId?: string
}

export type pokemonStatType =
  | "vulnerable"
  | "weakness"
  | "strength"
  | "resistance"

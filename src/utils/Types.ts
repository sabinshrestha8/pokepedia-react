export interface AppTypeInitialState {
  toasts: string[]
  userInfo: undefined | { email: string }
  currentPokemonTab: string
}

export interface PokemonTypeInitialState {
  // either it is undefined or array[] of genericPokemonType
  allPokemon: undefined | genericPokemonType[]
  randomPokemons: undefined | generatedPokemonType[]
  compareQueue: generatedPokemonType[]
  userPokemons: userPokemonsType[]
  currentPokemon: undefined | currentPokemonType
}

export interface currentPokemonType {
  id: number
  name: string
  types: pokemonTypeInterface[]
  image: string
  stats: pokemonStatsType[]
  encounters: string[]
  evolution: { level: number; pokemon: { name: string; url: string } }[]
  pokemonAbilities: {
    abilities: string[]
    moves: string[]
  }
  evolutionLevel: number
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

export interface pokemonStatsType {
  name: string
  value: string
}

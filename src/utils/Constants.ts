export const pokemonAPI = "https://pokeapi.co/api/v2"
export const pokemonsRoute = `${pokemonAPI}/pokemon?limit=5000`
export const pokemonRoute = `${pokemonAPI}/pokemon`
export const pokemonSpeciesRoute = `${pokemonAPI}/pokemon-species`

// Tabbing Structure
export const pokemonTabs = {
  description: "description",
  evolution: "evolution",
  locations: "locations",
  moves: "moves",
}

export const navigationRoutes = [
  {
    name: "Search",
    route: "/search",
  },
  {
    name: "Compare",
    route: "/compare",
  },
  {
    name: "Pokemon",
    route: "/pokemon",
  },
  {
    name: "My List",
    route: "/list",
  },
  {
    name: "About",
    route: "/about",
  },
]

// Lightness Threshold
export const lightnessThreshold = 0.76 // Adjust this threshold based on your preference

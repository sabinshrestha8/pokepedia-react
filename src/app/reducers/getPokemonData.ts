// @ts-nocheck
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { pokemonTypes } from "../../utils/getPokemonTypes"
import { defaultImages, images } from "../../utils/getPokemonImages"
import { generatedPokemonType, genericPokemonType } from "../../utils/Types"

export const getPokemonData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: genericPokemonType[]) => {
    try {
      const pokemonData: generatedPokemonType[] = []

      for await (const pokemon of pokemons) {
        const {
          data,
        }: { data: { id: number; types: { type: generatedPokemonType }[] } } =
          await axios.get(pokemon.url)

        const types = data.types.map(
          ({ type: { name } }: { type: { name: string } }) => ({
            // @ts-expect-error
            [name]: pokemonTypes[name],
          }),
        )

        // @ts-expect-error
        // let image: string = images[data.id]

        let image: string = images[`/assets/pokemons/shiny/${data.id}`]

        if (!image) {
          // @ts-expect-error
          image = defaultImages[`/assets/pokemons/default/${data.id}`]
        }

        if (image) {
          pokemonData.push({
            name: pokemon.name,
            id: data.id,
            image,
            types,
          })
        }
        // else {
        //   console.log("no image")
        // }
      }
      // console.log(pokemonData)
      return pokemonData
    } catch (error) {
      console.log(error)
    }
  },
)

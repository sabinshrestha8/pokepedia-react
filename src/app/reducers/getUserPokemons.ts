import { RootState } from "../store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { userPokemonsType } from "../../utils/Types"
import { getDocs, query, where } from "firebase/firestore"
import { pokemonListRef } from "../../utils/FirebaseConfig"
import { defaultImages, images } from "../../utils/getPokemonImages"
import { pokemonTypes } from "../../utils/getPokemonTypes"

/*
 * When you use createAsyncThunk(), you are creating a thunk action creator.
 * This creator fn, when invoked, returns a thunk action. Thunk action is
 * a special type of fn, when dispatched, triggers async or complex logic
 * defined in the payloadCreator function.
 */
export const getUserPokemons = createAsyncThunk(
  "pokemon/userLIst",
  async (_args, { getState }) => {
    try {
      // Use nested destructuring to get userInfo from the app slice in the state
      const {
        app: { userInfo },
      } = getState() as RootState

      // Check if the user is logged in
      if (!userInfo?.email) {
        return // If not logged in, return early
      }

      // Create a Firestore query to get documents where the email matches the user's email
      const firestoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo.email),
      )

      // Execute the query and get the documents
      const fetchedPokemons = await getDocs(firestoreQuery)

      // Check if there are any documents
      if (fetchedPokemons.docs.length) {
        const userPokemons: userPokemonsType[] = []

        // Iterate over the fetched documents
        fetchedPokemons.forEach(async (pokemon) => {
          const pokemons = await pokemon.data().pokemon

          // @ts-ignore
          let image = images[`/assets/pokemons/shiny/${pokemons.id}`]

          if (!image) {
            // @ts-ignore
            image = defaultImages[`/assets/pokemons/default/${pokemons.id}`]
          }

          // Map Pokemon type names to their corresponding types from the PokemonTypes object
          const types = pokemons.types.map((name: string) => ({
            [name]: pokemonTypes[name],
          }))

          // Push the formatted Pokemon data into the userPokemons array
          userPokemons.push({
            ...pokemons,
            firebaseId: pokemons.id,
            image,
            types,
          })
        })

        // Return the array of user's Pokemon
        return userPokemons
      }
      // If no documents were found, return an empty array
      return []
    } catch (error) {
      console.log(error)
    }
  },
)

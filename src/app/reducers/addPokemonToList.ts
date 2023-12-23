import {
  pokemonStatsType,
  pokemonTypeInterface,
  userPokemonsType,
} from "../../utils/Types"
import { RootState } from "../store"
import { addDoc } from "firebase/firestore"
import { setToast } from "../slices/AppSlice"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { pokemonListRef } from "../../utils/FirebaseConfig"
import { getUserPokemons } from "./getUserPokemons"

/*
 * createAsyncThunk() generates promise lifecycle action types based on
 * action type prefix that you pass in, & returns a thunk action creator
 * that will run the promise callback & dispatch the lifecycle actions
 * based on the returned promise
 */
export const addPokemonToList = createAsyncThunk(
  "pokemon/addPokemon",
  async (
    pokemon: {
      id: number
      name: string
      types: pokemonTypeInterface[] | string[]
      stats?: pokemonStatsType[]
    },
    { getState, dispatch },
  ) => {
    try {
      // Destructure the state to get userInfo and userPokemons from the app and pokemon slices
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState

      // Check if the user is logged in
      if (!userInfo?.email) {
        // if not dispatch a toast msg asking user to login
        return dispatch(
          setToast("Please login in order to add pokemon to your collection."),
        )
      }

      // Check if the pokemon is already inside userPokemons if true then return its index if not then will return -1.
      const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
        return userPokemon.name === pokemon.name
      })

      // If the pokemon is not already in the userPokemons
      if (index === -1) {
        // Initialize an empty array to store Pokemon types
        let types: string[] = []

        // Check if the Pokemon has stats
        if (!pokemon.stats) {
          // If it doesn't have stats, extract types from the 'types' property
          pokemon.types.forEach((type: any) =>
            types.push(Object.keys(type).toString()),
          )
        } else {
          // If it has stats, use the 'types' property directly
          types = pokemon.types as string[]
        }

        // Add the pokemon to the FirestoreDB collection
        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
        })

        // Dispatch an action to fetch the updated user's pokemons
        await dispatch(getUserPokemons())

        // Return a success message via a toast notification
        return dispatch(
          setToast(
            `${
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            } added to your collection.`,
          ),
        )
      } else {
        // Return a message indicating the pokemon is already in the collection
        return dispatch(
          setToast(
            `${
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
            } already part of your collection.`,
          ),
        )
      }
    } catch (error) {
      // Logging error on console
      console.log(error)
    }
  },
)

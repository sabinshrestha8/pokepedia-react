import { createSlice } from "@reduxjs/toolkit"
import {
  PokemonTypeInitialState,
  generatedPokemonType,
} from "../../utils/Types"
import { getInitialPokemonData } from "../reducers/getInitialPokemonData"
import { getPokemonData } from "../reducers/getPokemonData"
import { getUserPokemons } from "../reducers/getUserPokemons"

const initialState: PokemonTypeInitialState = {
  allPokemon: undefined,
  randomPokemons: undefined,
  compareQueue: [],
  userPokemons: [],
}

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  /**
   * Use the `reducers` field to define reducer functions that
   * directly modify the state managed by the current slice.
   */
  reducers: {
    addToCompare: (state, action) => {
      // Find the index of the Pokemon with the same ID in the compareQueue array
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id,
      )

      // If the Pokemon is not already in the compareQueue
      if (index === -1) {
        // Check if the compareQueue has reached its maximum capacity (2 Pokemon)
        if (state.compareQueue.length === 2) {
          state.compareQueue.pop()
        }

        // Add the new Pokemon to the front of the compareQueue (unshift)
        state.compareQueue.unshift(action.payload)
      }
    },
    removeFromCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id,
      )

      // Create a copy of the compareQueue array
      const queue = [...state.compareQueue]

      // Remove the Pokemon at the found index from the copied array
      queue.splice(index, 1)

      // Update the state's compareQueue with the modified array
      state.compareQueue = queue
    },
  },
  /**
   * Use the `extraReducers` field to define reducer functions
   * that respond to actions from other slices & update its
   * state in response to those actions.
   */
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload
    })
    builder.addCase(getPokemonData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload
    })
    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      // if (action.payload) {
      //   state.userPokemons = action.payload
      // }
      state.userPokemons = action.payload!
    })
  },
})

export const { addToCompare, removeFromCompare } = PokemonSlice.actions

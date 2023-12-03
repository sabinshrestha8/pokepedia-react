import React, { useEffect } from "react"
import Wrapper from "../sections/Wrapper"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData"
import { getPokemonData } from "../app/reducers/getPokemonData"
import PokemonCardGrid from "../components/PokemonCardGrid"

function Search() {
  const dispatch = useAppDispatch()
  // The selector fn takes the curr state as its args & return specific data you want to select.
  // const { allPokemon } = useAppSelector((state) => state.pokemon)
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon,
  )

  useEffect(() => {
    dispatch(getInitialPokemonData())
  }, [dispatch])

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon]
      const randomPokemonId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20)

      dispatch(getPokemonData(randomPokemonId))
    }
  }, [allPokemon])

  return (
    <>
      <div className="search">
        <input
          type="text"
          className="pokemon-searchbar"
          placeholder="Search Pokemon"
        />
        <PokemonCardGrid pokemons={randomPokemons!} />
      </div>
    </>
  )
}

export default Wrapper(Search)

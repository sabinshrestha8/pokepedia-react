import React, { useEffect, useState } from "react"
import Wrapper from "../sections/Wrapper"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData"
import { getPokemonData } from "../app/reducers/getPokemonData"
import PokemonCardGrid from "../components/PokemonCardGrid"
import { debounce } from "../utils/Debounce"

function Search() {
  const dispatch = useAppDispatch()
  // The selector fn takes the curr state as its args & return specific data you want to select.
  // const { allPokemon } = useAppSelector((state) => state.pokemon)
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon,
  )
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  useEffect(() => {
    if (!initialDataLoaded) {
      dispatch(getInitialPokemonData())
      setInitialDataLoaded(true)
    }
  }, [dispatch, initialDataLoaded])

  useEffect(() => {
    if (allPokemon && initialDataLoaded) {
      const clonedPokemons = [...allPokemon]
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20)

      dispatch(getPokemonData(randomPokemonsId))
    }
  }, [allPokemon, dispatch, initialDataLoaded])

  // useEffect(() => {
  //   console.log("useEffect is being executed")
  //   dispatch(getInitialPokemonData())
  // }, [dispatch])

  // useEffect(() => {
  //   if (allPokemon) {
  //     const clonedPokemons = [...allPokemon]
  //     const randomPokemonsId = clonedPokemons
  //       .sort(() => Math.random() - Math.random())
  //       .slice(0, 20)

  //     dispatch(getPokemonData(randomPokemonsId))
  //   }
  // }, [allPokemon, dispatch])

  const handleChange = debounce((value: string) => getPokemon(value), 300)

  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase()),
      )
      dispatch(getPokemonData(pokemons!))
    } else {
      const clonedPokemons = [...(allPokemon as [])]
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20)
      dispatch(getPokemonData(randomPokemonsId))
    }
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          className="pokemon-searchbar"
          placeholder="Search Pokemon"
          onChange={(e) => handleChange(e.target.value)}
          // onChange={(e) => getPokemon(e.target.value)}
        />
        <PokemonCardGrid pokemons={randomPokemons!} />
      </div>
    </>
  )
}

export default Wrapper(Search)

import React, { useEffect } from "react"
import Wrapper from "../sections/Wrapper"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData"
import { getPokemonData } from "../app/reducers/getPokemonData"
import PokemonCardGrid from "../components/PokemonCardGrid"
import { debounce } from "../utils/Debounce"
import Loader from "../components/Loader"
import { setLoading } from "../app/slices/AppSlice"

function Search() {
  const dispatch = useAppDispatch()
  // The selector fn takes the curr state as its args & return specific data you want to select.
  // const { allPokemon } = useAppSelector((state) => state.pokemon)
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon,
  )

  const isLoading = useAppSelector(({ app: { isLoading } }) => isLoading)

  // useEffect(() => {
  //   dispatch(getInitialPokemonData())
  // }, [])

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon]
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20)

      dispatch(getPokemonData(randomPokemonsId))
    }
  }, [dispatch, allPokemon])

  useEffect(() => {
    if (randomPokemons) dispatch(setLoading(false))
  }, [randomPokemons, dispatch])

  const handleChange = debounce((value: string) => getPokemon(value), 300)

  const getPokemon = (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase()),
      )

      if (pokemons) dispatch(getPokemonData(pokemons))
    } else {
      const clonedPokemons = [...(allPokemon || [])]
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20)
      dispatch(getPokemonData(randomPokemonsId))
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  )
}

export default Wrapper(Search)

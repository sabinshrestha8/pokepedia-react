import axios from "axios"
import Wrapper from "../sections/Wrapper"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { extractColors } from "extract-colors"
import React, { useEffect, useCallback, useState } from "react"
import { defaultImages, images } from "../utils/PokemonImages"
import {
  pokemonRoute,
  pokemonSpeciesRoute,
  pokemonTabs,
} from "../utils/Constants"
import Description from "./pokemon pages/Description"
import Evolution from "./pokemon pages/Evolution"
import CapableMoves from "./pokemon pages/CapableMoves"
import Locations from "./pokemon pages/Locations"
import { setCurrentPokemon } from "../app/slices/PokemonSlice"
import Loader from "../components/Loader"

function Pokemon() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { currentPokemonTab } = useAppSelector(({ app }) => app)
  const currentPokemon = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon,
  )
  const [isDataLoading, setIsDataLoading] = useState(true)

  const getRecursiveEvolution: any = useCallback(
    (evolutionChain: any, level: number, evolutionData: any) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon",
            ),
          },
          level,
        })
      }

      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      })

      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData,
      )
    },
    [],
  )

  const getEvolutionData = useCallback(
    (evolutionChain: any) => {
      const evolutionData: any[] = []
      getRecursiveEvolution(evolutionChain, 1, evolutionData)
      return evolutionData
    },
    [getRecursiveEvolution],
  )

  const getPokemonInfo = useCallback(
    async (image: string) => {
      const { data } = await axios.get(`${pokemonRoute}/${params.id}`)

      /*
       * The response data is destructured from result & stored in
       * variable dataEncounters which get us the location where the
       * user can find that pokemon.
       */
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters,
      )

      const {
        data: {
          evolution_chain: { url: evolutionURL },
        },
      } = await axios.get(`${pokemonSpeciesRoute}/${data.id}`)

      const { data: evolutionData } = await axios.get(evolutionURL)

      const encounters: string[] = []

      dataEncounters.forEach((encounter: any) => {
        encounters.push(
          encounter.location_area.name.toUpperCase().split("-").join(" "),
        )
      })

      // console.log(data)

      const pokemonAbilities: { abilities: string[]; moves: string[] } = {
        abilities: data.abilities.map(
          ({ ability }: { ability: { name: string } }) => ability.name,
        ),
        moves: data.moves.map(
          ({ move }: { move: { name: string } }) => move.name,
        ),
      }

      const evolution = getEvolutionData(evolutionData.chain)
      const evolutionLevel = evolution.find(
        ({ pokemon }) => pokemon.name === data.name,
      ).level

      dispatch(
        setCurrentPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map(
            ({ type: { name } }: { type: { name: string } }) => name,
          ),
          image,
          stats: data.stats.map(
            ({
              stat,
              base_stat,
            }: {
              stat: { name: string }
              base_stat: number
            }) => ({
              name: stat.name,
              value: base_stat,
            }),
          ),
          encounters,
          evolutionLevel,
          evolution,
          pokemonAbilities,
        }),
      )

      setIsDataLoading(false)
    },
    [getEvolutionData, params.id, dispatch],
  )

  useEffect(() => {
    const imageElemet = document.createElement("img")
    // @ts-ignore
    imageElemet.src = images[`/assets/pokemons/shiny/${params.id}`]
    if (!imageElemet.src) {
      // @ts-ignore
      imageElemet.src = defaultImages[`/assets/pokemons/shiny/${params.id}`]
    }

    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red: number, green: number, blue: number, alpha = 255) =>
        alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    }

    const setTabColor = async () => {
      /* extract the most dominant color from a given image
      using the extractColors() with specified options. */
      const color = await extractColors(imageElemet.src, options)

      // returns the root element(reference) of the document, which is usually the <html> element.
      const root = document.documentElement

      const accentColor = color[0].hex.split('"')[0]

      const lightnessThreshold = 0.76 // Adjust this threshold based on your preference

      // Apply the dominant color as the accent color to the root element.
      root.style.setProperty("--accent-color", accentColor)

      // Check lightness and set tab text color accordingly
      const lightness = color[0].lightness // Use the lightness value from the color object

      const alltabs = document.querySelectorAll(
        "footer .data ul li",
      ) as NodeListOf<HTMLElement>

      alltabs.forEach((tab) => {
        const isActive = tab.classList.contains("active")

        // store color based on given conditions
        const color = isActive
          ? lightness > lightnessThreshold
            ? "#2a2c3a"
            : "white"
          : "white"

        // overwrite tab text color
        tab.style.color = color
      })
    }

    setTabColor()

    getPokemonInfo(imageElemet.src)
  }, [params, getPokemonInfo])

  return (
    <>
      {!isDataLoading && currentPokemon ? (
        <>
          {currentPokemonTab === pokemonTabs.description && <Description />}
          {currentPokemonTab === pokemonTabs.evolution && <Evolution />}
          {currentPokemonTab === pokemonTabs.moves && <CapableMoves />}
          {currentPokemonTab === pokemonTabs.locations && <Locations />}
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Wrapper(Pokemon)

import React from "react"
import { useAppSelector } from "../../app/hooks"
import { calculateLightness } from "../../utils/Color"
import { lightnessThreshold } from "../../utils/Constants"

function CapableMoves() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon,
  )

  // Function to set text color based on lightness of color
  const setTextColorByLightness = () => {
    const root = document.documentElement

    const color = root.style.getPropertyValue("--accent-color")

    const lightness = calculateLightness(color)

    return lightness > lightnessThreshold ? "#2a2c3a" : "white"
  }

  return (
    <div className="capable-moves">
      <h1 className="capable-moves-title">Abilities</h1>
      <ul className="capable-moves-list ability">
        {pokemonData?.pokemonAbilities.abilities.map((ability: string) => (
          <li
            key={ability}
            className="move"
            style={{ color: setTextColorByLightness() }}
          >
            {ability}
          </li>
        ))}
      </ul>

      <h1 className="capable-moves-title">Moves</h1>
      <ul className="capable-moves-list">
        {pokemonData?.pokemonAbilities.moves.map((move: string) => (
          <li key={move} className="move">
            {move}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CapableMoves

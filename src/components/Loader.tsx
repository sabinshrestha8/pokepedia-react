import React from "react"
import pokeballLoader from "../assets/pokeball-loader.gif"

function Loader() {
  return (
    <div className="loader">
      <img src={pokeballLoader} alt="pokeball loading" />
    </div>
  )
}

export default Loader

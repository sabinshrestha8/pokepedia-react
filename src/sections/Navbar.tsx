import React, { useEffect } from "react"
import pokeballIcon from "../assets/pokeball-icon.png"
import { GiHamburgerMenu } from "react-icons/gi"
import { Link, useLocation } from "react-router-dom"
import { setPokemonTab } from "../app/slices/AppSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Sidebar from "./Sidebar"
import { navigationRoutes } from "../utils/Constants"

function Navbar() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { currentPokemonTab } = useAppSelector(({ app }) => app)

  /* const navigationRoutes = [
    {
      name: "Search",
      route: "/search",
    },
    {
      name: "Compare",
      route: "/compare",
    },
    {
      name: "Pokemon",
      route: "/pokemon",
    },
    {
      name: "My List",
      route: "/list",
    },
    {
      name: "About",
      route: "/about",
    },
  ] */

  useEffect(() => {
    const isPokemonRoute = location.pathname.includes("/pokemon")

    if (!isPokemonRoute) {
      // Dispatch the action to update the currentTab state
      dispatch(setPokemonTab(""))
    } else if (currentPokemonTab === "") {
      // If it's a Pokemon route and currentPokemonTab is empty, set it to "description"
      dispatch(setPokemonTab("description"))
    }

    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route),
    )

    ul(index)
  }, [location.pathname, navigationRoutes])

  function ul(index: number) {
    const underlines = document.querySelectorAll<HTMLElement>(".underline")

    underlines.forEach((underline) => {
      // underline.style.transform = "translate3d(" + index * 100 + "%, 0, 0)"
      underline.style.transform = `translate3d(${index * 100}%, 0, 0)`
    })
  }

  return (
    <nav>
      <div className="block">
        <img src={pokeballIcon} alt="pokeball icon" />
      </div>
      <div className="data">
        <ul>
          <div className="underline"></div>
          <div className="underline"></div>
          <div className="underline"></div>

          {navigationRoutes.map(({ name, route }, index) => {
            return (
              <Link to={route} key={index}>
                <li>{name}</li>
              </Link>
            )
          })}
        </ul>
      </div>
      <div className="block">
        {/* <GiHamburgerMenu /> */}
        <Sidebar />
      </div>
    </nav>
  )
}

export default Navbar

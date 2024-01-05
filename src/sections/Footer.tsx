import React from "react"
import { signOut } from "firebase/auth"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { firebaseAuth } from "../utils/FirebaseConfig"
import { MdOutlinePowerSettingsNew } from "react-icons/md"
import { setPokemonTab, setToast, setUserStatus } from "../app/slices/AppSlice"
import { lightnessThreshold, pokemonTabs } from "../utils/Constants"
import { useLocation } from "react-router-dom"
import { calculateLightness, setTextColorOnMouseEnter } from "../utils/Color"

function Footer() {
  const dispatch = useAppDispatch()
  const { currentPokemonTab } = useAppSelector(({ app }) => app)
  const location = useLocation()

  const handleLogout = () => {
    try {
      // End the user's authenticated session by invalidating the authentication token.
      signOut(firebaseAuth)

      dispatch(setUserStatus(undefined))
      dispatch(setToast("Logged out successfully from Firebase."))
    } catch (error) {
      console.log("Error signing out", error)
    }
  }

  const resetTextColorOnMouseLeave = (e: React.MouseEvent, route: string) => {
    const targetElement = e.target as HTMLElement

    const root = document.documentElement

    const color = root.style.getPropertyValue("--accent-color")

    const lightness = calculateLightness(color)

    if (currentPokemonTab === route) {
      // Set text color based on current tab
      targetElement.style.color =
        lightness > lightnessThreshold ? "#2a2c3a" : "white"
    } else {
      // Reset text color for other tabs
      targetElement.style.color = "white"
    }
  }

  const routes = [
    {
      name: pokemonTabs.description,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      value: "Catching",
    },
    {
      name: pokemonTabs.moves,
      value: "Capable Moves",
    },
  ]

  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            {routes.map((route) => {
              return (
                <li
                  key={route.name}
                  className={`${
                    currentPokemonTab === route.name ? "active" : ""
                  }`}
                  onClick={() => {
                    dispatch(setPokemonTab(route.name))
                  }}
                  onMouseEnter={setTextColorOnMouseEnter}
                  onMouseLeave={(e) => {
                    resetTextColorOnMouseLeave(e, route.name)
                  }}
                >
                  {route.value}
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
    </footer>
  )
}

export default Footer

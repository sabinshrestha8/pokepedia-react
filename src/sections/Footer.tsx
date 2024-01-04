import React from "react"
import { signOut } from "firebase/auth"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { firebaseAuth } from "../utils/FirebaseConfig"
import { MdOutlinePowerSettingsNew } from "react-icons/md"
import { setPokemonTab, setToast, setUserStatus } from "../app/slices/AppSlice"
import { lightnessThreshold, pokemonTabs } from "../utils/Constants"
import { useLocation } from "react-router-dom"

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

  const setTextColorOnMouseEnter = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement

    const root = document.documentElement

    const color = root.style.getPropertyValue("--accent-color")

    const lightness = calculateLightness(color)

    if (lightness > lightnessThreshold) {
      targetElement.style.color = "#2a2c3a"
    } else {
      targetElement.style.color = "white"
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

  const rgbToHsl = (
    r: number,
    g: number,
    b: number,
  ): { h: number; s: number; l: number } => {
    r /= 255 // r = r / 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)

      switch (max) {
        case r:
          h = (g - b) / (max - min) + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / (max - min) + 2
          break
        case b:
          h = (r - g) / (max - min) + 4
          break
      }

      h /= 6
    }

    return { h, s, l }
  }

  const calculateLightness = (hexColor: string): number => {
    // Remove the hash symbol if present
    const hex = hexColor.replace(/^#/, "")

    // Parse the hex color into RGB components
    const bigint = parseInt(hex, 16) // converts hexadecimal number into decimal (base-10) equivalent.

    const r = (bigint >> 16) & 255

    const g = (bigint >> 8) & 255
    const b = bigint & 255

    /* // Calculate relative luminance
    const luminance: number =
      (0.2126 * r) / 255 + (0.7152 * g) / 255 + (0.0722 * b) / 255

    return luminance
    */

    // Convert RGB to HSL
    const { l } = rgbToHsl(r, g, b)

    return l
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

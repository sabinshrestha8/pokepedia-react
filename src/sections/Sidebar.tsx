import React, { useEffect, useRef, useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { Link, useLocation } from "react-router-dom"
import { navigationRoutes } from "../utils/Constants"
import { MdCatchingPokemon, MdComment, MdList } from "react-icons/md"
import { IoGitCompareSharp, IoSearch } from "react-icons/io5"

function Sidebar() {
  const mySidePanelRef = useRef<HTMLDivElement | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const loction = useLocation()

  const openSidePanel = () => {
    const mySidePanel = mySidePanelRef.current
    if (mySidePanel) {
      mySidePanel.style.width = "15rem"
      setIsSidebarOpen(true)
    }
  }

  const closeSidePanel = () => {
    const mySidePanel = mySidePanelRef.current
    if (mySidePanel) {
      mySidePanel.style.width = "0"
      setIsSidebarOpen(false)
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const mySidePanel = mySidePanelRef.current

      if (mySidePanel && !mySidePanel.contains(event.target as Node)) {
        closeSidePanel()
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isSidebarOpen])

  useEffect(() => {
    const anchors = document.querySelectorAll<HTMLElement>(".sidepanel a")

    anchors.forEach((anchor) => {
      const isLocation = navigationRoutes.some(
        ({ route, name }) =>
          location.pathname.includes(route) && anchor.textContent === name,
      )

      if (isLocation) {
        anchor.style.color = "#f1f1f1"
        anchor.querySelector("svg")?.setAttribute("fill", "#f1f1f1")
      } else {
        anchor.style.color = "#818181"
        anchor.querySelector("svg")?.setAttribute("fill", "#818181")
      }
    })

    // navigationRoutes.forEach(({ route, name }) => {
    //   const isLocation = location.pathname.includes(route)

    //   if (isLocation) {
    //     anchors.forEach((anchor) => {
    //       if (anchor.innerHTML === name) {
    //         anchor.style.color = "#f1f1f1"
    //       } else {
    //         anchor.style.color = "#818181"
    //       }
    //     })
    //   }
    // })
  }, [loction.pathname])

  return (
    <>
      <div className="sidepanel" ref={mySidePanelRef}>
        <Link to="/search">
          <IoSearch />
          Search
        </Link>
        <Link to="/compare">
          <IoGitCompareSharp />
          Compare
        </Link>
        <Link to="/pokemon">
          <MdCatchingPokemon />
          Pokemon
        </Link>
        <Link to="/list">
          <MdList />
          My List
        </Link>
        <Link to="/about">
          <MdComment />
          About
        </Link>
      </div>

      <GiHamburgerMenu onClick={openSidePanel} />
    </>
  )
}

export default Sidebar

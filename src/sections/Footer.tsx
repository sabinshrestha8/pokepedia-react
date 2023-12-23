import React from "react"
import { signOut } from "firebase/auth"
import { useAppDispatch } from "../app/hooks"
import { firebaseAuth } from "../utils/FirebaseConfig"
import { MdOutlinePowerSettingsNew } from "react-icons/md"
import { setToast, setUserStatus } from "../app/slices/AppSlice"

function Footer() {
  const dispatch = useAppDispatch()

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

  return (
    <footer>
      <div className="block"></div>
      <div className="data"></div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
    </footer>
  )
}

export default Footer

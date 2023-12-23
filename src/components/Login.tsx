import React from "react"
import { FcGoogle } from "react-icons/fc"
import { useAppDispatch } from "../app/hooks"
import { setUserStatus } from "../app/slices/AppSlice"
import { firebaseAuth, usersRef } from "../utils/FirebaseConfig"
import { addDoc, getDocs, query, where } from "firebase/firestore"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"

function Login() {
  const dispatch = useAppDispatch()

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()

      const {
        user: { email, uid },
      } = await signInWithPopup(firebaseAuth, provider)

      if (email) {
        /* constructs a query to FirestoreDB to fetch documents
         * from "users" collection where "uid" field matches the
         * UID obtained during Google sign-in.
         */
        const firestoreQuery = query(usersRef, where("uid", "==", uid))

        /* executes the query & fetch the documents
         * from firestoreDB that match the query.
         */
        const fetchedUser = await getDocs(firestoreQuery)

        if (fetchedUser.docs.length === 0) {
          await addDoc(usersRef, { uid, email })
        }

        dispatch(setUserStatus({ email }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login">
      <button className="login-btn" onClick={handleLogin}>
        <FcGoogle />
        Login with Google
      </button>
    </div>
  )
}

export default Login

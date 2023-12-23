// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQXY9uzUUbODzAn72ClmzAWgNoGkpWaIM",
  authDomain: "pokedex-react-fabf1.firebaseapp.com",
  projectId: "pokedex-react-fabf1",
  storageBucket: "pokedex-react-fabf1.appspot.com",
  messagingSenderId: "229111681706",
  appId: "1:229111681706:web:88326fb0542cfb556876d3",
  measurementId: "G-66GGS06JZB", // For Firebase JS SDK v7.20.0 and later, measurementId is optional
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

/*
 * The getAuth() returns an instance of Auth service,
 * which provides methods and properties for managing
 * user authentication.
 */
export const firebaseAuth = getAuth(app)
export const firebaseDB = getFirestore(app)

/*
 * Collections are just like tables in mysql
 *
 * The collection() fn creates a reference to "users" collection within the FirestoreDB.
 * It's more like obtaining a pointer or reference to that location in the database.
 */
export const usersRef = collection(firebaseDB, "users") // collection() accepts args i.e. firebaseDB instance & name of the collection
export const pokemonListRef = collection(firebaseDB, "pokemonList")

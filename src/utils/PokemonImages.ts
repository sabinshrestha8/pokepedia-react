// //@ts-nocheck
// const fetchImages = (context: string) => {
//   const images = {}
//   const cache = {}

//   function importAll(r) {
//     r.keys().forEach((key) => (cache[key] = r(key)))
//   }

//   importAll(context)

//   Object.entries(cache).forEach((module: string[]) => {
//     let key = module[0].split("")
//     key.splice(0, 2)
//     key.splice(-4, 4)
//     images[[key.join("")]] = module[1]
//   })

//   return images
// }

// export const images = fetchImages(
//   require.context("../assets/pokemons/shiny", false, /\.(png|jpe?g|svg)$/),
// )

// export const defaultImages = fetchImages(
//   require.context("../assets/pokemons/default", false, /\.(png|jpe?g|svg)$/),
// )

// @ts-nocheck
// Define a function called fetchImages that takes a 'context' parameter (a string).
const fetchImages = (context: string) => {
  // Initialize an empty object to store images.
  const images = {}
  // Initialize an empty object to store cached image files.
  const cache = {}

  // Populate the 'cache' object with image files.
  Object.keys(context).forEach((key) => {
    cache[key] = context[key].default
  })

  Object.entries(cache).forEach((module: string[]) => {
    let key = module[0].split("")
    key.splice(0, 2)
    key.splice(-4, 4)
    images[[key.join("")]] = module[1]
  })

  // Return the 'images' object containing the imported image files.
  return images
}

// Call fetchImages with a dynamic import context for shiny Pokemon images and assign the result to the 'images' constant.
export const images = fetchImages(
  import.meta.glob("../assets/pokemons/shiny/**/*.@(png|jpe?g|svg)", {
    eager: true,
  }),
)

// Call fetchImages with a dynamic import context for default Pokemon images and assign the result to the 'defaultImages' constant.
export const defaultImages = fetchImages(
  import.meta.glob("../assets/pokemons/default/**/*.@(png|jpe?g|svg)", {
    eager: true,
  }),
)

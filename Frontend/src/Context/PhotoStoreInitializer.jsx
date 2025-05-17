
import { useEffect } from "react"
import { usePhotoStore } from "../store/photo.store.js"

const PhotoStoreInitializer = ({ children }) => {
  const { initialize } = usePhotoStore()

  useEffect(() => {
    // Initialize the photo store with Firebase auth
    const unsubscribe = initialize()

    // Clean up the subscription when the component unmounts
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [initialize])

  return <>{children}</>
}

export default PhotoStoreInitializer

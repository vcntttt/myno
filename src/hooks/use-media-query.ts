"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Set initial value on client side only
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)
      setMatches(media.matches)

      // Update the state when the media query changes
      const listener = () => setMatches(media.matches)

      // Use the correct event listener method based on browser support
      if (media.addEventListener) {
        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
      } else {
        // Fallback for older browsers
        media.addListener(listener)
        return () => media.removeListener(listener)
      }
    }

    return undefined
  }, [query])

  return matches
}

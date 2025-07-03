"use client"

import { useEffect, useState } from "react"
import { AnimationProvider } from "./animation-provider"

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <AnimationProvider>{children}</AnimationProvider>
}
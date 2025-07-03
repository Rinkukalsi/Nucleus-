"use client"

import { m as motion } from "framer-motion"

interface BackdropProps {
  onClick: () => void
}

export function Backdrop({ onClick }: BackdropProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
    />
  )
}
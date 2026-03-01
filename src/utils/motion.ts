export const fadeUp = (delay = 0, distance = 12) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.22, 0.12, 0.18, 1] as const },
  },
})

export const springHover = {
  scale: 1.02,
  transition: { type: 'spring' as const, stiffness: 260, damping: 18 },
}

export const tap = { scale: 0.98 }

export const smoothTab = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 22,
}

export const progressTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1] as const,
}

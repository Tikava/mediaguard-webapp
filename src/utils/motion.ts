const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const fadeUp = (delay = 0, distance = 12) =>
  prefersReduced
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay, ease: [0.22, 0.12, 0.18, 1] as const },
        },
      }

export const springHover = prefersReduced
  ? {}
  : { scale: 1.02, transition: { type: 'spring' as const, stiffness: 260, damping: 18 } }

export const tap = prefersReduced ? {} : { scale: 0.98 }

export const smoothTab = prefersReduced
  ? {}
  : { type: 'spring' as const, stiffness: 260, damping: 22 }

export const progressTransition = prefersReduced
  ? { duration: 0 }
  : { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const }

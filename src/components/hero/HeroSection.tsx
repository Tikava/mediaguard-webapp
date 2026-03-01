import React from 'react'
import Container from '../layout/Container'
import AnalyzeButton from '../inputs/AnalyzeButton'
import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaLabel: string
  onCta?: () => void
  helperText?: string
  children?: React.ReactNode
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaLabel,
  onCta,
  helperText,
  children,
}) => (
  <section className="relative isolate overflow-hidden bg-white py-16">
    <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-70" />
    <Container className="relative flex flex-col gap-8 text-center">
      <motion.div
        className="mx-auto max-w-3xl space-y-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp()}
      >
        <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
          {title}
        </h1>
        <p className="text-lg text-slate-600 md:text-xl">{subtitle}</p>
        {helperText && <p className="text-sm text-slate-500">{helperText}</p>}
      </motion.div>
      {children}
      <motion.div
        className="mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.08)}
      >
        <AnalyzeButton label={ctaLabel} onClick={onCta} />
      </motion.div>
    </Container>
  </section>
)

export default HeroSection

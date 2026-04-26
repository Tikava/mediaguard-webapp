import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { fadeUp } from '../utils/motion'
import Container from '../components/layout/Container'

// ─── Icons ────────────────────────────────────────────────────────────────────

const UploadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 15V5m0 0-3.5 3.5M12 5l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 17v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const ScanIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 9V6a3 3 0 0 1 3-3h3M3 15v3a3 3 0 0 0 3 3h3m9-15h3a3 3 0 0 1 3 3v3m-6 9h3a3 3 0 0 0 3-3v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2L4 6v6c0 4.42 3.36 8.56 8 9.58C16.64 20.56 20 16.42 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MediaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 9.5l5 2.5-5 2.5V9.5Z" fill="currentColor" />
  </svg>
)

const AIIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ScoreIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </svg>
)

const HistoryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M3.05 11a9 9 0 1 0 .5-3M3 4v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BoltIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M13 2L4.09 12.96A1 1 0 0 0 5 14.5h6.5l-.5 7.5 8.91-10.96A1 1 0 0 0 19 9.5H12.5L13 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const NewspaperIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const ScaleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3v18M3 9l9-6 9 6M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 9l4 7H3l4-7ZM17 9l4 7h-8l4-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Feature card ──────────────────────────────────────────────────────────────

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  body: string
  delay?: number
  iconBg: string
  iconColor: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, body, delay = 0, iconBg, iconColor }) => (
  <motion.div
    className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={fadeUp(delay)}
  >
    <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <h3 className="mb-2 text-[15px] font-semibold text-slate-900">{title}</h3>
    <p className="text-sm leading-relaxed text-slate-500">{body}</p>
  </motion.div>
)

// ─── Step ─────────────────────────────────────────────────────────────────────

interface StepProps {
  number: number
  icon: React.ReactNode
  title: string
  body: string
  delay?: number
}

const Step: React.FC<StepProps> = ({ number, icon, title, body, delay = 0 }) => (
  <motion.div
    className="relative flex flex-col items-center text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={fadeUp(delay)}
  >
    <div className="relative mb-6">
      <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 select-none text-[80px] font-black leading-none text-slate-100">
        {number}
      </span>
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg ring-4 ring-primary-100">
        {icon}
      </div>
    </div>
    <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
    <p className="max-w-[220px] text-sm leading-relaxed text-slate-500">{body}</p>
  </motion.div>
)

// ─── Use-case card ─────────────────────────────────────────────────────────────

interface UseCaseCardProps {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  title: string
  body: string
  bullets: string[]
  delay?: number
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ icon, iconBg, iconColor, title, body, bullets, delay = 0 }) => (
  <motion.div
    className="flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={fadeUp(delay)}
  >
    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mb-5 text-sm leading-relaxed text-slate-500">{body}</p>
    <ul className="mt-auto space-y-2.5">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <CheckIcon />
          </span>
          {b}
        </li>
      ))}
    </ul>
  </motion.div>
)

// ─── Browser mockup ────────────────────────────────────────────────────────────

const ProductMockup: React.FC = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_32px_80px_-16px_rgba(15,23,42,0.22)]">
    {/* browser chrome */}
    <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="flex flex-1 items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2.5" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        mediaguard.app/result/…
      </div>
    </div>

    {/* content */}
    <div className="p-5">
      {/* verdict header */}
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheckIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Likely Authentic</p>
            <p className="text-xs text-slate-400">portrait.jpg · Image</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">94%</span>
      </div>

      {/* confidence ring */}
      <div className="mb-5 flex items-center justify-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90" aria-hidden="true">
            <circle cx="48" cy="48" r="38" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle
              cx="48" cy="48" r="38" fill="none"
              stroke="#22c55e" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 38}`}
              strokeDashoffset={`${2 * Math.PI * 38 * (1 - 0.942)}`}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-bold text-slate-900">94.2%</span>
            <span className="text-[10px] text-slate-400">confidence</span>
          </div>
        </div>
      </div>

      {/* probability bars */}
      <div className="space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-slate-500">Real probability</span>
            <span className="font-semibold text-slate-700">94.2%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[94%] rounded-full bg-emerald-500" />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-slate-500">Fake probability</span>
            <span className="font-semibold text-slate-700">5.8%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[6%] rounded-full bg-rose-400" />
          </div>
        </div>
      </div>

      {/* metadata */}
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
        <span className="text-xs text-slate-400">Model</span>
        <span className="ml-1 text-xs font-medium text-slate-600">deepfake-detector-v2</span>
        <span className="ml-auto text-xs text-slate-400">0.8 s</span>
      </div>
    </div>
  </div>
)

// ─── Main ─────────────────────────────────────────────────────────────────────

const Landing: React.FC = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()

  const features = [
    { icon: <MediaIcon />, titleKey: 'f1Title', bodyKey: 'f1Body', iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
    { icon: <AIIcon />, titleKey: 'f2Title', bodyKey: 'f2Body', iconBg: 'bg-sky-50', iconColor: 'text-sky-600' },
    { icon: <ScoreIcon />, titleKey: 'f3Title', bodyKey: 'f3Body', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { icon: <LockIcon />, titleKey: 'f4Title', bodyKey: 'f4Body', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
    { icon: <HistoryIcon />, titleKey: 'f5Title', bodyKey: 'f5Body', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { icon: <BoltIcon />, titleKey: 'f6Title', bodyKey: 'f6Body', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  ]

  const usecases = [
    {
      icon: <NewspaperIcon />, iconBg: 'bg-sky-50', iconColor: 'text-sky-600',
      titleKey: 'uc1Title', bodyKey: 'uc1Body',
      bullets: ['uc1b1', 'uc1b2', 'uc1b3'],
    },
    {
      icon: <UsersIcon />, iconBg: 'bg-violet-50', iconColor: 'text-violet-600',
      titleKey: 'uc2Title', bodyKey: 'uc2Body',
      bullets: ['uc2b1', 'uc2b2', 'uc2b3'],
    },
    {
      icon: <ScaleIcon />, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
      titleKey: 'uc3Title', bodyKey: 'uc3Body',
      bullets: ['uc3b1', 'uc3b2', 'uc3b3'],
    },
  ]

  const chips = ['chip1', 'chip2', 'chip3', 'chip4'] as const

  return (
    <div className="-mt-10 overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-20 md:pb-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary-100 opacity-40 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary-50 opacity-60 blur-[80px]" />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">

            {/* left */}
            <motion.div className="flex flex-col gap-6" initial="hidden" animate="visible" variants={fadeUp()}>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-500" />
                {t('landing.hero.badge')}
              </span>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-5xl xl:text-6xl">
                {t('landing.hero.title')}
              </h1>

              <p className="max-w-md text-lg leading-relaxed text-slate-500">
                {t('landing.hero.subtitle')}
              </p>

              <div className="flex flex-wrap gap-2">
                {chips.map((key) => (
                  <span key={key} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    <span className="text-primary-600"><CheckIcon /></span>
                    {t(`landing.hero.${key}`)}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {isAuthenticated ? (
                  <Link to="/app" className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
                    {t('landing.hero.ctaApp')} <ArrowIcon />
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
                      {t('landing.hero.ctaPrimary')} <ArrowIcon />
                    </Link>
                    <Link to="/login" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                      {t('landing.hero.ctaSecondary')}
                    </Link>
                  </>
                )}
              </div>

              <p className="text-xs text-slate-400">{t('landing.hero.helper')}</p>
            </motion.div>

            {/* right — animated mockup + floating badges */}
            <motion.div
              className="mx-auto w-full max-w-md lg:mx-0"
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.1)}
            >
              <div className="relative px-6 pb-6 pt-2">
                {/* glow behind card */}
                <div className="absolute inset-4 rounded-3xl bg-primary-200 opacity-25 blur-2xl" />

                {/* floating speed badge */}
                <motion.div
                  className="absolute -left-2 bottom-10 z-10 hidden items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg lg:flex"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1.2 }}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                    <BoltIcon />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">0.8s avg</p>
                    <p className="text-[10px] text-slate-400">{t('landing.hero.badgeSpeed')}</p>
                  </div>
                </motion.div>

                {/* floating secure badge */}
                <motion.div
                  className="absolute -right-2 top-10 z-10 hidden items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg lg:flex"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.4 }}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <LockIcon />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{t('landing.hero.badgeSecure')}</p>
                    <p className="text-[10px] text-slate-400">{t('landing.hero.badgeSecureSub')}</p>
                  </div>
                </motion.div>

                {/* card with subtle float */}
                <motion.div
                  className="relative"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                >
                  <ProductMockup />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ── Format strip ─────────────────────────────────────────────────────── */}
      <div className="border-y border-slate-100 bg-slate-50 py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="mr-1 text-xs font-medium text-slate-400">{t('landing.hero.formatsLabel')}:</span>
            {['JPG', 'PNG', 'WEBP', 'MP4', 'MOV', 'AVI', 'MP3', 'WAV', 'M4A'].map((fmt) => (
              <span key={fmt} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                {fmt}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <motion.div
            className="mb-16 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary-600">
              {t('landing.how.title')}
            </span>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {t('landing.how.subtitle')}
            </h2>
          </motion.div>

          <div className="relative grid gap-10 md:grid-cols-3">
            {/* connector line: spans from center-of-col1 to center-of-col3 */}
            <div className="pointer-events-none absolute left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] top-7 hidden border-t-2 border-dashed border-slate-200 md:block" />
            <Step number={1} icon={<UploadIcon />} title={t('landing.how.step1Title')} body={t('landing.how.step1Body')} delay={0} />
            <Step number={2} icon={<ScanIcon />} title={t('landing.how.step2Title')} body={t('landing.how.step2Body')} delay={0.06} />
            <Step number={3} icon={<ShieldCheckIcon />} title={t('landing.how.step3Title')} body={t('landing.how.step3Body')} delay={0.12} />
          </div>
        </Container>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <Container>
          <motion.div
            className="mb-16 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary-600">
              {t('landing.featuresLabel')}
            </span>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {t('landing.features.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-500">{t('landing.features.subtitle')}</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard
                key={f.titleKey}
                icon={f.icon}
                title={t(`landing.features.${f.titleKey}`)}
                body={t(`landing.features.${f.bodyKey}`)}
                delay={i * 0.04}
                iconBg={f.iconBg}
                iconColor={f.iconColor}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <Container>
          <motion.div
            className="mb-16 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary-600">
              {t('landing.usecases.label')}
            </span>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {t('landing.usecases.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-500">{t('landing.usecases.subtitle')}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {usecases.map((uc, i) => (
              <UseCaseCard
                key={uc.titleKey}
                icon={uc.icon}
                iconBg={uc.iconBg}
                iconColor={uc.iconColor}
                title={t(`landing.usecases.${uc.titleKey}`)}
                body={t(`landing.usecases.${uc.bodyKey}`)}
                bullets={uc.bullets.map((b) => t(`landing.usecases.${b}`))}
                delay={i * 0.06}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-slate-900 py-24">
        <div className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary-700 opacity-20 blur-[80px]" />
        <div className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary-500 opacity-10 blur-[80px]" />
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-10" />

        <Container className="relative">
          <motion.div
            className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp()}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-700 bg-primary-900/50 px-3.5 py-1.5 text-xs font-semibold text-primary-400">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              {t('landing.hero.badge')}
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('landing.cta.title')}
            </h2>
            <p className="max-w-md text-lg text-slate-400">{t('landing.cta.subtitle')}</p>

            {!isAuthenticated ? (
              <div className="flex flex-col items-center gap-3 pt-2">
                <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/40 transition hover:bg-primary-400">
                  {t('landing.cta.button')} <ArrowIcon />
                </Link>
                <Link to="/login" className="text-sm text-slate-500 transition hover:text-slate-300">
                  {t('landing.cta.login')}
                </Link>
              </div>
            ) : (
              <Link to="/app" className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/40 transition hover:bg-primary-400">
                {t('landing.hero.ctaApp')} <ArrowIcon />
              </Link>
            )}
          </motion.div>
        </Container>
      </section>

    </div>
  )
}

export default Landing

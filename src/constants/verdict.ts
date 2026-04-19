import type { DetectionResponse } from '../types/api'

type Verdict = DetectionResponse['verdict']

export const VERDICT_STYLES: Record<Verdict, { badge: string; border: string; icon: string }> = {
  'Likely Authentic': {
    badge: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    border: 'border-l-4 border-emerald-500',
    icon: '✓',
  },
  'Likely Manipulated': {
    badge: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    border: 'border-l-4 border-rose-500',
    icon: '✗',
  },
  Inconclusive: {
    badge: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    border: 'border-l-4 border-amber-400',
    icon: '?',
  },
}

export const VERDICT_I18N_KEY: Record<string, string> = {
  'Likely Authentic': 'verdict.likelyAuthentic',
  'Likely Manipulated': 'verdict.likelyManipulated',
  Inconclusive: 'verdict.inconclusive',
}

export const VERDICT_BADGE: Record<string, string> = {
  'Likely Authentic': 'bg-emerald-50 text-emerald-700',
  'Likely Manipulated': 'bg-rose-50 text-rose-700',
  Inconclusive: 'bg-amber-50 text-amber-700',
}

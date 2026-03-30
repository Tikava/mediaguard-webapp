import React from 'react'
import { formatDate, formatConfidence } from '../../utils/formatters'

export type HistoryRow = {
  id: string
  inputType: 'image' | 'video' | 'audio'
  verdict: string
  confidence: number
  createdAt: string
}

type HistoryTableProps = {
  rows: HistoryRow[]
  loading?: boolean
  error?: string | null
  page?: number
  total?: number
  pageSize?: number
  onRowClick?: (id: string) => void
  onPageChange?: (page: number) => void
  labels: {
    input: string
    verdict: string
    confidence: string
    timestamp: string
    empty: string
    error: string
    page: string
    prev: string
    next: string
    typeImage: string
    typeVideo: string
    typeAudio: string
  }
}

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-slate-100">
    <td className="p-4" colSpan={5}>
      <div className="h-4 w-full rounded bg-slate-100" />
    </td>
  </tr>
)

const HistoryTable: React.FC<HistoryTableProps> = ({
  rows,
  loading = false,
  error = null,
  page = 1,
  total = 0,
  pageSize = 10,
  onRowClick,
  onPageChange,
  labels,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">{labels.input}</th>
            <th className="px-4 py-3">{labels.verdict}</th>
            <th className="px-4 py-3">{labels.confidence}</th>
            <th className="px-4 py-3">{labels.timestamp}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {loading && (
            <>
              {Array.from({ length: 3 }).map((_, idx) => (
                <SkeletonRow key={idx} />
              ))}
            </>
          )}

          {!loading && rows.length === 0 && !error && (
            <tr>
              <td className="px-4 py-6 text-center text-slate-500" colSpan={4}>
                {labels.empty}
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td className="px-4 py-6 text-center text-rose-600" colSpan={4}>
                {error || labels.error}
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer transition hover:bg-slate-50"
                onClick={() => onRowClick?.(row.id)}
              >
                <td className="px-4 py-3 font-medium text-slate-800">
                  {row.inputType === 'video'
                    ? labels.typeVideo
                    : row.inputType === 'audio'
                    ? labels.typeAudio
                    : labels.typeImage}
                </td>
                <td className="px-4 py-3 text-slate-700">{row.verdict}</td>
                <td className="px-4 py-3 text-slate-700">{formatConfidence(row.confidence)}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(row.createdAt)}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
        <span>{labels.page}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 transition hover:border-primary-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={page <= 1}
            onClick={() => page > 1 && onPageChange?.(page - 1)}
          >
            {labels.prev}
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 transition hover:border-primary-200 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={page >= totalPages}
            onClick={() => page < totalPages && onPageChange?.(page + 1)}
          >
            {labels.next}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HistoryTable

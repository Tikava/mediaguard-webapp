import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatDate, formatConfidence } from '../../utils/formatters'
import { VERDICT_BADGE, VERDICT_I18N_KEY } from '../../constants/verdict'

export type HistoryRow = {
  id: string
  inputType: 'image' | 'video' | 'audio'
  verdict: string
  confidence: number
  createdAt: string
  fileUrl?: string
}

type HistoryTableProps = {
  rows: HistoryRow[]
  loading?: boolean
  error?: string | null
  page?: number
  total?: number
  pageSize?: number
  onRowClick?: (id: string) => void
  onDelete?: (id: string) => Promise<void>
  onPageChange?: (page: number) => void
  labels: {
    file: string
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
    deleteLabel: string
    confirmDelete: string
    cancel: string
  }
}

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-slate-100">
    <td className="p-4" colSpan={6}>
      <div className="h-4 w-full rounded bg-slate-100" />
    </td>
  </tr>
)

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path
      d="M5 2V1h5v1M1 3h13M6 6v5M9 6v5M2 3l1 10a1 1 0 001 1h7a1 1 0 001-1L13 3"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const HistoryTable: React.FC<HistoryTableProps> = ({
  rows,
  loading = false,
  error = null,
  page = 1,
  total = 0,
  pageSize = 10,
  onRowClick,
  onDelete,
  onPageChange,
  labels,
}) => {
  const { t } = useTranslation()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setConfirmingId(id)
  }

  const handleConfirm = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setConfirmingId(null)
    setDeletingId(id)
    try {
      await onDelete?.(id)
    } finally {
      setDeletingId(null)
    }
  }

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setConfirmingId(null)
  }

  const colSpan = onDelete ? 6 : 5

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100">
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">{labels.file}</th>
            <th className="px-4 py-3">{labels.input}</th>
            <th className="px-4 py-3">{labels.verdict}</th>
            <th className="px-4 py-3">{labels.confidence}</th>
            <th className="px-4 py-3">{labels.timestamp}</th>
            {onDelete && (
              <th className="px-4 py-3">
                <span className="sr-only">{labels.deleteLabel}</span>
              </th>
            )}
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
              <td className="px-4 py-6 text-center text-slate-500" colSpan={colSpan}>
                {labels.empty}
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td className="px-4 py-6 text-center text-rose-600" colSpan={colSpan}>
                {error || labels.error}
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            rows.map((row) => {
              const isConfirming = confirmingId === row.id
              const isDeleting = deletingId === row.id

              return (
                <tr
                  key={row.id}
                  tabIndex={onRowClick ? 0 : undefined}
                  className="cursor-pointer transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500"
                  onClick={() => !isConfirming && onRowClick?.(row.id)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isConfirming) {
                      e.preventDefault()
                      onRowClick?.(row.id)
                    }
                  }}
                >
                  <td className="px-4 py-3">
                    {row.fileUrl && row.inputType === 'image' ? (
                      <img
                        src={row.fileUrl}
                        alt={`${labels.typeImage} — ${t(VERDICT_I18N_KEY[row.verdict] ?? row.verdict)}`}
                        className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-100"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400 text-xs">
                        {row.inputType === 'video' ? '▶' : row.inputType === 'audio' ? '♪' : '—'}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {row.inputType === 'video'
                      ? labels.typeVideo
                      : row.inputType === 'audio'
                      ? labels.typeAudio
                      : labels.typeImage}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${VERDICT_BADGE[row.verdict] ?? 'bg-slate-100 text-slate-600'}`}>
                      {t(VERDICT_I18N_KEY[row.verdict] ?? row.verdict)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{formatConfidence(row.confidence)}</td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(row.createdAt)}</td>

                  {onDelete && (
                    <td className="px-4 py-3 text-right">
                      {isDeleting ? (
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-rose-500" aria-hidden />
                      ) : isConfirming ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-slate-500">{labels.confirmDelete}</span>
                          <button
                            type="button"
                            onClick={(e) => handleConfirm(e, row.id)}
                            className="rounded-full bg-rose-600 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-rose-700"
                          >
                            {labels.deleteLabel}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelDelete}
                            className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                          >
                            {labels.cancel}
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          aria-label={labels.deleteLabel}
                          onClick={(e) => handleDeleteClick(e, row.id)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              )
            })}
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

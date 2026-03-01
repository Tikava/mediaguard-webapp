import React from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { smoothTab, springHover, tap } from '../../utils/motion'

type Tab = {
  id: string
  label: string
}

type TabSwitcherProps = {
  tabs: Tab[]
  activeId: string
  onChange: (id: string) => void
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeId, onChange }) => (
  <LayoutGroup>
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-card">
      {tabs.map((tab) => {
        const active = tab.id === activeId
        return (
          <motion.button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            whileHover={springHover}
            whileTap={tap}
            className="relative rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition"
          >
            {active && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-primary-600 shadow"
                transition={smoothTab}
              />
            )}
            <span className={`relative ${active ? 'text-white' : 'hover:text-slate-900'}`}>
              {tab.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  </LayoutGroup>
)

export default TabSwitcher

import React from 'react'
import { Checkbox as CB } from '@headlessui/react'

interface CheckboxProps {
    checked: boolean
    onChange: () => void
    }

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
      <CB
          checked={checked}
          onChange={onChange}
          className="group block size-4 rounded border data-[checked]:bg-white"
      >
          <svg className="stroke-slate-950 opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
              <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
      </CB>
  )
}

export default Checkbox
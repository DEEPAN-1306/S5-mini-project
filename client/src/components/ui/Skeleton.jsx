import React from 'react'
import { cn } from '../../utils/cn'

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800', className)}
      {...props}
    />
  )
}

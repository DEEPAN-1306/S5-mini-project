import React from 'react'
import { cn } from '../../utils/cn'

export const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  className,
  status,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false)

  const getInitials = (str) => {
    if (!str) return 'U'
    const parts = str.trim().split(/\s+/)
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    busy: 'bg-rose-500',
    away: 'bg-amber-500',
  }

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-full font-bold select-none',
          'bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-xs',
          sizes[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-slate-900',
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5',
            statusColors[status] || statusColors.online
          )}
        />
      )}
    </div>
  )
}

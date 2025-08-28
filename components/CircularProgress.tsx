import React from "react"

type CircularProgressProps = {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
  children?: React.ReactNode
}

export function CircularProgress({
  progress,
  size = 200,
  strokeWidth = 16,
  className,
  children,
}: CircularProgressProps) {
  // Ensure progress remains between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress))

  // Calculations for SVG
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  // we shift the line of the circle to display the progress
  const offset = circumference * (1 - clampedProgress / 100)

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className='-rotate-90'>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='transparent'
          strokeWidth={strokeWidth}
          className='stroke-muted/50' // background color
        />
        {/* improve circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='transparent'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          className='stroke-primary transition-[stroke-dashoffset] duration-500 ease-out' // Color progression
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        {children}
      </div>
    </div>
  )
}

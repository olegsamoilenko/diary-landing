import * as React from 'react'

type GoalsHabitsInsightsIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

export default function GoalsHabitsInsightsIcon({
  size = 24,
  className,
  ...props
}: GoalsHabitsInsightsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <path
        d="M12 4V2.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 12H21.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 20V21.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 12H2.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15.8 8.2L17.9 6.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

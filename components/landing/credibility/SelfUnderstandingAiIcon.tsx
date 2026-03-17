import * as React from 'react'

type SelfUnderstandingIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

export default function SelfUnderstandingIcon({
  size = 24,
  className,
  ...props
}: SelfUnderstandingIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M14.6 20H9V17.8C9 17.32 8.82 16.86 8.48 16.52L7.06 15.1C5.94 13.98 5.3 12.46 5.3 10.88V9.65C5.3 6.06 8.21 3.15 11.8 3.15C15.39 3.15 18.3 6.06 18.3 9.65V10.72C18.3 12.1 17.75 13.43 16.77 14.4L15.92 15.25C15.5 15.67 15.27 16.24 15.27 16.84V19.33C15.27 19.7 14.97 20 14.6 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="11.7"
        cy="10.2"
        r="2.1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M13.2 11.7L15.1 13.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

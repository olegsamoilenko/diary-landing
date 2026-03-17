import * as React from 'react'

type AvailableOnGooglePlayIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

export default function AvailableOnGooglePlayIcon({
  size = 24,
  className,
  ...props
}: AvailableOnGooglePlayIconProps) {
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
      <rect
        x="6.25"
        y="3.25"
        width="11.5"
        height="17.5"
        rx="2.75"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M10.25 6.5H13.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <circle cx="12" cy="17.6" r="0.9" fill="currentColor" />

      <circle
        cx="16.9"
        cy="8.1"
        r="3.1"
        fill="white"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M15.65 8.15L16.45 8.95L18.2 7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

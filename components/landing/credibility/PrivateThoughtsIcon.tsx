import * as React from 'react'

type PrivateThoughtsIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

export default function PrivateThoughtsIcon({
  size = 20,
  className,
  ...props
}: PrivateThoughtsIconProps) {
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
        d="M12 2.75L18.25 5.2C18.87 5.44 19.25 6.02 19.25 6.68V11.35C19.25 15.67 16.57 19.15 12.52 20.82C12.18 20.96 11.82 20.96 11.48 20.82C7.43 19.15 4.75 15.67 4.75 11.35V6.68C4.75 6.02 5.13 5.44 5.75 5.2L12 2.75Z"
        fill="var(--landing-primary-soft, rgba(97, 194, 222, 0.18))"
        stroke="var(--landing-primary, #61C2DE)"
        strokeWidth="1.5"
      />
      <path
        d="M8.25 9.75C8.25 8.50736 9.25736 7.5 10.5 7.5H13.5C14.7426 7.5 15.75 8.50736 15.75 9.75V11.25C15.75 12.4926 14.7426 13.5 13.5 13.5H11.62L9.67 15.02C9.14 15.43 8.38 15.05 8.38 14.38V13.5C7.61 13.37 7.03 12.7 7.03 11.89V9.75H8.25Z"
        fill="white"
        fillOpacity="0.92"
      />
      <circle
        cx="10.2"
        cy="10.5"
        r="0.7"
        fill="var(--landing-primary, #61C2DE)"
      />
      <circle
        cx="12"
        cy="10.5"
        r="0.7"
        fill="var(--landing-primary, #61C2DE)"
      />
      <circle
        cx="13.8"
        cy="10.5"
        r="0.7"
        fill="var(--landing-primary, #61C2DE)"
      />
    </svg>
  )
}

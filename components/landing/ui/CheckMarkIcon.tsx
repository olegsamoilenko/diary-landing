type CheckMarkIconProps = {
  size?: number
  className?: string
}

export default function CheckMarkIcon({
  size = 18,
  className = '',
}: CheckMarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 9.5L7.2 12.5L14 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

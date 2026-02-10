type BrandIconProps = {
  className?: string;
};

export default function BrandIcon({ className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vektadev-bg" x1="4" y1="3" x2="28" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#123229" />
          <stop offset="1" stopColor="#0a1220" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="29" height="29" rx="6.6" fill="url(#vektadev-bg)" />
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="6.6"
        fill="none"
        stroke="#bef264"
        strokeOpacity="0.45"
        strokeWidth="1.4"
      />
      <g fill="none" stroke="#bef264" strokeWidth="1.5">
        <rect x="8.1" y="8.1" width="5.6" height="5.6" rx="1.1" />
        <rect x="18.3" y="8.1" width="5.6" height="5.6" rx="1.1" />
        <rect x="8.1" y="18.3" width="5.6" height="5.6" rx="1.1" />
        <rect x="18.3" y="18.3" width="5.6" height="5.6" rx="1.1" />
      </g>
    </svg>
  );
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        viewBox="0 0 265 229"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <g fill="url(#logoGradient)">
          <polygon points="265 0 251 24 133 229 118 203 133 178 177 101 221 24 133 24 147 0 265 0"/>
          <polygon points="178 48 133 126 118 152 103 178 88 152 14 24 0 0 30 0 44 24 103 126 118 101 133 76 149 48 178 48"/>
          <polygon points="118 50 103 76 88 50 59 0 88 0 118 50"/>
        </g>
      </svg>
    ),
    {
      ...size,
    }
  )
}


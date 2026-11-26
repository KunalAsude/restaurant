import { useId } from 'react'

/**
 * Natural coconut palm (brown trunk, green fronds) that sways in the wind.
 * Trunk sways from its base; every frond flutters on its own around where it joins the trunk.
 * Pure SVG + CSS animations (see .palm-sway / .palm-frond in globals.css). No JS animation loop.
 */

type Pt = [number, number]
const quad = (a: Pt, b: Pt, c: Pt, t: number): Pt => [
  (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0],
  (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1],
]
const dquad = (a: Pt, b: Pt, c: Pt, t: number): Pt => [
  2 * (1 - t) * (b[0] - a[0]) + 2 * t * (c[0] - b[0]),
  2 * (1 - t) * (b[1] - a[1]) + 2 * t * (c[1] - b[1]),
]

// Trunk curve: base → crown
const T0: Pt = [200, 720], T1: Pt = [186, 430], T2: Pt = [236, 190]
// Frond midrib: arches up, then droops at the tip
const M0: Pt = [0, 0], M1: Pt = [110, -70], M2: Pt = [230, 30]

const RINGS = Array.from({ length: 14 }, (_, i) => quad(T0, T1, T2, (i + 1) / 16))

const LEAFLETS = (() => {
  const parts: string[] = []
  for (let i = 1; i < 19; i++) {
    const t = i / 19
    const [x, y] = quad(M0, M1, M2, t)
    const [dx, dy] = dquad(M0, M1, M2, t)
    const len = Math.hypot(dx, dy)
    const nx = -dy / len, ny = dx / len
    const base = (1 - t) * 46 + 10
    for (const side of [1, -1]) {
      let ux = (dx / len) * 0.6 + side * nx * 0.8
      let uy = (dy / len) * 0.6 + side * ny * 0.8 + 0.9
      const m = Math.hypot(ux, uy)
      ux /= m; uy /= m
      const l = base * (side === 1 ? 1 : 0.8)
      parts.push(`M${x.toFixed(1)} ${y.toFixed(1)} q${(ux * l * 0.5 + 3).toFixed(1)} ${(uy * l * 0.5).toFixed(1)} ${(ux * l).toFixed(1)} ${(uy * l).toFixed(1)}`)
    }
  }
  return parts.join(' ')
})()

// [rotation, colour, scale]: darker fronds at the back, lighter in front
const FRONDS: [number, string, number][] = [
  [-200, '#1f4a28', 0.8], [-172, '#24502b', 0.95], [-145, '#2f5d32', 1], [-128, '#2a5630', 0.75],
  [-112, '#3a7238', 1.05], [-80, '#3f7a3c', 1.05], [-48, '#356b36', 1], [-18, '#2f5d32', 0.95], [12, '#24502b', 0.85],
]

export function SwayingPalm({ className = '', flip = false, delay = 0 }: { className?: string; flip?: boolean; delay?: number }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 470 720" className={`swaying-palm ${className}`} style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`trunk-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#7a5634" />
          <stop offset=".55" stopColor="#5c3f26" />
          <stop offset="1" stopColor="#3f2a19" />
        </linearGradient>
      </defs>
      <g className="palm-sway" style={{ animationDelay: `${-delay}s` }}>
        <path d="M200 720 Q186 430 236 190" stroke={`url(#trunk-${id})`} strokeWidth="24" fill="none" strokeLinecap="round" />
        {RINGS.map(([x, y], i) => (
          <path key={i} d={`M${(x - 12).toFixed(0)} ${y.toFixed(0)} q12 6 24 0`} stroke="#3a2716" strokeOpacity=".5" strokeWidth="3" fill="none" />
        ))}
        {FRONDS.map(([rot, colour, scale], i) => (
          <g key={i} transform={`translate(236 190) rotate(${rot}) scale(${scale})`}>
            <g className="palm-frond" style={{ animationDelay: `${-(i * 0.43 + delay)}s` }}>
              <path d="M0 0 Q110 -70 230 30" stroke={colour} strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d={LEAFLETS} stroke={colour} strokeWidth="4.5" fill="none" strokeLinecap="round" />
            </g>
          </g>
        ))}
        <circle cx="226" cy="204" r="11" fill="#5a3d22" />
        <circle cx="246" cy="207" r="11" fill="#4d331c" />
        <circle cx="236" cy="217" r="11" fill="#6a4628" />
      </g>
    </svg>
  )
}

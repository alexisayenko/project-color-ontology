import { useState } from 'react'

type ColorSection = {
  id: string
  name: string
  hex: string
  group: 'primary' | 'secondary' | 'tertiary' | 'neutral'
}

const COLOR_SECTIONS: ColorSection[] = [
  // Primary
  { id: 'red',     name: 'Red',     hex: '#FF0000', group: 'primary' },
  { id: 'yellow',  name: 'Yellow',  hex: '#FFFF00', group: 'primary' },
  { id: 'blue',    name: 'Blue',    hex: '#0000FF', group: 'primary' },
  // Secondary
  { id: 'green',   name: 'Green',   hex: '#00FF00', group: 'secondary' },
  { id: 'cyan',    name: 'Cyan',    hex: '#00FFFF', group: 'secondary' },
  { id: 'magenta', name: 'Magenta', hex: '#FF00FF', group: 'secondary' },
  // Tertiary (between-shades)
  { id: 'orange',       name: 'Orange',       hex: '#FF8000', group: 'tertiary' },
  { id: 'chartreuse',   name: 'Chartreuse',   hex: '#80FF00', group: 'tertiary' },
  { id: 'spring-green', name: 'Spring Green', hex: '#00FF80', group: 'tertiary' },
  { id: 'azure',        name: 'Azure',        hex: '#0080FF', group: 'tertiary' },
  { id: 'violet',       name: 'Violet',       hex: '#8000FF', group: 'tertiary' },
  { id: 'rose',         name: 'Rose',         hex: '#FF0080', group: 'tertiary' },
  // Neutral & special
  { id: 'brown',   name: 'Brown',   hex: '#8B4513', group: 'neutral' },
  { id: 'purple',  name: 'Purple',  hex: '#800080', group: 'neutral' },
  { id: 'pink',    name: 'Pink',    hex: '#FFC0CB', group: 'neutral' },
  { id: 'white',   name: 'White',   hex: '#FFFFFF', group: 'neutral' },
  { id: 'gray',    name: 'Gray',    hex: '#808080', group: 'neutral' },
  { id: 'black',   name: 'Black',   hex: '#000000', group: 'neutral' },
]

const GROUP_LABELS: Record<ColorSection['group'], string> = {
  primary:   'Primary Colors',
  secondary: 'Secondary Colors',
  tertiary:  'Tertiary Colors',
  neutral:   'Neutrals & Special',
}

function ColorCard({ section, active, onClick }: { section: ColorSection; active: boolean; onClick: () => void }) {
  const needsBorder = ['white', 'yellow'].includes(section.id)
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors w-full ${
        active
          ? 'bg-stone-100 dark:bg-stone-800 font-medium text-stone-900 dark:text-stone-50'
          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full flex-shrink-0 ${needsBorder ? 'border border-stone-300 dark:border-stone-600' : ''}`}
        style={{ backgroundColor: section.hex }}
      />
      {section.name}
    </button>
  )
}

// Anchor colors for the red wheel:
// Top = lightest (#FFE4E1), Bottom = darkest (#8B0000)
// Left = blue-leaning (#FF0080), Right = yellow-leaning (#FF4500)
// Center = pure red (#FF0000)
// Diagonals: TL=#FFC0E0, TR=#FFC0A0, BL=#6B0040, BR=#6B2400

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(c => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0')).join('')
}

function lerpColor(hex1: string, hex2: string, t: number) {
  const a = hexToRgb(hex1), b = hexToRgb(hex2)
  return rgbToHex(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t,
  )
}

// Bilinear interpolation across 4 corners + center
function sampleColor(nx: number, ny: number) {
  // nx: -1 (left/blue) to +1 (right/yellow)
  // ny: -1 (top/light) to +1 (bottom/dark)
  const TL = '#FFC0E0', T = '#FFE4E1', TR = '#FFC0A0'
  const L  = '#FF0080', C = '#FF0000', R  = '#FF4500'
  const BL = '#6B0040', B = '#8B0000', BR = '#6B2400'

  // Interpolate top row, middle row, bottom row
  const tx = (nx + 1) / 2 // 0..1
  const ty = (ny + 1) / 2 // 0..1

  const topL = lerpColor(TL, T, tx * 2)
  const topR = lerpColor(T, TR, (tx - 0.5) * 2)
  const top = tx <= 0.5 ? topL : topR

  const midL = lerpColor(L, C, tx * 2)
  const midR = lerpColor(C, R, (tx - 0.5) * 2)
  const mid = tx <= 0.5 ? midL : midR

  const botL = lerpColor(BL, B, tx * 2)
  const botR = lerpColor(B, BR, (tx - 0.5) * 2)
  const bot = tx <= 0.5 ? botL : botR

  const colT = lerpColor(top, mid, ty * 2)
  const colB = lerpColor(mid, bot, (ty - 0.5) * 2)
  return ty <= 0.5 ? colT : colB
}

function arcPath(cx: number, cy: number, r1: number, r2: number, startDeg: number, endDeg: number) {
  const toRad = (d: number) => (d * Math.PI) / 180
  const s = toRad(startDeg), e = toRad(endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  const ox1 = cx + r2 * Math.cos(s), oy1 = cy + r2 * Math.sin(s)
  const ox2 = cx + r2 * Math.cos(e), oy2 = cy + r2 * Math.sin(e)
  const ix1 = cx + r1 * Math.cos(s), iy1 = cy + r1 * Math.sin(s)
  const ix2 = cx + r1 * Math.cos(e), iy2 = cy + r1 * Math.sin(e)
  return `M ${ox1} ${oy1} A ${r2} ${r2} 0 ${large} 1 ${ox2} ${oy2} L ${ix2} ${iy2} A ${r1} ${r1} 0 ${large} 0 ${ix1} ${iy1} Z`
}

function RedWheel() {
  const [hovered, setHovered] = useState<{ hex: string; label: string } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  function copy(hex: string) {
    navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1200)
  }

  const cx = 200, cy = 200
  // Generate cells: angular segments × radial rings
  const angularSteps = 24
  const radialSteps = 6
  const innerR = 35
  const outerR = 180
  const ringWidth = (outerR - innerR) / radialSteps
  const segAngle = 360 / angularSteps
  const gap = 0.6

  const cells: { d: string; hex: string; label: string }[] = []

  for (let ai = 0; ai < angularSteps; ai++) {
    for (let ri = 0; ri < radialSteps; ri++) {
      const startDeg = -90 + ai * segAngle + gap / 2
      const endDeg = -90 + (ai + 1) * segAngle - gap / 2
      const r1 = innerR + ri * ringWidth
      const r2 = innerR + (ri + 1) * ringWidth

      // Map to nx, ny
      // Angle: top(-90°)=light, bottom(90°)=dark, left(180°)=blue, right(0°)=yellow
      const midAngleDeg = -90 + (ai + 0.5) * segAngle
      const midAngleRad = (midAngleDeg * Math.PI) / 180
      // radius: 0 at center = pure red, 1 at edge = extreme
      const midRadius = (ri + 0.5) / radialSteps

      const nx = Math.cos(midAngleRad) * midRadius  // -1..+1 (left=blue, right=yellow)
      const ny = Math.sin(midAngleRad) * midRadius   // -1..+1 (top=light, bottom=dark)

      const hex = sampleColor(nx, ny)

      // Direction label
      const angle = midAngleDeg + 90 // normalize: 0=top
      let label = ''
      if (angle < 22.5 || angle >= 337.5) label = 'Light'
      else if (angle < 67.5) label = 'Light yellow-red'
      else if (angle < 112.5) label = 'Yellow-red'
      else if (angle < 157.5) label = 'Dark yellow-red'
      else if (angle < 202.5) label = 'Dark'
      else if (angle < 247.5) label = 'Dark blue-red'
      else if (angle < 292.5) label = 'Blue-red'
      else label = 'Light blue-red'

      cells.push({ d: arcPath(cx, cy, r1, r2, startDeg, endDeg), hex, label })
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 400 400" className="w-full max-w-[420px]">
        {cells.map((cell, i) => {
          const isHov = hovered?.hex === cell.hex && hovered?.label === cell.label
          return (
            <path
              key={i}
              d={cell.d}
              fill={cell.hex}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={isHov ? 1.5 : 0.3}
              className="cursor-pointer"
              opacity={hovered && !isHov ? 0.65 : 1}
              onClick={() => copy(cell.hex)}
              onMouseEnter={() => setHovered(cell)}
              onMouseLeave={() => setHovered(null)}
            />
          )
        })}
        {/* Center hole */}
        <circle cx={cx} cy={cy} r={innerR} className="fill-white dark:fill-stone-950" />

        {/* Axis labels */}
        <text x={cx} y={18} textAnchor="middle" className="fill-stone-400 dark:fill-stone-500 text-[10px] font-medium select-none">Light</text>
        <text x={cx} y={392} textAnchor="middle" className="fill-stone-400 dark:fill-stone-500 text-[10px] font-medium select-none">Dark</text>
        <text x={10} y={cy + 3} textAnchor="start" className="fill-stone-400 dark:fill-stone-500 text-[10px] font-medium select-none">Blue</text>
        <text x={390} y={cy + 3} textAnchor="end" className="fill-stone-400 dark:fill-stone-500 text-[10px] font-medium select-none">Yellow</text>
      </svg>

      {/* Tooltip */}
      <div className="h-5 flex items-center justify-center">
        {hovered ? (
          <span className="text-xs text-stone-600 dark:text-stone-300">
            {hovered.label}
            <span className="ml-2 font-mono text-stone-400 dark:text-stone-500">
              {copied === hovered.hex ? 'Copied!' : hovered.hex}
            </span>
          </span>
        ) : (
          <span className="text-[11px] text-stone-400 dark:text-stone-500">
            Hover to inspect, click to copy hex
          </span>
        )}
      </div>
    </div>
  )
}

function ColorArticle({ section }: { section: ColorSection }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span
          className="w-16 h-16 rounded-xl shadow-sm"
          style={{ backgroundColor: section.hex }}
        />
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
            Shades of {section.name}
          </h2>
          <p className="text-sm text-stone-400 dark:text-stone-500 font-mono mt-0.5">
            {section.hex}
          </p>
        </div>
      </div>

      <RedWheel />
    </div>
  )
}

export default function ColorsPage() {
  const [activeId, setActiveId] = useState(COLOR_SECTIONS[0].id)
  const active = COLOR_SECTIONS.find(s => s.id === activeId)!

  const groups = (['primary', 'secondary', 'tertiary', 'neutral'] as const).map(g => ({
    key: g,
    label: GROUP_LABELS[g],
    items: COLOR_SECTIONS.filter(s => s.group === g),
  }))

  return (
    <div className="flex-1 flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 overflow-y-auto py-6 px-3">
        {groups.map(group => (
          <div key={group.key} className="mb-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-3 mb-1">
              {group.label}
            </h3>
            {group.items.map(s => (
              <ColorCard
                key={s.id}
                section={s}
                active={activeId === s.id}
                onClick={() => setActiveId(s.id)}
              />
            ))}
          </div>
        ))}
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-10 max-w-3xl">
        <ColorArticle section={active} />
      </div>
    </div>
  )
}

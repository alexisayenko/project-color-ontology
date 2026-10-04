import { useState } from 'react'

type Tab = 'physics' | 'biology' | 'psychology' | 'history' | 'systems'

function Tabs({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'physics',    label: 'Physics of Light' },
    { id: 'biology',    label: 'Biology & Vision' },
    { id: 'psychology', label: 'Psychology & Perception' },
    { id: 'history',    label: 'Cultural History' },
    { id: 'systems',    label: 'Color Systems' },
  ]
  return (
    <div className="flex gap-1 mb-10 border-b border-stone-200 dark:border-stone-700 overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
            active === t.id
              ? 'border-stone-800 dark:border-stone-100 text-stone-900 dark:text-stone-50'
              : 'border-transparent text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50 mb-5 pb-2 border-b border-stone-200 dark:border-stone-700">{title}</h3>
      {children}
    </section>
  )
}

function Illustration({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <figure className="my-6 flex flex-col items-center">
      <div className="w-full bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-6 flex justify-center overflow-x-auto overflow-y-hidden">
        {children}
      </div>
      {caption && <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">{caption}</figcaption>}
    </figure>
  )
}

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function WaveParticleDiagram() {
  return (
    <Illustration caption="Light behaves as both a continuous wave and a stream of discrete particles (photons)">
      <svg viewBox="0 0 600 200" className="w-full max-w-lg" aria-label="Wave-particle duality diagram">
        {/* Wave side */}
        <text x="150" y="20" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500 text-[11px]" fontSize="11" fontWeight="500">Wave nature</text>
        <path
          d="M 20 110 Q 50 50, 80 110 Q 110 170, 140 110 Q 170 50, 200 110 Q 230 170, 260 110"
          fill="none"
          stroke="#2980b9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Arrow */}
        <line x1="275" y1="110" x2="325" y2="110" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="4 3" />
        <polygon points="322,105 332,110 322,115" fill="#a8a29e" />
        {/* Photon label */}
        <text x="450" y="20" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500 text-[11px]" fontSize="11" fontWeight="500">Particle nature</text>
        {/* Photons */}
        {[
          { cx: 360, cy: 80 }, { cx: 400, cy: 110 }, { cx: 440, cy: 75 },
          { cx: 480, cy: 120 }, { cx: 420, cy: 140 }, { cx: 370, cy: 130 },
          { cx: 460, cy: 95 }, { cx: 500, cy: 100 }, { cx: 390, cy: 60 },
          { cx: 530, cy: 85 }, { cx: 510, cy: 135 }, { cx: 450, cy: 150 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="8" fill="#f59e0b" opacity="0.2" />
            <circle cx={p.cx} cy={p.cy} r="4" fill="#f59e0b" />
          </g>
        ))}
        {/* Labels */}
        <text x="140" y="190" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="10">continuous oscillation</text>
        <text x="450" y="190" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="10">discrete energy packets</text>
      </svg>
    </Illustration>
  )
}

export function WavePropertiesDiagram() {
  return (
    <Illustration caption="A wave is characterised by its wavelength (distance between peaks) and amplitude (height)">
      <svg viewBox="0 0 520 200" className="w-full max-w-md" aria-label="Wave properties diagram">
        {/* Axis */}
        <line x1="30" y1="100" x2="500" y2="100" stroke="#a8a29e" strokeWidth="1" strokeDasharray="4 3" />
        {/* Wave */}
        <path
          d="M 30 100 Q 80 20, 130 100 Q 180 180, 230 100 Q 280 20, 330 100 Q 380 180, 430 100 Q 480 20, 500 80"
          fill="none"
          stroke="#27ae60"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Wavelength bracket */}
        <line x1="130" y1="30" x2="130" y2="15" stroke="#c0392b" strokeWidth="1.5" />
        <line x1="330" y1="30" x2="330" y2="15" stroke="#c0392b" strokeWidth="1.5" />
        <line x1="130" y1="18" x2="330" y2="18" stroke="#c0392b" strokeWidth="1.5" />
        <polygon points="133,18 130,13 127,18" fill="#c0392b" />
        <polygon points="327,18 330,13 333,18" fill="#c0392b" />
        <text x="230" y="13" textAnchor="middle" fill="#c0392b" fontSize="11" fontWeight="500">wavelength (λ)</text>
        {/* Amplitude */}
        <line x1="80" y1="100" x2="80" y2="37" stroke="#2980b9" strokeWidth="1.5" />
        <polygon points="80,40 76,48 84,48" fill="#2980b9" />
        <polygon points="80,97 76,89 84,89" fill="#2980b9" />
        <text x="68" y="72" textAnchor="end" fill="#2980b9" fontSize="10" fontWeight="500">amplitude</text>
        {/* Crest / Trough labels */}
        <text x="80" y="32" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="9">crest</text>
        <text x="180" y="192" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="9">trough</text>
        {/* Direction arrow */}
        <line x1="440" y1="100" x2="490" y2="100" stroke="#a8a29e" strokeWidth="1.5" />
        <polygon points="487,96 497,100 487,104" fill="#a8a29e" />
        <text x="465" y="118" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="9">direction</text>
      </svg>
    </Illustration>
  )
}

function ElectromagneticSpectrumDiagram() {
  return (
    <Illustration caption="The electromagnetic spectrum — visible light is a tiny sliver between infrared and ultraviolet">
      <svg viewBox="0 0 640 160" className="w-full max-w-2xl" aria-label="Electromagnetic spectrum">
        {/* Background band labels */}
        {[
          { x: 20, w: 80, label: 'Radio', color: '#e8e8e8' },
          { x: 100, w: 70, label: 'Micro-\nwave', color: '#e0e0e0' },
          { x: 170, w: 70, label: 'Infrared', color: '#fce4ec' },
          { x: 240, w: 160, label: 'Visible Light', color: '' },
          { x: 400, w: 70, label: 'Ultra-\nviolet', color: '#e8eaf6' },
          { x: 470, w: 70, label: 'X-ray', color: '#e0e0e0' },
          { x: 540, w: 80, label: 'Gamma', color: '#d8d8d8' },
        ].map(({ x, w, label, color }) => (
          <g key={label}>
            {color && <rect x={x} y="30" width={w} height="50" rx="0" fill={color} opacity="0.5" />}
            <text x={x + w / 2} y="100" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="9" fontWeight="500">
              {label.split('\n').map((line, i) => (
                <tspan key={i} x={x + w / 2} dy={i === 0 ? 0 : 11}>{line}</tspan>
              ))}
            </text>
          </g>
        ))}
        {/* Visible spectrum gradient */}
        <defs>
          <linearGradient id="visibleSpectrum" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b00ff" />
            <stop offset="16%" stopColor="#0000ff" />
            <stop offset="33%" stopColor="#00bfff" />
            <stop offset="50%" stopColor="#00ff00" />
            <stop offset="66%" stopColor="#ffff00" />
            <stop offset="83%" stopColor="#ff8c00" />
            <stop offset="100%" stopColor="#ff0000" />
          </linearGradient>
        </defs>
        <rect x="240" y="30" width="160" height="50" fill="url(#visibleSpectrum)" rx="0" />
        {/* nm labels under visible */}
        <text x="244" y="72" fontSize="8" fill="white" fontWeight="600">380</text>
        <text x="396" y="72" fontSize="8" fill="white" fontWeight="600" textAnchor="end">700</text>
        <text x="320" y="48" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">nm</text>
        {/* Wavelength arrow */}
        <line x1="40" y1="130" x2="600" y2="130" stroke="#a8a29e" strokeWidth="1" />
        <polygon points="597,127 607,130 597,133" fill="#a8a29e" />
        <text x="40" y="148" fontSize="9" className="fill-stone-400 dark:fill-stone-500">longer wavelength</text>
        <text x="600" y="148" textAnchor="end" fontSize="9" className="fill-stone-400 dark:fill-stone-500">shorter wavelength</text>
        <text x="40" y="25" fontSize="9" className="fill-stone-400 dark:fill-stone-500">lower energy</text>
        <text x="600" y="25" textAnchor="end" fontSize="9" className="fill-stone-400 dark:fill-stone-500">higher energy</text>
      </svg>
    </Illustration>
  )
}

function VisibleSpectrumBar() {
  // Build a sinusoid path that starts with long wavelength (red, left) and increases frequency toward violet (right)
  const width = 500
  const waveHeight = 30
  const waveY = 40 // vertical center of the wave area
  const points: string[] = []
  for (let x = 0; x <= width; x += 1) {
    const t = x / width // 0 → 1
    // Frequency increases from ~1.5 cycles at left to ~12 cycles at right
    const freq = 1.5 + t * t * 14
    const y = waveY + Math.sin(t * freq * Math.PI * 2) * waveHeight * 0.5
    points.push(`${x},${y.toFixed(1)}`)
  }
  const wavePath = 'M ' + points.join(' L ')

  return (
    <Illustration caption="The visible spectrum — longer wavelengths (red) on the left, shorter wavelengths (violet) on the right">
      <div className="w-full max-w-lg">
        <svg viewBox={`0 0 ${width} 80`} className="w-full" aria-label="Visible spectrum with wave frequency">
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="17%" stopColor="#ff8c00" />
              <stop offset="33%" stopColor="#ffff00" />
              <stop offset="50%" stopColor="#00ff00" />
              <stop offset="67%" stopColor="#00bfff" />
              <stop offset="83%" stopColor="#0000ff" />
              <stop offset="100%" stopColor="#8b00ff" />
            </linearGradient>
          </defs>
          <path d={wavePath} fill="none" stroke="url(#waveGrad)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="h-10 rounded-lg -mt-1" style={{
          background: 'linear-gradient(to right, #ff0000, #ff8c00, #ffff00, #00ff00, #00bfff, #0000ff, #8b00ff)',
        }} />
        <div className="flex justify-between mt-1.5">
          {[
            { nm: '700', label: 'Red' },
            { nm: '620', label: 'Orange' },
            { nm: '580', label: 'Yellow' },
            { nm: '520', label: 'Green' },
            { nm: '470', label: 'Blue' },
            { nm: '420', label: 'Violet' },
          ].map(({ nm, label }) => (
            <div key={nm} className="text-center">
              <div className="text-[9px] text-stone-500 dark:text-stone-400 font-medium">{label}</div>
              <div className="text-[8px] text-stone-400 dark:text-stone-500 font-mono">{nm} nm</div>
            </div>
          ))}
        </div>
      </div>
    </Illustration>
  )
}

export function PrismDiagram() {
  return (
    <Illustration caption="Dispersion — a prism separates white light into its component wavelengths">
      <svg viewBox="0 0 500 220" className="w-full max-w-md" aria-label="Prism dispersion diagram">
        {/* Incoming white light */}
        <line x1="30" y1="110" x2="175" y2="110" stroke="#d6d3d1" strokeWidth="6" strokeLinecap="round" />
        <text x="90" y="98" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="10">white light</text>
        {/* Prism */}
        <polygon points="200,40 320,40 260,190" fill="none" stroke="#78716c" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="200,40 320,40 260,190" fill="#a8a29e" opacity="0.12" />
        <text x="260" y="100" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="10">prism</text>
        {/* Dispersed rays */}
        {[
          { color: '#ff0000', y: 60, label: 'red' },
          { color: '#ff8c00', y: 78, label: '' },
          { color: '#ffcc00', y: 96, label: '' },
          { color: '#00cc00', y: 114, label: '' },
          { color: '#0066ff', y: 132, label: '' },
          { color: '#8b00ff', y: 150, label: 'violet' },
        ].map(({ color, y }, i) => (
          <line key={i} x1="290" y1={85 + i * 5} x2="470" y2={y} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        ))}
        <text x="480" y="63" className="fill-stone-400 dark:fill-stone-500" fontSize="9">red — least bent</text>
        <text x="480" y="155" className="fill-stone-400 dark:fill-stone-500" fontSize="9">violet — most bent</text>
      </svg>
    </Illustration>
  )
}

function EyeAnatomyDiagram() {
  return (
    <Illustration caption="The human eye — light enters through the lens, hits the retina, where rods and cones convert it to nerve signals">
      <svg viewBox="0 0 520 240" className="w-full max-w-md" aria-label="Human eye anatomy diagram">
        {/* Eye outline */}
        <ellipse cx="200" cy="120" rx="140" ry="100" fill="none" stroke="#78716c" strokeWidth="2" />
        {/* Cornea bulge */}
        <path d="M 60 90 Q 30 120, 60 150" fill="none" stroke="#78716c" strokeWidth="2" />
        {/* Lens */}
        <ellipse cx="105" cy="120" rx="15" ry="40" fill="#a8a29e" opacity="0.15" stroke="#78716c" strokeWidth="1.5" />
        <text x="105" y="175" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="9" fontWeight="500">Lens</text>
        {/* Pupil */}
        <circle cx="68" cy="120" r="12" fill="#1c1917" />
        <text x="68" y="100" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="8">Pupil</text>
        {/* Retina highlight */}
        <path d="M 280 45 Q 345 120, 280 195" fill="none" stroke="#c0392b" strokeWidth="3" strokeLinecap="round" />
        <text x="310" y="75" className="fill-red-600 dark:fill-red-400" fontSize="9" fontWeight="600">Retina</text>
        {/* Light rays */}
        {[85, 110, 120, 130, 155].map((y, i) => (
          <line key={i} x1="10" y1={y} x2="65" y2={120} stroke="#f59e0b" strokeWidth="1" opacity="0.6" strokeDasharray="3 2" />
        ))}
        {/* Optic nerve */}
        <line x1="335" y1="120" x2="340" y2="120" stroke="#78716c" strokeWidth="8" strokeLinecap="round" />
        <line x1="340" y1="120" x2="390" y2="135" stroke="#78716c" strokeWidth="5" strokeLinecap="round" />
        <text x="370" y="155" className="fill-stone-500 dark:fill-stone-400" fontSize="9">Optic nerve</text>
        {/* Zoomed retina detail */}
        <g transform="translate(410, 20)">
          <rect x="0" y="0" width="100" height="200" rx="8" fill="none" stroke="#a8a29e" strokeWidth="1" strokeDasharray="4 3" />
          <text x="50" y="18" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="8" fontWeight="600">Retina detail</text>
          {/* Rods */}
          {[15, 25, 35, 45, 55, 65, 75, 85].map((x, i) => (
            <rect key={`rod-${i}`} x={x} y="30" width="4" height="28" rx="2" fill="#78716c" opacity="0.6" />
          ))}
          <text x="50" y="72" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="7">Rods</text>
          <text x="50" y="82" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="6">~120 million — brightness</text>
          {/* Cones */}
          {[
            { x: 15, color: '#2980b9' }, { x: 28, color: '#27ae60' }, { x: 41, color: '#c0392b' },
            { x: 54, color: '#27ae60' }, { x: 67, color: '#c0392b' }, { x: 80, color: '#2980b9' },
          ].map(({ x, color }, i) => (
            <g key={`cone-${i}`}>
              <polygon points={`${x},130 ${x + 5},100 ${x + 10},130`} fill={color} opacity="0.7" />
            </g>
          ))}
          <text x="50" y="145" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="7">Cones</text>
          <text x="50" y="155" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="6">~6-7 million — colour</text>
          {/* Cone types */}
          <g transform="translate(10, 168)">
            <circle cx="8" cy="4" r="4" fill="#2980b9" />
            <text x="16" y="7" className="fill-stone-400 dark:fill-stone-500" fontSize="6">S (blue)</text>
          </g>
          <g transform="translate(45, 168)">
            <circle cx="8" cy="4" r="4" fill="#27ae60" />
            <text x="16" y="7" className="fill-stone-400 dark:fill-stone-500" fontSize="6">M (green)</text>
          </g>
          <g transform="translate(10, 182)">
            <circle cx="8" cy="4" r="4" fill="#c0392b" />
            <text x="16" y="7" className="fill-stone-400 dark:fill-stone-500" fontSize="6">L (red)</text>
          </g>
        </g>
      </svg>
    </Illustration>
  )
}

function ChlorophyllAbsorptionDiagram() {
  return (
    <Illustration caption="Chlorophyll absorbs red and blue light efficiently, but reflects green — which is why plants are green">
      <svg viewBox="0 0 500 200" className="w-full max-w-md" aria-label="Chlorophyll absorption spectrum">
        {/* Background spectrum */}
        <defs>
          <linearGradient id="spectrumBg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b00ff" />
            <stop offset="16%" stopColor="#0000ff" />
            <stop offset="33%" stopColor="#00bfff" />
            <stop offset="50%" stopColor="#00ff00" />
            <stop offset="66%" stopColor="#ffff00" />
            <stop offset="83%" stopColor="#ff8c00" />
            <stop offset="100%" stopColor="#ff0000" />
          </linearGradient>
        </defs>
        <rect x="50" y="155" width="400" height="12" fill="url(#spectrumBg2)" rx="2" opacity="0.7" />
        {/* nm labels */}
        <text x="50" y="182" fontSize="8" className="fill-stone-400 dark:fill-stone-500" textAnchor="middle">400</text>
        <text x="150" y="182" fontSize="8" className="fill-stone-400 dark:fill-stone-500" textAnchor="middle">475</text>
        <text x="250" y="182" fontSize="8" className="fill-stone-400 dark:fill-stone-500" textAnchor="middle">550</text>
        <text x="350" y="182" fontSize="8" className="fill-stone-400 dark:fill-stone-500" textAnchor="middle">625</text>
        <text x="450" y="182" fontSize="8" className="fill-stone-400 dark:fill-stone-500" textAnchor="middle">700</text>
        <text x="250" y="196" fontSize="8" className="fill-stone-400 dark:fill-stone-500" textAnchor="middle">wavelength (nm)</text>
        {/* Absorption curve — high at blue and red, low at green */}
        <path
          d="M 50 60 Q 80 25, 110 30 Q 140 35, 170 70 Q 200 110, 250 130 Q 300 110, 330 70 Q 360 35, 400 25 Q 430 30, 450 55"
          fill="none"
          stroke="#27ae60"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Fill under curve */}
        <path
          d="M 50 60 Q 80 25, 110 30 Q 140 35, 170 70 Q 200 110, 250 130 Q 300 110, 330 70 Q 360 35, 400 25 Q 430 30, 450 55 L 450 150 L 50 150 Z"
          fill="#27ae60"
          opacity="0.08"
        />
        {/* Y axis label */}
        <text x="25" y="90" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="8" transform="rotate(-90, 25, 90)">absorption</text>
        {/* Annotations */}
        <text x="95" y="20" textAnchor="middle" fill="#2980b9" fontSize="9" fontWeight="500">absorbs blue</text>
        <text x="250" y="145" textAnchor="middle" fill="#27ae60" fontSize="9" fontWeight="500">reflects green</text>
        <text x="405" y="20" textAnchor="middle" fill="#c0392b" fontSize="9" fontWeight="500">absorbs red</text>
      </svg>
    </Illustration>
  )
}

export function RayleighScatteringDiagram() {
  return (
    <Illustration caption="Rayleigh scattering — short wavelengths (blue) scatter much more than long wavelengths (red)">
      <svg viewBox="0 0 520 220" className="w-full max-w-md" aria-label="Rayleigh scattering diagram">
        {/* Sun */}
        <circle cx="60" cy="110" r="25" fill="#f59e0b" />
        <circle cx="60" cy="110" r="30" fill="#f59e0b" opacity="0.2" />
        <text x="60" y="155" textAnchor="middle" className="fill-stone-500 dark:fill-stone-400" fontSize="9">Sun</text>
        {/* White light beam */}
        <line x1="90" y1="110" x2="200" y2="110" stroke="#d6d3d1" strokeWidth="5" strokeLinecap="round" />
        {/* Atmosphere region */}
        <rect x="200" y="20" width="200" height="180" rx="10" fill="#bfdbfe" opacity="0.12" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4 3" />
        <text x="300" y="15" textAnchor="middle" className="fill-stone-400 dark:fill-stone-500" fontSize="9">atmosphere</text>
        {/* Gas molecules */}
        {[
          { x: 230, y: 60 }, { x: 270, y: 45 }, { x: 310, y: 70 }, { x: 350, y: 50 },
          { x: 250, y: 100 }, { x: 290, y: 130 }, { x: 330, y: 95 }, { x: 370, y: 120 },
          { x: 240, y: 155 }, { x: 280, y: 170 }, { x: 320, y: 160 }, { x: 360, y: 175 },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#78716c" opacity="0.3" />
        ))}
        {/* Blue scattering (many directions) */}
        {[
          { x1: 260, y1: 100, x2: 240, y2: 35 },
          { x1: 290, y1: 130, x2: 260, y2: 50 },
          { x1: 310, y1: 95, x2: 330, y2: 35 },
          { x1: 330, y1: 95, x2: 370, y2: 45 },
          { x1: 270, y1: 100, x2: 230, y2: 170 },
          { x1: 320, y1: 130, x2: 350, y2: 185 },
        ].map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        ))}
        {/* Red passes through */}
        <line x1="200" y1="110" x2="400" y2="110" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <line x1="400" y1="110" x2="490" y2="110" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        {/* Observer */}
        <text x="480" y="105" textAnchor="middle" fontSize="20">👁</text>
        {/* Labels */}
        <text x="460" y="140" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="500">red passes</text>
        <text x="460" y="152" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="500">through</text>
        <text x="300" y="210" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="500">blue scatters in all directions → blue sky</text>
      </svg>
    </Illustration>
  )
}

function ThermalRadiationDiagram() {
  return (
    <figure className="my-6 flex flex-col items-center">
      <div className="grid grid-cols-2 gap-4 items-center max-w-2xl">
        <img src="/assets/theory/heat-transfer-diagram.png" alt="Heat energy transfer: conduction, convection, and radiation" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
        <img src="/assets/theory/thermal-camera.png" alt="Thermal camera image of a person showing infrared radiation" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
      </div>
      <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Heat transfers via conduction, convection, and radiation — a thermal camera reveals the infrared radiation your body emits</figcaption>
    </figure>
  )
}

function ColorTemperatureBar() {
  return (
    <Illustration caption="Colour temperature scale — from warm candlelight to cool daylight">
      <div className="w-full max-w-lg">
        <div className="h-8 rounded-lg" style={{
          background: 'linear-gradient(to right, #ff6a00, #ff8a00, #ffc464, #fff4e0, #fff9f0, #f0f4ff, #d4e4ff, #b8d0ff)',
        }} />
        <div className="flex justify-between mt-1.5">
          {[
            { k: '1800K', label: 'Candle' },
            { k: '2700K', label: 'Bulb' },
            { k: '4000K', label: 'LED' },
            { k: '5500K', label: 'Sun' },
            { k: '6500K', label: 'Overcast' },
            { k: '10000K', label: 'Blue sky' },
          ].map(({ k, label }) => (
            <div key={k} className="text-center">
              <div className="text-[9px] text-stone-500 dark:text-stone-400 font-medium">{label}</div>
              <div className="text-[8px] text-stone-400 dark:text-stone-500 font-mono">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </Illustration>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] text-stone-600 dark:text-stone-300 leading-relaxed mb-3">{children}</p>
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-stone-700 dark:text-stone-200">{children}</strong>
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-stone-700 dark:text-stone-200 underline underline-offset-2 hover:text-stone-900 dark:hover:text-stone-50 transition-colors">{children}</a>
}

// ─── Tab: Physics of Light ────────────────────────────────────────────────────

function PhysicsTab() {
  return (
    <article className="max-w-3xl">
      <Section title="What is light?">
        <P>
          Everything we see — every colour, every shadow, every sunrise — begins with light. And light is one of the strangest things in the universe. It behaves as both a wave and a stream of particles at the same time. This is the <B>wave-particle duality</B>, the cornerstone of quantum physics. When light travels through space, it acts like a wave — oscillating electric and magnetic fields rippling outward. But when light hits a surface or is absorbed by your eye, it arrives in discrete packets of energy called <B>photons</B>. Each photon carries a specific amount of energy, and that energy determines the colour you see.
        </P>
        <WaveParticleDiagram />
        <P>
          Think of it like the ocean. From a distance, the sea looks like continuous rolling waves. But zoom in close enough and you find that it is made of individual water molecules. Light works the same way — continuous from far away, granular up close. This was one of the great intellectual achievements of the 20th century: the realization that nature is not forced to be either a wave or a particle. It is both, depending on how you look at it.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <img src="/assets/theory/wave-properties.png" alt="Wave properties — crest, trough, wavelength, and amplitude" className="w-full max-w-md rounded-xl border border-stone-200 dark:border-stone-700" />
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">A wave is characterised by its wavelength, amplitude, crest, and trough</figcaption>
        </figure>
      </Section>

      <Section title="Wavelength, frequency, and colour">
        <P>
          Light is part of the <B>electromagnetic spectrum</B> — the same family that includes radio waves, microwaves, X-rays, and gamma rays. What makes visible light special is simply that our eyes happen to detect it. The entire visible spectrum — everything from deep red to violet — occupies a tiny sliver of the electromagnetic spectrum, roughly between 380 and 700 nanometers in wavelength.
        </P>
        <ElectromagneticSpectrumDiagram />
        <P>
          Wavelength and frequency are inversely related: the longer the wavelength, the lower the frequency, and the less energy the photon carries. <B>Red light</B> has the longest wavelength (~700 nm) and lowest energy. <B>Violet light</B> has the shortest (~380 nm) and highest energy. Everything in between — orange, yellow, green, blue — falls along this continuum. There is no sharp boundary between colours; the spectrum is a smooth gradient, and colour names are just labels we place upon it.
        </P>
        <VisibleSpectrumBar />
      </Section>

      <Section title="Why hot things glow — thermal radiation">
        <P>
          Every object in the universe with a temperature above absolute zero emits electromagnetic radiation. This is called <B>thermal radiation</B>, and it is a fundamental fact of physics. You emit it right now — in the infrared range, invisible to the naked eye but perfectly visible to a thermal camera.
        </P>
        <ThermalRadiationDiagram />
        <P>
          The hotter an object gets, the more energetic its radiation becomes, shifting to shorter wavelengths. Heat a piece of metal and it first glows dull red, then orange, then yellow, then white, and finally bluish-white. This progression is not random — it follows a precise relationship between temperature and the peak wavelength of emitted light. Physicists describe this using the concept of a <B>black body</B> — an idealised object that absorbs all radiation and re-emits it perfectly according to its temperature.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <img src="/assets/theory/heat-transfer-campfire.png" alt="Heat transfer methods illustrated with a campfire — conduction through a poker, convection rising above, radiation warming hands at a distance" className="w-full max-w-md rounded-xl border border-stone-200 dark:border-stone-700" />
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">A campfire demonstrates all three heat transfer methods at once</figcaption>
        </figure>
        <P>
          This is why we measure the "colour" of light sources in <B>Kelvin</B>:
        </P>
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-5 mb-4">
          <div className="space-y-2.5">
            {[
              { k: '~1,800 K', label: 'Candle flame', color: '#ff8a00', desc: 'deep warm orange' },
              { k: '~2,700 K', label: 'Incandescent bulb', color: '#ffc464', desc: 'warm yellowish white — the "cosy" light' },
              { k: '~4,000 K', label: 'Neutral white LED', color: '#fff4e0', desc: 'balanced, slightly warm' },
              { k: '~5,500 K', label: 'Midday sunlight', color: '#fff9f0', desc: 'what we call "daylight white"' },
              { k: '~6,500 K', label: 'Overcast sky', color: '#f0f4ff', desc: 'cool bluish white' },
              { k: '~10,000 K', label: 'Clear blue sky', color: '#d4e4ff', desc: 'distinctly blue' },
            ].map(({ k, label, color, desc }) => (
              <div key={k} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full shrink-0 border border-stone-200 dark:border-stone-600" style={{ backgroundColor: color }} />
                <span className="text-xs text-stone-500 dark:text-stone-400 w-20 shrink-0 font-mono">{k}</span>
                <span className="text-sm text-stone-700 dark:text-stone-200 font-medium w-40 shrink-0">{label}</span>
                <span className="text-xs text-stone-400 dark:text-stone-500">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <P>
          Counter-intuitively, "warm" colours in lighting have <em>lower</em> colour temperatures, while "cool" bluish light has a <em>higher</em> temperature. A cosy candle at 1,800 K is physically cooler than the harsh blue sky at 10,000 K.
        </P>
        <ColorTemperatureBar />
      </Section>

      <Section title="Colours of the stars">
        <P>
          What makes stars so hot in the first place? The answer is <B>thermonuclear fusion</B>. Deep in a star's core, under crushing pressure and temperatures exceeding 15 million °C, hydrogen nuclei fuse together to form helium. In the process, a tiny fraction of mass is converted into an enormous amount of energy — as described by Einstein's famous E=mc². This is what powers a star for billions of years. As a star ages and exhausts its hydrogen, heavier stars can fuse helium into carbon, carbon into oxygen, and so on up the periodic table — all the way to iron, beyond which fusion no longer releases energy. At that point, massive stars collapse and explode as supernovae, scattering heavy elements into space — the very atoms that eventually form planets, oceans, and us.
        </P>
        <P>
          Stars are natural black-body radiators, and their colour directly reveals their surface temperature. <B>Red dwarf</B> stars like Proxima Centauri burn at around 3,000 K — cool by stellar standards, glowing a deep orange-red. Our <B>Sun</B>, a yellow dwarf, has a surface temperature of about 5,778 K. Despite its name, when viewed from space (above the atmosphere), its light is actually white with a slight yellow tint.
        </P>
        <P>
          <B>Blue giant</B> stars like Rigel in the constellation Orion burn at over 11,000 K, radiating intense bluish-white light. The hottest known stars, like the Wolf-Rayet stars, can exceed 200,000 K, emitting most of their energy in the ultraviolet range.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <img src="/assets/theory/star-colours.png" alt="Star colours by temperature — Proxima Centauri (red dwarf, ~3,000 K), Sun (yellow dwarf, ~5,778 K), Rigel (blue giant, >11,000 K), Wolf-Rayet star (~200,000 K)" className="w-full max-w-md rounded-xl border border-stone-200 dark:border-stone-700" />
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">A star's colour reveals its surface temperature — from cool red dwarfs to blazing blue giants</figcaption>
        </figure>
      </Section>

      <Section title="The colour of our sky">
        <figure className="my-6 flex flex-col items-center">
          <img src="/assets/theory/rayleigh-scattering.png" alt="Why is the sky blue — Rayleigh scattering infographic" className="w-full max-w-md rounded-xl border border-stone-200 dark:border-stone-700" />
        </figure>
        <P>
          Why is the sky blue? The answer lies in a phenomenon called <B>Rayleigh scattering</B>. When sunlight enters the atmosphere, it collides with gas molecules (mainly nitrogen and oxygen). Shorter wavelengths — blue and violet — scatter much more strongly than longer wavelengths like red and yellow. The scattering intensity is inversely proportional to the fourth power of wavelength, meaning blue light scatters roughly 5.5 times more than red light.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <img src="/assets/theory/rayleigh-scattering-2.png" alt="Sunlight entering atmosphere — blue and violet wavelengths scatter widely while red and yellow pass through" className="w-full max-w-md rounded-xl border border-stone-200 dark:border-stone-700" />
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Rayleigh scattering — short wavelengths (blue) scatter much more than long wavelengths (red), making the sky blue.</figcaption>
        </figure>
        <P>
          You might ask: if violet scatters even more than blue, why isn't the sky violet? Two reasons. First, the Sun emits less violet light than blue. Second, our eyes are more sensitive to blue than to violet. The result: a vivid blue sky.
        </P>
        <P>
          At <B>sunset and sunrise</B>, the Sun is near the horizon. Its light must travel through a much thicker layer of atmosphere to reach your eyes. By the time it arrives, most of the blue and green wavelengths have been scattered away, leaving primarily the long-wavelength red and orange light. The more atmosphere the light passes through, the redder it gets — which is why the Sun sometimes appears deep crimson just before it dips below the horizon.
        </P>
      </Section>

      <Section title="Dispersion — splitting white light into colours">
        <P>
          When white light passes through a glass prism, it separates into a rainbow — a phenomenon called <B>dispersion</B>. This happens because different wavelengths of light travel at slightly different speeds through glass. Shorter wavelengths (violet, blue) slow down more and bend more sharply than longer wavelengths (red, orange). Isaac Newton was the first to demonstrate this systematically in the 1660s, proving that white light is not pure — it is a mixture of all visible colours.
        </P>
        <P>
          Rainbows in the sky work on the same principle. Sunlight enters a raindrop, refracts (bends), reflects off the back of the drop, and refracts again on exit. Each wavelength bends slightly differently, spreading the light into the full spectrum. The reason a rainbow is an arc is a matter of geometry — each colour reaches your eye at a specific angle from the direction of the sunlight.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <img src="/assets/theory/dispersion-prism.png" alt="Dispersion — white light splits into red, orange, yellow, green, blue, indigo, violet through a prism" className="w-full max-w-md rounded-xl border border-stone-200 dark:border-stone-700" />
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">A prism separates white light into its component wavelengths</figcaption>
        </figure>
      </Section>

      <Section title="Vantablack — the darkest material">
        <P>
          In 2014, Surrey NanoSystems created <B>Vantablack</B> — a material so dark that it absorbs 99.965% of visible light. The name stands for <B>V</B>ertically <B>A</B>ligned <B>N</B>ano<B>T</B>ube <B>A</B>rrays. It is made of a forest of carbon nanotubes so densely packed that photons enter and bounce between the tubes until virtually all their energy is absorbed. Objects coated in Vantablack lose all visual depth and texture — they appear as flat silhouettes, as if a hole has been cut in reality. It approaches the theoretical ideal of a perfect black body absorber.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <img src="/assets/theory/vantablack.jpg" alt="Crumpled aluminium foil coated in Vantablack — appears as a completely flat black shape with no visible texture" className="w-full max-w-md rounded-xl border border-stone-200 dark:border-stone-700" />
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Crumpled aluminium foil coated in Vantablack — all surface detail vanishes, leaving a flat black silhouette</figcaption>
        </figure>
      </Section>
    </article>
  )
}

// ─── Tab: Biology & Vision ────────────────────────────────────────────────────

function BiologyTab() {
  return (
    <article className="max-w-3xl">
      <Section title="Light and life — photosynthesis">
        <P>
          Light is not just something we see — it is the primary energy source for almost all life on Earth. <B>Photosynthesis</B> is the process by which plants, algae, and some bacteria capture photons and convert their energy into chemical energy (sugars), releasing oxygen as a byproduct. In a very real sense, the food you eat and the air you breathe exist because life learned to harvest light.
        </P>
        <P>
          The key molecule responsible is <B>chlorophyll</B>, which absorbs light most efficiently in the red (~680 nm) and blue (~440 nm) parts of the spectrum. It reflects green light — which is why most plants appear green to us. Chlorophyll evolved to capture the wavelengths where the Sun's radiation is most intense and most useful for driving chemical reactions. Green light falls in the middle of the visible spectrum where absorption is least efficient for chlorophyll, so it gets bounced back.
        </P>
        <ChlorophyllAbsorptionDiagram />
      </Section>

      <Section title="The rarest colour in nature">
        <P>
          <B>Blue</B> is the rarest colour in nature. While the sky and ocean appear blue, these are caused by light scattering, not by blue pigments. True blue pigment is extraordinarily difficult for biological systems to produce. The vast majority of blue in animals — the wings of a Morpho butterfly, the feathers of a blue jay, the rings of a blue-ringed octopus — is <B>structural colour</B>, created not by pigment but by microscopic surface structures that interfere with light waves and selectively reflect blue wavelengths.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-3 gap-3 max-w-2xl">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/morpho-butterfly.jpg" alt="Morpho butterfly with iridescent blue wings" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Morpho butterfly</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/blue-jay.jpg" alt="Blue jay with vivid blue feathers" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Blue jay</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/blue-ringed-octopus.jpg" alt="Blue-ringed octopus displaying vivid blue rings" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Blue-ringed octopus</figcaption>
            </figure>
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">None of these animals use blue pigment — their colour is structural, created by microscopic surface textures</figcaption>
        </figure>
        <P>
          Blue flowers are also relatively rare and typically achieve their colour through complex pH manipulation of pigments like anthocyanins. There are very few naturally occurring blue minerals or organisms that use actual blue pigment. This rarity may partly explain why blue has been perceived as special, even magical, across many human cultures.
        </P>
      </Section>

      <Section title="How the eye sees colour">
        <P>
          The human eye is a biological camera, but the real work of seeing colour happens in the <B>retina</B> — a thin layer of nervous tissue lining the back of the eye. The retina contains two main types of photoreceptor cells:
        </P>
        <EyeAnatomyDiagram />
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-5 mb-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-stone-700 dark:text-stone-200">Rods</span>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">~120 million per eye. Extremely sensitive to light, responsible for vision in dim conditions. They do not distinguish colour — only brightness. This is why everything looks grey in near-darkness.</p>
            </div>
            <div>
              <span className="text-sm font-medium text-stone-700 dark:text-stone-200">Cones</span>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">~6–7 million per eye. Responsible for colour vision. They come in three types, each sensitive to a different range of wavelengths: <strong>S-cones</strong> (short, ~420 nm — blue), <strong>M-cones</strong> (medium, ~530 nm — green), and <strong>L-cones</strong> (long, ~560 nm — red). The brain interprets colour by comparing the relative activation levels of all three cone types.</p>
            </div>
          </div>
        </div>
        <P>
          The chemical that makes this possible is <B>rhodopsin</B> (in rods) and related photopsins (in cones). Rhodopsin is made from a protein called opsin combined with <B>retinal</B>, a molecule derived from <B>vitamin A</B>. When a photon hits a rhodopsin molecule, the retinal changes shape, triggering an electrical signal that travels along the optic nerve to the brain. This is why vitamin A deficiency leads to night blindness — without enough retinal, the rods cannot regenerate rhodopsin efficiently.
        </P>
        <P>
          How many colours can we actually see? The typical human eye can distinguish roughly <B>1 million distinct colours</B>. This number comes from the combination of our three cone types: each can discriminate around 100 levels of intensity, and 100 × 100 × 100 gives about 1 million unique combinations. In practice, the actual number varies from person to person depending on the density and health of their cones, lighting conditions, and even training. Under ideal laboratory conditions, some researchers have estimated the upper bound at around 2–3 million distinguishable shades — but in everyday life, 1 million is a reasonable working figure.
        </P>
      </Section>

      <Section title="Colour blindness — daltonism">
        <P>
          <B>Colour vision deficiency</B> (commonly called colour blindness or daltonism, after John Dalton who first described his own condition in 1794) occurs when one or more cone types are absent or function abnormally. The genes for M-cones and L-cones are located on the X chromosome, which is why colour blindness is far more common in men (~8%) than in women (~0.5%) — men have only one X chromosome, so a single defective gene has no backup.
        </P>
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-5 mb-4">
          <div className="space-y-2.5">
            {[
              { name: 'Protanopia', desc: 'Missing or defective L-cones (red). Red appears dark or brownish. The most disorienting type for everyday life.' },
              { name: 'Deuteranopia', desc: 'Missing or defective M-cones (green). The most common form. Greens and reds are confused, but brightness perception is normal.' },
              { name: 'Tritanopia', desc: 'Missing or defective S-cones (blue). Very rare. Blues and yellows are confused. Not linked to the X chromosome.' },
              { name: 'Achromatopsia', desc: 'Complete absence of functioning cones. Extremely rare (~1 in 30,000). The world appears entirely in shades of grey.' },
            ].map(({ name, desc }) => (
              <div key={name}>
                <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{name}</span>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Tetrachromacy — the fourth cone">
        <P>
          While most humans are trichromats (three cone types), a small percentage of women may be <B>tetrachromats</B> — possessing four distinct types of cone cells. This is possible because the genes for M and L cones sit on the X chromosome, and women have two X chromosomes. If one X carries a slightly mutated version of a cone gene, it can produce a fourth cone type sensitive to wavelengths between the standard M and L cones.
        </P>
        <P>
          Research estimates that up to 12% of women may carry the genetic potential for tetrachromacy, though only a small fraction appear to be <B>functional tetrachromats</B> — meaning their brains actually use the fourth cone type to perceive additional colour distinctions invisible to trichromats. Functional tetrachromats can reportedly distinguish between shades that look identical to the rest of us, seeing up to 100 million colours compared to the roughly 1 million a typical trichromat perceives.
        </P>
      </Section>

      <Section title="Colour vision in the animal kingdom">
        <P>
          Humans are far from having the best colour vision in nature. Different species have evolved visual systems tailored to their ecological niches:
        </P>
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-5 mb-4">
          <div className="space-y-2.5">
            {[
              { animal: 'Mantis shrimp', desc: 'Have 16 types of colour receptors (compared to our 3), including sensitivity to ultraviolet and polarized light. They see a world of colour far beyond our comprehension.' },
              { animal: 'Bees', desc: 'Cannot see red but can see ultraviolet. Flowers that look plain white to us display vivid UV patterns that guide bees to nectar.' },
              { animal: 'Dogs', desc: 'Dichromats — they have two cone types and see roughly the equivalent of red-green colour blindness in humans. They distinguish blue and yellow well, but red and green look similar.' },
              { animal: 'Birds', desc: 'Most birds are tetrachromats with a UV-sensitive cone. They see ultraviolet patterns in feathers that are invisible to us, which play a role in mate selection.' },
              { animal: 'Snakes', desc: 'Some pit vipers have infrared-sensing pit organs, giving them a "thermal image" of the world overlaid on their visible vision.' },
              { animal: 'Cephalopods', desc: 'Octopuses and cuttlefish are technically colour-blind (one cone type) yet are masters of camouflage. They may perceive colour through their skin or by detecting the polarization of light.' },
            ].map(({ animal, desc }) => (
              <div key={animal}>
                <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{animal}</span>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <P>
          Colour plays crucial roles across species: mate attraction (peacock feathers, bird plumage), warning signals (poison dart frogs, wasps), camouflage (chameleons, cuttlefish), and finding food (bees navigating to flowers). The evolution of colour vision is inseparable from the evolution of colour itself in nature.
        </P>
      </Section>
    </article>
  )
}

// ─── Tab: Psychology & Perception ─────────────────────────────────────────────

function PsychologyTab() {
  return (
    <article className="max-w-3xl">
      <Section title="Colour as subjective experience">
        <P>
          Here is a question that has puzzled philosophers for centuries: is the red you see the same red I see? You and I can both point at a strawberry and agree it is "red." But the <em>inner experience</em> — the actual sensation of redness in your consciousness — might be entirely different from mine. There is no way to compare our subjective experiences directly. In philosophy, this raw, subjective quality of experience is called <B>qualia</B>.
        </P>
        <P>
          Colour is not a property of the physical world in the way that wavelength is. Wavelength is objective — it can be measured with instruments. But "red" is a label your brain assigns to a particular pattern of cone stimulation. The colour itself exists only inside your head. This means that colour, at its deepest level, is a <B>subjective psychological phenomenon</B>, not a physical one.
        </P>
      </Section>

      <Section title="Mary's Room — the knowledge argument">
        <P>
          The philosopher Frank Jackson proposed a famous thought experiment in 1982 known as <B>Mary's Room</B>. Imagine a brilliant scientist named Mary who has spent her entire life in a black-and-white room. She has never seen colour. But she has studied everything there is to know about the physics of light, the neuroscience of colour vision, the wavelengths, the brain processes — every objective fact. Now imagine the door opens and Mary steps outside and sees a red rose for the first time. Does she learn something new?
        </P>
        <P>
          If yes, then there is something about the <em>experience</em> of seeing red that cannot be captured by physical facts alone. This suggests that qualia — subjective experience — is something over and above the physics. The experiment has been debated for decades and remains one of the most compelling arguments in the philosophy of consciousness.
        </P>
        <P>
          For a deeper dive into these ideas, these videos explore the topic wonderfully:
        </P>
        <ul className="space-y-1.5 mb-4">
          <li className="text-sm text-stone-600 dark:text-stone-300">
            <Link href="https://youtu.be/R3unPcJDbCc">Do You See What I See? — the question of subjective colour</Link>
          </li>
          <li className="text-sm text-stone-600 dark:text-stone-300">
            <Link href="https://youtu.be/evQsOFQju08">Is Your Red The Same as My Red?</Link>
          </li>
          <li className="text-sm text-stone-600 dark:text-stone-300">
            <Link href="https://youtu.be/mGYmiQkah4o">Mary's Room: A philosophical thought experiment</Link>
          </li>
        </ul>
      </Section>

      <Section title="Language shapes colour perception">
        <P>
          One of the most fascinating findings in colour research is that the language you speak can influence how you <em>perceive</em> colour — not just how you describe it.
        </P>
        <P>
          The ancient Greeks famously had no dedicated word for "blue." Homer described the sea as "wine-dark" (οἶνοψ, <em>oinops</em>) and the sky as bronze or iron. The word <em>kyanos</em> existed but covered a vague range from dark blue to black. This pattern is not unique to Greek — many ancient languages, including Chinese, Hebrew, and Japanese, developed words for blue relatively late. Some scholars believe that without a distinct word for blue, people were less attentive to it as a separate category, though they could certainly still see the wavelength.
        </P>
        <P>
          Russian offers a striking modern example. Russian has two mandatory, distinct words for blue: <B>голубой</B> (<em>goluboy</em>) for light blue and <B>синий</B> (<em>siniy</em>) for dark blue. These are not adjective + noun constructions like "light blue" in English — they are basic colour terms, as distinct as "green" and "blue" are to an English speaker. A study by Lera Boroditsky and colleagues (2007) demonstrated that Russian speakers are measurably faster at distinguishing light blue from dark blue compared to English speakers. The linguistic boundary created a perceptual advantage — having two names literally made their brains process the distinction more quickly.
        </P>
        <P>
          This effect is not limited to Russian. Similar patterns have been found across very different languages and cultures:
        </P>
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-5 mb-4">
          <div className="space-y-2.5">
            {[
              { name: 'Berinmo (Papua New Guinea)', desc: 'Speakers distinguish colours more accurately when they fall across a linguistic category boundary in their language than when both colours fall within the same category — even when the physical difference is identical.' },
              { name: 'Himba (Namibia)', desc: 'The Himba language has a richer set of green categories than English. Himba speakers show enhanced discrimination between greens that cross their category boundaries, but reduced sensitivity to the blue–green contrast that English speakers find obvious.' },
              { name: 'Greek', desc: 'Like Russian, Greek has distinct basic terms for light blue (ghalazio) and dark blue (ble). Greek speakers show faster discrimination across that boundary compared to English speakers, who lump both under "blue."' },
            ].map(({ name, desc }) => (
              <div key={name}>
                <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{name}</span>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <P>
          Interestingly, studies on <B>verbal interference</B> — where participants repeat words aloud during colour tasks — show that this linguistic advantage disappears when the language system is occupied. This suggests that language influences colour perception at a higher cognitive level rather than altering early visual processing itself. You still see the same photons — but the categories your language gives you shape how quickly and easily your brain sorts them.
        </P>
      </Section>

      <Section title="Do women see colour better?">
        <P>
          There is a widespread belief that women are better at distinguishing colours than men. Research does show a statistically significant, though modest, advantage: in laboratory colour-matching and colour-naming tasks, women tend to perform slightly better on average.
        </P>
        <P>
          Several factors contribute to this. On the biological side, the genes for two of the three cone types (M and L) are on the X chromosome, and having two X chromosomes gives women more genetic variability in cone sensitivity — including the possibility of tetrachromacy. On the cultural side, women in many societies are exposed to more colour vocabulary and colour-related decision-making from an early age — clothing, cosmetics, interior design — which provides more practice discriminating subtle differences.
        </P>
        <P>
          The most likely explanation is that <B>both biology and training contribute</B>. Colour discrimination, like most perceptual skills, improves with practice. Professional painters, textile workers, and designers of any gender develop exceptionally fine colour discrimination — not because of genetics, but because they spend thousands of hours attending to subtle colour differences. The gender gap in the general population likely reflects a combination of slight biological differences amplified by unequal cultural exposure to colour-rich tasks.
        </P>
      </Section>
    </article>
  )
}

// ─── Tab: Cultural History ────────────────────────────────────────────────────

function HistoryTab() {
  return (
    <article className="max-w-3xl">
      <Section title="Pigments — how humans make colour">
        <P>
          Before we trace the history of colour through civilizations, we need to understand <B>pigments</B> — the materials humans have used to create colour in paint, dye, cosmetics, and clothing for tens of thousands of years. A pigment is a substance that absorbs certain wavelengths of light and reflects others. The reflected wavelengths determine the colour we see.
        </P>
        <P>
          Early pigments came directly from the earth: <B>ochre</B> (iron oxide — yellow, red, and brown), <B>charcoal</B> (black), and <B>chalk</B> or <B>lime</B> (white). These minerals were ground into powder and mixed with fat, water, or egg to create paint. As civilizations advanced, they discovered ways to extract pigments from plants (indigo, saffron), animals (cochineal insects for red, murex snails for purple), and eventually from chemical synthesis. The history of colour is, in many ways, the history of pigments — each new pigment opened new possibilities in art, fashion, and culture.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-5 gap-3 max-w-2xl">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-ochre.jpg" alt="Ochre pigment — iron oxide" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Ochre</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-red-ochre.webp" alt="Red ochre pigment powder" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Red ochre</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-charcoal.jpg" alt="Charcoal — carbon black pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Charcoal</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-chalk.jpg" alt="Chalk — natural white pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Chalk</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-lime.jpg" alt="Lime — calcium oxide white pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Lime</figcaption>
            </figure>
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">The earliest pigments — minerals ground into powder and mixed with fat or water to create paint</figcaption>
        </figure>
        <figure className="my-4 flex flex-col items-center">
          <div className="grid grid-cols-7 gap-2 max-w-2xl items-start">
            {[
              { src: '/assets/theory/pantone-ochre-7.webp', code: '19-1331', href: 'https://www.pantone.com/color-finder/19-1331-tcx' },
              { src: '/assets/theory/pantone-ochre-1.webp', code: '18-1442', href: 'https://www.pantone.com/color-finder/18-1442-tcx' },
              { src: '/assets/theory/pantone-ochre-2.webp', code: '18-1354', href: 'https://www.pantone.com/color-finder/18-1354-tcx' },
              { src: '/assets/theory/pantone-ochre-3.webp', code: '16-1346', href: 'https://www.pantone.com/color-finder/16-1346-tcx' },
              { src: '/assets/theory/pantone-ochre-4.webp', code: '16-1253', href: 'https://www.pantone.com/color-finder/16-1253-tcx' },
              { src: '/assets/theory/pantone-ochre-5.webp', code: '14-1036', href: 'https://www.pantone.com/color-finder/14-1036-tcx' },
              { src: '/assets/theory/pantone-ochre-6.webp', code: '12-0910', href: 'https://www.pantone.com/color-finder/12-0910-tcx' },
            ].map(({ src, code, href }) => (
              <figure key={code} className="flex flex-col items-center">
                <img src={src} alt={`Pantone ${code} TCX`} className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
                <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1 text-center"><Link href={href}>{code}</Link></figcaption>
              </figure>
            ))}
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Ochre shades in the Pantone system</figcaption>
        </figure>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-3 max-w-2xl">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-indigo.jpg" alt="Indigo plant in bloom" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Indigo</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-saffron.avif" alt="Saffron crocus — source of yellow pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Saffron</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-cochineal.jpg" alt="Cochineal insects — source of red dye" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Cochineal</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-murex.jpg" alt="Murex sea snail — source of Tyrian purple" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Murex</figcaption>
            </figure>
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Later pigment sources — plants (indigo, saffron) and animals (cochineal insects for red, murex snails for purple)</figcaption>
        </figure>
      </Section>

      <Section title="Prehistoric times — the first colours">
        <P>
          The oldest known human-made images are hand stencils and handprints found in caves. Among the most ancient are those in the <B>El Castillo cave</B> in Spain (~40,000 years old) and the caves of <B>Sulawesi</B> in Indonesia (~39,900 years old). These were created by blowing red ochre pigment through a hollow bone around a hand pressed against the cave wall — not, as sometimes imagined, painted in blood (blood darkens to brown quickly and does not preserve).
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-3 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/el-castillo-cave.jpg" alt="Hand stencils in the El Castillo cave, Spain — ~40,000 years old" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">El Castillo, Spain (~40,000 yrs). <Link href="https://www.nationalgeographic.com/adventure/article/120614-neanderthal-cave-paintings-spain-science-pike">NatGeo</Link></figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/sulawesi-cave-art.webp" alt="Animal painting in Sulawesi cave, Indonesia — ~44,000 years old" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Sulawesi, Indonesia (~44,000 yrs). <Link href="https://www.bbc.com/news/world-asia-50754303">BBC</Link></figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/cueva-de-las-manos.jpg" alt="Cueva de las Manos, Argentina — stenciled hand prints, 7,300 BC – 700 AD" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Cueva de las Manos, Argentina (7,300 BC). <Link href="https://en.wikipedia.org/wiki/File:SantaCruz-CuevaManos-P2210651b.jpg">Wikipedia</Link></figcaption>
            </figure>
          </div>
        </figure>
        <P>
          Prehistoric artists had a limited but powerful palette: <B>red ochre</B>, <B>yellow ochre</B>, <B>black</B> from charcoal or manganese dioxide, and <B>white</B> from chalk or kaolin clay. The famous cave paintings in <B>Lascaux</B> (France, ~17,000 years old) and <B>Altamira</B> (Spain, ~15,000 years old) used these pigments to depict animals with remarkable sophistication — shading, movement, and even a sense of three-dimensionality.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-4 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/lascaux-cave.jpg" alt="Cave paintings in Lascaux, France — ~17,000 years old" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Lascaux, France (~17,000 years). <Link href="https://www.bradshawfoundation.com/lascaux/">Bradshaw Foundation</Link></figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/altamira-bison.webp" alt="Bison painting in Altamira cave, Spain — ~15,000 years old" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Altamira, Spain (~15,000 years). <Link href="https://theessentialschoolofpainting.com/photograph-paleolithic-cave-art-altamira-bison-in-the-great-hall-of-polychromes-altamira-cave/">Photo: Rameessos</Link></figcaption>
            </figure>
          </div>
        </figure>
        <P>
          Archaeological evidence suggests that ochre — particularly red ochre — held special significance well beyond art. It was used in burials, body decoration, and possibly ritual practices as far back as 100,000 years ago. Red may be the first colour to hold symbolic meaning in human culture.
        </P>
      </Section>

      <Section title="The ancient world — purple, gold, and status">
        <P>
          In the ancient civilizations of Egypt, Mesopotamia, Greece, and Rome, colour was inseparable from power, religion, and status.
        </P>
        <P>
          The Egyptians were master pigment-makers. They invented <B>Egyptian blue</B> (calcium copper silicate) around 2200 BCE — one of the first synthetic pigments in history. They also used <B>malachite</B> (green), <B>orpiment</B> (bright yellow, highly toxic arsenic sulfide), and generous amounts of red ochre. Colour in Egyptian art was symbolic: green represented fertility and rebirth; black represented the fertile Nile soil; gold was the flesh of the gods.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-calcium-copper-silicate.jpg" alt="Calcium copper silicate — raw material for Egyptian blue" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Calcium copper silicate</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-egyptian-blue.jpg" alt="Egyptian blue pigment — one of the first synthetic pigments" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Egyptian blue</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-egyptian-faience.jpg" alt="Blue faience saucer — Egyptian blue in decorative art" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Blue faience</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-malachite.jpg" alt="Malachite mineral — source of green pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Malachite</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pantone-malachite-green.webp" alt="Pantone 16-5917 TCX — Malachite Green" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center"><Link href="https://www.pantone.com/color-finder/16-5917-tcx">Pantone 16-5917</Link></figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-orpiment.jpg" alt="Orpiment — arsenic sulfide, bright yellow pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Orpiment</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pantone-egyptian-blue.webp" alt="Pantone 18-4142 TSX — Egyptian Blue" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center"><Link href="https://www.pantone.com/color-finder/18-4142-TSX">Pantone 18-4142</Link></figcaption>
            </figure>
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Egyptian blue — the first synthetic pigment (~2200 BCE), made from calcium copper silicate</figcaption>
        </figure>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-4 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/dye-egyptian-blue.png" alt="Egyptian blue dyed fabric with pigment and faience figurine" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Egyptian blue — fabric, pigment, and faience</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/dye-tyrian-purple.png" alt="Tyrian purple dyed fabric with pigment and murex shells" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Tyrian purple — fabric, pigment, and murex shells</figcaption>
            </figure>
          </div>
        </figure>
        <P>
          In Rome, the most coveted colour was <B>Tyrian purple</B> — extracted from the mucus glands of predatory <em>Murex</em> sea snails. It took roughly 12,000 snails to produce just 1.5 grams of dye. The resulting colour was extraordinarily expensive and was reserved by law for the emperor and the highest-ranking senators. Wearing purple without authorization was literally a crime. The word "purple" itself traces back to the Latin <em>purpura</em> and the Greek <em>porphyra</em>, both referring to the murex dye.
        </P>
        <div className="my-6 flex flex-wrap justify-center gap-6">
          <figure className="flex flex-col items-center">
            <img src="/assets/theory/tyrian-purple.webp" alt="Tyrian purple dye swatch — the most expensive colour in the ancient world" className="w-full max-w-[12rem] rounded-xl border border-stone-200 dark:border-stone-700" />
            <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Tyrian purple — worth more than gold</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img src="/assets/theory/justinian-tyrian-purple.png" alt="Byzantine Emperor Justinian I clad in Tyrian purple, 6th-century mosaic at Basilica of San Vitale, Ravenna" className="w-full max-w-[12rem] rounded-xl border border-stone-200 dark:border-stone-700" />
            <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center max-w-[14rem]">Emperor Justinian I in Tyrian purple, 6th c. mosaic, Basilica of San Vitale, Ravenna</figcaption>
          </figure>
        </div>
      </Section>

      <Section title="The Middle Ages — not as grey as you think">
        <P>
          Popular culture paints the medieval period as drab and colourless — mud, grey stone, and brown wool. The reality was quite different. Medieval people loved colour and used it extensively, though access depended heavily on social class.
        </P>
        <P>
          The most common dyes were plant-based: <B>woad</B> for blue (before indigo became available from trade), <B>madder root</B> for red, <B>weld</B> (reseda) for yellow. These could be combined to create greens and oranges. Peasant clothing was typically undyed wool (natural browns and creams) or dyed with cheaper local plants, while nobility wore vivid reds, blues, and — when they could afford it — purple.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-5 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/undyed-wool.png" alt="Undyed wool — natural browns and creams" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Undyed wool</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/woad-plant.jpg" alt="Woad plant (Isatis tinctoria) — source of blue dye" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Woad plant</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/dye-woad.png" alt="Woad-dyed fabric with pigment powder" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Woad — blue dye</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/dye-madder-root.webp" alt="Madder root — source of red dye" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Madder root</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/dye-madder.png" alt="Madder root dyed fabric with pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Madder — red dye</figcaption>
            </figure>
          </div>
        </figure>
        <P>
          <B>Ultramarine</B> — made by grinding lapis lazuli stone imported from mines in present-day Afghanistan — was the most expensive pigment in medieval Europe. It was more valuable than gold by weight and was reserved for the most sacred subjects in paintings. The Virgin Mary's robe was traditionally painted in ultramarine blue, a choice that was as much an economic statement as an artistic one — patrons literally paid extra for the privilege of having this pigment used.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-3 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/lapis-lazuli.avif" alt="Raw lapis lazuli stones — source of ultramarine pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Lapis lazuli</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/virgin-mary-ultramarine.jpg" alt="The Virgin Mary's robe painted in ultramarine blue by Giovanni Battista Salvi da Sassoferrato" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Virgin Mary in ultramarine. Sassoferrato, public domain</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pantone-ultramarine.webp" alt="Pantone 17-4037 TCX — Ultramarine" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center"><Link href="https://www.pantone.com/color-finder/17-4037-tcx">Pantone 17-4037 TCX</Link></figcaption>
            </figure>
          </div>
        </figure>
        <P>
          Gothic cathedrals, illuminated manuscripts, and heraldic coats of arms show that the medieval world was, in its own way, vibrantly colourful — just unevenly distributed.
        </P>
      </Section>

      <Section title="The Renaissance and the age of new pigments">
        <P>
          The Renaissance brought an explosion of new pigments and a transformation in how painters used colour. Oil painting (popularized by Flemish and Italian masters in the 15th century) allowed for more subtle blending and richer tones than the tempera and fresco techniques that preceded it.
        </P>
        <P>
          Early Renaissance painters worked with the traditional palette: earth tones (ochres, siennas, umbers), <B>lead white</B>, <B>vermillion</B> (mercury sulfide — a vivid red), <B>azurite</B> (a cheaper blue than ultramarine), and <B>verdigris</B> (copper-based green, unstable and prone to darkening).
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-lead-white.jpg" alt="Hydrocerussite — natural mineral form of lead white" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Lead white</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-ochre-shades.jpg" alt="Three shades of ochre pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Ochre shades</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-burnt-sienna.jpg" alt="Burnt sienna pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Burnt sienna</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-umber.jpg" alt="Raw umber pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Raw umber</figcaption>
            </figure>
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">The Renaissance earth tone palette — ochres, siennas, and umbers</figcaption>
        </figure>
        <figure className="my-4 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-2 max-w-[12rem] items-start">
            {[
              { src: '/assets/theory/pantone-sienna-1.webp', code: '17-1436', href: 'https://www.pantone.com/color-finder/17-1436-tcx' },
              { src: '/assets/theory/pantone-sienna-2.webp', code: '17-1544', href: 'https://www.pantone.com/color-finder/17-1544-tcx' },
            ].map(({ src, code, href }) => (
              <figure key={code} className="flex flex-col items-center">
                <img src={src} alt={`Pantone ${code} TCX`} className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
                <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1 text-center"><Link href={href}>{code}</Link></figcaption>
              </figure>
            ))}
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Sienna shades in the Pantone system</figcaption>
        </figure>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-cinnabar.jpg" alt="Cinnabar crystals — mercury sulfide mineral" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Cinnabar crystals</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-vermilion.jpg" alt="Vermilion pigment derived from cinnabar" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Vermilion pigment</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pantone-cinnabar.webp" alt="Pantone 18-1540 TCX — Cinnabar" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center"><Link href="https://www.pantone.com/color-finder/18-1540-tcx">Pantone 18-1540</Link></figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/cinnabar-lacquer-box.jpg" alt="Chinese cinnabar red carved lacquer box from the Qing dynasty (1736–1795)" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Cinnabar lacquer box, Qing dynasty. National Museum of China</figcaption>
            </figure>
          </div>
        </figure>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-azurite-mineral.jpg" alt="Azurite mineral from Burra Mine, South Australia" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Azurite mineral</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-azurite.jpg" alt="Azurite pigment powder" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Azurite pigment</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pantone-azure-blue.webp" alt="Pantone 17-4139 TCX — Azure Blue" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center"><Link href="https://www.pantone.com/eu/en/color-finder/17-4139-TCX">Pantone 17-4139</Link></figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-verdigris.jpg" alt="Verdigris — copper-based green pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700 aspect-square object-cover" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Verdigris</figcaption>
            </figure>
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Azurite and verdigris — affordable alternatives to ultramarine and malachite</figcaption>
        </figure>
        <P>
          As trade expanded and chemistry advanced, new pigments became available. <B>Prussian blue</B>, discovered accidentally in Berlin around 1706, was the first modern synthetic pigment — affordable and intense, it revolutionized painting and became one of the most widely used blues in history. <B>Chrome yellow</B> (lead chromate, early 1800s) gave painters a brilliant, opaque yellow — it is the yellow of Van Gogh's sunflowers. <B>Cadmium red and yellow</B> (mid-1800s) offered unprecedented vibrancy and permanence.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-5 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-prussian-blue.jpg" alt="Prussian blue pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Prussian blue</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-chrome-yellow.jpg" alt="Chrome yellow pigment — lead chromate" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Chrome yellow</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-cadmium-red.jpg" alt="Cadmium red pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Cadmium red</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-cadmium-yellow.jpg" alt="Cadmium yellow pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Cadmium yellow</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/van-gogh-sunflowers.jpg" alt="Van Gogh's Sunflowers — painted with chrome yellow pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Van Gogh's Sunflowers</figcaption>
            </figure>
          </div>
        </figure>
        <P>
          The Impressionists, in the late 1800s, were among the first to benefit from a new generation of synthetic pigments available in portable tubes — <B>cobalt blue</B>, <B>viridian green</B>, <B>zinc white</B>. These tube paints freed artists from the studio, enabling them to paint outdoors (en plein air) and capture the fleeting effects of light and colour in nature.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-3 gap-3 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-cobalt-blue.jpg" alt="Cobalt blue pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Cobalt blue</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-viridian-green.jpg" alt="Viridian green pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Viridian green</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/pigment-zinc-white.jpg" alt="Zinc white pigment" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Zinc white</figcaption>
            </figure>
          </div>
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Key pigments of the Impressionist palette — available in portable tubes</figcaption>
        </figure>
      </Section>

      <Section title="The Great Male Renunciation">
        <P>
          For centuries, elite men dressed as colourfully as women. Henry VIII wore gold, crimson, and jewels; Louis XIV was famous for his red-heeled shoes and lavish silks. Male fashion was a display of wealth, status, and power — the more vivid the colours, the higher the rank.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-4 max-w-2xl items-start">
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/henry-viii.jpg" alt="Portrait of Henry VIII in gold, crimson, and jewels" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Henry VIII. After Hans Holbein the Younger</figcaption>
            </figure>
            <figure className="flex flex-col items-center">
              <img src="/assets/theory/louis-xiv.jpg" alt="Louis XIV of France in elaborate colourful dress with red-heeled shoes" className="w-full rounded-xl border border-stone-200 dark:border-stone-700" />
              <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-1.5 text-center">Louis XIV of France</figcaption>
            </figure>
          </div>
        </figure>
        <P>
          Then, in the late 18th century, everything changed. The French Revolution and the rise of Enlightenment ideals redefined what a respectable man should look like. Ornament, colour, and display became associated with aristocratic decadence. The new bourgeois man signalled seriousness, rationality, and democratic equality through his clothing — by renouncing all of it. The psychologist J.C. Flügel later coined the term <B>"The Great Male Renunciation"</B> to describe this shift.
        </P>
        <P>
          The embodiment of the new ideal was <B>Beau Brummell</B> — the man who replaced aristocratic flamboyance with immaculate simplicity. Clean lines, perfect fit, no ornament. His palette: white, black, navy blue, and buff. A man's worth now lay in his mind, not his appearance.
        </P>
        <figure className="my-6 flex flex-col items-center">
          <img src="/assets/theory/beau-brummell.jpg" alt="Beau Brummell in subdued white, black, navy blue, and buff" className="w-full max-w-[14rem] rounded-xl border border-stone-200 dark:border-stone-700" />
          <figcaption className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">Beau Brummell. Watercolour by Richard Dighton, 1805</figcaption>
        </figure>
        <P>
          The entire masculine palette collapsed into a narrow band of desaturated, dark tones — each with its own origin story:
        </P>
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-5 mb-4">
          <div className="space-y-3">
            {[
              { name: 'Black', steps: ['#000000', '#0D0D0D', '#1A1A1A'], desc: 'Clergy, mourning, the legal profession. The most "serious" colour since the Reformation — dyed with iron gall and tannins.' },
              { name: 'Charcoal', steps: ['#2B2B2B', '#3B3B3B', '#4A4A4A'], desc: 'Wool naturally produced dark grey without expensive dyeing — the default of the rising middle class.' },
              { name: 'Mid Grey', steps: ['#6B6B6B', '#7B7B7B', '#8A8A8A'], desc: 'Undyed wool. Modesty made visible — the opposite of aristocratic display.' },
              { name: 'Taupe', steps: ['#635B52', '#7D756C', '#96908A'], desc: 'French for "mole." A grey-brown bridge between the grey and brown families — overcoats, waistcoats, trousers. Neutral enough to be invisible.' },
              { name: 'Dark Brown', steps: ['#3B2A1A', '#4B3423', '#5A3E2B'], desc: 'Leather, walnut dye, undyed wool. The colour of rural gentry and country life.' },
              { name: 'Khaki', steps: ['#8B7D5A', '#9F916D', '#B3A580'], desc: 'Hindi for "dust-coloured." Adopted by the British Indian Army in the 1840s, then absorbed into civilian wear. Note: in French, kaki typically refers to olive-green shades rather than sandy-beige — a linguistic colour shift similar to the Russian blue distinction.' },
              { name: 'White / Off-white', steps: ['#E8E6D9', '#F5F5F0', '#FFFFFF'], desc: 'Not a dominant colour but an essential supporting element — shirts, collars, cuffs. Provided contrast against the dark palette. Ranged from pure white to muted ivory.' },
              { name: 'Navy Blue', steps: ['#0B1F3A', '#152D4D', '#1F3A5F'], desc: 'Named after the Royal Navy (1748). Indigo was cheap and colourfast. Spread to police, business, schools — the colour of institutional authority.' },
              { name: 'Olive', steps: ['#4B5320', '#5B612D', '#6B6F3A'], desc: 'Military and hunting origins. Acceptable because it read as functional, not decorative.' },
            ].map(({ name, steps, desc }) => (
              <div key={name} className="flex gap-3 items-start">
                <div className="shrink-0 flex rounded-lg overflow-hidden border border-stone-200 dark:border-stone-600 mt-0.5" style={{ width: 72, height: 28 }}>
                  {steps.map((color, i) => (
                    <span key={i} style={{ backgroundColor: color, flex: 1, height: '100%' }} />
                  ))}
                </div>
                <div>
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{name}</span>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <P>
          This convention persists to this day. Though it has loosened in recent decades, the Renunciation palette is essentially the <B>core colour palette of modern smart casual and business dress</B> — for both men and women. Black, charcoal, navy, white, taupe, and brown remain the "safe" foundation that every wardrobe guide recommends as essentials. Accent colours are added on top, but the base layer of any professional wardrobe is still, two centuries later, drawn from this same narrow slice of colour space. The Great Male Renunciation didn't just change men's fashion — it defined the default palette of modern clothing.
        </P>
      </Section>

      <Section title="Trademarked and iconic colours">
        <P>
          In the modern era, colour has become intellectual property. Brands create, trademark, and fiercely protect specific shades as part of their identity:
        </P>
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-5 mb-4">
          <div className="space-y-3">
            {[
              { name: 'Tiffany Blue', hex: '#0abab5', desc: 'Pantone 1837 (named after the year the company was founded). Trademarked since 1998. The robin-egg blue of the iconic Tiffany box.' },
              { name: 'International Klein Blue (IKB)', hex: '#002fa7', desc: 'Developed and registered by French artist Yves Klein in 1960. A unique formula of pure ultramarine pigment suspended in synthetic resin, achieving an intensity of blue that seems to vibrate.' },
              { name: 'Louboutin Red', hex: '#e40028', desc: 'The red lacquered sole of Christian Louboutin shoes. Trademarked specifically for footwear soles, upheld by courts worldwide.' },
              { name: 'Cadbury Purple', hex: '#4b0082', desc: 'Pantone 2685C. In use since 1914 on chocolate packaging. Cadbury fought extended legal battles over trademark protection.' },
              { name: 'Valentino Pink PP', hex: '#e45c9c', desc: 'Created with Pantone for the Valentino Fall 2022 "Pink PP" collection. A vivid, saturated fuchsia-pink that dominated the runway and pop culture.' },
              { name: 'Hermès Orange', hex: '#f37021', desc: 'Born of necessity during WWII when a cardboard shortage left orange as the only available box colour. It became the brand\'s signature by happy accident.' },
            ].map(({ name, hex, desc }) => (
              <div key={name} className="flex gap-3">
                <span className="w-6 h-6 rounded shrink-0 border border-stone-200 dark:border-stone-600 mt-0.5" style={{ backgroundColor: hex }} />
                <div>
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{name}</span>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <P>
          Colour trademarks only hold when tightly bound to a specific product category. You cannot own "blue" — but you can own a particular blue <em>for jewellery boxes</em>. More examples from across industries show the same pattern:
        </P>
        <div className="bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 p-5 mb-4">
          <div className="space-y-3">
            {[
              { name: 'UPS Brown', hex: '#644117', desc: 'Known as "Pullman Brown." Registered for logistics and delivery services. One of the most recognised single-colour brand identities in the world.' },
              { name: '3M Canary Yellow', hex: '#ffef00', desc: 'Protected specifically for self-adhesive notes (Post-it). The same yellow on a different product would not be covered.' },
              { name: 'T-Mobile Magenta', hex: '#e20074', desc: 'RAL 4010 / Pantone Rhodamine Red U. Aggressively defended in telecommunications — T-Mobile has sued companies in unrelated industries for using similar magenta.' },
              { name: 'John Deere Green & Yellow', hex: '#367c2b', desc: 'A two-colour combination registered for agricultural machinery. Neither green nor yellow alone is protected — only the pairing.' },
              { name: 'Barbie Pink', hex: '#e0218a', desc: 'Pantone 219C. Used by Mattel as a core brand element with partial trademark protection in toys and entertainment.' },
              { name: 'Milka Purple', hex: '#7B1FA2', desc: 'Pantone 2685C. Recognised as distinctive for chocolate in the EU — a stronger legal position than Cadbury achieved for the same shade in the UK.' },
            ].map(({ name, hex, desc }) => (
              <div key={name} className="flex gap-3">
                <span className="w-6 h-6 rounded shrink-0 border border-stone-200 dark:border-stone-600 mt-0.5" style={{ backgroundColor: hex }} />
                <div>
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{name}</span>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <P>
          The underlying legal principle: a colour cannot be monopolised as an abstract entity, but it can be protected within a narrowly defined product category — provided the brand can demonstrate that consumers associate that specific shade with that specific source. Colour ownership is never absolute; it is always contextual.
        </P>
      </Section>
    </article>
  )
}

// ─── Tab: Color Systems ───────────────────────────────────────────────────────

function SystemsTab() {
  return (
    <article className="max-w-3xl">
      <Section title="Why do we need colour systems at all?">
        <P>
          If I say "dark blue," you might picture navy, cobalt, midnight, or royal blue. The problem is as old as commerce itself: colour names are subjective, culturally variable, and hopelessly imprecise. When you are dyeing 10,000 meters of fabric, matching paint to a corporate logo, or ensuring a car's bumper matches its body panels across different manufacturing plants, "dark blue" is not good enough. You need an <B>unambiguous, reproducible specification</B>.
        </P>
        <P>
          Over the past century and a half, different industries have developed their own systems to solve this problem. Each system is optimised for a specific medium — because colour on a screen, colour in ink, colour in fabric dye, and colour in architectural paint all behave differently. There is no single universal system, because the physics of colour reproduction is fundamentally different across media.
        </P>
      </Section>

      <Section title="Munsell — colour for the human eye">
        <P>
          Developed by artist and educator <B>Albert Munsell</B> in 1905, the Munsell system was one of the first attempts to organize colour scientifically based on human perception. It describes any colour using three independent dimensions: <B>Hue</B> (the colour family — red, yellow, green, blue, purple), <B>Value</B> (lightness, from black to white), and <B>Chroma</B> (saturation or intensity).
        </P>
        <P>
          What makes Munsell special is that it is <B>perceptually uniform</B> — equal steps in the system correspond to equal perceived differences in colour. It is still used today in soil science (the USDA classifies soil colour with Munsell charts), fine art, and any field where human visual perception is the standard.
        </P>
      </Section>

      <Section title="ISCC–NBS — a universal colour vocabulary">
        <P>
          In the 1930s, the <B>Inter-Society Color Council</B> and the U.S. <B>National Bureau of Standards</B> set out to solve a deceptively simple problem: how do you name colours in a way that is precise enough for scientists yet plain enough for everyone else? The result was the <Link href="https://en.wikipedia.org/wiki/ISCC%E2%80%93NBS_system">ISCC–NBS system</Link> — 267 named colour categories built on top of Munsell colour space.
        </P>
        <P>
          The system works by combining 13 basic colour terms (red, orange, yellow, green, blue, violet, purple, pink, brown, olive, plus white, grey, and black) with intuitive modifiers like "vivid," "pale," "dark," "light," and "deep." Every possible colour maps to exactly one category with no overlaps. The beauty of the system is its readability — a designation like "dark yellowish brown" or "vivid purplish blue" immediately communicates the colour to anyone, without special training or reference charts. It remains widely used in botany, geology, archaeology, and forensic science.
        </P>
      </Section>

      <Section title="CIE — the international standard">
        <P>
          In 1931, the <B>Commission Internationale de l'Éclairage</B> (CIE) developed the first mathematically defined colour space based on human colour perception experiments. The CIE system does not rely on physical samples — it defines colour as a set of coordinates in a mathematical space. The CIE XYZ colour space encompasses all colours visible to the average human eye.
        </P>
        <P>
          Later refinements include <B>CIELAB</B> (L*a*b*), designed to be perceptually uniform and widely used in quality control, and <B>CIE Delta E</B>, a formula that quantifies the perceived difference between two colours. When a paint manufacturer says two batches are "within tolerance," they mean the Delta E between them is below a threshold. CIE is the foundation on which most modern colour management is built.
        </P>
      </Section>

      <Section title="Pantone — the lingua franca of design">
        <P>
          <B>Pantone Matching System (PMS)</B>, introduced in 1963, solved a very practical problem: how can a designer in New York specify a colour and know that a printer in Tokyo will reproduce it exactly? Pantone assigns each colour a unique numeric code (e.g., Pantone 186 C for Coca-Cola red) and provides physical swatch books printed with calibrated inks.
        </P>
        <P>
          Pantone is used across graphic design, fashion (with separate textile swatch books — TPX and TCX series), product design, and branding. It is proprietary — you buy the swatch books, and the colour definitions are copyrighted. The annual <B>Pantone Colour of the Year</B> announcement has become a cultural event that influences fashion, interior design, and consumer products globally.
        </P>
      </Section>

      <Section title="RAL — European industrial standard">
        <P>
          The <B>RAL colour system</B> (from the German <em>Reichs-Ausschuß für Lieferbedingungen</em>, roughly "National Committee for Delivery Terms") was created in Germany in 1927 to standardise colours for industrial use. Its original collection of 40 colours has grown to over 2,500 in the RAL Design system.
        </P>
        <P>
          RAL is the dominant colour standard in architecture, construction, industrial coating, and powder coating across Europe. When you order a metal railing, facade panel, or industrial machine, colours are specified in RAL numbers. RAL 9010 (Pure White) and RAL 7016 (Anthracite Grey) are among the most commonly used colours in European architecture.
        </P>
      </Section>

      <Section title="NCS — natural colour system">
        <P>
          The <B>Natural Colour System (NCS)</B>, developed in Sweden and based on the opponent-colour theory of Ewald Hering, describes colour the way humans naturally perceive it. Every colour is defined by its visual resemblance to six elementary colours: white, black, yellow, red, blue, and green.
        </P>
        <P>
          NCS is particularly popular in Scandinavian countries and is widely used in interior design, architecture, and urban planning. Its strength is intuitiveness — a designer can read an NCS code and immediately understand what the colour looks like without needing a physical swatch.
        </P>
      </Section>

      <Section title="RGB and HEX — colour for screens">
        <P>
          Screens produce colour by mixing light from <B>red, green, and blue</B> subpixels — the <B>RGB</B> model. Each channel can range from 0 to 255, giving roughly 16.7 million possible colours. <B>HEX</B> codes (like #FF5733) are simply a compact way of writing RGB values in hexadecimal notation.
        </P>
        <P>
          RGB is <B>additive</B> — mixing all three at full intensity produces white. This is the opposite of how paint works. Related systems include <B>HSL</B> (hue, saturation, lightness) and <B>HSB/HSV</B> (hue, saturation, brightness), which describe the same colours but in a way that is more intuitive for designers — it is easier to think "make this 10% lighter" in HSL than to figure out which RGB values to change.
        </P>
      </Section>

      <Section title="CMYK — colour for print">
        <P>
          Printing uses <B>CMYK</B> — cyan, magenta, yellow, and key (black). Unlike screens, printed colour is <B>subtractive</B>: each ink absorbs certain wavelengths, and what is reflected back is what you see. In theory, mixing cyan, magenta, and yellow should produce black, but in practice the result is a muddy brown — hence the addition of a separate black ink (K).
        </P>
        <P>
          This is why a colour that looks vibrant on your monitor can appear dull when printed. The <B>colour gamut</B> (range of reproducible colours) of CMYK is significantly smaller than RGB. Professional designers routinely work in both spaces and use colour profiles (ICC profiles) to manage the translation between them.
        </P>
      </Section>

      <Section title="The big picture">
        <P>
          No single system can do everything. <B>Munsell</B> and <B>NCS</B> describe how we see colour. <B>CIE</B> provides the mathematical foundation. <B>Pantone</B> and <B>RAL</B> enable precise communication across supply chains. <B>RGB</B> and <B>CMYK</B> are the practical systems for screens and print. They coexist because colour itself is not one thing — it is physics, perception, technology, and convention, all tangled together. Understanding which system to use and when is part of the craft of working with colour professionally.
        </P>
      </Section>
    </article>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ColorTheoryPage() {
  const [tab, setTab] = useState<Tab>('physics')

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950">
      <div className="px-8 py-10 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-2">The Science of Colour</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">From photons to perception — what colour really is and why it matters</p>
        <Tabs active={tab} onChange={setTab} />
        {tab === 'physics'    && <PhysicsTab />}
        {tab === 'biology'    && <BiologyTab />}
        {tab === 'psychology' && <PsychologyTab />}
        {tab === 'history'    && <HistoryTab />}
        {tab === 'systems'    && <SystemsTab />}
      </div>
    </div>
  )
}

import { useState, useEffect, useCallback } from 'react'
import { isLightColor } from './ColorPalettes'

const CANVAS_W = 720
const CANVAS_H = 400
const CLOSE_RADIUS = 12

interface Point { x: number; y: number }
interface Region { name: string; points: Point[]; visible: boolean }

const STORAGE_KEY = 'color-gradient-regions'

function loadRegions(): Region[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveRegions(regions: Region[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(regions))
}

function strokeForPoint(_x: number, y: number): string {
  const lightness = 100 - (y / CANVAS_H) * 100
  return lightness > 60 ? 'rgba(0,0,0,0.6)' : 'white'
}

export default function ColorGradientPage() {
  const [selectedColor, setSelectedColor] = useState<{ hex: string; name: string } | null>(null)
  const [regions, setRegions] = useState<Region[]>(loadRegions)
  const [drawing, setDrawing] = useState<{ name: string; points: Point[] } | null>(null)
  const [newName, setNewName] = useState('')
  const [mousePos, setMousePos] = useState<Point | null>(null)

  useEffect(() => { saveRegions(regions) }, [regions])

  function canvasCoords(e: React.MouseEvent<HTMLCanvasElement | SVGSVGElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (CANVAS_W / rect.width)
    const y = (e.clientY - rect.top) * (CANVAS_H / rect.height)
    return { x, y }
  }

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = canvasCoords(e)

    if (drawing) {
      // Check if clicking near first point to close
      if (drawing.points.length >= 3) {
        const first = drawing.points[0]
        const dx = x - first.x, dy = y - first.y
        if (Math.sqrt(dx * dx + dy * dy) < CLOSE_RADIUS) {
          setRegions(prev => [...prev, { name: drawing.name, points: drawing.points, visible: true }])
          setDrawing(null)
          return
        }
      }
      setDrawing({ ...drawing, points: [...drawing.points, { x: Math.round(x), y: Math.round(y) }] })
      return
    }

    // Normal inspect mode
    const canvas = e.currentTarget
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const px = Math.round(x), py = Math.round(y)
    const pixel = ctx.getImageData(px, py, 1, 1).data
    const hex = `#${pixel[0].toString(16).padStart(2,'0')}${pixel[1].toString(16).padStart(2,'0')}${pixel[2].toString(16).padStart(2,'0')}`
    const hue = Math.round((px / CANVAS_W) * 360)
    const lightness = Math.round(100 - (py / CANVAS_H) * 100)
    setSelectedColor({ hex, name: `HSL(${hue}°, 100%, ${lightness}%)` })
  }, [drawing])

  function startDrawing() {
    const name = newName.trim()
    if (!name) return
    setDrawing({ name, points: [] })
    setNewName('')
    setSelectedColor(null)
  }

  function cancelDrawing() {
    setDrawing(null)
  }

  function undoLastPoint() {
    if (!drawing || drawing.points.length === 0) return
    setDrawing({ ...drawing, points: drawing.points.slice(0, -1) })
  }

  function deleteRegion(index: number) {
    setRegions(prev => prev.filter((_, i) => i !== index))
  }

  function toggleRegion(index: number) {
    setRegions(prev => prev.map((r, i) => i === index ? { ...r, visible: !r.visible } : r))
  }

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950">
      <div className="px-8 py-10 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-2">Color Gradient</h2>
        <p className="text-stone-400 dark:text-stone-500 text-sm mb-6">HSL color space — full hue spectrum with lightness from white to black. Click anywhere to inspect, or draw regions to map perceived color boundaries.</p>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4">
          {!drawing ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && startDrawing()}
                placeholder="Region name (e.g. Blue)"
                className="px-3 py-1.5 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 w-48"
              />
              <button
                onClick={startDrawing}
                disabled={!newName.trim()}
                className="px-3 py-1.5 text-sm rounded-lg bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                New Region
              </button>
            </>
          ) : (
            <>
              <span className="text-sm text-stone-600 dark:text-stone-300">
                Drawing: <strong>{drawing.name}</strong> ({drawing.points.length} points)
              </span>
              <button
                onClick={undoLastPoint}
                disabled={drawing.points.length === 0}
                className="px-3 py-1.5 text-sm rounded-lg border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-40"
              >
                Undo
              </button>
              <button
                onClick={() => {
                  if (drawing.points.length >= 3) {
                    setRegions(prev => [...prev, { name: drawing.name, points: drawing.points, visible: true }])
                  }
                  setDrawing(null)
                }}
                disabled={drawing.points.length < 3}
                className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Close Region
              </button>
              <button
                onClick={cancelDrawing}
                className="px-3 py-1.5 text-sm rounded-lg border border-stone-300 dark:border-stone-600 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Gradient canvas */}
        <div className="relative">
          <canvas
            ref={(canvas) => {
              if (!canvas || canvas.dataset.drawn) return
              canvas.dataset.drawn = '1'
              const ctx = canvas.getContext('2d')
              if (!ctx) return
              const w = canvas.width, h = canvas.height
              for (let x = 0; x < w; x++) {
                const hue = (x / w) * 360
                for (let y = 0; y < h; y++) {
                  const lightness = 100 - (y / h) * 100
                  ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`
                  ctx.fillRect(x, y, 1, 1)
                }
              }
            }}
            width={CANVAS_W}
            height={CANVAS_H}
            className={`w-full rounded-lg border border-stone-200 dark:border-stone-700 ${drawing ? 'cursor-crosshair' : 'cursor-default'}`}
            style={{ imageRendering: 'pixelated' }}
            onMouseMove={(e) => {
              if (drawing) {
                const { x, y } = canvasCoords(e)
                setMousePos({ x, y })
              }
            }}
            onMouseLeave={() => setMousePos(null)}
            onClick={handleCanvasClick}
          />
          {/* SVG overlay for regions and drawing */}
          <svg
            viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* Saved regions */}
            {regions.map((region, ri) => region.visible && (
              <g key={ri}>
                <polygon
                  points={region.points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="white"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  opacity={0.7}
                />
                {region.points.map((pt, pi) => (
                  <circle
                    key={pi}
                    cx={pt.x}
                    cy={pt.y}
                    r={3}
                    fill="none"
                    stroke={strokeForPoint(pt.x, pt.y)}
                    strokeWidth={1}
                  />
                ))}
                {/* Label at centroid */}
                {(() => {
                  const cx = region.points.reduce((s, p) => s + p.x, 0) / region.points.length
                  const cy = region.points.reduce((s, p) => s + p.y, 0) / region.points.length
                  const lightness = 100 - (cy / CANVAS_H) * 100
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={lightness > 60 ? 'rgba(0,0,0,0.6)' : 'white'}
                      fontSize={14}
                      fontWeight="600"
                      opacity={0.8}
                    >
                      {region.name}
                    </text>
                  )
                })()}
              </g>
            ))}
            {/* Current drawing */}
            {drawing && drawing.points.length > 0 && (
              <g>
                {/* Lines between placed points */}
                <polyline
                  points={drawing.points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="white"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  opacity={0.8}
                  strokeDasharray="6 3"
                />
                {/* Preview line to mouse */}
                {mousePos && (
                  <line
                    x1={drawing.points[drawing.points.length - 1].x}
                    y1={drawing.points[drawing.points.length - 1].y}
                    x2={mousePos.x}
                    y2={mousePos.y}
                    stroke="white"
                    strokeWidth={1}
                    opacity={0.4}
                    strokeDasharray="4 4"
                  />
                )}
                {/* Close preview line */}
                {mousePos && drawing.points.length >= 3 && (() => {
                  const first = drawing.points[0]
                  const dx = mousePos.x - first.x, dy = mousePos.y - first.y
                  const near = Math.sqrt(dx * dx + dy * dy) < CLOSE_RADIUS
                  if (near) {
                    return (
                      <line
                        x1={drawing.points[drawing.points.length - 1].x}
                        y1={drawing.points[drawing.points.length - 1].y}
                        x2={first.x}
                        y2={first.y}
                        stroke="white"
                        strokeWidth={1.5}
                        opacity={0.6}
                      />
                    )
                  }
                  return null
                })()}
                {/* Point markers */}
                {drawing.points.map((pt, pi) => {
                  const isFirst = pi === 0 && drawing.points.length >= 3
                  const nearFirst = isFirst && mousePos && Math.sqrt((mousePos.x - pt.x) ** 2 + (mousePos.y - pt.y) ** 2) < CLOSE_RADIUS
                  return (
                    <circle
                      key={pi}
                      cx={pt.x}
                      cy={pt.y}
                      r={nearFirst ? 6 : 4}
                      fill={nearFirst ? 'rgba(255,255,255,0.3)' : 'none'}
                      stroke={strokeForPoint(pt.x, pt.y)}
                      strokeWidth={nearFirst ? 2 : 1}
                    />
                  )
                })}
              </g>
            )}
          </svg>
        </div>
        <div className="flex justify-between px-1 mt-1">
          <span className="text-[9px] text-stone-400 dark:text-stone-500">0°</span>
          <span className="text-[9px] text-stone-400 dark:text-stone-500">60°</span>
          <span className="text-[9px] text-stone-400 dark:text-stone-500">120°</span>
          <span className="text-[9px] text-stone-400 dark:text-stone-500">180°</span>
          <span className="text-[9px] text-stone-400 dark:text-stone-500">240°</span>
          <span className="text-[9px] text-stone-400 dark:text-stone-500">300°</span>
          <span className="text-[9px] text-stone-400 dark:text-stone-500">360°</span>
        </div>

        {/* Regions list */}
        {regions.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">Regions</p>
            <div className="space-y-1">
              {regions.map((region, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => toggleRegion(i)}
                    className={`w-4 h-4 rounded border ${region.visible ? 'bg-stone-800 dark:bg-stone-100 border-stone-800 dark:border-stone-100' : 'border-stone-300 dark:border-stone-600'} transition-colors`}
                  >
                    {region.visible && <svg viewBox="0 0 16 16" className="w-full h-full text-white dark:text-stone-900"><path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>}
                  </button>
                  <span className="text-stone-700 dark:text-stone-300">{region.name}</span>
                  <span className="text-[10px] text-stone-400 dark:text-stone-500">{region.points.length} pts</span>
                  <button
                    onClick={() => deleteRegion(i)}
                    className="ml-auto text-stone-400 hover:text-red-500 transition-colors text-xs"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating color detail panel */}
      {selectedColor && !drawing && (
        <div className="fixed top-20 right-6 w-64 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl p-4 z-50">
          <button
            onClick={() => setSelectedColor(null)}
            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 flex items-center justify-center text-xs"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-14 h-14 rounded-full shrink-0"
              style={{
                backgroundColor: selectedColor.hex,
                boxShadow: isLightColor(selectedColor.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.12)' : undefined,
              }}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-stone-800 dark:text-stone-100 leading-tight">{selectedColor.name}</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-mono">{selectedColor.hex.toUpperCase()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

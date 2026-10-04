import { createRoot } from 'react-dom/client'
import type { ComponentType } from 'react'
import './learn.css'
import ColorTheoryPage from './ColorTheoryPage'
import ColorsPage from './ColorsPage'
import ColorPalettes from './ColorPalettes'
import ColorGradientPage from './ColorGradientPage'
import Scratchpad from './Scratchpad'

const APPS: Record<string, ComponentType> = {
  ColorTheoryPage,
  ColorsPage,
  ColorPalettes,
  ColorGradientPage,
  Scratchpad,
}

document.querySelectorAll<HTMLElement>('[data-app]').forEach(el => {
  const App = APPS[el.dataset.app ?? '']
  if (App) createRoot(el).render(<App />)
})

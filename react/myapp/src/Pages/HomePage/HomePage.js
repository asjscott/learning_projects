import React, { useState } from 'react'
import { Trail } from './Trail'

export default function HomePage() {
  const [open, set] = useState(true)
  return (
    <div className="flex h-full items-center justify-center" onClick={() => set(state => !state)}>
      <Trail open={open}>
        <span>My</span>
        <span>React</span>
        <span>Projects</span>
        <span>Click Me!</span>
      </Trail>
    </div>
  )
}
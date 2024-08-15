import React from 'react'
import { useTrail, a } from '@react-spring/web'

export const Trail = ({ open, children }) => {
    const items = React.Children.toArray(children)
    const classes = "relative w-full h-20 leading-10 text-black text-left text-6xl font-bold "
                    + "tracking-tighter overflow-hidden will-change-transform"
    const trail = useTrail(items.length, {
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: open ? 1 : 0,
      x: open ? 0 : 20,
      height: open ? 110 : 0,
      from: { opacity: 0, x: 20, height: 0 },
    })
    return (
      <div>
        {trail.map(({ height, ...style }, index) => (
          <a.div key={index} className={classes} style={style}>
            <a.div className="pr-1 overflow-hidden" style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    )
  }
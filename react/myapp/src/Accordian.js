import React, { useState } from 'react'

const Accordian = ({id, title, content}) => {

    const [isActive, setActive] = useState(false)

    return (
        <section className='accordian-card py-2' id={id}>
            <div className="header flex justify-between w-full" onClick={() => setActive(!isActive)}>
                <span>{title}</span>
                <span>{isActive ? "-" : "+"}</span>
            </div>

            <div className={`grid overflow-hidden transition-all duration-1000 text-slate-600 text-sm transform ${
          isActive
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}>
                <div className="card-info overflow-hidden transform">{content}</div>
            </div>
        </section>
    )
}

export default Accordian
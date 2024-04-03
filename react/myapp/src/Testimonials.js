import React, { useState } from 'react'

const Testimonials = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const testimonials = [
        {
            quote: "The best product ever!",
            author: "John Smith",
        },
        {
            quote: "I love this!!!",
            author: "Super Mario",
        },
        {
            quote: "Couldn't live without it!",
            author: "Paddy Mac",
        }
    ]



  return (
    <>
    <div className='h-screen flex flex-wrap justify-center content-center bg-emerald-200'>
        <div className='grid grid-cols-1 grid-rows-9 relative card w-1/3 h-1/3 border-2 border-solid border-emerald-600 rounded-xl shadow-xl shadow-slate-600 border-box p-3'>
            <div className='flex flex-nowrap row-span-7 overflow-scroll w-full'>
                {testimonials.map((t) => {
                    return <div className='flex flex-wrap flex-none w-full transition ease-out duration-1000' style={{transform:`translateX(-${currentIndex * 100}%)`}}><div className='quote flex flex-wrap row-span-5 justify-center content-center text-4xl font-special_elite text-center w-full'>{t.quote}</div><div className='author flex flex-wrap grow row-span-2 justify-center content-center'>- <em>{t.author}</em></div></div>
                })}
            </div>
            <testimonials className="nav row-span-2 self-end w-full flex justify-between box-border">
            <button onClick={() => setCurrentIndex((currentIndex === 0 ? (testimonials.length -1) : currentIndex -1 ))} className='absolute flex top-0 bottom-0 m-auto h-16 bg-white w-8 text-5xl p-0 opacity-50 hover:opacity-100 transition duration-100 left-0 pl-1 rounded-r-full'>&#8249;</button>
            <button onClick={() => setCurrentIndex((currentIndex + 1)%testimonials.length)} className='absolute flex top-0 bottom-0 m-auto h-16 bg-white w-8 text-5xl p-0 opacity-50 hover:opacity-100 transition duration-100 right-0 pl-3 rounded-l-full'>&#8250;</button>
            </testimonials>

        </div>
    </div>
    </>
  )
}

export default Testimonials
import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import './index.css'

function Add() {

    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    function reset() {
        setCount(0);
    }

  return (
    <>
    <div className="container">
        <h3 className="number">{count}</h3>
    </div>
    <section className='container buttons'>
        <Button variant="outline-light" size="lg" onClick={increment} >+</Button>{' '}
        <Button variant="outline-light" size="lg" onClick={decrement}>-</Button>{' '}
        <Button variant="outline-light" size="lg" onClick={reset}>reset</Button>{' '}
    </section>
    </>
  )
}

export default Add
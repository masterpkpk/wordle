import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup } = useWordle(solution)
  
  
    useEffect(() => {
        window.addEventListener()
    })

    return (
    <div>The Solution is: {solution}</div>
  )
}

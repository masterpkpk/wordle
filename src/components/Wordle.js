import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, isCorrect } = useWordle(solution)
  
  
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    return (
    
    <div>
    {!isCorrect && <div>Current Guess: {currentGuess}</div>}    
    {isCorrect && <div>You win!</div>}
    </div>
  )
}

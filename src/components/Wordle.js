import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, isCorrect, history, guesses } = useWordle(solution)
  
  
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    return (
    
    <div>
    {guesses && <ul>Past Guesses: {guesses}</ul>}
    {!isCorrect && <div>Current Guess: {currentGuess}</div>}    
    {isCorrect && <div>You win!</div>}
    </div>
  )
}

import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, isCorrect, history, guesses, turn, resetGame } = useWordle(solution)
  
  
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    useEffect(() => {
      console.log(guesses, turn, isCorrect)
    }, [guesses, turn, isCorrect])
    
    
    return (
    
    <div>
      <Grid  currentGuess={currentGuess} guesses={guesses} turn={turn}/>   
      {isCorrect && <div>You win!</div>}
      {turn > 5 && <button onClick={() => resetGame() }>Try again!</button>}
    </div>
  )
}

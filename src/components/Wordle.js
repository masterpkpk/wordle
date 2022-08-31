import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, isCorrect, history, guesses, turn } = useWordle(solution)
  
  
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    useEffect(() => {
      console.log(guesses, turn, isCorrect)
    }, [guesses, turn, isCorrect])
    
    
    return (
    
    <div>
      <div>solution - {solution} </div>
      {!isCorrect && <div>Current Guess: {currentGuess}</div>} 
      <Grid  currentGuess={currentGuess} guesses={guesses} turn={turn}/>   
      {isCorrect && <div>You win!</div>}
    </div>
  )
}

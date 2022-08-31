import React from 'react'
import Row from './Row'

export default function Grid({currentGuess, turn, guesses}) {
  return (
    <div>
        {guesses.map((guess, i) => {
            return <Row key={i} guess={guess}/>
        })}
    </div>
  )
}

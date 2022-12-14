import { useState } from 'react'


const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})


    const resetGame = () => {
        setGuesses([...Array(6)])
        setTurn(0)
    }
    
    
    
    const formatGuess = () => {
        let solutionArray = [...solution]
        
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'}
        })

        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
             return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
              const currentColor = prevUsedKeys[l.key]
      
              if (l.color === 'green') {
                prevUsedKeys[l.key] = 'green'
                return
              }
              if (l.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[l.key] = 'yellow'
                return
              }
              if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[l.key] = 'grey'
                return
              }
            })
      
            return prevUsedKeys
          })
        setCurrentGuess('')

    }

    const handleKeyup = ({ key }) => {
        
        if(key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key   
                })
            }
        }

        if (key === 'Enter') {
            
            if(currentGuess.length < 5) {
                console.log('That guess is too short!')
                return
            }

            if(turn > 5) {
                console.log("You've used all of your guesses!")
                return
            }
            
            const formatted = formatGuess()  
            addNewGuess(formatted)
        }

        
    }
    
    return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, history, resetGame}

}

export default useWordle
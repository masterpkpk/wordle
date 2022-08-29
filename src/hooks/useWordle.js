import { useState } from 'react'


const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)


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

    const addNewGuess = () => {

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
                console.log('That guess is too short')
                return
            }

            if(turn > 5) {
                console.log("You've used all of your guesses!")
                return
            }

            if(currentGuess === solution) {
                setIsCorrect(true)
            }

            setHistory((prev) => {
                return [...prev, currentGuess]
            })
            
            setTurn((prev) => {
                return prev + 1
            })
            
            setGuesses((prev) =>{
                return [...prev, currentGuess]
            })
            setCurrentGuess('')

            const formatted = formatGuess()
            console.log(formatted)
            
        }

        
    }
    
    return {turn, currentGuess, guesses, isCorrect, handleKeyup, history}

}

export default useWordle
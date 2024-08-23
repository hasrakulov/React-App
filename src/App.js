import React from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {
    "src": "/img/helmet-1.png",
    matched: false,
  },
  {
    "src": "/img/potion-1.png",
    matched: false,
  },
  {
    "src": "/img/ring-1.png",
    matched: false,
  },
  {
    "src": "/img/scroll-1.png",
    matched: false,
  },
  {
    "src": "/img/shield-1.png",
    matched: false,
  },
  {
    "src": "/img/sword-1.png",
    matched: false,
  }
]
function App() {

  const [cards, setCards] = React.useState([])
  const [turns, setTurns] = React.useState(0)
  const [choiceOne, setChoiceOne] = React.useState(null)
  const [choiceTwo, setChoiceTwo] = React.useState(null)
  const [disabled, setDisabled] = React.useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  console.log("ChoiceOne", choiceOne, "choiceTwo", choiceTwo)

  React.useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src || card.src === choiceTwo.src) {
              return {
                ...card,
                matched: true
              }
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {

        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])

  console.log(cards)


  React.useEffect(() => {
    shuffleCards()
  }, [])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    console.log("Turns", turns)
    setDisabled(false)
  }



  return (
    <main className="App">
      <h1 className='header'>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map((card => {
          return <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        }))}
      </div>
      <p className='turns'>Turns: {turns}</p>
    </main>
  )
}

export default App;

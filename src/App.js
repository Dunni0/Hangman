import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import PopUP from "./components/PopUp"
import { show } from "./helper/helper";

const words = ['application', 'programming', 'interface', 'wizard'];


// gets random word from array
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
const [playable, setPlayable] = useState(true)
const [correctLetters, setCorrectLetters] = useState([])
const [wrongLetters, setWrongLetters] = useState([])
const [showNotification, setShowNotification] = useState(false)


// useEffect handles side effcts in the app
// keydown press
useEffect(() => {
    const handleKeydown = event => {
    const {key, keyCode} = event;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
  
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters,letter])
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters,letter])
          } else {
            show(setShowNotification);
          }
        }
      }
    }

  window.addEventListener('keydown', handleKeydown )

	return () => window.removeEventListener("keydown", handleKeydown)
}, [correctLetters, wrongLetters, playable])

// including array (empty/dependencies) after useEffect allows this effect to only be called on the initial render and not every single time the app renders.
// here with the dependenies, useEffect will render whenever these dependencies gets updated

function playAgain(){
  setPlayable(true)

  // back to default
  
  // clears correct and wrong letters
  setCorrectLetters([])

  setWrongLetters([])

  // gives us another random word
  const randoWord = [Math.floor(Math.random() * words.length)];
  selectedWord = words[randoWord]
}

  return ( 
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
        <PopUP correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
        <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Test from './components/Test';
import { useState, useEffect, useContext } from "react";
import { GameStateContext } from "./quizcontext/Contexts";
import Menu from './components/Menu';
import EndScreen from './components/EndScreen';
import CreateQuiz from './pages/Createquizz';
import TestcreayeQuizz from './pages/TestcreayeQuizz';
function App() {
  const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [quizlenght, setQuizlenght] = useState(0);
  
  return (
    <div className="App">
      <h1>Quiz App</h1>
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          userName,
          setUserName,
          score,
          setScore,
          quizlenght,
          setQuizlenght,
        }}
      >
        {/* <TestcreayeQuizz></TestcreayeQuizz> */}
        {/* <CreateQuiz /> */}
        {gameState === "menu" && <Menu />}
        {gameState === "playing" && <Test />}
        {gameState === "finished" && <EndScreen />}
      </GameStateContext.Provider>
    </div>
   
  );
}

export default App;

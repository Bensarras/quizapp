import React from "react";

import { useContext } from "react";
import { GameStateContext } from "../quizcontext/Contexts";
// import posts from "../services/quiz.services";


const EndScreen = () => {
  const { score, setScore, setGameState, userName, quizlenght, setQuizlenght } = useContext(
    GameStateContext
  );

  const restartQuiz = () => {
    setScore(0);
    setQuizlenght(0);
    setGameState("menu");
  };
  return (
    <div className="EndScreen">
      <h1>Quiz Finished</h1>
      <h3>{userName}</h3>
      <h1>
        {score} / {quizlenght}
      </h1>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default EndScreen;
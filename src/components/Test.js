// import React, { useEffect, useState } from "react";
// import { useContext } from "react";
// import { GameStateContext } from "../quizcontext/Contexts";
// import { db } from "../utils/firebase/firebase.utils";

// import PostDataService from "../services/quiz.services";




// const Test = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [optionChosen, setOptionChosen] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { score, setScore, gameState, setGameState, quizlenght, setQuizlenght } = useContext(
//     GameStateContext
//   );

//   useEffect(() => {
//     const getPostsFromFirebase = [];
    
   
//     const getPosts = async () => {
//             const data = await PostDataService.getAllPosts();
            
//             data.forEach((doc) => {
                
//                 getPostsFromFirebase.push({...doc.data(), key: doc.id,});});
//             setPosts(getPostsFromFirebase);
//             setLoading(false);
            
//             console.log(getPostsFromFirebase);
//           };
//           return () => getPosts();
//     }, [loading]);

//     if (loading) {
//         return <h1>loading firebase data...</h1>;
//     }
 
// const quizleng = () => {
//     setQuizlenght( quizlenght + 1);
//     };





//   const chooseOption = (option) => {
//     setOptionChosen(option);
//   };
//   const nextQuestion = () => {
//     if (posts[currentQuestion].asnwer == optionChosen) {
//       setQuizlenght(quizlenght + 1);
//       setScore(score + 1);
      
    
      
//     }
//     setCurrentQuestion(currentQuestion + 1);
//   };
//   const finishQuiz = () => {
//     if (posts[currentQuestion].asnwer == optionChosen) {
//       setQuizlenght(quizlenght + 1);
//       setScore(score + 1);
      
      
//     }
//     setGameState("finished");
//   };


//     return (
//         <div className="Quiz">
//         <h1>{posts[currentQuestion].prompt}</h1>
//         <div className="questions">
//           <button
//             onClick={() => {
//               chooseOption("optionA");
//             }}
//           >
//             {posts[currentQuestion].optionA}
//           </button>
//           <button
//             onClick={() => {
//               chooseOption("optionB");
//             }}
//           >
//             {posts[currentQuestion].optionB}
//           </button>
//           <button
//             onClick={() => {
//               chooseOption("optionC");
//             }}
//           >
//             {posts[currentQuestion].optionC}
//           </button>
//           <button
//             onClick={() => {
//               chooseOption("optionD");
//             }}
//           >
//             {posts[currentQuestion].optionD}
//           </button>
//         </div>
  
//         {currentQuestion == posts.length - 1 ? (
//           <button onClick={finishQuiz} id="nextQuestion">
//             Finish Quiz
//           </button>
//         ) : (
//           <button onClick={nextQuestion} id="nextQuestion">
//             Next Question
//           </button>
//         )}
//       </div>
//     );
    
   
   
//   }
//   export default Test;

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { GameStateContext } from "../quizcontext/Contexts";
import { db } from "../utils/firebase/firebase.utils";
import { collection, query, getDocs } from "firebase/firestore";


const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { score, setScore, gameState, setGameState, quizlenght, setQuizlenght } = useContext(
    GameStateContext
  );

  useEffect(() => {
    const getPostsFromFirebase = [];

    const getPosts = async () => {
      const quizCollection = collection(db, "quiz");
      const q = query(quizCollection);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({ ...doc.data(), key: doc.id });
      });

      setPosts(getPostsFromFirebase);
      setLoading(false);
      console.log(getPostsFromFirebase);
    };

    getPosts();
  }, [loading]);
  if (loading) {
    return <h1>loading firebase data...</h1>;
  }

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextQuestion = () => {
    if (posts[currentQuestion].asnwer === optionChosen) {
      setQuizlenght(quizlenght + 1);
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    if (posts[currentQuestion].asnwer === optionChosen) {
      setQuizlenght(quizlenght + 1);
      setScore(score + 1);
    }
    setGameState("finished");
  };

  return (
    <div className="Quiz">
      <h1>{posts[currentQuestion].prompt}</h1>
      <div className="questions">
        <button onClick={() => chooseOption("optionA")}>
          {posts[currentQuestion].optionA}
        </button>
        <button onClick={() => chooseOption("optionB")}>
          {posts[currentQuestion].optionB}
        </button>
        <button onClick={() => chooseOption("optionC")}>
          {posts[currentQuestion].optionC}
        </button>
        <button onClick={() => chooseOption("optionD")}>
          {posts[currentQuestion].optionD}
        </button>
      </div>

      {currentQuestion === posts.length - 1 ? (
        <button onClick={finishQuiz} id="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}
    </div>
  );
};

export default Test;

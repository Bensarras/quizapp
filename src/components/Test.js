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
import { collection, query, getDocs, doc,getDoc } from "firebase/firestore";
import PostDataService from "../services/quiz.services";


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
      const quizDocRef = doc(db, "quiz", "7sU1J7wSDh3rDtkvQxDd"); // Replace "quizDocument" with the ID of the document containing the questions array
      const quizDocSnapshot = await getDoc(quizDocRef);

      if (quizDocSnapshot.exists()) {
        const quizData = quizDocSnapshot.data();
        const questionsArray = quizData.questions;

        setPosts(questionsArray);
        setLoading(false);
        console.log(questionsArray);
      } else {
        console.log("No such document!");
      }
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
        {posts[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => chooseOption(`option${index + 1}`)}
          >
            {option}
          </button>
        ))}
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
// import React, { useEffect, useState } from "react";
// import { useContext } from "react";
// import { GameStateContext } from "../quizcontext/Contexts";
// import { db } from "../utils/firebase/firebase.utils";
// import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";

// const Test = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [optionChosen, setOptionChosen] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const {
//     score,
//     setScore,
//     gameState,
//     setGameState,
//     quizlenght,
//     setQuizlenght,
//   } = useContext(GameStateContext);

//   useEffect(() => {
//     const getPosts = async () => {
//       // const quizId = "7sU1J7wSDh3rDtkvQxDd"; // Replace with the ID of the quiz document you want to fetch questions from
//       // const questionsRef = collection(db, "quiz", quizId, "questions");

//       const quizDocRef = doc(db, "quiz", "7sU1J7wSDh3rDtkvQxDd");
//       const questionsSnapshot = await getDoc(quizDocRef);
//       // const questionsSnapshot = await getDocs(questionsRef);
//       const questionsArray = [];

//       questionsSnapshot.forEach((doc) => {
//         console.log("Question data:", doc.data());
//         questionsArray.push({ ...doc.data(), id: doc.id });
//       });

//       setPosts(questionsArray);
//       setLoading(false);
//       console.log(questionsArray);
//     };

//     getPosts();
//   }, [loading]);

//   if (loading) {
//     return <h1>loading firebase data...</h1>;
//   }

//   const chooseOption = (option) => {
//     setOptionChosen(option);
//   };

//   const nextQuestion = () => {
//     if (posts[currentQuestion].answer === optionChosen) {
//       setQuizlenght(quizlenght + 1);
//       setScore(score + 1);
//     }
//     setCurrentQuestion(currentQuestion + 1);
//   };

//   const finishQuiz = () => {
//     if (posts[currentQuestion].answer === optionChosen) {
//       setQuizlenght(quizlenght + 1);
//       setScore(score + 1);
//     }
//     setGameState("finished");
//   };

//   return (
//     <div className="Quiz">
//       <h1>{posts[currentQuestion].prompt}</h1>
//       <div className="questions">
//         <button onClick={() => chooseOption("optionA")}>
//           {posts[currentQuestion].optionA}
//         </button>
//         <button onClick={() => chooseOption("optionB")}>
//           {posts[currentQuestion].optionB}
//         </button>
//         <button onClick={() => chooseOption("optionC")}>
//           {posts[currentQuestion].optionC}
//         </button>
//         <button onClick={() => chooseOption("optionD")}>
//           {posts[currentQuestion].optionD}
//         </button>
//       </div>

//       {currentQuestion === posts.length - 1 ? (
//         <button onClick={finishQuiz} id="nextQuestion">
//           Finish Quiz
//         </button>
//       ) : (
//         <button onClick={nextQuestion} id="nextQuestion">
//           Next Question
//         </button>
//       )}
//     </div>
//   );
// };

// export default Test;

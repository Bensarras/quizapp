import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { GameStateContext } from "../quizcontext/Contexts";
import { db } from "../utils/firebase/firebase.utils";

import PostDataService from "../services/quiz.services";
// import firebase from 'firebase';
// import { db } from "../utils/firebase/firebase.utils";



const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [quizlenght, setQuizlenght] = useState(0);
  const { score, setScore, gameState, setGameState, quizlenght, setQuizlenght } = useContext(
    GameStateContext
  );
//   let quizlenght = posts.length;
  useEffect(() => {
    const getPostsFromFirebase = [];
    
    // const subscriber = db.collectionGroup("quiz")
    //   .onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       getPostsFromFirebase.push({
    //         ...doc.data(), //spread operator
    //         key: doc.id, // `id` given to us by Firebase
    //       });
    const getPosts = async () => {
            const data = await PostDataService.getAllPosts();
            
            data.forEach((doc) => {
                // getPostsFromFirebase.push(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))});
                getPostsFromFirebase.push({...doc.data(), key: doc.id,});});
            setPosts(getPostsFromFirebase);
            setLoading(false);
            // console.log(data.doc);
            console.log(getPostsFromFirebase);
          };
          return () => getPosts();
    }, [loading]);

    if (loading) {
        return <h1>loading firebase data...</h1>;
    }
            

    
    
        
          
       
        
       


       
    
        
        

    // return cleanup function
 


















//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const db = firebase.firestore();
//       const dataRef = db.collection('your-collection-name');
//       const snap = await dataRef.get();
//       const items = snap.docs.map(doc => doc.data());
//       setData(items);
//     };

//     fetchData();
//   }, []);
  


//   const getPosts = async () => {
//     const data = await PostDataService.getAllPosts();
//     console.log(data.docs);
//     setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   };
//   useEffect(() => {
//     getPosts();
//   }, []);









const quizleng = () => {
    setQuizlenght( quizlenght + 1);
    };





  const chooseOption = (option) => {
    setOptionChosen(option);
  };
  const nextQuestion = () => {
    if (posts[currentQuestion].asnwer == optionChosen) {
      setQuizlenght(quizlenght + 1);
      setScore(score + 1);
      
    
      
    }
    setCurrentQuestion(currentQuestion + 1);
  };
  const finishQuiz = () => {
    if (posts[currentQuestion].asnwer == optionChosen) {
      setQuizlenght(quizlenght + 1);
      setScore(score + 1);
      
      
    }
    setGameState("finished");
  };



  
    return (
        <div className="Quiz">
        <h1>{posts[currentQuestion].prompt}</h1>
        <div className="questions">
          <button
            onClick={() => {
              chooseOption("optionA");
            }}
          >
            {posts[currentQuestion].optionA}
          </button>
          <button
            onClick={() => {
              chooseOption("optionB");
            }}
          >
            {posts[currentQuestion].optionB}
          </button>
          <button
            onClick={() => {
              chooseOption("optionC");
            }}
          >
            {posts[currentQuestion].optionC}
          </button>
          <button
            onClick={() => {
              chooseOption("optionD");
            }}
          >
            {posts[currentQuestion].optionD}
          </button>
        </div>
  
        {currentQuestion == posts.length - 1 ? (
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
    // return (
    //     <div className="container">
    //       <h1>Answers:</h1>
    //       {posts.length > 0 ? (
    //         posts.map((post) => <div key={post.id}>{post.prompt}</div>)
    //       ) : (
    //         <h1>no answers yet :(</h1>
    //       )}
    //     </div>
    //   );
   
   
  }
  export default Test;
import { useState } from "react"
import { auth } from "../utils/firebase/firebase.utils"
import PostDataService from "../services/quiz.services"

export default function CreateQuiz() {
  
  const [category, setCategory] = useState("")
  const [prompt, setPrompt] = useState("")
  
  const [message, setMessage] = useState({ error: false, message: "" })
  const [asnwer, setSelectedAnswer] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
    


  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    if (optionA === "" ||optionB === "" || category === "" || asnwer === "") {
      setMessage({ error: true, message: "Please fill in all fields" })
      return
    }
    const newQuizz = {
      prompt,
      asnwer,
      category,
      optionA,
      optionB,
      optionC,
      optionD,
      createdAt: new Date(),
    //   Author: auth.currentUser.email, when we have authentication and user
    }
    console.log(newQuizz)

    try {
      await PostDataService.addPosts(newQuizz)
      setMessage({ error: false, msg: "Post created successfully" })
    } catch (error) {
      setMessage({ error: true, msg: error.message })
    }

    setOptionA("")
    setOptionB("")
    setOptionC("")
    setOptionD("")
    setCategory("")
    setPrompt("")
    // setDetails("") 
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 h-screen w-full">
      <div className="bg-[#472183] flex flex-col justify-center">
        <form
          className="max-w-[800px] w-full h-full flex-wrap mx-auto drop-shadow-2xl bg-[#D9D9D9] mt-0 p-8 px-8"
          onSubmit={handleSubmit}
        >
            <p className="text-[#212B27] p-2 font-bold text-left">Please enter the question</p>
          <input
            className="rounded-lg w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
            placeholder="Prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></input>
          
          <p className="text-[#212B27] p-2 font-bold text-left">Category</p>
          <input
            className="rounded-lg w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
            placeholder="Category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></input>
          <p className="text-[#212B27] p-2 font-bold text-left">First option</p>
          <textarea
            className="rounded-lg h-[50%] w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
            placeholder="Post..."
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
          ></textarea>
           <p className="text-[#212B27] p-2 font-bold text-left">Second option</p>
          <textarea
            className="rounded-lg h-[50%] w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
            placeholder="Post..."
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
          ></textarea>
           <p className="text-[#212B27] p-2 font-bold text-left">Thrid option</p>
          <textarea
            className="rounded-lg h-[50%] w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
            placeholder="Post..."
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
          ></textarea>
           <p className="text-[#212B27] p-2 font-bold text-left">Fourth option</p>
          <textarea
            className="rounded-lg h-[50%] w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
            placeholder="Post..."
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
          ></textarea>
          <p className="text-[#212B27] p-2 font-bold text-left">Choose the correct answer</p>
          <div>
      <label>
        <input
          type="radio"
          value="optionA"
          checked={asnwer === "optionA"}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        />
        Option A
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="optionB"
          checked={asnwer === "optionB"}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        />
        Option B
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="optionC"
          checked={asnwer === "optionC"}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        />
        Option C
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="optionD"
          checked={asnwer === "optionD"}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        />
        Option D
      </label>
      <br />
      
    </div>






          <div className="w-full my-5 py-2 space-x-1">
            <button className="bg-[#C10000] py-2 px-4 text-[#FFFFFF] rounded-xl font-bold text-lg">
              Delete
            </button>
            <button className="bg-[#7A5CFA] py-2 px-4 text-[#FFFFFF] rounded-xl font-bold text-lg">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import { useState } from "react";
import PostDataService from "../services/quiz.services";

export default function CreateQuiz() {
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([
    {
      prompt: "",
      answer: "",
      options: ["", "", "", ""],
    },
  ]);

  const [message, setMessage] = useState({ error: false, message: "" });

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handlePromptChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].prompt = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        prompt: "",
        answer: "",
        options: ["", "", "", ""],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (category === "") {
      setMessage({ error: true, message: "Please fill in the category" });
      return;
    }

    for (const question of questions) {
      if (
        question.prompt === "" ||
        question.answer === "" ||
        question.options.some((option) => option === "")
      ) {
        setMessage({
          error: true,
          message: "Please fill in all fields for each question",
        });
        return;
      }
    }

    const newQuiz = {
      category,
      createdAt: new Date(),
      questions,
    };

    console.log(newQuiz);

    try {
      await PostDataService.addPosts(newQuiz);
      setMessage({ error: false, msg: "Quiz created successfully" });
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }

    // Reset the form
    setCategory("");
    setQuestions([
      {
        prompt: "",
        answer: "",
        options: ["", "", "", ""],
      },
    ]);
  };

    
        return (
            <div className="grid grid-cols-1 sm:grid-cols-1 h-screen w-full">
              <div className="bg-[#472183] flex flex-col justify-center">
                <form
                  className="max-w-[800px] w-full h-full flex-wrap mx-auto drop-shadow-2xl bg-[#D9D9D9] mt-0 p-8 px-8"
                  onSubmit={handleSubmit}
                >
                  <p className="text-[#212B27] p-2 font-bold text-left">Category</p>
                  <input
                    className="rounded-lg w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
                    placeholder="Category..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></input>
          
                  {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-8">
                      <h3>Question {questionIndex + 1}</h3>
                      <input
                        className="rounded-lg w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
                        placeholder="Prompt..."
                        value={question.prompt}
                        onChange={(e) => handlePromptChange(questionIndex, e.target.value)}
                      ></input>
                      {question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          className="rounded-lg w-full bg-[#FFFFFF] p-2 focus:border-blue-500 focus:bg-[#FFFFFF] focus:outline-none"
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(questionIndex, optionIndex, e.target.value)
                          }
                        ></input>
                      ))}
                      <div>
                        {question.options.map((_, optionIndex) => (
                          <label key={optionIndex}>
                            <input
                              type="radio"
                              value={`option${optionIndex}`}
                              checked={question.answer === `option${optionIndex}`}
                              onChange={(e) =>
                                handleAnswerChange(questionIndex, e.target.value)
                              }
                            />
                            Option {optionIndex + 1}
                            <br />
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
          
                  <button
                    type="button"
                    className="bg-[#7A5CFA] py-2 px-4 text-[#FFFFFF] rounded-xl font-bold text-lg mb-4"
                    onClick={addQuestion}
                  >
                    Add Question
                  </button>
          
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
          );




    
}
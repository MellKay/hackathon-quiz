import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Questions() {
  const [quizData, setQuizData] = useState([]);
  const [answer, setAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [q, setQ] = useState(0);
  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean`
      );
      const data = await res.json();
      console.log(data.results[q].question);
      setQuizData(data.results[q].question);
      setAnswer(data.results[q].correct_answer);
      console.log(data.results[q].correct_answer);
    }
    getQuestions();
  }, [q]);

  function handleClick(e) {
    console.log(e.target.value);
    setUserAnswer(e.target.value);
    setHasAnswered(true);
  }

  const variants = {
    hidden: { opacity: 0 },
    middle: { opacity: 0.5 },
    visible: { opacity: 1 }
  };

  return (
    <div>
      <h3> {quizData} </h3>
      <motion.button
        initial="hidden"
        animate="visible"
        variants={variants}
        onClick={handleClick}
        value={"True"}
      >
        True
      </motion.button>
      <motion.button
        initial="hidden"
        animate="visible"
        variants={variants}
        onClick={handleClick}
        value={"False"}
      >
        False
      </motion.button>
      {hasAnswered && (
        <>
          <p>{userAnswer === answer ? "winner" : "u suck"}</p>
          <button
            onClick={() => {
              setQ(q + 1);
              setHasAnswered(false);
            }}
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
}

export default Questions;

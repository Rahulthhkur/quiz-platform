import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizTaker = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const savedQuiz = localStorage.getItem('quiz');
    if (savedQuiz) {
      const parsedQuiz = JSON.parse(savedQuiz);
      setQuiz(parsedQuiz);
      setAnswers(Array(parsedQuiz.questions.length).fill(null));
    } else {
      setQuiz(null);
    }
  }, []);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    navigate('/result');
  };

  if (quiz === null) return <div>No quiz found. Please create a quiz first.</div>;
  if (quiz === undefined) return <div>Loading...</div>;

  return (
    <div className="animate-slideIn">
      <h1 className="text-2xl mb-4">{quiz.title}</h1>
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4">
          <p className="mb-2">{qIndex + 1}. {question.text}</p>
          {question.options.map((option, oIndex) => (
            <label key={oIndex} className="block">
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={oIndex}
                checked={answers[qIndex] === oIndex}
                onChange={() => handleAnswerChange(qIndex, oIndex)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 animate-popIn">Submit Quiz</button>
    </div>
  );
};

export default QuizTaker;

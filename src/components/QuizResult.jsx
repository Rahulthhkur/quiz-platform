import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizResult = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedQuiz = localStorage.getItem('quiz');
    const savedAnswers = localStorage.getItem('quizAnswers');

    if (savedQuiz && savedAnswers) {
      const parsedQuiz = JSON.parse(savedQuiz);
      const parsedAnswers = JSON.parse(savedAnswers);
      setQuiz(parsedQuiz);
      setAnswers(parsedAnswers);

      let calculatedScore = 0;
      parsedQuiz.questions.forEach((question, index) => {
        if (question.correct === parsedAnswers[index]) {
          calculatedScore++;
        }
      });
      setScore(calculatedScore);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (quiz === null || answers.length === 0) return <div>Loading...</div>;

  return (
    <div className="animate-fadeIn">
      <h1 className="text-2xl mb-4">Quiz Results</h1>
      <p className="mb-4">Score: {score} / {quiz.questions.length}</p>
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4">
          <p className="mb-2">{qIndex + 1}. {question.text}</p>
          {question.options.map((option, oIndex) => (
            <p key={oIndex} className={`pl-4 ${oIndex === question.correct ? 'text-green-500' : oIndex === answers[qIndex] ? 'text-red-500' : ''}`}>
              {option}
            </p>
          ))}
        </div>
      ))}
      <button onClick={() => navigate('/')} className="bg-blue-500 text-white px-4 py-2 animate-popIn">Take Another Quiz</button>
    </div>
  );
};

export default QuizResult;

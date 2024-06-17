import React, { useState } from 'react';

const QuizCreator = () => {
  const [quiz, setQuiz] = useState({ title: '', questions: [] });
  const [question, setQuestion] = useState({ text: '', options: ['', ''], correct: 0 });
  const [error, setError] = useState('');

  const handleAddQuestion = () => {
    if (!question.text || question.options.some(opt => !opt)) {
      setError("Please fill out all fields for the question and options.");
      return;
    }
    setQuiz({ ...quiz, questions: [...quiz.questions, question] });
    setQuestion({ text: '', options: ['', ''], correct: 0 });
    setError('');
  };

  const handleSaveQuiz = () => {
    if (!quiz.title || quiz.questions.length === 0) {
      setError("Please provide a quiz title and add at least one question.");
      return;
    }
    localStorage.setItem('quiz', JSON.stringify(quiz));
    setQuiz({ title: '', questions: [] });
    setError('');
  };

  const handleAddOption = () => {
    setQuestion({ ...question, options: [...question.options, ''] });
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...question.options];
    newOptions.splice(index, 1);
    setQuestion({ ...question, options: newOptions });
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-2xl mb-4">Create a Quiz</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Quiz Title"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        className="block mb-2 p-2 border w-full"
      />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Question"
          value={question.text}
          onChange={(e) => setQuestion({ ...question, text: e.target.value })}
          className="block mb-2 p-2 border w-full"
        />
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[index] = e.target.value;
                setQuestion({ ...question, options: newOptions });
              }}
              className="block p-2 border w-full mr-2"
            />
            <button onClick={() => handleRemoveOption(index)} className="bg-red-500 text-white px-2 py-1">Remove</button>
          </div>
        ))}
        <button onClick={handleAddOption} className="bg-blue-500 text-white px-4 py-2 mb-4">Add Option</button>
        <select
          value={question.correct}
          onChange={(e) => setQuestion({ ...question, correct: parseInt(e.target.value) })}
          className="block mb-2 p-2 border w-full"
        >
          {question.options.map((option, index) => (
            <option key={index} value={index}>
              {`Option ${index + 1}`}
            </option>
          ))}
        </select>
        <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2 animate-popIn">Add Question</button>
      </div>
      <button onClick={handleSaveQuiz} className="bg-green-500 text-white px-4 py-2 animate-popIn">Save Quiz</button>
    </div>
  );
};

export default QuizCreator;

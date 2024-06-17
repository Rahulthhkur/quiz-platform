import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import QuizCreator from './components/QuizCreator';
import QuizTaker from './components/QuizTaker';
import QuizResult from './components/QuizResult';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500">Take Quiz</Link>
        <Link to="/create" className="text-blue-500">Create Quiz</Link>
      </nav>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Routes>
          <Route path="/" element={<QuizTaker />} />
          <Route path="/create" element={<QuizCreator />} />
          <Route path="/result" element={<QuizResult />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

'use client'
import React, { useState, useEffect } from 'react';

const TestPage = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 30);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Example questions with weightages
    setQuestions([
      {
        id: 1,
        question: 'What is React?',
        type: 'single',
        weightage: 2, // Question weightage
        options: [
          { text: 'Library', weightage: 1.0 },
          { text: 'Framework', weightage: 0.5 },
          { text: 'Language', weightage: 0.0 },
          { text: 'Tool', weightage: 0.0 }
        ]
      },
      {
        id: 2,
        question: 'Select all that apply to JSX:',
        type: 'multiple',
        weightage: 3,
        options: [
          { text: 'JavaScript XML', weightage: 0.5 },
          { text: 'Allows HTML in JavaScript', weightage: 0.3 },
          { text: 'Requires compilation', weightage: 0.2 },
          { text: 'Is a database query language', weightage: 0.0 }
        ]
      },
      {
        id: 3,
        question: 'What hook manages state in React?',
        type: 'single',
        weightage: 1,
        options: [
          { text: 'useState', weightage: 1.0 },
          { text: 'useEffect', weightage: 0.0 },
          { text: 'useContext', weightage: 0.0 },
          { text: 'useReducer', weightage: 0.5 }
        ]
      }
    ]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (option, isChecked = true) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    if (currentQuestion.type === 'single') {
      setAnswers({ ...answers, [currentQuestion.id]: [option] });
    } else {
      // For checkbox questions
      const currentAnswers = answers[currentQuestion.id] || [];
      let newAnswers;
      
      if (isChecked) {
        newAnswers = [...currentAnswers, option];
      } else {
        newAnswers = currentAnswers.filter(ans => ans.text !== option.text);
      }
      
      setAnswers({ ...answers, [currentQuestion.id]: newAnswers });
    }
  };

  const calculateScore = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    const answer = answers[questionId];
    
    if (!answer) return 0;
    
    if (question.type === 'single') {
      return question.weightage * answer[0].weightage;
    } else {
      // For checkbox questions
      const hasZeroWeightage = answer.some(opt => opt.weightage === 0);
      if (hasZeroWeightage) return 0;
      
      const answerScore = answer.reduce((sum, opt) => sum + opt.weightage, 0);
      return question.weightage * answerScore;
    }
  };

  const handleSubmit = () => {
    const scores = {};
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    questions.forEach(question => {
      scores[question.id] = calculateScore(question.id);
      totalScore += scores[question.id];
      
      // Calculate max possible score
      if (question.type === 'single') {
        maxPossibleScore += question.weightage * Math.max(...question.options.map(opt => opt.weightage));
      } else {
        const validOptions = question.options.filter(opt => opt.weightage > 0);
        maxPossibleScore += question.weightage * validOptions.reduce((sum, opt) => sum + opt.weightage, 0);
      }
    });

    const examResult = {
        id: Date.now(), // Unique identifier for the exam
        timestamp: new Date().toISOString(),
        questions,
        answers,
        scores,
        totalScore,
        maxPossibleScore
      };
  
      // Get existing results or initialize empty array
      const existingResults = JSON.parse(localStorage.getItem('examResults') || '[]');
      
      // Add new result
      existingResults.push(examResult);
      
      // Store updated results
      localStorage.setItem('examResults', JSON.stringify(existingResults));
  
      // Store current result ID for immediate viewing
      localStorage.setItem('currentExamId', examResult.id);
  
      setIsSubmitted(true);
      window.location.href = '/result';
    };

  const done = () => {
    // Replace Next.js navigation with window.location
    window.location.href = '/studentexam';
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isSubmitted) {
    const totalScore = questions.reduce((sum, q) => sum + calculateScore(q.id), 0);
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Exam Submitted!</h1>
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-800">{q.question}</p>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Score: {calculateScore(q.id).toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-blue-600">
                  Your answer: {
                    answers[q.id] ? 
                      (Array.isArray(answers[q.id]) ? 
                        answers[q.id].map(a => a.text).join(', ') : 
                        'Not answered')
                      : 'Not answered'
                  }
                </p>
              </div>
            ))}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-xl font-semibold text-green-800">
                Total Score: {totalScore.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-end">
              <button 
                className="text-xl font-semibold bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" 
                onClick={done}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Online Exam</h1>
          <div className="bg-red-100 px-4 py-2 rounded-full">
            <span className="font-mono text-red-600 font-medium">
              Time Left: {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex space-x-2 mb-6">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${idx === currentQuestionIndex ? 'bg-blue-500 text-white' : 
                    answers[questions[idx].id] ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          {currentQuestion && (
            <>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-medium text-gray-800">
                  Question {currentQuestionIndex + 1}: {currentQuestion.question}
                </h2>
                {/* <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Weight: {currentQuestion.weightage}
                </span> */}
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  currentQuestion.type === 'single' ? (
                    <button
                      key={idx}
                      className={`w-full text-left p-4 rounded-lg transition-colors
                        ${answers[currentQuestion.id]?.[0]?.text === option.text
                          ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'}`}
                      onClick={() => handleAnswer(option)}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option.text}
                    </button>
                  ) : (
                    <label
                      key={idx}
                      className={`block w-full p-4 rounded-lg transition-colors cursor-pointer
                        ${answers[currentQuestion.id]?.some(ans => ans.text === option.text)
                          ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'}`}
                    >
                      <input
                        type="checkbox"
                        className="mr-3"
                        checked={answers[currentQuestion.id]?.some(ans => ans.text === option.text) || false}
                        onChange={(e) => handleAnswer(option, e.target.checked)}
                      />
                      <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option.text}
                    </label>
                  )
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-colors
              ${currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          >
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              onClick={handleSubmit}
            >
              Submit Exam
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
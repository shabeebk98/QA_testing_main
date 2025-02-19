// app/components/superadmin/SuperAdminDashboard.jsx
'use client'
import { useState } from 'react'
import { PlusCircle, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react'

const SuperAdminDashboard = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    question: '',
    answers: [{ text: '', correct: false }],
    category: '',
    difficulty: 'medium'
  })

  const addAnswer = () => {
    setCurrentQuestion({
      ...currentQuestion,
      answers: [...currentQuestion.answers, { text: '', correct: false }]
    })
  }

  const saveQuestion = () => {
    if (currentQuestion.id) {
      setQuestions(questions.map(q =>
        q.id === currentQuestion.id ? currentQuestion : q
      ))
    } else {
      setQuestions([...questions, { ...currentQuestion, id: Date.now() }])
    }
    resetForm()
  }

  const resetForm = () => {
    setCurrentQuestion({
      id: null,
      question: '',
      answers: [{ text: '', correct: false }],
      category: '',
      difficulty: 'medium'
    })
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Super Admin Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                Admin Panel
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Question Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {currentQuestion.id ? '✏️ Edit Question' : '✨ Create New Question'}
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Question</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={currentQuestion.question}
                placeholder="Enter your question here..."
                rows="3"
                onChange={e => setCurrentQuestion({
                  ...currentQuestion,
                  question: e.target.value
                })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter category"
                  value={currentQuestion.category}
                  onChange={e => setCurrentQuestion({
                    ...currentQuestion,
                    category: e.target.value
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Difficulty</label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={currentQuestion.difficulty}
                  onChange={e => setCurrentQuestion({
                    ...currentQuestion,
                    difficulty: e.target.value
                  })}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-4 text-gray-700">Answers</label>
              <div className="space-y-3">
                {currentQuestion.answers.map((answer, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter answer"
                      value={answer.text}
                      onChange={e => {
                        const newAnswers = [...currentQuestion.answers]
                        newAnswers[index].text = e.target.value
                        setCurrentQuestion({
                          ...currentQuestion,
                          answers: newAnswers
                        })
                      }}
                    />
                    <button
                      onClick={() => {
                        const newAnswers = [...currentQuestion.answers]
                        newAnswers[index].correct = !newAnswers[index].correct
                        setCurrentQuestion({
                          ...currentQuestion,
                          answers: newAnswers
                        })
                      }}
                      className={`p-3 rounded-xl transition-all duration-200 ${answer.correct
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {answer.correct ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addAnswer}
                className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Answer Option</span>
              </button>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={saveQuestion}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg shadow-blue-100"
              >
                {currentQuestion.id ? 'Update Question' : 'Save Question'}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">📋 Questions List</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {questions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No questions added yet. Create your first question above!
              </div>
            ) : (
              questions.map(question => (
                <div key={question.id} className="p-8 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {question.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {question.answers.map((answer, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className={`w-2 h-2 rounded-full ${answer.correct ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span className={`text-sm ${answer.correct ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                              {answer.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentQuestion(question)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setQuestions(questions.filter(q => q.id !== question.id))}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default SuperAdminDashboard
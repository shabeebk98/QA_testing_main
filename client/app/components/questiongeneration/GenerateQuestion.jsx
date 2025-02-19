import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PlusCircle,
  MinusCircle,
  BookOpen,
  HelpCircle,
  Check,
  X
} from "lucide-react";

const GenerateQuestion = ({ closeModal }) => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("objective");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/subjects");
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let finalSubject = subject;
    if (newSubject.trim()) {
      try {
        const subjectResponse = await axios.post("http://127.0.0.1:8000/add-subject", { name: newSubject });
        finalSubject = subjectResponse.data.subject;
      } catch (error) {
        console.error("Error adding subject:", error);
        setIsLoading(false);
        return;
      }
    }

    const questionData = questionType === "objective"
      ? {
        subject: finalSubject,
        question_type: "mcq",
        question_text: question,
        options,
        correct_option: answer,
        weightage: 1,
      }
      : {
        subject: finalSubject,
        question_type: "descriptive",
        question_text: question,
        ideal_keywords: answer.split(",").map((kw) => kw.trim()),
        weights: Array(answer.split(",").length).fill(1),
      };

    try {
      const response = await axios.post(
        questionType === "objective"
          ? "http://localhost:8000/add-question-mcq"
          : "http://localhost:8000/add-question-descriptive",
        questionData
      );

      setQuestion("");
      setQuestionType("objective");
      setOptions(["", "", "", ""]);
      setAnswer("");
      setSubject("");
      setNewSubject("");

      if (closeModal) closeModal();
    } catch (error) {
      console.error("Error adding question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSubject = async () => {
    if (newSubject.trim()) {
      setIsLoading(true);
      try {
        await axios.post("http://127.0.0.1:8000/add-subject", { name: newSubject });
        setNewSubject("");
        setIsAddingSubject(false);
        const updatedSubjects = await axios.get("http://127.0.0.1:8000/subjects");
        setSubjects(updatedSubjects.data.subjects);
      } catch (error) {
        console.error("Error adding subject:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-[70%] max-h-[55%] mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-xl transform transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-blue-700" />
          <h2 className="text-2xl font-bold text-gray-800">Create a Question</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsAddingSubject(!isAddingSubject)}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isAddingSubject ? <MinusCircle className="w-5 h-5 mr-2" /> : <PlusCircle className="w-5 h-5 mr-2" />}
          {isAddingSubject ? 'Cancel Adding Subject' : 'Add New Subject'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <label className="block text-lg font-medium text-gray-700">
            Select Subject
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-lg focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 p-3"
            >
              <option value="">-- Select a Subject --</option>
              {subjects.map((subj) => (
                <option key={subj._id} value={subj.subject}>
                  {subj.subject}
                </option>
              ))}
            </select>
          </label>

          {isAddingSubject && (
            <div className="animate-fadeIn space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter new subject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 p-3"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="inline-flex items-center px-5 py-2 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Add
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">
              Question
              <textarea
                placeholder="Enter question text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 min-h-[100px] p-3"
              />
            </label>
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">
              Question Type
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 p-3"
              >
                <option value="objective">Objective (Multiple Choice)</option>
                <option value="descriptive">Descriptive</option>
              </select>
            </label>
          </div>

          {questionType === "objective" && (
            <div className="space-y-5">
              <label className="block text-lg font-medium text-gray-700">Options</label>
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      required
                      className="flex-1 rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 p-3"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="inline-flex items-center p-3 text-red-600 hover:text-red-700 focus:outline-none"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addOption}
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-200"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Option
              </button>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-lg font-medium text-gray-700">
              {questionType === "objective" ? "Correct Answer" : "Ideal Keywords (comma-separated)"}
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 p-3"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-xl font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <HelpCircle className="w-6 h-6 mr-3" />
              Submit Question
            </>
          )}
        </button>
      </form>
    </div>

  );
};

export default GenerateQuestion;

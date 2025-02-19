"use client";
import React, { useState, useEffect } from "react";

const ResultPage = () => {
  const [examResults, setExamResults] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    // Load all exam results
    const results = JSON.parse(localStorage.getItem("examResults") || "[]");
    setExamResults(
      results.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    );

    // Get current exam ID if coming directly from exam
    const currentExamId = localStorage.getItem("currentExamId");
    if (currentExamId) {
      setSelectedExamId(Number(currentExamId));
      localStorage.removeItem("currentExamId"); // Clean up
    } else if (results.length > 0) {
      // Select most recent exam by default
      setSelectedExamId(results[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedExamId) {
      const exam = examResults.find((result) => result.id === selectedExamId);
      setSelectedExam(exam);
    }
  }, [selectedExamId, examResults]);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A", color: "text-green-600" };
    if (percentage >= 80) return { grade: "B", color: "text-blue-600" };
    if (percentage >= 70) return { grade: "C", color: "text-yellow-600" };
    if (percentage >= 60) return { grade: "D", color: "text-orange-600" };
    return { grade: "F", color: "text-red-600" };
  };

  if (examResults.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">
            No exam results found
          </h1>
          <p className="mt-4 text-gray-600">Please complete an exam first.</p>
          <button
            onClick={() => (window.location.href = "/studentexam")}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!selectedExam) {
    return null; // Loading state
  }

  const percentage =
    (selectedExam.totalScore / selectedExam.maxPossibleScore) * 100;
  const { grade, color } = getGrade(percentage);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Exam Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Select Exam Result
          </h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {examResults.map((result) => {
              const resultPercentage =
                (result.totalScore / result.maxPossibleScore) * 100;
              const { grade: resultGrade } = getGrade(resultPercentage);

              return (
                <button
                  key={result.id}
                  onClick={() => setSelectedExamId(result.id)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    result.id === selectedExamId
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="text-sm text-gray-600">
                    {new Date(result.timestamp).toLocaleDateString()}{" "}
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="font-medium text-gray-800">
                    Score: {result.totalScore.toFixed(1)}/
                    {result.maxPossibleScore.toFixed(1)}
                  </div>
                  <div className="text-sm font-medium">
                    Grade: {resultGrade} ({resultPercentage.toFixed(1)}%)
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Exam Results -{" "}
            {new Date(selectedExam.timestamp).toLocaleDateString()}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-blue-600 font-medium mb-1">
                Total Score
              </p>
              <p className="text-3xl font-bold text-blue-800">
                {selectedExam.totalScore.toFixed(2)}/
                {selectedExam.maxPossibleScore.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-green-600 font-medium mb-1">
                Percentage
              </p>
              <p className="text-3xl font-bold text-green-800">
                {percentage.toFixed(1)}%
              </p>
            </div>
            <div className={`bg-gray-50 p-4 rounded-lg text-center`}>
              <p className="text-sm text-gray-600 font-medium mb-1">Grade</p>
              <p className={`text-3xl font-bold ${color}`}>{grade}</p>
            </div>
          </div>
        </div>

        {/* Detailed Questions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Detailed Analysis
          </h2>
          <div className="space-y-6">
            {selectedExam.questions.map((question, index) => {
              const questionScore = selectedExam.scores[question.id];
              const maxQuestionScore =
                question.type === "single" || question.type === "multiple"
                  ? question.weightage *
                    (question.options
                      ? question.options
                          .filter((opt) => opt.weightage > 0)
                          .reduce((sum, opt) => sum + opt.weightage, 0)
                      : 0)
                  : question.weightage; // For descriptive questions, max score is the question weightage

              const questionPercentage =
                (questionScore / maxQuestionScore) * 100;

              return (
                <div key={question.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Question {index + 1}: {question.question}
                    </h3>
                    <div className="text-right">
                      {/* <p className="text-sm text-gray-600">Weight: {question.weightage}</p> */}
                      <p className="text-sm font-medium text-blue-600">
                        Score: {questionScore.toFixed(2)}/
                        {maxQuestionScore.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {question.options &&
                      question.options.map((option, optIndex) => {
                        const isSelected = selectedExam.answers[
                          question.id
                        ]?.some((ans) => ans.text === option.text);
                        const isCorrect = option.weightage > 0;

                        return (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg ${
                              isSelected && isCorrect
                                ? "bg-green-100 border border-green-300"
                                : isSelected && !isCorrect
                                ? "bg-red-100 border border-red-300"
                                : !isSelected && isCorrect
                                ? "bg-yellow-50 border border-yellow-200"
                                : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="flex-1">
                                <span className="font-medium">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>{" "}
                                {option.text}
                              </span>
                              {/* <span className="text-sm text-gray-600">
                              Weight: {option.weightage}
                            </span> */}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          questionPercentage >= 70
                            ? "bg-green-500"
                            : questionPercentage >= 40
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${questionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => (window.location.href = "/studentexam")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Back to Exams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

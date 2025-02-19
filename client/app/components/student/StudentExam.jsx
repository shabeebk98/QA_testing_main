"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Clock,
  BookOpen,
  AlertCircle,
  NotebookPen,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const StudentTestPage = () => {
  const [availableTests, setAvailableTests] = useState([
    {
      id: 1,
      title: "H S Math",
      subject: "Math",
      duration: "60 minutes",
      difficulty: "Intermediate",
      questions: 30,
      teacher: "Mr. John Doe",
      startTime: new Date("2025-01-20T10:00:00Z").toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }), // Converts to Indian format like "3:30 PM"
    },
    {
      id: 2,
      title: "Primary Science",
      subject: "Science",
      duration: "45 minutes",
      difficulty: "Beginner",
      questions: 25,
      teacher: "Ms. Jane Smith",
      startTime: new Date("2025-01-20T11:00:00Z").toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
    {
      id: 3,
      title: "Angular Basics",
      subject: "Angular",
      duration: "90 minutes",
      difficulty: "Advanced",
      questions: 40,
      teacher: "Dr. Emily Brown",
      startTime: new Date("2025-01-20T12:30:00Z").toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
    {
      id: 4,
      title: "PySpark Fundamentals",
      subject: "PySpark",
      duration: "90 minutes",
      difficulty: "Advanced",
      questions: 35,
      teacher: "Prof. Michael Lee",
      startTime: new Date("2025-01-20T14:00:00Z").toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    },
  ]);
  
  

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [completedTests, setCompletedTests] = useState([]);

  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect if not logged in
    }

    // Load completed tests from localStorage
    const storedCompletedTests = JSON.parse(localStorage.getItem("completedTests")) || [];
    setCompletedTests(storedCompletedTests);
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleStartTest = (testId, startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const fiveMinutesBefore = new Date(start.getTime() - 5 * 60 * 1000);
    const fifteenMinutesAfter = new Date(start.getTime() + 15 * 60 * 1000);
  
    if (now >= fiveMinutesBefore && now <= fifteenMinutesAfter) {
      console.log(`Starting test with ID: ${testId}`);
      router.push("/test");
  
      // Mark test as completed and save to localStorage
      const updatedCompletedTests = [...completedTests, testId];
      setCompletedTests(updatedCompletedTests);
      localStorage.setItem("completedTests", JSON.stringify(updatedCompletedTests));
    } else {
      alert("The test can only be started 5 minutes before or 15 minutes after the scheduled start time.");
    }
  };
  

  const filteredTests = availableTests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "All" || test.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  // const getDifficultyTag = (difficulty) => {
  //   switch (difficulty.toLowerCase()) {
  //     case "beginner":
  //       return "text-blue-700 bg-blue-50";
  //     case "intermediate":
  //       return "text-slate-700 bg-slate-50";
  //     case "advanced":
  //       return "text-gray-700 bg-gray-50";
  //     default:
  //       return "text-slate-700 bg-slate-50";
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="mb-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <NotebookPen size={32} className="text-gray-900" />
            <h1 className="text-4xl font-semibold text-gray-900">
              Available Tests
            </h1>
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={logout}
              className="group flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
            >
              <LogOut className="w-5 h-5 group-hover:animate-pulse" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <p className="text-lg text-gray-600">
          Select an assessment from the available options below
        </p>

        <div className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search tests..."
                className="w-full pl-12 pr-6 py-3.5 text-lg border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div className="flex gap-3 flex-wrap">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-6 py-3.5 text-base border rounded-lg
                    ${
                      selectedDifficulty === difficulty
                        ? "border-gray-400 bg-gray-100 text-gray-700"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {difficulty}
                </button>
              ))}
            </div> */}
          </div>

          {filteredTests.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg flex items-center gap-4">
              <AlertCircle className="h-6 w-6 text-gray-400" />
              <p className="text-gray-600 text-base">
                No tests found matching your search criteria. Try adjusting your
                filters.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              <div className="p-8 border-b border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-medium text-gray-900 leading-tight">
                    {test.title}
                  </h2>
                  {/* <span
                    className={`inline-block px-4 py-2 text-sm font-medium rounded-full ${getDifficultyTag(
                      test.difficulty
                    )}`}
                  >
                    {test.difficulty}
                  </span> */}
                </div>
                <div className="grid grid-cols-2 gap-6 text-base">
                  <div className="flex items-center gap-3 text-gray-500">
                    <BookOpen className="h-5 w-5" />
                    <span>{test.subject}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Clock className="h-5 w-5" />
                    <span>{test.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50">
                <div className="mb-4 text-base text-gray-600">
                  <span className="font-medium">Teacher/Mentor: </span>
                  <span>{test.teacher}</span>
                </div>
                <div className="mb-4 text-base text-gray-600">
                  <span className="font-medium">Start Time : </span>
                  <span>{test.startTime}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-base text-gray-600">
                  <span>Total Questions</span>
                  <span className="font-medium text-lg">{test.questions}</span>
                </div>
                <button
                  onClick={() => handleStartTest(test.id)}
                  disabled={completedTests.includes(test.id)}
                  className={`w-full px-6 py-4 text-base font-medium rounded-lg transition ${
                    completedTests.includes(test.id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {completedTests.includes(test.id) ? "Done" : "Start Exam"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentTestPage;

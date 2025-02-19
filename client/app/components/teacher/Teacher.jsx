"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  ClipboardList,
  BookOpen,
  BarChart2,
  MessageSquare,
  Calendar,
  LogOut,
  Settings,
  Plus,
  X,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import GenerateQuestion from "../questiongeneration/GenerateQuestion";

// Mock data for dashboard
const teacherData = {
  name: "Sarah Johnson",
  subject: "Computer Science",
  subjects: [
    "Computer Science",
    "Web Development",
    "Programming",
    "Data Structures",
    "Algorithms",
  ],
  classes: [
    {
      id: 1,
      name: "CS 101",
      students: 25,
      pendingAssignments: 12,
    },
    {
      id: 2,
      name: "Web Development",
      students: 20,
      pendingAssignments: 8,
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "Assignment",
      description: "Graded Java Programming Assignment",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Message",
      description: "Received query from student about exam",
      time: "4 hours ago",
    },
  ],
};

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [weightage, setWeightage] = useState("");

  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassStudents, setNewClassStudents] = useState("");
  const [classes, setClasses] = useState(teacherData.classes);

  const [recentActivity, setRecentActivity] = useState(teacherData.recentActivity);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleAddClass = (e) => {
    e.preventDefault();

    // Create a new class object
    const newClass = {
      id: classes.length + 1,
      name: newClassName,
      students: parseInt(newClassStudents),
      pendingAssignments: 0, // Default value for new classes
    };

    // Add the new class to the list
    setClasses([newClass, ...classes]);

    // Close the modal and reset form
    setNewClassName("");
    setNewClassStudents("");
    setShowAddClassModal(false);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const selectedClassName = teacherData.classes.find(
      (cls) => cls.id === parseInt(selectedClass)
    )?.name;

    // Create new question object
    const newQuestion = {
      id: questions.length + 1,
      question,
      subject: selectedSubject,
      className: selectedClassName,
      classId: parseInt(selectedClass),
      questionType: selectedQuestionType, // Store the question type (MCQ/Descriptive)
      weightage: parseInt(weightage), // Store the weightage
      date: new Date().toISOString(),
      status: "Pending",
      responses: 0,
    };

    // Add question to questions list
    setQuestions([newQuestion, ...questions]);

    // Add to recent activity
    const newActivity = {
      id: recentActivity.length + 1,
      type: "Question",
      description: `Added new question to ${selectedClassName}`,
      time: "Just now",
    };
    setRecentActivity([newActivity, ...recentActivity]);

    // Reset form
    setQuestion("");
    setSelectedClass("");
    setSelectedSubject("");
    setSelectedQuestionType(""); // Reset the question type
    setWeightage(""); // Reset the weightage
    setShowQuestionModal(false);
  };

  const DashboardCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-all">
      <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );

  const SidebarMenuItem = ({ icon: Icon, label, section, onClick, isLogout = false }) => (
    <button
      onClick={onClick || (() => setActiveSection(section))}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all 
      ${isLogout ? "text-red-600 hover:bg-red-100 hover:text-red-800" :
          activeSection === section ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-600"}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const renderMainContent = () => {
    if (activeSection === "tests") {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Questions & Assignments</h2>
            <button
              onClick={() => setShowQuestionModal(true)}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Question</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <div className="space-y-4">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="font-bold text-gray-800">{q.subject}</h1>
                        <h3 className="font-medium text-gray-800">{q.question}</h3>
                        <p className="text-sm text-gray-500">
                          Posted: {new Date(q.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs mb-2">
                          {q.status}
                        </span>
                        <span className="text-sm text-gray-500">{q.responses} responses</span>
                      </div>
                    </div>
                  </div>
                ))}
                {questions.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No questions added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => setShowQuestionModal(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Question</span>
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <DashboardCard
            icon={Users}
            title="Total Students"
            value={teacherData.classes.reduce(
              (sum, cls) => sum + cls.students,
              0
            )}
            color="text-blue-500"
          />
          <DashboardCard
            icon={ClipboardList}
            title="Pending Tests"
            value={teacherData.classes.reduce(
              (sum, cls) => sum + cls.pendingAssignments,
              0
            )}
            color="text-yellow-500"
          />
          <DashboardCard
            icon={BookOpen}
            title="Active Courses"
            value={teacherData.classes.length}
            color="text-green-500"
          />
          <DashboardCard
            icon={MessageSquare}
            title="Unread Messages"
            value={3}
            color="text-red-500"
          />
        </div>

        {/* Recent Activity & Classes */}
        <div className="grid grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center border-b last:border-b-0 pb-4 last:pb-0"
              >
                <div>
                  <h3 className="font-medium text-gray-800">{activity.description}</h3>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-gray-500 text-center py-4">No recent activities</p>
            )}
          </div>

          {/* Classes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Classes</h2>
            {classes.map((cls) => (
              <div key={cls.id} className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">{cls.name}</h3>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500">{cls.students} students</span>
                  <span className="text-sm text-gray-500">
                    {cls.pendingAssignments} assignments
                  </span>
                </div>
              </div>
            ))}
            {classes.length === 0 && (
              <p className="text-gray-500 text-center py-4">No classes available</p>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6">
        <div className="space-y-4">
          <SidebarMenuItem
            icon={GraduationCap}
            label="Dashboard"
            section="dashboard"
          />
          <SidebarMenuItem icon={ClipboardList} label="Tests" section="tests" />
          <SidebarMenuItem icon={BookOpen} label="Courses" section="courses" />
          <SidebarMenuItem icon={BarChart2} label="Analytics" section="analytics" />
          <SidebarMenuItem icon={MessageSquare} label="Messages" section="messages" />
          <SidebarMenuItem icon={Calendar} label="Schedule" section="schedule" />
          <SidebarMenuItem icon={Settings} label="Settings" section="settings" />
          <SidebarMenuItem icon={LogOut} label='Logout' onClick={handleLogout} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderMainContent()}</div>

      {/* Question Modal */}
      {showQuestionModal && (
        <GenerateQuestion />
      )}


    </div>
  );
};

export default TeacherDashboard;

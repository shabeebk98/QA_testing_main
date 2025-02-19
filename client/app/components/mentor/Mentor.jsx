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
import TestCreation from "../questiongeneration/TestCreation";

// Mock data for dashboard
const mentorData = {
  subject: "Computer Science",
  subjects: ["Computer Science", "Web Development", "Programming"],
  recentTests: [
    {
      id: 1,
      name: "Mid-term Assessment",
      date: "2025-01-15",
      submissions: 45,
      totalStudents: 50,
    },
    {
      id: 2,
      name: "Physics Quiz",
      date: "2025-01-10",
      submissions: 28,
      totalStudents: 30,
    },
    {
      id: 3,
      name: "Programming Test",
      date: "2025-01-05",
      submissions: 38,
      totalStudents: 40,
    },
  ],
  upcomingTests: [
    { id: 4, name: "Mathematics Final", date: "2025-01-20", enrolled: 55 },
    { id: 5, name: "Chemistry Lab Test", date: "2025-01-25", enrolled: 35 },
  ],
  recentActivity: [
    {
      id: 1,
      type: "Test",
      description: "Graded Mid-term Assessment",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Message",
      description: "Received query about upcoming test",
      time: "4 hours ago",
    },
  ],
};

const MentorDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showTestCreator, setShowTestCreator] = useState(false);
  const [tests, setTests] = useState(mentorData.recentTests);

  const [testData, setTestData] = useState({
    name: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
    description: "",
  });
  const [recentActivity, setRecentActivity] = useState(
    mentorData.recentActivity
  );

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

  const handleAddStudent = () =>{
    
  }

  const handleSubmitTest = (e) => {
    e.preventDefault();

    const newTest = {
      id: tests.length + 1,
      name: testData.name,
      date: testData.date,
      time: testData.time,
      submissions: 0, // Initially, no submissions
      totalStudents: 0, // Initially, no students enrolled
    };

    // Add new test to the tests state
    setTests([newTest, ...tests]);

    // Add to recent activity
    const newActivity = {
      id: recentActivity.length + 1,
      type: "Test",
      description: `Created new test: ${testData.name}`,
      time: "Just now",
    };
    setRecentActivity([newActivity, ...recentActivity]);

    // Reset form
    setTestData({
      name: "",
      date: "",
      time: "",
      duration: "",
      totalMarks: "",
      description: "",
    });
    setShowTestCreator(false);
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

  const SidebarMenuItem = ({ icon: Icon, label, section }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all 
        ${
          activeSection === section
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100 text-gray-600"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const renderMainContent = () => {
    if (activeSection === "tests") {
      return (
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Tests</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className="border-b py-3 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-700">{test.name}</p>
                    <p className="text-sm text-gray-500">Date: {test.date}</p>
                    <p className="text-sm text-gray-500">
                      Start time: {test.time}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {test.submissions}/{test.totalStudents} Submissions
                  </span>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleAddStudent(test.id)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Students
                  </button>
                </div>{" "}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection !== "dashboard") {
      return <div className="p-8">Section under development</div>;
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => setShowTestCreator(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Test</span>
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <DashboardCard
            icon={Users}
            title="Total Students"
            value="150"
            color="text-blue-500"
          />
          <DashboardCard
            icon={ClipboardList}
            title="Active Tests"
            value="3"
            color="text-yellow-500"
          />
          <DashboardCard
            icon={BookOpen}
            title="Completed Tests"
            value="12"
            color="text-green-500"
          />
          <DashboardCard
            icon={BarChart2}
            title="Average Score"
            value="78%"
            color="text-purple-500"
          />
        </div>

        {/* Recent Activity & Tests */}
        <div className="grid grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="border-b py-3 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-700">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {activity.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Tests */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Tests</h2>
            {mentorData.recentTests.map((test) => (
              <div
                key={test.id}
                className="border-b py-3 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-700">{test.name}</p>
                    <p className="text-sm text-gray-500">Date: {test.date}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {test.submissions}/{test.totalStudents} Submissions
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 space-y-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{mentorData.subject}</p>
          </div>
        </div>

        <nav className="space-y-2">
          <SidebarMenuItem
            icon={BarChart2}
            label="Dashboard"
            section="dashboard"
          />
          <SidebarMenuItem icon={Users} label="Students" section="students" />
          <SidebarMenuItem icon={ClipboardList} label="Tests" section="tests" />
          <SidebarMenuItem
            icon={BookOpen}
            label="Resources"
            section="resources"
          />
          <SidebarMenuItem
            icon={MessageSquare}
            label="Messages"
            section="messages"
          />
          <SidebarMenuItem
            icon={Calendar}
            label="Schedule"
            section="schedule"
          />
          <SidebarMenuItem
            icon={Settings}
            label="Settings"
            section="settings"
          />
        </nav>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        {renderMainContent()}

        {/* Test Creation Modal */}
        {showTestCreator && (
          <TestCreation setShowTestCreator={setShowTestCreator} handleSubmitTest={handleSubmitTest} />
          // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          //   <div className="bg-white rounded-lg p-6 w-2/3">
          //     <div className="flex justify-between items-center mb-4">
          //       <h2 className="text-xl font-semibold">Create New Test</h2>
          //       <button
          //         onClick={() => setShowTestCreator(false)}
          //         className="text-gray-500 hover:text-gray-700"
          //       >
          //         <X className="w-5 h-5" />
          //       </button>
          //     </div>

          //     <form onSubmit={handleSubmitTest}>
          //       <div className="space-y-4">
          //         <div>
          //           <label className="block text-gray-700 text-sm font-bold mb-2">
          //             Test Name
          //           </label>
          //           <input
          //             type="text"
          //             value={testData.name}
          //             onChange={(e) =>
          //               setTestData({ ...testData, name: e.target.value })
          //             }
          //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          //             required
          //           />
          //         </div>

          //         <div>
          //           <label className="block text-gray-700 text-sm font-bold mb-2">
          //             Date
          //           </label>
          //           <input
          //             type="date"
          //             value={testData.date}
          //             onChange={(e) =>
          //               setTestData({ ...testData, date: e.target.value })
          //             }
          //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          //             required
          //           />
          //         </div>

          //         <div>
          //           <label className="block text-gray-700 text-sm font-bold mb-2">
          //             Start Time
          //           </label>
          //           <input
          //             type="time"
          //             value={testData.time}
          //             onChange={(e) =>
          //               setTestData({ ...testData, time: e.target.value })
          //             }
          //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          //             required
          //           />
          //         </div>

          //         <div>
          //           <label className="block text-gray-700 text-sm font-bold mb-2">
          //             Duration (minutes)
          //           </label>
          //           <input
          //             type="number"
          //             value={testData.duration}
          //             onChange={(e) =>
          //               setTestData({ ...testData, duration: e.target.value })
          //             }
          //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          //             required
          //           />
          //         </div>

          //         <div>
          //           <label className="block text-gray-700 text-sm font-bold mb-2">
          //             Total Marks
          //           </label>
          //           <input
          //             type="number"
          //             value={testData.totalMarks}
          //             onChange={(e) =>
          //               setTestData({ ...testData, totalMarks: e.target.value })
          //             }
          //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          //             required
          //           />
          //         </div>

          //         <div>
          //           <label className="block text-gray-700 text-sm font-bold mb-2">
          //             Description
          //           </label>
          //           <textarea
          //             value={testData.description}
          //             onChange={(e) =>
          //               setTestData({
          //                 ...testData,
          //                 description: e.target.value,
          //               })
          //             }
          //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          //             rows="3"
          //             required
          //           />
          //         </div>
          //         <div className="mb-4">
          //           <label className="block text-gray-700 text-sm font-bold mb-2">
          //             Upload File
          //           </label>
          //           <input
          //             type="file"
          //             onChange={(e) => console.log(e.target.files[0])} // Handle file upload
          //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          //           />
          //         </div>
          //       </div>

          //       <div className="mt-6 flex justify-end space-x-3">
          //         <button
          //           type="button"
          //           onClick={() => setShowTestCreator(false)}
          //           className="px-4 py-2 text-gray-600 hover:text-gray-800"
          //         >
          //           Cancel
          //         </button>
          //         <button
          //           type="submit"
          //           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          //         >
          //           Create Test
          //         </button>
          //       </div>
          //     </form>
          //   </div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;

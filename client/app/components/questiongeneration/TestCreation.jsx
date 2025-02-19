'use client'
import React, { useState } from "react";
import { X } from "lucide-react";

const TestCreator = ({ setShowTestCreator, handleSubmitTest }) => {
  const [testData, setTestData] = useState({
    name: "",
    date: "",
    time: "",
    duration: "",
    totalMarks: "",
    description: "",
    file: null,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Test</h2>
          <button
            onClick={() => setShowTestCreator(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => handleSubmitTest(e, testData)}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={testData.name}
                onChange={(e) =>
                  setTestData({ ...testData, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                value={testData.date}
                onChange={(e) =>
                  setTestData({ ...testData, date: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={testData.time}
                onChange={(e) =>
                  setTestData({ ...testData, time: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={testData.duration}
                onChange={(e) =>
                  setTestData({ ...testData, duration: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Total Marks
              </label>
              <input
                type="number"
                value={testData.totalMarks}
                onChange={(e) =>
                  setTestData({ ...testData, totalMarks: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={testData.description}
                onChange={(e) =>
                  setTestData({
                    ...testData,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload File
              </label>
              <input
                type="file"
                onChange={(e) => console.log(e.target.files[0])} // Handle file upload
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowTestCreator(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestCreator;

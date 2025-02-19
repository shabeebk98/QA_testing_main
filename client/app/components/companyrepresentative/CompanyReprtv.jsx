'use client'
import React, { useState } from 'react';

// Sample list of colleges (you can expand or fetch from an API)
const collegeList = [
  'Harvard University',
  'Stanford University',
  'MIT',
  'California Institute of Technology',
  'Princeton University',
  'Yale University',
  'Columbia University',
  'University of Chicago',
  'University of Pennsylvania',
  'Johns Hopkins University'
];

const CompanyReprtv = () => {
  // State to manage selected colleges and their cutoff marks
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [collegeCutoffs, setCollegeCutoffs] = useState({});

  // Handler for college checkbox selection
  const handleCollegeSelect = (college) => {
    setSelectedColleges(prev =>
      prev.includes(college)
        ? prev.filter(c => c !== college)
        : [...prev, college]
    );
  };

  // Handler for cutoff mark input
  const handleCutoffChange = (college, cutoff) => {
    setCollegeCutoffs(prev => ({
      ...prev,
      [college]: cutoff
    }));
  };

  // Handler to save selected colleges and cutoffs
  const handleSaveSelections = () => {
    console.log('Selected Colleges:', selectedColleges);
    console.log('College Cutoffs:', collegeCutoffs);
    // Here you would typically send this data to a backend or perform further processing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight flex-grow text-center">
            College Selection & Cutoff Management
          </h1>
          <a href='/'>
            <button
              className="px-4 py-2 bg-white text-blue-600 rounded-md font-semibold 
            hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 
            transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </a>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* College Selection Checkboxes */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Available Colleges
              </h2>
              {collegeList.map(college => (
                <div key={college} className="flex items-center">
                  <input
                    type="checkbox"
                    id={college}
                    checked={selectedColleges.includes(college)}
                    onChange={() => handleCollegeSelect(college)}
                    className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 
                      transition duration-200 ease-in-out transform hover:scale-110"
                  />
                  <label
                    htmlFor={college}
                    className="text-gray-700 font-medium hover:text-blue-600 transition duration-200"
                  >
                    {college}
                  </label>
                </div>
              ))}
            </div>

            {/* Cutoff Marks Input */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Set Cutoff Marks
              </h2>
              {selectedColleges.map(college => (
                <div key={college} className="flex items-center space-x-4">
                  <label
                    htmlFor={`cutoff-${college}`}
                    className="text-gray-700 font-medium w-1/2 truncate"
                  >
                    {college}
                  </label>
                  <input
                    type="number"
                    id={`cutoff-${college}`}
                    value={collegeCutoffs[college] || ''}
                    onChange={(e) => handleCutoffChange(college, e.target.value)}
                    placeholder="Cutoff Mark"
                    className="w-1/2 px-3 py-2 border-2 border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition duration-200 ease-in-out"
                    min="0"
                    max="100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSaveSelections}
              disabled={selectedColleges.length === 0}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold uppercase 
              tracking-wider shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2 
              transition duration-300 ease-in-out transform hover:-translate-y-1 
              disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              Save Selections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyReprtv;
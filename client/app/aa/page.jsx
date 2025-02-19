// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BookOpen, Loader2, AlertTriangle, FolderOpen } from "lucide-react";

// const Page = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/show-questions");

//         // Store unique questions using a Map
//         setQuestions((prevQuestions) => {
//           const questionMap = new Map(prevQuestions.map(q => [q._id, q]));
//           response.data.questions.forEach(q => questionMap.set(q._id, q));
//           return Array.from(questionMap.values());
//         });

//       } catch (err) {
//         setError("Failed to load questions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();

//     // Fetch new data every 5 seconds (optional)
//     const interval = setInterval(fetchQuestions, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Group questions by subject
//   const groupedQuestions = questions.reduce((acc, question) => {
//     if (!acc[question.subject]) {
//       acc[question.subject] = [];
//     }
//     acc[question.subject].push(question);
//     return acc;
//   }, {});

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-lg flex items-center space-x-2">
//           <AlertTriangle className="w-6 h-6" />
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-xl mt-10">
//       <div className="flex items-center space-x-2 mb-6">
//         <BookOpen className="w-8 h-8 text-blue-700" />
//         <h2 className="text-2xl font-bold text-gray-800">Question List</h2>
//       </div>

//       {/* Render questions grouped by subject */}
//       {Object.entries(groupedQuestions).map(([subject, questions]) => (
//         <div key={subject} className="mb-8">
//           <div className="flex items-center space-x-2 mb-4">
//             <FolderOpen className="w-6 h-6 text-green-600" />
//             <h3 className="text-xl font-semibold text-gray-800">{subject}</h3>
//           </div>
//           <ul className="space-y-6">
//             {questions.map((question) => (
//               <li
//                 key={question._id}
//                 className="p-5 bg-white rounded-lg shadow-md border border-gray-200"
//               >
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {question.question_text}
//                 </h3>
//                 {question.question_type === "mcq" && (
//                   <ul className="mt-3 space-y-2">
//                     {question.options.map((option, index) => (
//                       <li
//                         key={index}
//                         className="p-2 bg-gray-100 rounded-md border border-gray-300"
//                       >
//                         {option}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 {question.question_type === "descriptive" && (
//                   <p className="mt-3 text-gray-700">
//                     <span className="font-semibold">Keywords:</span> {" "}
//                     {question.ideal_keywords.join(", ")}
//                   </p>
//                 )}
//                 <p className="mt-2 text-sm text-gray-500">
//                   <span className="font-semibold">Weightage:</span> {question.weightage}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Page;
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Loader2, AlertTriangle, FolderOpen, ChevronDown } from "lucide-react";

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(""); // Selected category

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/show-questions");

        // Store unique questions using a Map
        setQuestions((prevQuestions) => {
          const questionMap = new Map(prevQuestions.map(q => [q._id, q]));
          response.data.questions.forEach(q => questionMap.set(q._id, q));
          return Array.from(questionMap.values());
        });

      } catch (err) {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    // Fetch new data every 5 seconds (optional)
    const interval = setInterval(fetchQuestions, 5000);

    return () => clearInterval(interval);
  }, []);

  // Group questions by subject
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.subject]) {
      acc[question.subject] = [];
    }
    acc[question.subject].push(question);
    return acc;
  }, {});

  // Get unique subjects for dropdown
  const subjects = Object.keys(groupedQuestions);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-lg flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-xl mt-10">
      <div className="flex items-center space-x-2 mb-6">
        <BookOpen className="w-8 h-8 text-blue-700" />
        <h2 className="text-2xl font-bold text-gray-800">Question List</h2>
      </div>

      {/* Dropdown for selecting category */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Select Subject:</label>
        <div className="relative">
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 bg-white appearance-none"
            onChange={(e) => setSelectedSubject(e.target.value)}
            value={selectedSubject}
          >
            <option value="">-- Select a Subject --</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Display selected category */}
      {selectedSubject && groupedQuestions[selectedSubject] && (
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <FolderOpen className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">{selectedSubject}</h3>
          </div>
          <ul className="space-y-6">
            {groupedQuestions[selectedSubject].map((question) => (
              <li
                key={question._id}
                className="p-5 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {question.question_text}
                </h3>
                {question.question_type === "mcq" && (
                  <ul className="mt-3 space-y-2">
                    {question.options.map((option, index) => (
                      <li
                        key={index}
                        className="p-2 bg-gray-100 rounded-md border border-gray-300"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
                {question.question_type === "descriptive" && (
                  <p className="mt-3 text-gray-700">
                    <span className="font-semibold">Keywords:</span> {" "}
                    {question.ideal_keywords.join(", ")}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-semibold">Weightage:</span> {question.weightage}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;

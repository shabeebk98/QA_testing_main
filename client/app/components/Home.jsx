export default function Home() {
    return (
      <div className="h-full w-full relative">
        <div
          className="mainbg absolute inset-0 z-0 
     bg-cover bg-center 
     filter brightness-50 blur-sm"
        ></div>
        <div className="relative z-10 h-full w-full">
          {/* Header Section */}
          <header className="h-20 bg-blue-900 bg-opacity-70 flex items-center justify-between px-4 md:px-10 shadow-lg">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <h1 className="text-white font-bold text-2xl md:text-3xl">
                QA TESTING
              </h1>
            </div>
            <nav className="flex space-x-4">
              <a
                href="/login"
                className="text-white hover:text-blue-200 transition-colors"
              >
                <button className="bg-transparent border border-white text-white font-semibold text-base md:text-lg py-2 px-6 rounded-full hover:bg-white hover:text-blue-900 transition duration-300">
                  Login
                </button>
              </a>
              <a href="/signup">
                <button className="bg-white text-blue-900 font-semibold text-base md:text-lg py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
                  Signup
                </button>
              </a>
            </nav>
          </header>
  
          {/* Main Content Section */}
          <main className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Content */}
              <div className="space-y-6">
                <div className="bg-blue-00 bg-opacity-70 p-6 rounded-lg shadow-xl">
                  <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                    Effortless Online Testing
                    <br />
                    for Modern Education
                  </h2>
                  <p className="text-xl font-semibold text-white opacity-80 leading-relaxed">
                    A comprehensive platform designed to streamline assessment
                    processes, providing powerful tools for educators, students,
                    and recruiters.
                  </p>
                </div>
  
                {/* Features Section */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm border border-white border-opacity-30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="font-semibold text-white mb-2 text-xl">
                      Flexible Creation
                    </h3>
                    <p className="text-white opacity-70">
                      Easily design custom tests with various question types.
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm border border-white border-opacity-30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="font-semibold text-white mb-2 text-xl">
                      Real-time Monitoring
                    </h3>
                    <p className="text-white opacity-70">
                      Advanced proctoring mechanisms.
                    </p>
                  </div>
                </div>
  
                {/* Additional Features */}
                <div className="bg-blue-00 bg-opacity-70 p-6 rounded-lg">
                  <h3 className="text-white text-2xl font-bold mb-4">
                    Key Features:
                  </h3>
                  <ul className="text-white space-y-2 list-disc list-inside">
                    <li>Advanced Question Bank</li>
                    <li>Automated Evaluation</li>
                    <li>Secure Authentication</li>
                    <li>Comprehensive Analytics</li>
                  </ul>
                </div>
              </div>
  
              {/* Right Side - Action Card */}
              {/* <div className="flex items-center justify-center">
       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all">
        <h3 className="text-2xl font-bold text-center text-blue-900 mb-6">
         Get Started Now
        </h3>
        <div className="space-y-4">
         <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
          Create Account
         </button>
         <div className="flex items-center justify-center space-x-2">
          <hr className="flex-grow border-blue-200" />
          <span className="text-sm text-blue-500">or</span>
          <hr className="flex-grow border-blue-200" />
         </div>
         <button className="w-full py-3 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
          Learn More
         </button>
        </div>
       </div>
      </div> */}
            </div>
          </main>
        </div>
      </div>
    );
  }
  
import React, { useState, useEffect, useRef } from 'react';

const INITIAL_DATA = [
  {
    problem: "How can I sort an array of objects in JavaScript by a specific 'age' property?",
    solution_1: "You can use the built-in `Array.prototype.sort()` method combined with a comparator function. Here is a direct example:\n\nconst data = [{name: 'Alice', age: 30}, {name: 'Bob', age: 25}];\ndata.sort((a, b) => a.age - b.age);\n\nThis sorts the array in-place, modifying the original data.",
    solution_2: "While `sort()` is the standard method, it mutates the original array. If you need an immutable approach, which is common in React, you should spread the array first before sorting:\n\nconst data = [{name: 'Alice', age: 30}, {name: 'Bob', age: 25}];\nconst sorted = [...data].sort((a, b) => a.age - b.age);\n\nThis is generally safer.",
    judge: {
      solution_1_score: 7,
      solution_2_score: 9,
      solution_1_reasoning: "Solution 1 works perfectly but fails to mention that the array is mutated in place, which is a critical detail.",
      solution_2_reasoning: "Solution 2 is excellent. It addresses the mutation issue and provides a modern, immutable approach that is widely accepted as best practice."
    }
  }
];

export default function App() {
  const [messages, setMessages] = useState(INITIAL_DATA);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Simulate sending a message and getting a mocked response
    const newMessage = {
      problem: inputValue,
      solution_1: "Simulated response for Solution 1 based on your prompt '" + inputValue + "'. This would typically be a detailed markdown explanation.",
      solution_2: "Simulated response for Solution 2 based on your prompt '" + inputValue + "'. This model might take a slightly different approach.",
      judge: {
        solution_1_score: Math.floor(Math.random() * 5) + 5,
        solution_2_score: Math.floor(Math.random() * 5) + 5,
        solution_1_reasoning: "The judge would provide reasoning here evaluating the accuracy and helpfulness of Solution 1.",
        solution_2_reasoning: "The judge would provide comparative feedback here for Solution 2 outlining its strengths and weaknesses."
      }
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9F9F9] font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-10 bg-[#F9F9F9]/80 backdrop-blur-md border-b border-gray-200/50 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center text-white font-bold tracking-tighter">
            AI
          </div>
          <h1 className="text-xl tracking-tight font-medium text-gray-800">Battle Arena</h1>
        </div>
        <div className="text-sm text-gray-500 font-medium px-4 py-1.5 bg-gray-100 rounded-full">
          Desktop View
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto w-full flex flex-col items-center pb-32">
        <div className="w-full max-w-6xl px-4 py-12 flex flex-col gap-24">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-6">
              <h2 className="text-4xl font-light text-gray-400">What would you like to evaluate today?</h2>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
                
                {/* User Problem */}
                <div className="self-end max-w-3xl flex flex-col gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">You</span>
                  <div className="bg-white px-8 py-6 rounded-2xl rounded-tr-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100/50 text-lg leading-relaxed text-gray-800">
                    {msg.problem}
                  </div>
                </div>

                {/* AI Responses & Judge */}
                <div className="w-full flex flex-col gap-6">
                  
                  {/* Solutions Side-by-Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    {/* Solution 1 */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-6 w-6 rounded flex items-center justify-center bg-blue-50 text-blue-600 text-xs font-bold">1</div>
                        <h3 className="font-medium text-gray-500 tracking-wide text-sm uppercase">Model Alpha</h3>
                      </div>
                      <div className="whitespace-pre-wrap text-gray-700 leading-loose text-base font-serif">
                        {msg.solution_1}
                      </div>
                    </div>

                    {/* Solution 2 */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 transition-all hover:shadow-md">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-6 w-6 rounded flex items-center justify-center bg-purple-50 text-purple-600 text-xs font-bold">2</div>
                        <h3 className="font-medium text-gray-500 tracking-wide text-sm uppercase">Model Beta</h3>
                      </div>
                      <div className="whitespace-pre-wrap text-gray-700 leading-loose text-base font-serif">
                        {msg.solution_2}
                      </div>
                    </div>
                  </div>

                  {/* Judge Recommendation */}
                  <div className="w-full mt-4 bg-gray-50/80 rounded-3xl p-8 border border-gray-200/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-8">
                       <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                      <h3 className="font-medium text-gray-800 tracking-wide text-sm uppercase">Judge Recommendation</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                       {/* Judge on Solution 1 */}
                       <div className="flex flex-col gap-3 relative">
                          <div className="absolute -left-4 top-0 bottom-0 w-px bg-gray-200/50"></div>
                          <div className="flex items-baseline gap-2">
                             <span className="text-3xl font-light text-gray-800">{msg.judge.solution_1_score}</span>
                             <span className="text-sm text-gray-400">/ 10</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {msg.judge.solution_1_reasoning}
                          </p>
                       </div>

                       {/* Judge on Solution 2 */}
                       <div className="flex flex-col gap-3 relative">
                          <div className="absolute -left-4 top-0 bottom-0 w-px bg-gray-200/50"></div>
                          <div className="flex items-baseline gap-2">
                             <span className="text-3xl font-light text-gray-800">{msg.judge.solution_2_score}</span>
                             <span className="text-sm text-gray-400">/ 10</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-sm">
                            {msg.judge.solution_2_reasoning}
                          </p>
                       </div>
                    </div>
                  </div>

                </div>
              </div>
            ))
          }
          <div ref={bottomRef} className="h-4" />
        </div>
      </main>

      {/* Input Area */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9] to-transparent pt-12 pb-8 px-4 w-full flex justify-center pointer-events-none">
        <div className="w-full max-w-4xl pointer-events-auto">
          <form 
            onSubmit={handleSubmit}
            className="relative flex items-center bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200/60 transition-shadow focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl overflow-hidden"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question to both models..."
              className="w-full bg-transparent px-6 py-5 text-gray-800 outline-none placeholder:text-gray-400 text-lg"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-3 p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </form>
          <div className="text-center mt-3 text-xs text-gray-400">
            Compare AI model performances with the Battle Arena Judge.
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import UserMessage from '../components/UserMessage';
import SolutionCard from '../components/SolutionCard';
import JudgeRecommendation from '../components/JudgeRecommendation';
import ChatInput from '../components/ChatInput';
import { mockData } from '../data/mockData';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (text) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Backend returned an error");
      }
      
      const newMessage = {
        id: Date.now(),
        problem: data.problem || text,
        solution_1: data.solution_1,
        solution_2: data.solution_2,
        judge: data.judge
      };
      
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Error fetching from backend:", error);
      alert(`AI Request Failed: ${error.message}\n(This could be due to API rate limits or high demand)`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-md">
              AI
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Battle Arena
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col pt-8 pb-32">
        {messages.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <span className="text-4xl">⚔️</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to AI Battle Arena</h2>
            <p className="text-lg text-slate-500 max-w-lg mb-8">
              Ask a question and see two different AI models compete to give you the best answer. Our impartial judge will analyze and recommend the winner.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {messages.map((msg) => {
              const isSolution1Winner = msg.judge.solution_1_score > msg.judge.solution_2_score;
              const isSolution2Winner = msg.judge.solution_2_score > msg.judge.solution_1_score;
              const finalRecommendation = isSolution1Winner
                ? "Solution 1 is better because it received a higher score from the judge."
                : isSolution2Winner
                  ? "Solution 2 is better because it received a higher score from the judge."
                  : "Both solutions performed equally well according to the judge.";

              return (
                <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <UserMessage message={msg.problem} />
                  
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div className="flex items-center gap-3 mb-8">
                       <span className="bg-purple-100 text-purple-700 p-2 rounded-lg text-sm">🤖</span>
                       <h3 className="font-bold text-slate-700">AI Responses</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
                      <SolutionCard
                        title="Mistral AI"
                        content={msg.solution_1}
                        isWinner={isSolution1Winner}
                        score={msg.judge.solution_1_score}
                        reasoning={msg.judge.solution_1_reasoning}
                      />
                      <SolutionCard
                        title="Cohere AI"
                        content={msg.solution_2}
                        isWinner={isSolution2Winner}
                        score={msg.judge.solution_2_score}
                        reasoning={msg.judge.solution_2_reasoning}
                      />
                    </div>
                    
                    <JudgeRecommendation recommendation={finalRecommendation} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {loading && (
          <div className="flex justify-center mt-8">
            <span className="text-indigo-600 font-semibold animate-pulse">Wait, analyzing models...</span>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 w-full z-20">
         <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import UserMessage from '../components/UserMessage';
import SolutionCard from '../components/SolutionCard';
import JudgeRecommendation from '../components/JudgeRecommendation';
import ChatInput from '../components/ChatInput';
import { mockData } from '../data/mockData';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    // In a real app, you would fetch from an API here.
    // We are simulating the response using the mock data.
    const newMessage = {
      id: Date.now(),
      problem: text,
      ...mockData
    };
    
    setMessages([...messages, newMessage]);
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
                        title="Model Alpha"
                        content={msg.solution_1}
                        isWinner={isSolution1Winner}
                        score={msg.judge.solution_1_score}
                        reasoning={msg.judge.solution_1_reasoning}
                      />
                      <SolutionCard
                        title="Model Beta"
                        content={msg.solution_2}
                        isWinner={isSolution2Winner}
                        score={msg.judge.solution_2_score}
                        reasoning={msg.judge.solution_2_reasoning}
                      />
                    </div>
                    
                    <JudgeRecommendation recommendation={msg.judge.final_recommendation} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <div className="fixed bottom-0 w-full z-20">
         <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;

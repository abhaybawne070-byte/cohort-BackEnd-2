import React from 'react';

const SolutionCard = ({ title, content, isWinner, score, reasoning }) => {
  return (
    <div className={`relative flex flex-col p-6 rounded-3xl bg-white shadow-lg border transition-all duration-300 ${isWinner ? 'border-indigo-500 ring-2 ring-indigo-100 shadow-indigo-100/50' : 'border-slate-100'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold text-lg ${isWinner ? 'text-indigo-700' : 'text-slate-700'}`}>{title}</h3>
        {isWinner && (
           <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
             Winner
           </span>
        )}
      </div>

      <div className="flex-grow bg-slate-50 p-4 rounded-2xl mb-4 text-slate-600 border border-slate-100/50">
        <p className="whitespace-pre-wrap">{content}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-2">
           <span className="text-sm font-medium text-slate-500">Judge Score</span>
           <span className={`text-xl font-bold ${isWinner ? 'text-indigo-600' : 'text-slate-600'}`}>{score}/10</span>
        </div>
        <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl italic border border-slate-100/50">
          "{reasoning}"
        </p>
      </div>
    </div>
  );
};

export default SolutionCard;

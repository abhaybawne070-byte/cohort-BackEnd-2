import React from 'react';

const JudgeRecommendation = ({ recommendation }) => {
  return (
    <div className="w-full mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 shadow-sm border border-indigo-100/50">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          ⚖️
        </div>
        <h3 className="font-semibold text-lg text-indigo-900">Final Judge Verdict</h3>
      </div>
      <p className="text-indigo-800/80 leading-relaxed font-medium pl-11">
        {recommendation}
      </p>
    </div>
  );
};

export default JudgeRecommendation;

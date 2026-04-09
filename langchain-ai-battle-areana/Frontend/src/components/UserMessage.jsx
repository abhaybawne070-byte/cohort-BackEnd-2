import React from 'react';

const UserMessage = ({ message }) => {
  return (
    <div className="flex justify-end w-full mb-8">
      <div className="max-w-2xl bg-indigo-600 text-white px-6 py-4 rounded-3xl rounded-tr-sm shadow-md">
        <p className="text-lg leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default UserMessage;

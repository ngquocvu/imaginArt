import React from 'react';
const BackgroundBlob = () => {
  return (
    <div className="absolute w-full max-w-lg pt-20 -z-30 animate-pulse mt-20">
      <div className="absolute top-0 -left-4 w-80 h-80 bg-blue-800 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-80 h-80 bg-cyan-800 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2s"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-800 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4s"></div>
    </div>
  );
};

export default BackgroundBlob;

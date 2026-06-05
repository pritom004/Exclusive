import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans">
      {/* Spinner: 
        - border-gray-100 creates the light track
        - border-t-[#DB4444] adds your brand's specific red accent
        - animate-spin handles the rotation automatically
      */}
      <div className="w-16 h-16 border-[6px] border-gray-100 border-t-[#DB4444] rounded-full animate-spin"></div>
      
      <h2 className="mt-6 mb-2 text-2xl font-bold tracking-widest text-black">
        Exclusive
      </h2>
      
      <p className="text-sm text-[#7D8184]">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
import React from "react";

export default function Loader() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        {/* <div className="w-24 h-24 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div> */}

        {/* Inner pulse circle */}
        {/* <div className="absolute w-14 h-14 bg-blue-400 rounded-full animate-ping opacity-30"></div> */}

        {/* Center solid circle */}
        <div className="absolute w-10 h-10 bg-blue-600 rounded-full shadow-lg"></div>

        {/* Water ripple effect */}
        {/* <div className="absolute w-32 h-32 border-2 border-blue-300 rounded-full animate-[ping_2s_linear_infinite] opacity-20"></div> */}
      </div>
    </div>
  );
}

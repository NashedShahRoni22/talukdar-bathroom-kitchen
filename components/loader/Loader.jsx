import React from "react";

export default function Loader() {
  return (
    <div className="absolute z-50 h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-stone-100 dark:from-brand-navy dark:via-[#0a0f2e] dark:to-[#11193a]">
      <div className="relative flex flex-col items-center justify-center gap-6">
        {/* Luxury animated spinner */}
        <div className="relative w-20 h-20">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-gold border-r-brand-gold animate-spin" />
          
          {/* Middle ring */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-brand-gold/70 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.8s' }} />
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-brand-gold/30 to-transparent animate-pulse" />
          
          {/* Center accent */}
          <div className="absolute inset-6 rounded-full bg-brand-gold/40" />
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-brand-pale tracking-wide">Loading</h3>
          <p className="text-xs text-slate-500 dark:text-[#9fa8cc] mt-1">Please wait...</p>
        </div>
      </div>
    </div>
  );
}

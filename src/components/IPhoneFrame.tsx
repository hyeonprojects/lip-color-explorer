import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  isFrameMode: boolean;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  children,
  isFrameMode,
}) => {
  if (!isFrameMode) {
    // Standard responsive container mode
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-[calc(1rem+env(safe-area-inset-bottom))] min-h-screen">
        {children}
      </div>
    );
  }

  // Centered 390px iPhone Frame Mode on Desktop
  return (
    <div className="min-h-screen py-6 px-4 flex flex-col items-center justify-center bg-[#ECEBE8]">
      {/* Desktop Frame Container */}
      <div className="relative w-full max-w-[390px] min-h-[820px] max-h-[920px] bg-[#FBFBFA] rounded-[48px] border-[10px] border-[#1E1E1E] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col transition-all duration-300">
        
        {/* iPhone Status Bar / Dynamic Island Header */}
        <div className="sticky top-0 z-30 bg-[#FBFBFA]/95 backdrop-blur-md px-6 pt-3 pb-1 flex items-center justify-between text-black select-none shrink-0 border-b border-black/5">
          {/* Time */}
          <span className="text-[12px] font-bold tracking-tight">09:41</span>

          {/* Dynamic Island Pill */}
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-1.5 gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E26A74] animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-blue-400" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1.5 text-black">
            <Signal className="w-3.5 h-3.5 fill-current" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Scrollable Mobile Viewport */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="py-2 bg-[#FBFBFA] flex justify-center shrink-0 border-t border-black/5">
          <div className="w-32 h-1 bg-[#1E1E1E]/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};

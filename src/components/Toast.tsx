import React from 'react';
import { ToastMessage } from '../types/lip';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  toast: ToastMessage | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 mx-auto w-fit z-[100] mb-[env(safe-area-inset-bottom)] pointer-events-none px-4">
      <div className="px-4 py-2.5 bg-[#1E1E1E]/90 backdrop-blur-md text-white text-[12px] font-medium rounded-full shadow-xl flex items-center gap-2 animate-slide-up">
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-[#E26A74] shrink-0" />
        )}
        <span>{toast.text}</span>
      </div>
    </div>
  );
};

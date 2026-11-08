import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types/restaurant';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-2xl border backdrop-blur-md text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200 ${
              isError
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
                : isSuccess
                ? 'bg-[#0a2618]/95 border-[#d4af37]/60 text-[#fdfaf3]'
                : 'bg-[#07190f]/95 border-sky-500/40 text-sky-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isError ? (
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />
              )}
              <span className="leading-snug">{toast.text}</span>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

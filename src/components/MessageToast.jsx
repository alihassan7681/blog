import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const MessageToast = () => {
  const { message } = useAuth();

  if (!message.text) return null;

  const bgColor = message.type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const borderColor = message.type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`${bgColor} border ${borderColor} text-white px-6 py-4 rounded-lg shadow-lg max-w-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {message.type === 'success' ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageToast;
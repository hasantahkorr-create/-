
import React from 'react';
import { Message } from '../types';
import { TEACHER_PROFILE } from '../constants';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex w-full mb-6 ${isModel ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
        {isModel && (
          <div className="flex-shrink-0 ml-3 self-end mb-1">
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200">
              <img 
                src={TEACHER_PROFILE.imageUrl} 
                alt={TEACHER_PROFILE.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/teacher/100';
                }}
              />
            </div>
          </div>
        )}
        <div 
          className={`relative p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isModel 
              ? 'bg-white text-slate-800 rounded-tr-none border border-slate-100' 
              : 'bg-blue-600 text-white rounded-tl-none shadow-blue-100'
          }`}
        >
          <div className="whitespace-pre-wrap">{message.text}</div>
          <div className={`text-[9px] mt-2 opacity-60 text-left ${isModel ? 'text-slate-400' : 'text-blue-100'}`}>
            {message.timestamp.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        {!isModel && (
          <div className="flex-shrink-0 mr-3 self-end mb-1">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white shadow-md flex items-center justify-center text-blue-700 font-bold text-xs">
               شما
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

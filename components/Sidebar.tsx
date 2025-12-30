
import React from 'react';
import { AppMode } from '../types';
import { TEACHER_PROFILE } from '../constants';

interface SidebarProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, onModeChange }) => {
  const menuItems = [
    { mode: AppMode.CHAT, label: 'گفتگو با آقای ته‌کر', icon: '💬' },
    { mode: AppMode.QUIZ, label: 'آزمون آنلاین', icon: '✍️' },
    { mode: AppMode.HOMEWORK, label: 'بخش تکالیف', icon: '📚' },
    { mode: AppMode.GAME, label: 'بازی و مسابقه', icon: '🎮' },
  ];

  return (
    <div className="hidden md:flex flex-col w-72 bg-white border-l border-slate-200 h-full p-6 shadow-xl z-20">
      <div className="flex flex-col items-center mb-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
            <img 
              src={TEACHER_PROFILE.imageUrl} 
              className="w-full h-full object-cover object-top"
              alt={TEACHER_PROFILE.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/teacher/200';
              }}
            />
          </div>
          <div className="absolute bottom-2 right-4 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
        </div>
        
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold text-slate-800 leading-none">{TEACHER_PROFILE.name}</h2>
          <p className="text-[11px] text-slate-400 mt-2 font-medium tracking-wide uppercase">
            {TEACHER_PROFILE.school}
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100 shadow-sm">
            {TEACHER_PROFILE.grade}
          </span>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full border border-indigo-100 shadow-sm">
            {TEACHER_PROFILE.class}
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.mode}
            onClick={() => onModeChange(item.mode)}
            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 ${
              currentMode === item.mode 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1 scale-[1.02]' 
                : 'text-slate-600 hover:bg-slate-50 hover:translate-x-1'
            }`}
          >
            <span className="text-xl ml-3">{item.icon}</span>
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-4 flex items-center gap-3 border border-slate-100">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping absolute"></div>
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full relative"></div>
          </div>
          <p className="text-[10px] text-slate-600 font-bold">کلاس ششم الف در جریان است</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


import React, { useState, useEffect, useRef } from 'react';
import { Message, AppMode } from './types';
import { geminiService } from './services/geminiService';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import { TEACHER_PROFILE } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `سلام عزیزم! خوش اومدی به کلاس ششم الف. من حسن ته‌کر هستم، معلمت. امروز چه کمکی می‌تونم بهت بکنم؟ سوال درسی داری یا می‌خوای با هم تمرین کنیم؟ 😊`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.CHAT);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const response = await geminiService.sendMessage(inputValue);
    
    const modelMsg: Message = {
      role: 'model',
      text: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const changeMode = (mode: AppMode) => {
    setCurrentMode(mode);
    let initialPrompt = "";
    switch(mode) {
      case AppMode.QUIZ:
        initialPrompt = "آقای ته‌کر، لطفاً یک آزمون کوتاه ۵ سوالی از درس ریاضی یا علوم برای من بگیرید.";
        break;
      case AppMode.HOMEWORK:
        initialPrompt = "آقای ته‌کر، به من یک تکلیف جدید برای تمرین در منزل بدهید.";
        break;
      case AppMode.GAME:
        initialPrompt = "آقای ته‌کر، بیا یک بازی آموزشی یا مسابقه اطلاعات عمومی انجام بدیم.";
        break;
      default:
        initialPrompt = "آقای ته‌کر، می‌خوام در مورد درس‌ها باهاتون صحبت کنم.";
    }
    
    setInputValue(initialPrompt);
  };

  const handleQuickAction = (text: string) => {
    setInputValue(text);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - desktop */}
      <Sidebar currentMode={currentMode} onModeChange={changeMode} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center">
            <button className="md:hidden ml-3 p-2 text-slate-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
               </svg>
            </button>
            <div className="flex items-center">
               <div className="md:hidden ml-2">
                 <img src={TEACHER_PROFILE.imageUrl} className="w-8 h-8 rounded-full" alt="teacher" />
               </div>
               <div>
                <h1 className="text-lg font-bold text-slate-800">{TEACHER_PROFILE.name}</h1>
                <p className="text-xs text-green-500 font-medium flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-1 inline-block"></span>
                  در حال آموزش...
                </p>
               </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
             <span className="hidden sm:inline-block text-xs text-slate-400 font-medium px-3 py-1 bg-slate-100 rounded-full">
               {TEACHER_PROFILE.grade} - {TEACHER_PROFILE.class}
             </span>
          </div>
        </header>

        {/* Chat Feed */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white p-4 rounded-2xl rounded-tr-none border border-slate-100 shadow-sm flex items-center space-x-2 space-x-reverse">
                  <div className="flex space-x-1 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-slate-400 mr-2">آقای ته‌کر در حال تایپ...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Suggestions / Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex space-x-2 space-x-reverse max-w-4xl mx-auto">
            {[
              "تکلیف ریاضی بده",
              "یه آزمون علوم بگیر",
              "معنی این کلمه چیه؟",
              "برام یه بازی آموزشی بذار",
              "چطوری خوش‌خط بنویسم؟"
            ].map((suggest, i) => (
              <button 
                key={i}
                onClick={() => handleQuickAction(suggest)}
                className="px-4 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200 rounded-full text-xs transition-colors"
              >
                {suggest}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <footer className="bg-white p-4 border-t border-slate-200 sticky bottom-0">
          <div className="max-w-4xl mx-auto flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="سوالی داری بپرس پسرم/دخترم..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none max-h-32 transition-all"
                rows={1}
                style={{ height: 'auto', minHeight: '48px' }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
                !inputValue.trim() || isLoading 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 rotate-180">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            دبستان منتظرالقائم - کلاس ششم الف (آقای حسن ته‌کر)
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;

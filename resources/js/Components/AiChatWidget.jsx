import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Bot, Loader2, Sparkles, User } from 'lucide-react';
import { clsx } from 'clsx';

export default function AiChatWidget({ externalPrompt }) {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "Hello! I'm Habib's assistant. Ask me anything about his technical expertise or past projects.", isTyping: false }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef(null);

    // Sync external prompt ke input field
    useEffect(() => {
        if (externalPrompt) setInput(externalPrompt);
    }, [externalPrompt]);

    const scrollToBottomInternal = (behavior = "smooth") => {
        if (scrollAreaRef.current) {
            const container = scrollAreaRef.current;
            container.scrollTo({
                top: container.scrollHeight - container.clientHeight,
                behavior: behavior
            });
        }
    };

    useEffect(() => {
        scrollToBottomInternal();
    }, [messages, isLoading]);

    // FUNGSI TYPING EFFECT (Tidak merubah data response, hanya visual)
    const typeWriter = (fullText) => {
        let currentText = "";
        const words = fullText.split(" ");
        let i = 0;

        // Buat pesan kosong dulu
        setMessages(prev => [...prev, { sender: 'ai', text: "", isTyping: true }]);

        const interval = setInterval(() => {
            if (i < words.length) {
                currentText += (i === 0 ? "" : " ") + words[i];
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = currentText;
                    return newMessages;
                });
                i++;
            } else {
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].isTyping = false;
                    return newMessages;
                });
                clearInterval(interval);
                setIsLoading(false); // Unlock button setelah typing selesai
            }
        }, 40); // Kecepatan ketik (ms)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true); // Lock button dimulai

        try {
            const response = await axios.post('/ai-chat', { message: userMsg });
            // Jalankan efek mengetik
            typeWriter(response.data.answer);
        } catch (error) {
            setMessages(prev => [...prev, { 
                sender: 'ai', 
                text: "Service is temporarily unavailable. Please try again shortly." 
            }]);
            setIsLoading(false); // Unlock jika error
        }
    };

    return (
        <div className="flex flex-col h-[580px] w-full max-w-md mx-auto bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">
            {/* Header */}
            <div className="px-6 py-5 bg-white dark:bg-[#0f172a] border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center border border-blue-100 dark:border-blue-800">
                            <Bot className="text-blue-600 dark:text-blue-400" size={22} />
                        </div>
                        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#0f172a] rounded-full shadow-sm"></span>
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">AI Assistant</h3>
                        <div className="flex items-center gap-1.5">
                            <Sparkles size={10} className="text-blue-500 animate-pulse" />
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Online</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-[#0f172a] scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                {messages.map((msg, index) => (
                    <div key={index} className={clsx("flex gap-3", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                        {msg.sender === 'ai' && (
                            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <Bot size={16} className="text-blue-500" />
                            </div>
                        )}
                        <div className={clsx(
                            "px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm transition-all max-w-[85%]",
                            msg.sender === 'user' 
                                ? "bg-blue-600 text-white rounded-tr-none shadow-blue-500/20" 
                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                        )}>
                            {msg.text}
                            {msg.isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-blue-500 animate-pulse">|</span>}
                        </div>
                        {msg.sender === 'user' && (
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                                <User size={16} className="text-blue-600 dark:text-blue-400" />
                            </div>
                        )}
                    </div>
                ))}
                
                {/* Loader saat Axios sedang bekerja sebelum typing dimulai */}
                {isLoading && !messages[messages.length - 1].isTyping && (
                    <div className="flex justify-start gap-3 items-center animate-in fade-in duration-300">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-sm border border-slate-100 dark:border-slate-700">
                            <Loader2 size={14} className="text-blue-500 animate-spin" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Thinking...</p>
                    </div>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-5 bg-white dark:bg-[#0f172a] border-t border-slate-100 dark:border-slate-800 shrink-0">
                <div className="relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLoading ? "AI is responding..." : "Inquire assistant..."}
                        className="w-full bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white border-none rounded-2xl py-3.5 pl-5 pr-14 focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-semibold placeholder:text-slate-400 shadow-inner"
                        disabled={isLoading} // LOCK INPUT saat loading/typing
                    />
                    <button 
                        type="submit" 
                        disabled={!input.trim() || isLoading} // LOCK BUTTON saat loading/typing
                        className={clsx(
                            "absolute right-2 top-2 p-2.5 rounded-xl transition-all shadow-md active:scale-95",
                            isLoading ? "bg-slate-300 dark:bg-gray-800 text-slate-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                        )}
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                </div>
            </form>
        </div>
    );
}
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AiChatWidget from '@/Components/AiChatWidget';
import { clsx } from 'clsx';
import { Sparkles, MessageSquare, Zap, Cpu, ChevronRight } from 'lucide-react';

export default function AiSection({ isDarkMode }) {
    const [promptToChat, setPromptToChat] = useState("");

    const popularQuestions = useMemo(() => [
        "Tell me about Habib's experience.",
        "What tech stack used in Sewaka?",
        "Can Habib optimize SQL?",
        "How to contact him?"
    ], []);

    return (
        <section id="ai-agent" className={clsx(
            "py-24 relative overflow-hidden transition-colors duration-500",
            isDarkMode ? "bg-gray-900" : "bg-slate-50"
        )}>
            {/* Atmosphere Decoration */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className={clsx(
                    "absolute top-[-10%] left-[-5%] w-[35%] h-[35%] rounded-full blur-[100px] transition-opacity duration-1000",
                    isDarkMode ? "bg-blue-600/5" : "bg-blue-400/10"
                )} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Content Left (Sticky) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-24"
                    >
                        <div className={clsx(
                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-[0.1em] uppercase mb-8",
                            isDarkMode ? "bg-blue-500/5 border-blue-500/20 text-blue-400" : "bg-blue-50 border-blue-100 text-blue-600"
                        )}>
                            <Cpu size={12} className="animate-pulse" />
                            <span>Neural Assistant Online</span>
                        </div>
                        
                        <h2 className={clsx(
                            "text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight",
                            isDarkMode ? "text-white" : "text-slate-900"
                        )}>
                            Don't want to read? <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                                Just Ask My AI.
                            </span>
                        </h2>
                        
                        <p className={clsx(
                            "text-lg mb-10 max-w-md leading-relaxed font-medium opacity-80",
                            isDarkMode ? "text-gray-300" : "text-slate-600"
                        )}>
                            I've trained a digital model of my professional profile to help you find insights faster. Ask me anything.
                        </p>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 mb-4">
                                <Zap size={12} className="text-yellow-500 fill-yellow-500" /> Suggested Inquiries
                            </h4>
                            <div className="grid gap-3 max-w-sm">
                                {popularQuestions.map((q, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setPromptToChat(q)} // Pindah ke kolom chat
                                        className={clsx(
                                            "group flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-500/50",
                                            isDarkMode 
                                                ? "bg-gray-800/40 border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/80" 
                                                : "bg-white border-slate-200 hover:border-blue-300"
                                        )}
                                    >
                                        <MessageSquare size={16} className="text-blue-500" />
                                        <span className="text-sm font-semibold opacity-90">{q}</span>
                                        <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Widget Right */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative w-full"
                    >
                        <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-indigo-500/10 blur-2xl rounded-[2.5rem] -z-10" />
                        <AiChatWidget externalPrompt={promptToChat} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
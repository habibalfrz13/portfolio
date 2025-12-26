import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, FileText, Code, Cpu } from 'lucide-react';
import { clsx } from 'clsx';

export default function HeroSection({ isDarkMode, scrollToSection, links }) {
    // Variabel animasi dipisah agar tidak dire-create setiap render
    const fadeInUp = { 
        hidden: { opacity: 0, y: 60 }, 
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } 
    };

    return (
        <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden">
            
            {/* Background Orbs - Aria-hidden agar tidak dibaca screen reader */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" aria-hidden="true"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" aria-hidden="true"></div>

            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
                
                {/* Text Content */}
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={fadeInUp} 
                    className="space-y-6"
                >
                    <div className={clsx("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border", isDarkMode ? "bg-blue-900/30 text-blue-400 border-blue-800" : "bg-blue-50 text-blue-600 border-blue-200")}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        OPEN FOR WORK
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Hi, I'm <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            Habib Al Farizizzzznichhh
                        </span>
                    </h1>
                    
                    <p className={clsx("text-lg md:text-xl max-w-lg leading-relaxed", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                        A <span className="font-semibold text-blue-500">Fullstack Developer</span>. Blending Frontend aesthetics, Backend logic, and Server robustness.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button 
                            onClick={() => scrollToSection('ai-agent')} 
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg transition transform hover:-translate-y-1 focus:ring-4 focus:ring-blue-500/50 outline-none"
                            aria-label="Ask my AI Assistant"
                        >
                            Ask My AI ✨
                        </button>
                        
                        <a 
                            href={links.cv} 
                            target="_blank" 
                            rel="noopener noreferrer" // Security best practice
                            className={clsx("px-8 py-3 rounded-full font-bold border transition flex items-center gap-2 focus:ring-4 focus:ring-gray-500/50 outline-none", isDarkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-100")}
                            aria-label="Download Curriculum Vitae (PDF)"
                        >
                            <FileText size={18} /> Download Resume
                        </a>
                    </div>
                    
                    <div className="flex gap-4 pt-4 text-gray-400">
                        <a 
                            href={links.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Visit GitHub Profile" // A11y Fix: Tombol icon-only butuh label
                        >
                            <Github className="hover:text-blue-500 transition w-6 h-6" />
                        </a>
                        <a 
                            href={links.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Visit LinkedIn Profile" // A11y Fix
                        >
                            <Linkedin className="hover:text-blue-500 transition w-6 h-6" />
                        </a>
                    </div>
                </motion.div>

                {/* Profile Image with Floating Badges */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.8 }} 
                    className="relative flex justify-center"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        
                        {/* LCP Optimization: fetchPriority="high" */}
                        <img 
                            src={links.photo} 
                            alt="Portrait of Habib Al Farizi" 
                            width="384" 
                            height="384"
                            fetchPriority="high" // Correctly applied
                            loading="eager"      // 🔥 ADD THIS to ensure no lazy-loading occurs
                            decoding="async"     // Allows the rest of the page to render while image decodes
                            className={clsx(
                                "relative w-full h-full object-cover rounded-full border-4 shadow-2xl z-10", 
                                isDarkMode ? "border-gray-800" : "border-white"
                            )} 
                        />
                        
                        {/* Badges */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }} 
                            transition={{ repeat: Infinity, duration: 3 }} 
                            className={clsx("absolute top-10 -right-4 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 z-20", isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200")}
                        >
                            <Code size={16} className="text-blue-500" />
                            <span className="text-xs font-bold">Clean Code</span>
                        </motion.div>
                        
                        <motion.div 
                            animate={{ y: [0, 10, 0] }} 
                            transition={{ repeat: Infinity, duration: 4, delay: 0.5 }} 
                            className={clsx("absolute bottom-10 -left-4 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 z-20", isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200")}
                        >
                            <Cpu size={16} className="text-purple-500" />
                            <span className="text-xs font-bold">High Perf</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
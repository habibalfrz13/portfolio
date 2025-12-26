import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Snowflake, PartyPopper } from 'lucide-react';
import { clsx } from 'clsx';

export default function Navbar({ isDarkMode, setIsDarkMode, isSnowing, setIsSnowing, triggerConfetti, scrolled, scrollToSection }) {
    const navItems = ['Home', 'Stack', 'Roadmap', 'Projects', 'Experience'];

    return (
        <nav 
            className={clsx(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                scrolled 
                    ? (isDarkMode ? "bg-gray-900/90 border-gray-800 backdrop-blur-md shadow-lg" : "bg-white/90 border-gray-200 backdrop-blur-md shadow-sm") 
                    : "bg-transparent border-transparent"
            )}
            role="navigation"
            aria-label="Main Navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo Area */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        role="button"
                        aria-label="Back to top"
                        tabIndex={0}
                    >
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md" aria-hidden="true">A</div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            AlvaDev
                        </span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <button 
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={clsx(
                                    "hover:text-blue-500 transition relative group px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 rounded",
                                    isDarkMode ? "text-gray-300" : "text-gray-600"
                                )}
                                aria-label={`Scroll to ${item} section`}
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={triggerConfetti} 
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition text-pink-500 focus:ring-2 focus:ring-pink-500 outline-none"
                            aria-label="Trigger confetti effect"
                        >
                            <PartyPopper size={20} aria-hidden="true" />
                        </button>
                        
                        <button 
                            onClick={() => setIsSnowing(!isSnowing)} 
                            className={clsx(
                                "p-2 rounded-full transition focus:ring-2 focus:ring-blue-500 outline-none", 
                                isSnowing ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                            )}
                            aria-label={isSnowing ? "Disable snow effect" : "Enable snow effect"}
                            aria-pressed={isSnowing}
                        >
                            <Snowflake size={20} aria-hidden="true" />
                        </button>
                        
                        <button 
                            onClick={() => setIsDarkMode(!isDarkMode)} 
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition focus:ring-2 focus:ring-yellow-500 outline-none"
                            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode 
                                ? <Sun size={20} className="text-yellow-400" aria-hidden="true" /> 
                                : <Moon size={20} className="text-gray-600" aria-hidden="true" />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react'; // Gunakan Heart icon dari lucide agar konsisten
import { clsx } from 'clsx';

export default function Footer({ isDarkMode, links }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={clsx(
            "py-10 text-center border-t relative z-10", 
            isDarkMode ? "bg-gray-900 border-gray-800 text-gray-500" : "bg-gray-50 border-gray-200 text-gray-500"
        )}>
            <div className="flex justify-center gap-6 mb-6">
                <a 
                    href={links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors p-2 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
                    aria-label="Visit GitHub Profile"
                >
                    <Github className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                    href={links.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors p-2 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
                    aria-label="Visit LinkedIn Profile"
                >
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
            </div>
            
            <p className="text-sm flex items-center justify-center gap-1 flex-wrap px-4">
                <span>&copy; {currentYear} Habib Al Farizi.</span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center gap-1">
                    Crafted with 
                    <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" aria-hidden="true" /> 
                    using <span className="font-semibold text-blue-500">Laravel</span>, <span className="font-semibold text-cyan-500">React</span> & <span className="font-semibold text-purple-500">Gemini AI</span>.
                </span>
            </p>
        </footer>
    );
}
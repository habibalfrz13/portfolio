import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Layers, Terminal, Rocket, Cpu, CheckCircle2, Clock, Hourglass } from 'lucide-react';
import { clsx } from 'clsx';

export default function RoadmapSection({ isDarkMode }) {
    
    // Data Roadmap
    const roadmap = useMemo(() => [
        { 
            year: "2021 - 2022", 
            title: "The Foundation", 
            status: "completed",
            desc: "Started the journey by mastering the core pillars of the web. Focusing on logic building and responsive UI implementation.", 
            icon: <Globe size={20} aria-hidden="true" />,
            stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Bootstrap"]
        },
        { 
            year: "2023", 
            title: "Backend & MVC", 
            status: "completed",
            desc: "Dove deep into server-side logic and database management. Built monolithic applications using PHP frameworks.", 
            icon: <Database size={20} aria-hidden="true" />,
            stack: ["PHP Native", "Laravel", "MySQL", "REST API"]
        },
        { 
            year: "2024", 
            title: "Fullstack Integration", 
            status: "completed",
            desc: "Bridging the gap between frontend and backend. Adopting modern SPA architecture and component-based UI.", 
            icon: <Layers size={20} aria-hidden="true" />,
            stack: ["React.js", "Inertia.js", "Tailwind CSS", "Git Workflow"]
        },
        { 
            year: "2025 (Current)", 
            title: "Advanced Engineering", 
            status: "in-progress",
            desc: "Focusing on system architecture, scalability, and DevOps practices. Building complex SaaS solutions.", 
            icon: <Terminal size={20} aria-hidden="true" />,
            stack: ["Docker", "CI/CD", "System Design", "Microservices"]
        },
        { 
            year: "Future Scope", 
            title: "Next Frontier", 
            status: "future",
            desc: "Exploring emerging tech to stay ahead of the curve. Aiming for Senior Engineer roles.", 
            icon: <Rocket size={20} aria-hidden="true" />,
            stack: ["AI Integration", "Cloud Architecture", "Team Leadership"]
        }
    ], []);

    // Helper Status Color
    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'text-green-600 bg-green-500/10 border-green-500/20';
            case 'in-progress': return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
            default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'completed': return <CheckCircle2 size={14} aria-hidden="true" />;
            case 'in-progress': return <Clock size={14} aria-hidden="true" />;
            default: return <Hourglass size={14} aria-hidden="true" />;
        }
    };

    return (
        <section id="roadmap" className={clsx("py-24 overflow-hidden relative", isDarkMode ? "bg-gray-900" : "bg-white")}>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
                <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-100px" }} 
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4">
                        <Cpu size={14} aria-hidden="true" />
                        <span>My Journey</span>
                    </div>
                    <h2 className={clsx("text-3xl md:text-4xl font-bold mb-4", isDarkMode ? "text-white" : "text-gray-900")}>
                        Technical <span className="text-blue-500">Roadmap</span>
                    </h2>
                    <p className={clsx("max-w-xl mx-auto", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                        A timeline of my growth, from writing my first line of code to building complex enterprise systems.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Central Line */}
                    <div 
                        className={clsx(
                            "absolute md:left-1/2 left-8 transform md:-translate-x-1/2 w-0.5 h-full rounded-full pointer-events-none",
                            "bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
                        )}
                        aria-hidden="true"
                    />

                    <div className="space-y-12 md:space-y-24"> {/* Tambah space antar item */}
                        {roadmap.map((step, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true, margin: "-50px" }} 
                                transition={{ duration: 0.5, delay: idx * 0.1 }} 
                                className={clsx(
                                    "relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0",
                                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                )}
                            >
                                {/* 1. Content Card Side */}
                                {/* PERBAIKAN DI SINI: Tambahkan padding md:px-12 atau md:pr-16/md:pl-16 sesuai posisi */}
                                <div className={clsx(
                                    "w-full md:w-1/2 pl-20 md:pl-0", 
                                    idx % 2 === 0 ? "md:pr-16" : "md:pl-16" // Jarak aman dari garis tengah
                                )}>
                                    <div className={clsx(
                                        "p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative",
                                        isDarkMode 
                                            ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10" 
                                            : "bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200"
                                    )}>
                                        {/* Panah Kecil (Arrow Pointer) ke arah garis tengah */}
                                        <div className={clsx(
                                            "hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 border-t border-r transform rotate-45",
                                            idx % 2 === 0 ? "-right-2 border-r border-t bg-inherit" : "-left-2 border-l border-b bg-inherit rotate-[225deg]",
                                            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                                        )}></div>

                                        {/* Header Card */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                            <span className={clsx("font-bold font-mono text-sm", isDarkMode ? "text-blue-400" : "text-blue-600")}>
                                                {step.year}
                                            </span>
                                            <span 
                                                className={clsx("flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", getStatusColor(step.status))}
                                                aria-label={`Status: ${step.status}`}
                                            >
                                                {getStatusIcon(step.status)} {step.status.replace('-', ' ')}
                                            </span>
                                        </div>

                                        <h3 className={clsx("text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors", isDarkMode ? "text-white" : "text-gray-900")}>
                                            {step.title}
                                        </h3>
                                        <p className={clsx("text-sm leading-relaxed mb-6", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                                            {step.desc}
                                        </p>

                                        {/* Tech Stack Tags */}
                                        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                                            {step.stack.map((tech, i) => (
                                                <li key={i} className={clsx(
                                                    "text-[11px] px-2 py-1 rounded border cursor-default",
                                                    isDarkMode 
                                                        ? "bg-gray-900 border-gray-700 text-gray-300 group-hover:border-gray-600" 
                                                        : "bg-gray-50 border-gray-200 text-gray-600 group-hover:bg-white"
                                                )}>
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* 2. Center Node / Icon */}
                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center" aria-hidden="true">
                                    <div className={clsx(
                                        "w-12 h-12 rounded-full border-4 flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110",
                                        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100",
                                        step.status === 'in-progress' && "ring-4 ring-blue-500/20"
                                    )}>
                                        <div className={clsx(
                                            "w-8 h-8 rounded-full flex items-center justify-center",
                                            step.status === 'in-progress' ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                        )}>
                                            {step.icon}
                                        </div>
                                        {step.status === 'in-progress' && (
                                            <span className="absolute w-full h-full rounded-full bg-blue-500 opacity-20 animate-ping"></span>
                                        )}
                                    </div>
                                </div>

                                {/* 3. Empty Side (Spacer) */}
                                <div className="hidden md:block w-1/2" aria-hidden="true" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
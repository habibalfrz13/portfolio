import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function ExperienceSection({ isDarkMode, experiences }) {
    
    // Helper parse JSON achievements safely
    const getAchievements = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        try { return JSON.parse(data); } catch (e) { return []; }
    };

    // Helper format date for semantic <time> elements
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
    };

    return (
        <section id="experience" className={clsx("py-24 px-4 relative overflow-hidden", isDarkMode ? "bg-gray-900" : "bg-gray-50")}>
            
            {/* Background Decoration - Aria Hidden for A11y */}
            <div 
                className={clsx("absolute inset-0 opacity-[0.03] pointer-events-none", isDarkMode ? "bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" : "bg-grid-black/[0.05]")} 
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4">
                        <Briefcase size={14} aria-hidden="true" />
                        <span>Career History</span>
                    </div>
                    <h2 className={clsx("text-3xl md:text-4xl font-bold mb-4", isDarkMode ? "text-white" : "text-gray-900")}>
                        Professional <span className="text-blue-500">Journey</span>
                    </h2>
                    <p className={clsx("max-w-xl mx-auto", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                        My work experience and key achievements in the software development industry.
                    </p>
                </motion.div>
                
                {/* Timeline Container */}
                <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/30 before:to-transparent">
                    {experiences && experiences.map((exp, index) => {
                         const achievements = getAchievements(exp.achievements);
                         
                         return (
                            <motion.article // Use <article> for semantic value
                                key={exp.id || index} 
                                initial={{ opacity: 0, y: 50 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true, margin: "-100px" }} // Performance: Load earlier
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                aria-label={`Experience at ${exp.company}`}
                            >
                                {/* Timeline Dot */}
                                <div className={clsx(
                                    "flex items-center justify-center w-10 h-10 rounded-full border shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all duration-300 transform group-hover:scale-110",
                                    exp.is_current 
                                        ? "bg-blue-600 border-blue-500 text-white shadow-blue-500/30 ring-4 ring-blue-500/20" 
                                        : (isDarkMode ? "bg-gray-900 border-gray-700 text-gray-500 group-hover:border-blue-500 group-hover:text-blue-500" : "bg-white border-gray-200 text-gray-400 group-hover:border-blue-500 group-hover:text-blue-500")
                                )}>
                                    <Briefcase size={16} aria-hidden="true" />
                                </div>

                                {/* Content Card */}
                                <div className={clsx(
                                    "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 relative group-hover:-translate-y-1",
                                    isDarkMode 
                                        ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/30 hover:bg-gray-800" 
                                        : "bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50/10"
                                )}>
                                    {/* Arrow Pointer (Decorative) */}
                                    <div className={clsx(
                                        "absolute top-5 w-3 h-3 border-t border-l rotate-45 transition-colors duration-300",
                                        "md:group-odd:-right-1.5 md:group-odd:border-t md:group-odd:border-r md:group-odd:border-l-0 md:group-odd:border-b-0",
                                        "md:group-even:-left-1.5 md:group-even:border-l md:group-even:border-b md:group-even:border-t-0 md:group-even:border-r-0",
                                        "-left-1.5 border-l border-b border-t-0 border-r-0 md:hidden", // Mobile view arrow
                                        isDarkMode 
                                            ? "bg-gray-800 border-gray-700 group-hover:border-blue-500/30 group-hover:bg-gray-800" 
                                            : "bg-white border-gray-200 group-hover:border-blue-200 group-hover:bg-blue-50/10"
                                    )}></div>

                                    {/* Header: Role & Date */}
                                    <header className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 gap-2">
                                        <div>
                                            <h3 className={clsx("font-bold text-lg leading-tight group-hover:text-blue-500 transition-colors", isDarkMode ? "text-white" : "text-gray-900")}>
                                                {exp.role}
                                            </h3>
                                            <div className={clsx("text-sm font-medium mt-1 flex items-center gap-1", isDarkMode ? "text-blue-400" : "text-blue-600")}>
                                                {exp.company}
                                                <ChevronRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                            </div>
                                        </div>
                                        
                                        <div className={clsx(
                                            "flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full self-start whitespace-nowrap border",
                                            exp.is_current
                                                ? "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-sm shadow-blue-500/10"
                                                : (isDarkMode ? "bg-gray-700/30 text-gray-400 border-gray-600" : "bg-gray-100 text-gray-600 border-gray-200")
                                        )} aria-label="Employment period">
                                            <Calendar size={12} aria-hidden="true" />
                                            <time dateTime={exp.start_date}>{formatDate(exp.start_date)}</time>
                                            <span aria-hidden="true">-</span>
                                            {exp.is_current ? (
                                                <span className="font-bold">Present</span>
                                            ) : (
                                                <time dateTime={exp.end_date}>{formatDate(exp.end_date)}</time>
                                            )}
                                        </div>
                                    </header>

                                    {/* Achievements List */}
                                    {achievements.length > 0 && (
                                        <ul className={clsx("space-y-3", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                                            {achievements.map((task, i) => (
                                                <li key={i} className="text-sm flex items-start gap-3">
                                                    <span className={clsx("mt-2 w-1.5 h-1.5 rounded-full shrink-0 ring-2 ring-offset-1 ring-offset-transparent transition-colors", 
                                                        isDarkMode ? "bg-gray-600 ring-gray-700 group-hover:bg-blue-500 group-hover:ring-blue-900" : "bg-gray-400 ring-gray-200 group-hover:bg-blue-500 group-hover:ring-blue-100"
                                                    )} aria-hidden="true" />
                                                    <span className="leading-relaxed">{task}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
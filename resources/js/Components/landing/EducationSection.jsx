import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';

export default function EducationSection({ isDarkMode, educations }) {
    if (!educations || educations.length === 0) return null;

    // Use the first item since there is only one degree
    const edu = educations[0];

    return (
        <section id="education" className={clsx("py-24 px-4 relative", isDarkMode ? "bg-gray-900" : "bg-white")}>
            
            {/* Background Gradient Blob (Decoration) - Aria Hidden */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" 
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-50px" }} 
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4">
                        <GraduationCap size={14} aria-hidden="true" />
                        <span>Academic</span>
                    </div>
                    <h2 className={clsx("text-3xl font-bold mb-3", isDarkMode ? "text-white" : "text-gray-900")}>
                        Education <span className="text-blue-500">Background</span>
                    </h2>
                    <p className={clsx("max-w-2xl mx-auto", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                        The educational foundation that shaped my technical expertise and professional growth.
                    </p>
                </motion.div>
                
                {/* --- MAIN FEATURE CARD (SINGLE DEGREE) --- */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={clsx(
                        "rounded-3xl border overflow-hidden relative shadow-2xl transition-all", 
                        isDarkMode 
                            ? "bg-gray-800/40 border-gray-700 backdrop-blur-sm" 
                            : "bg-white border-gray-200 shadow-blue-500/5"
                    )}
                >
                    {/* Decorative Top Line */}
                    <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" aria-hidden="true" />

                    <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* LEFT COLUMN: Main Info & Logo */}
                        <div className="lg:col-span-1 flex flex-col items-center text-center lg:text-left lg:items-start space-y-6">
                            {/* Icon / Logo Placeholder */}
                            <div className={clsx(
                                "w-24 h-24 rounded-2xl flex items-center justify-center shadow-inner mb-2",
                                isDarkMode ? "bg-gray-900 text-blue-400" : "bg-blue-50 text-blue-600"
                            )}>
                                <GraduationCap size={48} strokeWidth={1.5} aria-hidden="true" />
                            </div>

                            <div>
                                <h3 className={clsx("text-2xl font-bold leading-tight", isDarkMode ? "text-white" : "text-gray-900")}>
                                    {edu.institution}
                                </h3>
                                <div className={clsx("mt-2 text-lg font-medium", isDarkMode ? "text-blue-400" : "text-blue-600")}>
                                    {edu.degree}
                                </div>
                                {edu.major && (
                                    <div className={clsx("text-sm mt-1", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                                        Major in {edu.major}
                                    </div>
                                )}
                            </div>

                            {/* Metadata Badges */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full">
                                <div className={clsx("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border", isDarkMode ? "bg-gray-900/50 border-gray-700 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-600")}>
                                    <Calendar size={14} aria-hidden="true" />
                                    <span>
                                        {new Date(edu.start_date).getFullYear()} - {edu.is_current ? 'Present' : new Date(edu.end_date).getFullYear()}
                                    </span>
                                </div>
                                <div className={clsx("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border", isDarkMode ? "bg-gray-900/50 border-gray-700 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-600")}>
                                    <MapPin size={14} aria-hidden="true" />
                                    <span>{edu.city || "Indonesia"}</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Description & Details */}
                        <div className="lg:col-span-2 flex flex-col justify-center">
                            {/* Section: About */}
                            <div className="mb-8">
                                <h4 className={clsx("flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                                    <BookOpen size={16} aria-hidden="true" /> Summary
                                </h4>
                                <p className={clsx("text-base leading-relaxed text-justify md:text-left", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                                    {edu.description || "Engineering graduate with a strong focus on Software Engineering and Information Systems. Demonstrated proficiency in full-stack development, database management, and system analysis through rigorous academic projects and practical internships."}
                                </p>
                            </div>

                            {/* Section: Key Highlights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* GPA Box */}
                                <div className={clsx("p-4 rounded-xl border transition-colors hover:border-blue-500/50", isDarkMode ? "bg-gray-900/50 border-gray-700" : "bg-gray-50 border-gray-100")}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                                            <Award size={20} aria-hidden="true" />
                                        </div>
                                        <span className={clsx("font-bold text-sm", isDarkMode ? "text-gray-200" : "text-gray-800")}>GPA Score</span>
                                    </div>
                                    <div className="text-2xl font-bold ml-1">
                                        3.66 <span className="text-sm font-normal text-gray-500">/ 4.00</span>
                                    </div>
                                    <div className="text-xs text-green-500 font-medium mt-1">High Distinction</div>
                                </div>

                                {/* Focus Area Box */}
                                <div className={clsx("p-4 rounded-xl border transition-colors hover:border-blue-500/50", isDarkMode ? "bg-gray-900/50 border-gray-700" : "bg-gray-50 border-gray-100")}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                                            <BookOpen size={20} aria-hidden="true" />
                                        </div>
                                        <span className={clsx("font-bold text-sm", isDarkMode ? "text-gray-200" : "text-gray-800")}>Key Focus Areas</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {['Software Engineering', 'Web Development', 'System Analysis'].map((tag) => (
                                            <span key={tag} className={clsx("text-[10px] px-2 py-1 rounded border", isDarkMode ? "border-gray-600 text-gray-400" : "bg-white border-gray-200 text-gray-600")}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
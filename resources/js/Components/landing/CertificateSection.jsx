import React, { useState, forwardRef } from 'react'; // 1. Import forwardRef
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, BookOpen, Calendar, FileText, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function CertificateSection({ isDarkMode, certificates = [], courses = [] }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const INITIAL_DISPLAY = 6;
    
    const hasCertificates = certificates && certificates.length > 0;
    const hasCourses = courses && courses.length > 0;

    if (!hasCertificates && !hasCourses) return null;

    const isPdf = (url) => url?.toLowerCase().endsWith('.pdf');
    const visibleCertificates = isExpanded ? certificates : certificates.slice(0, INITIAL_DISPLAY);

    return (
        <section id="certificates" className={clsx("py-24 px-4 relative overflow-hidden", isDarkMode ? "bg-gray-900" : "bg-gray-50")}>
            {/* Background Decoration */}
            <div 
                className={clsx("absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50 pointer-events-none")} 
                aria-hidden="true"
            />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-50px" }} 
                    className="text-center mb-16 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        <Award size={14} aria-hidden="true" />
                        <span>Achievements</span>
                    </div>
                    <h2 className={clsx("text-3xl md:text-4xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>
                        Certifications & <span className="text-blue-500">Licenses</span>
                    </h2>
                    <p className={clsx("max-w-2xl mx-auto", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                        Professional credentials demonstrating technical expertise and a commitment to lifelong learning.
                    </p>
                </motion.div>

                {/* Certificates Grid */}
                {hasCertificates && (
                    <div className="mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            <AnimatePresence mode="popLayout">
                                {visibleCertificates.map((cert, idx) => (
                                    <CertificateCard 
                                        key={cert.id || idx} 
                                        cert={cert} 
                                        isDarkMode={isDarkMode} 
                                        isPdf={isPdf}
                                        index={idx}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Load More Button */}
                        {certificates.length > INITIAL_DISPLAY && (
                            <motion.div 
                                layout
                                className="flex justify-center mt-12"
                            >
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    aria-expanded={isExpanded}
                                    aria-controls="certificate-list"
                                    className={clsx(
                                        "group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border focus:ring-4 focus:ring-blue-500/30 outline-none",
                                        isDarkMode 
                                            ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700" 
                                            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:shadow-md"
                                    )}
                                >
                                    {isExpanded ? (
                                        <>Show Less <ChevronUp size={18} aria-hidden="true" /></>
                                    ) : (
                                        <>Show All ({certificates.length}) <ChevronDown size={18} aria-hidden="true" /></>
                                    )}
                                </button>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Courses Section */}
                {hasCourses && (
                    <div className={clsx("rounded-3xl p-8 md:p-12 border", isDarkMode ? "bg-gray-800/20 border-gray-800" : "bg-white border-gray-200 shadow-sm")}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h3 className={clsx("text-2xl font-bold flex items-center gap-3", isDarkMode ? "text-white" : "text-gray-900")}>
                                    <div className="p-2 bg-blue-500 rounded-lg text-white" aria-hidden="true">
                                        <BookOpen size={24} />
                                    </div>
                                    Completed Courses
                                </h3>
                                <p className={clsx("mt-2 text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                                    Non-formal education & technical workshops
                                </p>
                            </div>
                            <div className={clsx("text-sm px-4 py-2 rounded-lg border", isDarkMode ? "bg-gray-900 border-gray-700 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-600")}>
                                Total: <span className="font-bold text-blue-500">{courses.length} Courses</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {courses.map((course, idx) => (
                                <CourseCard key={course.id || idx} course={course} isDarkMode={isDarkMode} index={idx} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

// --- SUB-COMPONENT: Certificate Card (FIXED WITH FORWARDREF) ---
// 2. Bungkus komponen dengan forwardRef
const CertificateCard = forwardRef(({ cert, isDarkMode, isPdf, index }, ref) => {
    return (
        <motion.article
            layout
            ref={ref} // 3. Pasang ref disini agar AnimatePresence bisa mendeteksinya
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={clsx(
                "group relative rounded-2xl overflow-hidden border flex flex-col h-full transition-all duration-300 hover:-translate-y-1 focus-within:ring-4 focus-within:ring-blue-500/30",
                isDarkMode 
                    ? "bg-gray-800/40 border-gray-700 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                    : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-xl"
            )}
        >
            {/* Image / Preview Section */}
            <div className={clsx(
                "relative h-52 overflow-hidden flex items-center justify-center bg-gray-100",
                isDarkMode ? "bg-gray-900" : "bg-gray-100"
            )}>
                {cert.credential_url ? (
                    isPdf(cert.credential_url) ? (
                        <div className="flex flex-col items-center gap-3 transition-transform duration-500 group-hover:scale-105">
                            <div className="p-4 rounded-full bg-red-500/10 text-red-500">
                                <FileText size={48} strokeWidth={1.5} aria-hidden="true" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500">PDF Document</span>
                        </div>
                    ) : (
                        <img 
                            src={cert.credential_url} 
                            alt={`Certificate of ${cert.name}`} 
                            width="400"
                            height="208"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                    )
                ) : (
                    <Award className="text-gray-400 opacity-20" size={64} aria-hidden="true" />
                )}

                {/* Overlay Action */}
                {cert.credential_url && (
                    <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <a 
                            href={cert.credential_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label={`View credential for ${cert.name}`}
                            className="transform translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 focus:outline-none"
                        >
                            <button className="bg-white text-gray-900 px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <ExternalLink size={16} aria-hidden="true" />
                                {isPdf(cert.credential_url) ? 'View PDF' : 'View Credential'}
                            </button>
                        </a>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className={clsx(
                        "font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors",
                        isDarkMode ? "text-gray-100" : "text-gray-800"
                    )}>
                        {cert.name}
                    </h3>
                    <p className={clsx("text-sm font-medium", isDarkMode ? "text-blue-400" : "text-blue-600")}>
                        {cert.issuer}
                    </p>
                </div>

                <div className={clsx(
                    "mt-auto pt-4 border-t border-dashed flex items-center justify-between text-xs",
                    isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"
                )}>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} aria-hidden="true" />
                        <time dateTime={cert.issued_date}>
                            {new Date(cert.issued_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </time>
                    </div>
                    {cert.expiration_date && (
                        <span className={clsx("px-2 py-0.5 rounded text-[10px] font-semibold", isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600")}>
                            Valid until <time dateTime={cert.expiration_date}>{new Date(cert.expiration_date).getFullYear()}</time>
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
});

// Penting untuk debugging di React
CertificateCard.displayName = 'CertificateCard';

// --- SUB-COMPONENT: Course Card (Tidak perlu forwardRef karena tidak di dalam AnimatePresence langsung) ---
function CourseCard({ course, isDarkMode, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: index * 0.05 }}
            className={clsx(
                "flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
                isDarkMode 
                    ? "bg-gray-900/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800" 
                    : "bg-gray-50 border-gray-200 hover:border-blue-200 hover:bg-white hover:shadow-sm"
            )}
        >
            <div className={clsx(
                "mt-1 min-w-[32px] h-8 rounded-full flex items-center justify-center",
                isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-100 text-blue-600"
            )}>
                <CheckCircle2 size={16} aria-hidden="true" />
            </div>
            
            <div className="flex-1 min-w-0">
                <h4 className={clsx("font-semibold text-sm truncate pr-2", isDarkMode ? "text-gray-200" : "text-gray-900")}>
                    {course.title}
                </h4>
                <div className="flex items-center gap-2 text-xs mt-1 text-gray-500">
                    <span className="truncate max-w-[120px]">{course.platform}</span>
                    {course.completed_at && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-gray-500" aria-hidden="true" />
                            <time dateTime={course.completed_at}>{new Date(course.completed_at).getFullYear()}</time>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
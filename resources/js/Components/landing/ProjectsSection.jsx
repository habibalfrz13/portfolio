import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

export default function ProjectsSection({ isDarkMode, projects }) {
    
    // Helper: Parse tech stack dengan aman & Memoize
    const parseTechStack = (tech) => {
        if (!tech) return [];
        if (Array.isArray(tech)) return tech;
        try { return JSON.parse(tech); } catch (e) { return []; }
    };

    return (
        <section id="projects" className={clsx("py-24 relative overflow-hidden", isDarkMode ? "bg-gray-900" : "bg-white")}>
            
            {/* Background Pattern - Aria Hidden */}
            <div 
                className={clsx("absolute inset-0 opacity-[0.03] pointer-events-none", isDarkMode ? "bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" : "bg-grid-black/[0.05]")} 
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4">
                        <FolderGit2 size={14} aria-hidden="true" />
                        <span>Portfolio</span>
                    </div>
                    <h2 className={clsx("text-3xl md:text-4xl font-bold mb-4", isDarkMode ? "text-white" : "text-gray-900")}>
                        Featured <span className="text-blue-500">Projects</span>
                    </h2>
                    <p className={clsx("max-w-xl mx-auto", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                        A selection of projects that demonstrate my ability to solve complex problems with code.
                    </p>
                </motion.div>
                
                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects && projects.length > 0 ? projects.map((project, idx) => {
                        const techStack = parseTechStack(project.tech_stack);
                        const mainImage = project.images && project.images.length > 0 
                            ? `/storage/${project.images[0].image_path}` 
                            : null;

                        return (
                            <motion.article 
                                key={project.id || idx} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className={clsx(
                                    "group relative rounded-3xl overflow-hidden border flex flex-col h-full transition-all duration-300",
                                    isDarkMode 
                                        ? "bg-gray-800/40 border-gray-700 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10" 
                                        : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-xl"
                                )}
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
                                    {mainImage ? (
                                        <img 
                                            src={mainImage} 
                                            alt={`Screenshot of ${project.title}`} 
                                            loading="lazy"
                                            width="400" 
                                            height="224"
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            <span className="text-sm font-medium">No Preview Available</span>
                                        </div>
                                    )}

                                    {/* Overlay Actions on Hover (Desktop) */}
                                    <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                        {project.link && (
                                            <a 
                                                href={project.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white rounded-full text-gray-900 hover:bg-blue-500 hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                                                aria-label={`Visit live site for ${project.title}`}
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                        {project.github_link && (
                                            <a 
                                                href={project.github_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="p-3 bg-gray-900 rounded-full text-white hover:bg-gray-700 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 border border-gray-700"
                                                aria-label={`View source code for ${project.title} on GitHub`}
                                            >
                                                <Github size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <h3 className={clsx("text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors line-clamp-1", isDarkMode ? "text-white" : "text-gray-900")}>
                                            {project.title}
                                        </h3>
                                        <p className={clsx("text-sm line-clamp-3 leading-relaxed", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                                            {project.description}
                                        </p>
                                    </div>
                                    
                                    {/* Tech Stack Tags */}
                                    <div className="mt-auto pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                                        <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                                            {techStack.slice(0, 4).map((tech, i) => (
                                                <span 
                                                    key={i} 
                                                    className={clsx(
                                                        "text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md border",
                                                        isDarkMode 
                                                            ? "bg-gray-900/50 border-gray-700 text-gray-400" 
                                                            : "bg-gray-50 border-gray-200 text-gray-600"
                                                    )}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {techStack.length > 4 && (
                                                <span className={clsx("text-[10px] px-2 py-1 rounded-md font-medium", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                                                    +{techStack.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    }) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                                <FolderGit2 size={32} className="text-gray-400" />
                            </div>
                            <h3 className={clsx("text-lg font-medium", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                                No projects yet
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">Check back later for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
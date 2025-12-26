import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
// Pastikan tree-shaking aktif di Vite config. Named import sudah benar.
import { Layout, Database, Server, Wrench, Cpu, Code2 } from 'lucide-react'; 
import { clsx } from 'clsx';

export default function TechStackSection({ isDarkMode }) {
    
    // Optimasi: Gunakan useMemo agar array ini tidak dibuat ulang setiap kali re-render
    // Walaupun komponen ini jarang re-render, ini good practice untuk performa React.
    const mainStack = useMemo(() => [
        {
            id: 'frontend',
            category: "Frontend Ecosystem",
            icon: <Layout className="w-6 h-6" aria-hidden="true" />, // Icon dekoratif tidak perlu dibaca screen reader
            desc: "Crafting responsive, interactive, and pixel-perfect user interfaces.",
            items: ["React.js", "Inertia.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Vite"],
            colSpan: "md:col-span-2 lg:col-span-2", 
            bgGradient: "from-blue-500/10 to-purple-500/10"
        },
        {
            id: 'backend',
            category: "Backend Engineering",
            icon: <Database className="w-6 h-6" aria-hidden="true" />,
            desc: "Building scalable logic, secure APIs, and efficient database structures.",
            items: ["Laravel 11", "PHP 8.2", "MySQL", "RESTful API", "Redis", "Eloquent ORM"],
            colSpan: "md:col-span-2 lg:col-span-2",
            bgGradient: "from-emerald-500/10 to-teal-500/10"
        },
        {
            id: 'devops',
            category: "DevOps & Deployment",
            icon: <Server className="w-6 h-6" aria-hidden="true" />,
            desc: "Managing servers and CI/CD pipelines.",
            items: ["Linux (Ubuntu)", "Nginx", "Docker", "GitHub Actions", "VPS"],
            colSpan: "md:col-span-1 lg:col-span-1",
            bgGradient: "from-orange-500/10 to-red-500/10"
        },
        {
            id: 'tools',
            category: "Tools & Workflow",
            icon: <Wrench className="w-6 h-6" aria-hidden="true" />,
            desc: "Essential tools for productivity.",
            items: ["Git", "Postman", "Figma", "VS Code", "Jira"],
            colSpan: "md:col-span-1 lg:col-span-1",
            bgGradient: "from-pink-500/10 to-rose-500/10"
        },
        {
            id: 'learning',
            category: "Currently Learning",
            icon: <Cpu className="w-6 h-6" aria-hidden="true" />,
            desc: "Expanding horizons.",
            items: ["Next.js 14", "Go (Golang)", "AWS Basics"],
            colSpan: "md:col-span-2 lg:col-span-2", 
            bgGradient: "from-indigo-500/10 to-violet-500/10"
        }
    ], []);

    // Variabel animasi dipisah untuk clean code & performa
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Efek muncul berurutan (stagger) lebih smooth
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="stack" className={clsx("py-24 relative overflow-hidden", isDarkMode ? "bg-gray-900" : "bg-gray-50")}>
            
            {/* Background Pattern - Aria-hidden true */}
            <div 
                className={clsx("absolute inset-0 opacity-[0.03] pointer-events-none", isDarkMode ? "bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" : "bg-grid-black/[0.05]")} 
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-100px" }} // Load sedikit sebelum masuk viewport
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 mb-4">
                        <Code2 size={14} aria-hidden="true" />
                        <span>Tech Stack</span>
                    </div>
                    <h2 className={clsx("text-3xl md:text-4xl font-bold mb-4", isDarkMode ? "text-white" : "text-gray-900")}>
                        The <span className="text-blue-500">Arsenal</span>
                    </h2>
                    <p className={clsx("max-w-xl mx-auto", isDarkMode ? "text-gray-400" : "text-gray-600")}>
                        A comprehensive list of technologies I use to build robust, scalable, and modern web applications.
                    </p>
                </motion.div>

                {/* Bento Grid dengan Stagger Animation */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {mainStack.map((stack) => (
                        <motion.div 
                            key={stack.id}
                            variants={itemVariants}
                            className={clsx(
                                "group relative p-6 rounded-3xl border transition-all duration-300 overflow-hidden h-full flex flex-col", // h-full penting agar tinggi rata
                                stack.colSpan,
                                isDarkMode 
                                    ? "bg-gray-800/50 border-gray-700 hover:border-gray-600" 
                                    : "bg-white border-gray-200 hover:shadow-lg hover:border-blue-200"
                            )}
                        >
                            {/* Gradient Background Effect - Aria hidden */}
                            <div 
                                className={clsx(
                                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br pointer-events-none",
                                    stack.bgGradient
                                )} 
                                aria-hidden="true"
                            />

                            <div className="relative z-10 h-full flex flex-col">
                                {/* Header Card */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={clsx(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 shrink-0",
                                        isDarkMode ? "bg-gray-700 text-white" : "bg-blue-50 text-blue-600"
                                    )}>
                                        {stack.icon}
                                    </div>
                                    <div>
                                        <h3 className={clsx("font-bold text-lg", isDarkMode ? "text-white" : "text-gray-900")}>
                                            {stack.category}
                                        </h3>
                                        <p className={clsx("text-xs line-clamp-2", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                                            {stack.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Items Tags */}
                                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                                    {stack.items.map((item, i) => (
                                        <span key={i} className={clsx(
                                            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-default select-none",
                                            isDarkMode 
                                                ? "bg-gray-900/50 border-gray-700 text-gray-300 hover:border-gray-500" 
                                                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-white hover:border-blue-300"
                                        )}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
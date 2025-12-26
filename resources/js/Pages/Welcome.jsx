import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Head } from '@inertiajs/react';
import confetti from 'canvas-confetti';
import Snowfall from 'react-snowfall';
import { clsx } from 'clsx';

// --- CRITICAL COMPONENTS (ABOVE THE FOLD) ---
// Tetap di-import biasa agar muncul instan (LCP Optimization)
import Navbar from '@/Components/landing/Navbar';
import HeroSection from '@/Components/landing/HeroSection';

// --- LAZY LOADED COMPONENTS (BELOW THE FOLD) ---
// Di-import secara asinkron untuk mengurangi bundle size awal (Performance Optimization)
const TechStackSection = lazy(() => import('@/Components/landing/TechStackSection'));
const RoadmapSection = lazy(() => import('@/Components/landing/RoadmapSection'));
const AiSection = lazy(() => import('@/Components/landing/AiSection'));
const ProjectsSection = lazy(() => import('@/Components/landing/ProjectsSection'));
const ExperienceSection = lazy(() => import('@/Components/landing/ExperienceSection'));
const EducationSection = lazy(() => import('@/Components/landing/EducationSection'));
const CertificateSection = lazy(() => import('@/Components/landing/CertificateSection'));
const Footer = lazy(() => import('@/Components/landing/Footer'));

export default function Welcome({ projects, experiences, educations, certificates, skills, courses }) {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSnowing, setIsSnowing] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Data Link Terpusat
    const links = {
        linkedin: "https://www.linkedin.com/in/habibalfrz",
        github: "https://github.com/habibalfrz13",
        cv: "https://drive.google.com/file/d/1bbkocs2N-54BxMvwFmOvYQ-49AHSU2tF/view?usp=drive_link",
        photo: "/images/formal.webp" // Pastikan gambar ini sudah di-convert ke WebP nanti
    };

    // Schema Markup (JSON-LD) untuk SEO Google
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Habib Al Farizi",
        "jobTitle": "Fullstack Developer",
        "url": "https://habibalfrz.dev", // Ganti dengan domain asli nanti
        "sameAs": [
            links.linkedin,
            links.github
        ],
        "image": links.photo,
        "description": "Fullstack Developer specializing in Laravel, React, and Modern Web Technologies."
    };

    useEffect(() => {
        // 1. Matikan restorasi scroll otomatis browser
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // 2. Paksa scroll ke paling atas
        window.scrollTo(0, 0);

        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    const triggerConfetti = () => {
        confetti({ 
            particleCount: 100, 
            spread: 70, 
            origin: { y: 0.6 }, 
            colors: ['#3b82f6', '#8b5cf6', '#ec4899'],
            disableForReducedMotion: true // Accessibility: Respect user motion preference
        });
    };

    // Fallback saat komponen lazy sedang dimuat
    const SectionLoader = () => (
        <div className={clsx("py-24 flex justify-center items-center", isDarkMode ? "bg-gray-900" : "bg-gray-50")}>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className={clsx(
            "min-h-screen font-sans transition-colors duration-500 ease-in-out selection:bg-blue-500 selection:text-white", 
            isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        )}>
            <Head>
                <title>Habib Al Farizi - Fullstack Developer Portfolio</title>
                <meta name="description" content="Portfolio of Habib Al Farizi, a Fullstack Developer proficient in Laravel, React, Inertia.js, and Modern Web Development." />
                <link rel="preload" as="image" href={links.photo} fetchPriority="high" />
                {/* Open Graph / Social Media Tags */}
                <meta property="og:type" content="profile" />
                <meta property="og:title" content="Habib Al Farizi - Fullstack Developer" />
                <meta property="og:description" content="Explore the portfolio, projects, and skills of Habib Al Farizi." />
                <meta property="og:image" content={links.photo} />
                <meta property="og:url" content="https://habibalfrz.dev" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                
                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Head>

            {/* Accessibility: aria-hidden="true" karena ini hanya dekorasi */}
            {isSnowing && (
                <div className="fixed inset-0 pointer-events-none z-40" aria-hidden="true">
                    <Snowfall 
                        snowflakeCount={100} // Dikurangi sedikit untuk performa
                        color={isDarkMode ? "#ffffff" : "#3b82f6"} 
                        style={{ position: 'fixed', width: '100vw', height: '100vh' }} 
                    />
                </div>
            )}

            <Navbar 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
                isSnowing={isSnowing} 
                setIsSnowing={setIsSnowing} 
                triggerConfetti={triggerConfetti} 
                scrolled={scrolled} 
                scrollToSection={scrollToSection} 
            />

            <main>
                {/* Critical Section - Render Langsung */}
                <HeroSection isDarkMode={isDarkMode} scrollToSection={scrollToSection} links={links} />
                
                {/* Non-Critical Sections - Render via Suspense & Lazy */}
                <Suspense fallback={<SectionLoader />}>
                    <TechStackSection isDarkMode={isDarkMode} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <RoadmapSection isDarkMode={isDarkMode} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <AiSection isDarkMode={isDarkMode} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <ProjectsSection isDarkMode={isDarkMode} projects={projects} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <ExperienceSection isDarkMode={isDarkMode} experiences={experiences} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <EducationSection isDarkMode={isDarkMode} educations={educations} />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                    <CertificateSection isDarkMode={isDarkMode} certificates={certificates} courses={courses} />
                </Suspense>
            </main>

            <Suspense fallback={null}>
                <Footer isDarkMode={isDarkMode} links={links} />
            </Suspense>
        </div>
    );
}
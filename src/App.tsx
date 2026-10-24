/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { defaultPortfolioConfig, PortfolioConfig } from './config/portfolio';
import { Navbar } from './components/Navbar';
import { SocialBar } from './components/SocialBar';
import { EmailBar } from './components/EmailBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { FeaturedProjects } from './components/FeaturedProjects';
import { OtherProjects } from './components/OtherProjects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ArchiveModal } from './components/ArchiveModal';
import { TemplateCustomizerModal } from './components/TemplateCustomizerModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { ArrowUp, Sliders } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio_user_custom_config');
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...defaultPortfolioConfig, ...parsed };
        }
      } catch (err) {
        console.error('Error reading custom portfolio config from localStorage:', err);
      }
    }
    return defaultPortfolioConfig;
  });
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<'editor' | 'deploy'>('editor');
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 });
  
  // Authentication & Stealth Mode state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });
  const [isStealthMode, setIsStealthMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_stealth_mode') === 'true';
    }
    return false;
  });

  // Scroll metrics: progress bar and back to top
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Update document title dynamically based on config
  useEffect(() => {
    document.title = config.meta.siteTitle || `${config.personal.name} | Software Engineer`;
  }, [config.meta.siteTitle, config.personal.name]);

  // Handle scroll progress & back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle cursor radial glow on desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcut (Ctrl+Shift+E or Cmd+Shift+E) to trigger Admin Center
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        if (isAdminAuthenticated) {
          setIsCustomizerOpen(true);
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  const handleOpenCustomizer = () => {
    setCustomizerTab('editor');
    if (isAdminAuthenticated) {
      setIsCustomizerOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleOpenDeployGuide = () => {
    setCustomizerTab('deploy');
    if (isAdminAuthenticated) {
      setIsCustomizerOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('portfolio_admin_auth', 'true');
    setIsAuthModalOpen(false);
    setIsCustomizerOpen(true);
  };

  const handleLockAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
  };

  const handleUpdateConfig = (newCfg: PortfolioConfig) => {
    setConfig(newCfg);
    try {
      localStorage.setItem('portfolio_user_custom_config', JSON.stringify(newCfg));
    } catch (e) {
      console.error('Failed to save portfolio config to localStorage:', e);
    }
  };

  const handleToggleStealthMode = (stealth: boolean) => {
    setIsStealthMode(stealth);
    try {
      localStorage.setItem('portfolio_stealth_mode', String(stealth));
    } catch (e) {
      console.error('Failed to save stealth mode state to localStorage:', e);
    }
  };

  const handleResetToDefault = () => {
    setConfig(defaultPortfolioConfig);
    try {
      localStorage.removeItem('portfolio_user_custom_config');
    } catch (e) {
      console.error('Failed to remove custom config from localStorage:', e);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accentColor = config.theme.accentColor || '#64ffda';

  return (
    <div
      className="min-h-screen bg-[#0a192f] text-[#8892b0] relative selection:bg-[#233554] selection:text-[#64ffda] overflow-x-hidden w-full"
      style={
        {
          '--accent': accentColor,
        } as React.CSSProperties
      }
    >
      {/* 2px Scroll Reading Progress Bar at the top */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress}%`,
          backgroundColor: accentColor,
        }}
      />

      {/* Subtle interactive cursor spotlight on large screens */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-40 hidden lg:block"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(100, 255, 218, 0.04), transparent 80%)`,
        }}
      />

      {/* Floating Top Navigation */}
      <Navbar
        navLinks={config.navLinks}
        resumeUrl={config.personal.resumeUrl}
        logoLetter={config.personal.logoLetter}
        accentColor={accentColor}
        isAdminAuthenticated={isAdminAuthenticated}
        isStealthMode={isStealthMode}
        socials={config.socials}
        onOpenCustomizer={handleOpenCustomizer}
        onOpenDeployGuide={handleOpenDeployGuide}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Fixed Left Social Media Bar (Desktop) */}
      <SocialBar socials={config.socials} accentColor={accentColor} />

      {/* Fixed Right Email Bar (Desktop) */}
      <EmailBar email={config.personal.email} accentColor={accentColor} />

      {/* Main Page Flow with generous padding to prevent sidebar collision on desktop */}
      <main id="content" className="w-full flex flex-col justify-center px-0 lg:px-12 xl:px-16 overflow-x-hidden">
        {/* Hero Section */}
        <Hero
          greeting={config.personal.greeting}
          name={config.personal.name}
          tagline={config.personal.tagline}
          shortBio={config.personal.shortBio}
          accentColor={accentColor}
        />

        {/* 01. About Me */}
        <About
          number={config.about.number}
          title={config.about.title}
          paragraphs={config.about.paragraphs}
          skillsTitle={config.about.skillsTitle}
          skills={config.about.skills}
          avatarImage={config.about.avatarImage}
          avatarAlt={config.about.avatarAlt}
          accentColor={accentColor}
        />

        {/* 02. Where I've Worked */}
        <Experience
          number={config.experience.number}
          title={config.experience.title}
          jobs={config.experience.jobs}
          accentColor={accentColor}
        />

        {/* 03. Some Things I've Built */}
        <FeaturedProjects
          number={config.projects.number}
          title={config.projects.title}
          projects={config.projects.featured}
          accentColor={accentColor}
        />

        {/* Other Noteworthy Projects */}
        <OtherProjects
          heading={config.projects.otherHeading}
          subheading={config.projects.otherSubheading}
          archiveLinkText={config.projects.archiveLinkText}
          projects={config.projects.other}
          onOpenArchive={() => setIsArchiveOpen(true)}
          accentColor={accentColor}
        />

        {/* 04. What's Next? (Contact) */}
        <Contact
          number={config.contact.number}
          kicker={config.contact.kicker}
          title={config.contact.title}
          description={config.contact.description}
          buttonText={config.contact.buttonText}
          email={config.personal.email}
          emailSubject={config.contact.emailSubject}
          accentColor={accentColor}
        />
      </main>

      {/* Footer */}
      <Footer
        designedByText={config.footer.designedByText}
        repoUrl={config.footer.repoUrl}
        socials={config.socials}
        accentColor={accentColor}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAuthOrCustomizer={() => {
          if (isAdminAuthenticated) {
            setIsCustomizerOpen(true);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
      />

      {/* Full Projects Archive Modal */}
      <ArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        featured={config.projects.featured}
        other={config.projects.other}
        accentColor={accentColor}
      />

      {/* Admin Passcode Authentication Modal */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        accentColor={accentColor}
      />

      {/* Live Customizer & Deployment Guide Modal */}
      <TemplateCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetToDefault={handleResetToDefault}
        onLockAdmin={handleLockAdmin}
        isStealthMode={isStealthMode}
        onToggleStealthMode={handleToggleStealthMode}
        initialTab={customizerTab}
      />

      {/* Floating Action Controls on Mobile/Small screens */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full font-mono text-xs text-[#ccd6f6] bg-[#112240]/90 hover:bg-[#233554] border border-[#233554] shadow-xl backdrop-blur-md transition-all hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp size={16} style={{ color: accentColor }} />
          </button>
        )}

        {/* Mobile quick customize button: only if not in stealth mode */}
        {!isStealthMode && (
          <button
            onClick={handleOpenCustomizer}
            className="md:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-full font-mono text-xs text-[#0a192f] font-semibold shadow-xl transition-all hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            <Sliders size={14} />
            <span>{isAdminAuthenticated ? 'Admin' : 'Lock'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { NavLinkItem, SocialItem } from '../config/portfolio';
import { Sliders, X, Menu, Rocket, Lock, ShieldCheck, Github, Instagram, Twitter, Linkedin, Codepen, Globe, Mail } from 'lucide-react';

interface NavbarProps {
  navLinks: NavLinkItem[];
  resumeUrl: string;
  logoLetter: string;
  accentColor?: string;
  isAdminAuthenticated: boolean;
  isStealthMode: boolean;
  socials: SocialItem[];
  onOpenCustomizer: () => void;
  onOpenDeployGuide: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  navLinks,
  resumeUrl,
  logoLetter = 'B',
  accentColor = '#64ffda',
  isAdminAuthenticated,
  isStealthMode,
  socials,
  onOpenCustomizer,
  onOpenDeployGuide,
  onOpenAuthModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up (with 10px buffer)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const handleAdminAction = (action: 'customizer' | 'deploy') => {
    if (isAdminAuthenticated) {
      if (action === 'customizer') onOpenCustomizer();
      else onOpenDeployGuide();
    } else {
      onOpenAuthModal();
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return <Github size={18} />;
      case 'instagram': return <Instagram size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'codepen': return <Codepen size={18} />;
      default: return <Globe size={18} />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-[#0a192f]/90 backdrop-blur-md shadow-lg shadow-[#020c1b]/60 py-3 sm:py-4'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Zone 1: Hexagonal Monogram Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-center transition-transform duration-200 hover:scale-105"
            aria-label="Home"
          >
            <svg
              className="w-10 h-10 sm:w-11 sm:h-11 transition-all duration-300 drop-shadow-sm"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                stroke={accentColor}
                strokeWidth="6"
                className="transition-all duration-300 group-hover:stroke-width-8"
                style={{
                  filter: `drop-shadow(0 0 2px ${accentColor})`,
                }}
              />
              <text
                x="50%"
                y="58%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-mono text-2xl sm:text-3xl font-bold transition-all duration-300 select-none"
                fill={accentColor}
              >
                {logoLetter}
              </text>
            </svg>
          </a>

          {/* Admin center button: only visible if not in stealth mode */}
          {!isStealthMode && (
            <button
              onClick={() => handleAdminAction('customizer')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                isAdminAuthenticated
                  ? 'border-emerald-500/40 bg-[#112240] text-emerald-300 hover:border-emerald-400'
                  : 'border-[#233554] bg-[#112240]/80 text-[#8892b0] hover:text-[#ccd6f6] hover:border-[#64ffda]/50'
              }`}
              title={isAdminAuthenticated ? "Open Template & Deploy Center" : "Locked: Admin Passcode Required (scacee)"}
            >
              {isAdminAuthenticated ? (
                <>
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>Admin</span>
                </>
              ) : (
                <>
                  <Lock size={12} className="text-[#64ffda]" />
                  <span>Admin Center</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-200 flex items-center py-2"
            >
              <span className="text-[#64ffda] mr-1.5">{link.number}</span>
              {link.name}
            </a>
          ))}

          {/* Action Zone: Resume Button & Optional Deploy Button */}
          <div className="flex items-center gap-3 ml-2">
            {!isStealthMode && (
              <button
                onClick={() => handleAdminAction('deploy')}
                className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded text-[#a8b2d1] hover:text-[#64ffda] border border-[#233554] hover:border-[#64ffda]/40 transition-colors"
                title="Vercel & Netlify Deployment Guide"
              >
                <Rocket size={13} className="text-[#64ffda]" />
                <span>Deploy</span>
              </button>
            )}

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border rounded text-xs font-mono font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: accentColor,
                color: accentColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${accentColor}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Resume
            </a>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          {!isStealthMode && (
            <button
              onClick={() => handleAdminAction('customizer')}
              className="p-2 text-xs font-mono rounded border border-[#233554] text-[#8892b0] min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Admin Settings"
            >
              {isAdminAuthenticated ? (
                <ShieldCheck size={16} className="text-emerald-400" />
              ) : (
                <Lock size={16} className="text-[#64ffda]" />
              )}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#64ffda] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 top-[60px] sm:top-[68px] bg-[#0a192f]/98 backdrop-blur-2xl z-50 md:hidden transition-all duration-300 overflow-y-auto flex flex-col justify-between p-6 pb-12 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-x-0'
            : 'opacity-0 pointer-events-none translate-x-full'
        }`}
        style={{ height: 'calc(100dvh - 60px)' }}
      >
        <div className="flex flex-col items-center justify-center flex-grow py-8">
          <nav className="flex flex-col items-center gap-7 text-center font-mono w-full max-w-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors flex flex-col items-center gap-1 py-1 w-full"
              >
                <span className="text-xs text-[#64ffda]">{link.number}</span>
                <span className="text-xl font-medium tracking-wide">{link.name}</span>
              </a>
            ))}

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 px-10 py-3.5 border rounded text-sm font-mono transition-colors w-full text-center"
              style={{
                borderColor: accentColor,
                color: accentColor,
              }}
            >
              Resume
            </a>

            {!isStealthMode && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAdminAction('customizer');
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#112240] text-xs font-mono text-[#ccd6f6] border border-[#233554] w-full mt-2"
              >
                <Lock size={14} className="text-[#64ffda]" />
                <span>Admin Settings ({isAdminAuthenticated ? 'Unlocked' : 'Password scacee'})</span>
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Social Bar inside Drawer */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-[#233554]/50">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="text-[#a8b2d1] hover:text-[#64ffda] p-2 transition-colors"
            >
              {getSocialIcon(item.icon)}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

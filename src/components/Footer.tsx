import React from 'react';
import { SocialItem } from '../config/portfolio';
import { Github, Instagram, Twitter, Linkedin, Codepen, Globe, Mail, Youtube, Lock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  designedByText: string;
  repoUrl?: string;
  socials: SocialItem[];
  accentColor?: string;
  isAdminAuthenticated: boolean;
  onOpenAuthOrCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  designedByText,
  repoUrl = 'https://github.com/bchiang7/v4',
  socials,
  accentColor = '#64ffda',
  isAdminAuthenticated,
  onOpenAuthOrCustomizer,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github size={18} />;
      case 'instagram':
        return <Instagram size={18} />;
      case 'twitter':
        return <Twitter size={18} />;
      case 'linkedin':
        return <Linkedin size={18} />;
      case 'codepen':
        return <Codepen size={18} />;
      case 'youtube':
        return <Youtube size={18} />;
      case 'mail':
        return <Mail size={18} />;
      default:
        return <Globe size={18} />;
    }
  };

  return (
    <footer className="py-8 sm:py-10 px-5 text-center flex flex-col items-center w-full">
      {/* Social links row visible on small & medium screens where side bars are hidden */}
      <div className="flex lg:hidden items-center justify-center gap-5 sm:gap-6 mb-6 flex-wrap">
        {socials.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="text-[#a8b2d1] hover:text-[#64ffda] transition-colors p-2"
          >
            {getIcon(item.icon)}
          </a>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-[#8892b0] hover:text-[#64ffda] transition-colors tracking-wide leading-relaxed"
        >
          <p>{designedByText}</p>
          <p className="mt-1 text-[#8892b0]/70 text-[11px]">
            v4 Portfolio Template · Clean, Configurable & Deploy-Ready
          </p>
        </a>

        {/* Discreet Admin Lock Trigger */}
        <button
          onClick={onOpenAuthOrCustomizer}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#8892b0]/60 hover:text-[#ccd6f6] mt-3 p-1.5 rounded transition-colors"
          title={isAdminAuthenticated ? "Admin Unlocked (Click to open customizer)" : "Admin Locked (Click to enter passcode)"}
        >
          {isAdminAuthenticated ? (
            <>
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>Admin Mode Active</span>
            </>
          ) : (
            <>
              <Lock size={12} className="opacity-60" />
              <span>Admin Access</span>
            </>
          )}
        </button>
      </div>
    </footer>
  );
};

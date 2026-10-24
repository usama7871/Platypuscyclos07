import React from 'react';
import { Github, Instagram, Twitter, Linkedin, Codepen, Globe, Mail, Youtube } from 'lucide-react';
import { SocialItem } from '../config/portfolio';

interface SocialBarProps {
  socials: SocialItem[];
  accentColor?: string;
}

export const SocialBar: React.FC<SocialBarProps> = ({ socials, accentColor = '#64ffda' }) => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github size={19} />;
      case 'instagram':
        return <Instagram size={19} />;
      case 'twitter':
        return <Twitter size={19} />;
      case 'linkedin':
        return <Linkedin size={19} />;
      case 'codepen':
        return <Codepen size={19} />;
      case 'youtube':
        return <Youtube size={19} />;
      case 'mail':
        return <Mail size={19} />;
      default:
        return <Globe size={19} />;
    }
  };

  return (
    <aside
      aria-label="Social media links"
      className="hidden lg:flex fixed bottom-0 left-5 xl:left-10 z-30 flex-col items-center pointer-events-auto"
    >
      <ul className="flex flex-col gap-5 p-0 m-0 list-none">
        {socials.map((item) => (
          <li key={item.name}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="block p-2 text-[#a8b2d1] hover:-translate-y-1 transition-all duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#a8b2d1')}
            >
              {getIcon(item.icon)}
            </a>
          </li>
        ))}
      </ul>
      <div className="w-[1px] h-24 bg-[#a8b2d1]/40 mt-5" />
    </aside>
  );
};

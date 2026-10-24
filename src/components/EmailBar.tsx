import React from 'react';

interface EmailBarProps {
  email: string;
  accentColor?: string;
}

export const EmailBar: React.FC<EmailBarProps> = ({ email, accentColor = '#64ffda' }) => {
  return (
    <aside
      aria-label="Email address"
      className="hidden lg:flex fixed bottom-0 right-5 xl:right-10 z-30 flex-col items-center pointer-events-auto"
    >
      <div className="flex flex-col items-center">
        <a
          href={`mailto:${email}`}
          className="vertical-rl font-mono text-xs tracking-widest text-[#a8b2d1] hover:-translate-y-1 transition-all duration-200 p-2"
          onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#a8b2d1')}
        >
          {email}
        </a>
      </div>
      <div className="w-[1px] h-24 bg-[#a8b2d1]/40 mt-5" />
    </aside>
  );
};

import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AboutProps {
  number?: string;
  title?: string;
  paragraphs: string[];
  skillsTitle?: string;
  skills: string[];
  avatarImage: string;
  avatarAlt?: string;
  accentColor?: string;
}

export const About: React.FC<AboutProps> = ({
  number = '01.',
  title = 'About Me',
  paragraphs,
  skillsTitle = "Here are a few technologies I've been working with recently:",
  skills,
  avatarImage,
  avatarAlt = 'Avatar Photo',
  accentColor = '#64ffda',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      aria-label="About Me"
      className="max-w-5xl mx-auto py-16 sm:py-24 px-5 sm:px-8 md:px-12 w-full overflow-hidden"
    >
      {/* Section Header with Horizontal Rule */}
      <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
        <h2 className="flex items-center text-xl sm:text-2xl md:text-3xl font-bold text-[#ccd6f6] whitespace-nowrap">
          <span className="font-mono text-sm sm:text-base md:text-xl font-normal mr-2" style={{ color: accentColor }}>
            {number}
          </span>
          {title}
        </h2>
        <div className="h-[1px] bg-[#233554] flex-grow max-w-[120px] sm:max-w-xs md:max-w-md min-w-[30px]" />
      </div>

      {/* 2-Column Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
        {/* Left Column: Bio & Skills */}
        <div className="md:col-span-3 space-y-4 text-sm sm:text-base text-[#8892b0] leading-relaxed">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}

          {skills && skills.length > 0 && (
            <div className="pt-3">
              <p className="text-[#ccd6f6] text-xs sm:text-sm mb-3 font-medium">
                {skillsTitle}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs sm:text-sm text-[#8892b0]">
                {skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span style={{ color: accentColor }}>▹</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Signature Framed Avatar (Responsive & Centered) */}
        <div className="md:col-span-2 flex justify-center w-full pt-4 md:pt-0">
          <div className="relative group max-w-[220px] sm:max-w-[260px] w-full mr-3 mb-3">
            {/* Offset Background Accent Border Frame */}
            <div
              className="absolute inset-0 rounded border-2 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 z-0"
              style={{ borderColor: accentColor }}
            />

            {/* Image Container with duotone overlay */}
            <div className="relative rounded bg-[#64ffda] z-10 overflow-hidden aspect-square shadow-xl">
              {!imgError && avatarImage ? (
                <img
                  src={avatarImage}
                  alt={avatarAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 mix-blend-multiply transition-all duration-300 group-hover:filter-none group-hover:mix-blend-normal"
                />
              ) : (
                <div className="w-full h-full bg-[#112240] flex flex-col items-center justify-center text-[#8892b0]">
                  <User size={44} style={{ color: accentColor }} />
                  <span className="font-mono text-xs mt-2">{avatarAlt}</span>
                </div>
              )}
              {/* Subtle tint overlay */}
              <div
                className="absolute inset-0 bg-[#0a192f]/20 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

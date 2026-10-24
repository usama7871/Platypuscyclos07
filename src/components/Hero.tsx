import React from 'react';

interface HeroProps {
  greeting: string;
  name: string;
  tagline: string;
  shortBio: string;
  accentColor?: string;
}

export const Hero: React.FC<HeroProps> = ({
  greeting = 'Hi, my name is',
  name = 'Brittany Chiang',
  tagline = 'I build things for the web.',
  shortBio,
  accentColor = '#64ffda',
}) => {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-[92vh] sm:min-h-screen flex flex-col justify-center max-w-5xl mx-auto pt-28 sm:pt-36 pb-16 px-5 sm:px-8 md:px-12 w-full"
    >
      <div className="flex flex-col items-start w-full">
        {/* Monospace greeting kicker */}
        <p
          className="font-mono text-xs sm:text-base mb-4 sm:mb-5 tracking-wide"
          style={{ color: accentColor }}
        >
          {greeting}
        </p>

        {/* Big Name with responsive font scaling and no overflow */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#ccd6f6] leading-[1.1] mb-2 sm:mb-3 break-words w-full">
          {name}.
        </h1>

        {/* Highlight Subtitle */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#8892b0] leading-[1.15] mb-5 sm:mb-7 break-words w-full">
          {tagline}
        </h2>

        {/* Short Bio description */}
        <p className="max-w-xl text-sm sm:text-base md:text-lg text-[#8892b0] leading-relaxed mb-8 sm:mb-12">
          {shortBio}
        </p>

        {/* Action Buttons: Stacks cleanly on very small mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <a
            href="#work"
            className="px-6 sm:px-7 py-3.5 sm:py-4 border rounded font-mono text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-1 text-center"
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
            Check out my work!
          </a>

          <a
            href="#contact"
            className="px-6 sm:px-7 py-3.5 sm:py-4 rounded font-mono text-xs sm:text-sm font-medium text-[#ccd6f6] bg-[#112240] hover:bg-[#233554] border border-[#233554] transition-all duration-200 hover:-translate-y-1 text-center"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

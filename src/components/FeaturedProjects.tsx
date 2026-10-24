import React, { useState } from 'react';
import { FeaturedProject } from '../config/portfolio';
import { Github, ExternalLink, Code2 } from 'lucide-react';

interface FeaturedProjectsProps {
  number?: string;
  title?: string;
  projects: FeaturedProject[];
  accentColor?: string;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  number = '03.',
  title = "Some Things I've Built",
  projects,
  accentColor = '#64ffda',
}) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section
      id="work"
      aria-label="Featured Projects"
      className="max-w-5xl mx-auto py-16 sm:py-24 px-5 sm:px-8 md:px-12 w-full"
    >
      {/* Section Header with Horizontal Rule */}
      <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-16">
        <h2 className="flex items-center text-xl sm:text-2xl md:text-3xl font-bold text-[#ccd6f6] whitespace-nowrap">
          <span className="font-mono text-sm sm:text-base md:text-xl font-normal mr-2" style={{ color: accentColor }}>
            {number}
          </span>
          {title}
        </h2>
        <div className="h-[1px] bg-[#233554] flex-grow max-w-[120px] sm:max-w-xs md:max-w-md min-w-[30px]" />
      </div>

      {/* Featured Projects List */}
      <div className="space-y-16 md:space-y-24">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={project.title}
              className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-4 group"
            >
              {/* Project Image */}
              <div
                className={`relative md:col-span-7 aspect-[16/10] rounded overflow-hidden shadow-xl ${
                  isEven ? 'md:col-start-1' : 'md:col-start-6'
                } z-10 w-full`}
              >
                <a
                  href={project.external || project.github || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full bg-[#112240] relative"
                >
                  {!imageErrors[idx] && project.image ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt || project.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(idx)}
                      className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90 transition-all duration-300 md:group-hover:filter-none md:group-hover:brightness-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#112240] flex flex-col items-center justify-center text-[#8892b0] p-4">
                      <Code2 size={40} style={{ color: accentColor }} />
                      <span className="font-mono text-xs mt-2 text-center">{project.title}</span>
                    </div>
                  )}
                  {/* Subtle tint overlay */}
                  <div
                    className="absolute inset-0 bg-[#0a192f]/40 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"
                  />
                </a>
              </div>

              {/* Project Details */}
              <div
                className={`md:col-span-7 flex flex-col z-20 mt-3 md:mt-0 ${
                  isEven
                    ? 'md:col-start-6 md:text-right md:items-end'
                    : 'md:col-start-1 md:text-left md:items-start md:row-start-1'
                }`}
              >
                <p
                  className="font-mono text-xs mb-1 font-normal tracking-wide"
                  style={{ color: accentColor }}
                >
                  Featured Project
                </p>

                <h3 className="text-lg sm:text-2xl font-bold text-[#ccd6f6] mb-3 hover:text-[#64ffda] transition-colors">
                  <a
                    href={project.external || project.github || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                </h3>

                {/* Overlapping Description Card on Desktop, Seamless Card on Mobile */}
                <div className="bg-[#112240] p-4 sm:p-6 rounded-lg shadow-xl text-[#a8b2d1] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 border border-[#233554]/60">
                  <p>{project.description}</p>
                </div>

                {/* Tech Stack List */}
                <ul
                  className={`flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] sm:text-xs text-[#8892b0] mb-4 ${
                    isEven ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  {project.tech.map((techItem) => (
                    <li key={techItem} className="whitespace-nowrap">{techItem}</li>
                  ))}
                </ul>

                {/* Links */}
                <div
                  className={`flex items-center gap-4 text-[#ccd6f6] ${
                    isEven ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Link"
                      className="hover:-translate-y-0.5 transition-transform p-1.5 hover:text-[#64ffda] min-w-[36px] min-h-[36px] flex items-center justify-center"
                    >
                      <Github size={19} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="External Link"
                      className="hover:-translate-y-0.5 transition-transform p-1.5 hover:text-[#64ffda] min-w-[36px] min-h-[36px] flex items-center justify-center"
                    >
                      <ExternalLink size={19} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

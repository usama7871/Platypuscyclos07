import React, { useState } from 'react';
import { OtherProject } from '../config/portfolio';
import { Folder, Github, ExternalLink } from 'lucide-react';

interface OtherProjectsProps {
  heading?: string;
  subheading?: string;
  archiveLinkText?: string;
  projects: OtherProject[];
  onOpenArchive: () => void;
  accentColor?: string;
}

export const OtherProjects: React.FC<OtherProjectsProps> = ({
  heading = 'Other Noteworthy Projects',
  archiveLinkText = 'view the archive',
  projects,
  onOpenArchive,
  accentColor = '#64ffda',
}) => {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 6;
  const displayedProjects = showAll ? projects : projects.slice(0, initialCount);

  return (
    <section
      id="other-projects"
      aria-label="Other Noteworthy Projects"
      className="max-w-5xl mx-auto py-16 sm:py-20 px-5 sm:px-8 md:px-12 flex flex-col items-center w-full"
    >
      {/* Centered Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ccd6f6] text-center mb-2">
        {heading}
      </h2>

      {/* Archive Link */}
      <button
        onClick={onOpenArchive}
        className="font-mono text-xs sm:text-sm text-[#64ffda] hover:underline mb-8 sm:mb-12 cursor-pointer flex items-center gap-1 p-2"
        style={{ color: accentColor }}
      >
        <span>{archiveLinkText}</span>
      </button>

      {/* Responsive Grid: 1-col on mobile, 2-col on sm/md, 3-col on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {displayedProjects.map((project) => (
          <div
            key={project.title}
            className="group relative bg-[#112240] rounded-lg p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border border-transparent hover:border-[#233554] shadow-lg"
          >
            <div>
              {/* Card Header: Folder Icon + External Links */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <Folder
                  size={36}
                  className="stroke-[1.5]"
                  style={{ color: accentColor }}
                />

                <div className="flex items-center gap-2 sm:gap-3 text-[#a8b2d1]">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className="hover:text-[#64ffda] transition-colors p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="External Link"
                      className="hover:text-[#64ffda] transition-colors p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#ccd6f6] mb-2.5 group-hover:text-[#64ffda] transition-colors">
                <a
                  href={project.external || project.github || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {project.title}
                </a>
              </h3>

              {/* Description */}
              <p className="text-[#8892b0] text-xs sm:text-sm leading-relaxed mb-5">
                {project.description}
              </p>
            </div>

            {/* Bottom Tech Stack */}
            <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] sm:text-xs text-[#8892b0] pt-3 mt-auto border-t border-[#233554]/40">
              {project.tech.map((techItem) => (
                <li key={techItem} className="whitespace-nowrap">{techItem}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {projects.length > initialCount && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-10 sm:mt-12 px-6 sm:px-7 py-3 sm:py-3.5 border rounded font-mono text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
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
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { ExperienceItem } from '../config/portfolio';
import { ExternalLink } from 'lucide-react';

interface ExperienceProps {
  number?: string;
  title?: string;
  jobs: ExperienceItem[];
  accentColor?: string;
}

export const Experience: React.FC<ExperienceProps> = ({
  number = '02.',
  title = "Where I've Worked",
  jobs,
  accentColor = '#64ffda',
}) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!jobs || jobs.length === 0) return null;

  const activeJob = jobs[activeTab] || jobs[0];

  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="max-w-4xl mx-auto py-16 sm:py-24 px-5 sm:px-8 md:px-12 w-full"
    >
      {/* Section Header with Horizontal Rule */}
      <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
        <h2 className="flex items-center text-xl sm:text-2xl md:text-3xl font-bold text-[#ccd6f6] whitespace-nowrap">
          <span className="font-mono text-sm sm:text-base md:text-xl font-normal mr-2" style={{ color: accentColor }}>
            {number}
          </span>
          {title}
        </h2>
        <div className="h-[1px] bg-[#233554] flex-grow max-w-[120px] sm:max-w-xs md:max-w-md min-w-[30px]" />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 min-h-[320px]">
        {/* Tab List */}
        <div className="relative border-b-2 sm:border-b-0 sm:border-l-2 border-[#233554] flex sm:flex-col overflow-x-auto sm:overflow-x-visible shrink-0 pb-1 sm:pb-0 no-scrollbar">
          {/* Active indicator bar for Desktop (vertical) */}
          <div
            className="hidden sm:block absolute left-[-2px] w-[2px] h-[42px] transition-all duration-300 ease-out"
            style={{
              backgroundColor: accentColor,
              transform: `translateY(${activeTab * 42}px)`,
            }}
          />

          {jobs.map((job, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={job.company}
                onClick={() => setActiveTab(idx)}
                className={`h-[42px] px-4 sm:px-5 text-left font-mono text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex items-center relative min-w-[100px] sm:min-w-0 ${
                  isActive
                    ? 'text-[#64ffda] bg-[#112240]/60 sm:bg-transparent font-medium'
                    : 'text-[#8892b0] hover:text-[#ccd6f6] hover:bg-[#112240]/30'
                }`}
                style={{
                  color: isActive ? accentColor : undefined,
                }}
              >
                <span>{job.company}</span>
                {/* Mobile active bottom indicator line */}
                {isActive && (
                  <div
                    className="sm:hidden absolute bottom-[-2px] left-0 right-0 h-[2px]"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 py-1 sm:px-3">
          <h3 className="text-lg sm:text-xl font-semibold text-[#ccd6f6] mb-1.5 flex flex-wrap items-baseline gap-x-1.5">
            <span>{activeJob.role}</span>
            <span style={{ color: accentColor }}>@</span>
            <a
              href={activeJob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline transition-colors"
              style={{ color: accentColor }}
            >
              <span>{activeJob.company}</span>
              <ExternalLink size={13} className="inline ml-0.5 opacity-80" />
            </a>
          </h3>

          <p className="font-mono text-xs sm:text-sm text-[#a8b2d1] mb-5">
            {activeJob.range}
          </p>

          <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-[#8892b0]">
            {activeJob.duties.map((duty, idx) => (
              <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                <span
                  className="font-mono text-xs sm:text-sm leading-5 sm:leading-6 select-none shrink-0"
                  style={{ color: accentColor }}
                >
                  ▹
                </span>
                <span className="leading-relaxed">{duty}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

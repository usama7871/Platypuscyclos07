import React, { useState } from 'react';
import { OtherProject, FeaturedProject } from '../config/portfolio';
import { X, ExternalLink, Github, Search } from 'lucide-react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  featured: FeaturedProject[];
  other: OtherProject[];
  accentColor?: string;
}

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  isOpen,
  onClose,
  featured,
  other,
  accentColor = '#64ffda',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Combine projects for complete archive
  const allArchive = [
    ...featured.map((p, i) => ({
      year: (2024 - i).toString(),
      title: p.title,
      madeAt: 'Featured',
      tech: p.tech,
      github: p.github,
      external: p.external,
    })),
    ...other.map((p) => ({
      year: p.year || '2020',
      title: p.title,
      madeAt: p.madeAt || '—',
      tech: p.tech,
      github: p.github,
      external: p.external,
    })),
  ].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  const filtered = allArchive.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.madeAt.toLowerCase().includes(q) ||
      item.tech.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#020c1b]/85 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-[#0a192f] border border-[#233554] rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#233554]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ccd6f6]">Archive</h2>
            <p className="font-mono text-xs sm:text-sm text-[#8892b0] mt-0.5">
              A complete list of things I’ve built
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#8892b0] hover:text-[#ccd6f6] rounded hover:bg-[#112240] transition-colors"
            aria-label="Close Archive"
          >
            <X size={22} />
          </button>
        </div>

        {/* Filter Input */}
        <div className="p-3 sm:px-6 bg-[#112240]/40 border-b border-[#233554] flex items-center gap-3">
          <Search size={16} className="text-[#8892b0] shrink-0" />
          <input
            type="text"
            placeholder="Filter projects by title, tech, or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-[#ccd6f6] placeholder-[#8892b0] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="font-mono text-xs text-[#8892b0] hover:text-[#ccd6f6] shrink-0"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table Content with Responsive Horizontal Scroll */}
        <div className="overflow-y-auto overflow-x-auto flex-grow p-3 sm:p-6">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-[#233554] text-xs font-mono text-[#ccd6f6]">
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3 hidden md:table-cell">Made at</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Built with</th>
                <th className="py-2.5 px-3 text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#233554]/40 font-mono text-xs sm:text-sm">
              {filtered.map((item, idx) => (
                <tr
                  key={`${item.title}-${idx}`}
                  className="hover:bg-[#112240]/50 transition-colors group"
                >
                  <td className="py-3 px-3 text-[#64ffda] whitespace-nowrap" style={{ color: accentColor }}>
                    {item.year}
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#ccd6f6] group-hover:text-[#64ffda] transition-colors">
                    {item.title}
                  </td>
                  <td className="py-3 px-3 text-[#8892b0] hidden md:table-cell">
                    {item.madeAt}
                  </td>
                  <td className="py-3 px-3 text-[#8892b0] hidden sm:table-cell">
                    <span className="text-xs">
                      {item.tech.join(' · ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2.5 text-[#a8b2d1]">
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="hover:text-[#64ffda] transition-colors p-1"
                        >
                          <Github size={15} />
                        </a>
                      )}
                      {item.external && (
                        <a
                          href={item.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="External Link"
                          className="hover:text-[#64ffda] transition-colors p-1"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-[#8892b0] text-sm">
              <p>No projects match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

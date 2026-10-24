import React, { useState } from 'react';
import { PortfolioConfig } from '../config/portfolio';
import { X, Copy, Check, Download, Sparkles, Rocket, Palette, FileCode2, ExternalLink, Lock, Eye, EyeOff, GitBranch } from 'lucide-react';

interface TemplateCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onUpdateConfig: (newConfig: PortfolioConfig) => void;
  onResetToDefault: () => void;
  onLockAdmin: () => void;
  isStealthMode: boolean;
  onToggleStealthMode: (stealth: boolean) => void;
  initialTab?: 'editor' | 'deploy';
}

const COLOR_PRESETS = [
  { name: 'Teal (Iconic v4)', hex: '#64ffda' },
  { name: 'Sky Blue', hex: '#38bdf8' },
  { name: 'Electric Indigo', hex: '#818cf8' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber Gold', hex: '#fbbf24' },
  { name: 'Rose Red', hex: '#f43f5e' },
  { name: 'Neon Purple', hex: '#c084fc' },
];

export const TemplateCustomizerModal: React.FC<TemplateCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetToDefault,
  onLockAdmin,
  isStealthMode,
  onToggleStealthMode,
  initialTab = 'editor',
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'deploy' | 'code'>(initialTab);
  const [copied, setCopied] = useState(false);

  // Editable local draft
  const [name, setName] = useState(config.personal.name);
  const [logoLetter, setLogoLetter] = useState(config.personal.logoLetter);
  const [tagline, setTagline] = useState(config.personal.tagline);
  const [email, setEmail] = useState(config.personal.email);
  const [shortBio, setShortBio] = useState(config.personal.shortBio);
  const [accentColor, setAccentColor] = useState(config.theme.accentColor);
  const [resumeUrl, setResumeUrl] = useState(config.personal.resumeUrl);

  if (!isOpen) return null;

  const handleApplyChanges = () => {
    onUpdateConfig({
      ...config,
      personal: {
        ...config.personal,
        name,
        logoLetter,
        tagline,
        email,
        shortBio,
        resumeUrl,
      },
      theme: {
        ...config.theme,
        accentColor,
        accentTint: `${accentColor}18`,
      },
    });
  };

  const handleColorSelect = (hex: string) => {
    setAccentColor(hex);
    onUpdateConfig({
      ...config,
      theme: {
        ...config.theme,
        accentColor: hex,
        accentTint: `${hex}18`,
      },
    });
  };

  const loadPreset = (type: 'fullstack' | 'designer' | 'ai') => {
    if (type === 'fullstack') {
      setName('Alex Rivera');
      setLogoLetter('A');
      setTagline('I engineer robust full-stack cloud systems.');
      setEmail('alex.rivera@example.com');
      setShortBio('Full-stack engineer with 6+ years specializing in distributed systems, TypeScript, React, and scalable cloud microservices.');
      setAccentColor('#38bdf8');
      onUpdateConfig({
        ...config,
        personal: {
          ...config.personal,
          name: 'Alex Rivera',
          logoLetter: 'A',
          tagline: 'I engineer robust full-stack cloud systems.',
          email: 'alex.rivera@example.com',
          shortBio: 'Full-stack engineer with 6+ years specializing in distributed systems, TypeScript, React, and scalable cloud microservices.',
        },
        theme: {
          ...config.theme,
          accentColor: '#38bdf8',
          accentTint: '#38bdf818',
        },
      });
    } else if (type === 'designer') {
      setName('Elena Vance');
      setLogoLetter('E');
      setTagline('I craft pixel-perfect digital experiences.');
      setEmail('elena@vancestudio.design');
      setShortBio('Design engineer bridging the gap between product strategy, tactile UI design systems, and frontend code.');
      setAccentColor('#c084fc');
      onUpdateConfig({
        ...config,
        personal: {
          ...config.personal,
          name: 'Elena Vance',
          logoLetter: 'E',
          tagline: 'I craft pixel-perfect digital experiences.',
          email: 'elena@vancestudio.design',
          shortBio: 'Design engineer bridging the gap between product strategy, tactile UI design systems, and frontend code.',
        },
        theme: {
          ...config.theme,
          accentColor: '#c084fc',
          accentTint: '#c084fc18',
        },
      });
    } else if (type === 'ai') {
      setName('Marcus Chen');
      setLogoLetter('M');
      setTagline('I build intelligent agents & machine learning products.');
      setEmail('marcus.chen@ml-research.io');
      setShortBio('AI engineer focused on multimodal foundation models, agentic workflows, and high-performance inference pipelines.');
      setAccentColor('#10b981');
      onUpdateConfig({
        ...config,
        personal: {
          ...config.personal,
          name: 'Marcus Chen',
          logoLetter: 'M',
          tagline: 'I build intelligent agents & machine learning products.',
          email: 'marcus.chen@ml-research.io',
          shortBio: 'AI engineer focused on multimodal foundation models, agentic workflows, and high-performance inference pipelines.',
        },
        theme: {
          ...config.theme,
          accentColor: '#10b981',
          accentTint: '#10b98118',
        },
      });
    }
  };

  const generateConfigTypeScript = () => {
    return `import { PortfolioConfig } from './portfolio';

// Updated configuration ready to replace src/config/portfolio.ts
export const defaultPortfolioConfig: PortfolioConfig = ${JSON.stringify(
      {
        ...config,
        personal: {
          ...config.personal,
          name,
          logoLetter,
          tagline,
          email,
          shortBio,
          resumeUrl,
        },
        theme: {
          ...config.theme,
          accentColor,
          accentTint: `${accentColor}18`,
        },
      },
      null,
      2
    )};
`;
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(generateConfigTypeScript());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadConfig = () => {
    const element = document.createElement('a');
    const file = new Blob([generateConfigTypeScript()], { type: 'text/typescript' });
    element.href = URL.createObjectURL(file);
    element.download = 'portfolio.ts';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#020c1b]/85 backdrop-blur-md"
    >
      <div className="bg-[#0a192f] border border-[#233554] rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-[#233554] bg-[#112240]/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#233554] text-[#64ffda]">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#ccd6f6] flex items-center gap-2">
                <span>Template & Deployment Center</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Authorized
                </span>
              </h2>
              <p className="text-[11px] font-mono text-[#8892b0] hidden sm:block">
                Edit content, test themes, or lock admin access
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLockAdmin();
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded text-[#8892b0] hover:text-[#ccd6f6] bg-[#0a192f] border border-[#233554] hover:border-red-400/40 transition-colors"
              title="Lock Admin and require password next time"
            >
              <Lock size={13} className="text-amber-400" />
              <span className="hidden sm:inline">Lock Admin</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8892b0] hover:text-[#ccd6f6] rounded hover:bg-[#112240] transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[#233554] px-4 sm:px-6 bg-[#0a192f] shrink-0 no-scrollbar">
          <button
            onClick={() => setActiveTab('editor')}
            className={`py-3 px-3 sm:px-4 font-mono text-xs border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'border-[#64ffda] text-[#64ffda]'
                : 'border-transparent text-[#8892b0] hover:text-[#ccd6f6]'
            }`}
          >
            <Palette size={14} />
            <span>Live Editor & Themes</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`py-3 px-3 sm:px-4 font-mono text-xs border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'deploy'
                ? 'border-[#64ffda] text-[#64ffda]'
                : 'border-transparent text-[#8892b0] hover:text-[#ccd6f6]'
            }`}
          >
            <Rocket size={14} />
            <span>Deploy to Vercel/Netlify</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3 sm:px-4 font-mono text-xs border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-[#64ffda] text-[#64ffda]'
                : 'border-transparent text-[#8892b0] hover:text-[#ccd6f6]'
            }`}
          >
            <FileCode2 size={14} />
            <span>Export Config Code</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-grow p-4 sm:p-6 space-y-6">
          {activeTab === 'editor' && (
            <div className="space-y-6">
              {/* Repository Source of Truth Notice */}
              <div className="bg-[#112240] p-4 rounded-lg border border-[#233554] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#0a192f] text-[#64ffda] shrink-0">
                    <GitBranch size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#ccd6f6]">
                      Permanent Changes via Git Repository
                    </p>
                    <p className="text-[11px] text-[#8892b0] mt-0.5">
                      To permanently change the website for production, edit <code className="text-[#64ffda] font-mono">src/config/portfolio.ts</code> directly in the code repository.
                    </p>
                  </div>
                </div>

                {/* Stealth Mode Toggle */}
                <button
                  onClick={() => onToggleStealthMode(!isStealthMode)}
                  className={`px-3 py-1.5 rounded text-xs font-mono border transition-all shrink-0 flex items-center gap-1.5 ${
                    isStealthMode
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-[#0a192f] border-[#233554] text-[#8892b0] hover:text-[#ccd6f6]'
                  }`}
                  title="Toggle visibility of the Customize button in the header"
                >
                  {isStealthMode ? <EyeOff size={13} /> : <Eye size={13} />}
                  <span>{isStealthMode ? 'Stealth Mode (Buttons Hidden)' : 'Public Button Visible'}</span>
                </button>
              </div>

              {/* Quick Persona Presets */}
              <div className="bg-[#112240]/60 p-4 rounded-lg border border-[#233554]">
                <p className="text-xs font-mono text-[#64ffda] mb-2 uppercase tracking-wider">
                  Quick Starter Presets (Click to instant switch)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={onResetToDefault}
                    className="p-2 text-xs font-mono rounded bg-[#0a192f] hover:bg-[#233554] border border-[#233554] text-[#ccd6f6] text-left transition-colors"
                  >
                    <span className="block font-semibold">Brittany Chiang</span>
                    <span className="text-[10px] text-[#8892b0]">Original v4</span>
                  </button>
                  <button
                    onClick={() => loadPreset('fullstack')}
                    className="p-2 text-xs font-mono rounded bg-[#0a192f] hover:bg-[#233554] border border-[#233554] text-[#ccd6f6] text-left transition-colors"
                  >
                    <span className="block font-semibold">Alex Rivera</span>
                    <span className="text-[10px] text-[#8892b0]">Full-Stack Eng</span>
                  </button>
                  <button
                    onClick={() => loadPreset('designer')}
                    className="p-2 text-xs font-mono rounded bg-[#0a192f] hover:bg-[#233554] border border-[#233554] text-[#ccd6f6] text-left transition-colors"
                  >
                    <span className="block font-semibold">Elena Vance</span>
                    <span className="text-[10px] text-[#8892b0]">UI/UX Designer</span>
                  </button>
                  <button
                    onClick={() => loadPreset('ai')}
                    className="p-2 text-xs font-mono rounded bg-[#0a192f] hover:bg-[#233554] border border-[#233554] text-[#ccd6f6] text-left transition-colors"
                  >
                    <span className="block font-semibold">Marcus Chen</span>
                    <span className="text-[10px] text-[#8892b0]">AI/ML Engineer</span>
                  </button>
                </div>
              </div>

              {/* Accent Color Chooser */}
              <div>
                <label className="block text-xs font-mono text-[#ccd6f6] mb-2">
                  Accent Color Palette
                </label>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => handleColorSelect(color.hex)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                        accentColor === color.hex
                          ? 'border-white ring-2 ring-offset-2 ring-offset-[#0a192f] ring-white'
                          : 'border-[#233554] text-[#8892b0] hover:text-[#ccd6f6]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#a8b2d1] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#112240] border border-[#233554] rounded p-2.5 text-sm text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a8b2d1] mb-1">
                    Logo Monogram Letter
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={logoLetter}
                    onChange={(e) => setLogoLetter(e.target.value.toUpperCase())}
                    className="w-full bg-[#112240] border border-[#233554] rounded p-2.5 text-sm text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none uppercase"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-[#a8b2d1] mb-1">
                    Tagline (Headline underneath your name)
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-[#112240] border border-[#233554] rounded p-2.5 text-sm text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a8b2d1] mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#112240] border border-[#233554] rounded p-2.5 text-sm text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#a8b2d1] mb-1">
                    Resume Link URL
                  </label>
                  <input
                    type="text"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="w-full bg-[#112240] border border-[#233554] rounded p-2.5 text-sm text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-[#a8b2d1] mb-1">
                    Short Bio (Hero section)
                  </label>
                  <textarea
                    rows={3}
                    value={shortBio}
                    onChange={(e) => setShortBio(e.target.value)}
                    className="w-full bg-[#112240] border border-[#233554] rounded p-2.5 text-sm text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#233554]">
                <button
                  onClick={onResetToDefault}
                  className="text-xs font-mono text-[#8892b0] hover:text-[#ccd6f6] underline"
                >
                  Reset to Original Brittany Chiang v4
                </button>

                <button
                  onClick={() => {
                    handleApplyChanges();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded font-mono text-xs font-semibold text-[#0a192f] bg-[#64ffda] hover:bg-[#64ffda]/90 transition-colors"
                >
                  Apply & Preview Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'deploy' && (
            <div className="space-y-6 text-[#a8b2d1] text-sm">
              <div className="bg-[#112240] p-4 rounded-lg border border-[#233554]">
                <h3 className="text-base font-bold text-[#ccd6f6] mb-1 flex items-center gap-2">
                  <Rocket size={18} className="text-[#64ffda]" />
                  1-Click Deployment Guide for Vercel & Netlify
                </h3>
                <p className="text-xs text-[#8892b0]">
                  This template already includes pre-configured <code className="text-[#64ffda]">vercel.json</code> and <code className="text-[#64ffda]">netlify.toml</code>. You can deploy it completely free in under 60 seconds!
                </p>
              </div>

              {/* Step 1: Push to GitHub */}
              <div className="space-y-2">
                <h4 className="font-semibold text-[#ccd6f6] flex items-center gap-2 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#233554] text-[#64ffda] text-xs flex items-center justify-center font-mono">1</span>
                  Push Code to your GitHub Repository
                </h4>
                <div className="bg-[#020c1b] p-3 sm:p-4 rounded font-mono text-xs text-[#8892b0] overflow-x-auto space-y-1">
                  <p className="text-[#ccd6f6]"># In your terminal inside the project directory:</p>
                  <p>git init</p>
                  <p>git add .</p>
                  <p>git commit -m "Initialize Brittany Chiang v4 template"</p>
                  <p>git branch -M main</p>
                  <p>git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git</p>
                  <p>git push -u origin main</p>
                </div>
              </div>

              {/* Step 2: Deploy on Vercel */}
              <div className="space-y-2">
                <h4 className="font-semibold text-[#ccd6f6] flex items-center gap-2 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#233554] text-[#64ffda] text-xs flex items-center justify-center font-mono">2A</span>
                  Option A: Deploy with Vercel (Recommended)
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#8892b0] pl-2">
                  <li>Go to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-[#64ffda] hover:underline inline-flex items-center gap-0.5">vercel.com/new <ExternalLink size={11} /></a> and sign in with GitHub.</li>
                  <li>Select your repository and click <strong>Import</strong>.</li>
                  <li>Framework Preset: <strong>Vite</strong> (automatically detected).</li>
                  <li>Build Command: <code className="text-[#ccd6f6]">npm run build</code> | Output Directory: <code className="text-[#ccd6f6]">dist</code>.</li>
                  <li>Click <strong>Deploy</strong>. Your site is live with a free SSL certificate!</li>
                </ol>
              </div>

              {/* Step 3: Deploy on Netlify */}
              <div className="space-y-2">
                <h4 className="font-semibold text-[#ccd6f6] flex items-center gap-2 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#233554] text-[#64ffda] text-xs flex items-center justify-center font-mono">2B</span>
                  Option B: Deploy with Netlify
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#8892b0] pl-2">
                  <li>Go to <a href="https://app.netlify.com/start" target="_blank" rel="noreferrer" className="text-[#64ffda] hover:underline inline-flex items-center gap-0.5">app.netlify.com <ExternalLink size={11} /></a> and choose "Import from Git".</li>
                  <li>Select your GitHub repository.</li>
                  <li>Netlify automatically reads the included <code className="text-[#64ffda]">netlify.toml</code> file!</li>
                  <li>Click <strong>Deploy Site</strong>. Done!</li>
                </ol>
              </div>

              {/* Step 4: Custom domain */}
              <div className="p-4 bg-[#112240]/40 rounded border border-[#233554] text-xs">
                <p className="font-semibold text-[#ccd6f6] mb-1">Custom Domain Setup</p>
                <p>
                  Both Vercel and Netlify allow you to add custom domains (e.g. <code className="text-[#64ffda]">yourname.com</code> or <code className="text-[#64ffda]">clientname.dev</code>) for free in Project Settings → Domains with automatic HTTPS renewal.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-[#8892b0] font-mono">
                  Copy this code to update <code className="text-[#64ffda]">src/config/portfolio.ts</code> in your repository:
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#112240] hover:bg-[#233554] border border-[#233554] text-xs font-mono text-[#ccd6f6] transition-colors"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={handleDownloadConfig}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#64ffda] hover:bg-[#64ffda]/90 text-xs font-mono text-[#0a192f] font-semibold transition-colors"
                  >
                    <Download size={14} />
                    <span>Download portfolio.ts</span>
                  </button>
                </div>
              </div>

              <pre className="bg-[#020c1b] p-4 rounded-lg border border-[#233554] text-[11px] font-mono text-[#8892b0] overflow-x-auto max-h-[380px] leading-relaxed">
                <code>{generateConfigTypeScript()}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

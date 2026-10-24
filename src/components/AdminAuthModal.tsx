import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  accentColor?: string;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  accentColor = '#64ffda',
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Required password: scacee
    if (password === 'scacee') {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020c1b]/85 backdrop-blur-md animate-fade-in"
    >
      <div
        className={`bg-[#0a192f] border border-[#233554] rounded-xl w-full max-w-md shadow-2xl overflow-hidden transition-transform duration-200 ${
          isShaking ? 'translate-x-[-8px] ring-2 ring-red-500/50' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#233554] bg-[#112240]/40">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg bg-[#233554] flex items-center justify-center"
              style={{ color: accentColor }}
            >
              <Lock size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#ccd6f6]">
                Admin Authentication
              </h3>
              <p className="text-xs font-mono text-[#8892b0]">
                Portfolio Template & Deployment Center
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setError(false);
              setPassword('');
              onClose();
            }}
            className="p-1.5 text-[#8892b0] hover:text-[#ccd6f6] rounded transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="text-xs text-[#8892b0] leading-relaxed">
            <p>
              This section is restricted to the site owner and developers. Please enter the administrative passcode to access the customizer and deployment controls.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#ccd6f6]">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Enter passcode..."
                className="w-full bg-[#112240] border border-[#233554] focus:border-[#64ffda] rounded-lg px-4 py-2.5 text-sm text-[#ccd6f6] placeholder-[#8892b0]/60 focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8892b0] hover:text-[#ccd6f6] p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-red-400 text-xs font-mono pt-1">
                <AlertCircle size={14} />
                <span>Incorrect passcode. Please try again.</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-mono text-[#8892b0] hover:text-[#ccd6f6] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded font-mono text-xs font-semibold text-[#0a192f] transition-all hover:brightness-110 flex items-center gap-1.5"
              style={{ backgroundColor: accentColor }}
            >
              <ShieldCheck size={14} />
              <span>Unlock Admin Center</span>
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-[#112240]/20 border-t border-[#233554] text-[11px] font-mono text-[#8892b0]/70">
          Hint: Authorized password is configured in settings.
        </div>
      </div>
    </div>
  );
};

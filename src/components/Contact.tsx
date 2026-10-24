import React from 'react';

interface ContactProps {
  number?: string;
  kicker?: string;
  title?: string;
  description: string;
  buttonText?: string;
  email: string;
  emailSubject?: string;
  accentColor?: string;
}

export const Contact: React.FC<ContactProps> = ({
  number = '04.',
  kicker = "What's Next?",
  title = 'Get In Touch',
  description,
  buttonText = 'Say Hello',
  email,
  emailSubject = 'Hello from your portfolio!',
  accentColor = '#64ffda',
}) => {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="max-w-2xl mx-auto py-20 sm:py-28 px-5 sm:px-8 text-center flex flex-col items-center w-full"
    >
      <p
        className="font-mono text-xs sm:text-sm md:text-base mb-2 sm:mb-3 font-normal"
        style={{ color: accentColor }}
      >
        {number} {kicker}
      </p>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#ccd6f6] mb-4 sm:mb-5 tracking-tight">
        {title}
      </h2>

      <p className="text-[#8892b0] text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-12 max-w-lg">
        {description}
      </p>

      <a
        href={`mailto:${email}?subject=${encodeURIComponent(emailSubject)}`}
        className="px-8 sm:px-9 py-4 sm:py-4.5 border rounded font-mono text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-1 inline-block"
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
        {buttonText}
      </a>
    </section>
  );
};

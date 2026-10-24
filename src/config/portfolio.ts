/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION FILE
 * ==============================================================================
 * 
 * Edit this single file to completely customize this portfolio website for
 * yourself or for your clients! Everything automatically updates across the site.
 * 
 * DEPLOYMENT READY:
 * - Vercel: Push to GitHub, import project, click Deploy.
 * - Netlify: Push to GitHub, import project, click Deploy.
 * (Zero config needed - package.json build script and dist output are preset!)
 */

export interface NavLinkItem {
  name: string;
  url: string;
  number: string;
}

export interface SocialItem {
  name: string;
  url: string;
  icon: 'github' | 'instagram' | 'twitter' | 'linkedin' | 'codepen' | 'youtube' | 'globe' | 'mail';
}

export interface ExperienceItem {
  company: string;
  role: string;
  url: string;
  range: string;
  duties: string[];
}

export interface FeaturedProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  image: string;
  imageAlt?: string;
}

export interface OtherProject {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
  year?: string;
  madeAt?: string;
}

export interface ThemeConfig {
  accentColor: string;       // Default iconic teal: #64ffda
  accentTint: string;        // rgba(100, 255, 218, 0.1)
  bgPrimary: string;         // Default dark navy: #0a192f
  bgSecondary: string;       // Default light navy: #112240
  bgTertiary: string;        // Default lightest navy: #233554
  textPrimary: string;       // Default lightest slate: #ccd6f6
  textSecondary: string;     // Default slate: #8892b0
  fontMono: string;          // Default 'Fira Code', monospace
}

export interface PortfolioConfig {
  meta: {
    siteTitle: string;
    siteDescription: string;
    siteUrl: string;
    ogImage?: string;
    keywords?: string[];
  };
  personal: {
    name: string;
    logoLetter: string;      // The monogram letter in the hexagonal logo (e.g. "B")
    greeting: string;        // "Hi, my name is"
    tagline: string;         // "I build things for the web."
    shortBio: string;        // Lead paragraph shown in the hero section
    email: string;
    location?: string;
    resumeUrl: string;       // Link or /resume.pdf
  };
  socials: SocialItem[];
  navLinks: NavLinkItem[];
  about: {
    title: string;
    number: string;
    paragraphs: string[];
    skillsTitle: string;
    skills: string[];
    avatarImage: string;
    avatarAlt: string;
  };
  experience: {
    title: string;
    number: string;
    jobs: ExperienceItem[];
  };
  projects: {
    title: string;
    number: string;
    featured: FeaturedProject[];
    otherHeading: string;
    otherSubheading?: string;
    archiveLinkText: string;
    other: OtherProject[];
  };
  contact: {
    number: string;
    kicker: string;
    title: string;
    description: string;
    buttonText: string;
    emailSubject: string;
  };
  footer: {
    designedByText: string;
    repoUrl?: string;
    copyrightYear: number;
  };
  theme: ThemeConfig;
}

export const defaultPortfolioConfig: PortfolioConfig = {
  meta: {
    siteTitle: "Brittany Chiang | Software Engineer",
    siteDescription: "Brittany Chiang is a software engineer who specializes in building exceptional digital experiences.",
    siteUrl: "https://v4.brittanychiang.com",
    keywords: ["software engineer", "frontend developer", "react", "javascript", "portfolio template"],
  },
  personal: {
    name: "Brittany Chiang",
    logoLetter: "B",
    greeting: "Hi, my name is",
    tagline: "I build things for the web.",
    shortBio: "I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at Upstatement.",
    email: "brittany.chiang@gmail.com",
    location: "Boston, MA",
    resumeUrl: "#resume",
  },
  socials: [
    { name: "GitHub", url: "https://github.com/bchiang7", icon: "github" },
    { name: "Instagram", url: "https://instagram.com/bchiang7", icon: "instagram" },
    { name: "Twitter", url: "https://twitter.com/bchiang7", icon: "twitter" },
    { name: "LinkedIn", url: "https://linkedin.com/in/bchiang7", icon: "linkedin" },
    { name: "CodePen", url: "https://codepen.io/bchiang7", icon: "codepen" },
  ],
  navLinks: [
    { name: "About", url: "#about", number: "01." },
    { name: "Experience", url: "#experience", number: "02." },
    { name: "Work", url: "#work", number: "03." },
    { name: "Contact", url: "#contact", number: "04." },
  ],
  about: {
    title: "About Me",
    number: "01.",
    paragraphs: [
      "Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!",
      "Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.",
      "I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.",
    ],
    skillsTitle: "Here are a few technologies I've been working with recently:",
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Eleventy",
      "Node.js",
      "WordPress",
    ],
    avatarImage: "/src/assets/images/portfolio_avatar_portrait_1792802398456.jpg",
    avatarAlt: "Brittany Chiang Portrait",
  },
  experience: {
    title: "Where I've Worked",
    number: "02.",
    jobs: [
      {
        company: "Upstatement",
        role: "Lead Engineer",
        url: "https://upstatement.com",
        range: "May 2018 - Present",
        duties: [
          "Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, and more.",
          "Work alongside creative directors to lead the research, design, and architecture of technical solutions to fulfill business requirements.",
          "Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities for clients and stakeholders.",
          "Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
        ],
      },
      {
        company: "Apple",
        role: "UI Engineer Co-op",
        url: "https://apple.com",
        range: "July - Dec 2017",
        duties: [
          "Developed and styled interactive web applications and internal tools for Apple Media Products supporting millions of global users.",
          "Built and maintained reusable UI component libraries following Apple design and accessibility guidelines.",
          "Architected and implemented front-end test automation suites using Jest and Cypress to ensure zero-regression deployments.",
        ],
      },
      {
        company: "Scout",
        role: "Studio Developer",
        url: "https://scout.camd.northeastern.edu",
        range: "Jan - June 2017",
        duties: [
          "Collaborated with other student designers and engineers on pro-bono branding and web development projects for local Boston non-profits.",
          "Built responsive, accessible static websites and custom WordPress themes from scratch.",
          "Organized weekly tech talks and design critique sessions across multidisciplinary teams.",
        ],
      },
      {
        company: "Starry",
        role: "Software Engineer Co-op",
        url: "https://starry.com",
        range: "July - Dec 2016",
        duties: [
          "Engineered high-performance web dashboard applications connecting customer premises equipment to network telemetry infrastructure.",
          "Integrated RESTful APIs and real-time WebSockets for wireless connection diagnostics.",
          "Communicated with multi-disciplinary teams of engineers, designers, and system administrators on a daily basis.",
        ],
      },
      {
        company: "MullenLowe",
        role: "Creative Technologist Co-op",
        url: "https://us.mullenlowe.com",
        range: "July - Dec 2015",
        duties: [
          "Developed, maintained, and shipped production code for client creative campaigns across web, digital billboards, and interactive kiosks.",
          "Pioneered micro-animations and physics-based interactions for award-winning digital marketing experiences.",
        ],
      },
    ],
  },
  projects: {
    title: "Some Things I've Built",
    number: "03.",
    featured: [
      {
        title: "Spotify Profile",
        description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio analysis of each track. Create and save new playlists of recommended tracks based on your existing library and more.",
        tech: ["React", "Styled Components", "Express", "Spotify API", "Heroku"],
        github: "https://github.com/bchiang7/spotify-profile",
        external: "https://spotify-profile.herokuapp.com",
        image: "/src/assets/images/project_spotify_app_1792802399600.jpg",
        imageAlt: "Spotify Profile Dashboard",
      },
      {
        title: "Halcyon Theme",
        description: "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm with over 500,000+ installs worldwide.",
        tech: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
        github: "https://github.com/bchiang7/halcyon-vscode",
        external: "https://halcyon-theme.netlify.app",
        image: "/src/assets/images/project_dev_platform_1792802399846.jpg",
        imageAlt: "Halcyon Theme Showcase",
      },
      {
        title: "Build a Spotify Connected App",
        description: "A comprehensive video course and project template teaching developers how to build a full-stack web application with the Spotify Web API using React, Node.js, Express, and modern OAuth 2.0 flows.",
        tech: ["React", "Express", "Spotify API", "Tailwind CSS", "OAuth 2.0"],
        external: "https://www.newline.co/courses/build-a-spotify-connected-app",
        image: "/src/assets/images/project_spotify_app_1792802399600.jpg",
        imageAlt: "Course Platform",
      },
    ],
    otherHeading: "Other Noteworthy Projects",
    otherSubheading: "a collection of side experiments and open-source tools",
    archiveLinkText: "view the archive",
    other: [
      {
        title: "Integrating Algolia Search with WordPress Multisite",
        description: "Building a custom Multisite compatible WordPress plugin to seamlessly sync products, pages, and blog posts with Algolia Search index.",
        tech: ["Algolia", "WordPress", "PHP"],
        github: "https://github.com/bchiang7/algolia-search",
        external: "https://upstatement.com/blog/integrating-algolia-search-with-wordpress-multisite",
        year: "2020",
        madeAt: "Upstatement",
      },
      {
        title: "Time to Have More Fun",
        description: "A single page web app to help users discover fun and quirky activities to do around Boston based on current weather, time of day, and transit options.",
        tech: ["Next.js", "Tailwind CSS", "Vercel"],
        github: "https://github.com/bchiang7/time-to-have-more-fun",
        external: "https://time-to-have-more-fun.now.sh",
        year: "2019",
        madeAt: "Personal",
      },
      {
        title: "OctoProfile",
        description: "A nicer look at your GitHub profile and repository stats. Includes charts, top languages breakdown, star counts, and repo filtering.",
        tech: ["Next.js", "Chart.js", "GitHub API"],
        github: "https://github.com/bchiang7/octoprofile",
        external: "https://octoprofile.now.sh",
        year: "2019",
        madeAt: "Personal",
      },
      {
        title: "Apple Music Embeddable Web Player",
        description: "Custom embeddable web player widget for Apple Music with support for playlists, album previews, responsive resizing, and track scrub controls.",
        tech: ["MusicKit JS", "JavaScript", "SCSS"],
        external: "https://tools.applemusic.com",
        year: "2018",
        madeAt: "Apple",
      },
      {
        title: "Google Keep Clone",
        description: "A lightweight Google Keep notes clone with color tagging, rich text formatting, drag-and-drop ordering, and offline localStorage synchronization.",
        tech: ["React", "Redux", "Firebase"],
        github: "https://github.com/bchiang7/google-keep-clone",
        year: "2017",
        madeAt: "Personal",
      },
      {
        title: "Personal Website V3",
        description: "Third iteration of my personal website built with Jekyll and hosted on GitHub Pages, featuring custom SVG illustrations and responsive typography.",
        tech: ["Jekyll", "SCSS", "GitHub Pages"],
        github: "https://github.com/bchiang7/bchiang7.github.io",
        external: "https://bchiang7.github.io/v3",
        year: "2017",
        madeAt: "Personal",
      },
    ],
  },
  contact: {
    number: "04.",
    kicker: "What's Next?",
    title: "Get In Touch",
    description: "Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    buttonText: "Say Hello",
    emailSubject: "Hello from your portfolio!",
  },
  footer: {
    designedByText: "Designed & Built by Brittany Chiang",
    repoUrl: "https://github.com/bchiang7/v4",
    copyrightYear: 2026,
  },
  theme: {
    accentColor: "#64ffda",
    accentTint: "rgba(100, 255, 218, 0.1)",
    bgPrimary: "#0a192f",
    bgSecondary: "#112240",
    bgTertiary: "#233554",
    textPrimary: "#ccd6f6",
    textSecondary: "#8892b0",
    fontMono: "'Fira Code', monospace",
  },
};

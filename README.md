# Brittany Chiang v4 Portfolio Template

A modern, pixel-perfect clone and customizable developer portfolio template based on [Brittany Chiang's iconic v4 website](https://v4.brittanychiang.com/) and [GitHub repository](https://github.com/bchiang7/v4).

Built with **React**, **TypeScript**, and **Tailwind CSS**, engineered to build, customize, and deploy personal portfolios or client websites with ultra-responsive support across phones, tablets, laptops, and 4K displays.

---

## 🔒 Protected Admin Center & Security

The **Portfolio Template & Deployment Center** is protected with an authorization gate so casual visitors and clients cannot alter or access developer controls.

- **Admin Passcode**: `scacee`
- **Keyboard Shortcut**: Press `Ctrl + Shift + E` (or `Cmd + Shift + E` on Mac) anywhere on the page to trigger the admin modal.
- **Stealth Mode**: Inside the Admin Center, you can toggle **Stealth Mode** to completely hide the "Admin" or "Customize" buttons from the header and mobile screen. You can still unlock it using the keyboard shortcut or by clicking the subtle lock icon in the footer.
- **Repository as Source of Truth**: The admin customizer provides instant in-browser previews and code generation. For production deployments, all permanent changes are committed directly to `src/config/portfolio.ts` in your Git repository.

---

## 📱 Ultra-Responsive Across All Devices

- **Mobile Viewports (<640px)**: 
  - Dynamic fluid typography with zero horizontal overflow.
  - Horizontal swipeable tabs with bottom indicator line for **Where I've Worked**.
  - Seamless stacked project cards with high-contrast readable text.
  - Contained avatar photo with responsive offset border that never clips.
  - Full-screen mobile drawer menu with touch-optimized links ($\ge 44\text{px}$) and integrated social accounts.
- **Tablets & Foldables (640px – 1024px)**:
  - 2-column balanced layouts, adaptive padding, and responsive touch controls.
- **Laptops & Desktops (>1024px)**:
  - Signature fixed vertical social bar (left) and vertical email bar (right).
  - Alternating overlapping project cards with screenshot depth.
  - Interactive vertical tab list with animated sliding indicator.
  - Interactive radial cursor glow and smooth reading progress bar.

---

## 🚀 Quick Customization via Configuration

All content, biography, jobs, projects, social links, resume, and color schemes are centralized in a single file:

```
src/config/portfolio.ts
```

### Key Sections to Edit:
1. `personal`: Name, role, headline, short bio, email, resume link, monogram logo letter.
2. `socials`: GitHub, LinkedIn, Twitter/X, Instagram, CodePen profiles.
3. `about`: Background paragraphs and current technologies list.
4. `experience`: Jobs, companies, URLs, dates, and bulleted duties.
5. `projects.featured`: 3 highlight projects with screenshots, descriptions, and tags.
6. `projects.other`: Side projects for the noteworthy projects grid and searchable archive.
7. `theme`: Accent color palette (default is Brittany's signature `#64ffda` teal).

---

## 🌐 1-Click Deploy to Vercel

Pre-configured `vercel.json` included in the root.

1. Push this project to your GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initialize Brittany Chiang v4 template"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/my-portfolio.git
   git push -u origin main
   ```
2. Open [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: **Vite** (detected automatically).
4. Click **Deploy**. Free SSL and custom domain included!

---

## ⚡ 1-Click Deploy to Netlify

Pre-configured `netlify.toml` included in the root.

1. Push to GitHub (see above).
2. Open [app.netlify.com/start](https://app.netlify.com/start) and choose "Import from Git".
3. Netlify automatically reads `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy Site**.

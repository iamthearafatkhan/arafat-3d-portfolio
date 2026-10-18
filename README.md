<div align="center">
  
# 🌌 Arafat Khan — 3D Portfolio

**An interactive, cinematic 3D portfolio showcasing my work in AI, Machine Learning, and Computer Vision.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-arafatkhan.vercel.app-black?style=for-the-badge&logo=vercel)](https://arafatkhan.vercel.app)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

<!-- Add a screenshot or GIF of your portfolio here to make it pop! -->
<!-- <div align="center"><img src="./public/images/preview.gif" alt="Portfolio Preview" width="800" /></div> -->

---

## 📖 About The Project

Welcome to my 3D interactive portfolio! This isn't a standard website. It features a **cinematic black hole intro**, a **GPU-rendered particle system**, a cursor-driven image reveal, and an orbital project carousel. 

It is designed to push the boundaries of web graphics while maintaining a fast, accessible, and responsive user experience.

## 📑 Table of Contents
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Getting Started](#-getting-started)
- [Customization Guide](#-customization-guide)
- [Deployment](#-deployment)
- [Connect With Me](#-connect-with-me)
- [License](#-license)

---

## 🛠 Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Core** | React 19, Vite 8 |
| **3D & Animation** | Three.js, @react-three/fiber, GSAP 3, @gsap/react |
| **Styling** | Tailwind CSS 4, react-responsive |
| **Quality** | ESLint 10 |
| **Deployment** | Vercel |

---

## ✨ Key Features

### 🌌 Visuals & 3D
- **Cinematic Black Hole Loader:** Animated accretion disk and photon ring with a split-screen reveal.
- **Comet Cursor:** A custom canvas-based cursor with a glowing blue comet tail.
- **GPU Particle System:** Over 20,000 particles rendering in real-time.
- **Hero Image Reveal:** Cursor-driven galaxy swirls with glowing particles.
- **Orbital Project Carousel:** Planet-inspired cards rotating along an elliptical orbit.

### ⚡ UX & Functionality
- **Interactive Skill Bubbles:** Iridescent bubbles that reveal info on hover.
- **Embedded Modals:** Full-screen PDF CV viewer and certificate previews.
- **Animated Statistics:** Scroll-triggered counters for portfolio stats.
- **Accessibility First:** Disables custom cursors on touch devices and respects `prefers-reduced-motion`.
- **Session-Aware Intro:** Black hole intro plays only once per session.

---

## 🚀 Getting Started

### Prerequisites

> [!IMPORTANT]  
> **Node.js 20+** and **WebGL 2.0** (for 3D rendering) are required.

### Requirements

| Requirement      | Minimum                        | Recommended                             |
| ---------------- | ------------------------------ | --------------------------------------- |
| Node.js          | 20                             | 20 LTS or later                         |
| npm              | 10                             | 11                                      |
| Git              | 2.30                           | Latest                                  |
| RAM              | 4 GB                           | 8 GB                                    |
| Browser          | Modern browser with WebGL 2    | Latest Chrome, Firefox, Safari, or Edge |
| Operating System | Windows 10, macOS 11, or Linux | Latest supported version                |
**Note:** WebGL 2.0 is required for the 3D scenes. Node.js is used during development and the production build; the deployed website consists of static files.
### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamthearafatkhan/arafat-3d-portfolio.git
   cd arafat-3d-portfolio
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

Open the local URL displayed in your terminal, usually:

`http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

---

## Available Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Starts the development server with hot reload  |
| `npm run build`   | Builds the production application into `dist/` |
| `npm run preview` | Previews the production build locally          |
| `npm run lint`    | Runs ESLint on JavaScript and JSX files        |

---

## 🎨 Design System

The portfolio follows a cinematic cyber-galaxy aesthetic, combining dark backgrounds, beetroot-inspired tones, warm accents, metallic gradients, and glowing visual effects.

### Color Palette

| Role             | Color          | Hex       |
| ---------------- | -------------- | --------- |
| Deep Background  | Black          | `#000000` |
| Background Tint  | Deep Red-Black | `#0a0611` |
| Beetroot Base    | Dark Red       | `#1a0303` |
| Primary Accent   | Orange-Red     | `#ff5020` |
| Secondary Accent | Warm Orange    | `#ff8c42` |
| Tertiary Accent  | Peach          | `#ffb89c` |
| Glow             | Violet         | `#c084fc` |
| Aurora           | Deep Purple    | `#7c3aed` |
| Primary Text     | White          | `#ffffff` |

### Design Language

* **Corner Cuts:** Angular `clip-path` shapes for cards, buttons, and tags.
* **Glassmorphism:** Translucent overlays with backdrop blur.
* **Metallic Gradients:** Multistop gradients for depth and visual contrast.
* **Floating Animations:** Subtle floating motion across cards and buttons.
* **Pulsing Indicators:** Animated status indicators throughout the interface.
* **Nebula Glows:** Radial gradients that create atmospheric lighting.
* **Orbital Rings:** SVG elliptical tracks behind the project carousel.

### Layout

| Property                 | Desktop | Mobile     |
| ------------------------ | ------- | ---------- |
| Section Padding          | 120px 0 | 70px 0     |
| Maximum Grid Width       | 1400px  | Responsive |
| Horizontal Padding       | 6vw     | 20px       |
| Navigation Anchor Offset | 90px    | 90px       |

---

## Fonts

Fonts are loaded through Google Fonts in `src/index.css`.

| Font      | Weights  | Usage                                   |
| --------- | -------- | --------------------------------------- |
| Orbitron  | 400–700  | Headings, names, UI labels, and buttons |
| Rajdhani  | 400–700  | Body text, descriptions, and taglines   |
| Amiri     | 400, 700 | Arabic text and Quranic verses          |
| Mona Sans | 200–900  | General sans-serif fallback             |

---

## Customization

### 1. Update Your CV

Replace the existing file:

```text
public/images/Md-Arafat-Hossen-Rabby-CV.pdf
```

Keep the filename unchanged unless you also update the paths in `CVModal.jsx`.

```js
const CV_PATH = "/images/Md-Arafat-Hossen-Rabby-CV.pdf";
const CV_FILENAME = "Md-Arafat-Hossen-Rabby-CV.pdf";
```

### 2. Add a New Project

Add a new object to the projects array in:

```text
src/constants/index.js
```

Example:

```js
{
  title: "Project Title",
  shortDescription: "A short project description.",
  longDescription: "A detailed description of the project.",
  image: "/images/project.png",
  year: "2026",
  tags: ["React", "Python", "Machine Learning"],
  tools: [
    {
      name: "PyTorch",
      icon: "/images/tools/PyTorch.svg"
    }
  ],
  github: "https://github.com/username/project",
  website: "https://example.com"
}
```

Place the corresponding image in:

```text
public/images/
```

The orbital carousel uses the projects array to display the projects.

### 3. Update Your Name

The portfolio uses **Arafat Khan** as the display name and **Md Arafat Hossen Rabby** as the full name.

Relevant files include:

* `src/sections/Hero.jsx`
* `src/sections/About.jsx`
* `src/sections/Footer.jsx`
* `src/constants/index.js`
* `index.html`

Update the corresponding values if you want to change the displayed name.

### 4. Change the Color Palette

Colors are defined in:

```text
src/index.css
```

Common color values include:

```css
#ff5020  /* Primary accent */
#ff8c42  /* Secondary accent */
#ffb89c  /* Tertiary accent */
#1a0303  /* Dark red background */
#c084fc  /* Violet glow */
#7c3aed  /* Deep purple */
```

Replace the relevant values to customize the visual theme.

### 5. Adjust the Black Hole Loader

The timing constants are defined in:

```text
src/components/BlackHoleLoader.jsx
```

```js
const IDLE_DURATION = 700;
const ZOOM_DURATION = 900;
const REVEAL_AT = 0.88;
const REVEAL_CSS_MS = 1000;
```

Adjust these values to customize the intro animation. Keep the CSS reveal duration synchronized with the JavaScript timing.

### 6. Replay the Black Hole Loader

The loader is session-aware. To replay it during development, open the browser's developer console and run:

```js
sessionStorage.clear();
location.reload();
```

### 7. Customize the Comet Cursor

The main tuning values are in:

```text
src/components/CometCursor.jsx
```

| Parameter             | Description                                      |
| --------------------- | ------------------------------------------------ |
| `NUM_SEGMENTS = 24`   | Controls the length of the comet tail            |
| `LERP = 0.34`         | Controls how tightly the tail follows the cursor |
| Head halo radius `42` | Controls the size of the comet's glow            |
| Nucleus radius `8`    | Controls the size of the bright core             |

### 8. Enable or Disable Sections

Sections can be enabled or disabled in:

```text
src/App.jsx
```

For example:

```jsx
<main aria-hidden={loading}>
  <NavBar />
  <Hero />
  <AnimatedCounter />
  <About />
  <Project />
  <Education />
  <Skills />
  <Certificates />
  <Footer />
</main>
```

Remove or comment out the sections you do not want to display.

---

## ☁️ Deployment

### Deploy with Vercel

The portfolio can be deployed as a static Vite application.

1. Push your project to GitHub.
2. Open [Vercel](https://vercel.com/new).
3. Import your GitHub repository.
4. Configure the project with the following settings.

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | Vite            |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |
| Install Command  | `npm install`   |

5. Click **Deploy**.

After deployment, Vercel can automatically rebuild the website whenever you push changes to the connected GitHub branch.

### Deploy with Netlify

Build the application:

```bash
npm run build
```

Deploy the generated `dist/` directory using [Netlify](https://app.netlify.com/).

### Custom Domain

To use a custom domain, open your Vercel project settings, navigate to **Domains**, and follow the DNS configuration instructions.

---

## Author

**Md Arafat Hossen Rabby (Arafat Khan)**

AI/ML Engineer in Progress | Data Science | Computer Vision | Research

### 🤝 Connect With Me


[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-username)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/iamthearafatkhan)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://your-portfolio-url.com)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)
---

## 📄 License
This is a personal portfolio project.
The source code is provided for learning and inspiration. Please do not republish it as your own portfolio. Attribution is highly appreciated if you build something inspired by this design!

---

## Acknowledgments

* Black hole visual inspiration from *Interstellar* and the work of Kip Thorne.
* Icons from [Simple Icons](https://simpleicons.org/).
* Fonts from [Google Fonts](https://fonts.google.com/).
* Built with React, Vite, Three.js, and GSAP.

---

<div align="center"> <i>Designed and developed by <a href="https://arafatkhan.vercel.app"><b>Arafat Khan</b></a></i> </div> ```

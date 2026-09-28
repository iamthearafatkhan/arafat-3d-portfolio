# Arafat Khan — 3D Portfolio

An interactive 3D portfolio website for **Md Arafat Hossen Rabby (Arafat Khan)**, showcasing my work in AI/ML, data science, computer vision, and research.

Featuring a cinematic black hole intro, GPU-rendered particle system, cursor-driven image reveal, orbital project carousel, interactive skill bubbles, and animated sections.

**Live Demo:** [arafatkhan.vercel.app](https://arafatkhan.vercel.app)

---

## Table of Contents

* [Tech Stack](#tech-stack)
* [Features](#features)
* [Getting Started](#getting-started)
* [Requirements](#requirements)
* [Available Scripts](#available-scripts)
* [Design System](#design-system)
* [Fonts](#fonts)
* [Customization](#customization)
* [Deployment](#deployment)
* [Author](#author)
* [License](#license)
* [Acknowledgments](#acknowledgments)

---

## Tech Stack

| Category             | Technology           |
| -------------------- | -------------------- |
| Framework            | React 19             |
| Build Tool           | Vite 8               |
| 3D Graphics          | Three.js 0.186       |
| 3D React Integration | @react-three/fiber 9 |
| Animation            | GSAP 3               |
| React Animation      | @gsap/react          |
| Styling              | Tailwind CSS 4       |
| Responsive Design    | react-responsive     |
| Linting              | ESLint 10            |
| Deployment           | Vercel               |

---

## Features

* **Cinematic Black Hole Loader:** An animated black hole intro featuring an accretion disk, photon ring, and cinematic split-screen reveal.
* **Comet Cursor:** A custom canvas-based cursor with a glowing blue comet tail.
* **Hero Image Reveal:** A cursor-driven image reveal effect with galaxy swirls, stars, and glowing particles.
* **Animated Word Slider:** A vertical text slider featuring Ideas, Concepts, Designs, Code, and Research.
* **GPU Particle System:** More than 20,000 particles with individual colors and velocities.
* **Floating Cyber Buttons:** Animated hero buttons with independent floating motion.
* **Orbital Project Carousel:** An interactive project showcase with planet-inspired cards rotating along an elliptical orbit.
* **Interactive Skill Bubbles:** Iridescent skill bubbles that reveal additional information on hover.
* **Certificate Modals:** Full-screen certificate previews with download links.
* **CV Modal:** An embedded PDF viewer with a download feature.
* **Animated Statistics:** Scroll-triggered counters for showcasing portfolio statistics.
* **Responsive Layout:** Optimized for mobile, tablet, and desktop screens.
* **Accessibility:** Supports reduced-motion preferences and disables the custom cursor on touch devices.
* **Session-Aware Intro:** The black hole intro plays once per session and skips during anchor navigation.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/iamthearafatkhan/arafat-3d-portfolio.git

cd arafat-3d-portfolio
```

### 2. Install Node.js

The project requires Node.js 20 or later.

Check your installed version:

```bash
node -v
npm -v
```

If you use NVM, you can install Node.js 20:

```bash
nvm install 20
nvm use 20
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

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

## Requirements

| Requirement      | Minimum                        | Recommended                             |
| ---------------- | ------------------------------ | --------------------------------------- |
| Node.js          | 20                             | 20 LTS or later                         |
| npm              | 10                             | 11                                      |
| Git              | 2.30                           | Latest                                  |
| RAM              | 4 GB                           | 8 GB                                    |
| Browser          | Modern browser with WebGL 2    | Latest Chrome, Firefox, Safari, or Edge |
| Operating System | Windows 10, macOS 11, or Linux | Latest supported version                |

**Note:** WebGL 2.0 is required for the 3D scenes. Node.js is used during development and the production build; the deployed website consists of static files.

---

## Available Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Starts the development server with hot reload  |
| `npm run build`   | Builds the production application into `dist/` |
| `npm run preview` | Previews the production build locally          |
| `npm run lint`    | Runs ESLint on JavaScript and JSX files        |

---

## Design System

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

## Deployment

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

* **Portfolio:** [arafatkhan.vercel.app](https://arafatkhan.vercel.app)
* **GitHub:** [@iamthearafatkhan](https://github.com/iamthearafatkhan)
* **LinkedIn:** [linkedin.com/in/iamthearafatkhan](https://linkedin.com/in/iamthearafatkhan/)
* **X:** [@iamarafatkhan33](https://x.com/iamarafatkhan33)
* **Facebook:** [iamthearafatkhan](https://facebook.com/iamthearafatkhan)
* **Email:** [arafathossen21233@gmail.com](mailto:arafathossen21233@gmail.com)

---

## License

This is a personal portfolio project and is not licensed for redistribution. You are welcome to explore the source code for learning and inspiration. Please do not republish it as your own portfolio. Attribution is appreciated if you create something inspired by this project.

---

## Acknowledgments

* Black hole visual inspiration from *Interstellar* and the work of Kip Thorne.
* Icons from [Simple Icons](https://simpleicons.org/).
* Fonts from [Google Fonts](https://fonts.google.com/).
* Built with React, Vite, Three.js, and GSAP.

---

<p align="center">
  Designed and developed by <strong>Arafat Khan</strong>
</p>

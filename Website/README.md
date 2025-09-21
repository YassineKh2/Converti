# Converti Website

Converti is a file conversion tool. This repository contains the website for Converti, built with Next.js, React, and Tailwind CSS.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Key Files & Directories](#key-files--directories)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

Converti enables users to convert files locally, supporting images, videos, audio, documents, and archives. The website showcases features, provides downloads, and shares release notes, all with a focus on privacy and transparency.

---

## Architecture

- **Frontend Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Font:** [Geist](https://vercel.com/font/geist)

---

## How It Works

- **Pages** are defined in [`src/app`](src/app).
- **UI Components** are in [`src/components/ui`](src/components/ui).
- **Global Layout** and styles are in [`src/app/layout.tsx`](src/app/layout.tsx) and [`src/app/globals.css`](src/app/globals.css).
- **Navigation** and **Footer** are in [`src/components/Navbar.tsx`](src/components/Navbar.tsx) and [`src/components/Footer.tsx`](src/components/Footer.tsx).
- **Feature pages** (About, Features, Download, Contact, Release Notes) are in their respective folders under [`src/app`](src/app).
- **Custom utility functions** are in [`src/lib/utils.ts`](src/lib/utils.ts).

---

## Key Files & Directories

- **[src/app/page.tsx](src/app/page.tsx):** Homepage/Landing page.
- **[src/app/about/page.tsx](src/app/about/page.tsx):** About Converti.
- **[src/app/features/page.tsx](src/app/features/page.tsx):** Features overview.
- **[src/app/download/page.tsx](src/app/download/page.tsx):** Download links and requirements.
- **[src/app/contact/page.tsx](src/app/contact/page.tsx):** Contact and support.
- **[src/app/release-notes/page.tsx](src/app/release-notes/page.tsx):** Release notes.
- **[src/components/Navbar.tsx](src/components/Navbar.tsx):** Navigation bar.
- **[src/components/Footer.tsx](src/components/Footer.tsx):** Footer.
- **[src/components/ui/](src/components/ui/):** Reusable UI components.
- **[src/lib/utils.ts](src/lib/utils.ts):** Utility functions for class name merging.
- **[public/](public/):** Static assets (logo, images, gifs).

---

## Development

### Prerequisites

- Node.js (v18+ recommended)
- npm or any other package manager   

### Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run in development mode:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

---

## Contributing

We welcome contributions, Here’s how to get started:

1. **Fork the repository** and clone your fork.
2. **Create a new branch** for your feature or fix.
3. **Make your changes** (see [src/app](src/app) and [src/components](src/components) for page/component code).
4. **Test your changes** locally.
5. **Submit a pull request** with a clear description.

---

## Contact

- **Email:** yassinekhemiri.dev@gmail.com
- **GitHub Issues:** [Report bugs](https://github.com/YassineKh2/converti/issues)
- **GitHub Discussions:** [Feature requests & community](https://github.com/YassineKh2/converti/discussions)
- **LinkedIn:** [Yassine Khemiri](https://www.linkedin.com/in/yassine-khemiri-a4ba44222/)

---

## Acknowledgements

Converti uses open-source libraries including:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/)
- [Geist Font](https://vercel.com/font/geist)

See the About page for more details on technology and libraries.

---

## License

This project is licensed under the MIT License.

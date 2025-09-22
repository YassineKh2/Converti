# Converti Desktop
Converti is a file conversion tool. This repository contains the Electron app for converti

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [File Structure](#file-structure)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Issues & Support](#issues--support)
- [License](#license)

Converti Desktop is an Electron-based application for converting files between various formats. It features a React frontend, Electron main/preload processes, and uses Vite and Electron Builder.


## Architecture Overview

- **Electron Main Process**  
  Handles file conversion, archiving, dialogs, and system-level operations.  
  Location: [`electron/main/index.ts`](electron/main/index.ts)

- **Electron Preload Process**  
  Bridges secure communication between the renderer and main process.  
  Location: [`electron/preload/index.ts`](electron/preload/index.ts)

- **React Renderer (Frontend)**  
  User interface for uploading, converting, and managing files.  
  Location: [`src/`](src/)

- **Helpers & Utilities**  
  Conversion logic, file handling, and format support.  
  Location: [`electron/Helpers/`](electron/Helpers/)

- **Assets**  
  Icons, binaries, and static resources.  
  Location: [`assets/`](assets/)

---

## File Structure

- **Configuration**
  - [`vite.config.ts`](vite.config.ts): Vite build config
  - [`electron-builder.json`](electron-builder.json): Electron packaging config
  - [`package.json`](package.json): Dependencies and scripts

- **Main Electron Logic**
  - [`electron/main/index.ts`](electron/main/index.ts): Main process entry
  - [`electron/Helpers/`](electron/Helpers/): Conversion and archiving helpers

- **Frontend**
  - [`src/components/`](src/components/): React components (UI, logic)
  - [`src/App.tsx`](src/App.tsx): Main app component

- **Preload**
  - [`electron/preload/index.ts`](electron/preload/index.ts): Preload script

- **Assets**
  - [`assets/icons/`](assets/icons/): App icons
  - [`assets/bin/`](assets/bin/): Binaries for conversion

- **Public**
  - [`public/`](public/): Static files (favicon, images)

- **Release**
  - [`release/`](release/): Packaged builds

---

## How It Works

1. **User uploads files** via the React UI ([`src/components/Converter.tsx`](src/components/Converter.tsx)).
2. **File types are detected** and grouped.
3. **User selects output formats** or archive options.
4. **Conversion/archiving requests** are sent to Electron main via IPC.
5. **Main process** ([`electron/main/index.ts`](electron/main/index.ts)) uses helpers ([`electron/Helpers/`](electron/Helpers/)) to process files.
6. **Progress and logs** are sent back to the UI for display.
7. **Converted files** are saved to the chosen location.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or any other package manager

### Install

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
3. **Make your changes** in the appropriate files:
   - UI: [`src/components/`](src/components/)
   - Electron logic: [`electron/main/`](electron/main/)
   - Helpers: [`electron/Helpers/`](electron/Helpers/)
4. **Test your changes** locally.
5. **Submit a pull request** with a clear description.

---

## Acknowledgements

Special thanks to the contributors and the following open-source projects:

- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [7zip](https://www.7-zip.org/)
- [FFmpeg](https://ffmpeg.org/)
- [Pandoc](https://pandoc.org/)
- [wkhtmltopdf](https://wkhtmltopdf.org/)

And everyone who helped with feedback, testing, and ideas.


## Issues & Support

- Report bugs or request features via [GitHub Issues](https://github.com/YassineKh2/Converti/issues).
- For questions, open a discussion or contact me.

---

## License

This project is licensed under the MIT License.

## Contact

- **Email:** yassinekhemiri.dev@gmail.com
- **GitHub Issues:** [Report bugs](https://github.com/YassineKh2/converti/issues)
- **GitHub Discussions:** [Feature requests & community](https://github.com/YassineKh2/converti/discussions)
- **LinkedIn:** [Yassine Khemiri](https://www.linkedin.com/in/yassine-khemiri-a4ba44222/)


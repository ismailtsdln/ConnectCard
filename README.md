# ConnectCard 📶

![ConnectCard Banner](assets/banner.png)

<p align="center">
  <strong>Modern, professional Wi-Fi QR card generator for Web & CLI.</strong>
</p>

---

ConnectCard is a high-performance tool designed to bridge the gap between your Wi-Fi credentials and seamless connectivity. It transforms SSID and password information into beautifully designed, printable cards and digital QR codes.

Built with a focus on **security**, **performance**, and **user experience**, ConnectCard is the ultimate solution for homes, offices, and businesses.

## ✨ Features

- 🌐 **Stunning Web UI**: A premium React-based dashboard with a live-updating QR preview.
- 💻 **Powerful CLI**: Fast, interactive, and scriptable command-line interface.
- 📄 **High-Quality Exports**: Download your cards as professional **PDF** or sharp **PNG** files.
- 🔒 **Privacy First**: All processing happens locally. Your passwords never leave your device.
- 🌍 **Internationalization**: Fully localized support for **English** and **Turkish**.
- 🌓 **Adaptive Theming**: Beautiful Dark and Light mode support for the Web UI.
- 🛠 **Developer Friendly**: TypeScript-first, monorepo architecture with clean code standards.

## 🚀 Quick Start

### Web Application

Experience the full power of ConnectCard through your browser.

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the engine**:
   ```bash
   npm run dev
   ```

### CLI Utility

Generate QR codes instantly without leaving your terminal.

```bash
# Generate a QR code immediately
npx tsx packages/cli/src/index.ts generate --ssid "MyNetwork" --password "MySecret" --output wifi.png
```

## 🛠 Tech Stack

Our chosen stack ensures scalability, type safety, and a premium developer experience.

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, TailwindCSS, Lucide Icons, i18next |
| **Core Logic** | TypeScript, Zod, QRCode, jsPDF |
| **CLI** | Commander.js, Clack, Picocolors |
| **DevOps** | npm Workspaces, Vitest, ESLint, Prettier |

## 📦 Architecture

ConnectCard uses a modular monorepo structure for maximum reusability.

- `packages/core`: Theoretical heart of the project. Contains QR generation, PDF layouts, and validation logic.
- `packages/cli`: The terminal-based entry point.
- `apps/web`: The interactive React single-page application.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Created with ❤️ by <a href="https://github.com/ismailtsdln">Ismail Tasdelen</a>
</p>

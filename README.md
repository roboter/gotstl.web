# GotSTL 🚀

[![Azure Static Web Apps CI/CD](https://github.com/roboter/gotstl.web/actions/workflows/azure-static-web-apps-orange-glacier-0bd4f4c03.yml/badge.svg)](https://github.com/roboter/gotstl.web/actions/workflows/azure-static-web-apps-orange-glacier-0bd4f4c03.yml)
[![Angular](https://img.shields.io/badge/Angular-22.x-DD0031.svg?style=flat&logo=angular&logoColor=white)](https://angular.dev/)
[![Azure Static Web Apps](https://img.shields.io/badge/Azure-Static%20Web%20Apps-0089D6.svg?style=flat&logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/services/app-service/static/)
[![OpenJSCAD](https://img.shields.io/badge/3D%20CAD-OpenJSCAD-orange.svg?style=flat)](https://openjscad.xyz/)
[![Fork me on GitHub](https://img.shields.io/badge/Fork%20me%20on%20GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/roboter/gotstl.web/fork)

GotSTL is a modern, responsive web application designed for parametric 3D CAD modeling and STL generation in the browser. Powered by **Angular 22** and **OpenJSCAD**, it allows users to dynamically configure, preview, and generate 3D-printable files (STL) from parametric designs such as gears, pulleys, nameplates, and custom hooks.

🔗 **Live Site:** [www.gotstl.com](http://www.gotstl.com) *(Note: Currently requires the `www.` prefix due to root domain DNS routing constraints).*

---

## ✨ Features

- **Interactive 3D Preview:** Real-time rendering of parametric 3D models using OpenJSCAD.
- **Parametric Controls:** Easily adjust model dimensions and features on-the-fly.
- **STL Export:** Export optimized STL files ready for 3D printing directly from your browser.
- **Serverless API Backend:** Built-in Azure Functions for light, performant product catalog and metadata management.
- **Modern UI:** Responsive design built with Bulma CSS and custom styling for a sleek, clean, and intuitive user experience.

---

## 🛠️ Tech Stack

- **Frontend:** [Angular 22](https://angular.dev/) (with NgRx Data for reactive state management) & [Bulma CSS](https://bulma.io/)
- **3D Engine:** [OpenJSCAD Web](https://openjscad.xyz/) (`@jwc/jscad-web`)
- **Backend API:** [Azure Functions](https://learn.microsoft.com/azure/azure-functions/) (Node.js runtime)
- **Hosting & CI/CD:** [Azure Static Web Apps](https://azure.microsoft.com/services/app-service/static/) integrated with GitHub Actions

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally for development.

### 📋 Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or v20 recommended for compatibility with Angular 22)
- [npm](https://www.npmjs.com/)
- [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local) (required for running the API locally)

#### Installing Azure Functions Core Tools

You can install the core tools globally via npm on **any OS**:
```bash
npm i -g azure-functions-core-tools@4 --unsafe-perm true
```

**Alternatively, using OS package managers:**

*   **macOS (Homebrew):**
    ```bash
    brew tap azure/functions
    brew install azure-functions-core-tools@4
    ```
*   **Windows (Winget):**
    ```bash
    winget install Microsoft.Azure.FunctionsCoreTools
    ```
*   **Linux (Ubuntu/Debian APT):**
    ```bash
    wget -q https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    sudo apt-get update
    sudo apt-get install azure-functions-core-tools-4
    ```

### 🔧 Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/roboter/gotstl.web.git
   cd gotstl.web
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

### 💻 Running Locally

To run both the Angular frontend and the Azure Functions API concurrently, follow these steps:

#### 1. Start the API (Azure Functions backend)
In a separate terminal, start the local functions host using npm prefix:
```bash
npm --prefix api start
```
*Note: The API runs by default on `http://localhost:7071`.*

#### 2. Start the Frontend (Angular)
In your main terminal, start the Angular development server:
```bash
npm start
```
This command serves the frontend application and forwards API requests using the configured proxy (`proxy.conf.json`). Your browser will open automatically at `http://localhost:4200`.

---

## 🌐 Deployment & CI/CD

Deployment is fully automated using **GitHub Actions** and **Azure Static Web Apps CI/CD**.

- Every push to the `master` branch triggers the GitHub workflow which builds the Angular frontend, compiles the Azure Functions API, and deploys them to production.
- Pull requests automatically create a temporary preview environment for staging verification, which is destroyed once the pull request is merged/closed.

For configuration details, refer to [.github/workflows/azure-static-web-apps-orange-glacier-0bd4f4c03.yml](.github/workflows/azure-static-web-apps-orange-glacier-0bd4f4c03.yml).

---

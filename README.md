
# BurgerAnime Desktop Application

BurgerAnime is a desktop application built with Electron and React, designed to provide an immersive anime experience. This application is cross-platform and supports Windows, macOS, and Linux.

<img width="1193" height="724" alt="image" src="https://github.com/user-attachments/assets/e203d078-a242-4edc-8bb7-49d62e74b0bc" />



## Features
- Browse and watch anime.
- User authentication and profile management.
- Premium features for VIP users.
- Auto-update functionality for seamless updates.

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Git](https://git-scm.com/)

---

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/amadich/ElectronBGANIMEAPP.git
   cd ElectronBGANIMEAPP/client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

---

### Development

To run the application in development mode:

1. **Start the Vite Development Server**
   ```bash
   npm run dev
   ```

2. **Start the Electron Application**
   ```bash
   npm run electron:start
   ```

---

### Build for Production

To build the application for production:

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Package the Application**
   ```bash
   npm run electron:build
   ```

The packaged application will be available in the `dist_electron` folder.

---

### Auto-Update

The application supports auto-updates. Updates are downloaded automatically and installed on the next restart.

---

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

### License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

### Contact

For any inquiries or support, please contact:
- **Author**: amadich
- **Email**: me@amadich.tn
- **GitHub**: [amadich](https://github.com/amadich)



# Manuel Installation


### 1. **Install Electron**
Run the following command in your project directory to install Electron:
```powershell
npm install electron --save-dev
```

### 2. **Create the Electron Main Process**
Create a new file, e.g., `electron-main.cjs` or `main.cjs`, in the root of your project. This file will serve as the entry point for the Electron application.

Here’s a basic example of what the file might look like:
```javascript
const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:5173'); // Replace with your Vite dev server URL
});
```

### 3. **Update package.json**
Add a `main` field to your package.json to point to the Electron entry file:
```json
"main": "electron-main.cjs",
```

Add a script to start the Electron app:
```json
"scripts": {
  "electron:start": "vite build && electron ."
}
```

### 4. **Adjust Vite Configuration**
Ensure your Vite configuration (vite.config.ts) is compatible with Electron. You may need to adjust the `build` settings to output files suitable for Electron.

### 5. **Run the Application**
Use the following command to build your project and start the Electron app:
```powershell
npm run electron:start
```

### 6. **Package the Application**
To package your Electron app for distribution, you can use tools like `electron-builder` or `electron-packager`. Install one of these tools and configure it in your package.json.

# IF You Get Errors Servre Down
The error `ERR_CONNECTION_REFUSED` occurs because Electron is trying to load the URL `http://localhost:5173/`, but the Vite development server is not running. This happens because the `vite build` command builds the project for production and does not start the development server.

To fix this, you need to ensure that Electron loads the correct file in production mode. Here's how you can resolve this:

### 1. **Update electron-main.cjs**
Modify the Electron main process file to handle both development and production modes. In development, it should load the Vite dev server URL, and in production, it should load the built index.html file.

Here’s an updated version of the electron-main.cjs file:

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    // Load Vite dev server URL in development
    mainWindow.loadURL('http://localhost:5173');
  } else {
    // Load the built index.html in production
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
});
```

### 2. **Set `NODE_ENV` in Scripts**
Update the `electron:start` script in package.json to set `NODE_ENV` to `development` when running Electron in development mode:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "electron:start": "set NODE_ENV=development && vite && electron ."
}
```

### 3. **Run the Application**
Now, when you run `npm run electron:start`, it will start the Vite dev server and load the correct URL in Electron.

# BUILD DESKTOP 
To create a `.exe` file for your Electron application and set a custom icon for it, you need to package your app using a tool like `electron-builder`. Here's how you can do it:

---

### 1. **Install `electron-builder`**
Run the following command to install `electron-builder`:
```powershell
npm install electron-builder --save-dev
```

---

### 2. **Add `electron-builder` Configuration**
Update your package.json to include a `build` field for `electron-builder` configuration. Here's an example:

```json
"build": {
  "appId": "com.burgeranime.app",
  "productName": "BurgerAnime",
  "directories": {
    "output": "dist_electron"
  },
  "files": [
    "dist/**/*",
    "electron-main.cjs"
  ],
  "win": {
    "icon": "public/favicon.ico",
    "target": "nsis"
  }
}
```

- **`appId`**: A unique identifier for your app.
- **`productName`**: The name of your app (this will appear in the `.exe` file).
- **`icon`**: Path to your app's icon (use `.ico` format for Windows).
- **`target`**: Specifies the installer type (e.g., `nsis` for Windows).

---

### 3. **Add a Build Script**
Add a script to package your app in package.json:
```json
"scripts": {
  "electron:build": "electron-builder"
}
```

---

### 4. **Prepare Your Icon**
Ensure you have a `.ico` file for your app icon. Place it in the public folder (e.g., favicon.ico).

If you don't have a `.ico` file, you can convert an image (e.g., `.png`) to `.ico` using online tools like [icoconvert.com](https://icoconvert.com).

---

### 5. **Build the Application**
Run the following command to package your app:
```powershell
npm run electron:build
```

This will generate a `.exe` file in the `dist_electron` folder.

---


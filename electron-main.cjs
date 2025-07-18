const { app, BrowserWindow, Menu, ipcMain } = require('electron'); // Added ipcMain
const path = require('path'); // Added path for preload script

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // Disable default frame
    webPreferences: {
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Enable contextIsolation for preload
      preload: path.join(__dirname, 'preload.cjs'), // Preload script
    },
  });

  // Remove the default menu
  Menu.setApplicationMenu(null);

  mainWindow.loadURL('http://localhost:5173'); // Replace with your Vite dev server URL
});

// Handle window control events
ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on('close-window', () => {
  mainWindow.close();
});
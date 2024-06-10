const { app, BrowserWindow, Tray, Menu, shell } = require("electron");
const path = require("node:path");

let mainWindow;
let tray;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      nativeWindowOpen: true,
    },
    icon: path.join(__dirname, "assets", "256x256.png"), // 창 아이콘 설정
  });

  // Load the main URL of the application.
  mainWindow.loadURL("https://tmax.wapl.ai");

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
  });

  createTray(); // Create tray icon and menu
};

const createTray = () => {
  tray = new Tray(
    path.join(
      __dirname,
      "assets",
      process.platform === "darwin" ? "16x16_white_darwin.png" : "75x75.png"
    )
  ); // Set path for tray icon

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Wapl",
      click: () => {
        mainWindow.show(); // Show the main window
      },
    },
    {
      label: "Quit Wapl",
      click: () => {
        app.isQuiting = true; // Flag for quitting
        mainWindow.close(); // Close the main window
      },
    },
  ]);

  tray.setToolTip("Wapl Desktop"); // Set tooltip for tray icon
  tray.setContextMenu(contextMenu); // Set context menu for tray icon

  // Show the main window when tray icon is clicked
  tray.on("click", () => {
    mainWindow.show();
  });
};

app.setName("Wapl Desktop");
app.whenReady().then(() => {
  createWindow(); // Create main window

  // If all windows are closed, quit the app (except on macOS)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except on macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

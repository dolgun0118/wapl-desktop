const { app, BrowserWindow, Tray, Menu, shell, ipcMain } = require("electron");

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

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.executeJavaScript(`
    if ("Notification" in window) {
      const OriginalNotification = window.Notification;
    
      window.Notification = function (title, options) {
        // 새로운 Notification 객체 생성
        const notification = new OriginalNotification(title, options);
    
        // 기존의 onclick 방식 대신 addEventListener를 사용하여 클릭 이벤트 리스너 추가
        notification.addEventListener('click', function () {
          if (
            window.electronAPI &&
            typeof window.electronAPI.notificationClicked === "function"
          ) {
            window.electronAPI.notificationClicked();
          } else {
            console.error("electronAPI.notificationClicked is not defined");
          }
        });
    
        // Notification 객체 반환
        return notification;
      };
    
      // requestPermission과 permission 속성을 기존 Notification에서 복사
      window.Notification.requestPermission =
        OriginalNotification.requestPermission.bind(OriginalNotification);
      window.Notification.permission = OriginalNotification.permission;
    }
    `);
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

ipcMain.on("notification-clicked", () => {
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.focus();
});

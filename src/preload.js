const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  notificationClicked: () => ipcRenderer.send("notification-clicked"),
});

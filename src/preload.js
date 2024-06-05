// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // 메인 프로세스에 메시지를 보내는 함수
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  // 메인 프로세스로부터 메시지를 받는 함수
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});

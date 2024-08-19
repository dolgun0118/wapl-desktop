const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require("path");

module.exports = {
  packagerConfig: {
    asar: true,
    name: "Wapl Desktop",
    productName: "Wapl Desktop",
    executableName: "wapl-desktop",
    icon: path.join(__dirname, "src", "assets", "512x512_darwin.icns"),
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "wapl_desktop",
        setupIcon: path.join(__dirname, "src", "assets", "256x256.ico"), // 로컬 아이콘 파일 경로
        setupExe: "WaplDesktopSetup.exe",
        setupMsi: "WaplDesktopSetup.msi",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      config: {
        options: {
          icon: path.join(__dirname, "src", "assets", "512x512_darwin.icns"),
        },
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: path.join(__dirname, "src", "assets", "1024x1024.png"),
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

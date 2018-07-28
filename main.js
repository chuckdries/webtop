const electron = require('electron');
const {app, BrowserWindow} = electron;

let mainWindow;

function createBar() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    frame: false,
    height: 50,
    width,
    x: 0,
    y: 0,
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

app.on('ready', createBar);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// this is mac shit
// app.on('activate', () => {
//   if (win === null) {
//     createWindow()
//   }
// })

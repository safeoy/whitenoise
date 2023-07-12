const { app, BrowserWindow } = require('electron')
const path = require('path')
const { Tray, Menu, nativeImage } = require('electron')

let win
let tray = null

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {

  const icon = nativeImage.createFromPath('statics/logo.png')
  tray = new Tray(icon)

  tray.on('click', () => {
    win.show();
  });

  // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        win.show()
      }
    },
    {
      label: 'Quit', click: function () {
        app.isQuiting = true
        app.quit()
      }
    }
  ])
  
  tray.setContextMenu(contextMenu)
  tray.setToolTip('NoMusic')
  tray.setTitle('NoMusic')


  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  win.on('minimize', function (event) {
    event.preventDefault()
    win.hide()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
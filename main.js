// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const fs = require('fs')
const path = require('path')
const notifier = require('node-notifier');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, height: 600, webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://react-web-chat.herokuapp.com/')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const appId = 'Electron-web-loader'
app.setAppUserModelId(appId)
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

//FOR FUTURE IMPROVEMENTS TO DISPLAY IMAGE THUMBNAILS IN NOTIFICATIONS
// var string = "data:image/jpeg;base64,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";
// var regex = /^data:.+\/(.+);base64,(.*)$/;

// var matches = string.match(regex);
// var ext = matches[1];
// var data = matches[2];
// var buffer = new Buffer(data, 'base64');
// fs.writeFileSync('data.' + ext, buffer);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('notification', (event, arg) => {
  if (mainWindow.isMinimized() || !mainWindow.isVisible() || !mainWindow.isFocused()) {    
    var osvar = process.platform;

    if (osvar == 'darwin') {
      console.log("you are on a mac os");
    } else if (osvar == 'win32') {
      console.log("you are on a windows os")      
      // FOR WINDOWS
      notifier.notify(
        {
        title: "You've got a message from " + arg.name,
        message: arg.text,
        icon: path.join(__dirname, './build/appIcn.png.ico'),
        sound: true,
        contentImage: path.join(__dirname, './data.jpeg'),
        timeout: 5
      }
    );
    } else {
      console.log("unknown os")
    }
    let myNotification = new Notification({
      title: "You've got a message from " + arg.name,
      body: arg.text,
      hasReply: true,
      silent: false,
      closeButtonText: 'close'
    });

    myNotification.show();

    myNotification.on('reply', (event, hasReply) => {

      let data = {
        message: hasReply,
      };

      mainWindow.webContents.send('direct-reply', data);
    });

  }
})
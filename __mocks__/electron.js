const path = require('path');
const EventEmitter = require('events');

let ipcEmitter = new EventEmitter();

// electron app mock...
const app = {
    on: function() {
        // no-op
    }
};

// simple ipc mocks for render and main process ipc using
// nodes' EventEmitter
const ipcMain = {
    on: function(event, cb) {

        ipcEmitter.on(event, cb);
    },
    send: function (event, args) {
        const senderEvent = {
            sender: {
                send: function (event, arg) {
                    ipcEmitter.emit(event, arg);
                }
            }
        };
        ipcEmitter.emit(event, senderEvent, args);
    },
};

const ipcRenderer = {
    sendSync: function(event, args) {
        let listeners = ipcEmitter.listeners(event);
        if (listeners.length > 0) {
            let listener = listeners[0];
            const eventArg = {};
            listener(eventArg, args);
            return eventArg.returnValue;
        }
        return null;
    },
    send: function(event, args) {
        const senderEvent = {
            sender: {
                send: function (event, arg) {
                    ipcEmitter.emit(event, arg);
                }
            }
        };
        ipcEmitter.emit(event, senderEvent, args);
    },
    on: function(eventName, cb) {
        ipcEmitter.on(eventName, cb);
    },
    removeListener: function(eventName, cb) {
        ipcEmitter.removeListener(eventName, cb);
    }
};

//notification mock
const notification = {
    show: jest.fn(),//display notification
    on: function (eventName, args) {
        mainWindow.webContents.send(eventName, args);
      }
};

const mainWindow = {
    webContents: {
        send: jest.fn()
    }
}

module.exports = {
  require: jest.fn(),
  match: jest.fn(),
  app: jest.fn(),
  ipcMain: ipcMain,
  ipcRenderer: ipcRenderer,
  mainWindow: mainWindow,
  remote: jest.fn(),
  dialog: jest.fn(),
  Notification: notification
};

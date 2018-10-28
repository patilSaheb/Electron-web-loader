const ipcRenderer = require('electron').ipcRenderer;

let replyReciever;

notifierFunction = (data, replyFunction) => {
    ipcRenderer.send('notification', data);
    replyReciever = replyFunction;
}

ipcRenderer.on('direct-reply', (event, data) => {
    if (data.message.trim()) {
        replyReciever(data)
    }
});

window.notifier = {
    notifyUser: notifierFunction
};
const electron = require('./__mocks__/electron');
const sinon = require('sinon');

const mainProcess = electron.ipcMain;
const rendererprocess = electron.ipcRenderer;
const notifcationProcess = electron.Notification;
const mainWindow = electron.mainWindow;

describe('notification handler', function () {
  const data = {
    name: 'abc',
    text: 'Hi!!'
  };

  const mockCallback = jest.fn();

  it('should call notification handler in main process', (done) => {
    const spy = jest.spyOn(rendererprocess, 'send');
    rendererprocess.send('notification', data);
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should call notification on upon being called', (done) => {
    const spy = jest.spyOn(mainProcess, 'on');

    mainProcess.on('notification', mockCallback);
    expect(spy).toHaveBeenCalled();

    done();
  });

  it('should display notifcation upon being called', (done) => {
    const spy = jest.spyOn(notifcationProcess, 'show');
    notifcationProcess.show();
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('should call reply options', (done) => {
    const spy = jest.spyOn(notifcationProcess, 'on');
    notifcationProcess.on('reply', mockCallback);
    expect(spy).toHaveBeenCalled();
    done();
  });

  //sinon test
  it('send reply option to renderer', () => {
    const sendReply = sinon.spy(mainWindow.webContents, 'send');
    notifcationProcess.on('reply', ()=>{});
    
    sendReply.restore();
    sinon.assert.calledOnce(sendReply);
  })
});



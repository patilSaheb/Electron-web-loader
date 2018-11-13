const electron = require('./__mocks__/electron');

const mainProcess = electron.ipcMain;
const protocolWindow = electron.ipcRenderer;
const notifcationProcess = electron.Notification;

describe('notification handler', function () {
  const data = {
    name: 'abc',
    text: 'Hi!!'
  };

  const mockCallback = jest.fn();

  it('should call notification handler in main process', (done) => {
    const spy = jest.spyOn(protocolWindow, 'send');
    protocolWindow.send('notification', data);
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
});



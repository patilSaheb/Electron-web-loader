var Application = require('spectron').Application
var assert = require('assert')
const electronPath = require('electron')

describe('Application launch', function () {
    this.timeout(15000)
    beforeEach(function () {
        this.app = new Application({
            path: electronPath,
            args: ['.'],
            waitTimeout: 10000
        })        
        return this.app.start()
    })

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
        return undefined
    })

    it('shows an initial window', function () {
        return this.app.client.getWindowCount().then(function (count) {
          assert.equal(count, 1)
        })
    })
})
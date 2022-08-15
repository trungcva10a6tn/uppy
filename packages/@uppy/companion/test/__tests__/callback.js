const { describe, test } = require('test')
const expect = require('expect').default
const mockOauthState = require('../mockoauthstate')()

const request = require('supertest')
const tokenService = require('../../src/server/helpers/jwt')
const { getServer } = require('../mockserver')

function mock (package, replacer) {
  const actualPath = require.resolve(package)
  if (arguments.length === 1) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    require.cache[actualPath] = require(`../__mocks__/${package}`)
  } else {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const actual = require(package)
    const Module = require('node:module') // eslint-disable-line global-require
    require.cache[actualPath] = new Module(actualPath, module)
    Object.defineProperties(require.cache[actualPath], {
      exports: {
        __proto__: null,
        value: replacer(actual),
      },
      resetFn: { __proto__: null, value: replacer.bind(null, actual) },
    })
  }
}
mock('../../src/server/helpers/oauth-state', (actual) => ({
  ...actual,
  ...mockOauthState,
}))

const authServer = getServer()
const authData = {
  dropbox: 'token value',
  drive: 'token value',
}
const token = tokenService.generateEncryptedToken(authData, process.env.COMPANION_SECRET)

describe('test authentication callback', () => {
  test('authentication callback redirects to send-token url', () => {
    return request(authServer)
      .get('/drive/callback')
      .expect(302)
      .expect((res) => {
        expect(res.header.location).toContain('http://localhost:3020/drive/send-token?uppyAuthToken=')
      })
  })

  test('the token gets sent via cookie and html', () => {
    // see mock ../../src/server/helpers/oauth-state above for state values
    return request(authServer)
      .get(`/dropbox/send-token?uppyAuthToken=${token}&state=state-with-newer-version`)
      .expect(200)
      .expect((res) => {
        const authToken = res.header['set-cookie'][0].split(';')[0].split('uppyAuthToken--dropbox=')[1]
        expect(authToken).toEqual(token)
        const body = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <script>
          window.opener.postMessage({"token":"${token}"}, "http:\\u002F\\u002Flocalhost:3020")
          window.close()
        </script>
    </head>
    <body></body>
    </html>`
        expect(res.text).toBe(body)
      })
  })
})

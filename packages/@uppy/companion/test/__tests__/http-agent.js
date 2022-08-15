const { test, describe } = require('test')
const expect = require('expect').default
const request = require('request')
const http = require('node:http')
const https = require('node:https')
const { getProtectedHttpAgent, getRedirectEvaluator, FORBIDDEN_IP_ADDRESS } = require('../../src/server/helpers/request')

describe('test getRedirectEvaluator', () => {
  const httpURL = 'http://uppy.io'
  const httpsURL = 'https://uppy.io'
  const httpRedirectResp = {
    headers: {
      location: 'http://transloadit.com',
    },
  }

  const httpsRedirectResp = {
    headers: {
      location: 'https://transloadit.com',
    },
  }

  test('when original URL has "https:" as protocol', () => {
    const shouldRedirectHttps = getRedirectEvaluator(httpsURL, true)
    expect(shouldRedirectHttps(httpsRedirectResp)).toEqual(true)
    expect(shouldRedirectHttps(httpRedirectResp)).toEqual(false)
  })

  test('when original URL has "http:" as protocol', () => {
    const shouldRedirectHttp = getRedirectEvaluator(httpURL, true)
    expect(shouldRedirectHttp(httpRedirectResp)).toEqual(true)
    expect(shouldRedirectHttp(httpsRedirectResp)).toEqual(false)
  })
})

describe('test getProtectedHttpAgent', () => {
  test('setting "https:" as protocol', () => {
    const Agent = getProtectedHttpAgent('https:')
    expect(Agent).toEqual(https.Agent)
  })

  test('setting "https" as protocol', () => {
    const Agent = getProtectedHttpAgent('https')
    expect(Agent).toEqual(https.Agent)
  })

  test('setting "http:" as protocol', () => {
    const Agent = getProtectedHttpAgent('http:')
    expect(Agent).toEqual(http.Agent)
  })

  test('setting "http" as protocol', () => {
    const Agent = getProtectedHttpAgent('http')
    expect(Agent).toEqual(http.Agent)
  })
})

describe('test protected request Agent', () => {
  test('allows URLs without IP addresses', (context, done) => {
    const options = {
      uri: 'https://transloadit.com',
      method: 'GET',
      agentClass: getProtectedHttpAgent('https', true),
    }

    request(options, (err) => {
      if (err) {
        expect(err.message).not.toEqual(FORBIDDEN_IP_ADDRESS)
        expect(err.message.startsWith(FORBIDDEN_IP_ADDRESS)).toEqual(false)
        done()
      } else {
        done()
      }
    })
  })

  test('blocks private http IP address', (context, done) => {
    const options = {
      uri: 'http://172.20.10.4:8090',
      method: 'GET',
      agentClass: getProtectedHttpAgent('http', true),
    }

    request(options, (err) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toEqual(FORBIDDEN_IP_ADDRESS)
      done()
    })
  })

  test('blocks private https IP address', (context, done) => {
    const options = {
      uri: 'https://172.20.10.4:8090',
      method: 'GET',
      agentClass: getProtectedHttpAgent('https', true),
    }

    request(options, (err) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toEqual(FORBIDDEN_IP_ADDRESS)
      done()
    })
  })

  test('blocks localhost IP address', (context, done) => {
    const options = {
      uri: 'http://127.0.0.1:8090',
      method: 'GET',
      agentClass: getProtectedHttpAgent('http', true),
    }

    request(options, (err) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toEqual(FORBIDDEN_IP_ADDRESS)
      done()
    })
  })
})

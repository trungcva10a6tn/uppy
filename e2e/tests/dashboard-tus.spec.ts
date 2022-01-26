import { test, expect } from '@playwright/test'

test.describe('Dashboard with Tus', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard-tus')
    await page.setInputFiles('.uppy-Dashboard-input', 'cypress/fixtures/images/cat.jpg')
  })

  test('should have thumbnails and look visually consistent', async ({ page }) => {
    await Promise.all([
      page.waitForResponse('**/files/**'),
      page.click('.uppy-StatusBar-actionBtn--upload'),
    ])
    const status = await page.textContent('.uppy-StatusBar-statusPrimary')
    expect(status).toBe('Complete')
  })

  test('should start exponential backoff when receiving HTTP 429', async ({ page }) => {
    page.route('https://tusd.tusdemo.net/**', (route) => {
      const { method } = route.request()
      if (method() === 'PATCH') {
        route.fulfill({ status: 429 })
      }
      route.continue()
    }, { times: 2 }) // first request is a POST

    await Promise.all([
      page.waitForResponse('**/files/**'),
      page.click('.uppy-StatusBar-actionBtn--upload'),
    ])
  })
})

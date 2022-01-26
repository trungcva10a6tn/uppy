import { test, expect } from '@playwright/test'

test.describe('Dashboard user interface', () => {
  test('should have thumbnails and look visually consistent', async ({ page }) => {
    await page.goto('/dashboard-ui')
    await page.setInputFiles('.uppy-Dashboard-input', 'cypress/fixtures/images/cat.jpg')
    // Because we are making a screenshot, we should wait till the status bar appear
    // animation has finished and the thumbnail has loaded
    await page.waitForTimeout(1000)
    expect(await page.screenshot()).toMatchSnapshot('dashboard-ui-with-thumbnails.png')
  })
})

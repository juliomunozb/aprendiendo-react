// @ts-check
import { test, expect } from '@playwright/test'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const LOCALHOST_URL = 'http://localhost:5173/'
test.beforeEach(async ({ page }) => {
  await page.goto(LOCALHOST_URL)
})

test.describe('app shows random fact and image', () => {
  test('get text random fact', async ({ page }) => {
    const text = await page.getByRole('paragraph')
    const textContent = await text.textContent()
    await expect(textContent?.length).toBeGreaterThan(0)
  })

  test('reviewing exist images', async ({ page }) => {
    const image = await page.getByRole('img')
    const imageSrc = await image.getAttribute('src')
    await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
  })
})

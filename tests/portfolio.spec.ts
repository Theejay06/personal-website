import { expect, test } from '@playwright/test'

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`layout, anchors and runtime at ${width}px`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('TheejayTagama.')
    for (const id of ['home', 'work', 'about', 'skills', 'certifications', 'education', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      await page.waitForTimeout(750)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
    }
    const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.querySelector(link.getAttribute('href')!)).length)
    expect(broken).toBe(0)
    expect(errors).toEqual([])
    if (width === 1440 || width === 390) {
      // Visit each reveal before capturing a full-page image.
      for (const element of await page.locator('.section-heading, .project-heading, .project-visual').all()) {
        await element.scrollIntoViewIfNeeded()
        await expect(element).toHaveCSS('opacity', '1')
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true })
    }
  })
}

test('mobile navigation keyboard, dismissal and active section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  const toggle = page.getByRole('button', { name: 'Open navigation' })
  await toggle.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Skills', exact: true }).click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(page).toHaveURL(/#skills$/)
  await expect(page.locator('.main-nav a[href="#skills"]')).toHaveAttribute('aria-current', 'location')
})

test('placeholder dialog traps focus, locks scroll and restores focus', async ({ page }) => {
  await page.route('**/src/data/certificates.ts', route => route.fulfill({ contentType: 'application/javascript', body: 'export const certificates = [];' }))
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Preview certificate placeholder' })
  await trigger.click()
  const modal = page.getByRole('dialog')
  const close = page.getByRole('button', { name: 'Close certificate preview' })
  await expect(modal).toBeVisible()
  await expect(close).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(modal).toHaveCount(0)
  await expect(trigger).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  await trigger.click()
  await page.mouse.click(3, 3)
  await expect(modal).toHaveCount(0)
  await trigger.click()
  await close.click()
  await expect(trigger).toBeFocused()
})

test('real certificate data branch displays metadata and credential link', async ({ page }) => {
  // Test-only fixture. Never included in the portfolio data or production build.
  await page.route('**/src/data/certificates.ts', route => route.fulfill({
    contentType: 'application/javascript',
    body: `export const certificates = [{ id: 'test', title: 'Test fixture certificate', organization: 'Test issuer', date: 'Test date', image: '/favicon.svg', imageAlt: 'Test certificate asset', credentialId: 'TEST-ONLY', credentialUrl: 'https://example.com/credential' }];`,
  }))
  await page.goto('/')
  await page.getByRole('button', { name: 'Preview Test fixture certificate' }).click()
  const modal = page.getByRole('dialog')
  await expect(modal.getByRole('heading')).toHaveText('Test fixture certificate')
  await expect(modal.getByText('Test issuer · Test date')).toBeVisible()
  await expect(modal.getByText('Credential ID: TEST-ONLY')).toBeVisible()
  await expect(modal.getByRole('link', { name: 'View credential' })).toHaveAttribute('href', 'https://example.com/credential')
  await page.keyboard.press('Shift+Tab')
  await expect(modal.getByRole('link')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Close certificate preview' })).toBeFocused()
})

test('reduced motion disables movement and reveals content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  await expect(page.locator('h1')).toHaveCSS('opacity', '1')
  await expect(page.locator('h1')).toHaveCSS('transform', 'none')
  await page.locator('#work').scrollIntoViewIfNeeded()
  await expect(page.locator('.project-visual').first()).toHaveCSS('transform', 'none')
  await expect(page.locator('.project-visual').first()).toHaveCSS('opacity', '1')
})

test('supplied certificates load with original documents and membership metadata', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('.certificate-card')
  await expect(cards).toHaveCount(5)
  for (const card of await cards.all()) {
    await card.click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    const image = modal.locator('img')
    await expect(image).toBeVisible()
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
    const original = await modal.getByRole('link', { name: 'View original certificate' }).getAttribute('href')
    expect(original).toBeTruthy()
    expect((await page.request.get(original!)).ok()).toBe(true)
    await page.keyboard.press('Escape')
    await expect(card).toBeFocused()
  }
  await page.getByRole('button', { name: 'Preview JPCS National Membership' }).click()
  await expect(page.getByRole('dialog').getByText('Credential ID: NCR13204-AY2025-2026-0040')).toBeVisible()
})

test('edited portrait loads with genuine transparency', async ({ page }) => {
  await page.goto('/')
  const portrait = page.getByRole('img', { name: 'Theejay Tagama', exact: true })
  await expect(portrait).toHaveAttribute('src', '/images/theejay-tagama-cutout.png')
  await expect.poll(() => portrait.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
  const alpha = await portrait.evaluate((img: HTMLImageElement) => {
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const context = canvas.getContext('2d')!
    context.drawImage(img, 0, 0)
    return context.getImageData(0, 0, 1, 1).data[3]
  })
  expect(alpha).toBe(0)
  await expect(portrait).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
})

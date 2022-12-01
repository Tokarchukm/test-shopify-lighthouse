import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse'

test('Can generate report from home page', async ({ playwright }) => {
    const browser = await playwright.chromium.launch({
        args: ['--remote-debugging-port=9222']
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://shopify.dev/')
    await playAudit({
        page: page,
        thresholds: {
            performance: 50,
            accessibility: 50,
            'best-practices': 50,
            seo: 50,
            pwa: 50
        },
        port:9222,
        ignoreError: true,
        reports: {
            formats: { html: true },
            name: 'lighthouse - report',
            directory: 'directory - report' + Date.now().toString()
        }
    })

    await page.close()
    await context.close()
    await browser.close()

});

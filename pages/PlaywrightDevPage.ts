import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object del sitio público https://playwright.dev
 */
export class PlaywrightDevPage {
  readonly page: Page;
  readonly enlaceGetStarted: Locator;
  readonly tituloPrincipal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.enlaceGetStarted = page.getByRole('link', { name: 'Get started' });
    this.tituloPrincipal = page.locator('h1');
  }

  async abrir() {
    await this.page.goto('https://playwright.dev/');
    await expect(this.page).toHaveTitle(/Playwright/);
  }

  async irAGetStarted() {
    await this.enlaceGetStarted.click();
    await expect(this.page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  }
}

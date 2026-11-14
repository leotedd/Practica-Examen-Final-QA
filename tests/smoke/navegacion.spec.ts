import { test, expect } from '@playwright/test';

/**
 * Ejemplos 1, 3 y 6: navegación + expect, test.describe/beforeEach, etiquetas.
 * Ejecutar: npm run test:smoke
 */
test.describe('Navegación en playwright.dev', { tag: '@smoke' }, () => {
  test.beforeEach(async ({ page }) => {
    // Se ejecuta antes de CADA prueba del bloque
    await page.goto('https://playwright.dev/');
  });

  test('la página principal carga con el título correcto', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page).toHaveURL('https://playwright.dev/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('el enlace Get started lleva a Installation', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/.*intro/);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  // Etiqueta adicional en el título: se filtra con --grep "@critico"
  test('la navegación principal muestra Docs @critico', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Docs', exact: true }).first()).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

/**
 * Ejemplo 9: capturas de pantalla.
 * - La config ya toma una captura automática al final de cada prueba (screenshot: 'on').
 * - Aquí se toman capturas manuales: página completa, elemento, y adjuntas al reporte HTML.
 * Las capturas de ejemplo se guardan en evidencias/ejemplos/ (excluida de Git).
 * Para la entrega, guarde las suyas en evidencias/ con un nombre descriptivo.
 */
test.describe('Capturas de pantalla', { tag: '@sanity' }, () => {
  test('captura de página completa y de un elemento', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.getByPlaceholder('What needs to be done?').fill('Tarea para evidencia');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await expect(page.getByTestId('todo-title')).toHaveText('Tarea para evidencia');

    // Página completa guardada en disco
    await page.screenshot({ path: 'evidencias/ejemplos/todomvc-pagina-completa.png', fullPage: true });

    // Solo un elemento
    await page.locator('.todoapp').screenshot({ path: 'evidencias/ejemplos/todomvc-elemento.png' });
  });

  test('captura adjunta al reporte HTML', async ({ page }, testInfo) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);

    const captura = await page.screenshot();
    await testInfo.attach('pagina-principal-playwright', { body: captura, contentType: 'image/png' });
  });
});

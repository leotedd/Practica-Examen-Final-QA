import { test, expect } from '@playwright/test';

/**
 * Ejemplo 10: depuración con page.pause, Inspector y Trace Viewer.
 *
 * Inspector (paso a paso):
 *   npx playwright test tests/sanity/depuracion.spec.ts --project=edge --debug
 *
 * page.pause() solo se activa si existe la variable PAUSAR (PowerShell):
 *   $env:PAUSAR=1; npx playwright test tests/sanity/depuracion.spec.ts --project=edge --headed; Remove-Item Env:PAUSAR
 *
 * Trace Viewer: este archivo fuerza trace: 'on'. Tras ejecutarlo:
 *   npx playwright show-trace test-results\<carpeta-de-la-prueba>\trace.zip
 *   (o abra el reporte HTML y haga clic en la traza)
 */
test.use({ trace: 'on' });

test.describe('Depuración', { tag: '@sanity' }, () => {
  test('flujo con traza y pausa opcional', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    if (process.env.PAUSAR) {
      await page.pause(); // Abre el Inspector: permite explorar localizadores en vivo
    }

    await test.step('Agregar una tarea', async () => {
      await page.getByPlaceholder('What needs to be done?').fill('Depurar con Trace Viewer');
      await page.getByPlaceholder('What needs to be done?').press('Enter');
    });

    await test.step('Validar la tarea', async () => {
      await expect(page.getByTestId('todo-title')).toHaveText('Depurar con Trace Viewer');
    });
  });
});

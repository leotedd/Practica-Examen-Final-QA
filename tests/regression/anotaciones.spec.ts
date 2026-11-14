import { test, expect } from '@playwright/test';

/**
 * Ejemplo 11: anotaciones (annotation, skip, slow, fixme) y uso apropiado de test.fail.
 *
 * test.fail  -> la prueba DEBE fallar (defecto conocido y documentado). Si pasa, Playwright
 *               la marca como fallida para avisar que el defecto se corrigió.
 * test.skip  -> no se ejecuta (condición no aplica, p. ej. navegador).
 * test.fixme -> no se ejecuta; pendiente de arreglar la prueba.
 * test.slow  -> triplica el timeout.
 */
const TODO_URL = 'https://demo.playwright.dev/todomvc/#/';

test.describe('Anotaciones', { tag: '@regression' }, () => {
  test('anotación personalizada visible en el reporte HTML', {
    annotation: [
      { type: 'requisito', description: 'RF-01: el usuario puede agregar tareas' },
      { type: 'issue', description: 'https://github.com/microsoft/playwright/issues (ejemplo de enlace)' },
    ],
  }, async ({ page }) => {
    await page.goto(TODO_URL);
    await page.getByPlaceholder('What needs to be done?').fill('Tarea anotada');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await expect(page.getByTestId('todo-title')).toHaveText('Tarea anotada');
  });

  test('defecto conocido documentado con test.fail', {
    annotation: { type: 'defecto', description: 'Simulación: se espera "0 items left" tras agregar 1 tarea' },
  }, async ({ page }) => {
    // Uso apropiado: el resultado esperado por el requisito NO se cumple hoy.
    test.fail(true, 'Defecto conocido: el contador no coincide con el requisito simulado');
    await page.goto(TODO_URL);
    await page.getByPlaceholder('What needs to be done?').fill('Una tarea');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await expect(page.getByTestId('todo-count')).toHaveText('0 items left', { timeout: 2000 });
  });

  test('test.skip condicional por navegador', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'No aplica en WebKit');
    await page.goto(TODO_URL);
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  });

  test('test.slow para pruebas lentas', async ({ page }) => {
    test.slow();
    await page.goto(TODO_URL);
    await expect(page).toHaveTitle(/TodoMVC/);
  });

  test.fixme('prueba pendiente de implementar (no se ejecuta)', async () => {
    // Se completará cuando exista el requisito.
  });
});

import { test, expect } from '@playwright/test';

/**
 * Ejemplos 7 y 8: expect.soft y pruebas parametrizadas.
 */

// --- expect.soft: no detiene la prueba al fallar; reporta todos los fallos al final ---
test('expect.soft valida varios elementos sin detenerse', { tag: '@regression' }, async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect.soft(page).toHaveTitle(/Playwright/);
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.locator('h1')).toContainText('Playwright');
  // Si alguna aserción soft falló, se puede cortar aquí:
  expect(test.info().errors).toHaveLength(0);
});

// --- Parametrizadas: un test por cada dato ---
const tareas = [
  { nombre: 'texto simple', texto: 'Comprar pan' },
  { nombre: 'con acentos', texto: 'Revisión de calidad' },
  { nombre: 'con números', texto: 'Clase 12 - Playwright' },
];

test.describe('Parametrizadas: agregar tareas', { tag: '@regression' }, () => {
  for (const { nombre, texto } of tareas) {
    test(`agrega una tarea ${nombre}`, async ({ page }) => {
      await page.goto('https://demo.playwright.dev/todomvc/#/');
      const entrada = page.getByPlaceholder('What needs to be done?');
      await entrada.fill(texto);
      await entrada.press('Enter');
      await expect(page.getByTestId('todo-title')).toHaveText(texto);
    });
  }
});

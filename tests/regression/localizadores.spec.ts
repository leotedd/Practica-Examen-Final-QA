import { test, expect } from '@playwright/test';

/**
 * Ejemplo 2: localizadores getByRole, locator (CSS) y getByTestId.
 * Prioridad recomendada: getByRole > getByLabel/getByPlaceholder/getByText > getByTestId > locator(CSS/XPath)
 */
test.describe('Localizadores en TodoMVC', { tag: '@regression' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const entrada = page.getByPlaceholder('What needs to be done?');
    await entrada.fill('Estudiar clase 10');
    await entrada.press('Enter');
    await entrada.fill('Estudiar clase 11');
    await entrada.press('Enter');
  });

  test('getByRole: encabezado, checkbox y enlaces', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Toggle Todo' })).toHaveCount(2);
    await expect(page.getByRole('link', { name: 'Completed' })).toBeVisible();
  });

  test('locator: selectores CSS y filtros', async ({ page }) => {
    const items = page.locator('.todo-list li');
    await expect(items).toHaveCount(2);
    await expect(items.first()).toHaveText('Estudiar clase 10');
    await expect(items.filter({ hasText: 'clase 11' })).toHaveCount(1);
    await expect(items.nth(1)).toContainText('11');
  });

  test('getByTestId: atributos data-testid', async ({ page }) => {
    await expect(page.getByTestId('todo-title')).toHaveText(['Estudiar clase 10', 'Estudiar clase 11']);
    await expect(page.getByTestId('todo-count')).toContainText('2');
  });
});

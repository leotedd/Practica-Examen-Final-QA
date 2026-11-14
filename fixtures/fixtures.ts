import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { PlaywrightDevPage } from '../pages/PlaywrightDevPage';

/**
 * Fixtures personalizadas con base.extend.
 *
 * - todoPage: entrega un TodoPage ya abierto (setup antes de `use`).
 * - playwrightDev: entrega el Page Object de playwright.dev sin navegar.
 *
 * Uso en una prueba:
 *   import { test, expect } from '../../fixtures/fixtures';
 *   test('...', async ({ todoPage }) => { ... });
 */
type MisFixtures = {
  todoPage: TodoPage;
  playwrightDev: PlaywrightDevPage;
};

export const test = base.extend<MisFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.abrir();     // setup
    await use(todoPage);        // la prueba se ejecuta aquí
    // teardown (opcional): código después de use()
  },

  playwrightDev: async ({ page }, use) => {
    await use(new PlaywrightDevPage(page));
  },
});

export { expect };

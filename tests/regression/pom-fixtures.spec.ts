// Ejemplos 4 y 5: Page Object Model + fixtures con base.extend.
// Se importa `test` desde las fixtures propias, NO desde @playwright/test.
import { test, expect } from '../../fixtures/fixtures';

test.describe('POM y fixtures', { tag: '@regression' }, () => {
  test('la fixture todoPage entrega la app ya abierta', async ({ todoPage }) => {
    await todoPage.agregarTareas(['Repasar POM', 'Repasar fixtures']);
    await expect(todoPage.tareas).toHaveCount(2);
    await expect(todoPage.contador).toContainText('2');
  });

  test('completar una tarea y filtrar por Completed', async ({ todoPage }) => {
    await todoPage.agregarTareas(['Tarea A', 'Tarea B']);
    await todoPage.completarTarea('Tarea A');
    await todoPage.filtrar('Completed');
    await expect(todoPage.titulosTareas).toHaveText(['Tarea A']);
    await todoPage.filtrar('Active');
    await expect(todoPage.titulosTareas).toHaveText(['Tarea B']);
  });

  test('Page Object de playwright.dev', async ({ playwrightDev }) => {
    await playwrightDev.abrir();
    await playwrightDev.irAGetStarted();
  });
});

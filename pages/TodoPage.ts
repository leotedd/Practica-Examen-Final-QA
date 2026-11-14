import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object de la app pública de demostración TodoMVC.
 * https://demo.playwright.dev/todomvc
 *
 * Patrón POM: los localizadores y acciones viven aquí; las pruebas
 * solo describen el comportamiento esperado.
 */
export class TodoPage {
  readonly page: Page;
  readonly nuevaTarea: Locator;
  readonly tareas: Locator;
  readonly titulosTareas: Locator;
  readonly contador: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nuevaTarea = page.getByPlaceholder('What needs to be done?');
    this.tareas = page.getByTestId('todo-item');
    this.titulosTareas = page.getByTestId('todo-title');
    this.contador = page.getByTestId('todo-count');
  }

  async abrir() {
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    await expect(this.nuevaTarea).toBeVisible();
  }

  async agregarTarea(texto: string) {
    await this.nuevaTarea.fill(texto);
    await this.nuevaTarea.press('Enter');
  }

  async agregarTareas(textos: string[]) {
    for (const texto of textos) {
      await this.agregarTarea(texto);
    }
  }

  async completarTarea(texto: string) {
    await this.tareas.filter({ hasText: texto }).getByRole('checkbox').check();
  }

  async filtrar(nombre: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name: nombre }).click();
  }
}

import { Page, Locator } from '@playwright/test';
import { BUGGY_URL } from './RegistroPage';

/** Page Object de la lista Overall Rating (/overall). */
export class OverallRatingPage {
  readonly filas: Locator;

  constructor(private readonly page: Page) {
    this.filas = page.getByRole('table').locator('tbody tr');
  }

  async abrir() {
    await this.page.goto(`${BUGGY_URL}/overall`);
  }

  /** Enlace del modelo (columna "Model") de la primera fila de la lista. */
  enlaceModeloPrimerAuto(): Locator {
    return this.filas.first().getByRole('cell').nth(2).getByRole('link');
  }

  /** Abre el primer automóvil y devuelve su nombre de modelo. */
  async abrirPrimerAuto(): Promise<string> {
    const enlace = this.enlaceModeloPrimerAuto();
    const modelo = (await enlace.innerText()).trim();
    await enlace.click();
    return modelo;
  }
}

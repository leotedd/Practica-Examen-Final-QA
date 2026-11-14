import { Page, Locator } from '@playwright/test';

/** Page Object del detalle de un modelo (/model/...). Solo lectura: no vota. */
export class ModeloPage {
  readonly titulo: Locator;
  readonly mensajeDebeIniciarSesion: Locator;
  readonly botonVotar: Locator;
  readonly campoComentario: Locator;

  constructor(page: Page) {
    const detalle = page.locator('my-model');
    this.titulo = detalle.getByRole('heading', { level: 3 });
    this.mensajeDebeIniciarSesion = detalle.getByText('You need to be logged in to vote.');
    this.botonVotar = detalle.getByRole('button', { name: 'Vote!' });
    this.campoComentario = detalle.locator('#comment');
  }
}

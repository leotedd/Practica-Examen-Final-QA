import { Page, Locator } from '@playwright/test';

export const BUGGY_URL = 'https://buggy.justtestit.org';

export type DatosRegistro = {
  login: string;
  nombre: string;
  apellido: string;
  clave: string;
  confirmacion: string;
};

/** Page Object del formulario de registro de Buggy Cars Rating (/register). */
export class RegistroPage {
  /** Contenedor del formulario (se usa para la captura de evidencia). */
  readonly formulario: Locator;
  readonly login: Locator;
  readonly nombre: Locator;
  readonly apellido: Locator;
  readonly clave: Locator;
  readonly confirmacion: Locator;
  readonly botonRegistrar: Locator;
  /** Mensaje de validación del campo Confirm Password. */
  readonly mensajeClavesNoCoinciden: Locator;
  /** Mensaje de resultado que muestra el sitio tras enviar el formulario. */
  readonly resultado: Locator;

  constructor(private readonly page: Page) {
    const formulario = page.locator('my-register');
    this.formulario = formulario;
    this.login = formulario.getByLabel('Login');
    this.nombre = formulario.getByLabel('First Name');
    this.apellido = formulario.getByLabel('Last Name');
    this.clave = formulario.getByLabel('Password', { exact: true });
    this.confirmacion = formulario.getByLabel('Confirm Password');
    this.botonRegistrar = formulario.getByRole('button', { name: 'Register' });
    this.mensajeClavesNoCoinciden = formulario.getByText('Passwords do not match');
    this.resultado = formulario.locator('.result');
  }

  async abrir() {
    await this.page.goto(`${BUGGY_URL}/register`);
  }

  async llenar(datos: DatosRegistro) {
    await this.login.fill(datos.login);
    await this.nombre.fill(datos.nombre);
    await this.apellido.fill(datos.apellido);
    await this.clave.fill(datos.clave);
    await this.confirmacion.fill(datos.confirmacion);
    // Sale del campo para que Angular ejecute la validación de confirmación.
    await this.confirmacion.blur();
  }
}

/** Genera un login único para no chocar con usuarios existentes (HU-1 C3). */
export function loginUnico(prefijo = 'qa_iii'): string {
  return `${prefijo}_${Date.now()}`;
}

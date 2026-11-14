// CP-02 | HU-1 Registro de usuario | Criterio C2
// La clave debe tener mínimo 6 caracteres e incluir una mayúscula y un carácter especial.
// Valor límite: una clave de exactamente 6 caracteres que cumple el criterio
// DEBE ser aceptada.
//
// DEFECTO CONOCIDO: DEF-01 — el sitio rechaza la clave con
// "Password did not conform with policy: Password not long enough"
// (el mínimo real del sitio es 8). El resultado esperado NO se modifica
// para ocultar el defecto: esta prueba falla mientras el defecto exista.
import { test, expect } from '@playwright/test';
import { RegistroPage, loginUnico } from '../../pages/buggy/RegistroPage';

const EVIDENCIA = 'evidencias/III-serie/automatizadas/CP-02-registro-clave-seis-caracteres.png';
const CLAVE_SEIS = 'Abc#12'; // 6 caracteres: mayúscula (A) + carácter especial (#)

test.describe('HU-1 Registro de usuario', { tag: ['@examen-iii', '@regression'] }, () => {
  test('CP-02 (C2) acepta una clave de 6 caracteres con mayúscula y carácter especial', {
    annotation: { type: 'defecto', description: 'DEF-01: el sitio exige 8 caracteres mínimo en lugar de 6' },
  }, async ({ page }) => {
    const registro = new RegistroPage(page);
    expect(CLAVE_SEIS).toHaveLength(6);

    await registro.abrir();
    await registro.llenar({
      login: loginUnico(),
      nombre: 'QA',
      apellido: 'Serie III',
      clave: CLAVE_SEIS,
      confirmacion: CLAVE_SEIS,
    });
    await registro.botonRegistrar.click();

    // Espera la respuesta del sitio y guarda la evidencia antes de evaluar,
    // para que la captura exista tanto si aprueba como si falla.
    await expect(registro.resultado).toBeVisible({ timeout: 30_000 });
    // Captura del formulario completo: incluye campos, botón y mensaje del sitio.
    await registro.formulario.screenshot({ path: EVIDENCIA });

    // Resultado esperado según HU-1 C2: registro exitoso.
    await expect(registro.resultado).toHaveText('Registration is successful');
  });
});

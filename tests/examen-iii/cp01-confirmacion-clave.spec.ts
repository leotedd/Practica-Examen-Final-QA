// CP-01 | HU-1 Registro de usuario | Criterio C4
// Se debe confirmar la clave y ambas claves deben coincidir.
import { test, expect } from '@playwright/test';
import { RegistroPage, loginUnico } from '../../pages/buggy/RegistroPage';

const EVIDENCIA = 'evidencias/III-serie/automatizadas/CP-01-confirmacion-clave.png';

test.describe('HU-1 Registro de usuario', { tag: ['@examen-iii', '@regression'] }, () => {
  test('CP-01 (C4) impide el registro cuando la confirmación de clave no coincide', async ({ page }) => {
    const registro = new RegistroPage(page);

    await registro.abrir();
    await registro.llenar({
      login: loginUnico(),
      nombre: 'QA',
      apellido: 'Serie III',
      clave: 'Prueba#2026',
      confirmacion: 'Prueba#9999',
    });

    // El sitio debe informar que las claves no coinciden...
    await expect(registro.mensajeClavesNoCoinciden).toBeVisible();
    // ...y no debe permitir enviar el registro.
    await expect(registro.botonRegistrar).toBeDisabled();
    await expect(registro.resultado).toHaveCount(0);

    // Captura del formulario completo: incluye campos, botón y mensaje del sitio.
    await registro.formulario.screenshot({ path: EVIDENCIA });
  });
});

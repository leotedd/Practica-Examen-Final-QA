// CP-03 | HU-3 Votar por autos | Criterio C4
// A quien no haya iniciado sesión se le debe informar que debe hacerlo para votar.
// Esta prueba NO vota ni publica comentarios.
import { test, expect } from '@playwright/test';
import { OverallRatingPage } from '../../pages/buggy/OverallRatingPage';
import { ModeloPage } from '../../pages/buggy/ModeloPage';

const EVIDENCIA = 'evidencias/III-serie/automatizadas/CP-03-votacion-sin-login.png';

test.describe('HU-3 Votar por autos', { tag: ['@examen-iii', '@regression'] }, () => {
  test('CP-03 (C4) sin sesión, el primer auto de Overall Rating informa que se debe iniciar sesión para votar', async ({ page }) => {
    const overall = new OverallRatingPage(page);
    const modelo = new ModeloPage(page);

    await overall.abrir();
    // La lista se carga desde un API lento: espera condicional (no fija) de hasta 30 s.
    await expect(overall.filas.first()).toBeVisible({ timeout: 30_000 });
    const nombreModelo = await overall.abrirPrimerAuto();

    await expect(page).toHaveURL(/\/model\//);
    await expect(modelo.titulo).toHaveText(nombreModelo);
    await expect(modelo.mensajeDebeIniciarSesion).toBeVisible({ timeout: 30_000 });
    // Un visitante sin sesión no debe ver los controles de votación.
    await expect(modelo.botonVotar).toHaveCount(0);
    await expect(modelo.campoComentario).toHaveCount(0);

    // Captura del área visible (la página completa es demasiado alta por los comentarios).
    await modelo.mensajeDebeIniciarSesion.scrollIntoViewIfNeeded();
    await page.screenshot({ path: EVIDENCIA });
  });
});

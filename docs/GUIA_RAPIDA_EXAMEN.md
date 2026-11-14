# Guía rápida para el examen final – Playwright + TypeScript

> Navegador de trabajo en este equipo: **Microsoft Edge** (proyecto `edge`).
> Chromium, Firefox y WebKit no arrancan aquí: no ejecute `npm run test:all-browsers`
> ni `npx playwright test` sin `--project=edge`.

---

## 1. Abrir el proyecto

```powershell
cd C:\Users\i7del\OneDrive\Desktop\Practica_Examen_Final_QA
code .                      # Abrir en VS Code (opcional)
git status                  # Confirmar rama main y cambios pendientes
npm run typecheck           # Debe terminar sin errores
npm run test:smoke          # Prueba rápida de que Edge y la red funcionan
```

Si `node_modules` no existe: `npm ci`.

---

## 2. Interpretar un enunciado de pruebas

Lea el enunciado completo una vez y luego extraiga, por cada requisito:

| Pregunta                          | Se convierte en…                                  |
|-----------------------------------|---------------------------------------------------|
| ¿Qué URL / página se prueba?      | `page.goto('...')` o un Page Object               |
| ¿Qué acción realiza el usuario?   | `click`, `fill`, `press`, `check`, `selectOption` |
| ¿Qué resultado se espera?         | `expect(...)` (una aserción por resultado)        |
| ¿Qué tipo de prueba pide?         | Etiqueta `@smoke`, `@regression` o `@sanity`      |
| ¿Pide varios datos de entrada?    | Prueba parametrizada (`for ... of`)               |
| ¿Pide pasos repetidos al inicio?  | `test.beforeEach` o una fixture                   |
| ¿Pide estructura POM o fixtures?  | Clase en `pages/` y/o `base.extend` en `fixtures/`|
| ¿Pide evidencia?                  | Captura en `evidencias/` + reporte HTML           |

Recordatorio de tipos (clases 10-12):

- **Smoke**: verificación rápida de que lo esencial funciona (carga, navegación principal).
- **Sanity**: verificación enfocada de una funcionalidad concreta tras un cambio.
- **Regression**: cobertura amplia para confirmar que lo existente sigue funcionando.

Escriba los casos antes de programar, por ejemplo:

```
CP-01 | Smoke | Abrir página principal | Título contiene "X"
CP-02 | Regression | Agregar elemento "Y" | Lista muestra "Y"
```

---

## 3. Identificar los requisitos de una captura

Antes de tomar la captura, confirme en el enunciado:

- **Qué debe verse**: página completa (`fullPage: true`), un elemento concreto o el estado tras una acción.
- **Cuándo**: después de la acción y **después** del `expect` que valida el estado (así la captura prueba el resultado).
- **Nombre y ubicación**: use nombres descriptivos, p. ej. `evidencias/CP-01-pagina-principal.png`.
- **Dónde se entrega**: carpeta `evidencias/`, reporte HTML, o ambos.

```ts
await expect(page.getByTestId('resultado')).toBeVisible();          // primero validar
await page.screenshot({ path: 'evidencias/CP-02-resultado.png', fullPage: true });
await page.locator('#formulario').screenshot({ path: 'evidencias/CP-02-formulario.png' });
```

La config ya genera una captura automática al final de cada prueba (`screenshot: 'on'`) en
`test-results/` y en el reporte HTML.

---

## 4. Crear un archivo `.spec.ts`

1. Elija la carpeta según el tipo: `tests/smoke/`, `tests/regression/` o `tests/sanity/`.
2. Nombre: `tests/<tipo>/<funcionalidad>.spec.ts` (debe terminar en `.spec.ts`).
3. Plantilla base:

```ts
import { test, expect } from '@playwright/test';
// Si usa fixtures propias:  import { test, expect } from '../../fixtures/fixtures';

test.describe('Nombre de la funcionalidad', { tag: '@smoke' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://URL-DEL-ENUNCIADO');
  });

  test('CP-01 descripción del resultado esperado', async ({ page }) => {
    // Acción
    await page.getByRole('button', { name: 'Texto del botón' }).click();
    // Validación
    await expect(page.getByRole('heading', { name: 'Texto esperado' })).toBeVisible();
  });
});
```

Ejemplos de referencia en este proyecto:

| Tema                               | Archivo                                        |
|------------------------------------|------------------------------------------------|
| Navegación, describe, beforeEach, tags | `tests/smoke/navegacion.spec.ts`           |
| getByRole, locator, getByTestId    | `tests/regression/localizadores.spec.ts`       |
| POM + fixtures (`base.extend`)     | `tests/regression/pom-fixtures.spec.ts`, `pages/`, `fixtures/` |
| expect.soft + parametrizadas       | `tests/regression/soft-parametrizadas.spec.ts` |
| Anotaciones, test.fail/skip/fixme/slow | `tests/regression/anotaciones.spec.ts`     |
| Capturas de pantalla               | `tests/sanity/capturas.spec.ts`                |
| page.pause, Inspector, Trace Viewer| `tests/sanity/depuracion.spec.ts`              |

Para descubrir localizadores rápidamente: `npm run codegen -- https://URL-DEL-ENUNCIADO`.

---

## 5. Ejecutar y depurar

```powershell
npm test                                            # Todo en Edge
npm run test:smoke                                  # Solo @smoke
npm run test:regression                             # Solo @regression
npm run test:sanity                                 # Solo @sanity
npx playwright test tests/smoke/mi.spec.ts --project=edge      # Un archivo
npx playwright test tests/smoke/mi.spec.ts:12 --project=edge   # Una prueba por línea
npx playwright test --project=edge -g "CP-01"                  # Por texto del título
npx playwright test --project=edge --grep "@smoke|@sanity"     # Varias etiquetas
npx playwright test --project=edge --grep-invert "@regression" # Excluir etiqueta
npm run test:headed                                 # Ver el navegador
npm run test:list                                   # Listar sin ejecutar
```

Depuración:

```powershell
npm run test:debug -- tests/smoke/mi.spec.ts        # Inspector paso a paso
npm run test:ui                                     # Modo UI (reloj, re-ejecución)
npm run test:trace                                  # Fuerza trazas en todas las pruebas
npx playwright show-trace test-results\<carpeta>\trace.zip
$env:PAUSAR=1; npx playwright test tests/sanity/depuracion.spec.ts --project=edge --headed; Remove-Item Env:PAUSAR
```

> Para pasar argumentos a un script npm use `--`, p. ej. `npm run test:smoke -- --headed`.

Si una prueba falla, revise en este orden: mensaje del error en consola → captura y video en el
reporte HTML → traza (`npm run test:trace` y abrir la traza) → localizador con `codegen` o Inspector.

**Ojo:** las pruebas con `test.fail` aparecen con ✘ en la consola cuando fallan *como se esperaba*;
cuentan como aprobadas en el resumen final.

---

## 6. Generar y guardar evidencias

1. Ejecute con reporte HTML: `npm run test:edge` (consola + HTML).
2. Capturas manuales: guárdelas directamente en `evidencias/` desde la prueba (`page.screenshot({ path })`).
3. Capturas automáticas: están en `test-results\<prueba>\test-finished-1.png`; copie las relevantes:

   ```powershell
   Copy-Item test-results\<carpeta>\test-finished-1.png evidencias\CP-01-nombre.png
   ```

4. Reporte HTML para entregar:

   ```powershell
   Copy-Item -Recurse -Force playwright-report reportes\reporte-html
   ```

5. Videos (`.webm`) y trazas (`.zip`) están excluidos de Git por tamaño; adjúntelos solo si se piden.

> `test-results/` y `playwright-report/` se **sobrescriben** en cada ejecución. Copie las
> evidencias antes de volver a ejecutar.

---

## 7. Revisar el reporte HTML

```powershell
npm run report              # Abre playwright-report/index.html en un servidor local
```

En el reporte:

- Filtre por estado (Passed / Failed / Flaky / Skipped) y por proyecto o etiqueta.
- Abra una prueba para ver pasos, duración, anotaciones, capturas, video y traza.
- Use la búsqueda para filtrar por etiqueta (`@smoke`) o nombre (`CP-01`).

Nota: `npm run test:list` no altera el reporte; ejecutar `npx playwright test --list` **sin**
`--reporter=list` sí lo reemplaza por uno vacío.

---

## 8. Preparar la entrega en GitHub (solo cuando esté autorizada)

```powershell
npm run typecheck                    # 1. Sin errores de TypeScript
npm run test:edge                    # 2. Pruebas pasando + reporte HTML
git status                           # 3. Revisar qué cambió
git add --dry-run .                  # 4. Ver qué se agregaría (no agrega nada)
git add tests pages fixtures evidencias reportes docs README.md package.json playwright.config.ts
git commit -m "Descripción clara de la entrega"
git push                             # 5. Sin --force
```

Luego verifique en https://github.com/leotedd/Practica-Examen-Final-QA que los archivos aparecen.

Consulte también: [`CHECKLIST_ENTREGA.md`](CHECKLIST_ENTREGA.md).

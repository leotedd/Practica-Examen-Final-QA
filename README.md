# Práctica – Examen Final de Aseguramiento de la Calidad del Software

Proyecto de automatización de pruebas E2E con **Playwright + TypeScript** (clases 10, 11 y 12).

## Requisitos

- Node.js 18+ (verificado con v24.14.1)
- Microsoft Edge instalado (navegador usado en este equipo)
- Dependencias del proyecto: `npm install`

> **Nota sobre navegadores en este equipo:** Chromium (`spawn UNKNOWN`), Firefox
> (`NS_ERROR_UNKNOWN_SOCKET_TYPE`) y WebKit (DLL faltantes) no arrancan en esta máquina.
> Use siempre el proyecto **`edge`**. Los proyectos `chromium`, `firefox` y `webkit`
> se mantienen en la configuración para equipos donde sí funcionen.

## Instalación

```powershell
git clone https://github.com/leotedd/Practica-Examen-Final-QA.git
cd Practica-Examen-Final-QA
npm ci                     # Instala dependencias exactas de package-lock.json
npm run typecheck          # Verifica que TypeScript compile
npm run test:edge          # Ejecuta las pruebas en Microsoft Edge
```

El proyecto `edge` usa el Microsoft Edge instalado en el sistema, por lo que no requiere
`npx playwright install`. Para usar Chromium/Firefox/WebKit en otro equipo:
`npx playwright install`.

## Estructura

```
tests/        Especificaciones de prueba (*.spec.ts)
pages/        Page Objects (POM)
fixtures/     Fixtures personalizados de Playwright
evidencias/   Capturas seleccionadas para entregar (se versionan)
informe/      Informe final de pruebas
reportes/     Reportes exportados para la entrega
playwright-report/  Reporte HTML generado (no se versiona)
test-results/       Resultados temporales: screenshots, videos, trazas (no se versiona)
```

## Ejecución (PowerShell)

```powershell
npm run test:edge                                   # Todas las pruebas en Edge
npx playwright test --project=edge --workers=1 --reporter=list
npx playwright test tests/example.spec.ts --project=edge   # Un archivo
npx playwright test -g "has title" --project=edge          # Por nombre
npm run test:headed                                 # Edge con navegador visible
npx playwright test --list --project=edge           # Enumerar pruebas sin ejecutar
npm run typecheck                                   # Verificar TypeScript (tsc --noEmit)
```

## Depuración

```powershell
npm run test:debug                                  # Playwright Inspector (paso a paso)
npm run test:ui                                     # Modo UI interactivo
npx playwright test --project=edge --trace on       # Forzar trazas en todas las pruebas
npx playwright show-trace test-results\<carpeta>\trace.zip
npx playwright codegen --channel=msedge https://playwright.dev   # Grabar pasos
```

Dentro de una prueba se puede pausar con `await page.pause();`.

## Tags

Se declaran en el título o con la opción `tag`:

```ts
test('login válido @smoke', async ({ page }) => { /* ... */ });
test('carrito', { tag: ['@regresion', '@critico'] }, async ({ page }) => { /* ... */ });
```

```powershell
npx playwright test --project=edge --grep "@smoke"
npx playwright test --project=edge --grep "@smoke|@critico"     # OR
npx playwright test --project=edge --grep-invert "@lento"       # Excluir
```

## Reportes y evidencias

Configuración en `playwright.config.ts`:

| Opción       | Valor               | Efecto                                         |
|--------------|---------------------|------------------------------------------------|
| `reporter`   | `list` + `html`     | Salida en consola y reporte HTML               |
| `screenshot` | `on`                | Captura al final de cada prueba                |
| `trace`      | `on-first-retry`    | Traza solo en el primer reintento              |
| `video`      | `retain-on-failure` | Video conservado solo si la prueba falla       |

```powershell
npm run report                                      # Abrir el último reporte HTML
npx playwright test --project=edge --reporter=html,list
```

Para entregar evidencias, copie las capturas relevantes de `test-results\` a `evidencias\`
y, si se requiere, el reporte HTML a `reportes\`:

```powershell
Copy-Item -Recurse playwright-report reportes\reporte-html
```

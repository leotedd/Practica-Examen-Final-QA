# Práctica – Examen Final de Aseguramiento de la Calidad del Software

Proyecto de automatización de pruebas E2E con **Playwright + TypeScript** (clases 10, 11 y 12).

---

## Examen Final QA — III Serie

### Objetivo

Diseñar y ejecutar cinco casos de prueba sobre tres historias de usuario (HU-1 Registro,
HU-2 Actualizar perfil, HU-3 Votar por autos): tres automatizados con Playwright + TypeScript
y dos manuales, documentados en una matriz Excel y con reporte de defectos en Word.

**Sitio bajo prueba:** https://buggy.justtestit.org/

**Navegador:** Microsoft Edge (proyecto `edge` de `playwright.config.ts`, `channel: 'msedge'`).

| Caso | HU / criterio | Tipo | Archivo | Resultado (14/11/2026, Edge) |
|---|---|---|---|---|
| CP-01 | HU-1 C4 confirmación de clave distinta | Automatizado | `tests/examen-iii/cp01-confirmacion-clave.spec.ts` | ✅ Aprobado |
| CP-02 | HU-1 C2 clave de 6 caracteres válida | Automatizado | `tests/examen-iii/cp02-registro-clave-seis-caracteres.spec.ts` | ❌ Falla — defecto **DEF-01** |
| CP-03 | HU-3 C4 votar sin sesión | Automatizado | `tests/examen-iii/cp03-votacion-sin-login.spec.ts` | ✅ Aprobado |
| CP-04 | HU-2 C2 nueva clave de 8 caracteres | Manual | `docs/III-serie/INSTRUCCIONES_CASOS_MANUALES.md` | ⏳ En ejecución: el sitio mostró "The profile has been saved successful"; falta verificar el inicio de sesión |
| CP-05 | HU-2 C3 nombre vacío en perfil | Manual | `docs/III-serie/INSTRUCCIONES_CASOS_MANUALES.md` | ⏳ Pendiente |

> **CP-02 falla a propósito mientras exista el defecto DEF-01:** el sitio rechaza una clave de
> 6 caracteres que cumple HU-1 C2 ("Password not long enough"; el mínimo real es 8). El resultado
> esperado no se modificó para hacer pasar la prueba. Por eso `npm run test:examen`,
> `npm run test:edge` y `npm run test:regression` terminan con 1 prueba fallida.

Las pruebas no votan ni publican comentarios. CP-01 y CP-02 crean como máximo un intento de
registro con un login único (`qa_iii_<timestamp>`); no hay credenciales en el código.

### Requisitos e instalación

- Node.js 18+ (verificado con v24.14.1) y Microsoft Edge instalado.
- Instalar dependencias: `npm ci` (no requiere `npx playwright install` para Edge).

### Ejecutar los tres tests automatizados (PowerShell)

```powershell
npm run test:examen        # Los 3 casos en Edge (1 worker) + reporte HTML
npm run test:cp01          # Solo CP-01
npm run test:cp02          # Solo CP-02
npm run test:cp03          # Solo CP-03
# Equivalente sin scripts:
npx playwright test tests/examen-iii --project=edge --workers=1
```

### Reporte HTML

```powershell
npm run report                                               # Último reporte (playwright-report/)
npx playwright show-report reportes/III-serie/playwright-report   # Reporte entregado de la III Serie
```

`playwright-report/` se regenera en cada ejecución y no se versiona; la copia de la ejecución
entregada está en `reportes/III-serie/playwright-report/`.

### Ubicación de los entregables

| Entregable | Ruta |
|---|---|
| Matriz de 5 casos (Excel) | `informe/III-serie/Matriz_Casos_Prueba_III_Serie.xlsx` |
| Reporte de defectos (Word) | `informe/III-serie/Reporte_Defectos_III_Serie.docx` |
| Evidencias automatizadas | `evidencias/III-serie/automatizadas/CP-01…CP-03-*.png` |
| Evidencias manuales | `evidencias/III-serie/manuales/CP-04…CP-05-*.png` |
| Instrucciones casos manuales | `docs/III-serie/INSTRUCCIONES_CASOS_MANUALES.md` |
| Page Objects del sitio | `pages/buggy/` (`RegistroPage`, `OverallRatingPage`, `ModeloPage`) |
| Reporte HTML de la ejecución | `reportes/III-serie/playwright-report/index.html` |

---

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
tests/              Especificaciones de prueba (*.spec.ts)
  smoke/            Pruebas @smoke
  regression/       Pruebas @regression
  sanity/           Pruebas @sanity
  examen-iii/       Casos automatizados CP-01..CP-03 de la III Serie
pages/        Page Objects (POM); pages/buggy/ = sitio Buggy Cars Rating
fixtures/     Fixtures personalizados de Playwright (base.extend)
docs/         Guía rápida del examen y checklist de entrega
evidencias/   Capturas seleccionadas para entregar (se versionan)
informe/      Informe final de pruebas
reportes/     Reportes exportados para la entrega
playwright-report/  Reporte HTML generado (no se versiona)
test-results/       Resultados temporales: screenshots, videos, trazas (no se versiona)
```

## Ejecución (PowerShell)

> Guía completa: [`docs/GUIA_RAPIDA_EXAMEN.md`](docs/GUIA_RAPIDA_EXAMEN.md) ·
> Checklist: [`docs/CHECKLIST_ENTREGA.md`](docs/CHECKLIST_ENTREGA.md)

| Script                      | Acción                                              |
|-----------------------------|-----------------------------------------------------|
| `npm test`                  | Todas las pruebas en Edge (en paralelo)             |
| `npm run test:edge`         | Todas en Edge, 1 worker, consola + reporte HTML     |
| `npm run test:smoke`        | Solo `@smoke`                                       |
| `npm run test:regression`   | Solo `@regression`                                  |
| `npm run test:sanity`       | Solo `@sanity`                                      |
| `npm run test:headed`       | Edge con navegador visible                          |
| `npm run test:debug`        | Playwright Inspector                                |
| `npm run test:trace`        | Fuerza trazas en todas las pruebas                  |
| `npm run test:ui`           | Modo UI                                             |
| `npm run test:list`         | Lista las pruebas sin ejecutarlas                   |
| `npm run codegen`           | Grabador de pasos con Edge                          |
| `npm run typecheck`         | Verifica TypeScript                                 |
| `npm run report`            | Abre el último reporte HTML                         |
| `npm run test:all-browsers` | Los 4 navegadores (**no usar en este equipo**)      |

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

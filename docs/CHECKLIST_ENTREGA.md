# Lista de verificación para la entrega

## Antes de programar
- [ ] Leí el enunciado completo y anoté cada requisito como caso de prueba (CP-01, CP-02, …).
- [ ] Identifiqué el tipo de cada prueba (Smoke / Sanity / Regression) y su etiqueta.
- [ ] Identifiqué qué capturas se piden, en qué momento y con qué nombre.
- [ ] Identifiqué si se exige POM, fixtures, parametrización, `expect.soft` u otra técnica.

## Código
- [ ] Cada archivo termina en `.spec.ts` y está en la carpeta correcta (`tests/smoke|regression|sanity`).
- [ ] Cada prueba tiene un título claro y su etiqueta (`@smoke`, `@regression`, `@sanity`).
- [ ] Cada resultado esperado del enunciado tiene su `expect`.
- [ ] Se usan localizadores robustos (`getByRole`, `getByTestId`, `getByLabel`) antes que CSS/XPath.
- [ ] No quedan `page.pause()` activos, `test.only` ni pruebas comentadas sin motivo.
- [ ] No hay contraseñas, tokens ni datos personales en el código.
- [ ] `npm run typecheck` termina sin errores.

## Ejecución
- [ ] `npm run test:edge` ejecutado; todas las pruebas requeridas aprueban.
- [ ] Si alguna falla, está documentado el motivo (o marcada con `test.fail` si es un defecto conocido).
- [ ] Filtros verificados: `npm run test:smoke`, `npm run test:regression`, `npm run test:sanity`.

## Evidencias
- [ ] Capturas requeridas guardadas en `evidencias/` con nombres descriptivos.
- [ ] Las capturas se tomaron **después** de validar el resultado.
- [ ] Reporte HTML revisado (`npm run report`) y copiado a `reportes/` si se exige.
- [ ] Informe/documentación en `informe/` o `reportes/` (resultados, fallos, observaciones), si se pide.

## GitHub (solo con autorización)
- [ ] `git status` revisado; `git add --dry-run .` no muestra archivos sensibles ni `node_modules`.
- [ ] Commit con mensaje descriptivo, sin coautores externos.
- [ ] `git push` sin `--force`.
- [ ] Archivos visibles en https://github.com/leotedd/Practica-Examen-Final-QA.
- [ ] Enlace del repositorio entregado según lo indicado en el examen.

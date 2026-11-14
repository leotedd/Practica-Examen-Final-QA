# III Serie — Instrucciones para los casos manuales CP-04 y CP-05

> Estos casos **no se han ejecutado**. Requieren que usted los ejecute a mano.
> Al terminar, complete las columnas *Resultado obtenido* y *Estado prueba* en
> `informe/III-serie/Matriz_Casos_Prueba_III_Serie.xlsx` con lo que **realmente** observó.

Navegador: **Microsoft Edge**. Sitio: https://buggy.justtestit.org/

Carpeta de evidencias: `evidencias/III-serie/manuales/`

| Archivo | Qué debe verse |
|---|---|
| `CP-04-cambio-clave-ocho-caracteres.png` | Perfil con la sección *Change Password* llena y el mensaje que aparece después de hacer clic en **Save** |
| `CP-04-verificacion-login.png` | Resultado de intentar iniciar sesión con la clave de 8 caracteres |
| `CP-05-nombre-vacio.png` | Perfil con *First Name* vacío, el mensaje de validación y el botón **Save** |
| `CP-05-verificacion-recarga.png` | Perfil después de recargar (F5), mostrando el valor de *First Name* |

Para capturar: `Win + Shift + S` → *Rectángulo* o *Ventana* → pegue en Paint y
guarde como PNG con el nombre exacto de la tabla. Asegúrese de que se vea la barra
de direcciones (URL) y la fecha y hora de Windows si es posible.

---

## Preparación (una sola vez)

1. Abra Edge y vaya a https://buggy.justtestit.org/register.
2. Registre un usuario propio para la prueba, por ejemplo login `qa_cp_<sus iniciales>_<fecha>`,
   First Name `QA`, Last Name `Manual`.
3. Use una clave **inicial** que el sitio acepte (el sitio exige al menos 8 caracteres;
   ver DEF-01), por ejemplo una de 12 caracteres con mayúscula, minúscula, número y carácter especial.
4. **Anote el login y la clave en papel o en un gestor de contraseñas. No los escriba en
   ningún archivo del repositorio.**
5. Inicie sesión con ese usuario (campos *Login* y contraseña de la barra superior → **Login**).

---

## CP-04 — HU-2 C2: cambio de clave a una de 8 caracteres

**Criterio:** la nueva clave debe tener mínimo **10** caracteres e incluir mayúscula,
minúscula, número y carácter especial.

**Dato de prueba:** nueva clave `Abcd#123` (8 caracteres: mayúscula `A`, minúsculas `bcd`,
carácter especial `#`, números `123`). Cumple todo excepto la longitud mínima de 10.

**Resultado esperado:** el sistema **rechaza** la clave e informa que debe tener al menos
10 caracteres. La clave anterior sigue funcionando.

### Pasos

1. Con la sesión iniciada, haga clic en **Profile** (barra superior).
2. Espere a que cargue el formulario (verá *Basic*, *Additional Info* y *Change Password*).
3. En **Current Password** escriba su clave actual.
4. En **New Pasword** escriba `Abcd#123`.
5. En **Confirm Password** escriba `Abcd#123`.
6. Haga clic en **Save** (abajo a la derecha).
7. Espere el mensaje que aparece debajo del formulario (puede tardar unos segundos).
8. 📸 **Captura 1:** `CP-04-cambio-clave-ocho-caracteres.png` — que se vean los tres campos
   de *Change Password* y el mensaje completo. Copie el texto exacto del mensaje.
9. Haga clic en **Logout**.
10. Intente iniciar sesión con su login y la clave `Abcd#123`.
11. 📸 **Captura 2:** `CP-04-verificacion-login.png` — que se vea si entró o el mensaje de error.
12. Si **no** entró, inicie sesión con su clave anterior para confirmar que sigue vigente.

### Cómo interpretar

- **OK:** en el paso 7 aparece un mensaje de rechazo **y** en el paso 10 la clave `Abcd#123` no permite entrar.
- **FALLO:** en el paso 7 aparece un mensaje de éxito (p. ej. *The profile has been saved successful*)
  **o** en el paso 10 la clave `Abcd#123` sí permite entrar. En ese caso hay un defecto nuevo (DEF-02)
  que debe agregarse al Word con sus capturas. Importante: si la clave cambió, su clave ahora es `Abcd#123`.
- Si el sistema rechaza la clave pero con un mensaje técnico o sin mencionar los 10 caracteres,
  anótelo en *Observaciones*.

---

## CP-05 — HU-2 C3: guardar el perfil con el nombre vacío

**Criterio:** nombre y apellido son obligatorios y no pueden quedar vacíos.

**Resultado esperado:** el sistema **impide** guardar y muestra *First Name is required*;
después de recargar, *First Name* conserva su valor anterior.

### Pasos

1. Con la sesión iniciada, haga clic en **Profile**.
2. Anote el valor actual de **First Name** (p. ej. `QA`).
3. Haga clic dentro de **First Name**, seleccione todo (`Ctrl + A`) y bórrelo (`Supr`).
4. Haga clic en otro campo (por ejemplo **Last Name**) para salir de *First Name*.
5. Observe si aparece el mensaje rojo *First Name is required* y si el botón **Save** queda deshabilitado (gris).
6. Intente hacer clic en **Save**. Espere unos segundos y observe si aparece algún mensaje.
7. 📸 **Captura 1:** `CP-05-nombre-vacio.png` — que se vea *First Name* vacío, el mensaje de
   validación (si lo hay), el botón **Save** y cualquier mensaje mostrado tras el clic.
8. Recargue la página con `F5` y espere a que cargue el perfil.
9. 📸 **Captura 2:** `CP-05-verificacion-recarga.png` — que se vea el valor de *First Name*.

### Cómo interpretar

- **OK:** no se pudo guardar (botón deshabilitado o mensaje de error) **y** tras recargar
  *First Name* tiene el valor anterior.
- **FALLO:** aparece un mensaje de éxito **o** tras recargar *First Name* quedó vacío.
  Registre el defecto en el Word.

---

## Después de ejecutar

1. Verifique que los 4 archivos PNG estén en `evidencias/III-serie/manuales/` con los nombres exactos.
2. Abra `informe/III-serie/Matriz_Casos_Prueba_III_Serie.xlsx` y en las filas CP-04 y CP-05:
   - *Resultado obtenido*: el texto exacto que observó y la fecha.
   - *Estado prueba*: elija `OK` o `FALLO` en la lista.
   - *Observaciones*: cualquier detalle adicional.
3. Si algún caso falló, avíseme para agregar el defecto al reporte de Word con sus capturas.

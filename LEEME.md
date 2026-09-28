# Colombina · Pirámide de Keller — cómo presentarla

**Abrir:** doble clic en `index.html` (Chrome o Edge). Funciona **sin internet**.
Al empezar, presiona **F** para pantalla completa.

## Controles
| Acción | Teclado / clicker | Pantalla táctil |
|---|---|---|
| Avanzar | → · Espacio · PageDown | Deslizar a la izquierda · botón › |
| Retroceder | ← · PageUp | Deslizar a la derecha · botón ‹ |
| Cerrar ficha | → · Esc | ✕ o tocar afuera |
| Índice de escenas | O | botón ▦ |
| Silencio / pantalla completa | M / F | botones 🔊 / ⛶ |

## Escenas (15) y qué se puede tocar
| # | Escena | Interacción |
|---|---|---|
| 01–02 | Portada · Hoja de ruta | — |
| 03 | ¿Por qué “Colombina”? | Botón “Conocer a los personajes” abre la ficha |
| 04 | Línea de tiempo | → avanza año por año; tocar un año (o un punto de abajo) abre su ficha |
| 05 | Cifras clave | — |
| 06 | Portafolio | Tocar un marco lo gira (o → los gira uno por uno) |
| 07 | Arquitectura de marca | → muestra cada forma |
| 08 | El modelo de Keller | → muestra las 4 fases alineadas con su nivel |
| 09–12 | Fases 1 a 4 | La pregunta, la pirámide con su nivel y todas las respuestas en una sola lámina |
| 13 | Pirámide completa | Tocar un bloque abre su justificación |
| 14–15 | Conclusión · Gracias | — |

Todos los textos de la línea de tiempo y de la pirámide se editan en `assets/js/data.js` (las respuestas de cada fase están en `BLOCKS`).

## Imágenes de producto
Guárdalas con fondo transparente (PNG o WEBP) con **exactamente** estos nombres, en cualquiera de estas dos carpetas:
- `assets/img/productos/NOMBRE.png` (tiene prioridad), o
- `assets/img/NOMBRE.webp` (reemplazando la actual)

| Nombre | Dónde aparece |
|---|---|
| `bonbonbum` | Portada, línea de tiempo 1970, portafolio (Confitería), fondo |
| `coffee_delight` | Portada, línea de tiempo 1975–79, fondo |
| `nucita` | Portada, fondo |
| `chocobreak` | Portada, portafolio (Chocolatería), arquitectura, fondo |
| `bridge` | Arquitectura (marca con respaldo), fondo |
| `galletas` | Portafolio (Galletería) — ej. Crakeñas o Splendid |
| `la_constancia` | Portafolio (Salsas y conservas) |
| `helados` | Portafolio (Helados) — ej. Robin Hood o LIS |

Si una imagen no existe, se muestra un ícono en su lugar. Después de agregar imágenes corre
`python recortar_imagenes.py` para quitarles el borde transparente y que queden alineadas.

El guion de cada escena está en `GUION.md`.

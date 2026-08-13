# Barbería Elegance Club — Sitio web de barbería

Soy Gianfranco Jaque y este es un sitio web de barbería que armé como plantilla para mi portafolio. Está hecho con HTML, CSS y JavaScript puro: sin frameworks, sin build tools, sin librerías. Nada más que lo que ves.

El diseño sigue la paleta clásica de barbería: blanco, azul marino y rojo.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript ES6+](https://img.shields.io/badge/JavaScript%20ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Qué incluye

- Cuatro páginas completas: Inicio, Servicios, Galería y Reserva.
- Reservas por WhatsApp: el formulario arma el mensaje solo, usando la API de `wa.me`.
- Galería con filtros por categoría (Cortes, Barbas, Diseños).
- Tarjeta de fidelidad simulada: 9 sellos y el décimo corte es gratis, con confeti al completarla.
- Diseño responsive: en celular el menú se convierte en hamburguesa.
- Animaciones al hacer scroll que respetan la preferencia de "movimiento reducido".
- HTML semántico y accesible (roles ARIA, navegación con teclado).

## Tecnologías

- HTML5
- CSS3 con variables de diseño (design tokens), sin framework
- JavaScript ES6+ puro

## Demo en vivo

**https://demo--barberia.pages.dev/**

Publicado en Cloudflare Pages conectado a este repositorio: cada vez que hago push a `main`, el sitio se actualiza solo.

## Capturas

| Inicio | Servicios |
| --- | --- |
| ![Inicio](screenshots/home.png) | ![Servicios](screenshots/services.png) |

| Galería | Reserva |
| --- | --- |
| ![Galería](screenshots/gallery.png) | ![Reserva](screenshots/booking.png) |

## Cómo usarla

```bash
git clone https://github.com/GianJaque/Demo-Barberia.git
cd Demo-Barberia
```

Abrí `index.html` en tu navegador y listo. Si querés trabajar más cómodo, instalá la extensión Live Server de VS Code y abrí el archivo con "Open with Live Server".

## Cómo adaptarla

La idea es que sirva como base para una barbería real. Los puntos a cambiar:

- **Número de WhatsApp:** en `script.js`, la constante `WHATSAPP_NUMBER` (formato internacional, sin `+` ni espacios).
- **Nombre de la marca:** buscá y reemplazá `Barbería Elegance Club` en los HTML (títulos, links, footer).
- **Mapa:** en `reserva.html`, reemplazá el bloque de mapa por el embed de Google Maps de tu local.
- **Imagen del hero:** reemplazá `assets/placeholders/hero.svg` por tu foto (la referencia está en `styles.css`).
- **Fotos de galería y servicios:** reemplazá `corte.svg`, `barba.svg` y `diseno.svg` por tus fotos, y actualizá el `src` en `galeria.html` y `servicios.html`.
- **Logo y favicon:** reemplazá `assets/placeholders/logo.svg` y `favicon.svg`.
- **Redes sociales:** los `#` que están en el footer de cada página.

## Estructura del proyecto

```
.
├── index.html        # Inicio: hero, beneficios, tarjeta de fidelidad
├── servicios.html    # Servicios y precios
├── galeria.html      # Galería con filtros
├── reserva.html      # Formulario de reserva + info + mapa
├── styles.css        # Sistema de diseño (variables)
├── script.js         # Interactividad (WhatsApp, galería, fidelidad, scroll)
└── assets/           # SVG de ejemplo + carpetas para tus imágenes
```

## Nota sobre los datos

Todo lo que aparece en el repo (teléfono, dirección, mapa y redes) es contenido ficticio de ejemplo, así que se puede publicar sin problema. Antes de ir a producción reemplazalo por tus datos reales. Las fotos reales de clientes se sacaron del repo y se reemplazaron por SVGs locales; sumá tus propias imágenes antes de publicar.

## Licencia

Libre de usar y adaptar, tanto para proyectos personales como comerciales.

# Carpeta de imágenes (assets)

Estructura para mantener el orden de las imágenes del sitio.

```
assets/
└── placeholders/          → SVGs de demostración (reemplazá con tus fotos)
    ├── hero.svg           → imagen de portada del hero
    ├── logo.svg           → logo con tijeras (header, footer, tarjeta de fidelidad)
    ├── corte.svg          → fotos de cortes (galería + servicios)
    ├── barba.svg          → fotos de barba (servicios)
    ├── diseno.svg         → fotos de diseños (galería)
    └── favicon.svg        → ícono de pestaña (referenciado en <link rel="icon"> de cada página)
```

Consejos:
- Nombres en minúscula, sin espacios ni tildes: `fade-taper.jpg`, `barba-perfilada.jpg`.
- Formato recomendado: JPG o WebP, menos de 300 KB por foto, proporción 4:5 para la galería.
- Las fotos reales se quitaron del repositorio por privacidad y se reemplazaron con SVGs de demostración. Para agregar tus imágenes, dejá las fotos en la carpeta correspondiente (por ejemplo `assets/galeria/cortes/`) y actualizá el atributo `src` en `galeria.html` o `servicios.html` (por ejemplo `src="assets/galeria/cortes/mi-foto.jpg"`).
- (Opcional) Si querés fotos en las tarjetas de servicios, creá `assets/servicios/`.

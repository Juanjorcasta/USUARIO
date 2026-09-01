# Portafolio Web Profesional — María, Estudiante de Derecho

Landing page profesional para María, estudiante de Derecho enfocada en Derecho Laboral, Empresarial y
Seguridad Social, construida con HTML5, CSS3, JavaScript vanilla, Bootstrap 5 y Font Awesome.

> **Nota de posicionamiento:** el sitio presenta a María como *estudiante de Derecho en formación*, no
> como abogada titulada. Por eso no incluye servicios de "representación judicial" ni lenguaje que
> implique ejercicio profesional licenciado (ver FAQ "¿Eres abogada titulada?"). Cuando termine su
> formación y obtenga su tarjeta profesional, se puede actualizar la marca a "Abogada" ajustando el
> `lp-brand-tag`, el hero, el footer y reincorporando servicios como representación judicial.

## Estructura del proyecto

```
/Proyecto
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── images/
    │   ├── hero-abogada.svg      (placeholder de foto — sección hero)
    │   └── about-abogada.svg     (placeholder de foto — sección "Sobre mí")
    └── icons/
        └── favicon.svg
```

## Cómo verlo

No requiere instalación ni build. Basta con abrir `index.html` en el navegador,
o servirlo con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

## Personalización

### 1. Datos de María

Ya están completos en `index.html`: nombre (**María Paz García Hernandez**), ciudad
(**Pereira, Colombia**), teléfono/WhatsApp (**+57 301 606 1592**), email
(**gestion.mpgh@gmail.com**), LinkedIn, universidad (**Fundación Universitaria del Área
Andina**), semestre (**Décimo**) e Instagram (**@mpg_gestion_juridica**).

Todavía quedan estos placeholders entre corchetes por completar:

| Placeholder        | Descripción                                   |
|---------------------|-----------------------------------------------|
| `[AÑO]`              | Años de la sección "Trayectoria" (uno por hito, 4 en total) |
| `[INFORMACIÓN]`      | Respuestas de la sección FAQ y recomendaciones/testimonios pendientes |

> Tip: usa "Buscar y reemplazar" de tu editor para ubicar cada placeholder restante en `index.html`.

### 2. Fotografías

Reemplaza los archivos SVG de `assets/images/` por fotografías reales:

- `hero-abogada.svg` → foto principal (sección Hero). Recomendado: retrato vertical, fondo neutro.
- `about-abogada.svg` → foto secundaria (sección "Sobre mí").

Puedes usar `.jpg`, `.png` o `.webp`; solo actualiza el atributo `src` en `index.html` y ajusta el `alt` descriptivo.

### 3. Colores y tipografía

Todo el sistema de diseño está centralizado en las variables CSS al inicio de
`assets/css/style.css` (`:root`), por lo que puedes ajustar la paleta o las
fuentes desde un único lugar sin tocar el resto del archivo.

### 4. Áreas de práctica, servicios, testimonios, FAQ y timeline

Cada sección está compuesta por bloques repetibles (`<article class="lp-card">`,
`<div class="lp-service">`, etc.) que puedes copiar, editar o eliminar
directamente en `index.html`.

### 5. Formulario de contacto

El formulario (`#contactForm`) incluye validación nativa HTML5 + JavaScript
(`assets/js/script.js`). Actualmente simula un envío exitoso en el navegador;
para conectarlo a un backend real (email, CRM, Google Sheets, etc.), reemplaza
la lógica dentro de `initFormValidation()` por tu llamada `fetch()` al servicio
que uses.

### 6. WhatsApp

El botón flotante y los enlaces de contacto usan el formato:

```
https://wa.me/[WHATSAPP]?text=Hola%2C%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20una%20consulta%20jur%C3%ADdica.
```

Solo reemplaza `[WHATSAPP]` por el número real en formato internacional, sin `+`, espacios ni guiones.

## Notas técnicas

- **Bootstrap 5** y **Font Awesome** se cargan vía CDN (jsDelivr / cdnjs). Si necesitas trabajar sin conexión, descarga ambas librerías localmente y actualiza los `<link>`/`<script>` en `index.html`.
- **Google Fonts**: Playfair Display (títulos) + Inter (texto).
- El sitio es responsive (mobile-first) y no presenta scroll horizontal en ningún breakpoint.
- Las animaciones respetan `prefers-reduced-motion`.
- Estructura semántica HTML5 con un único `<h1>`, jerarquía correcta de `<h2>`/`<h3>`, `alt` en todas las imágenes y metaetiquetas SEO/Open Graph listas para editar.

## Aviso legal

Este sitio web tiene fines informativos y no constituye asesoría jurídica.

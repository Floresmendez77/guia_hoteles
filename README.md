# HND LUXE — Guía de Hoteles Honduras

> **Proyecto Educativo** | Módulo: *Diseñando páginas web con Bootstrap*  
> Bootstrap 5 · jQuery · Sass · Less · Node.js · NPM

---

## 📚 Sobre el Módulo

Este proyecto forma parte del módulo **"Diseñando páginas web con Bootstrap"** que cubre tres grandes áreas:

### 1. Herramientas de Desarrollo
- **Editor de código**: VS Code con extensiones Live Sass Compiler, Prettier, ESLint
- **DevTools del navegador**: Inspector de elementos, panel Network, consola JS
- **Control de versiones**: Git + GitHub para gestión del código fuente
- **Estructura de carpetas**: Organización profesional de assets (css/, js/, sass/, less/)

### 2. Preprocesadores CSS

#### Sass (`sass/main.scss`)
```scss
// Variables
$color-primario: #1a3c5e;
$color-secundario: #c9a96e;

// Mixin reutilizable
@mixin btn-estilo($bg: transparent, $color: $color-secundario) {
  font-family: $ff-ui;
  background: $bg;
  color: $color;
  // ...
}

// Nesting BEM
.hotel-card {
  &__img   { /* estilos img */ }
  &__title { /* estilos título */ }
  &__btn   { @include btn-estilo; }
}
```

#### Less (`less/estilos.less`)
```less
// Variables
@azul-navbar: #1a3c5e;
@dorado-estrellas: #c9a96e;

// Mixin con parámetros
.formato-imagen(@alto: 220px; @ajuste: cover) {
  height: @alto;
  object-fit: @ajuste;
}

// Operación matemática
@col-width: (1200px - (30px * 11)) / 12;  // = 72.5px
```

### 3. Gestión con Node.js y NPM

| Script NPM          | Descripción                                      |
|---------------------|--------------------------------------------------|
| `npm start`         | Modo desarrollo completo (watch + servidor live) |
| `npm run build`     | Compilar Sass + Less → CSS minificado            |
| `npm run sass:watch`| Observar cambios en `.scss` en tiempo real       |
| `npm run less:build`| Compilar Less una vez                            |
| `npm run serve`     | Servidor live en `localhost:3000`                |
| `npm run clean`     | Limpiar archivos CSS generados                   |

---

## 🚀 Instalación y Uso

### Requisitos previos
- **Node.js** ≥ 18.0.0 → [nodejs.org](https://nodejs.org)
- **NPM** ≥ 9.0.0 (incluido con Node.js)

### Pasos

```bash
# 1. Clonar / descomprimir el proyecto
cd guia_hoteles

# 2. Instalar dependencias de desarrollo
npm install

# 3. Modo desarrollo (Sass watch + servidor live)
npm start
# → Abre automáticamente http://localhost:3000

# 4. Build para producción (CSS minificado)
npm run build
```

---

## 📁 Estructura del Proyecto

```
guia_hoteles/
├── index.html              # Página principal (HTML5 + Bootstrap 5)
├── package.json            # Config NPM + scripts de compilación
├── .stylelintrc.json       # Reglas de linting para Sass/Less
├── css/
│   ├── styles.css          # 🔄 Generado por Sass (no editar)
│   └── estilos-less.css    # 🔄 Generado por Less (no editar)
├── sass/
│   └── main.scss           # ✏️ Fuente Sass — editar aquí
├── less/
│   └── estilos.less        # ✏️ Fuente Less — editar aquí
├── js/
│   └── app.js              # ✏️ Lógica jQuery + Bootstrap JS
└── docs/
    ├── guia-sass.md        # Referencia rápida de Sass
    ├── guia-less.md        # Referencia rápida de Less
    └── guia-bootstrap.md  # Componentes Bootstrap usados
```

---

## 🎨 Componentes Bootstrap 5 Implementados

| Componente             | Dónde se usa                              | Atributo clave                    |
|------------------------|-------------------------------------------|-----------------------------------|
| **Navbar**             | Barra de navegación fija                  | `navbar-expand-lg`                |
| **Carousel**           | Slider de 3 destinos                      | `data-bs-ride="carousel"`         |
| **Cards**              | Tarjetas de hoteles (inyectadas por jQuery)| `.hotel-card` (BEM custom)        |
| **Modal**              | Reserva 3 pasos + Log de eventos          | `data-bs-toggle="modal"`          |
| **Accordion**          | Pagos (data-bs-parent) + FAQ              | `data-bs-parent="#id"`            |
| **Collapse**           | Info extra individual + multi-target      | `data-bs-target=".multi-collapse"`|
| **Tooltip**            | Planes Essential y Ultra Luxe             | `data-bs-toggle="tooltip"`        |
| **Popover**            | Plan Executive Plus (más popular)         | `data-bs-toggle="popover"`        |
| **Toast**              | Confirmación de formulario                | `bootstrap.Toast`                 |
| **Nav Tabs**           | Galería por destino (3 tabs)              | `data-bs-toggle="tab"`            |
| **Nav Pills**          | Galería por experiencia (4 pills)         | `data-bs-toggle="pill"`           |
| **Grid System**        | Layouts responsive en todas las secciones | `col-lg-* col-md-*`               |

---

## 🎓 Conceptos CSS Demostrados

### Variables Sass vs CSS Nativas
```scss
// Sass — tiempo de compilación
$color-primario: #1a3c5e;

// CSS Nativo — tiempo de ejecución (en :root)
--azul: #1a3c5e;
```

### Mixins con Argumentos
```scss
@mixin sombra-suave($color: rgba(0,0,0,.12), $y: 8px, $blur: 40px) {
  box-shadow: 0 #{$y} #{$blur} $color;
}
// Uso:
.hotel-card { @include sombra-suave(rgba(26,60,94,.1), 8px, 40px); }
```

### Operaciones Matemáticas Less
```less
@container-max: 1200px;
@grid-columns: 12;
@grid-gutter: 30px;

// Cálculo automático del ancho de columna
@col-width: (@container-max - (@grid-gutter * (@grid-columns - 1))) / @grid-columns;
// Resultado: (1200 - 330) / 12 = 72.5px
```

---

## 📖 Recursos de Aprendizaje

- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [Sass Reference](https://sass-lang.com/documentation/)
- [Less Reference](https://lesscss.org/features/)
- [Node.js Getting Started](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [NPM Scripts Guide](https://docs.npmjs.com/cli/v10/using-npm/scripts)

---

*HND LUXE Collection © 2026 — Honduras Luxury Hotels*

# Cómo publicar contenido en tr3ceh-web

Todo el contenido es Markdown. No hay CMS, no hay panel de administración.
Crear un post = crear un archivo `.md` en la carpeta correcta.

---

## Estructura de contenido

```
src/content/
├── blog/           → Posts del blog (cualquier tema)
│   └── _plantilla.md
├── proyectos/      → Portfolio de proyectos técnicos
│   └── _plantilla.md
└── guias/          → Guías prácticas para empresas
    └── _plantilla.md
```

---

## Flujo para publicar (3 pasos)

### 1. Copia la plantilla correcta

```bash
# Blog
cp src/content/blog/_plantilla.md src/content/blog/nombre-del-post.md

# Proyecto
cp src/content/proyectos/_plantilla.md src/content/proyectos/nombre-proyecto.md

# Guía para empresas
cp src/content/guias/_plantilla.md src/content/guias/nombre-guia.md
```

### 2. Edita el frontmatter y escribe el contenido

Abre el archivo y rellena los campos del encabezado (entre `---`).
Luego escribe el cuerpo en Markdown normal.

### 3. El dev server se actualiza solo

Si tienes `npm run dev` corriendo, los cambios aparecen en el navegador sin hacer nada más.
Para publicar en el VPS: sube los archivos y haz `npm run build`.

---

## Referencia rápida de campos

### Blog — `src/content/blog/`

| Campo | Obligatorio | Ejemplo |
|---|---|---|
| `title` | Sí | `"Cómo automaticé mi flujo con n8n"` |
| `description` | Sí | `"Paso a paso de mi setup de automatización"` |
| `date` | Sí | `2026-04-20` |
| `tags` | No | `["ia", "n8n", "automatizacion"]` |
| `image` | No | `"/images/blog/nombre.jpg"` |

**URL generada:** `/blog/nombre-del-archivo`

---

### Proyectos — `src/content/proyectos/`

| Campo | Obligatorio | Ejemplo |
|---|---|---|
| `title` | Sí | `"Agente IA para clasificar emails"` |
| `description` | Sí | `"Automatización de bandeja de entrada con Claude"` |
| `date` | Sí | `2026-04-20` |
| `category` | Sí | `lab` / `herramientas` / `writeups` / `research` / `ia` |
| `tags` | No | `["python", "claude", "automatizacion"]` |
| `image` | No | `"/images/projects/nombre.jpg"` |

**URL generada:** `/proyectos/nombre-del-archivo`

---

### Guías para empresas — `src/content/guias/`

| Campo | Obligatorio | Ejemplo |
|---|---|---|
| `title` | Sí | `"Cómo usar IA sin filtrar datos"` |
| `description` | Sí | `"Guía práctica para adoptar IA de forma segura"` |
| `date` | Sí | `2026-04-20` |
| `category` | Sí | `seguridad` / `ia` / `infraestructura` |
| `difficulty` | Sí | `basico` / `intermedio` / `avanzado` |
| `featured` | No | `true` / `false` |
| `tags` | No | `["ia", "pymes", "privacidad"]` |

**URL generada:** `/empresas/guias/nombre-del-archivo`

---

## Tags recomendados por temática

```
IA / Automatización:
  ia, automatizacion, agentes, llm, n8n, claude, openai, langchain,
  python, api, workflow, productividad

Seguridad:
  pentesting, seguridad, ofensiva, osint, burpsuite, nmap, cve,
  writeup, ctf, hardening, linux, vpn, wireguard

Infraestructura / Homelab:
  homelab, docker, vps, nginx, ssh, ubuntu, raspberry-pi,
  self-hosted, nextcloud, wireguard, backup

Empresas / Negocio:
  pymes, empresas, productividad, ahorro, privacidad, rgpd,
  politica, formacion, coste
```

---

## Imágenes

Las imágenes van en la carpeta `public/`:

```
public/
└── images/
    ├── blog/          → Imágenes de posts
    └── projects/      → Imágenes de proyectos
```

Tamaño recomendado: **1200×630px** (formato 16:9 para OG y tarjetas).

---

## Comandos útiles

```bash
# Servidor de desarrollo (hot reload automático)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## Convenciones de nombres de archivo

- Solo minúsculas, guiones, sin acentos ni espacios
- Descriptivo y corto (el nombre = la URL)
- Ejemplos correctos:
  - `como-automatice-mi-negocio-con-ia.md`
  - `agente-clasificador-emails.md`
  - `wireguard-vpn-pymes.md`
- Ejemplos incorrectos:
  - `Post 1.md` ❌
  - `mi_proyecto_2026.md` ❌
  - `Guía IA empresas.md` ❌

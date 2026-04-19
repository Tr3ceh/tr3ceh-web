---
# PLANTILLA DE POST DE BLOG
# ─────────────────────────────────────────────
# Copia este archivo, renómbralo con un slug descriptivo en minúsculas-con-guiones.
# Ejemplo: como-use-claude-para-automatizar-mi-negocio.md
#
# REGLAS DEL NOMBRE DE ARCHIVO:
#   - Solo letras minúsculas, números y guiones
#   - Sin acentos ni espacios
#   - El nombre = la URL: /blog/nombre-del-archivo

title: "Título del post aquí"
description: "Una frase que resuma de qué va el post. Aparece en la tarjeta del blog y en SEO. Máximo 160 caracteres."
date: 2026-04-18

# TAGS: palabras clave separadas por comas, en minúsculas
# Opciones habituales: ia, automatizacion, pentesting, seguridad, homelab,
#   n8n, python, linux, docker, agentes, llm, openai, claude, writeup
tags: ["ia", "automatizacion"]

# IMAGE (opcional): ruta a /public/images/blog/nombre.jpg
# Si no tienes imagen, borra esta línea o déjala comentada
# image: "/images/blog/nombre-del-post.jpg"
---

## Introducción

Explica en 2-3 párrafos qué vas a contar y por qué importa. No hace falta drama, solo honestidad sobre lo que aprendiste o construiste.

---

## El problema / contexto

Describe el punto de partida. ¿Qué situación te llevó a esto? ¿Qué intentabas resolver?

---

## Cómo lo hice / Qué aprendí

Aquí va el grueso del contenido. Usa `##` para secciones y `###` para subsecciones.

### Paso 1 — Nombre del paso

Explica el paso. Puedes incluir código:

```bash
# Ejemplo de comando
echo "hola mundo"
```

```python
# Ejemplo Python
print("Esto funciona")
```

### Paso 2 — Nombre del paso

Continúa...

---

## Resultado

¿Qué conseguiste al final? ¿Funciona? ¿Qué mejorarías?

---

## Conclusiones

3-5 puntos clave que el lector puede llevarse. Lo concreto manda.

- Lo que funcionó
- Lo que no funcionó (esto es lo más valioso)
- Qué harías diferente

---

## Referencias / Recursos

- [Nombre del recurso](https://url-aqui.com)
- Herramienta usada: n8n, Claude, Python, etc.

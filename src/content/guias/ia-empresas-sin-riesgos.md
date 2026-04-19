---
title: "Cómo usar IA en tu empresa sin filtrar datos sensibles"
description: "Guía práctica para adoptar herramientas de IA (ChatGPT, Copilot, Claude) de forma segura, evitando exponer información confidencial de clientes, empleados o procesos internos."
date: 2026-04-18
category: ia
difficulty: basico
featured: true
tags: [ia, chatgpt, privacidad, politica-empresarial, shadow-ai]
---

## El problema real

El 70% de los empleados que usan IA en el trabajo lo hacen sin que la empresa lo sepa ni lo autorice — esto se llama **Shadow AI**. El riesgo no es que la IA sea maliciosa, sino que los datos que introduces en estos sistemas pueden:

- Usarse para entrenar modelos futuros (dependiendo del proveedor)
- Quedar expuestos ante vulnerabilidades del servicio
- Violar regulaciones como el **RGPD** si contienen datos de clientes

Esta guía te da un marco práctico para usar IA de forma productiva y segura.

---

## Qué datos NUNCA debes introducir en una IA pública

Antes de cualquier política, define claramente qué está prohibido:

- Datos personales de clientes (nombre, DNI, email, teléfono)
- Credenciales o contraseñas
- Información financiera interna
- Contratos y acuerdos de confidencialidad
- Código fuente propietario
- Estrategia empresarial no pública

> **Regla de oro:** Si no lo publicarías en tu web, no lo metas en ChatGPT.

---

## Opciones según tu nivel de riesgo

### Nivel 1 — Uso casual controlado (bajo riesgo)

Para tareas como redactar emails, resumir documentos genéricos o generar ideas:

- **Activa el modo sin historial** en ChatGPT: `Ajustes → Controles de datos → Mejorar el modelo para todos`
- Usa versiones de pago con políticas empresariales más estrictas (ChatGPT Teams, Claude for Work)
- Establece una lista de casos de uso permitidos

### Nivel 2 — Uso habitual con datos de trabajo (riesgo medio)

- Contrata la versión **Enterprise** de la herramienta que uses (OpenAI, Anthropic, Microsoft)
- En las versiones Enterprise, los datos **no se usan para entrenar modelos**
- Firma un **DPA (Data Processing Agreement)** con el proveedor
- Microsoft 365 Copilot es una buena opción si ya usas el ecosistema Microsoft

### Nivel 3 — Datos sensibles o regulados (alto riesgo)

- Despliega un modelo **on-premise** o en tu propia infraestructura cloud:
  - **Ollama** con modelos como Llama 3 o Mistral (completamente local)
  - **LM Studio** para equipos técnicos
  - **Azure OpenAI** o **AWS Bedrock** con tu propio tenant aislado
- Los datos nunca salen de tu infraestructura

---

## Política mínima que toda empresa debería tener

Un documento de una página es suficiente para empezar. Incluye:

```
POLÍTICA DE USO DE IA — [NOMBRE EMPRESA]

1. HERRAMIENTAS AUTORIZADAS
   - [Lista las herramientas permitidas]

2. DATOS PROHIBIDOS
   - Datos personales de clientes o empleados
   - Información financiera interna
   - Contraseñas o credenciales

3. CASOS DE USO PERMITIDOS
   - Redacción y revisión de textos genéricos
   - Resúmenes de documentos sin datos personales
   - Generación de ideas y brainstorming

4. RESPONSABILIDAD
   - El empleado es responsable del contenido que introduce
   - Cualquier incidente debe reportarse a [contacto]
```

---

## Formación mínima para empleados

No necesitas un curso largo. Tres conceptos son suficientes:

1. **La IA no es una caja negra segura** — lo que introduces puede ser visto por el proveedor
2. **Anonimiza antes de pegar** — cambia nombres, fechas y referencias identificables
3. **Verifica siempre el output** — la IA confabula: datos incorrectos presentados con confianza

---

## Herramientas recomendadas por caso de uso

| Caso de uso | Herramienta | Coste |
|---|---|---|
| Redacción y emails | ChatGPT Free (sin historial) | Gratis |
| Código interno | GitHub Copilot Business | ~19€/mes |
| Documentos sensibles | Ollama (local) | Gratis |
| Suite completa empresa | Microsoft 365 Copilot | ~27€/usuario/mes |
| Análisis de datos | Claude for Work | ~25€/usuario/mes |

---

## Próximo paso

Si quieres implementar un modelo de IA totalmente local para tu empresa, consulta la guía: **Desplegar Ollama en servidor propio para uso empresarial**.

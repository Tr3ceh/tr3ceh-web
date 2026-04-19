import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional()
  })
});

const proyectos = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional()
  })
});

const guias = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['seguridad', 'ia', 'infraestructura']),
    difficulty: z.enum(['basico', 'intermedio', 'avanzado']),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
  })
});

export const collections = {
  blog,
  proyectos,
  guias,
};

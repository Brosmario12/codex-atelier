# Codex Atelier

Primera pagina web creada en el nuevo entorno WSL. Es una landing/app de produccion web con Vite, React, Supabase opcional y deploy listo para Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Supabase

1. Crea un proyecto en Supabase.
2. Copia `.env.example` a `.env.local`.
3. Llena `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. Ejecuta la migracion:

```bash
supabase login
supabase link --project-ref TU_PROJECT_REF
supabase db push
```

La migracion crea `public.launch_requests` para guardar los briefs del formulario.

## GitHub y Vercel

Cuando GitHub CLI y Vercel CLI tengan sesion iniciada:

```bash
gh auth login
gh repo create codex-atelier --public --source=. --remote=origin --push

vercel login
vercel --prod
```

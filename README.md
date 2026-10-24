# Invitación de Revelación de Género 🧸💙💗

Proyecto en **React + TypeScript + Vite + Tailwind CSS** con soporte para base de datos **NeonDB (Serverless Postgres)** y despliegue gratuito en **Vercel** o **Netlify**.

---

## 🚀 Despliegue en 3 pasos con NeonDB y Vercel

### Paso 1: Crear la Base de Datos en Neon
1. Regístrate gratis en [neon.tech](https://neon.tech) y crea un nuevo proyecto.
2. Ve a la pestaña **SQL Editor** en la consola de Neon.
3. Abre el archivo [`database/neondb_schema.sql`](./database/neondb_schema.sql), copia todo su contenido, pégalo en el editor y haz clic en **Run**.
4. En el Dashboard de Neon, copia tu cadena de conexión (**Connection String** / `DATABASE_URL`).

### Paso 2: Configurar Variables de Entorno
Crea tu archivo `.env` local (o en la configuración de Vercel/Netlify):
```env
DATABASE_URL=postgresql://usuario:password@ep-ejemplo.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Paso 3: Publicar
- **Vía Vercel:** Sube el proyecto a GitHub y conéctalo en [vercel.com](https://vercel.com) (o ejecuta `npx vercel`).
- En **Settings -> Environment Variables** de tu proyecto en Vercel, agrega la variable `DATABASE_URL`.
- ¡Listo! Las funciones serverless (`/api/rsvp` y `/api/vote`) se conectarán directamente con NeonDB.

> **Nota de Respaldo:** Si la base de datos aún no está configurada o se navega sin conexión, la aplicación recurre automáticamente a `localStorage` para que nunca falle la experiencia del usuario.

---

## 🧸 Arquitectura y Componentes Reciclables (`src/components/ui/`)

- `BearMascot`: Ilustración SVG de ositos con variantes `'boy'`, `'girl'`, `'couple'`, `'mini'`.
- `Button`: Botones accesibles con variantes `'blue'`, `'pink'`, `'split'`, `'outline'`, `'whatsapp'`.
- `Card`: Tarjetas con estética pastel y bordes cálidos.
- `Badge`: Píldoras para fechas, horas y estados.
- `InputField` / `TextAreaField`: Formulario accesible.
- `SectionContainer` / `SectionHeader` / `CloudDivider`: Estructura visual unificada.

## 🛠️ Personalización del Evento
Edita únicamente [`src/config/event.config.ts`](./src/config/event.config.ts) para cambiar nombres de papás, fecha, ubicación, link a Google Maps y número de WhatsApp.

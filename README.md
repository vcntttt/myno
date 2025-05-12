# Myno

## Descripción

**Myno** es un ecommerce B2B desarrollado con **Next.js 15** que vende packs mayoristas a minimarkets y tiendas de barrio.  
Su diferencial es un **motor de recomendación** que:

- Personaliza la portada (“Porque compraste X”, “Otros usuarios también compraron”, “Productos más vendidos”).
- Sugiere artículos relacionados en la vista de producto y dentro del carrito.
- Aprende de cada compra y actualiza el ranking global en tiempo real.

Los datos persistentes (historial de compras + contador de ventas) se almacenan en **Upstash Redis KV**; el resto vive como JSON estático o en LocalStorage.

---

## Funcionalidades principales

| Módulo                     | ¿Qué hace?                                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Carrito**                | CRUD completo (añadir, actualizar cantidad, eliminar, vaciar) con persistencia local.                    |
| **Recomendaciones**        | Algoritmo por _tags_ + co-compra + popularidad global; secciones dinámicas en Home, Product Page y Cart. |
| **Historial de compras**   | Consulta, filtrado por fecha/estado, modal de detalle y eliminación de órdenes (Redis).                  |
| **Autenticación simulada** | Login por correo (sin contraseña), sesión guardada en LocalStorage, rutas protegidas.                    |
| **Búsqueda filtrada**      | Filtros por categoría y ordenamiento con skeletons de carga.                                             |

---

## Tecnologías

| Capa              | Stack                                                                         |
| ----------------- | ----------------------------------------------------------------------------- |
| Frontend          | **Next.js 15** (App Router) · **React 18** · **TypeScript**                   |
| Estado            | **TanStack Query** (datos remotos) · **Zustand** (estado global/localStorage) |
| Estilos           | **Tailwind CSS** + Shadcn/ui                                                  |
| Backend ligero    | **Upstash Redis KV** (historiales & sales count)                              |
| Bundler / runtime | **Bun**                                                                       |

---

## Instalación y ejecución

1. Clona este repositorio:
   ```bash
   git clone https://github.com/vcntttt/myno.git
   ```
2. Entra en la carpeta del proyecto e instala las dependencias:
   ```bash
   cd myno
   bun install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   bun run dev
   ```
4. Abre tu navegador en `http://localhost:3000` para ver la aplicación.

## Usuarios de prueba

Para facilitar la demostración del motor de recomendaciones y el historial, tenemos dos usuarios preconfigurados con datos semilla en Redis:

- **vrivera.dev@gmail.com**  
  Historial orientado a perfumes y licores (Givenchy, Dior Sauvage, Vino Tinto, etc.).

- **vrivera2023@alu.uct.cl**  
  Historial centrado en frutas y verduras (manzanas, peras, plátanos, lechugas, etc.).

Inicia sesión con cualquiera de estos correos para ver cómo cambia la portada y el historial.

## Enlaces

- **Repositorio:** https://github.com/vcntttt/myno
- **Demo en Vercel:** https://myno-vr.vercel.app/

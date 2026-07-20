# Sneakers' Spa

Landing page estatica para Sneakers' Spa, preparada para desplegarse en GitHub Pages con Vite, React y TypeScript.

## Stack

- Vite + React + TypeScript
- ESLint
- Vitest + Testing Library
- GitHub Actions para deploy en GitHub Pages
- Base preparada para Google Analytics 4

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- Una cuenta de GitHub. Si vas a publicar el sitio, debe ser la misma cuenta donde crearas el repositorio.

## Levantar la pagina en local

1. Abre una terminal en la carpeta del proyecto.
2. Instala dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre la URL que muestra Vite, normalmente `http://localhost:5173`.

## Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run test:run
npm run test:coverage
npm run optimize:images
```

## Variables de entorno

Duplica `.env.example` como `.env` si quieres configurar variables locales.

```bash
cp .env.example .env
```

Variables disponibles:

- `VITE_BASE_PATH`: subruta del repositorio para GitHub Pages. Ejemplo: `/sneakersspa/`
- `VITE_GA_MEASUREMENT_ID`: ID de Google Analytics 4. Ejemplo: `G-XXXXXXXXXX`

Si `VITE_GA_MEASUREMENT_ID` esta vacio, la pagina funciona igual y no envia eventos.

## Como correr el set de tests

Para ejecutar todos los tests una vez:

```bash
npm run test:run
```

Para dejar Vitest en modo interactivo:

```bash
npm run test
```

Para generar cobertura:

```bash
npm run test:coverage
```

## Como optimizar las imagenes

El proyecto incluye un script reproducible para convertir los PNG del directorio `img` a WebP:

```bash
npm run optimize:images
```

Ese script conserva los archivos originales y genera versiones `.webp` listas para produccion.

## Manual para crear el repositorio en tu misma cuenta de GitHub

### Opcion A: crear el repositorio desde GitHub web

1. Inicia sesion con la misma cuenta de GitHub que quieres usar para publicar.
2. Crea un repositorio nuevo, por ejemplo `sneakersspa`.
3. No necesitas agregar README ni `.gitignore` desde GitHub si ya usaras este proyecto actual.
4. Copia la URL del repositorio, por ejemplo:

```bash
https://github.com/TU-USUARIO/sneakersspa.git
```

5. En la carpeta del proyecto, conecta el remoto y sube el codigo:

```bash
git init
git add .
git commit -m "Initial Sneakers' Spa site"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sneakersspa.git
git push -u origin main
```

### Opcion B: si ya tienes un repo creado con tu cuenta

Solo conecta el remoto:

```bash
git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git
git branch -M main
git push -u origin main
```

Si ya existe un remoto configurado y quieres reemplazarlo:

```bash
git remote set-url origin https://github.com/TU-USUARIO/NOMBRE-REPO.git
git push -u origin main
```

## Como publicar en GitHub Pages

1. Sube el proyecto al repositorio de tu misma cuenta.
2. En GitHub, entra al repositorio.
3. Ve a `Settings` > `Pages`.
4. En `Build and deployment`, selecciona `GitHub Actions`.
5. El workflow de [.github/workflows/deploy.yml](.github/workflows/deploy.yml) hara el resto en cada push a `main`.

El workflow ya incluye:

- instalacion de dependencias
- lint
- tests
- build
- publicacion en GitHub Pages

## Como activar Google Analytics 4

1. Crea una propiedad web en GA4.
2. Copia tu `Measurement ID`, por ejemplo `G-XXXXXXXXXX`.
3. Agrega la variable en tu entorno local:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. En GitHub, abre el repositorio y ve a `Settings > Secrets and variables > Actions`.
5. Crea una variable de repositorio llamada `VITE_GA_MEASUREMENT_ID` con tu valor real.
6. El workflow ya esta preparado para tomar esa variable automaticamente en el build de GitHub Pages.

## Estructura principal

- [src/App.tsx](src/App.tsx): landing principal
- [src/lib/analytics.ts](src/lib/analytics.ts): helper de eventos GA4
- [vite.config.ts](vite.config.ts): base path y configuracion de tests
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml): pipeline de Pages
- [brand-tokens.txt](brand-tokens.txt): guia visual entregada
- [content-brief.md](content-brief.md): brief de contenidos entregado

## Estado actual

El proyecto ya tiene una primera version funcional del sitio, tests base del frontend, optimizacion reproducible de imagenes y despliegue listo para GitHub Pages.

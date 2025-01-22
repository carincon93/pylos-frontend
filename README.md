# Proyecto Pylos - Frontend

Este proyecto es una aplicación desarrollada con [Next.js](https://nextjs.org/) . A continuación, se detallan las instrucciones para clonar, configurar y ejecutar el proyecto en un entorno de desarrollo local.

---

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu máquina:

-   [Node.js](https://nodejs.org/) (versión mínima recomendada: `v20.14.0`)
-   [Git](https://git-scm.com/)
-   Un editor de texto o IDE como [Visual Studio Code](https://code.visualstudio.com/)

---

## **Instrucciones para ejecutar el proyecto**

### **1. Clonar el repositorio**

Utiliza Git para clonar el repositorio en tu máquina local. En la terminal, ejecuta:

```bash
git clone https://github.com/carincon93/pylos-frontend.git

cd [nombre-del-directorio]

npm install
```

Localiza el archivo .env.local.example que se encuentra en la raíz del proyecto.

Crea un archivo .env.local basado en .env.local.example. Importante: Asegúrate de configurar las variables que contiene el archivo correctamente. (Varias de ellas dependen de la configuración del backend)

```bash
cp .env.local.example .env.local
```

Ejecuta el servidor en modo de desarrollo con el comando:

```bash
npm run dev
```

Abre tu navegador y accede a la aplicación en:

```bash
http://localhost:3000
```

Finalmente, no olvides revisar el archivo package.json para conocer todos los paquetes utilizados en el proyecto.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

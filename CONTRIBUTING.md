# 🤝 Guía de Contribución a FolderOrganizer

¡Primero que nada, gracias por interesarte en mejorar **FolderOrganizer**! Este es un proyecto de código abierto y toda ayuda (corrección de errores, optimizaciones, traducción de idiomas o nuevas funciones) es súper bienvenida.

Para mantener el proyecto ordenado, seguro y fácil de mantener, te pedimos que sigas estas pautas.

---

## 📋 Índice
1. [¿Cómo puedo contribuir?](#-cómo-puedo-contribuir)
2. [Configuración del Entorno de Desarrollo](#-configuración-del-entorno-de-desarrollo)
3. [Flujo de Trabajo (Git Workflow)](#-flujo-de-trabajo-git-workflow)
4. [Estilo de Código](#-estilo-de-Código)

---

## 💡 ¿Cómo puedo contribuir?

### 🐛 Reportar un Error (Bug)
Si encuentras algo que no funciona correctamente:
1. Revisa la sección de **Issues** en GitHub para asegurarte de que nadie lo haya reportado antes.
2. Si es un error nuevo, abre un nuevo *Issue* utilizando una descripción clara, los pasos para reproducir el fallo y, si es posible, capturas de pantalla o el mensaje de error de la consola.

### ✨ Sugerir una Característica o Mejora
¿Tienes una idea para hacer FolderOrganizer aún más productivo?
* Abre un *Issue* explicando qué te gustaría agregar, por qué crees que sería útil para los usuarios y cómo imaginas que debería funcionar.

### 🛠️ Enviar una Corrección o Función (Pull Request)
Si ya programaste la solución a un problema o agregaste una función:
* Sigue los pasos de la sección [Flujo de Trabajo](#-flujo-de-trabajo-git-workflow) para enviarnos tus cambios a través de un *Pull Request (PR)*.

---

## 💻 Configuración del Entorno de Desarrollo

Para trabajar en el código de FolderOrganizer, asegúrate de tener instalado en tu computadora:
* **Node.js** (Versión LTS recomendada)
* **Inno Setup 6** (Únicamente si deseas compilar y probar el instalador ejecutable `.exe` de Windows)

### Pasos para iniciar localmente:

1. Realiza un **Fork** de este repositorio en tu cuenta de GitHub.
2. Clona tu repositorio clonado localmente:
   ```bash
   git clone https://github.com
   cd FolderOrganizer
   ```
3. Instala todas las dependencias del proyecto (incluyendo las de desarrollo):
   ```bash
   pnpm install
   ```
4. Para probar el script interactivamente mientras programas:
   ```bash
   node index.js
   ```

---

## 🔄 Flujo de Trabajo (Git Workflow)

Para mantener el historial limpio, por favor sigue estos pasos al enviar código:

1. **Crea una rama específica** para tu trabajo a partir de la rama principal (`main`). Usa nombres claros:
   ```bash
   git checkout -b fix/error-en-extensiones
   # o para nuevas funciones
   git checkout -b feature/agregar-idioma
   ```
2. Realiza tus cambios en el código. Haz *commits* organizados y con mensajes descriptivos.
3. Asegúrate de que el formateador de código no detecte errores (ver sección siguiente).
4. Sube tu rama a tu repositorio de GitHub:
   ```bash
   git push origin nombre-de-tu-rama
   ```
5. Ve al repositorio original de FolderOrganizer y abre un **Pull Request**. Describe detalladamente qué problema resuelve tu código o qué mejoras introduce.

---

## 🎨 Estilo de Código

Este proyecto utiliza **ESLint** para garantizar que el código mantenga un estándar limpio, legible y libre de errores sintácticos comunes. 

Antes de realizar tus *commits* o enviar tu Pull Request, es **obligatorio** verificar que tu código cumpla con las reglas del linter ejecutanado:

```bash
pnpm run lint
```

Si el comando muestra errores, corrígelos antes de subir tus cambios. Muchos editores como *VS Code* con la extensión de ESLint te ayudarán a corregirlos automáticamente mientras escribes.

---

### 🚀 ¡Gracias por hacer de FolderOrganizer una mejor herramienta para todos!


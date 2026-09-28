<h1 align="center">
  <img src="./assets/icon.ico" width="35" stroke="10">
  Folder Organizer
  <img src="./assets/icon.ico" width="35">
</h1>

<p align="center">
  <b>Aplicación de escritorio automatizada para organizar tus archivos por extensión, moviéndolos al instante desde el directorio raíz hacia carpetas clasificadas.</b>
</p>

<p align="center">
  <a href="https://github.com">
    <img src="https://img.shields.io/github/package-json/v/FrEaKAlL/FolderOrganizer?color=299de3" alt="GitHub package.json version">
  </a>
  <a href="https://opensource.org">
    <img src="https://img.shields.io/github/license/FrEaKAlL/FolderOrganizer" alt="License: MIT">
  </a>
</p>

---

## 📋 Índice

1. [Planteamiento del Problema](#-planteamiento-del-problema)
2. [Guía de Instalación y Uso](#-guía-de-instalación-y-uso)
    - 2.1. [Selección de idioma](#-selección-de-idioma)
    - 2.2. [Configuración por defecto](#-configuración-por-defecto)
    - 2.3. [Configuración personalizada](#-configuración-personalizada)
    - 2.4. [Creación de servicio de Windows (Recomendado)](#-creación-de-servicio-de-windows)
    - 2.5. [Ejecución manual](#-ejecución-manual-del-aplicativo)
    - 2.6. [Modificar o usar configuración previa](#-configuración-previa)
3. [Generar el Instalador (Desarrolladores)](#-generar-el-instalador)
4. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
5. [💖 Apoya al Proyecto (Sponsors)](#-apoya-al-proyecto-sponsors)

---

## 🧠 Planteamiento del Problema

Cuando descargamos contenido de internet, chats o correos electrónicos, todos los elementos suelen acumularse en una única carpeta raíz (como *Descargas*). Con el tiempo, se vuelve una tarea lenta y tediosa identificar los archivos en uso o realizar un seguimiento correcto de la información.

**FolderOrganizer** resuelve esto automatizando por completo la clasificación de archivos. A través de un servicio en segundo plano o de una ejecución manual rápida, el sistema detecta de forma inmediata los nuevos elementos y los mueve ordenadamente a su respectiva subcarpeta según su extensión o nombre.

---

## 🚀 Guía de Instalación y Uso

Realizar la instalación es muy sencillo:

1. Ve a la sección de lanzamientos y descarga el instalador oficial [FolderOrganizer_Installer.exe](https://github.com/download/FolderOrganizer_Installer.exe).
2. Haz doble clic sobre el archivo descargado para iniciar el asistente guiado (Wizard).

<p align="center">
  <img src="./assets/instalacion-1.png" alt="Asistente de instalación" width="550">
</p>

Una vez concluida la instalación, el aplicativo no arranca por sí solo. Debes buscarlo dentro de tu menú de inicio de Windows.

> [!NOTE]
> **Permisos de Administrador:** El aplicativo requiere ejecutarse con privilegios de administrador para poder dar de alta o gestionar el servicio del sistema si decides utilizarlo.

<p align="center">
  <img src="./assets/instalacion-2.png" alt="Buscar aplicación en menú inicio" width="400">
</p>

Al ejecutar el programa, acepta la solicitud de elevación de privilegios de Windows para desplegar la consola interactiva:

<p align="center">
  <img src="./assets/instalacion-3.png" alt="Consola inicial de Folder Organizer" width="600">
</p>

### 🗣️ Selección de idioma
Selecciona tu idioma de preferencia para realizar toda la configuración de la carpeta que vas a organizar.

<p align="center">
  <img src="./assets/instalacion-4.png" alt="Selección de idioma" width="600">
</p>

El sistema te permitirá elegir entre una estructura de organización predefinida (**Por defecto**) o una totalmente adaptada a ti (**Personalizada**).

<p align="center">
  <img src="./assets/instalacion-5.png" alt="Selección de tipo de estructura" width="600">
</p>

### 📁 Configuración por defecto
Si eliges la opción por defecto, el asistente te mostrará el listado de carpetas estándar que se generarán junto con las extensiones de archivo que el proceso tomará en cuenta automáticamente.

<p align="center">
  <img src="./assets/instalacion-6.png" alt="Estructura por defecto" width="600">
</p>

### ⚙️ Configuración personalizada
Si prefieres un control total, la opción personalizada te guiará a través de una serie de preguntas dinámicas para especificar exactamente qué carpetas y qué extensiones deseas incluir en el flujo de organización.

<p align="center">
  <img src="./assets/instalacion-7.png" alt="Configuración personalizada" width="600">
</p>

Al finalizar cualquiera de los dos flujos, el sistema te pedirá confirmar si los datos mostrados son correctos para proceder a salvar tu archivo de configuración de forma segura.

### 🔄 Creación de servicio de Windows
Configurar el asistente como un Servicio de Windows permite automatizar el proceso por completo. En cuanto un archivo llegue al directorio raíz seleccionado, el sistema lo moverá inmediatamente sin que tengas que abrir interfaces.

<p align="center">
  <img src="./assets/instalacion-8.png" alt="Pregunta para crear servicio" width="600">
</p>

Una vez creado con éxito, verás el mensaje de confirmación en la consola. Puedes presionar cualquier tecla para cerrar la ventana.

> [!TIP]
> **Recomendación:** Se sugiere activar el servicio de Windows para desentenderte por completo de la ejecución manual; el sistema trabajará silenciosamente por ti.

Puedes verificar el estado de la automatización en la herramienta nativa de **Servicios de Windows** bajo el nombre de `FolderOrganizer`.

<p align="center">
  <img src="./assets/instalacion-9.png" alt="Servicio registrado en Windows" width="600">
</p>

### 💻 Ejecución manual del aplicativo
Si prefieres no instalar tareas en segundo plano, simplemente selecciona que **no** deseas crear el servicio. El sistema te preguntará inmediatamente si deseas ejecutar la organización de archivos de forma manual en ese preciso momento.

<p align="center">
  <img src="./assets/instalacion-12.png" alt="Ejecución manual" width="600">
</p>

### 📝 Configuración previa
A partir de la segunda vez que abras la aplicación, FolderOrganizer detectará tus preferencias previas y te preguntará si deseas mantenerlas o sobreescribirlas con una nueva estructura.

* Si decides **continuar con la configuración previa**, pasarás directo a las opciones de ejecución ([Servicio](#-creación-de-servicio-de-windows) o [Manual](#-ejecución-manual-del-aplicativo)).

<p align="center">
  <img src="./assets/instalacion-11.png" alt="Cargar configuración previa" width="600">
</p>

* Si requieres modificar las reglas de filtrado, responde `n` para iniciar el asistente desde cero.

<p align="center">
  <img src="./assets/instalacion-10.png" alt="Reconfigurar carpetas" width="600">
</p>

---

## 🔧 Generar el Instalador

Si deseas auditar, modificar el código o compilar el instalador ejecutable por tu cuenta, necesitarás tener instalado **Node.js** e **Inno Setup 6** en tu equipo de desarrollo.

Ejecuta el siguiente comando desde la raíz de tu espacio de trabajo:

```powershell
npm run build:installer
```

Este script automatizado se encargará de preparar los archivos en la ruta `dist/FolderOrganizer-build`, resolver las dependencias exclusivas de producción y empaquetar el asistente ejecutable final en: `dist/FolderOrganizer-Installer/FolderOrganizer_Installer.exe`.

Si tienes tu instalación de Inno Setup en un directorio personalizado, recuerda declarar la ruta del ejecutable `ISCC.exe` antes de lanzar la compilación:

```powershell
$env:ISCC_PATH = 'C:\ruta\a\ISCC.exe'
npm run build:installer
```

---

## 🛠️ Tecnologías Utilizadas

### Lógica y Core de la Aplicación
* **Node.js** - Entorno de ejecución para Javascript.
* **Inquirer** - Framework interactivo para flujos de respuesta en consola de comandos.
* **Node-windows** - API de comunicación e instalación de scripts como servicios nativos de Windows.
* **Color** - Formateador visual para mejorar la legibilidad de la interfaz CLI.
* **Eslint** & **Cross-env** - Herramientas de calidad de código y gestión de entornos.

### Empaquetado y Diseño Visual
* **Inno Setup Compiler** - Motor de creación de instaladores para sistemas Windows.
* **bat-to-exe-converter** - Utilidad de puente para scripts de ejecución.
* **Inkscape** - Software de diseño vectorial utilizado para la creación del ícono oficial del programa.

---

## 💖 Apoya al Proyecto (Sponsors)

**FolderOrganizer** es una herramienta de código abierto desarrollada y mantenida de forma independiente durante mi tiempo libre. Si esta aplicación te ayuda a ahorrar tiempo todos los días, mantiene tus directorios limpios o deseas apoyar mis inicios como desarrollador de software, considera realizar una contribución:

* ☕ [**Invítame un café a través de Ko-fi**](https://ko-fi.com)
* 💗 [**Conviértete en Patrocinador Oficial en GitHub Sponsors**](https://github.com)

¡Cualquier nivel de apoyo impulsa enormemente el mantenimiento del código, la corrección de errores y el desarrollo de nuevas funciones!

---
*Diseñado con dedicación por [FrEaKAlL](https://github.com)*


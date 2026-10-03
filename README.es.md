<h1 align="center">
  <img src="./assets/icon.ico" width="50" alt="FolderOrganizer">
  <br>
  FolderOrganizer
</h1>

<p align="center">
  <strong>Organiza tus archivos automáticamente en Windows y Linux.</strong>
</p>

<p align="center">
  Aplicación ligera y de código abierto que clasifica automáticamente tus archivos mediante reglas configurables en Windows y Linux.
</p>

<p align="center">
  <a href="./README.md">🇺🇸 English</a> |
  <strong>🇲🇽 Español</strong>
</p>

<p align="center">
  <a href="https://github.com/FrEaKAlL/FolderOrganizer/releases/latest"><strong>⬇ Descargar última versión</strong></a>
  ·
  <a href="#-instalación-rápida"><strong>📖 Instalación</strong></a>
  ·
  <a href="https://github.com/sponsors/FrEaKAlL"><strong>💖 Sponsor</strong></a>
</p>

<p align="center">
  <a href="https://github.com/FrEaKAlL/FolderOrganizer/releases/latest"><img src="https://img.shields.io/github/v/release/FrEaKAlL/FolderOrganizer?label=release" alt="Última versión"></a>
  <a href="https://github.com/FrEaKAlL/FolderOrganizer/actions/workflows/release.yml"><img src="https://github.com/FrEaKAlL/FolderOrganizer/actions/workflows/release.yml/badge.svg" alt="Workflow de release"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20Linux-blue" alt="Windows y Linux">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="Licencia MIT">
  <a href="https://github.com/sponsors/FrEaKAlL">
    <img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-ea4aaa?logo=githubsponsors" alt="Sponsor">
  </a>
</p>

---

## ✨ ¿Qué es FolderOrganizer?

Cuando descargamos archivos desde internet, chats o correos electrónicos, es común que todo termine acumulándose en una sola carpeta, como **Descargas**.

Con el tiempo, encontrar documentos, imágenes, instaladores o archivos importantes se vuelve cada vez más complicado.

**FolderOrganizer** automatiza esta tarea supervisando el directorio que configures y moviendo los archivos hacia carpetas clasificadas según sus extensiones y las reglas que hayas definido.

Puede ejecutarse:

- 🔄 Automáticamente como **Servicio de Windows** o mediante **systemd en Linux**.
- 💻 Manualmente cuando necesites organizar tus archivos.
- ⚙️ Con una estructura predeterminada.
- 🛠️ Con reglas personalizadas.

------------------------------------------------------------------------

## 🎬 Mira cómo funciona

<p align="center">
  <img src="./assets/demo.gif" alt="FolderOrganizer organizando archivos automáticamente" width="750">
</p>

------------------------------------------------------------------------

## 👀 Antes y después

### Antes

``` text
Descargas/
├── archivo.zip
├── fotografia.jpg
├── documento.docx
├── notas.txt
├── setup_installer.exe
├── reporte.xlsx
├── desconocido.file
├── Windows10.iso
├── datos.json
├── factura.pdf
├── presentacion.pptx
└── script.js
```

### Después

``` text
Descargas/
├── zip o rar/
├── Imagenes/
├── Word/
├── Texto/
├── Ejecutables/
├── Excel/
├── Otros/
├── ISO/
├── JSON/
├── PDF/
├── Presentaciones/
└── Scripts/
```

> El ejemplo refleja las categorías predeterminadas de FolderOrganizer. Con reglas personalizadas, la estructura final puede adaptarse a las carpetas y extensiones que prefieras.

------------------------------------------------------------------------

## ⭐ Características

- 📁 Organización automática de archivos.
- ⚙️ Reglas configurables.
- 🗂️ Clasificación mediante extensiones de archivo.
- 🔄 Ejecución automática mediante Servicio de Windows.
- 💻 Ejecución manual cuando se requiera.
- 🧙 Asistente interactivo de configuración.
- 🗣️ Selección de idioma.
- 💾 Reutilización de configuraciones anteriores.
- 📦 Instalador validado para Windows y runtime compatible con Linux.
- 🔓 Código abierto.

------------------------------------------------------------------------

## 📥 Instalación rápida

### Windows

La instalación recomendada y validada para **v1.2.0** es el instalador oficial para Windows disponible en GitHub Releases.

1.  Ve a [**Releases**](https://github.com/FrEaKAlL/FolderOrganizer/releases/latest).
2.  Descarga `FolderOrganizer_Installer.exe`.
3.  Ejecuta el instalador.
4.  Sigue el asistente de instalación.
5.  Abre **FolderOrganizer** desde el menú Inicio de Windows.

### [⬇ Descargar la última versión](https://github.com/FrEaKAlL/FolderOrganizer/releases/latest)

![Asistente de instalación](./assets/instalacion-1.png)

> [!NOTE]
> **Permisos de Administrador:** FolderOrganizer requiere privilegios de administrador para registrar o administrar el Servicio de Windows cuando esta opción sea utilizada.

Una vez concluida la instalación, busca **FolderOrganizer** dentro del menú Inicio de Windows.

![FolderOrganizer en el menú Inicio](./assets/instalacion-2.png)

La aplicación interactiva se ejecuta con permisos normales de usuario. La elevación de administrador se solicita únicamente cuando FolderOrganizer necesita registrar o administrar el Servicio de Windows.

![Consola inicial de FolderOrganizer](./assets/instalacion-3.png)

### Linux

El código incluye soporte para Linux y ejecución mediante **systemd**, pero todavía no ha completado el mismo nivel de validación en entornos reales que el instalador de Windows. Para v1.2.0, Windows continúa siendo la distribución principal validada.

------------------------------------------------------------------------

## ⚙️ Configuración

FolderOrganizer incluye un asistente que permite configurar cómo deseas organizar tus archivos.

### 🗣️ Selección de idioma

Selecciona tu idioma de preferencia para realizar la configuración.

![Selección de idioma](./assets/instalacion-4.png)

El sistema permite elegir entre:

- **Por defecto:** utiliza una estructura de organización predefinida.
- **Personalizada:** permite seleccionar las carpetas y extensiones que deseas utilizar.

![Selección de tipo de estructura](./assets/instalacion-5.png)

### 📁 Configuración por defecto

La configuración predeterminada muestra las carpetas estándar que serán generadas junto con las extensiones de archivo que FolderOrganizer utilizará para clasificar los archivos automáticamente.

![Estructura por defecto](./assets/instalacion-6.png)

### 🛠️ Configuración personalizada

La configuración personalizada permite especificar qué carpetas y extensiones deben formar parte del proceso de organización.

![Configuración personalizada](./assets/instalacion-7.png)

Al finalizar cualquiera de los dos flujos, FolderOrganizer solicitará confirmar la configuración antes de guardar las preferencias.

------------------------------------------------------------------------

## 🔄 Automatización con Servicio de Windows

La forma recomendada de utilizar FolderOrganizer es mediante un **Servicio de Windows**.

Cuando el servicio está activo, FolderOrganizer trabaja silenciosamente en segundo plano y organiza automáticamente los archivos que llegan al directorio configurado.

![Pregunta para crear servicio](./assets/instalacion-8.png)

Una vez creado correctamente, la consola mostrará un mensaje de confirmación.

> [!TIP]
> Utilizar el Servicio de Windows permite automatizar completamente el proceso y evita tener que ejecutar FolderOrganizer manualmente.

Puedes verificar el estado del servicio desde la herramienta **Servicios de Windows**. El servicio aparece con el nombre:

``` text
FolderOrganizer
```

![Servicio registrado en Windows](./assets/instalacion-9.png)

------------------------------------------------------------------------

## 💻 Ejecución manual

Si prefieres no instalar el Servicio de Windows, FolderOrganizer también puede ejecutarse manualmente.

Durante la configuración selecciona que **no** deseas crear el servicio. La aplicación preguntará si deseas ejecutar la organización de archivos en ese momento.

![Ejecución manual](./assets/instalacion-12.png)

------------------------------------------------------------------------

## 📝 Configuración previa

A partir de la segunda ejecución, FolderOrganizer detectará si existe una configuración previa.

Puedes continuar utilizando la configuración existente o crear una nueva configuración.

![Cargar configuración previa](./assets/instalacion-11.png)

Si necesitas modificar las reglas de organización, selecciona `n` para iniciar nuevamente el asistente.

![Reconfigurar carpetas](./assets/instalacion-10.png)

------------------------------------------------------------------------

## 👨‍💻 Para desarrolladores

FolderOrganizer es un proyecto de código abierto. Puedes revisar el código, modificarlo y generar tu propio instalador.

### 🔧 Generar el instalador

Necesitarás:

- **Node.js**
- **Inno Setup 6**

Desde la raíz del proyecto ejecuta:

``` powershell
pnpm run build:installer
```

El proceso prepara los archivos en:

``` text
dist/FolderOrganizer-build
```

y genera el instalador en:

``` text
dist/FolderOrganizer-Installer/FolderOrganizer_Installer.exe
```

Si Inno Setup está instalado en una ruta personalizada, define previamente `ISCC_PATH`:

``` powershell
$env:ISCC_PATH = 'C:\ruta\a\ISCC.exe'
pnpm run build:installer
```

------------------------------------------------------------------------

## 🛠️ Tecnologías utilizadas

### Lógica y Core

- **Node.js** — entorno de ejecución de JavaScript.
- **Inquirer** — asistente interactivo para la configuración mediante consola.
- **node-windows** — integración e instalación del proceso como Servicio de Windows.
- **systemd** — integración del servicio en segundo plano para Linux.
- **Color** — formato visual de la interfaz CLI.
- **ESLint** — control de calidad del código.
- **cross-env** — gestión de variables de entorno.

### Empaquetado

- **Inno Setup Compiler** — generación del instalador para Windows.
- **Inkscape** — utilizado para la creación del icono de FolderOrganizer.

------------------------------------------------------------------------

## 🗺️ Roadmap

Las prioridades de desarrollo y mejoras planeadas se encuentran en [`ROADMAP.md`](./ROADMAP.md). El historial de versiones está disponible en [`CHANGELOG.md`](./CHANGELOG.md).

> El código incluye soporte para Linux, pero Windows continúa siendo la distribución principal validada para v1.2.0.

------------------------------------------------------------------------

## 🤝 Contribuir

Las contribuciones son bienvenidas.

Si deseas reportar un error, proponer una funcionalidad o colaborar con código, consulta nuestra [guía de contribución](./CONTRIBUTING.md).

También puedes apoyar el proyecto dejando una ⭐ en el repositorio.

------------------------------------------------------------------------

## 💖 Apoya el proyecto

**FolderOrganizer** es una herramienta de código abierto desarrollada y mantenida de forma independiente.

Si la aplicación te resulta útil y deseas apoyar su mantenimiento y el desarrollo de nuevas funcionalidades:

- ☕ [**Apóyame en Ko-fi**](https://ko-fi.com/FrEaKAlL)
- 💗 [**Conviértete en Sponsor en GitHub**](https://github.com/sponsors/FrEaKAlL)

Tu apoyo ayuda al mantenimiento, corrección de errores, documentación y desarrollo de nuevas funcionalidades.

------------------------------------------------------------------------

## 📄 Licencia

FolderOrganizer se distribuye bajo la licencia **MIT**.

Consulta el archivo [`LICENSE`](./LICENSE) para más información.

------------------------------------------------------------------------

Desarrollado por [**FrEaKAlL**](https://github.com/FrEaKAlL).

Si FolderOrganizer te resulta útil, considera dejar una ⭐ en el repositorio.

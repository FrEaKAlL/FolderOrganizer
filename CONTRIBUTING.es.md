# 🤝 Contribuir a FolderOrganizer

[English](./CONTRIBUTING.md) | **Español**

Gracias por tu interés en mejorar **FolderOrganizer**. Son bienvenidas las contribuciones como correcciones de errores, mejoras de documentación, traducciones, pruebas y nuevas funcionalidades.

Sigue estas pautas para que los cambios sean fáciles de revisar, probar y mantener.

## Formas de contribuir

### 🐛 Reportar un error

Antes de abrir un nuevo issue, revisa los existentes para evitar duplicados. Incluye el sistema operativo, la versión de FolderOrganizer, el modo de ejecución (interactivo o servicio), los pasos para reproducir el problema, el comportamiento esperado y real, y la salida relevante cuando sea útil.

No incluyas contraseñas, tokens, rutas privadas ni otra información sensible.

### ✨ Sugerir una mejora

Abre un issue describiendo el problema o flujo de trabajo que deseas mejorar, por qué sería útil y qué comportamiento esperas.

### 🛠️ Enviar un pull request

Mantén los pull requests enfocados en un solo cambio siempre que sea posible. Para cambios grandes, se recomienda abrir primero un issue para discutir el enfoque antes de implementarlo.

## 💻 Entorno de desarrollo

FolderOrganizer requiere actualmente:

- **Node.js 22 o superior**;
- **pnpm 12.6.0**;
- **Inno Setup 6** únicamente para compilar el instalador de Windows.

Clona tu fork e instala las dependencias:

```bash
git clone https://github.com/<tu-usuario>/FolderOrganizer.git
cd FolderOrganizer
pnpm install --frozen-lockfile
```

Ejecuta FolderOrganizer en modo desarrollo:

```bash
pnpm run dev
```

## 🔄 Flujo de trabajo con Git

La rama predeterminada del repositorio es **`master`**.

Crea tu rama de trabajo desde un `master` actualizado:

```bash
git switch master
git pull origin master
git switch -c fix/descripcion-corta
```

Utiliza nombres descriptivos como `fix/service-startup`, `feature/new-language` o `docs/install-guide`.

Incluye únicamente los archivos relacionados con tu cambio, sube la rama a tu fork y abre un Pull Request contra **`master`**.

## ✅ Validación antes de un pull request

Antes de enviar un PR, ejecuta:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm test
```

Si el cambio afecta al instalador de Windows, ejecuta también:

```bash
pnpm run build:installer
```

El pull request debe explicar qué cambió, por qué es necesario y cómo fue validado.

## 🎨 Estilo de código

FolderOrganizer utiliza **ESLint**. Evita cambios de formato no relacionados y conserva la estructura existente del proyecto salvo que el cambio realmente requiera una modificación arquitectónica.

Para corregir automáticamente los problemas de lint compatibles:

```bash
pnpm run lint:fix
```

Revisa los cambios automáticos antes de confirmarlos.

## 🔐 Seguridad

No publiques posibles vulnerabilidades de seguridad como issues públicos normales. Sigue las instrucciones de [SECURITY.es.md](./SECURITY.es.md).

## 📄 Licencia

Al contribuir a FolderOrganizer, aceptas que tus contribuciones se distribuirán bajo la [Licencia MIT](./LICENSE).

Gracias por ayudar a mejorar FolderOrganizer.

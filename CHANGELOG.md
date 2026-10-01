# Changelog

All notable changes to FolderOrganizer are documented in this file.

The project follows [Semantic Versioning](https://semver.org/).

## [1.2.0] - 2026-10-01

### Added

- Linux runtime support and systemd service integration.
- Cross-platform launchers for Windows and Linux.
- Persistent configuration outside the application directory.
- Windows configuration stored in `C:\ProgramData\FolderOrganizer\config.json`.
- Linux configuration stored under the user's XDG configuration directory.
- Automatic migration of legacy Windows configuration.
- Installer update flow that preserves user configuration.

### Changed

- Modernized the interactive CLI for Inquirer 14 using supported `select` prompts.
- Inquirer is loaded dynamically for CommonJS/ESM compatibility.
- Windows service elevation is isolated from the normal interactive application.
- Windows packaging now uses a portable hoisted pnpm production dependency tree.
- Installer shortcuts use the FolderOrganizer icon and command launcher.
- Improved service installation, update and uninstall behavior.
- Updated project documentation for Windows and Linux.

### Removed

- Legacy `start.exe`.
- Legacy `package-lock.json` from installed distributions.
- Obsolete bat-to-exe packaging references.

### Validation

The Windows installer and application flow represented by the stable v15 baseline were manually validated before preparing this release. Linux support is present in the codebase but is not yet claimed as fully validated for v1.2.0.

## [1.1.0]

Previous public release.

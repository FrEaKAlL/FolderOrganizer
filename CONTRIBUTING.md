# 🤝 Contributing to FolderOrganizer

**English** | [Español](./CONTRIBUTING.es.md)

Thank you for your interest in improving **FolderOrganizer**. Contributions such as bug fixes, documentation improvements, translations, tests, and new features are welcome.

Please follow these guidelines so changes remain easy to review, test, and maintain.

## Ways to contribute

### 🐛 Report a bug

Before opening a new issue, check the existing issues to avoid duplicates. Include the operating system, FolderOrganizer version, execution mode (interactive or service), steps to reproduce, expected and actual behavior, and relevant output when useful.

Do not include passwords, tokens, private paths, or other sensitive information.

### ✨ Suggest an improvement

Open an issue describing the problem or workflow you want to improve, why it would be useful, and the behavior you expect.

### 🛠️ Submit a pull request

Keep pull requests focused on one change whenever possible. For larger changes, opening an issue first is recommended so the approach can be discussed before implementation.

## 💻 Development environment

FolderOrganizer currently requires:

- **Node.js 22 or newer**;
- **pnpm 12.6.0**;
- **Inno Setup 6** only when building the Windows installer.

Clone your fork and install the dependencies:

```bash
git clone https://github.com/<your-user>/FolderOrganizer.git
cd FolderOrganizer
pnpm install --frozen-lockfile
```

Run FolderOrganizer in development mode:

```bash
pnpm run dev
```

## 🔄 Git workflow

The default branch of this repository is **`master`**.

Create your work branch from an up-to-date `master`:

```bash
git switch master
git pull origin master
git switch -c fix/short-description
```

Use a descriptive branch name such as `fix/service-startup`, `feature/new-language`, or `docs/install-guide`.

Commit only files related to your change, push the branch to your fork, and open a Pull Request against **`master`**.

## ✅ Validation before a pull request

Before submitting a PR, run:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm test
```

If your change affects the Windows installer, also run:

```bash
pnpm run build:installer
```

A pull request should explain what changed, why the change is needed, and how it was validated.

## 🎨 Code style

FolderOrganizer uses **ESLint**. Avoid unrelated formatting changes and keep the existing project structure unless the change genuinely requires an architectural modification.

To automatically fix supported lint issues:

```bash
pnpm run lint:fix
```

Review automatic changes before committing them.

## 🔐 Security

Please do not publish suspected security vulnerabilities as ordinary public issues. Follow the instructions in [SECURITY.md](./SECURITY.md).

## 📄 License

By contributing to FolderOrganizer, you agree that your contributions will be distributed under the project's [MIT License](./LICENSE).

Thank you for helping improve FolderOrganizer.

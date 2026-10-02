## Description

Describe the changes introduced by this pull request.

> Español: puedes completar este template en español si lo prefieres.

## Related issue

Link the issue related to this change, if applicable.

Example:

```text
Closes #123
```

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation
- [ ] Tests
- [ ] Build / installer
- [ ] Other

## Validation

Describe how you tested the changes. Include the relevant commands and results.

Recommended baseline:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm test
```

If the change affects the Windows installer:

```bash
pnpm run build:installer
```

## Checklist

- [ ] My branch is based on the current `master`.
- [ ] I kept the change focused and avoided unrelated formatting changes.
- [ ] I reviewed my own changes before submitting the PR.
- [ ] I updated documentation when the change requires it.
- [ ] I did not include credentials, tokens, private data, or generated files that should not be committed.

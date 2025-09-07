# Monorepo Starter (pnpm + TypeScript + Workspaces)

![CI](https://github.com/tshelburne/typescript-starter/actions/workflows/ci.yml/badge.svg)

A minimal, batteries-included monorepo template using **pnpm workspaces**, **TypeScript**, and a few common app types.

## 📦 Packages

```
.
├── apps/
│   ├── react-frontend/     # Vite + React app
│   ├── nextjs/             # Next.js app (App Router)
│   └── express-backend/    # Express API server
└── packages/
    └── util/               # Shared TypeScript utilities
```

## 🚀 Quickstart

```sh
# remove unneeded apps, eg:
rm -rf apps/express-backend
rm -rf apps/react-app

# re-scope project packages from @template-repo, eg:
find . -name "package.json" -type f -exec sed -i '' 's/@template-repo/@new-hotness/g' {} +


# install deps
pnpm install

# run one app in dev mode
pnpm --filter @new-hotness/nextjs dev

# build everything
pnpm build

# start backend in prod mode
pnpm --filter @new-hotness/express-backend start
```

## 🧰 What’s Included

- **Workspaces** via `pnpm-workspace.yaml`
- **Shared TS config** via `tsconfig.base.json` (each package extends & overrides `include/outDir`)
- **React + Vite** minimal app
- **Next.js** minimal app (App Router, TS)
- **Express** minimal server with:
  - common middleware: `cors`, `morgan`, `express.json()`
  - in-memory store with `GET /items`, `POST /items`
  - `GET /health` and `GET /status`

## 🧱 Scripts (convention)

From the **root**:

- `pnpm dev` — recursively run dev scripts (optional)
- `pnpm build` — build all packages/apps

## 🔗 Cross‑package imports

`packages/util` is an example of a shared library you can import from apps:

```ts
// apps/react-frontend/src/somewhere.ts
import { async } from "@new-hotness/util/promise"
```

All apps depend on `@new-hotness/util` via `"workspace:*"` so pnpm will symlink automatically.

## 🧭 TypeScript layout

Root **tsconfig.base.json** (shared compiler options); each package has a `tsconfig.json` like:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

## 💻 Requirements

- Node.js **v23+**
- pnpm **v10+**
- TypeScript **v5+**

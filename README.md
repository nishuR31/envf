
# Envf

[![npm version](https://img.shields.io/npm/v/envf?color=blue&&logo=npm)](https://www.npmjs.com/package/envf)
[![downloads](https://img.shields.io/npm/dt/envf?color=brightgreen)](https://www.npmjs.com/package/envf)
![license](https://img.shields.io/npm/l/envf)
![typescript](https://img.shields.io/badge/Built%20With%20TypeScript-000000?&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-000000?&logo=node.js)
![GitHub stars](https://img.shields.io/github/stars/nishuR31/envf?&logo=github)

A lightweight, modular `.env` loader built for Node.js and TypeScript.  
Inject only the keys you need — directly into `process.env` — no bloat, no overkill.

---

## Installation

```bash
npm install envf
# or
pnpm add envf
# or
yarn add envf
````

---

##  Quick Example

```ts
import { load } from "env-assistant";

// Load .env and merge into process.env safely
const env = load(".env");

console.log({
  ...env,
  ...process.env,
});
```

---

##  Why envf?

- [x] Load only the keys you want
- [x] Inject automatically into `process.env`
- [x] Works with `.env` or any custom env file path
- [x] Modular functions (`load`, `setKeys`, `getKey`, etc.)
- [x] TypeScript types + zero dependencies

---

##  API

| Function                             | Description                               |
| ------------------------------------ | ----------------------------------------- |
| `load(filePath?: string)`            | Load env file and return key-value pairs. |
| `pathLoad(filePath?: string)`            | Relative path of env file and return key-value pairs. |
| `setKeys(keys: string[])`            | Specify which keys to inject.             |
| `setKey(key: string, value: string)` | Set a single key manually.                |
| `getKey(key: string)`  | Return value of key manually.                |
| `keys()` | Returns info of keys only.                |

---

##  Example: Selective Injection

```ts
import { setKeys } from "envf";

// Only load specific keys
const env = setKeys("DB_URL", "JWT_SECRET");

console.log(process.env.DB_URL);
```

---

##  TypeScript Config Hint

Use `moduleResolution: "NodeNext"` and `module: "NodeNext"`
for full ES module compatibility.

---

##  Contribute

PRs welcome!
Star ⭐ [envf](https://github.com/nishuR31/envf)
to support development.

---

© 2025 Nishu R31 — Licensed under MIT.


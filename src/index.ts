import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

// const envPath = (file: string): string =>path.resolve(process.cwd(), file);

let envPath = (file: string): string | any => {
  try {
    let filePath =
      path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        `../${file}`
      ) ?? path.resolve(process.cwd(), file);
    return filePath;
  } catch (err) {
    console.log(`${err}`);
    return `${err}`;
  }
};

let env: Record<string, string> = {};

export function pathLoad(file: string): typeof env | undefined | string {
  try {
    if (!fs.existsSync(file)) {
      env = process.env as Record<string, any>;
      console.warn(`No .env file found at ${file}`);
      return env;
    }

    const lines = fs
      .readFileSync(file, "utf-8")
      .split(/\r?\n/) // split by lines
      .filter(Boolean) // remove empty lines
      .filter((line: string) => !line.trim().startsWith("#")) // skip comments
      .map((line: string) => line.split("="));

    for (const [key, ...rest] of lines) {
      if (!key) {
        return undefined;
      }
      const cleanKey = key.trim();
      const value = rest.join("=").trim();
      if (cleanKey) env[cleanKey] = value;
    }

    console.log(`File on ${file} loaded successfully.`);

    return env;
  } catch (err) {
    console.error(`${err}`);
    return `${err}`;
  }
}

export function load(file: string = ".env"): typeof env | undefined | string {
  try {
    let pathFile = envPath(file);
    if (!fs.existsSync(envPath(file))) {
      console.warn(`No ${file} file found at ${pathFile}`);
      env = process.env as Record<string, any>;
      return env;
    }
    const lines = fs
      .readFileSync(pathFile, "utf-8")
      .split(/\r?\n/) // split by lines
      .filter(Boolean) // remove empty lines
      .filter((line: string) => !line.trim().startsWith("#")) // skip comments
      .map((line: string) => line.split("="));

    for (const [key, ...rest] of lines) {
      if (!key) {
        return undefined;
      }
      const cleanKey = key.trim();
      const value = rest.join("=").trim();
      if (cleanKey) env[cleanKey] = value;
    }

    console.log(`File on ${pathFile} loaded successfully.`);

    return env;
  } catch (err) {
    console.error(`${err}`);
    return `${err}`;
  }
}

export function setKey<T extends string>(key: T): T | undefined {
  try {
    if (!(key in env)) {
      console.warn(`Missing env key: ${key}`);
      return undefined;
    }
    process.env[key] = env[key]; //injection of keys in process.env
    return key;
  } catch (err) {
    console.error(`Error : ${err} `);
  }
}

// ✅ Modern, optimized version
export function setKeys<T extends string>(...keys: T[]): string {
  try {
    const result = [...keys].filter((key) => !(key in process.env)) as string[];
    for (const key of result) {
      if (!process.env[key] && env[key]) {
        process.env[key] = env[key];
      }
    }

    return `Added keys ${result}`;
  } catch (err) {
    console.log(`${err}`);
    return `${err}`;
  }
}

export function keys(): any[] | string {
  try {
    return Object.keys(env).length
      ? `Keys injected : ${Object.keys(process.env).filter(
          (key) => key in env
        )}`
      : `May be env isn't loaded.`;
  } catch (err) {
    console.log(`${err}`);
    return `${err}`;
  }
}

export function getKey<T extends string>(key: T): string | undefined {
  if (process.env[key]) {
    return process.env[key];
  }
  if (env[key]) {
    return env[key];
  }
  return undefined;
}

let index = { load, setKey, setKeys, pathLoad, keys, getKey };

export default index;

console.log(index.load(".env.eg"))
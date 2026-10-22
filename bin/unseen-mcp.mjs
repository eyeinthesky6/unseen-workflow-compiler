#!/usr/bin/env node
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bundledPath = path.resolve(__dirname, "../dist/index.cjs");

const require = createRequire(import.meta.url);
require(bundledPath);

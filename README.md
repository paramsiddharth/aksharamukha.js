# Aksharamukha.js

Aksharamukha in your browser and Node.js!

## Description
This project aspires to be a browser-compatible version of the [Aksharamukha](https://www.aksharamukha.com/) and its [Python library](https://github.com/virtualvinodh/aksharamukha-python), which is a transliteration tool for Indic scripts. The goal is to enable users to perform script conversions directly in their web browsers or Node.js applications without needing to rely on server-side processing.

#### Aksharamukha.js can be used in multiple ways: directly in the browser via CDN, as a Node.js library, or imported in frontend JS apps using modern bundlers.

## 1. **Plug-n-Play(Browser via CDN)**
You can use Aksharamukha.js directly in your HTML files by including it via a CDN. Here's a simple example:

```html
<!DOCTYPE html>
<html lang='en'>
<head>
    <title>Hi</title>
    <script src='https://cdn.jsdelivr.net/npm/aksharamukha@latest/dist/index.global.js'></script>
</head>
<body>
    <script type='module'>
        const aksharamukha = await Aksharamukha.new();
        const transliterated = await aksharamukha.process(
            'autodetect',
            'Devanagari',
            'praNAm.'
        );
        alert(transliterated);
    </script>
</body>
</html>


## 2. Node.js Usage

Install (published on npm):

```bash
npm install aksharamukha
# or
yarn add aksharamukha
```

ESM example (Node with "type": "module" or .mjs):

> **Note:** Top-level `await` requires Node.js v14.8+ and `"type": "module"` in your `package.json`.

```javascript
import Aksharamukha from 'aksharamukha';

async function run() {
    const ak = await Aksharamukha.new();
    const result = await ak.process('autodetect', 'Malayalam', 'śrī');
    console.log('Transliterated:', result);
}

run().catch(console.error);
```

CommonJS example:

```javascript
const Aksharamukha = require('aksharamukha');

(async () => {
    const ak = await Aksharamukha.new();
    const result = await ak.process('autodetect', 'Malayalam', 'śrī');
    console.log('Transliterated:', result);
})().catch(console.error);
```

Notes:
- Wrap usage in an async function (or use top-level await where supported).
- Choose ESM vs CommonJS according to your project's configuration.
- Check your Node version and bundler settings if you encounter import issues.
## 3. Import in JS apps

Install the package for your app:

```bash
# npm
npm install aksharamukha

# yarn
yarn add aksharamukha

# pnpm
pnpm add aksharamukha
```

Basic ESM usage (bundlers like Vite, Webpack, Rollup):

```javascript
// src/main.js
import Aksharamukha from 'aksharamukha';

async function run() {
    const ak = await Aksharamukha.new();
    const out = await ak.process('autodetect', 'Devanagari', 'namaste');
    console.log(out);
}

run().catch(console.error);
```

CommonJS usage:

```javascript
// src/main.cjs
const Aksharamukha = require('aksharamukha');

(async () => {
    const ak = await Aksharamukha.new();
    console.log(await ak.process('autodetect', 'Malayalam', 'śrī'));
})().catch(console.error);
```

React (client-side) example:

```jsx
// components/TransliterateClient.jsx
import React, { useEffect, useState } from 'react';
import Aksharamukha from 'aksharamukha';

export default function TransliterateClient({ text }) {
    const [out, setOut] = useState('');

    useEffect(() => {
        let alive = true;
        (async () => {
            const ak = await Aksharamukha.new();
            const result = await ak.process('autodetect', 'Tamil', text);
            if (alive) setOut(result);
        })();
        return () => { alive = false; };
    }, [text]);

    return <div>{out}</div>;
}
```

Next.js note:
- Use the component client-side only (disable SSR) if the package relies on browser APIs or WASM. Example:

```javascript
// pages/index.js (Next.js)
import dynamic from 'next/dynamic';
const TransliterateClient = dynamic(() => import('../components/TransliterateClient'), { ssr: false });

export default function Page() {
    return <TransliterateClient text="praNAm." />;
}
```

Bundler / WASM considerations:
- If the package includes a WASM asset, ensure your bundler is configured to load it (Vite/webpack may need asset rules or a plugin). If you encounter import errors, check your bundler docs for handling .wasm and async module initialization.
That’s it — import normally according to your project's module system and run Aksharamukha.new() before calling process().

## Attribution
This project is inspired by and based on the original [Aksharamukha](https://www.aksharamukha.com/) by [Vinodh Rajan](https://github.com/virtualvinodh).

# Made with ❤️ by [Param](https://www.paramsid.com).

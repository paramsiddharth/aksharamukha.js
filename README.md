# Aksharamukha.js
Aksharamukha in your browser!
[![npm](https://img.shields.io/npm/v/aksharamukha)](https://www.npmjs.com/package/aksharamukha)

![npm](https://img.shields.io/npm/v/aksharamukha)

## Description
This project aspires to be a browser-compatible version of the [Aksharamukha](https://www.aksharamukha.com/) and its [Python library](https://github.com/virtualvinodh/aksharamukha-python), which is a transliteration tool for Indic scripts.

The goal is to enable users to perform script conversions directly in their web browsers without needing to rely on server-side processing.

## Plug & Play
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
```

## Attribution
This project is inspired by and based on the original [Aksharamukha](https://www.aksharamukha.com/) by [Vinodh Rajan](https://github.com/virtualvinodh).

# Made with ❤️ by [Param](https://www.paramsid.com).
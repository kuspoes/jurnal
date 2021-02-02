# kusaicom
[![Netlify Status](https://api.netlify.com/api/v1/badges/df1d5d40-df8a-47b5-80b1-1eed78d9953d/deploy-status)](https://app.netlify.com/sites/cranky-almeida-76230e/deploys)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![eleventy](https://img.shields.io/badge/staticgen-eleventy-%23707070.svg)](https://11ty.io)

> Source code untuk blog sederhana yang penting jalan dulu : [kusaeni.com](https://kusaeni.com)

# Install

``` sh
npm install
```

# Build
masih mempergunakan default folder 11ty yaitu ```_site```

``` sh
npm run build
# atau
npx eleventy
```

Karena ```css``` mempergunakan ```tailwindcss``` maka sebelum ```push``` ke Github, ```style.css``` perlu dikecilkan ukurannya.

``` sh
postcss tailwind.css -o 11ty/css/style.css
```

# Local Live Server

``` sh
npm run serve
# atau
npx eleventy --serve
```

# Tailwindcss
Layout desain blog ini mempergunakan [https://tailwindcss.com](Tailwindcss) yang diinstall di folder berbeda.

Build dari tailwindcss diarahkan ke folder ```css``` di dalam folder eleventy berada. 

Dengan struktur folder sebagi berikut :

``` sh
-- Blog
    |--- 11ty
        |-- _data
        |-- _includes
        |-- index.njk
        |-- .eleventy.js
        |-- .gitignore
        |-- ....
        |-- package.json # untuk 11ty
    |-- tailwind.css
    |-- tailwind.config.css
    |-- postcss.config.css
    |-- package.json # untuk tailwindcss
```

Terlihat ruwet?

Phil Hawksworth membuat *Eleventy stater pack* yang sudah *built in* dengan Tailwindcss. Kamu bisa mendapatkannya disini : [Eleventail](https://github.com/philhawksworth/eleventail)

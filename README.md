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

# CDN Image

*Image Management & Delivery* diladeni oleh [imagekit.io](https://imagekit.io) 
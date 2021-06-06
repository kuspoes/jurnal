# kusaicom
[![Netlify
Status](https://api.netlify.com/api/v1/badges/df1d5d40-df8a-47b5-80b1-1eed78d9953d/deploy-status)](https://app.netlify.com/sites/kusaeni/deploys)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
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

Jika saat menambahkan artikel/*post* atau mengubah/memerlukan *lib* dari Tailwindcss, pastikan untuk mem*build* ulang Tailwindcss terlebih dahulu.

```sh
npm run tw
```

Karena ```css``` nantinya memakai semua *class*  ```tailwindcss``` yang menyebabkan ukuran menjadi besar, maka sebelum ```push``` ke Github, ```style.css``` perlu dikecilkan ukurannya.

``` sh
postcss tailwind.css -o css/style.css

# atau

npm run purge
```

# Local Live Server

``` sh
npm run serve
# atau
npx eleventy --serve
```

# CDN Image

*Image Management & Delivery* diladeni oleh [imagekit.io](https://imagekit.io) 

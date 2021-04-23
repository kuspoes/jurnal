---
  layout: isi/jurnal.njk 
  title: '11ty: Reader Bar'
  ringkasan: 'Menambahkan Reader Bar sebagai indikator halaman dan bagaimana cara memodifikasinya'
  date: 2021-04-23
  update: false
  tags:
      - 11ty
      - jurnal
  code: true
  favorit: false
---

Reader Bar awalnya dibuat untuk [jQuery](https://jquery.com) yang dipergunakan untuk
mengvisualisasikan panjang dan posisi *scroll* halaman melalui garis memanjang
horisontal (biasanya ada di pinggir bagian atas halaman) dan sebuah tombol
fungsi untuk kembali ke awal halaman.

Di [Eleventy](https://11ty.dev) sendiri sudah ada sebuah *plugin* untuk membantu menampilkan Reader
Bar dengan mudah yaitu dengan memasang [Eleventy Reader Bar
Plugin](https://github.com/thigoap/eleventy-plugin-reader-bar).

Cara pemasangannya sangat mudah, yaitu :
1. *Install package* melalui NPM
```bash
$ npm install eleventy-plugin-reader-bar
```
2. Mengatur *configuration* di *eleventy.js*
```javascript
const readerBar = require('eleventy-plugin-reader-bar')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(readerBar)
}
```
3. Kemudian di dalam *template/layout* sisipkan blok HTML `div.reader-bar-start`, saya menyisipkan kode ini langsung dibawah baris HTML `<body>` dan menutupnya dibagian bawah sebelum `</body>`. Tujuannya adalah agar blok `readerBar` bisa meng*wrapping* keseluruhan *layout*nya.
 <p class="sidenote">Jika keseluruhan <em>layout</em> tidak masuk ke dalam blok <code>div</code> tersebut, maka tampilan readerBar tidak akan akurat. Bisa saja terjadi baru <em>scroll</em> sedikit namun indicator sudah menunjukkan 100%.</p>

4. Terakhir sisipkan kode Nunjucks {% raw %}`{% readerBar %}`{% endraw %} dibawah *tags* {% raw %}`{% content | safe %}`{% endraw %}.
{% raw %}
```javascript
{{ content | safe }}
{% readerBar "2px", "", "#e63946" %}
```
{% endraw %}
Kode diatas akan menampilkan readerBar dengan tebal `2px` dan warna `merah` seperti di artikel ini. Dokumentasi lebih lengkap bisa dibaca [disini](https://github.com/thigoap/eleventy-plugin-reader-bar)

### Modifikasi

Sayangnya saya tidak suka dengan tampilan *plugin* ini, yaitu dengan adanya *gap* antara tepian atas dan readerBar-nya. Setelah dicermati kode sumbernya, ternyata pembuat *plugin* menerapkan aturan di CSS jarak readerBar dan pinggiran atas adalah `2px` secara otomatis. Sehingga dari sini muncul *gap* tersebut.

Saya tidak ingin ada *gap* jadi harus memodifikasi nilai di CSSnya. Saya tidak menerapkan CSS baru untuk menimpa aturan *default*nya, namun memilih untuk merubahnya langsung dari kode sumber. Sedikit lebih rumit tapi hasilnya memuaskan.

1. `Clone` kode sumber lewat Git ke lokal, saya menyimpannya di folder `_tmp` di `root` jurnal ini. 
```bash
$ git clone https://github.com/thigoap/eleventy-plugin-reader-bar.git  _tmp
$ cd _tmp
```
Kemudian *edit* CSS yang dimaksud. Dalam hal ini adalah baris berikut :
```html
<!-- reader bar -->
  <div id="readerBarContainer" style="height:${height};width:100%;background-color:${bgColor};position:fixed;top:2px;left:0;z-index:100;transition:0.2s;">
    <div id="readerBar" style="height:${height};width:0;background-color:${fillColor};position:fixed;top:2px;left:0;z-index:200;transition:0.2s;"></div>
  </div>
```
Nilai `top:2px` saya rubah menjadi `0px` agar tidak muncul *gap*.

2. Setelah selesai *edit* saatnya mem*packing* ulang dengan NPM untuk mendapatkan berkas `.tgz`.
```bash
$ npm pack
```
3. *Edit file package.json* dan masukkan secara manual *dependecies*-nya.
```json
"dependencies": {
  "eleventy-plugin-reader-bar": "file:./_tmp/eleventy-plugin-reader-bar-0.2.0.tgz"
}
```
4. *Install* dengan menjalankan perintah `npm install`.

*Folder* `_tmp` ini harus diikutkan saat `push` ke repository (Github/Gitlab) karena saat di*build* dengan [Netlify](https://netlify.com) akan mencari *eleventy-plugin-reader-bar* di *path* lokal tersebut.
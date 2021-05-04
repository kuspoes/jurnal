---
  layout: isi/jurnal.njk 
  title: '11ty: Related Books'
  ringkasan: 'Shortcode untuk menampilkan related books dengan memanfaatkan JSON data'
  date: 2021-05-02
  update: false
  tags:
      - 11ty
      - jurnal
  code: true
  favorit: false
---

Di halaman [bacaan](/baca) saya ingin menampilkan relasi buku terkait dengan *review* buku yang saya tulis.

Tampilan yang diinginkan adalah seperti [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started) dengan gambar dan deskripsi. Gambarnya nanti bisa diisi dengan `coverImg`
dari masing - masing artikel baca yang sudah saya tulis.

![related post shortcodes](https://ik.imagekit.io/hjse9uhdjqd/jurnal/relasi_baca_GZtaKDPpe.jpg)

### Membuat basis data dalam JSON

Hal pertama yang dilakukan adalah membuat basis data dan menyimpannya dalam format JSON. Caranya adalah dengan membuat *file* baru dan memasukkan data `collection` dengan format menyesuaikan bentuk format *valid* dari JSON.

{% raw %}
```json
---
permalink : /baca/data.json
---

[{% for post in collections.baca %}
{
    "title": "{{ post.data.title }}",
    "date": "{{ post.data.date }}",
    "url": "{{ post.url }}",
    "ringkasan": "{{ post.data.ringkasan }}",
    "penulis": "{{ post.data.penulis }}",
    "coverImg": "{{ post.data.coverImg }}",
    "resensi": "{{ post.data.resensi }}"
}{{ '' if loop.last else ',' }}
{% endfor %}]
```
{% endraw %}

`title`, `date`, `url`, `ringkasan` dan seterusnya adalah *field* yang sudah saya tulis di YAML/*frontmatter* pada setiap artikel baca. Tampilan *frontmatter* seperti ini :

```xml
---
    layout: isi/buku.njk
    title : 'Sewu Dino'
    date: 2020-08-17
    ringkasan: 'Pertempuran antar keluarga dari Trah Pitu yang memakan banyak korban'
    keywords: 'Sewu Dino, Janur Ireng, Ranjat Kembang, Trah Pitu, Simpleman, Horor, Santet'
    coverImg : 'https://ik.imagekit.io/hjse9uhdjqd/tr:n-cover/buku/sewuDino_lV8ZEwbP7.jpg'
    penulis: 'Simpleman'
    genre: 
        - Thriller
        - Mistery
        - Jawa
    format: 'Papperback - 230 halaman'
    bahasa: 'Bahasa Indonesia, Bahasa Jawa'
    isbn: '978-602-220-348-3'
    tahun: 2020
    resensi: 'Dia adalah Dela Atmojo, anak yang harus kamu rawat sampai waktunya tiba. Ia dikirimi kutukan santet sewu dino. Santet yang sudah merenggut nyawa hampir seluruh anggota keluarga Atmojo.'
    rating: 3
    beli: https://shopee.co.id/bukune
    dimana: Bukune
    tags: baca
---
```

Saya mengambil beberapa *field* yang penting dan hendak dipakai nantinya. Sedangkan hasilnya adalah sebagai berikut 

```json
{
    "title": "Sewu Dino",
    "date": "Mon Aug 17 2020 07:00:00 GMT+0700 (Western Indonesia Time)",
    "url": "/baca/sewuDino/",
    "ringkasan": "Pertempuran antar keluarga dari Trah Pitu yang memakan banyak korban",
    "penulis": "Simpleman",
    "coverImg": "https://ik.imagekit.io/hjse9uhdjqd/tr:n-cover/buku/sewuDino_lV8ZEwbP7.jpg",
    "resensi": "Dia adalah Dela Atmojo, anak yang harus kamu rawat sampai waktunya tiba. Ia dikirimi kutukan santet sewu dino. Santet yang sudah merenggut nyawa hampir seluruh anggota keluarga Atmojo."
}
```

Setelah *eleventy* di `build` maka akan tersedia 1 *file* baru dengan nama `data.json` dengan *path* `/baca/data.json`. *File* inilah yang nanti akan dijadikan basis data untuk menentukan relasi artikel.

### 11ty Shortcodes

Setelah basis data tersedia, selanjutnya adalah membuat fungsi dalam `javascript` untuk memanggil basis data tersebut. Disini saya mempergunakan paket `node-fetch`. Namun sebelum itu perlu menentukan bentuk dari *shortcodes* yang akan dipakai.

1. Bentuk *shortcode*nya.
Saya ingin agar bentuk *tags*nya adalah sebagai berikut :

{% raw %}
```liquid
{% related "judul" %}
```
{% endraw %}

dimana `related` akan menjadi fungsi pemanggil *shortcodes* dan `judul` menjadi *string query* untuk mencari *field* di dalam JSON Array.

Sehingga di *file eleventy.js* saya menambahkan *syntax* berikut :

```js
eleventyConfig.addLiquidShortcode("related", async function (judul) {}
```

 <p class="sidenote">Saya sebenarnya adalah pengguna <a href="https://mozilla.github.io/nunjucks/" alt="Nunjucks">Nunjucks</a>, namun karena <i>default render</i> <code>markdown</code> di <i>eleventy</i> mempergunakan <a href="https://shopify.github.io/liquid/" alt="Liquid template Tags">Liquid</a>. Maka <i>shortcodes</i> saya mempergunakan Liquid</p>
 <p class="sidenote">Namun bisa juga mempergunakan <b>global shortcodes</b> dengan kode <code>eleventyConfig.addShortcode</code> yang bisa jalan di semua <i>template tags</i>

2. Ambil basis data dan buat fungsi *query*

Seperti yang sudah saya sebutkan diatas, saya mempergunakan `node-fetch` untuk membantu mengambil basis data. Maka yang harus dilakukan pertama kali adalah memasang paket `node-fetch`:

```bash
$ yarn add node-fetch

# atau

$ npm install node-fetch
```

 <p class="sidenote">Pengguna <a href="https://github.com/axios/axios">axios</a> bisa mempergunakannya sebagai pengganti <code>fetch</code>. Silakan menyesuaikan kode dibawah dengan fungsi di <code>axios</code>.</p>

kemudian buat fungsi di dalam *shortcodes* untuk mengambil basis data :

```js
try {
 const response = await fetch('https://kusaeni.com/baca/data.json', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
 });
 const data = await response.json();
 } catch(reason) {
   console.log(reason)
}
```

hasil dari `response` disimpan sebagai JSON.

3. Kemudian buat fungsi *query* untuk mengambil data berdasarkan *value* `judul` dengan mempergunakan `findIndex`

```js
const relasi = function (buku, judul) {
 const index = buku.findIndex(function (novel, index) {
  return novel.title.toLowerCase() === judul.toLowerCase()
 })
return buku[index]
 };
const hasilData = await relasi(data, judul);
console.log(hasilData)
```

Disini *string* `judul` harus diamankan dengan membuat `judul` menjadi huruf kecil semua `toLowerCase()` untuk menghindari kesalahan tipo saat mengetik judul. 

Sampai disini jika *tags* {% raw %}`{% related "judul" %}`{% endraw %} dimasukkan ke dalam artikel, maka pada saat `build`/`serve`, *eleventy* akan mengambil  `data.json` dan meng*filter*nya berdasarkan *query* judul yang dimasukkan. Hasilnya bisa diliat di log di konsol.

4. Untuk menampilkan data tersebut di posisi *tags* disisipkan, maka perlu ditambahkan kode berikut :

```js
return `<div class="flex">
	<img class="shadow-md" src="${hasilData.coverImg}" width="110" height="130" >
	<div class="flex-1"> 
		<b><a href="${hasilData.url}">${hasilData.title}</a> </b>
		<dl>
			<dt>${hasilData.penulis} </d> 
			<dd>${rese} ...</dd>
		</dl>
	</div>
</div>`;
```

Karena `node-fetch` menghasilkan `promise` maka `return` perlu diakses dengan tambahan `.then()` *callback*, sehingga keseluruhan *shortcodes*nya menjadi seperti ini :

```js
eleventyConfig.addLiquidShortcode("related", async function (judul) {
try {
	const response = await fetch('https://kusaeni.com/baca/data.json', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	const relasi = function (buku, judul) {
		const index = buku.findIndex(function (novel, index) {
			return novel.title.toLowerCase() === judul.toLowerCase()
		})
	return buku[index]
};
	const hasilData = await relasi(data, judul);
	var rese = hasilData.resensi.substr(0, 200)
	return `<div class="flex">
				<img class="shadow-md" src="${hasilData.coverImg}" width="110" height="130" >
				<div class="flex-1"> 
					<b><a href="${hasilData.url}">${hasilData.title}</a> </b>
					<dl>
						<dt>${hasilData.penulis} </d> 
						<dd>${rese} ...</dd>
					</dl>
				</div>
			</div>`;
} catch (err) {
	console.log(err)
}
const print = async () => {
	const p = await hasilData;
	console.log(p)
};
print()
});
```

Saya menambahkan fungsi `rese` untuk memotong karakter di `resensi` agar tidak lebih dari 200 karakter.

### Kesimpulan dan catatan

Alhamdulillah dengan fungsi *shortcodes* ini saya bisa menampilkan relasi bacaan sesuai dengan keinginan, namun ada beberapa
hal yang perlu diperhatikan saat mempergunakan *shortcodes* ini, diantaranya :

1. Untuk mengurangi kesalahan dalam *query* data berdasarkan judul, maka judul perlu dibuat `lowerCase` semua. Namun hal ini tidak menjadi solusi jika penulisan judulnya salah karena salah ketik atau salah spasi,
2. Proses ini harus mengambil `data.json` dan melakukan `parse` serta *query* membuat waktu *build* menjadi lebih lama, sekitar 19 - 30 ms dimana sebelumnya sekitar 9 - 17 ms.

Saya melakukan **DEBUG** `build` *eleventy* dan hasilnya butuh waktu 8,9 ms sendiri untuk membaca dan menyelesaikan eksekusi *file eleventy.js*.

Namun masih di dalam hitungan *miliseconds* dan saya tidak keberatan dengan ini dan pastinya jatah `build` dari Netlify masih jauh dari waktu terlampaui.
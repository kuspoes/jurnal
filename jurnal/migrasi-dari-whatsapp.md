---
  layout: isi/jurnal.njk 
  title: 'Migrasi dari Whatsapp' 
  ringkasan: 'Cara memindahkan data percakapan dari Whatsapp ke Telegram, Signal, atau BIP' 
  keywords: 'Whatsapp, Signal, Telegram, BIP, migration, migrasi, ekspor, data, export, impor,
  pindah'
  date: 2021-05-16
  update: false 
  tags:
      - signal
      - telegram
      - whatsapp
      - jurnal
  code: false
  favorit: false
---

Sesuai dengan pemberitahuan dari Whatsapp mengenai [penundaan penerapan *privacy
policy*](https://blog.whatsapp.com/giving-more-time-for-our-recent-update) maka per 16 Mei 2021 rencanaya *privacy policy* tersebut telah diaktifkan.

{% prelated "Signal Buruk Whatsapp", "/jurnal/signal" %}
Perubahan <i>privacy policy</i> Whatsapp, resiko, dan solusinya
{% endprelated %}

Bagi yang tidak setuju dengan *privacy policy* terbaru ini maka konsekuensinya adalah pengguna
tersebut tidak akan bisa lagi mengakses/mempergunakan layanan Whatsapp.

Meski begitu sampai saat ini tidak ada pemberitahuan resmi di laman blog Whatsapp. Namun untuk
berjaga - jaga, berikut adalah cara untuk memindahkan/*exports* data percakapan ke penyedia layanan
*messaging* lain seperti Telegram atau Signal.


### Ekspor ke Signal

Sebelum memindahkan data, yang harus dilakukan pertama kali adalah mengekspor data percakapan yang
dimaksud, caranya adalah :

**Perhatian!!** cara dibawah ini tidak otomatis memindahkan data secara terstruktur ke dalam Signal.
Data yang akan dipindahkan hanya sekedar ekspor data dalam format `ZIP` yang bisa dibuka/dibaca
dengan teks editor sederhana atau dari dalam aplikasi Signal.

1. Buka aplikasi Whatsapp, kemudian pilih pada percakapan yang diinginkan untuk dipindahkan,
2. (Android) tap pada menu `⋮` yang terletak di pojok kanan atas, kemudian pilih opsi `More` dan
   tap pada `Export Chat`,
   <span class="code_cap">langsung lompat ke cara nomer 04 jika tidak mempergunakan iPhone</span>
3. (iPhone) : tap pada nama *User* atau *Group* kemudian gulir ke bawah dan tap pada `Export
   Chat`,
4. Jika ingin mengekspor lengkap dengan media (gambar, video, dokumen, dsb) pilih opsi `Include Media`, jika tidak maka gunakan pilihan `Without Media`,
5. Kemudian pilih aplikasi Signal dan pilih kontak *User* yang dituju untuk tujuan eksport data tersebut.


Memindahkan data dalam Grup pada dasarnya sama dengan cara diatas,

1. Buka aplikasi Signal, dan buat sebuah Grup baru,
2. Tambahkan anggota ke dalam Grup (minimal 1 kontak), kemudian tap pada menu `⋮` pilih `Group
   Settings` dan gulir kebawah untuk mengaktifkan `Group Link`,
3. Aktifkan `Share Link` dan mulai membagikan tautan yang tersedia kepada anggota Grup sebelumnya,
4. Gunakan cara ekspor data seperti cara sebelumnya.

Sampai saat ini Signal belum memiliki *tools* untuk mengimpor data dari Whatsapp maupun dari
*messenger* yang lain, namun sudah ada aplikasi pihak ketiga yang bisa membantu proses ini meski
dengan pelbagai kekurangannya masing - masing.

Contohnya adalah [ChatMove](https://play.google.com/store/apps/details?id=com.imkapps.chatmove) atau
skrip Python
[ini](https://github.com/gillesvangestel/ConvertWhatsAppToSignal/blob/main/ConvertWhatsAppToSignal.py).

### Ekspor ke Telegram

Memindahkan data ke Telegram jauh lebih mudah daripada Signal, karena Telegram memiliki *tools*
khusus untuk ini. Yang harus dilakukan adalah sebagai berikut :

1. Ekspor data Whatsapp seperti cara diatas,
2. Pilih tujuan Telegram, kemudian pilih tujuan *User Account*nya,
3. Telegram akan otomatis mengimpor data dan menampilkannya seperti percakapan biasa. Bravo!.

Untuk Grup pun sama caranya.

### Ekspor ke BIP

BIP sebagai pendatang baru ternyata sudah menggarap fungsi impor data ini, targetnya memang jelas
"memindahkan pengguna Whatsapp ke BIP".

Proses ekspor data dari Whatsapp sama mudahnya dengan Telegram. Tinggal ekspor dan pilih aplikasi
BIP dan tuju akun kontaknya. Data akan ditampilkan secara `read only` di dalam layar pesan BIP.


### Kesimpulan

*Privacy Policy* Whatsapp terbaru memang menjadi penyakit yang menggerogoti privasi penggunanya dan
berpindah ke layanan lain jelas menjadi pilihan utama. 

Saya pribadi lebih memilih pindah ke Signal meski untuk urusan impor data masih keteteran
dibandingkan kompetitor. Harapannya adalah dalam waktu dekat Signal bisa merilis *tools* untuk impor
data dari Whatsapp.

Pilihan kedua yang lebih baik jatuh kepada BIP.

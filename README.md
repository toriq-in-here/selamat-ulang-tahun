# ulang tahun

Kado ulang tahun interaktif dalam **satu halaman** (`index.html`):

1. **Bagian 1** – nyalakan lampu, putar musik, banner, balon terbang, kue & lilin, lalu tulisan HBD dari balon.
2. **Bagian 2** – otomatis lanjut ke surat ucapan (animasi ketik), pertanyaan "Kamu suka nggak?", dan penutup.

## Struktur

| File | Isi |
|------|-----|
| `index.html` | Halaman gabungan bagian 1 + bagian 2 |
| `stylesheet.css`, `loading.css`, `cake.less`, `effect.js` | Bagian 1 |
| `stage2.css`, `stage2.js`, `img/`, `music/` | Bagian 2 |

## Cara lihat lewat GitHub Pages

1. Push repository ke GitHub.
2. Buka **Settings → Pages**.
3. Pada *Build and deployment*, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit, link akan muncul: `https://<username>.github.io/ulang-tahun/`

> Buka lewat link Pages (bukan klik dua kali `index.html`), karena `cake.less` dimuat lewat HTTP.

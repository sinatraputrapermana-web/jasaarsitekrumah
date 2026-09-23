# Performance & Accessibility System Rules - jasaarsitekrumah.web.id

## 1. Tool Execution & File Inspection Restrictions (WAJIB)
- DILARANG menggunakan terminal shell (PowerShell, CMD, Bash) HANYA untuk melihat, mencari, membaca, atau mendaftar isi file proyek.
- SELALU gunakan native file reading tool (`read_file`, `view`, atau pembaca file internal agent) saat memeriksa berkas kode proyek.
- Terminal shell HANYA boleh dipakai untuk build test atau commit/push git setelah ada instruksi.

## 2. Integrity & Non-Destructive Guardrails
- DILARANG merombak antarmuka (UI/UX), katalog portofolio arsitek, paket harga, atau tombol kontak WhatsApp. Tampilan dan fungsionalitas harus tetap 100% konsisten.
- DILARANG menghapus elemen HTML fungsional atau memindahkan direktori aset tanpa path yang valid.
- Seluruh intervensi harus bersifat surgical (hanya atribut HTML, CSS kontras/dimensi, kompresi aset gambar, defer script, dan resource hints).

## 3. Prioritas Masalah Berdasarkan Audit Terbaru

### A. Performance (Target Skor > 90)
1. Perbaikan FCP (Saat ini 2.5s) & Render-Blocking:
   - Identifikasi CSS dan JS eksternal yang memblokir rendering di `<head>`.
   - Pasang atribut `defer` pada seluruh file JS non-kritis.
   - Tambahkan resource hints (`preconnect` dan `dns-prefetch`) untuk CDN font atau library pihak ketiga.
2. Perbaikan LCP (Saat ini 3.1s) & Properly Size Images:
   - Identifikasi elemen LCP hero banner di area above-the-fold.
   - Tambahkan preload pada tag `<head>`: `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`.
   - HAPUS atribut `loading="lazy"` pada gambar hero banner.
   - Pasang `loading="lazy"` dan `decoding="async"` khusus untuk gambar portofolio/galeri yang berada di bawah fold (below-the-fold).
   - Pastikan dimensi render gambar sesuai dengan ukuran tampilannya (hindari menampilkan gambar beresolusi raksasa di container kecil).

### B. Accessibility / A11y (Target Skor > 95 dari saat ini 85)
1. Rasio Kontras Warna (Color Contrast):
   - Perbaiki elemen teks atau link abu-abu/terang yang kontrasnya tidak memenuhi standar WCAG AA (minimal 4.5:1 terhadap latar belakang).
2. Accessible Names & ARIA Labels:
   - Pastikan seluruh tombol ikon (tombol WhatsApp melayang, tombol navigasi slider/carousel, tombol menu hamburger) memiliki atribut `aria-label` yang jelas.
   - Pastikan setiap tag `<img>` memiliki atribut `alt` deskriptif yang relevan.
3. Heading Structure:
   - Pastikan hierarki heading terstruktur rapi (`<h1>` unik untuk judul utama, diikuti `<h2>`, `<h3>` tanpa loncatan level).

### C. Best Practices & SEO (Pertahankan Skor 100)
- Pertahankan validitas meta tags, canonical link, Open Graph, dan JSON-LD Structured Data yang sudah ada.

## 4. Output Protocol
- Sajikan setiap modifikasi kode dalam format diff patch (Before vs After) yang presisi beserta path file yang diubah.
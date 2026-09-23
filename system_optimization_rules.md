# Comprehensive Optimization Rules - jasaarsitekrumah.web.id

## 1. Tool Execution & Inspection Restrictions (WAJIB)
- DILARANG menggunakan terminal shell (PowerShell, CMD, atau Bash) HANYA untuk melihat, mencari, mendaftar, atau membaca isi file proyek.
- SELALU gunakan native file reading tool (`read_file`, `view`, atau file viewer internal agent) saat memeriksa berkas HTML, CSS, JS, maupun konfigurasi server.
- Terminal shell HANYA diizinkan untuk eksekusi build test, compile, atau git commands setelah ada persetujuan eksplisit.

## 2. Scope & Design Guardrails (Non-Negotiable)
- DILARANG merombak tata letak antarmuka (UI/UX), navigasi, galeri portofolio arsitek, daftar harga, form inquiry, atau tombol kontak WhatsApp.
- DILARANG mengganti struktur layout container dasar atau menghapus elemen visual yang sudah tampil.
- Seluruh intervensi harus bersifat surgical pada atribut tag HTML, penataan CSS (aspek rasio & kontras), meta tags, accessibility hooks, dan script loading strategy.

## 3. Pilar Optimasi Teknis

### A. Performance & Core Web Vitals (Target Skor: > 90)
1. Cumulative Layout Shift (CLS):
   - Pasang atribut eksplisit `width` dan `height` atau inline CSS `aspect-ratio` pada seluruh tag `<img>`, embed iframe (Google Maps/YouTube), dan slider portofolio.
   - Siapkan container dengan fixed `min-height` untuk hero banner dan galeri agar tidak mendorong layout saat aset selesai diunduh.
   - Sertakan `font-display: swap` pada setiap deklarasi custom font (@font-face / Google Fonts).
2. Largest Contentful Paint (LCP):
   - Preload gambar hero banner above-the-fold di tag `<head>`:
     `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`
   - Pastikan gambar hero di atas fold TIDAK memiliki atribut `loading="lazy"`. Terapkan `loading="lazy"` dan `decoding="async"` hanya pada portofolio di bawah fold.
3. Render-Blocking & Main Thread (FCP / TBT):
   - Tambahkan atribut `defer` pada seluruh script JavaScript eksternal non-kritis.
   - Terapkan `preconnect` dan `dns-prefetch` untuk domain pihak ketiga (CDN fonts, WhatsApp API, analitik).

### B. Accessibility (A11y) (Target Skor: > 90)
- Teks Alternatif (`alt`): Pastikan setiap tag `<img>` memiliki atribut `alt` deskriptif yang relevan dengan portofolio arsitektur (hindari `alt=""` kosong pada gambar konten).
- Rasio Kontras Warna: Pastikan kontras teks terhadap warna latar belakang memenuhi standar WCAG AA (minimal 4.5:1 untuk teks normal).
- Tombol & Link Terbuka: Tambahkan `aria-label` deskriptif pada elemen interaktif yang hanya berupa ikon (misal: tombol hamburger menu, floating button WhatsApp, tombol close/prev/next slider).
- Hierarki Heading: Pastikan urutan tag heading logis (`<h1>` tunggal, diikuti `<h2>`, `<h3>` tanpa lompatan hierarki).

### C. Search Engine Optimization (SEO) (Target Skor: > 90)
- Meta Tags Kritis: Pastikan terdapat `<title>` unik, `<meta name="description" content="...">` yang menarik, dan `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Canonical & Open Graph: Tambahkan `<link rel="canonical" href="https://jasaarsitekrumah.web.id/">` serta tag OG dasar (`og:title`, `og:description`, `og:image`, `og:url`).
- Tautan Anchor: Pastikan seluruh tag `<a>` memiliki anchor text yang jelas dan deskriptif (hindari teks generik seperti "klik di sini" tanpa konteks).
- Structured Data (Schema.org): Tambahkan JSON-LD schema untuk `LocalBusiness` / `ProfessionalService` yang mencakup nama bisnis, layanan arsitek, dan kontak.

## 4. Output Protocol
- Sajikan setiap perbaikan kode dalam format diff patch (Before vs After) yang presisi beserta path file yang diubah.
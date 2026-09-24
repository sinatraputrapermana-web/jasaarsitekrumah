# Antigravity Critical Performance, A11y, & Agentic Browsing Rules - jasaarsitekrumah.web.id

## 1. Tool Execution & File Inspection Restrictions (WAJIB)
- DILARANG menggunakan terminal shell (PowerShell, CMD, Bash) HANYA untuk melihat, mencari, membaca, atau mendaftar isi file proyek.
- SELALU gunakan native file reading tool (`read_file`, `view`, atau pembaca file internal editor/agent) saat menginspeksi kode sumber proyek.
- Terminal shell HANYA diizinkan untuk eksekusi build test atau operasi git setelah ada konfirmasi eksplisit.

## 2. Scope & Design Guardrails
- DILARANG merombak tata letak visual (UI/UX), katalog portofolio arsitektur, daftar paket harga, maupun tombol kontak WhatsApp. Tampilan dan fungsionalitas harus tetap 100% konsisten.
- DILARANG menghapus elemen HTML fungsional atau memindahkan direktori aset tanpa path yang valid.
- Semua optimasi harus bersifat surgical pada atribut HTML, penataan CSS (kontras & critical path), loading strategy, JSON-LD Schema, dan script deferring.

## 3. Prioritas Masalah Kritis Audit Terbaru

### A. LCP & Main-Thread Recovery (Target: LCP < 2.5s, TBT < 200ms)
1. Perbaikan Gambar LCP:
   - Pastikan path file gambar hero di tag `<head>` valid dan memiliki prioritas tertinggi:
     `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`
   - DILARANG memasang atribut `loading="lazy"` pada gambar hero banner di viewport atas.
   - Pasang `loading="lazy"` dan `decoding="async"` HANYA pada gambar portofolio/galeri di bawah viewport (below-the-fold).
   - Pastikan ukuran fisik gambar hero dioptimasi (format WebP, lebar maksimal 800-1000px untuk versi mobile).
2. Pangkas TBT (Total Blocking Time 480ms):
   - Tambahkan atribut `defer` pada seluruh script JavaScript eksternal di tag `<head>`.
   - Hindari eksekusi script animasi/slider berat sebelum first paint selesai.

### B. Pemulihan Agentic Browsing (Target: Pulih ke 1/1 Hijau)
1. Semantic Document Tree:
   - Pastikan struktur HTML membungkus konten utama menggunakan tag `<main role="main">`, header dengan `<header>`, navigasi dengan `<nav>`, dan footer dengan `<footer>`.
2. Structured Data (Schema.org):
   - Sisipkan blok `<script type="application/ld+json">` yang valid dengan tipe `ProfessionalService` atau `HomeAndConstructionBusiness` lengkap dengan nama bisnis, URL canonical, kontak WhatsApp, dan deskripsi layanan.
3. Machine-Readable Actions:
   - Pastikan semua elemen interaktif (tombol WhatsApp, tombol form, tautan) memiliki label eksplisit atau `aria-label` yang dapat dipahami bot AI browsing.

### C. FCP & Render-Blocking (Target: FCP < 1.8s)
- Pasang `preconnect` dan `dns-prefetch` untuk domain pihak ketiga (Google Fonts, CDN).
- Pastikan Critical CSS untuk komponen viewport atas di-inline atau dimuat tanpa memblokir parsing HTML.

### D. Accessibility / A11y (Target: > 95 dari saat ini 89)
- Gelapkan teks sekunder/abu-abu pudar agar rasio kontras terhadap latar belakang memenuhi standar WCAG AA (minimal 4.5:1).
- Pastikan setiap tombol ikon (floating WhatsApp, hamburger menu, slider) memiliki atribut `aria-label` deskriptif.
- Pastikan seluruh tag `<img>` memiliki atribut `alt` deskriptif.

## 4. Output Protocol
- Sajikan setiap perbaikan kode dalam format diff patch (Before vs After) yang presisi beserta path file yang diubah.
# Antigravity Critical Performance, A11y, & Agentic Browsing Rules - jasaarsitekrumah.web.id

## 1. Tool Execution Constraints (MANDATORY)
- DILARANG menggunakan terminal shell (PowerShell, CMD, Bash) HANYA untuk melihat, mencari, membaca, atau mendaftar isi file proyek.
- SELALU gunakan native file reading tool (`read_file`, `view`, atau pembaca file internal agent) saat memeriksa berkas kode proyek.
- Terminal shell HANYA diizinkan untuk eksekusi build test atau operasi git setelah mendapat izin.

## 2. Scope & Design Guardrails
- DILARANG merombak antarmuka (UI/UX), katalog portofolio arsitek, daftar paket, maupun fungsionalitas tombol WhatsApp. Tampilan dan fungsionalitas harus tetap 100% konsisten.
- DILARANG menghapus elemen HTML fungsional atau memindahkan direktori aset tanpa path yang valid.
- Semua optimasi harus bersifat surgical pada atribut HTML, penataan CSS (kontras & critical path), loading strategy, JSON-LD Schema, dan resource hints.

## 3. Prioritas Masalah Kritis Audit Terbaru

### A. LCP Emergency Recovery (Target: Turunkan dari 8.1s ke < 2.5s)
1. Preload Gambar Hero Banner:
   - Pastikan path file gambar hero di tag `<head>` valid:
     `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`
   - DILARANG memasang `loading="lazy"` pada gambar hero banner viewport atas.
   - Pasang `loading="lazy"` dan `decoding="async"` HANYA pada gambar portofolio/galeri di bawah viewport (below-the-fold).
2. Optimasi Ukuran Gambar (Properly Size Images):
   - Pastikan resolusi asli aset gambar hero tidak berukuran raksasa jika hanya ditampilkan di layar mobile.

### B. Pemulihan Agentic Browsing (Target: Pulih ke 1/1 Hijau)
1. Semantic Document Tree:
   - Pastikan struktur HTML membungkus konten utama menggunakan tag `<main role="main">`, header dengan `<header>`, navigasi dengan `<nav>`, dan footer dengan `<footer>`.
2. Structured Data (Schema.org):
   - Sisipkan blok `<script type="application/ld+json">` yang valid dengan tipe `ProfessionalService` atau `HomeAndConstructionBusiness` lengkap dengan nama bisnis, URL canonical, nomor kontak WhatsApp, dan deskripsi layanan.
3. Machine-Readable Actions:
   - Pastikan semua elemen interaktif (tombol WhatsApp, tombol form, tautan) memiliki label eksplisit atau `aria-label` yang dapat dipahami oleh AI Browsing agent.

### C. FCP & Render-Blocking (Target: < 1.8s)
- Pasang atribut `defer` pada seluruh file JavaScript eksternal di `<head>`.
- Tambahkan `preconnect` dan `dns-prefetch` untuk domain pihak ketiga (CDN fonts, WhatsApp API).
- Pastikan Critical CSS untuk bagian paling atas halaman dimuat seawal mungkin.

### D. Accessibility / A11y (Target: > 95 dari saat ini 89)
- Gelapkan teks sekunder/abu-abu pudar agar rasio kontras terhadap latar belakang memenuhi standar WCAG AA (minimal 4.5:1).
- Pastikan setiap tombol ikon (floating WhatsApp, hamburger menu, slider) memiliki atribut `aria-label` deskriptif.
- Pastikan seluruh tag `<img>` memiliki atribut `alt` deskriptif.

## 4. Output Protocol
- Sajikan setiap perbaikan kode dalam format diff patch (Before vs After) yang presisi beserta path file yang diubah.
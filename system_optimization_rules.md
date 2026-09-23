# High-Priority Performance & Accessibility Rules - jasaarsitekrumah.web.id

## 1. Tool Execution & File Inspection Restrictions (WAJIB)
- DILARANG menggunakan terminal shell (PowerShell, CMD, Bash) HANYA untuk melihat, mencari, membaca, atau mendaftar isi file proyek.
- SELALU gunakan native file reading tool (`read_file`, `view`, atau pembaca file internal agent) saat memeriksa kode sumber proyek.
- Terminal shell HANYA diizinkan untuk eksekusi build test atau operasi git setelah ada konfirmasi.

## 2. Integrity & Visual Guardrails
- DILARANG merombak tata letak visual (UI/UX), katalog portofolio arsitektur, daftar paket, maupun fungsionalitas tombol WhatsApp. Tampilan dan fungsionalitas harus tetap 100% konsisten.
- DILARANG menghapus elemen HTML fungsional atau memindahkan direktori aset tanpa path yang valid.
- Semua optimasi harus bersifat surgical pada atribut HTML, penataan CSS (kontras & critical path), loading strategy, dan resource hints.

## 3. Prioritas Masalah Kritis Audit Terbaru

### A. Performance Recovery (Target Skor > 90 dari saat ini 67)
1. Eliminasi Render-Blocking (Atasi FCP 2.8s):
   - Tambahkan atribut `defer` pada seluruh file JavaScript eksternal di tag `<head>`.
   - Inline-kan Critical CSS untuk komponen above-the-fold (header, navbar, hero section) di dalam tag `<style>` pada `<head>`.
   - Defer stylesheet non-kritis atau muat asinkron menggunakan pattern `onload="this.rel='stylesheet'"`.
   - Pasang `preconnect` dan `dns-prefetch` pada domain pihak ketiga (CDN fonts, analitik).

2. Akselerasi LCP (Atasi LCP 3.4s & Properly Size Images):
   - Identifikasi gambar hero banner utama di viewport atas.
   - Tambahkan di tag `<head>`: `<link rel="preload" as="image" href="[path-gambar-hero]" fetchpriority="high">`.
   - HAPUS atribut `loading="lazy"` pada gambar hero tersebut.
   - Terapkan `loading="lazy"` dan `decoding="async"` HANYA pada portofolio di bawah viewport (below-the-fold).
   - Pastikan gambar tidak di-load dengan resolusi raksasa jika hanya ditampilkan dalam container kecil.

### B. Accessibility / A11y (Target Skor > 95 dari saat ini 89)
1. Perbaikan Kontras Warna (Contrast Ratio):
   - Cari elemen teks atau tautan dengan warna abu-abu pudar. Ganti nilai heksadesimalnya agar kontras terhadap latar belakangnya mencapai minimal 4.5:1 (standar WCAG AA).
2. Accessible Names & ARIA Labels:
   - Tambahkan atribut `aria-label` deskriptif pada seluruh elemen tombol/link interaktif yang tidak memiliki teks (misal: tombol floating WhatsApp, tombol menu hamburger, tombol slider panah).
   - Pastikan seluruh tag `<img>` memiliki teks alternatif `alt` deskriptif yang relevan dengan arsitektur rumah.

### C. Best Practices & SEO (Pertahankan Skor 100)
- Jangan ubah meta tags, canonical link, Open Graph, dan JSON-LD schema yang sudah berstatus sempurna.

## 4. Output Protocol
- Sajikan setiap perbaikan kode dalam format diff patch (Before vs After) yang presisi beserta path file yang diubah.
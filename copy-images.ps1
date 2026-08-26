# Script untuk menyalin gambar ke folder assets/img
# Jalankan script ini dari PowerShell di folder project

$sourcePath = "C:\Users\Dani Pratama\.gemini\antigravity-ide\brain\505fc5aa-f5b2-43f1-9ca8-fbf540526745"
$destPath   = "d:\laragon\www\jasa_arsitek_rumah\assets\img"

$files = @(
    @{ Src = "hero_house_1787668427345.jpg";     Dest = "hero-house.jpg" },
    @{ Src = "gallery_minimalis_1787668450897.jpg"; Dest = "gallery-minimalis.jpg" },
    @{ Src = "gallery_modern_1787668464070.jpg";   Dest = "gallery-modern.jpg" }
)

foreach ($file in $files) {
    $src  = Join-Path $sourcePath $file.Src
    $dest = Join-Path $destPath   $file.Dest
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Force
        Write-Host "Copied: $($file.Dest)" -ForegroundColor Green
    } else {
        Write-Host "Not found: $($file.Src)" -ForegroundColor Red
    }
}

Write-Host "`nSelesai! Gambar berhasil disalin." -ForegroundColor Cyan

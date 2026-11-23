# FleetTrack Nexa v2 — Design System & UI Guide (HTML Prototype)

> **Versi Prototipe:** Murni **HTML5 + Tailwind CSS (CDN) + Lucide Icons**.  
> **Tanpa TSX / React / Next.js / Bundler.** Siap pakai dan disesuaikan langsung dengan dokumen arsitektur:  
> [Konsep v2 - Monitoring Mobil Dinas & Safety](../../Obsidian%20Vault/FleetTrack/07%20-%20Roadmap%20&%20Planning/Konsep%20v2%20-%20Monitoring%20Mobil%20Dinas%20&%20Safety.md).

---

## 1. Ringkasan & Arsitektur Teknis

* **Domain Produk:** Sistem Monitoring Mobil Dinas & Safety (Bus, Hiace, Mobil Operasional) berbasis kesiapan operasional 4-level dan *three lines of defense*.
* **Tech Stack Prototipe:**
  * **HTML5:** Struktur semantik standar di setiap file `.html`.
  * **Tailwind CSS via CDN:** `<script src="https://cdn.tailwindcss.com"></script>` dengan konfigurasi font `Plus Jakarta Sans` dan `JetBrains Mono`.
  * **Lucide Icons via CDN:** `<script src="https://unpkg.com/lucide@latest"></script>` dengan inisialisasi `lucide.createIcons();` di akhir body.
  * **Font Eksternal:** Google Fonts (`Plus Jakarta Sans` 400-800 dan `JetBrains Mono` 400-700).
* **Target Pengguna:** 5 Peran (Super Admin, Admin, Manager, Auditor, Executive) + Alur Driver Lapangan.

---

## 2. Struktur Dasar Shell Halaman (HTML Boilerplate)

Setiap halaman di `polosan-nexa-v2` mengikuti pola 3 bagian: **Sidebar Navigasi Tetap (`#222845`)**, **Header Sticky Putih (`h-14`)**, dan **Canvas Konten (`bg-[#f5f7fb]`)**.

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nama Halaman - FleetTrack Nexa v2</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#f5f7fb] text-[#111827] min-h-screen flex antialiased font-sans">

  <!-- Mobile Backdrop -->
  <div id="sidebar-backdrop" class="fixed inset-0 bg-black/50 z-40 lg:hidden hidden transition-opacity duration-300"></div>

  <!-- Sidebar -->
  <aside id="sidebar" class="fixed inset-y-0 left-0 z-50 w-64 bg-[#222845] text-white/85 flex flex-col transition-all duration-300 -translate-x-full lg:translate-x-0 shrink-0">
    <!-- Logo & Navigation Links -->
  </aside>

  <!-- Main Content Wrapper -->
  <div class="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
    <!-- Top Header Sticky -->
    <header class="h-14 bg-white border-b border-[#e4e8f0] sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      <!-- Breadcrumb, Notifications & User Dropdown -->
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto">
      <!-- Content here -->
    </main>
  </div>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>
```

---

## 3. Sistem Warna (Palet Resmi & Token Kelas)

### A. Palet Brand & Netral
| Peruntukan | Kode Hex | Kelas Tailwind |
|---|---|---|
| Canvas Background | `#f5f7fb` | `bg-[#f5f7fb]` |
| Card Background | `#ffffff` | `bg-white` |
| Sidebar Background | `#222845` | `bg-[#222845]` |
| Sidebar Active Item | `#2e3660` / Gradien Biru | `bg-blue-600 text-white` atau `bg-[#2e3660]` |
| Border Standard | `#e4e8f0` | `border-[#e4e8f0]` |
| Border Input / Focused | `#d0d6e8` / `#2563eb` | `border-[#d0d6e8] focus:border-[#2563eb]` |
| Text Primary (Utama) | `#111827` | `text-[#111827]` |
| Text Body (Deskripsi) | `#4b5675` | `text-[#4b5675]` |
| Text Muted / Label | `#9aa3bf` / `#64748b` | `text-[#64748b]` atau `text-[#9aa3bf]` |
| Action Blue (Brand) | `#2563eb` | `bg-[#2563eb] hover:bg-[#1d4ed8] text-white` |

---

### B. Palet Status Kesiapan 4-Level (Wajib & Konsisten)

Hindari status biner "sehat/tidak sehat". Gunakan kombinasi badge: **Background Lembut + Teks Pekat + Border Tipis + Indikator Titik (Dot)**.

#### 1. Status Kendaraan
```html
<!-- 1. SIAP JALAN (Hijau) -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
  <span class="size-1.5 rounded-full bg-emerald-500"></span>
  SIAP JALAN
</span>

<!-- 2. SIAP DENGAN CATATAN (Kuning / Amber) -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
  <span class="size-1.5 rounded-full bg-amber-500"></span>
  SIAP DENGAN CATATAN
</span>

<!-- 3. TIDAK SIAP JALAN (Merah / Hard Fail) -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
  <span class="size-1.5 rounded-full bg-rose-500"></span>
  TIDAK SIAP JALAN
</span>

<!-- 4. BELUM DINILAI (Abu-abu) -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
  <span class="size-1.5 rounded-full bg-slate-400"></span>
  BELUM DINILAI
</span>
```

#### 2. Status Driver
```html
<!-- 1. SIAP BERTUGAS (Hijau) -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
  <span class="size-1.5 rounded-full bg-emerald-500"></span>
  SIAP BERTUGAS
</span>

<!-- 2. SIAP DENGAN PEMANTAUAN (Kuning) -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
  <span class="size-1.5 rounded-full bg-amber-500"></span>
  SIAP DENGAN PEMANTAUAN
</span>

<!-- 3. TIDAK SIAP BERTUGAS (Merah) -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
  <span class="size-1.5 rounded-full bg-rose-500"></span>
  TIDAK SIAP BERTUGAS
</span>

<!-- 4. BELUM DEKLARASI (Abu-abu) -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
  <span class="size-1.5 rounded-full bg-slate-400"></span>
  BELUM DEKLARASI
</span>
```

#### 3. Status Dokumen & Severity Kasus Auditor
* **Dokumen:**
  * `LENGKAP`: `bg-emerald-50 text-emerald-700 border-emerald-200`
  * `HAMPIR KEDALUWARSA (≤60 hari)`: `bg-amber-50 text-amber-700 border-amber-200`
  * `KEDALUWARSA`: `bg-rose-50 text-rose-700 border-rose-200`
* **Kasus Temuan (`cases`):**
  * `CRITICAL / HARD FAIL`: `bg-rose-100 text-rose-800 border-rose-300 font-extrabold`
  * `HIGH`: `bg-orange-50 text-orange-700 border-orange-200 font-bold`
  * `MEDIUM`: `bg-amber-50 text-amber-700 border-amber-200 font-medium`
  * `LOW / RESOLVED`: `bg-slate-100 text-slate-600 border-slate-200`

---

## 4. Tipografi & Ikonografi

### A. Hirarki Teks
* **Page Title:** `<h1 class="text-xl sm:text-2xl font-bold text-[#111827]">`
* **Page Subtitle:** `<p class="text-xs text-[#64748b] mt-0.5">`
* **Card Section Header:** `<h2 class="text-sm font-bold text-[#111827]">`
* **KPI Label:** `<div class="text-[11px] font-bold uppercase tracking-wider text-[#9aa3bf]">`
* **KPI Value:** `<div class="text-2xl font-extrabold text-[#111827] tracking-tight font-mono">`
* **Table Header (TH):** `<th class="px-4 py-3 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider bg-[#f8f9fc]">`
* **Table Cell (TD):** `<td class="px-4 py-3 text-xs text-[#4b5675]">`

### B. Ukuran Lucide Icon
* Menu Sidebar & Tombol Standar: `class="size-4"`
* Icon Box pada KPI Card: `class="size-5"` di dalam wadah `size-10 rounded-lg flex items-center justify-center`
* Action Table Icon Button: `class="size-3.5"`

---

## 5. Katalog Komponen HTML Baku

### 1. Kartu KPI Standar (Kesiapan Operasional)
```html
<div class="bg-white border border-[#e4e8f0] rounded-[10px] p-4 sm:p-5 flex items-center justify-between shadow-xs">
  <div>
    <span class="text-[11px] font-bold uppercase tracking-wider text-[#9aa3bf]">Armada Siap Jalan</span>
    <div class="flex items-baseline gap-2 mt-1.5">
      <span class="text-2xl font-extrabold text-[#111827] font-mono">38</span>
      <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">90.4%</span>
    </div>
    <span class="text-[11px] text-[#64748b] mt-1 block">Dari total 42 armada dinas aktif</span>
  </div>
  <div class="size-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
    <i data-lucide="check-circle-2" class="size-5"></i>
  </div>
</div>
```

### 2. Kartu KPI Peringatan Hard Fail (Merah Kritis)
```html
<div class="bg-rose-50/50 border border-rose-200 rounded-[10px] p-4 sm:p-5 flex items-center justify-between shadow-xs">
  <div>
    <span class="text-[11px] font-bold uppercase tracking-wider text-rose-700">Diblokir (Hard Fail)</span>
    <div class="flex items-baseline gap-2 mt-1.5">
      <span class="text-2xl font-extrabold text-rose-800 font-mono">3</span>
      <span class="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">Tindakan Segera</span>
    </div>
    <span class="text-[11px] text-rose-600 mt-1 block font-medium">2 Rem gagal, 1 KIR habis</span>
  </div>
  <div class="size-11 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
    <i data-lucide="alert-octagon" class="size-5"></i>
  </div>
</div>
```

### 3. Tabel Data Standar
```html
<div class="bg-white border border-[#e4e8f0] rounded-[10px] overflow-hidden shadow-xs">
  <!-- Table Toolbar -->
  <div class="p-4 border-b border-[#e4e8f0] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fcfdfe]">
    <div class="relative w-full sm:w-72">
      <i data-lucide="search" class="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3bf]"></i>
      <input type="text" placeholder="Cari plat nomor, driver, tipe..." class="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#d0d6e8] rounded-md focus:outline-none focus:border-[#2563eb]">
    </div>
    <div class="flex items-center gap-2 w-full sm:w-auto">
      <select class="px-3 py-1.5 text-xs bg-white border border-[#d0d6e8] rounded-md text-[#4b5675] focus:outline-none focus:border-[#2563eb]">
        <option>Semua Status</option>
        <option>Siap Jalan</option>
        <option>Siap Dengan Catatan</option>
        <option>Tidak Siap Jalan</option>
        <option>Belum Dinilai</option>
      </select>
      <button class="px-3 py-1.5 text-xs font-semibold bg-[#2563eb] text-white rounded-md hover:bg-[#1d4ed8] flex items-center gap-1.5 shrink-0">
        <i data-lucide="plus" class="size-3.5"></i> Tambah
      </button>
    </div>
  </div>

  <!-- Table Body -->
  <div class="overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b border-[#e4e8f0] bg-[#f8f9fc]">
          <th class="px-4 py-3 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Kendaraan</th>
          <th class="px-4 py-3 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Unit Kerja / Pool</th>
          <th class="px-4 py-3 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Odometer</th>
          <th class="px-4 py-3 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Status Kesiapan</th>
          <th class="px-4 py-3 text-left text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Catatan Masalah</th>
          <th class="px-4 py-3 text-right text-[11px] font-bold text-[#64748b] uppercase tracking-wider">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-[#f1f3f9] text-xs">
        <tr class="hover:bg-[#f8f9fc] transition-colors">
          <td class="px-4 py-3 font-semibold text-[#111827]">
            <div>Bus B 7890 BAA</div>
            <div class="text-[11px] font-normal text-[#64748b]">Mercedes-Benz OH 1626</div>
          </td>
          <td class="px-4 py-3 text-[#4b5675]">Pool Transportasi Pusat</td>
          <td class="px-4 py-3 font-mono text-[#111827]">48.120 km</td>
          <td class="px-4 py-3">
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              <span class="size-1.5 rounded-full bg-rose-500"></span> TIDAK SIAP JALAN
            </span>
          </td>
          <td class="px-4 py-3 text-rose-600 font-medium">Rem utama bocor angin (Hard Fail)</td>
          <td class="px-4 py-3 text-right">
            <button class="p-1.5 text-[#64748b] hover:text-[#2563eb] rounded hover:bg-white border border-transparent hover:border-[#d0d6e8]">
              <i data-lucide="eye" class="size-3.5"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="p-3 border-t border-[#e4e8f0] flex items-center justify-between text-xs text-[#64748b] bg-white">
    <span>Menampilkan 1-10 dari 42 data</span>
    <div class="flex items-center gap-1">
      <button class="px-2.5 py-1 border border-[#d0d6e8] rounded hover:bg-[#f5f7fb]" disabled>Sebelumnya</button>
      <button class="px-2.5 py-1 border border-[#2563eb] bg-[#2563eb] text-white rounded font-medium">1</button>
      <button class="px-2.5 py-1 border border-[#d0d6e8] rounded hover:bg-[#f5f7fb]">2</button>
      <button class="px-2.5 py-1 border border-[#d0d6e8] rounded hover:bg-[#f5f7fb]">Berikutnya</button>
    </div>
  </div>
</div>
```

### 4. Tombol Standar (Buttons)
```html
<!-- Primary Action -->
<button class="px-3.5 py-2 text-xs font-semibold bg-[#2563eb] text-white rounded-md hover:bg-[#1d4ed8] transition-colors flex items-center gap-2">
  <i data-lucide="check" class="size-4"></i> Setujui Pengajuan
</button>

<!-- Secondary / Outline -->
<button class="px-3.5 py-2 text-xs font-semibold bg-white border border-[#d0d6e8] text-[#4b5675] rounded-md hover:bg-[#f8f9fc] hover:text-[#111827] transition-colors flex items-center gap-2">
  <i data-lucide="x" class="size-4"></i> Batalkan
</button>

<!-- Danger Action -->
<button class="px-3.5 py-2 text-xs font-semibold bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors flex items-center gap-2">
  <i data-lucide="ban" class="size-4"></i> Blokir Kendaraan
</button>
```

### 5. Formulir & Upload Bukti Fisik (Nota/Bengkel/Dokumen)
```html
<div class="bg-white border border-[#e4e8f0] rounded-[10px] p-5 space-y-4">
  <h3 class="text-sm font-bold text-[#111827]">Catat Perawatan Kendaraan</h3>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label class="block text-xs font-bold text-[#4b5675] mb-1">Bengkel Pelaksana</label>
      <input type="text" class="w-full px-3 py-2 text-xs border border-[#d0d6e8] rounded-md focus:outline-none focus:border-[#2563eb]" placeholder="Nama bengkel resmi / rekanan">
    </div>
    <div>
      <label class="block text-xs font-bold text-[#4b5675] mb-1">Odometer Terkini (km)</label>
      <input type="number" class="w-full px-3 py-2 text-xs border border-[#d0d6e8] rounded-md focus:outline-none focus:border-[#2563eb]" placeholder="Contoh: 45000">
    </div>
  </div>

  <!-- Area Upload Bukti Wajib -->
  <div>
    <label class="block text-xs font-bold text-[#4b5675] mb-1">Upload Bukti Nota & Foto Fisik <span class="text-rose-500">*wajib</span></label>
    <div class="border-2 border-dashed border-[#d0d6e8] hover:border-[#2563eb] rounded-lg p-5 text-center bg-[#fcfdfe] transition-colors cursor-pointer">
      <i data-lucide="upload-cloud" class="size-6 text-[#9aa3bf] mx-auto mb-1.5"></i>
      <div class="text-xs font-medium text-[#111827]">Klik untuk upload atau seret file nota servis</div>
      <div class="text-[11px] text-[#64748b] mt-0.5">JPG, PNG atau PDF maks. 5MB</div>
    </div>
  </div>
</div>
```

### 6. Frame Mobile Simulasi Driver (`driver-mobile.html`)
Khusus simulasi tampilan Driver, gunakan container bingkai smartphone di tengah layar:
```html
<div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
  <!-- Phone Frame Mockup -->
  <div class="w-full max-w-[390px] h-[780px] bg-[#f5f7fb] rounded-[36px] shadow-2xl border-[8px] border-slate-800 flex flex-col overflow-hidden relative">
    
    <!-- Phone Top Notch -->
    <div class="h-6 bg-slate-800 flex items-center justify-between px-6 text-[10px] text-white">
      <span>09:41</span>
      <div class="flex items-center gap-1.5">
        <i data-lucide="wifi" class="size-3"></i>
        <i data-lucide="battery" class="size-3"></i>
      </div>
    </div>

    <!-- Mobile Screen Content -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Fit-to-Drive / Checklist Content -->
    </div>

    <!-- Phone Bottom Navigation Bar -->
    <nav class="h-14 bg-white border-t border-[#e4e8f0] grid grid-cols-4 items-center text-[10px] text-[#64748b]">
      <!-- Tab icons -->
    </nav>
  </div>
</div>
```

---

## 6. Checklist Kepatuhan Konsep v2

Sebelum menyatakan halaman selesai:
* [ ] **Bukan Biner:** Tidak ada badge bertuliskan "Sehat", "Sakit", atau "Driver Lelah".
* [ ] **Hard Fail Visual:** Kendaraan dengan temuan kritis langsung tampil dengan badge merah `TIDAK SIAP JALAN` dan tombol penugasan dinonaktifkan (`disabled cursor-not-allowed`).
* [ ] **Pemisahan Peran:** Halaman Admin **tidak memiliki tombol verifikasi/approval** servis (hanya input + simpan). Tombol verifikasi hanya ada di halaman Manager.
* [ ] **Bebas TSX/Build:** File berekstensi murni `.html` dan dapat langsung dibuka di browser tanpa menjalankan server Node.js.
* [ ] **Inisialisasi Ikon:** Script `<script>lucide.createIcons();</script>` berada tepat sebelum tag penutup `</body>`.

---
*FleetTrack Nexa v2 Design System — Pure HTML Edition.*

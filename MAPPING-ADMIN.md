# Mapping Halaman Admin — Polosan vs Prototipe Dosen

> **Dibandingkan:**
> - **Polosan:** `polosan-nexa-v2` branch `origin/main` (`ec4215b`, setelah PR #3 *add-data-admin*) — 10 halaman admin.
> - **Dosen:** `fleettrack_admin_v8_terintegrasi.html` — 13 menu.
> - **Masukan tambahan:** Sindu (2 poin, lihat bagian 1).
>
> Dibuat 2026-11-25. Status: usulan, belum diputuskan tim.

## Prinsip dari versi dosen

- **Admin = pengelola aset & administrasi.** Keputusan penugasan kendaraan/driver tetap di **Manager**.
- Data perjalanan milik modul operasional (Manager); di Admin hanya **dilihat (read-only)**.
- Kendaraan dibagi **Pool** (dilacak GPS, dipakai bergantian) dan **Melekat** (ditugaskan tetap ke pejabat, dikelola sebagai aset saja).
- Selaras dengan model kesiapan 4-level di `task.md`.

---

## 1. Masukan Sindu

### 1.1 Riwayat pemakaian mobil (siapa saja yang memakai)

| | |
|---|---|
| **Masalah** | Detail Mobil Dinas (`admin-fleet.html`) hanya berisi tabel dokumen. Tidak bisa melihat siapa yang terakhir memakai mobil, sehingga kerusakan minor (mis. ban rusak) tidak bisa ditelusuri. |
| **Di versi dosen** | *Odometer & Riwayat Penggunaan* (tab Riwayat Operasional), tab Perjalanan & Pemeriksaan di detail kendaraan, dan "Riwayat Pasangan" (jumlah trip per driver per mobil). |
| **Usulan** | Tab **Riwayat Pemakaian** di detail Mobil Dinas. Kolom: tanggal, driver, tujuan, km awal–akhir, hasil checklist pra-trip & pasca-trip, temuan (mis. "ban kanan depan aus"). |
| **Sumber data** | Checklist pra/pasca-trip dari `driver-mobile.html` + data perjalanan dari Manager. Read-only di Admin. |
| **Manfaat** | Temuan kerusakan bisa dikaitkan ke driver & perjalanan terakhir; jadi bahan tindak lanjut ke Perawatan. |

### 1.2 Detail lampiran di Riwayat Perawatan

| | |
|---|---|
| **Masalah** | Kolom "Bukti" di `admin-maintenance.html` hanya ikon statis (tooltip "Nota & foto pengerjaan terlampir"), tidak bisa diklik. File yang terlampir tidak bisa dilihat. |
| **Di versi dosen** | *Digital Service Book* — bukti pekerjaan disimpan per servis. |
| **Usulan** | Baris riwayat bisa diklik → drawer/modal detail: data servis (bengkel, jenis, odometer, biaya, servis berikutnya), preview **foto nota** & **foto pengerjaan** (perbesar + unduh), status verifikasi Manager, catatan revisi bila "Perlu Revisi". |

---

## 2. Mapping halaman

Format: **Page yang udah ada | Page dari bapaknya | Sekiranya yang bakal masuk**

### 2.1 Halaman yang sudah ada di polosan

| Page yang udah ada | Page dari bapaknya | Sekiranya yang bakal masuk |
|---|---|---|
| **Dashboard** (`admin.html`) — total user/armada/driver, distribusi role, log aktivitas | **Dashboard Aset** — 5 seksi: Ringkasan Sumber Daya, Intensitas Pemanfaatan 7 hari, Kondisi & Administrasi Armada, Kondisi & Administrasi Pengemudi, Tindak Lanjut Admin | Fokus ke aset: kondisi armada, jatuh tempo servis & dokumen, daftar tindak lanjut. Distribusi role & log aktivitas pindah ke Manajemen Pengguna. Intensitas 7 hari opsional (butuh data GPS). |
| **Tipe Mobil Dinas** (`admin-fleet-type.html`) | — (tipe jadi atribut kendaraan) | Tetap sebagai master kecil. |
| **Data Mobil Dinas** (`admin-fleet.html`) — kendaraan, unit kerja/pool, odometer, status kesiapan, catatan; modal detail dokumen | **Data Kendaraan** — kategori Pool/Melekat, pemegang, kondisi, VIN/mesin/BBM, dokumen STNK/pajak/asuransi; detail bertab (Ringkasan, Odometer, Perjalanan, Pemeriksaan, Servis, Penempatan) | Modal → **halaman detail bertab**: Ringkasan, Dokumen, **Riwayat Pemakaian (Sindu 1.1)**, Perawatan, Odometer. Tambah field kategori Pool/Melekat, pemegang, VIN/no. mesin, jenis BBM. |
| **Data Driver** (`admin-driver.html`) — list + detail (SIM, kontak, performa & keamanan) | **Data Pengemudi** — kartu berfoto; tab Daftar, Dokumen & SIM, Kompetensi, Pemeriksaan Kesehatan, Pengajuan Mobile; profil bertab (Identitas, SIM, Kompetensi, Pemeriksaan, Penempatan, Tindak Lanjut, Riwayat) | Tambah tab Dokumen, Kompetensi, Pemeriksaan Kesehatan, antrean verifikasi dokumen dari mobile, dan **riwayat mobil yang pernah dipakai** (pasangan dari Sindu 1.1). Tambah no. pegawai & tipe penugasan (Pool/Tetap). |
| **Data Device** (`admin-device.html`) — serial, model, API key, armada, terakhir aktif, status | **Data Perangkat IoT** — IMEI, provider, kendaraan, tanggal pasang, status koneksi | Tambah provider, tanggal pasang, status koneksi; aturan GPS hanya untuk kendaraan Pool. |
| **Unit Kerja** (`admin-work-units.html`) — nama pool, kode, penanggung jawab, jumlah armada/driver | — (unit kerja hanya field di kendaraan/driver/pengguna) | Tetap; jadi dasar fitur Mutasi Unit. |
| **Manajemen Pengguna** (`admin-users.html`) | **Pengguna & Hak Akses** — role, unit kerja, status | Tambah kolom unit kerja + matriks hak akses; terima distribusi role & log aktivitas dari dashboard. |
| **Template Checklist** (`admin-templates.html`) — item + flag kritis (hard fail) | **Template Checklist** — Pre-trip Pool, Post-trip Pool, Inspeksi Aset Berkala | Sudah sesuai. Opsional: versi template & pemisahan pre/post-trip/inspeksi berkala. |
| **Perawatan** (`admin-maintenance.html`) — form input servis + riwayat | **Perawatan Kendaraan** — Overview, Jadwal, Permintaan Perbaikan, Dalam Perawatan, Riwayat, Komponen & Suku Cadang; + Usulan Jadwal Perawatan | **Detail lampiran (Sindu 1.2)** dulu, lalu tambah tab Jadwal dan Permintaan Perbaikan. Verifikasi tetap di Manager. |
| **Simulasi Driver** (`driver-mobile.html`) — fit-to-drive, pra-trip, pasca-trip | **Pengajuan Mobile Driver** — pengaturan kategori KTP, SIM, sertifikasi, dokumen pemeriksaan | Simulasi tetap. Hasil pasca-trip menjadi sumber **Riwayat Pemakaian**. Pengaturan pengajuan dokumen bisa jadi halaman kecil terpisah. |

### 2.2 Halaman dosen yang belum ada di polosan

| Page yang udah ada | Page dari bapaknya | Sekiranya yang bakal masuk |
|---|---|---|
| — | **Odometer & Riwayat Penggunaan** — Riwayat Odometer, Riwayat Operasional, Pemeriksaan Berkala, Anomali & Rekonsiliasi | Digabung ke tab Riwayat Pemakaian + Odometer di detail Mobil Dinas (tidak perlu halaman sendiri). |
| — | **Mutasi & Penghapusan** — Mutasi Unit, Perubahan Kategori, Penarikan, Penghapusan/Penjualan | Halaman baru, terkait Unit Kerja. |
| — | **Biaya & Garansi** — Ringkasan Biaya, Pengeluaran, Garansi & Asuransi, Klaim | Prioritas rendah; biaya servis sementara cukup dari Perawatan. |
| — | **Laporan Aset** | Ditunda (Executive sudah punya laporan). |

---

## 3. Urutan prioritas (usulan)

1. Detail lampiran Riwayat Perawatan (Sindu 1.2) — perubahan kecil, di halaman yang sudah ada.
2. Detail Mobil Dinas jadi halaman bertab + tab **Riwayat Pemakaian** (Sindu 1.1).
3. Penyesuaian Dashboard ke fokus aset & tindak lanjut.
4. Tab tambahan Data Driver (dokumen, kompetensi, pemeriksaan).
5. Perawatan: tab Jadwal & Permintaan Perbaikan.
6. Mutasi & Penghapusan.
7. Biaya & Garansi, Laporan Aset.

## 4. Catatan terbuka

- Screenshot prototipe dosen dengan menu *Driver Compatibility*, *Referensi Master*, *Dokumen & Legalitas*, *Penempatan Aset*, *Perencanaan Perawatan* **tidak ada** di file `fleettrack_admin_v8_terintegrasi.html`. Kemungkinan versi lain — perlu file HTML-nya untuk dipetakan. *Driver Compatibility* (peringkat kandidat driver per kendaraan) belum ada padanannya; perlu diputuskan apakah masuk Admin atau Manager (di versi dosen, penugasan adalah wewenang Manager).
- Tipe Mobil Dinas dan Unit Kerja tidak punya halaman sendiri di versi dosen — tim perlu memutuskan tetap dipisah atau dilebur.

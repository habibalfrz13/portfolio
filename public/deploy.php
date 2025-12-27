<?php
// File location: public/deploy.php

// 1. KEAMANAN SSEDERHANA
// Ganti token ini dengan kata sandi acak pilihan Anda
$access_token = 'ALVADEV_SECRET_KEY_2025'; 

if (($_GET['token'] ?? '') !== $access_token) {
    header('HTTP/1.0 403 Forbidden');
    die('Akses Ditolak.');
}

// Tambahkan waktu eksekusi agar tidak timeout saat extract
set_time_limit(300); 

$zipFile = 'artifact.zip';
$extractPath = './temp_unzip';

if (!file_exists($zipFile)) {
    die('File artifact.zip tidak ditemukan.');
}

$zip = new ZipArchive;
if ($zip->open($zipFile) === TRUE) {
    
    // A. EKSTRAK KE FOLDER SEMENTARA
    if (!is_dir($extractPath)) mkdir($extractPath, 0755, true);
    $zip->extractTo($extractPath);
    $zip->close();

    // B. DEFINISI PATH TUJUAN (SESUAI STRUKTUR ANDA)
    // __DIR__ adalah public_html/portfolio
    
    // Tujuan Core: Mundur 2 langkah -> repositories/portofolio_core
    $targetCore = realpath(__DIR__ . '/../../repositories/portofolio_core');
    
    // Tujuan Public: Folder ini sendiri
    $targetPublic = __DIR__;

    if (!$targetCore) {
        die('Error: Folder repositories/portofolio_core tidak ditemukan. Cek struktur folder.');
    }

    // C. PINDAHKAN FILE CORE
    echo "1. Memindahkan Core ke: $targetCore <br>";
    smartCopy($extractPath . '/core', $targetCore);

    // D. PINDAHKAN FILE PUBLIC (ASSETS)
    echo "2. Memindahkan Assets ke: $targetPublic <br>";
    smartCopy($extractPath . '/public', $targetPublic);

    // E. BERSIH-BERSIH
    recursiveDelete($extractPath); // Hapus folder temp
    unlink($zipFile);              // Hapus zip
    unlink(__FILE__);              // HAPUS FILE DEPLOY.PHP INI (Self-destruct)

    echo "<strong>SUKSES!</strong> Deployment selesai dalam hitungan detik.";

} else {
    echo "Gagal membuka file ZIP.";
}

// --- FUNGSI BANTUAN ---

function smartCopy($source, $dest) {
    if(!is_dir($source)) return;
    
    $dir = opendir($source);
    @mkdir($dest);
    while (false !== ($file = readdir($dir))) {
        if (($file != '.') && ($file != '..')) {
            if (is_dir($source . '/' . $file)) {
                smartCopy($source . '/' . $file, $dest . '/' . $file);
            } else {
                copy($source . '/' . $file, $dest . '/' . $file);
            }
        }
    }
    closedir($dir);
}

function recursiveDelete($dir) {
    if (!is_dir($dir)) return;
    $files = array_diff(scandir($dir), array('.', '..'));
    foreach ($files as $file) {
        (is_dir("$dir/$file")) ? recursiveDelete("$dir/$file") : unlink("$dir/$file");
    }
    return rmdir($dir);
}
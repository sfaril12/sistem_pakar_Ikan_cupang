/**
 * SISTEM PAKAR DIAGNOSA PENYAKIT IKAN CUPANG
 * Implementasi Metode Forward Chaining & Certainty Factor
 * Berdasarkan Jurnal: JOISM Vol. 5, No. 2 (2024)
 * Penulis: Devandi Kurnia Restu Andika & Irma Rofni Wulandari
 */

// ===================================================================
// 1. DATA PENYAKIT (Tabel 1 Jurnal)
// ===================================================================
const DATA_PENYAKIT = {
  P01: {
    kode: "P01",
    nama: "Bintik Putih",
    latin: "Ichthyophthirius multifiliis (White Spot / Ich)",
    patogen: "Parasit Protozoa",
    deskripsi: "Penyakit bintik putih disebabkan oleh parasit protozoa bersilia Ichthyophthirius multifiliis. Parasit ini menembus lapisan epitel kulit serta sirip ikan cupang, membentuk kista putih menyerupai butiran garam atau tepung halus. Ikan tampak gelisah, sering menggosokkan tubuh ke dinding akuarium, nafsu makan berkurang, dan sirip menguncup.",
    pengobatan: [
      "Isolasi ikan cupang ke wadah karantina khusus dengan air bersih yang telah diendapkan.",
      "Tingkatkan suhu air secara perlahan ke 28°C - 30°C untuk mempercepat siklus hidup parasit agar lepas dari jaringan tubuh ikan.",
      "Tambahkan garam ikan (1-2 gram per liter air) untuk membantu memulihkan lapisan osmoregulasi tubuh.",
      "Berikan obat Methylene Blue (1-2 tetes per liter) atau Blitz Ich sesuai dosis anjuran selama 3-5 hari berturut-turut.",
      "Lakukan penggantian air sebanyak 30-50% setiap hari sebelum pemberian dosis obat yang baru."
    ],
    pencegahan: [
      "Karantina ikan baru minimal 7-14 hari sebelum didekatkan atau digabungkan ke wadah pemeliharaan utama.",
      "Jaga kestabilan suhu air akuarium dan hindari fluktuasi cuaca ekstrem yang membuat ikan drop.",
      "Gunakan daun ketapang tua yang sudah diolah untuk menjaga keasaman air dan antibakteri alami.",
      "Hindari pemberian pakan hidup alam liar tanpa dicuci/disterilkan terlebih dahulu."
    ]
  },
  P02: {
    kode: "P02",
    nama: "Busuk Sirip",
    latin: "Fin Rot (Pseudomonas / Aeromonas / Jamur)",
    patogen: "Bakteri & Jamur Sekunder",
    deskripsi: "Penyakit busuk sirip merupakan infeksi bakteri atau jamur yang merusak jaringan sirip dan ekor ikan cupang. Gejala khas diawali dengan perubahan warna gelap atau kemerahan di pinggiran sirip, kemudian sirip mengalami kerontokan, sobek, membusuk, dan perlahan terkikis hingga mendekati pangkal tubuh.",
    pengobatan: [
      "Pindahkan ikan ke wadah karantina dengan air endapan yang steril dan bersih.",
      "Berikan larutan Acriflavine atau Methylene Blue secukupnya untuk menghentikan nekrosis jaringan sirip.",
      "Tambahkan garam ikan sebanyak 1 sendok teh per 4 liter air.",
      "Dapat diberikan antibiotik khusus ikan (seperti Kanamycin atau Bettafix) jika pembusukan telah mencapai pangkal daging sirip.",
      "Kuras dan ganti air karantina secara teratur setiap 2 hari sekali."
    ],
    pencegahan: [
      "Pertahankan kebersihan air dengan menyedot sisa kotoran dan pakan setiap hari (cegah amonia tinggi).",
      "Hindari penggunaan hiasan akuarium berujung runcing yang dapat merobek sirip cupang.",
      "Rutin berikan air rendaman daun ketapang untuk memperkuat jaringan selaput sirip ikan."
    ]
  },
  P03: {
    kode: "P03",
    nama: "Infeksi Jamur Kulit",
    latin: "Saprolegniasis / Fungal Skin Infection",
    patogen: "Jamur Saprolegnia / Achlya",
    deskripsi: "Infeksi jamur kulit dipicu oleh spora jamur Saprolegnia yang menyerang ikan cupang saat daya tahan tubuhnya melemah atau setelah mengalami luka gores. Gejala khasnya berupa bercak putih berbulu halus seperti gumpalan kapas yang menempel pada sirip atau tubuh ikan cupang.",
    pengobatan: [
      "Karantina ikan di wadah tersendiri agar spora jamur tidak menular ke wadah lain.",
      "Berikan garam ikan dengan konsentrasi 2 gram/liter untuk menekan pertumbuhan hifa jamur.",
      "Teteskan cairan anti-jamur Methylene Blue hingga air berwarna biru cerah atau Acriflavine selama 5-7 hari.",
      "Oleskan antiseptik khusus ikan secara perlahan menggunakan cotton bud pada luka jamur yang tebal jika diperlukan.",
      "Ganti 50% air setiap 2 hari sekali dan tambahkan kembali obat sesuai takaran air baru."
    ],
    pencegahan: [
      "Segera obati setiap luka gores atau sobek pada tubuh ikan sebelum ditumbuhi spora jamur.",
      "Jaga parameter kebersihan air dan pastikan sirkulasi udara di ruang pemeliharaan cukup baik.",
      "Hindari kepadatan ikan dan kontak fisik antar wadah cupang aduan.",
      "Beri pakan bernutrisi tinggi (jentik nyamuk bersih, kutu air) untuk memperkuat imun ikan."
    ]
  },
  P04: {
    kode: "P04",
    nama: "Kolumnaris",
    latin: "Flavobacterium columnare / Cotton Mouth Disease",
    patogen: "Bakteri Flavobacterium",
    deskripsi: "Kolumnaris adalah infeksi bakteri ganas Flavobacterium columnare yang menyerang mulut, kepala, dan insang ikan. Sering dikenal sebagai 'Cotton Mouth' karena memunculkan bercak putih atau lesi borok di sekitar mulut dan kepala, insang memucat, ikan lemas serta nafsu makan menurun drastis.",
    pengobatan: [
      "Segera pisahkan ikan yang terindikasi karena bakteri Flavobacterium sangat menular.",
      "Gunakan antibiotik spektrum luas seperti Oxytetracycline, Kanamycin, atau Furan-2 sesuai takaran medis.",
      "Tambahkan garam ikan dan pertahankan suhu ruangan stabil (jangan terlalu hangat karena bakteri berkembang cepat pada suhu >28°C).",
      "Lakukan penggantian air harian 30-40% dengan air endapan steril.",
      "Berikan pakan porsi sangat kecil atau puasakan jika mulut ikan sulit bergerak."
    ],
    pencegahan: [
      "Jaga kebersihan substrat dan dasar wadah dari penumpukan sisa kotoran organik.",
      "Hindari stres pada ikan akibat perubahan suhu atau lingkungan yang tiba-tiba.",
      "Sterilkan serokan atau jaring ikan sebelum digunakan berpindah antar akuarium."
    ]
  },
  P05: {
    kode: "P05",
    nama: "Sisik Nanas",
    latin: "Dropsy (Gagal Organ / Infeksi Bakteri Aeromonas)",
    patogen: "Bakteri Aeromonas & Edema Organ",
    deskripsi: "Sisik nanas (Dropsy) merupakan kondisi klinis berat akibat kegagalan fungsi ginjal dan penumpukan cairan (edema) di dalam rongga tubuh ikan. Akibatnya, perut membengkak sangat besar dan sisik di sekujur tubuh terangkat melebar menyerupai kulit buah nanas. Ikan tidak bisa buang kotoran dan tampak sangat lemah.",
    pengobatan: [
      "Segera isolasi ikan di wadah dangkal agar ikan tidak kelelahan saat naik ke permukaan untuk bernapas.",
      "Berikan Epsom Salt (garam inggris / Magnesium Sulfat) dosis 1/4 - 1/2 sendok teh per 4 liter untuk membantu menarik cairan dari tubuh ikan.",
      "Kombinasikan dengan antibiotik sistemik kuat (Kanamycin atau Tetracycline) untuk membunuh bakteri internal.",
      "Tambahkan ekstrak daun ketapang kental untuk efek menenangkan.",
      "Puasakan ikan selama masa krisis pembengkakan perut."
    ],
    pencegahan: [
      "Jangan memberi makan berlebihan (overfeeding) yang memicu sembelit dan infeksi bakteri usus.",
      "Variasikan makanan dan rendam pakan kering/pelet sebelum diberikan agar tidak mengembang di perut ikan.",
      "Kuras dan jaga higienitas air akuarium secara berkala."
    ]
  },
  P06: {
    kode: "P06",
    nama: "Insang Merah / Radang Insang",
    latin: "Red Gills / Gill Flukes / Keracunan Amonia",
    patogen: "Parasit Cacing Insang & Keracunan Amonia",
    deskripsi: "Radang insang ditandai dengan pembengkakan dan warna kemerahan meradang pada lembaran insang, penutup insang sering terbuka, serta pernapasan yang terengah-engah di permukaan air. Penyakit ini umumnya disebabkan oleh lonjakan kadar amonia/nitrit beracun atau parasit insang (Dactylogyrus).",
    pengobatan: [
      "Lakukan pergantian air secara total ke air bersih yang telah diendapkan dan bebas klorin/kaporit.",
      "Berikan aerasi halus untuk membantu asupan oksigen terlarut bagi pernapasan ikan.",
      "Tambahkan garam ikan (1 sendok teh per 4 liter) untuk menetralkan racun nitrit dan meringankan kerja insang.",
      "Gunakan obat antiparasit insang atau larutan Methylene Blue ringan jika dicurigai akibat kutu/cacing insang.",
      "Hindari pemberian pakan selama 24 jam pertama pemulihan."
    ],
    pencegahan: [
      "Rutin siphon (sedot) kotoran dasar akuarium sebelum amonia terakumulasi.",
      "Jangan memasukkan ikan ke dalam air keran segar yang belum dideklorinasi.",
      "Hindari kepadatan akuarium dan pastikan sirkulasi udara baik."
    ]
  },
  P07: {
    kode: "P07",
    nama: "Mata Bengkak",
    latin: "Pop Eye (Exophthalmia)",
    patogen: "Bakteri Internal & Trauma Fisik",
    deskripsi: "Penyakit Pop Eye ditandai dengan salah satu atau kedua bola mata ikan cupang yang menonjol keluar (membengkak abnormal), tampak keruh atau diselimuti lapisan lendir keputihan. Kondisi ini dipicu oleh penumpukan cairan di belakang bola mata akibat infeksi bakteri internal atau trauma fisik.",
    pengobatan: [
      "Pindahkan ikan ke soliter karantina yang tenang dan terhindar dari cahaya terang langsung.",
      "Berikan garam Epsom (Magnesium Sulfat) 1/2 sendok teh per 4 liter untuk mengurangi tekanan cairan di rongga mata.",
      "Beri antibiotik spektrum luas seperti Kanamycin, Amoxicillin ikan, atau Maracyn.",
      "Jaga kebersihan air dengan mengganti air karantina setiap 2 hari.",
      "Teruskan terapi selama 7-10 hari hingga bola mata kembali ke posisi normal."
    ],
    pencegahan: [
      "Jaga kualitas air tetap prima agar bakteri oportunistik tidak berkembang biak.",
      "Hindari perkelahian cupang yang dapat melukai area mata.",
      "Berikan nutrisi seimbang kaya vitamin untuk mendukung kekebalan jaringan mata."
    ]
  },
  P08: {
    kode: "P08",
    nama: "Bintik Emas",
    latin: "Velvet Disease (Piscinoodinium pillulare / Oodinium)",
    patogen: "Parasit Dinoflagellata",
    deskripsi: "Penyakit bintik emas atau Velvet disebabkan oleh parasit dinoflagellata Oodinium. Gejalanya berupa bintik-bintik halus berwarna emas kekuningan atau menyerupai serbuk karat besi yang menempel pada tubuh dan kepala cupang. Ikan menunjukkan pergerakan insang yang cepat, nafsu makan hilang, dan warna tubuh memudar drastis.",
    pengobatan: [
      "Tempatkan ikan di wadah karantina dan tutup wadah dengan kain gelap (karena parasit Velvet berfotosintesis dan membutuhkan cahaya).",
      "Tingkatkan suhu air ke kisaran 28°C - 30°C.",
      "Gunakan tembaga sulfat (Copper Sulfate) atau kombinasi Acriflavine dan Methylene Blue sesuai dosis pabrik.",
      "Tambahkan garam ikan untuk mengurangi stres osmotik ikan.",
      "Lakukan pengobatan dalam kondisi gelap selama 7-10 hari."
    ],
    pencegahan: [
      "Karantina ketat semua tanaman air, pakan hidup, atau ikan baru sebelum dimasukkan ke lingkungan akuarium.",
      "Jaga parameter air agar tidak mengalami penurunan drastis pada pH dan kesadahan.",
      "Gunakan daun ketapang untuk menekan pertumbuhan protozoa di air."
    ]
  },
  P09: {
    kode: "P09",
    nama: "Kembung",
    latin: "Swim Bladder Disorder / Constipation Bloat",
    patogen: "Gangguan Kantung Kemih & Konstipasi",
    deskripsi: "Gangguan kembung dan kantung kemih menyebabkan ikan cupang kehilangan keseimbangan, berenang terbalik, mengambang miring di permukaan atau tenggelam di dasar akuarium. Perut ikan membengkak besar, tidak mampu buang air besar (sembelit berat), akibat pemberian pakan kering berlebihan atau bakteri di saluran cerna.",
    pengobatan: [
      "Puasakan ikan cupang dari segala makanan selama 2 hingga 3 hari penuh.",
      "Turunkan ketinggian air wadah karantina menjadi hanya 5-8 cm agar ikan tidak kehabisan tenaga saat mengambil udara permukaan.",
      "Tambahkan garam Epsom (1/2 sendok teh per 4 liter) untuk memicu kontraksi usus dan mengeluarkan sumbatan feses.",
      "Setelah puasa, berikan kutu air (Daphnia hidup) atau bagian dalam kacang polong rebus halus sebagai pencahar alami.",
      "Jaga air tetap hangat (27°C - 28°C) untuk melancarkan metabolisme pencernaan."
    ],
    pencegahan: [
      "Hindari memberi pelet kering secara langsung; basahi pelet terlebih dahulu 1-2 menit sebelum disuapkan ke ikan.",
      "Berikan pakan hidup yang kaya serat seperti kutu air (Daphnia / Moina).",
      "Beri pakan secukupnya (jangan sampai perut buncit berlebihan) dan tentukan 1 hari puasa setiap minggu."
    ]
  }
};

// ===================================================================
// 2. DATA 30 GEJALA (Tabel 2 Jurnal) & KATEGORINYA
// ===================================================================
const DATA_GEJALA = [
  { kode: "G01", nama: "Terdapat Bintik-bintik Putih Pada Tubuh dan Sirip", kategori: "tubuh" },
  { kode: "G02", nama: "Nafsu Makan Berkurang", kategori: "perilaku" },
  { kode: "G03", nama: "Warna Cupang Pudar atau Memucat", kategori: "tubuh" },
  { kode: "G04", nama: "Sirip Cupang Menguncup", kategori: "sirip" },
  { kode: "G05", nama: "Sirip Mengalami Kerontokan dan Kerusakan", kategori: "sirip" },
  { kode: "G06", nama: "Ada Warna Gelap Atau Kemerahan Di Pinggiran Sirip", kategori: "sirip" },
  { kode: "G07", nama: "Muncul Bercak Putih Di Sirip Seperti Gumpalan Kapas", kategori: "sirip" },
  { kode: "G08", nama: "Cupang Kurang Aktif dan Lemah", kategori: "perilaku" },
  { kode: "G09", nama: "Tampak Kesulitan Bernafas", kategori: "insang" },
  { kode: "G10", nama: "Infeksi Pada Mulut Cupang", kategori: "mata" },
  { kode: "G11", nama: "Infeksi pada Mata Cupang", kategori: "mata" },
  { kode: "G12", nama: "Perut Cupang Membengkak Besar", kategori: "tubuh" },
  { kode: "G13", nama: "Sisik Cupang Melebar Seperti Kulit Nanas", kategori: "tubuh" },
  { kode: "G14", nama: "Mata Cupang Membengkak", kategori: "mata" },
  { kode: "G15", nama: "Mata Diselimuti Selaput Lendir", kategori: "mata" },
  { kode: "G16", nama: "Terdapat Garis atau Bintik Putih Di Mulut Cupang", kategori: "mata" },
  { kode: "G17", nama: "Kotoran Memanjang Berwarna Putih Dan Menggumpal", kategori: "tubuh" },
  { kode: "G18", nama: "Pembengkakan Pada Insang Cupang", kategori: "insang" },
  { kode: "G19", nama: "Tutup Insang Cupang Selalu Terbuka", kategori: "insang" },
  { kode: "G20", nama: "Terdapat Borok Atau Lesi Pada Tubuh Cupang", kategori: "tubuh" },
  { kode: "G21", nama: "Terdapat Bintik-bintik Emas Seperti Besi Berkarat Di Badan", kategori: "tubuh" },
  { kode: "G22", nama: "Cupang Berenang Terbalik Atau Menyamping", kategori: "perilaku" },
  { kode: "G23", nama: "Sering Menabrak Dinding Akuarium", kategori: "perilaku" },
  { kode: "G24", nama: "Tidak Bisa Buang Kotoran", kategori: "tubuh" },
  { kode: "G25", nama: "Insang Jarang Terbuka", kategori: "insang" },
  { kode: "G26", nama: "Sirip Ikan Membusuk", kategori: "sirip" },
  { kode: "G27", nama: "Perubahan Warna Insang", kategori: "insang" },
  { kode: "G28", nama: "Warna Insang Terlihat Memerah", kategori: "insang" },
  { kode: "G29", nama: "Pergerakan Insang Cepat", kategori: "insang" },
  { kode: "G30", nama: "Sisik Rontok Atau Terlepas", kategori: "tubuh" }
];

// Label kategori untuk badge
const KATEGORI_LABEL = {
  sirip: "Sirip & Ekor",
  insang: "Insang & Pernapasan",
  mata: "Mata & Mulut",
  tubuh: "Tubuh & Perut",
  perilaku: "Perilaku & Gerak"
};

// ===================================================================
// 3. KAIDAH PRODUKSI (FORWARD CHAINING) (Tabel 4 Jurnal)
// ===================================================================
const KAIDAH_PRODUKSI = {
  P01: {
    rule: "JIKA G01 DAN G02 DAN G03 DAN G04 DAN G08 DAN G23 MAKA P01",
    gejala: ["G01", "G02", "G03", "G04", "G08", "G23"]
  },
  P02: {
    rule: "JIKA G02 DAN G03 DAN G05 DAN G06 DAN G08 DAN G16 DAN G26 MAKA P02",
    gejala: ["G02", "G03", "G05", "G06", "G08", "G16", "G26"]
  },
  P03: {
    rule: "JIKA G02 DAN G03 DAN G07 DAN G08 DAN G16 DAN G26 MAKA P03",
    gejala: ["G02", "G03", "G07", "G08", "G16", "G26"]
  },
  P04: {
    rule: "JIKA G02 DAN G03 DAN G08 DAN G16 DAN G20 DAN G27 MAKA P04",
    gejala: ["G02", "G03", "G08", "G16", "G20", "G27"]
  },
  P05: {
    rule: "JIKA G02 DAN G03 DAN G08 DAN G12 DAN G13 DAN G24 DAN G25 MAKA P05",
    gejala: ["G02", "G03", "G08", "G12", "G13", "G24", "G25"]
  },
  P06: {
    rule: "JIKA G08 DAN G09 DAN G18 DAN G19 DAN G28 DAN G30 MAKA P06",
    gejala: ["G08", "G09", "G18", "G19", "G28", "G30"]
  },
  P07: {
    rule: "JIKA G02 DAN G03 DAN G08 DAN G10 DAN G11 DAN G14 DAN G15 MAKA P07",
    gejala: ["G02", "G03", "G08", "G10", "G11", "G14", "G15"]
  },
  P08: {
    rule: "JIKA G02 DAN G03 DAN G08 DAN G21 DAN G29 MAKA P08",
    gejala: ["G02", "G03", "G08", "G21", "G29"]
  },
  P09: {
    rule: "JIKA G02 DAN G03 DAN G08 DAN G12 DAN G17 DAN G22 DAN G24 MAKA P09",
    gejala: ["G02", "G03", "G08", "G12", "G17", "G22", "G24"]
  }
};

// ===================================================================
// 4. BOBOT NILAI CERTAINTY FACTOR PAKAR (Tabel 5 Jurnal)
// ===================================================================
const CF_PAKAR = {
  P01: { G01: 0.8, G02: 0.4, G03: 0.4, G04: 0.6, G08: 0.6, G23: 0.6 },
  P02: { G02: 0.0, G03: 0.4, G05: 0.8, G06: 0.8, G08: 0.4, G16: 0.0, G26: 0.8 },
  P03: { G02: 0.6, G03: 0.2, G07: 0.8, G08: 0.4, G16: 0.6, G26: 0.4 },
  P04: { G02: 0.2, G03: 0.2, G08: 0.4, G16: 0.6, G20: 0.6, G27: 0.6 },
  P05: { G02: 0.6, G03: 0.4, G08: 0.6, G12: 0.8, G13: 1.0, G24: 0.4, G25: 0.4 },
  P06: { G08: 0.4, G09: 0.8, G18: 0.6, G19: 0.8, G28: 0.6, G30: 0.4 },
  P07: { G02: 0.4, G03: 0.2, G08: 0.4, G10: 0.4, G11: 0.8, G14: 1.0, G15: 0.4 },
  P08: { G02: 0.4, G03: 0.6, G08: 0.4, G21: 1.0, G29: 0.4 },
  P09: { G02: 0.6, G03: 0.0, G08: 0.4, G12: 0.8, G17: 0.4, G22: 0.8, G24: 0.4 }
};

// ===================================================================
// 5. PILIHAN TINGKAT KEYAKINAN USER (Tabel 6 Jurnal)
// ===================================================================
const SKALA_CF_USER = [
  { label: "Pasti Ya", score: "+1.0", value: 1.0 },
  { label: "Hampir Pasti", score: "+0.8", value: 0.8 },
  { label: "Kemungkinan Besar", score: "+0.6", value: 0.6 },
  { label: "Mungkin Ya", score: "+0.4", value: 0.4 },
  { label: "Tidak / Tidak Tahu", score: "0.0", value: 0.0, isNeutral: true, default: true }
];

// ===================================================================
// 6. DATA SAMPEL PENGUJIAN AKURASI SISTEM (Tabel 9 Jurnal)
// ===================================================================
const DATA_PENGUJIAN_JURNAL = [
  { no: 1, sistem: "Bintik Putih", pakar: "Bintik Putih", sesuai: true },
  { no: 2, sistem: "Busuk Sirip", pakar: "Busuk Sirip", sesuai: true },
  { no: 3, sistem: "Bintik Emas", pakar: "Bintik Emas", sesuai: true },
  { no: 4, sistem: "Mata Bengkak", pakar: "Mata Bengkak", sesuai: true },
  { no: 5, sistem: "Infeksi Jamur Kulit", pakar: "Infeksi Jamur Kulit", sesuai: true },
  { no: 6, sistem: "Kembung", pakar: "Kembung", sesuai: true },
  { no: 7, sistem: "Bintik Putih", pakar: "Bintik Putih", sesuai: true },
  { no: 8, sistem: "Kolumnaris", pakar: "Kolumnaris", sesuai: true },
  { no: 9, sistem: "Sisik Nanas", pakar: "Sisik Nanas", sesuai: true },
  { no: 10, sistem: "Radang Insang", pakar: "Radang Insang", sesuai: true },
  { no: 11, sistem: "Bintik Putih", pakar: "Bintik Putih", sesuai: true },
  { no: 12, sistem: "Kembung", pakar: "Kembung", sesuai: true },
  { no: 13, sistem: "Busuk Sirip", pakar: "Sisik Nanas", sesuai: false },
  { no: 14, sistem: "Mata Bengkak", pakar: "Mata Bengkak", sesuai: true },
  { no: 15, sistem: "Sisik Nanas", pakar: "Sisik Nanas", sesuai: true },
  { no: 16, sistem: "Busuk Sirip", pakar: "Busuk Sirip", sesuai: true },
  { no: 17, sistem: "Busuk Sirip", pakar: "Mata Bengkak", sesuai: false },
  { no: 18, sistem: "Infeksi Jamur Kulit", pakar: "Infeksi Jamur Kulit", sesuai: true },
  { no: 19, sistem: "Radang Insang", pakar: "Radang Insang", sesuai: true },
  { no: 20, sistem: "Bintik Putih", pakar: "Kembung", sesuai: false },
  { no: 21, sistem: "Sisik Nanas", pakar: "Sisik Nanas", sesuai: true },
  { no: 22, sistem: "Sisik Nanas", pakar: "Sisik Nanas", sesuai: true },
  { no: 23, sistem: "Bintik Emas", pakar: "Bintik Emas", sesuai: true },
  { no: 24, sistem: "Radang Insang", pakar: "Radang Insang", sesuai: true },
  { no: 25, sistem: "Kembung", pakar: "Bintik Emas", sesuai: false },
  { no: 26, sistem: "Kolumnaris", pakar: "Kolumnaris", sesuai: true },
  { no: 27, sistem: "Radang Insang", pakar: "Sisik Nanas", sesuai: false },
  { no: 28, sistem: "Busuk Sirip", pakar: "Busuk Sirip", sesuai: true },
  { no: 29, sistem: "Mata Bengkak", pakar: "Mata Bengkak", sesuai: true },
  { no: 30, sistem: "Radang Insang", pakar: "Radang Insang", sesuai: true }
];

// ===================================================================
// INISIALISASI HALAMAN
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderSymptomCards();
  initSymptomToolbar();
  renderPenyakitCatalog();
  renderKaidahTabel();
  renderGejalaPakarTabel();
  bindFormEvents();
});

// 1. Inisialisasi Navigasi Tab
function initNavigation() {
  const navTabs = document.querySelectorAll(".nav-tab");
  const tabContents = document.querySelectorAll(".tab-content");

  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");

      navTabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(tc => tc.classList.remove("active"));

      tab.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

// 2. Render Kartu Gejala dengan Radio Buttons Segmented
function renderSymptomCards() {
  const container = document.getElementById("symptoms-list-wrapper");
  if (!container) return;

  container.innerHTML = "";

  DATA_GEJALA.forEach(g => {
    const card = document.createElement("div");
    card.className = "symptom-item-card";
    card.id = `card-${g.kode}`;
    card.setAttribute("data-kode", g.kode);
    card.setAttribute("data-kategori", g.kategori);
    card.setAttribute("data-nama", g.nama.toLowerCase());

    // Header Kartu Gejala
    const header = document.createElement("div");
    header.className = "symptom-item-header";

    const titleGroup = document.createElement("div");
    titleGroup.className = "symptom-title-group";

    const codeBadge = document.createElement("span");
    codeBadge.className = "symptom-code-badge";
    codeBadge.textContent = g.kode;

    const nameText = document.createElement("span");
    nameText.className = "symptom-text";
    nameText.textContent = g.nama;

    titleGroup.appendChild(codeBadge);
    titleGroup.appendChild(nameText);

    const categoryTag = document.createElement("span");
    categoryTag.className = "symptom-category-tag";
    categoryTag.textContent = KATEGORI_LABEL[g.kategori] || "Umum";

    header.appendChild(titleGroup);
    header.appendChild(categoryTag);

    // Segmented Radio Pill Group
    const pillGroup = document.createElement("div");
    pillGroup.className = "radio-pill-group";

    SKALA_CF_USER.forEach(opt => {
      const pillLabel = document.createElement("label");
      pillLabel.className = `radio-option-pill ${opt.isNeutral ? "is-neutral" : ""} ${opt.default ? "is-checked" : ""}`;

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `cf_${g.kode}`;
      radio.value = opt.value;
      if (opt.default) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        // Hapus kelas aktif di saudara se-grup
        pillGroup.querySelectorAll(".radio-option-pill").forEach(p => p.classList.remove("is-checked"));
        pillLabel.classList.add("is-checked");

        // Beri highlight kartu jika nilai > 0
        const currentVal = parseFloat(radio.value);
        if (currentVal > 0) {
          card.classList.add("is-active");
        } else {
          card.classList.remove("is-active");
        }

        updateActiveSymptomCounter();
      });

      const titleSpan = document.createElement("span");
      titleSpan.className = "pill-label-title";
      titleSpan.textContent = opt.label;

      const scoreSpan = document.createElement("span");
      scoreSpan.className = "pill-label-score";
      scoreSpan.textContent = opt.score;

      pillLabel.appendChild(radio);
      pillLabel.appendChild(titleSpan);
      pillLabel.appendChild(scoreSpan);
      pillGroup.appendChild(pillLabel);
    });

    card.appendChild(header);
    card.appendChild(pillGroup);
    container.appendChild(card);
  });

  updateActiveSymptomCounter();
}

// 3. Toolbar Pencarian & Filter Kategori Gejala
function initSymptomToolbar() {
  const searchInput = document.getElementById("search-gejala");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let activeFilter = "all";
  let activeSearch = "";

  function applyFilter() {
    const cards = document.querySelectorAll(".symptom-item-card");

    cards.forEach(card => {
      const kategori = card.getAttribute("data-kategori");
      const kode = card.getAttribute("data-kode").toLowerCase();
      const nama = card.getAttribute("data-nama");

      const matchCategory = (activeFilter === "all") || (kategori === activeFilter);
      const matchSearch = (!activeSearch) || kode.includes(activeSearch) || nama.includes(activeSearch);

      if (matchCategory && matchSearch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

    const wrapper = document.getElementById("symptoms-list-wrapper");
    if (wrapper) wrapper.scrollTop = 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearch = e.target.value.trim().toLowerCase();
      applyFilter();
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter");
      applyFilter();
    });
  });
}

// Update Counter Gejala Terpilih
function updateActiveSymptomCounter() {
  const counterSpan = document.getElementById("active-symptom-count");
  if (!counterSpan) return;

  let count = 0;
  DATA_GEJALA.forEach(g => {
    const checked = document.querySelector(`input[name="cf_${g.kode}"]:checked`);
    if (checked && parseFloat(checked.value) > 0) {
      count++;
    }
  });

  counterSpan.textContent = count;
}

// 4. Render Katalog 9 Penyakit (Tab 2)
function renderPenyakitCatalog() {
  const grid = document.getElementById("penyakit-catalog-grid");
  if (!grid) return;

  grid.innerHTML = "";

  Object.values(DATA_PENYAKIT).forEach(p => {
    const card = document.createElement("div");
    card.className = "disease-card";

    card.innerHTML = `
      <div class="disease-card-header">
        <span class="disease-code-pill">${p.kode}</span>
        <span class="disease-pathogen-tag">${p.patogen}</span>
      </div>
      <h3 class="disease-name">${p.nama}</h3>
      <p class="disease-latin">${p.latin}</p>
      <p class="disease-desc">${p.deskripsi}</p>
      
      <button type="button" class="toggle-details-btn" data-target="${p.kode}">
        Lihat Panduan Medis & Pencegahan
      </button>

      <div id="acc-${p.kode}" class="disease-accordion">
        <h4 class="accordion-subheading">Tata Cara Pengobatan:</h4>
        <div class="treatment-body">
          <ul>${p.pengobatan.map(item => `<li>${item}</li>`).join("")}</ul>
        </div>
        <h4 class="accordion-subheading" style="margin-top: 12px;">Tata Cara Pencegahan:</h4>
        <div class="treatment-body">
          <ul>${p.pencegahan.map(item => `<li>${item}</li>`).join("")}</ul>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Event toggle accordion
  grid.querySelectorAll(".toggle-details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-target");
      const acc = document.getElementById(`acc-${code}`);
      if (acc) {
        acc.classList.toggle("open");
        btn.textContent = acc.classList.contains("open")
          ? "Sembunyikan Panduan Medis"
          : "Lihat Panduan Medis & Pencegahan";
      }
    });
  });
}

// 5. Render Tabel Kaidah Produksi (Tab 3)
function renderKaidahTabel() {
  const tbody = document.getElementById("kaidah-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  Object.keys(KAIDAH_PRODUKSI).forEach(code => {
    const item = KAIDAH_PRODUKSI[code];
    const p = DATA_PENYAKIT[code];

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="rank-badge">${code}</span></td>
      <td><strong>${p.nama}</strong></td>
      <td><code style="font-family: Consolas, monospace; color: var(--navy-700);">${item.rule}</code></td>
    `;
    tbody.appendChild(tr);
  });
}

// 6. Render Tabel Gejala & Bobot Pakar (Tab 3) - Tampilan Rapi Berbentuk Chip
function renderGejalaPakarTabel() {
  const tbody = document.getElementById("gejala-pakar-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  DATA_GEJALA.forEach(g => {
    const relasiList = [];
    Object.keys(CF_PAKAR).forEach(pk => {
      if (CF_PAKAR[pk][g.kode] !== undefined) {
        relasiList.push({
          kode: pk,
          nama: DATA_PENYAKIT[pk].nama,
          cf: CF_PAKAR[pk][g.kode]
        });
      }
    });

    let relasiHtml = "";
    if (relasiList.length > 0) {
      relasiHtml = `
        <div class="relasi-chip-container">
          ${relasiList.map(item => `
            <div class="relasi-chip">
              <span class="relasi-chip-code">${item.kode}</span>
              <span class="relasi-chip-name">${item.nama}</span>
              <span class="relasi-chip-weight">CF ${item.cf.toFixed(1)}</span>
            </div>
          `).join("")}
        </div>
      `;
    } else {
      relasiHtml = `<span class="relasi-chip-empty">Tidak terkait langsung</span>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="rank-badge">${g.kode}</span></td>
      <td><strong style="color: var(--navy-900); font-weight: 600;">${g.nama}</strong></td>
      <td>${relasiHtml}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 7. Render Tabel 30 Sampel Pengujian Jurnal (Tab 4)
function renderPengujianTabel() {
  const tbody = document.getElementById("pengujian-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  DATA_PENGUJIAN_JURNAL.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.no}</strong></td>
      <td>${item.sistem}</td>
      <td>${item.pakar}</td>
      <td>
        <span class="status-pill ${item.sesuai ? "status-valid" : "status-diff"}">
          ${item.sesuai ? "Sesuai" : "Tidak Sesuai"}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ===================================================================
// MOTOR INFERENSI FORWARD CHAINING & CERTAINTY FACTOR
// ===================================================================

function bindFormEvents() {
  const form = document.getElementById("form-diagnosa");
  const btnReset = document.getElementById("btn-reset-diagnosa");
  const btnTutupHasil = document.getElementById("btn-tutup-hasil");

  // Submit Form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    eksekusiDiagnosa();
  });

  // Reset Form
  btnReset.addEventListener("click", () => {
    form.reset();

    // Kembalikan semua radio pill ke neutral
    document.querySelectorAll(".symptom-item-card").forEach(c => c.classList.remove("is-active"));
    document.querySelectorAll(".radio-option-pill").forEach(p => p.classList.remove("is-checked"));
    document.querySelectorAll(".radio-option-pill.is-neutral").forEach(p => p.classList.add("is-checked"));

    // Set radio value 0.0 checked
    DATA_GEJALA.forEach(g => {
      const neutralRadio = document.querySelector(`input[name="cf_${g.kode}"][value="0"]`);
      if (neutralRadio) neutralRadio.checked = true;
    });

    updateActiveSymptomCounter();
    document.getElementById("hasil-diagnosa-wrapper").style.display = "none";
  });

  // Tutup Hasil
  if (btnTutupHasil) {
    btnTutupHasil.addEventListener("click", () => {
      document.getElementById("hasil-diagnosa-wrapper").style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function setSymptomValue(kode, value) {
  const card = document.getElementById(`card-${kode}`);
  if (!card) return;

  const radio = card.querySelector(`input[type="radio"][value="${value}"]`);
  if (radio) {
    radio.checked = true;
    const parentGroup = radio.closest(".radio-pill-group");
    parentGroup.querySelectorAll(".radio-option-pill").forEach(p => p.classList.remove("is-checked"));
    radio.parentElement.classList.add("is-checked");

    if (value > 0) {
      card.classList.add("is-active");
    } else {
      card.classList.remove("is-active");
    }
  }
}

function eksekusiDiagnosa() {
  const namaPemilikInput = document.getElementById("nama-pemilik");
  const namaIkanInput = document.getElementById("nama-ikan");
  const namaPemilik = namaPemilikInput.value.trim();
  const namaIkan = namaIkanInput.value.trim() || "Ikan Cupang";

  // Validasi Blackbox Tabel 8 Kasus 1: "Nama lengkap tidak boleh kosong!"
  if (!namaPemilik) {
    alert("Nama lengkap tidak boleh kosong!");
    namaPemilikInput.focus();
    return;
  }

  // Validasi Blackbox Tabel 8 Kasus 2: "Nama lengkap tidak valid!"
  const regexValidName = /^[a-zA-Z0-9\s.,'()\-]+$/;
  if (!regexValidName.test(namaPemilik)) {
    alert("Nama lengkap tidak valid!");
    namaPemilikInput.focus();
    return;
  }

  // Ambil pilihan gejala pengguna
  const userSymptoms = {};
  DATA_GEJALA.forEach(g => {
    const checked = document.querySelector(`input[name="cf_${g.kode}"]:checked`);
    const val = checked ? parseFloat(checked.value) : 0.0;
    if (val > 0) {
      userSymptoms[g.kode] = val;
    }
  });

  const selectedCodes = Object.keys(userSymptoms);

  // Validasi Blackbox Tabel 8 Kasus 3: Jika tanpa memilih gejala -> "Ikan Cupang Anda Tidak Menderita Penyakit"
  if (selectedCodes.length === 0) {
    tampilkanHasilTanpaGejala(namaPemilik, namaIkan);
    return;
  }

  // Komputasi Forward Chaining & Certainty Factor
  const kalkulasiList = [];

  Object.keys(DATA_PENYAKIT).forEach(kodePenyakit => {
    const pakarRules = CF_PAKAR[kodePenyakit];
    const ruleInfo = KAIDAH_PRODUKSI[kodePenyakit];

    const gejalaCocok = [];
    const logSteps = [];

    // Cari gejala yang cocok
    Object.keys(pakarRules).forEach(gKode => {
      if (userSymptoms[gKode] !== undefined && userSymptoms[gKode] > 0) {
        const cfUser = userSymptoms[gKode];
        const cfExpert = pakarRules[gKode];
        const cfE = cfUser * cfExpert; // Persamaan (1)

        gejalaCocok.push({
          kode: gKode,
          cfUser: cfUser,
          cfPakar: cfExpert,
          cfE: cfE
        });
      }
    });

    // Cek kecocokan kaidah IF-THEN
    const kaidahGejala = ruleInfo.gejala;
    const matchCount = kaidahGejala.filter(g => selectedCodes.includes(g)).length;
    const totalRuleGejala = kaidahGejala.length;

    // Perhitungan Sekuensial Persamaan (2)
    let cfFinal = 0.0;

    if (gejalaCocok.length > 0) {
      let cfCombine = gejalaCocok[0].cfE;
      const combineSteps = [];

      for (let i = 1; i < gejalaCocok.length; i++) {
        const nextVal = gejalaCocok[i].cfE;
        const prev = cfCombine;
        cfCombine = prev + nextVal * (1 - prev);
        combineSteps.push({ step: i + 1, prev: prev.toFixed(3), next: nextVal.toFixed(3), result: cfCombine.toFixed(4) });
      }

      cfFinal = cfCombine;

      logSteps.push({
        kode: kodePenyakit,
        nama: DATA_PENYAKIT[kodePenyakit].nama,
        gejala: gejalaCocok,
        cfAwal: gejalaCocok[0].cfE.toFixed(3),
        combineSteps: combineSteps,
        cfFinal: cfFinal.toFixed(4),
        cfPersen: (cfFinal * 100).toFixed(2) + "%"
      });
    }

    kalkulasiList.push({
      kode: kodePenyakit,
      nama: DATA_PENYAKIT[kodePenyakit].nama,
      rule: ruleInfo.rule,
      cfFinal: cfFinal,
      cfPersen: (cfFinal * 100).toFixed(1) + "%",
      gejalaCocok: gejalaCocok,
      matchRatio: `${matchCount}/${totalRuleGejala}`,
      logSteps: logSteps
    });
  });

  // Urutkan ranking berdasarkan CF tertinggi
  kalkulasiList.sort((a, b) => b.cfFinal - a.cfFinal);
  const penyakitUtama = kalkulasiList[0];

  tampilkanHasilLengkap(namaPemilik, namaIkan, penyakitUtama, kalkulasiList, userSymptoms);
}

// Menampilkan Hasil Kasus Sehat (Tabel 8 Kasus 3)
function tampilkanHasilTanpaGejala(namaPemilik, namaIkan) {
  const wrapper = document.getElementById("hasil-diagnosa-wrapper");
  wrapper.style.display = "block";

  document.getElementById("hasil-nama-penyakit").textContent = "Ikan Cupang Anda Tidak Menderita Penyakit";
  document.getElementById("hasil-latin-penyakit").textContent = "Kondisi Sehat & Normal (Normal Physiological State)";
  document.getElementById("hasil-cf-persen").textContent = "0.0%";
  document.getElementById("hasil-cf-desimal").textContent = "Nilai CF: 0.00";
  document.getElementById("cf-progress-fill").style.width = "0%";
  document.getElementById("hasil-cf-kategori").textContent = "Kondisi Sehat";

  document.getElementById("hasil-nama-pemilik").textContent = namaPemilik;
  document.getElementById("hasil-nama-ikan").textContent = namaIkan;
  const elRuleSehat = document.getElementById("hasil-rule-matched");
  if (elRuleSehat) elRuleSehat.textContent = "Tidak Ada Premis Gejala Terpilih";

  document.getElementById("hasil-daftar-gejala-terpilih").innerHTML = `
    <div class="symptom-tag-card" style="grid-column: 1 / -1;">
      <span class="tag-name">Tidak ada gejala penyakit abnormal yang dipilih oleh pemilik.</span>
    </div>
  `;

  document.getElementById("hasil-deskripsi-penyakit").textContent =
    "Sesuai pengujian Blackbox pada Tabel 8 kasus nomor 3 di jurnal, apabila formulir nama diisi dengan benar namun pengguna tidak mencentang kondisi gejala penyakit apa pun, sistem memberikan kesimpulan bahwa ikan cupang berada dalam kondisi prima dan tidak terinfeksi penyakit.";

  document.getElementById("hasil-pengobatan-penyakit").innerHTML =
    "<p>Tidak diperlukan obat-obatan kimia maupun karantina. Lanjutkan pemberian makan teratur dan rawat air secara berkala.</p>";

  document.getElementById("hasil-pencegahan-penyakit").innerHTML =
    "<p>Pertahankan suhu air stabil (26°C - 28°C), gunakan air endapan bersih, dan berikan pakan hidup yang higienis secukupnya.</p>";

  document.getElementById("hasil-ranking-tbody").innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 18px;">
          Tidak ada peringkat penyakit karena seluruh gejala bernilai netral (0.0).
        </td>
      </tr>
    `;

  document.getElementById("hasil-kalkulasi-detail").innerHTML = `<div class="calc-empty">Tidak ada proses komputasi Certainty Factor.</div>`;
  wrapper.scrollIntoView({ behavior: "smooth" });
}

// Menampilkan Hasil Lengkap
function tampilkanHasilLengkap(namaPemilik, namaIkan, utama, ranking, userSymptoms) {
  const wrapper = document.getElementById("hasil-diagnosa-wrapper");
  wrapper.style.display = "block";

  const pDetail = DATA_PENYAKIT[utama.kode];

  // Identitas Penyakit
  document.getElementById("hasil-nama-penyakit").textContent = `${utama.kode} - ${pDetail.nama}`;
  document.getElementById("hasil-latin-penyakit").textContent = pDetail.latin;
  document.getElementById("hasil-cf-persen").textContent = utama.cfPersen;
  document.getElementById("hasil-cf-desimal").textContent = `Nilai CF: ${utama.cfFinal.toFixed(3)}`;

  // Bar progress
  const percentVal = Math.min(100, Math.max(0, utama.cfFinal * 100));
  document.getElementById("cf-progress-fill").style.width = `${percentVal.toFixed(1)}%`;

  // Kategori keyakinan
  let confidenceTag = "Tingkat Keyakinan Rendah";
  if (percentVal >= 75) confidenceTag = "Tingkat Keyakinan Sangat Tinggi";
  else if (percentVal >= 50) confidenceTag = "Tingkat Keyakinan Tinggi";
  else if (percentVal >= 25) confidenceTag = "Tingkat Keyakinan Sedang";
  document.getElementById("hasil-cf-kategori").textContent = confidenceTag;

  // Metadata Konsultasi
  document.getElementById("hasil-nama-pemilik").textContent = namaPemilik;
  document.getElementById("hasil-nama-ikan").textContent = namaIkan;
  const elRuleMatched = document.getElementById("hasil-rule-matched");
  if (elRuleMatched) elRuleMatched.textContent = utama.rule;

  // Render Kartu Gejala Terindikasi
  const containerGejala = document.getElementById("hasil-daftar-gejala-terpilih");
  containerGejala.innerHTML = "";

  if (utama.gejalaCocok.length > 0) {
    utama.gejalaCocok.forEach(gc => {
      const gObj = DATA_GEJALA.find(g => g.kode === gc.kode);
      const card = document.createElement("div");
      card.className = "symptom-tag-card";
      card.innerHTML = `
        <div class="tag-card-top">
          <span class="tag-code">${gc.kode}</span>
          <span class="tag-name">${gObj ? gObj.nama : gc.kode}</span>
        </div>
        <div class="tag-metrics">
          <div class="tag-metric-box">
            <span class="metric-title">User</span>
            <span class="metric-num">${gc.cfUser}</span>
          </div>
          <div class="tag-metric-divider">&times;</div>
          <div class="tag-metric-box">
            <span class="metric-title">Pakar</span>
            <span class="metric-num">${gc.cfPakar}</span>
          </div>
          <div class="tag-metric-divider">=</div>
          <div class="tag-metric-box highlight">
            <span class="metric-title">CF Gejala</span>
            <span class="metric-num">${gc.cfE.toFixed(2)}</span>
          </div>
        </div>
      `;
      containerGejala.appendChild(card);
    });
  } else {
    Object.keys(userSymptoms).forEach(code => {
      const gObj = DATA_GEJALA.find(g => g.kode === code);
      const card = document.createElement("div");
      card.className = "symptom-tag-card";
      card.innerHTML = `
        <div class="tag-card-top">
          <span class="tag-code">${code}</span>
          <span class="tag-name">${gObj ? gObj.nama : code}</span>
        </div>
        <div class="tag-metrics">
          <div class="tag-metric-box highlight">
            <span class="metric-title">Keyakinan User</span>
            <span class="metric-num">${userSymptoms[code]}</span>
          </div>
        </div>
      `;
      containerGejala.appendChild(card);
    });
  }

  // Deskripsi & Terapi Medis
  document.getElementById("hasil-deskripsi-penyakit").textContent = pDetail.deskripsi;
  document.getElementById("hasil-pengobatan-penyakit").innerHTML = `<ul>${pDetail.pengobatan.map(item => `<li>${item}</li>`).join("")}</ul>`;
  document.getElementById("hasil-pencegahan-penyakit").innerHTML = `<ul>${pDetail.pencegahan.map(item => `<li>${item}</li>`).join("")}</ul>`;

  // Tabel Peringkat Semua Penyakit
  const tbodyRanking = document.getElementById("hasil-ranking-tbody");
  tbodyRanking.innerHTML = "";
  ranking.forEach((r, idx) => {
    const tr = document.createElement("tr");
    if (idx === 0) tr.className = "top-rank-row";

    tr.innerHTML = `
      <td><span class="rank-badge">${idx + 1}</span></td>
      <td><strong>${r.kode}</strong></td>
      <td>${r.nama}</td>
      <td>${r.matchRatio} Gejala Kaidah Terpenuhi</td>
      <td><strong>${r.cfFinal.toFixed(4)}</strong></td>
      <td><strong>${r.cfPersen}</strong></td>
    `;
    tbodyRanking.appendChild(tr);
  });

  // Komputasi Matematis — render sebagai HTML terstruktur
  const mathBox = document.getElementById("hasil-kalkulasi-detail");
  const steps = utama.logSteps; // array of step objects

  if (!steps || steps.length === 0) {
    mathBox.innerHTML = `<div class="calc-empty">Tidak ada proses komputasi Certainty Factor.</div>`;
  } else {
    const s = steps[0];
    let html = "";

    // Blok Persamaan (1)
    html += `<div class="calc-block">`;
    html += `<div class="calc-block-label">① Persamaan (1) — CF[h,e] = CF<sub>user</sub> × CF<sub>pakar</sub></div>`;
    html += `<div class="calc-rows">`;
    s.gejala.forEach((g, i) => {
      const gObj = DATA_GEJALA.find(x => x.kode === g.kode);
      html += `
        <div class="calc-row">
          <span class="calc-row-idx">${i + 1}</span>
          <span class="calc-row-code">${g.kode}</span>
          <span class="calc-row-name">${gObj ? gObj.nama : g.kode}</span>
          <span class="calc-row-eq">
            ${g.cfUser} &times; ${g.cfPakar}
            <span class="calc-row-arrow">=</span>
            <strong class="calc-row-result">${g.cfE.toFixed(3)}</strong>
          </span>
        </div>`;
    });
    html += `</div></div>`;

    // Blok Persamaan (2)
    html += `<div class="calc-block">`;
    html += `<div class="calc-block-label">② Persamaan (2) — CF<sub>gabungan</sub> = CF<sub>1</sub> + CF<sub>2</sub> × (1 − CF<sub>1</sub>)</div>`;
    html += `<div class="calc-rows">`;
    html += `
      <div class="calc-row calc-row-init">
        <span class="calc-row-idx">0</span>
        <span class="calc-row-name">Nilai awal CF gejala pertama (${s.gejala[0].kode})</span>
        <span class="calc-row-eq"><strong class="calc-row-result">${s.cfAwal}</strong></span>
      </div>`;
    if (s.combineSteps.length === 0) {
      html += `<div class="calc-row"><span class="calc-row-name" style="grid-column:2/-1; color:var(--text-muted);">Hanya 1 gejala — tidak ada kombinasi sekuensial.</span></div>`;
    } else {
      s.combineSteps.forEach(cs => {
        html += `
          <div class="calc-row">
            <span class="calc-row-idx">${cs.step}</span>
            <span class="calc-row-name">Kombinasi ke-${cs.step}</span>
            <span class="calc-row-eq">
              ${cs.prev} + ${cs.next} &times; (1 &minus; ${cs.prev})
              <span class="calc-row-arrow">=</span>
              <strong class="calc-row-result">${cs.result}</strong>
            </span>
          </div>`;
      });
    }
    html += `</div></div>`;

    // Skor Akhir
    html += `
      <div class="calc-final-row">
        <span class="calc-final-label">Skor CF Akhir — ${s.kode} (${s.nama})</span>
        <span class="calc-final-value">${s.cfFinal}</span>
        <span class="calc-final-persen">${s.cfPersen}</span>
      </div>`;

    mathBox.innerHTML = html;
  }

  wrapper.scrollIntoView({ behavior: "smooth" });
}

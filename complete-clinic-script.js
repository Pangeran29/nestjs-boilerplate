const { EMedicineUnit, EGapUnit } = require("@prisma/client")

const clinic = {
  name: 'Mariana Beauty Aesthetic Padalarang - Klinik Dokter Kecantikan Skincare Spesialis Flek dan Awet Muda',
  ownerName: "Mariana Beauty",
  address:
    'Jl. Raya Padalarang No.467B, Kertamulya, Kec. Padalarang, Kabupaten Bandung Barat, Jawa Barat 40553',
  phoneNumber: '6285659833710',
  accountOnClinic: {
    create: {
      account: {
        create: {
          username: 'mariana_padalarang',
          password: "mariana_padalarang@952270",
          role: "Clinic",
        },
      },
    },
  },
  patientOnClinic: {
    create: {
      patient: {
        create: {
          name: "Mariana",
          gender: "Female",
          birthDate: '2000-01-01',
          identityCardNumber: null,
          address: null,
          phoneNumber: '6289602828667',
          email: null,
          bloodType: null,
          allergies: null,
        },
      },
    },
  },
  medicine: {
    createMany: {
      data: [
        {
          name: 'Anti Aging Cream',
          stock: 50,
          price: 127000,
          description:
            'Cream yang mengandung anti oksidan tinggi yang berfungsi untuk mencerahkan dan mengencangkan. Penggunaan, campurkan dengan cream pagi dan malam.',
          unit: EMedicineUnit.Ointment,
        },
        {
          name: 'Collagen Cream',
          stock: 50,
          price: 65000,
          description:
            'Vitamin berisi kolagen yang dapat menutrisi dan mengencangkan wajah. Untuk pemakaian, oles di wajah dan leher diamkan 20 menit dan bersihkan dengan sponge basah. Sangat baik untuk message wajah di kabin. Homecare 3 hari sekali.',
          unit: EMedicineUnit.Ointment,
        },
      ],
    },
  },
  followUpCategory: {
    createMany: {
      data: [
        {
          name: 'Salam dan terima kasih',
          dayOfFollowUp: 0,
          description: `Halo [NAMA_PASIEN],

Terima kasih telah mempercayakan kesehatan Anda kepada [NAMA_KLINIK]. Kami senang bisa membantu Anda menuju pemulihan! 😊

Untuk melihat detail pengobatan Anda, silakan klik link berikut: 🔗 [LINK_HISTORY_PENGOBATAN]
Gunakan password: [TANGGAL_LAHIR_PASIEN] untuk mengaksesnya.

Kami berharap Anda lekas pulih dan selalu dalam keadaan sehat. Jika ada pertanyaan atau butuh bantuan, jangan ragu untuk menghubungi kami di [NOMOR_KLINIK].

💙 Semoga segera sehat kembali!
Salam hangat,
[NAMA_KLINIK]`,
          isDefault: true,
        },
        {
          name: 'Pengingat Treatment Pencerah Bekas Jerawat Tahap 1',
          dayOfFollowUp: 0,
          description: `Hai [NAMA_PASIEN], apa kabar? Semoga harimu menyenangkan ya! ✨ Masih ingat 'kan, terakhir kita treatment Pencerah Bekas Jerawat yang pertama? Nah, biar hasilnya makin maksimal dan glowing, jangan sampai telat untuk tahap selanjutnya ya!

__Kontrol rutin itu penting banget__ untuk bantu kulitmu melawan noda bekas jerawat yang membandel. Kalau telat, sayang banget efek cerahnya bisa berkurang, lho. 🥺

📄 Lihat progress kamu di sini: [LINK_HISTORY_PENGOBATAN]

Yuk, segera booking jadwal Pencerah Bekas Jerawat Tahap 2! Ada diskon 10% khusus untuk kamu yang booking minggu ini. Slots terbatas ya! 😉

📞 [NOMOR_KLINIK] ([NAMA_KLINIK])
`,
          isDefault: true,
        },
        {
          "specialFollowUpType": "BIRTHDAY",
          "name": "Special Birthday",
          "dayOfFollowUp": 0,
          isDefault: false,
          "repeatFor": -1,
          "description": `🎉 *Happy Birthday, [NAMA_PASIEN]!*

Hari spesial = alasan terbaik buat manjain diri ✨  
Kapan terakhir kamu touch-up perawatan? 😉

📄 Cek hasil perawatanmu di sini:  
[LINK_HISTORY_PENGOBATAN]

🎁 _Spesial ulang tahun_, kamu dapet **DISKON 15%** untuk treatment pilihan di [NAMA_KLINIK]  
_Berlaku 7 hari dari tanggal ulang tahunmu: [TANGGAL_LAHIR_PASIEN]_

Yuk booking sekarang sebelum kelewat — tinggal klik WA:  
📞 [NOMOR_KLINIK]
`
        },
        {
          "name": "Pengingat Penggunaan Anti Aging Cream",
          "dayOfFollowUp": 0,
          "gap": 1,
          "gapUnit": EGapUnit.day,
          "description": "Halo, [NAMA_PASIEN]! 👋 Semoga harimu menyenangkan!\n\nJangan lupa pakai Anti Aging Cream-nya ya. 😉 __Pemakaian rutin bantu jaga kulit tetap kenyal dan awet muda.__ Kalau sampai lupa, efek baiknya bisa berkurang lho!\n\n📄 Lihat progress kamu di sini: [LINK_HISTORY_PENGOBATAN]\n\nYuk, rawat kulitmu dengan baik! Booking lagi untuk konsultasi atau treatment lanjutan? Ada slot terbatas minggu ini!\n\n📞 [NOMOR_KLINIK] ([NAMA_KLINIK])",
          "repeatFor": 3,
          isDefault: false,

        }
      ],
    },
  },
}

console.log(JSON.stringify(clinic, null, 2))
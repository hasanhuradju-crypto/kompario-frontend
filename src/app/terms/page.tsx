import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 md:px-8">
      <h1 className="text-4xl font-black text-slate-800 mb-8">Syarat & Ketentuan</h1>
      
      <div className="prose prose-slate prose-lg max-w-none text-slate-600">
        <p className="mb-6">
          <strong>Terakhir Diperbarui: {new Date().toLocaleDateString('id-ID')}</strong>
        </p>

        <p className="mb-6">
          Selamat datang di Kompario.id. Dengan mengakses atau menggunakan situs web ini, Anda setuju untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">1. Layanan Kami</h2>
        <p className="mb-6">
          Kompario.id menyediakan layanan mesin pencari dan agregator informasi harga produk dari berbagai platform e-commerce (seperti Tokopedia, Shopee, Lazada, dll). Kami <strong>tidak</strong> menjual produk, tidak memproses pembayaran, dan tidak menangani pengiriman barang.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">2. Akurasi Informasi</h2>
        <p className="mb-6">
          Meskipun kami berusaha menyajikan data harga dan ketersediaan seakurat mungkin secara real-time, kami tidak menjamin bahwa informasi yang ditampilkan di Kompario.id selalu 100% akurat atau mutakhir. Harga dan ketersediaan produk di platform pihak ketiga dapat berubah sewaktu-waktu. Segala keputusan pembelian dilakukan di situs pihak ketiga dan sepenuhnya menjadi tanggung jawab Anda.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">3. Tautan Pihak Ketiga (Affiliate Links)</h2>
        <p className="mb-6">
          Situs ini berisi tautan yang mengarah ke situs web pihak ketiga. Beberapa dari tautan ini mungkin merupakan tautan afiliasi, di mana kami dapat menerima komisi atas pembelian yang Anda lakukan (tanpa biaya tambahan bagi Anda). Kami tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik dari situs web pihak ketiga mana pun.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">4. Batasan Tanggung Jawab</h2>
        <p className="mb-6">
          Kompario.id beserta tim pengembangnya tidak bertanggung jawab atas segala kerugian, penipuan, kerusakan, atau perselisihan yang mungkin timbul antara Anda dan penjual di platform e-commerce pihak ketiga. Semua keluhan mengenai produk, pengiriman, atau pembayaran harus ditujukan langsung kepada platform e-commerce terkait.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">5. Hak Kekayaan Intelektual</h2>
        <p className="mb-6">
          Semua merek dagang, logo, dan nama platform e-commerce yang disebutkan di situs ini adalah milik dari pemilik sah masing-masing. Penggunaannya di sini hanya untuk tujuan referensi dan perbandingan.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">6. Perubahan Syarat</h2>
        <p className="mb-6">
          Kami berhak untuk memperbarui atau mengubah Syarat dan Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan Anda atas situs ini setelah perubahan tersebut merupakan bentuk persetujuan Anda terhadap Syarat dan Ketentuan yang direvisi.
        </p>
      </div>
    </div>
  );
}

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 md:px-8">
      <h1 className="text-4xl font-black text-slate-800 mb-8">Kebijakan Privasi</h1>
      
      <div className="prose prose-slate prose-lg max-w-none text-slate-600">
        <p className="mb-6">
          <strong>Terakhir Diperbarui: {new Date().toLocaleDateString('id-ID')}</strong>
        </p>

        <p className="mb-6">
          Selamat datang di Kompario.id. Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda menggunakan situs web kami.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">1. Pengumpulan Informasi</h2>
        <p className="mb-4">
          Kami mengumpulkan informasi dari Anda saat Anda mengunjungi situs kami, melakukan pencarian, atau berinteraksi dengan fitur kami.
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2"><strong>Data Pencarian:</strong> Kata kunci yang Anda masukkan untuk mencari produk.</li>
          <li className="mb-2"><strong>Data Teknis:</strong> Alamat IP, jenis browser, sistem operasi, dan halaman yang Anda kunjungi.</li>
          <li className="mb-2"><strong>Cookies:</strong> Kami menggunakan cookies untuk meningkatkan pengalaman pengguna dan melacak interaksi.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">2. Pemasaran Afiliasi (Affiliate Disclosure)</h2>
        <p className="mb-6">
          Kompario.id adalah peserta dalam berbagai program afiliasi e-commerce, termasuk namun tidak terbatas pada Tokopedia, Shopee, Lazada, dan jaringan pihak ketiga seperti Involve Asia. Ini berarti kami mungkin menempatkan tautan afiliasi pada hasil pencarian produk. Jika Anda mengeklik tautan tersebut dan melakukan pembelian, kami dapat menerima komisi kecil <strong>tanpa biaya tambahan bagi Anda</strong>.
        </p>
        <p className="mb-6">
          Program afiliasi ini menggunakan cookies untuk melacak transaksi yang berasal dari situs kami. Kebijakan mengenai cookie pihak ketiga ini diatur oleh masing-masing platform e-commerce dan jaringan afiliasi terkait.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">3. Penggunaan Informasi</h2>
        <p className="mb-4">Informasi yang kami kumpulkan digunakan untuk:</p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">Meningkatkan algoritma mesin pencari kami.</li>
          <li className="mb-2">Menganalisis tren penggunaan situs.</li>
          <li className="mb-2">Memastikan sistem pelacakan afiliasi berfungsi dengan baik.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">4. Keamanan Data</h2>
        <p className="mb-6">
          Kami menerapkan langkah-selangkah keamanan teknis yang wajar untuk melindungi informasi Anda dari akses yang tidak sah. Namun, tidak ada transmisi data melalui internet yang 100% aman.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">5. Perubahan Kebijakan</h2>
        <p className="mb-6">
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini beserta tanggal pembaruan.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">6. Hubungi Kami</h2>
        <p className="mb-6">
          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:support@kompario.id" className="text-blue-600 hover:underline">support@kompario.id</a>.
        </p>
      </div>
    </div>
  );
}

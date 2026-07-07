import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 md:px-8">
      <h1 className="text-4xl font-black text-slate-800 mb-8">Tentang Kami</h1>
      
      <div className="prose prose-slate prose-lg max-w-none text-slate-600">
        <p className="text-xl text-slate-700 font-medium mb-6">
          Kompario.id adalah mesin pencari dan platform perbandingan harga independen terdepan di Indonesia. Kami mendedikasikan teknologi kami untuk membantu Anda menemukan penawaran terbaik di seluruh jaringan e-commerce.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Misi Kami</h2>
        <p className="mb-4">
          Belanja online seharusnya mudah dan transparan. Namun, dengan banyaknya marketplace yang tersedia saat ini, konsumen seringkali harus menghabiskan waktu berjam-jam membuka berbagai aplikasi hanya untuk memastikan mereka mendapatkan harga termurah.
        </p>
        <p className="mb-6">
          Misi kami sederhana: <strong>Mengembalikan waktu dan uang Anda.</strong> Melalui teknologi agregasi data real-time, kami mengumpulkan, menyaring, dan menyajikan perbandingan harga dari platform raksasa seperti Tokopedia, Shopee, Lazada, dan TikTok Shop dalam satu layar yang bersih dan mudah digunakan.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Independensi Kami</h2>
        <p className="mb-6">
          Kompario.id adalah entitas independen. Hasil pencarian dan perbandingan harga yang kami tampilkan sepenuhnya didasarkan pada data real-time dari masing-masing marketplace tanpa manipulasi. Kami menggunakan algoritma objektif untuk menampilkan harga terendah, agar Anda dapat membuat keputusan belanja yang paling cerdas.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-4">Hubungi Kami</h2>
        <p className="mb-6">
          Kami selalu berinovasi untuk memberikan pengalaman komparasi terbaik. Jika Anda memiliki pertanyaan, saran, atau ingin bekerja sama, jangan ragu untuk menghubungi tim kami melalui <a href="mailto:support@kompario.id" className="text-blue-600 font-bold hover:underline">support@kompario.id</a>.
        </p>
      </div>
    </div>
  );
}

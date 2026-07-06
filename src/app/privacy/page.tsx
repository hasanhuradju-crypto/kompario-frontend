"use client";

import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "10 November 2023";

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto shadow-xl shadow-slate-900/20">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            Kebijakan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Privasi</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Terakhir diperbarui pada: {lastUpdated}
          </p>
        </div>

        {/* Content Container */}
        <div className="glass bg-white/80 rounded-[2.5rem] p-8 md:p-12 border border-white shadow-2xl shadow-slate-200/50">
          
          <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100 mb-10">
            <Lock className="text-blue-600 shrink-0" size={32} />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Komitmen Keamanan Kami</h3>
              <p className="text-slate-600 text-sm">
                Kompario.ID berkomitmen kuat untuk melindungi privasi Anda. Kami tidak akan pernah menjual data pribadi Anda kepada pihak ketiga manapun untuk tujuan pemasaran tanpa izin eksplisit Anda.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Informasi yang Kami Kumpulkan</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Saat Anda menggunakan Kompario.ID, kami mengumpulkan jenis informasi berikut untuk meningkatkan pengalaman berbelanja Anda:
          </p>
          <ul className="list-disc pl-5 text-slate-600 mb-8 space-y-2 leading-relaxed">
            <li><strong>Informasi yang Anda berikan:</strong> Nama, alamat email, dan kata sandi saat Anda mendaftar akun.</li>
            <li><strong>Data Pencarian:</strong> Riwayat pencarian produk (seperti kata kunci "laptop asus") untuk memberikan rekomendasi yang lebih baik.</li>
            <li><strong>Data Teknis:</strong> Alamat IP, jenis peramban (browser), sistem operasi, dan cookies.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Informasi yang dikumpulkan digunakan semata-mata untuk mengoperasikan, memelihara, dan menyediakan fitur-fitur dari layanan kami:
          </p>
          <ul className="space-y-4 my-6">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
              <span className="text-slate-600 leading-relaxed">Untuk mempersonalisasi rekomendasi produk berdasarkan minat Anda.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
              <span className="text-slate-600 leading-relaxed">Untuk mengirimkan notifikasi (jika diaktifkan) saat harga barang yang Anda pantau turun.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
              <span className="text-slate-600 leading-relaxed">Untuk mencegah aktivitas penipuan dan menjaga keamanan akun Anda.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Cookies dan Teknologi Pelacakan</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Kami menggunakan "cookies" (berkas teks kecil yang disimpan di perangkat Anda) untuk menyimpan preferensi Anda (seperti status login atau mode gelap). Anda dapat menginstruksikan peramban Anda untuk menolak semua cookies, namun beberapa bagian dari situs kami mungkin tidak berfungsi dengan baik.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Pembagian Data dengan Pihak Ketiga</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Sebagai mesin pencari produk (*aggregator*), ketika Anda mengklik sebuah produk, Anda akan diarahkan ke *marketplace* pihak ketiga (seperti Tokopedia, Shopee, Lazada). Harap dicatat bahwa:
          </p>
          <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl text-slate-700 italic mb-8">
            Kebijakan privasi situs pihak ketiga tersebut berlaku segera setelah Anda meninggalkan domain Kompario.ID. Kami tidak bertanggung jawab atas pengumpulan data yang dilakukan oleh platform e-commerce tersebut.
          </blockquote>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Keamanan Data</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Kami menerapkan berbagai standar langkah keamanan industri untuk menjaga keamanan informasi pribadi Anda, termasuk enkripsi basis data dan koneksi <em className="italic">Secure Socket Layer (SSL)</em>. Meski begitu, tidak ada metode transmisi di Internet yang 100% aman.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">6. Perubahan Kebijakan Privasi</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diumumkan di halaman ini dengan memperbarui tanggal "Terakhir diperbarui" di atas.
          </p>

          <hr className="my-10 border-slate-200" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <FileText className="text-slate-400" size={24} />
              <div>
                <p className="text-sm font-bold text-slate-900">Punya Pertanyaan?</p>
                <p className="text-sm text-slate-500">Hubungi tim privasi kami.</p>
              </div>
            </div>
            <Link href="/kontak" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
              Hubungi Kami
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

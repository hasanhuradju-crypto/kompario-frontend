"use client";

import Link from "next/link";
import { Search, ShieldCheck, Zap, ArrowRight, TrendingUp } from "lucide-react";

export default function TentangPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-rose-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            Misi Kami: Membuat Belanja Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Lebih Transparan</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Kompario.ID hadir sebagai mesin pencari independen yang membantu jutaan orang Indonesia menemukan harga terbaik, menghindari diskon palsu, dan berbelanja dengan lebih cerdas.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="glass bg-white/50 rounded-[2rem] p-8 border border-white/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Pencarian Universal</h3>
            <p className="text-slate-600 leading-relaxed">
              Satu kotak pencarian untuk mencari di seluruh platform: Tokopedia, Shopee, Lazada, dan TikTok Shop sekaligus tanpa harus membuka banyak tab.
            </p>
          </div>

          <div className="glass bg-white/50 rounded-[2rem] p-8 border border-white/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/30">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Pelacak Riwayat Harga</h3>
            <p className="text-slate-600 leading-relaxed">
              Jangan tertipu "Harga Coret". Sistem kami melacak fluktuasi harga produk dari waktu ke waktu sehingga Anda tahu kapan diskon tersebut benar-benar asli.
            </p>
          </div>

          <div className="glass bg-white/50 rounded-[2rem] p-8 border border-white/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/30">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Rekomendasi Netral</h3>
            <p className="text-slate-600 leading-relaxed">
              Algoritma kami mengurutkan produk secara objektif berdasarkan harga termurah, reputasi toko, dan ulasan pembeli, bukan berdasarkan siapa yang membayar iklan tertinggi.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-700 relative overflow-hidden mb-20 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-600/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-white drop-shadow-md">Cerita di Balik <br />Kompario.ID</h2>
              <p className="text-slate-200 mb-5 text-lg font-medium leading-relaxed drop-shadow-sm">
                Ide aplikasi ini bermula dari rasa frustrasi saat harus membuka 4 aplikasi berbeda hanya untuk mencari harga <span className="font-bold text-blue-300">skincare</span> atau <span className="font-bold text-blue-300">gadget</span> termurah. 
              </p>
              <p className="text-slate-200 mb-8 text-lg font-medium leading-relaxed drop-shadow-sm">
                Seringkali harga yang tertera murah, ternyata belum termasuk ongkir, atau merupakan barang palsu. Kami membangun sistem komparasi ini agar masyarakat bisa berbelanja dengan perlindungan informasi yang kuat.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all">
                Mulai Bandingkan Harga <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-square bg-gradient-to-tr from-slate-800 to-slate-700 rounded-3xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border border-slate-600/50 flex flex-col justify-between">
                <div className="w-full flex gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-600/50 rounded-full w-3/4"></div>
                  <div className="h-4 bg-slate-600/50 rounded-full w-1/2"></div>
                  <div className="h-4 bg-slate-600/50 rounded-full w-5/6"></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-600/50 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-slate-600/50 rounded-lg w-full"></div>
                    <div className="h-6 bg-blue-500/50 rounded-lg w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

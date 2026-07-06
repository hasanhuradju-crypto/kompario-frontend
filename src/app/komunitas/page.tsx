"use client";

import Link from "next/link";
import { MessageSquare, ThumbsUp, Users, Award, ChevronRight, TrendingUp, Search } from "lucide-react";

export default function KomunitasPage() {
  const discussions = [
    {
      id: 1,
      author: "Budi Santoso",
      avatar: "https://i.pravatar.cc/150?u=budi",
      badge: "Tech Guru",
      title: "Hati-hati beli iPhone Ex-Inter di Shopee! Ini pengalamanku",
      excerpt: "Banyak toko yang menjanjikan IMEI aman, tapi setelah 3 bulan sinyal hilang. Berikut ciri-ciri toko yang harus dihindari...",
      category: "Keamanan",
      replies: 45,
      likes: 128,
      time: "2 jam yang lalu"
    },
    {
      id: 2,
      author: "Siti Aminah",
      avatar: "https://i.pravatar.cc/150?u=siti",
      badge: "Beauty Expert",
      title: "Rekomendasi Skincare Viral TikTok yang Beneran Bagus (Bukan Endorse)",
      excerpt: "Aku udah cobain 5 serum yang lagi viral banget minggu ini. Yuk bahas mana yang beneran ngaruh dan mana yang zonk.",
      category: "Review",
      replies: 89,
      likes: 342,
      time: "5 jam yang lalu"
    },
    {
      id: 3,
      author: "Rizky Firmansyah",
      avatar: "https://i.pravatar.cc/150?u=rizky",
      badge: "Deal Hunter",
      title: "Promo 11.11: Tokopedia vs Shopee, Siapa yang paling ngasih diskon gede?",
      excerpt: "Dari hasil tracking harga gue sebulan terakhir, ternyata banyak barang elektronik yang harganya dinaikin dulu lho.",
      category: "Diskusi Harga",
      replies: 112,
      likes: 56,
      time: "1 hari yang lalu"
    }
  ];

  const topContributors = [
    { name: "Siti Aminah", points: "15.4k", avatar: "https://i.pravatar.cc/150?u=siti" },
    { name: "Rizky Firmansyah", points: "12.2k", avatar: "https://i.pravatar.cc/150?u=rizky" },
    { name: "Budi Santoso", points: "9.8k", avatar: "https://i.pravatar.cc/150?u=budi" },
    { name: "Dewi Lestari", points: "8.5k", avatar: "https://i.pravatar.cc/150?u=dewi" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
      <div className="absolute top-60 left-10 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
              Komunitas <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Pejuang Diskon</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Ruang diskusi independen untuk berbagi review jujur, membongkar toko penipu, dan berburu promo terbaik.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari topik diskusi..." 
                className="w-full md:w-64 pl-12 pr-4 py-3 rounded-2xl bg-white/50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
              />
            </div>
            <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">
              <MessageSquare size={20} />
              Buat Topik
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <button className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-sm">Sedang Hangat</button>
              <button className="px-4 py-2 bg-white/50 text-slate-600 font-bold rounded-xl text-sm border border-slate-200 hover:bg-white transition-colors">Terbaru</button>
              <button className="px-4 py-2 bg-white/50 text-slate-600 font-bold rounded-xl text-sm border border-slate-200 hover:bg-white transition-colors hidden sm:block">Belum Terjawab</button>
            </div>

            {discussions.map((thread) => (
              <div key={thread.id} className="glass bg-white/60 rounded-[2rem] p-6 border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <img src={thread.avatar} alt={thread.author} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900">{thread.author}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">{thread.badge}</span>
                      <span className="text-xs text-slate-400 ml-auto">{thread.time}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2 hover:text-emerald-600 cursor-pointer transition-colors leading-tight">
                      {thread.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {thread.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 cursor-pointer">
                        <MessageSquare size={18} /> {thread.replies} Balasan
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-rose-600 cursor-pointer">
                        <ThumbsUp size={18} /> {thread.likes} Suka
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full ml-auto">
                        {thread.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button className="w-full py-4 glass bg-white/40 border border-slate-200 rounded-2xl text-slate-700 font-bold hover:bg-white/60 transition-colors flex items-center justify-center gap-2">
              Muat Lebih Banyak Topik <ChevronRight size={18} />
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Top Contributors */}
            <div className="glass bg-white/50 rounded-[2rem] p-6 border border-white/60">
              <div className="flex items-center gap-2 mb-6">
                <Award className="text-amber-500" size={24} />
                <h3 className="text-lg font-bold text-slate-900">Kontributor Top Minggu Ini</h3>
              </div>
              
              <div className="space-y-4">
                {topContributors.map((user, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-colors cursor-pointer">
                    <span className="text-lg font-black text-slate-300 w-4">{index + 1}</span>
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm">{user.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{user.points} Reputasi</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Tags */}
            <div className="glass bg-slate-900 rounded-[2rem] p-6 border border-slate-700 text-white relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="text-emerald-400" size={24} />
                  <h3 className="text-lg font-bold">Topik Populer</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['#Harbolnas', '#ReviewJujur', '#TokoPenipu', '#SkincareLokal', '#RekomendasiLaptop', '#DiskonPalsu'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:border-emerald-500 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="glass bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-6 text-white shadow-xl shadow-emerald-500/20 text-center">
              <Users size={32} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">Jadilah Bagian dari Kami!</h3>
              <p className="text-emerald-100 text-sm mb-6">
                Bantu ribuan orang lainnya menemukan deal terbaik dengan membagikan ulasan jujur Anda.
              </p>
              <button className="w-full py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Daftar Sekarang
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

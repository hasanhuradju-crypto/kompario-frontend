"use client";

import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "Membongkar Trik 'Diskon Palsu' di Harbolnas: Panduan Belanja Aman",
    excerpt: "Menjelang hari belanja online nasional, banyak toko menaikkan harga dasar sebelum memberikan 'diskon besar'. Pelajari cara menghindarinya menggunakan riwayat harga.",
    category: "Panduan Belanja",
    date: "10 Nov 2023",
    author: "Tim Kompario",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop"
  };

  const recentPosts = [
    {
      id: 2,
      title: "5 HP Android Harga 2 Jutaan Terbaik untuk Gaming di Tahun Ini",
      excerpt: "Komparasi spesifikasi dan harga termurah dari Tokopedia, Shopee, dan Lazada untuk HP budget yang kuat main game berat.",
      category: "Review Gadget",
      date: "05 Nov 2023",
      author: "Tech Reviewer",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Skincare Viral di TikTok: Worth It atau Cuma Hype?",
      excerpt: "Kami menganalisis ulasan asli vs ulasan bot untuk 3 brand skincare lokal yang sedang tren minggu ini.",
      category: "Beauty & Lifestyle",
      date: "02 Nov 2023",
      author: "Sarah Jane",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Perbandingan Ongkir Pengiriman Kargo: Siapa Paling Murah?",
      excerpt: "Beli barang berat seperti kulkas atau lemari? Berikut adalah rincian tarif kargo termurah antar platform.",
      category: "Tips & Trik",
      date: "28 Okt 2023",
      author: "Tim Kompario",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Awas Tertipu! Ciri-ciri Toko Online Penipu di Marketplace",
      excerpt: "Rating 5 bintang belum tentu asli. Kenali pola toko penipu yang menjual barang dengan harga tidak masuk akal.",
      category: "Keamanan",
      date: "20 Okt 2023",
      author: "Security Team",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-500/30">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Edukasi</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Tips belanja cerdas, komparasi produk mendalam, dan berita terbaru seputar e-commerce di Indonesia.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16 group cursor-pointer">
          <div className="glass bg-white/60 rounded-[2.5rem] p-4 border border-white/60 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 lg:h-full min-h-[350px] rounded-[2rem] overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-blue-600 shadow-lg">
                    Sorotan Utama
                  </span>
                </div>
              </div>
              
              <div className="p-6 lg:p-10">
                <span className="text-sm font-bold text-purple-600 tracking-wider uppercase mb-3 block">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-5 leading-tight group-hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar size={16} /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1.5"><User size={16} /> {featuredPost.author}</span>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-900">Artikel Terbaru</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentPosts.map((post) => (
            <div key={post.id} className="glass bg-white/50 rounded-[2rem] p-3 border border-white/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col h-full">
              <div className="relative h-48 rounded-3xl overflow-hidden mb-4">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="px-3 pb-3 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar size={14} /> {post.date}
                  </div>
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

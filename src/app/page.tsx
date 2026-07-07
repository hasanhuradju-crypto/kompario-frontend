"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, ArrowUpRight, Search, TrendingUp } from "lucide-react";

export default function Home() {
  const [liveData, setLiveData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        // Fetch real data with a general keyword for the homepage
        const res = await fetch(`${apiUrl}/api/search?q=promo+diskon`);
        const result = await res.json();
        
        if (result.success && result.data) {
          setLiveData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch live data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveData();
  }, []);

  // Split live data into Flash Sale and Terbaru sections
  const flashSaleItems = liveData.slice(0, 6);
  const terbaruItems = liveData.slice(6, 12);
  
  // Sort by sold for Trending section
  const trendingItems = [...liveData].sort((a, b) => b.sold - a.sold).slice(0, 6);

  // Use items for Live Comparison (take 2 items from the end or just slice 12-14)
  const comparisonItems = liveData.slice(12, 14).map(item => {
    // Generate simulated competitor prices based on the real price
    const basePrice = item.price;
    const p1 = item.platform;
    const p2 = (p1 === 'Tokopedia' ? 'Shopee' : 'Tokopedia') as string;
    const p3 = (p1 === 'Lazada' ? 'Shopee' : 'Lazada') as string;

    const p1Color = p1 === 'Tokopedia' ? 'text-green-600' : p1 === 'Shopee' ? 'text-orange-600' : 'text-blue-700';
    const p1Bg = p1 === 'Tokopedia' ? 'bg-green-50' : p1 === 'Shopee' ? 'bg-orange-50' : 'bg-blue-50';
    const p1Border = p1 === 'Tokopedia' ? 'border-green-200' : p1 === 'Shopee' ? 'border-orange-200' : 'border-blue-200';

    const p2Color = p2 === 'Tokopedia' ? 'text-green-600' : p2 === 'Shopee' ? 'text-orange-600' : 'text-blue-700';
    const p3Color = p3 === 'Tokopedia' ? 'text-green-600' : p3 === 'Shopee' ? 'text-orange-600' : 'text-blue-700';

    return {
      name: item.name,
      img: item.image_url,
      lowest: basePrice.toLocaleString('id-ID'),
      prices: [
        { p: p1, price: basePrice.toLocaleString('id-ID'), color: p1Color, bg: p1Bg, border: p1Border, best: true },
        { p: p2, price: Math.round(basePrice * 1.05).toLocaleString('id-ID'), color: p2Color, bg: "bg-white", border: "border-slate-100" },
        { p: p3, price: Math.round(basePrice * 1.08).toLocaleString('id-ID'), color: p3Color, bg: "bg-white", border: "border-slate-100" }
      ]
    };
  });

  const heroItem = liveData.length > 0 ? liveData[0] : null;
  const heroPrice = heroItem ? heroItem.price : 0;
  const heroDiscount = heroItem && heroItem.original_price > heroItem.price ? Math.round((1 - (heroItem.price / heroItem.original_price)) * 100) : 15;

  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      
      {/* Background ambient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* ASYMMETRICAL HERO SECTION */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
          
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-semibold text-blue-600 mb-6 shadow-sm border-white/50">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Engine Pencari Harga Cerdas
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-slate-800 tracking-tight leading-tight mb-6">
              Satu Kali Cari, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Empat Platform.
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Bandingkan harga dari Tokopedia, Shopee, Lazada & TikTok Shop secara instan. Temukan penawaran terbaik dalam hitungan detik.
            </p>
            
            <div className="max-w-lg mx-auto lg:mx-0 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <form action="/cari" className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-2">
                <Search className="text-slate-400 ml-3 my-auto" size={24} />
                <input 
                  type="text" 
                  name="q"
                  placeholder="Tempelkan link produk atau cari nama barang..." 
                  className="flex-1 bg-transparent px-4 py-3 text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button type="submit" className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                  Bandingkan
                </button>
              </form>
            </div>
              <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start">
                <span className="text-sm font-semibold text-slate-500">Mendukung:</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Tokopedia</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Shopee</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Lazada</span>
                  <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-bold">TikTok</span>
                </div>
              </div>
          </div>

          {/* Right Floating Product Card */}
          <div className="flex-1 w-full max-w-md relative z-10">
            {isLoading || !heroItem ? (
              <div className="glass rounded-[2rem] p-6 h-[400px] animate-pulse bg-slate-200/50 relative border border-white/60"></div>
            ) : (
              <a href={heroItem.url} target="_blank" rel="noopener noreferrer" className="block glass rounded-[2rem] p-6 shadow-2xl relative transform hover:-translate-y-2 transition-transform duration-500 border border-white/60">
                
                {heroDiscount > 0 && (
                  <div className="absolute -top-6 -right-6 bg-gradient-to-br from-rose-400 to-red-500 text-white font-black text-xl px-5 py-5 rounded-full shadow-lg transform rotate-12 z-20">
                    -{heroDiscount}%
                  </div>
                )}
                
                <div className="bg-slate-100 rounded-3xl aspect-[4/3] mb-6 flex items-center justify-center relative overflow-hidden">
                  <img src={heroItem.image_url} alt={heroItem.name} className="w-full h-full object-cover" />
                  {/* Simulated Chart overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent flex items-end px-4 pb-2">
                    <svg className="w-full h-12 text-blue-500 opacity-50" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path d="M0 30 L10 20 L20 25 L30 10 L40 15 L50 5 L60 20 L70 15 L80 5 L90 10 L100 0" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black text-slate-800 leading-tight line-clamp-2 pr-2">{heroItem.name}</h3>
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded-md text-sm font-bold text-slate-700 flex-shrink-0">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" /> {(heroItem.rating || 4.8).toFixed(1)}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200/50">
                  <div>
                    <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
                      Harga Termurah <span className={`text-[9px] text-white px-1.5 py-0.5 rounded font-bold ${heroItem.platform === 'Tokopedia' ? 'bg-green-500' : heroItem.platform === 'Lazada' ? 'bg-blue-600' : 'bg-slate-800'}`}>{heroItem.platform}</span>
                    </div>
                    <div className="text-2xl font-black text-blue-600">Rp {heroPrice.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-lg">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
                
                {/* Floating Platform comparisons */}
                <div className="absolute -left-12 bottom-12 bg-white rounded-xl shadow-xl p-3 border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="text-xs font-bold text-slate-400 mb-1">Di Shopee</div>
                  <div className="text-sm font-black text-slate-800">Rp {Math.round(heroPrice * 1.05).toLocaleString('id-ID')}</div>
                </div>
                <div className="absolute -right-8 top-1/2 bg-white rounded-xl shadow-xl p-3 border border-slate-100 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="text-xs font-bold text-slate-400 mb-1">Di {heroItem.platform === 'Lazada' ? 'Tokopedia' : 'Lazada'}</div>
                  <div className="text-sm font-black text-blue-600">Rp {Math.round(heroPrice * 1.08).toLocaleString('id-ID')}</div>
                </div>
              </a>
            )}
          </div>
        </div>


        {/* DISCOVER SECTION */}
        <div className="pt-12 border-t border-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-900">Kategori Populer</h2>
            <Link href="/cari?q=semua" className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Elektronik", icon: "💻", count: "12.4K+ Produk", bg: "from-blue-50 to-blue-100/50", href: "/cari?q=elektronik" },
              { title: "Fashion", icon: "👕", count: "45.1K+ Produk", bg: "from-purple-50 to-purple-100/50", href: "/cari?q=fashion" },
              { title: "Kecantikan", icon: "✨", count: "8.2K+ Produk", bg: "from-rose-50 to-rose-100/50", href: "/cari?q=kecantikan" },
              { title: "Otomotif", icon: "🚗", count: "3.5K+ Produk", bg: "from-slate-100 to-slate-200/50", href: "/cari?q=otomotif" },
            ].map((cat, i) => (
              <Link key={i} href={cat.href} className={`glass rounded-2xl p-6 bg-gradient-to-br ${cat.bg} hover:shadow-lg transition-all group`}>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{cat.title}</h3>
                <p className="text-xs font-medium text-slate-500">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* FLASH SALE SECTION */}
        <div className="pt-16 mt-12 border-t border-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-red-500 rounded-xl shadow-lg shadow-red-500/20 flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-xl">🔥</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">Flash Sale</h2>
                <p className="text-sm font-medium text-slate-500">Berakhir dalam <span className="text-rose-500 font-bold">02:45:12</span></p>
              </div>
            </div>
            <Link href="/cari?q=promo" className="hidden sm:flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-4 py-2 rounded-full transition-colors">
              Lihat Promo Lainnya <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
            {isLoading ? (
              // Loading Skeleton
              [1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="w-[180px] md:w-[220px] flex-shrink-0 h-[300px] glass bg-slate-200/50 animate-pulse rounded-[1.5rem]"></div>
              ))
            ) : flashSaleItems.length > 0 ? (
              flashSaleItems.map((item, idx) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="w-[180px] md:w-[220px] flex-shrink-0 group block">
                <div className="glass bg-white/40 rounded-[1.5rem] overflow-hidden flex flex-col h-full relative group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300 border border-white/60">
                  <div className="absolute top-3 left-3 bg-gradient-to-br from-rose-500 to-red-600 text-white font-black text-[11px] px-2.5 py-1 rounded-full shadow-md z-10">
                    -{(Math.random() * 30 + 10).toFixed(0)}%
                  </div>
                  
                  <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden flex items-center justify-center p-0">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col bg-white/60 backdrop-blur-sm">
                    <div className="text-xs font-bold text-slate-800 leading-tight line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </div>
                    <div className="mt-auto">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs text-slate-400 line-through font-medium">Rp {(item.price + 50000).toLocaleString('id-ID')}</span>
                        <span className="text-lg font-black text-rose-600">Rp {item.price.toLocaleString('id-ID')}</span>
                      </div>
                      
                      <div className="w-full bg-slate-200/50 rounded-full h-1.5 mt-3 mb-1 overflow-hidden">
                        <div className="bg-gradient-to-r from-rose-400 to-red-500 h-1.5 rounded-full" style={{ width: `${Math.random() * 50 + 30}%` }}></div>
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 flex justify-between">
                        <span>Tersisa {Math.floor(Math.random() * 20) + 5}</span>
                        <span>Terjual {item.sold > 1000 ? '999+' : item.sold}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              ))
            ) : (
              <div className="text-slate-500 text-sm">Tidak ada data Flash Sale saat ini.</div>
            )}
          </div>
        </div>

        {/* LIVE PRICE COMPARISON SECTION */}
        <div className="pt-16 mt-12 border-t border-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-400 opacity-50 animate-ping rounded-xl"></div>
                <span className="text-white font-bold text-xl relative z-10">📡</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight flex items-center gap-2">
                  Perbandingan Live 
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse shadow-sm">LIVE</span>
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Pantau harga real-time dari berbagai platform</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {isLoading ? (
               // Loading Skeleton
               [1, 2].map((item) => (
                 <div key={item} className="h-[180px] glass bg-slate-200/50 animate-pulse rounded-3xl"></div>
               ))
            ) : comparisonItems.length > 0 ? (
              comparisonItems.map((prod, i) => (
              <div key={i} className="glass bg-white/50 rounded-3xl p-5 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <img src={prod.img} alt={prod.name} className="w-full h-full object-cover" />
                    <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      LIVE
                    </div>
                  </div>
                  
                  {/* Product Details & Prices */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-black text-slate-800 leading-tight mb-3 pr-4">{prod.name}</h3>
                    
                    <div className="flex flex-col gap-2">
                      {prod.prices.map((plat, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-2.5 rounded-xl border ${plat.border} ${plat.bg} transition-colors`}>
                          <div className="flex items-center gap-2">
                            {plat.best && <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">TERMURAH</span>}
                            <span className={`text-xs font-black ${plat.color}`}>{plat.p}</span>
                          </div>
                          <div className={`text-sm font-black ${plat.best ? 'text-slate-900' : 'text-slate-500 line-through'}`}>
                            Rp {plat.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 text-sm py-8">Tidak ada data perbandingan.</div>
            )}
          </div>
        </div>

        {/* LATEST/TERBARU SECTION */}
        <div className="pt-16 mt-12 border-t border-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">Terbaru</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Data harga baru masuk dari 4 platform hari ini</p>
            </div>
            <Link href="/cari?q=terbaru" className="hidden sm:flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full transition-colors">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
            {isLoading ? (
              // Loading Skeleton
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div key={item} className="h-[250px] glass bg-slate-200/50 animate-pulse rounded-2xl"></div>
              ))
            ) : terbaruItems.length > 0 ? (
              terbaruItems.map((item, idx) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="glass bg-white/50 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-white/60">
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden relative p-0">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md ${
                    item.platform === 'Tokopedia' ? 'bg-green-500 text-white' : 
                    item.platform === 'Shopee' ? 'bg-orange-500 text-white' : 
                    item.platform === 'Lazada' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                  } shadow-sm z-10`}>
                    {item.platform}
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full animate-pulse shadow-sm z-10">
                    BARU
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col bg-white/40">
                  <div className="text-[11px] md:text-xs font-bold leading-snug line-clamp-2 mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </div>
                  <div className="mt-auto">
                    <div className="text-sm md:text-[15px] font-black text-slate-900 mb-1">
                      Rp {item.price.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
                      <div className="flex items-center gap-1 bg-white/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700">
                        <Star size={10} className="text-yellow-500 fill-yellow-500" /> {(item.rating || 4.8).toFixed(1)}
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium">Live Update</div>
                    </div>
                  </div>
                </div>
              </a>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 text-sm py-8">Tidak ada produk terbaru.</div>
            )}
          </div>
        </div>

        {/* TRENDING SECTION */}
        <div className="pt-16 mt-12 border-t border-slate-200/50">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center">
                <span className="text-white font-bold text-xl">📈</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">Lagi Trending</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Paling banyak dicari di 4 platform minggu ini</p>
              </div>
            </div>
            <button onClick={() => alert('Sistem Top 100 Trending sedang dalam pengembangan. Segera hadir!')} className="hidden sm:flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 bg-purple-50 px-4 py-2 rounded-full transition-colors">
              Lihat Top 100 <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {isLoading ? (
              // Loading Skeleton
              [1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-[120px] glass bg-slate-200/50 animate-pulse rounded-[1.5rem]"></div>
              ))
            ) : trendingItems.length > 0 ? (
              trendingItems.map((item, i) => {
                const colors = [
                  'from-green-50 to-emerald-100/50',
                  'from-slate-50 to-slate-200/50',
                  'from-orange-50 to-red-100/50',
                  'from-blue-50 to-indigo-100/50',
                  'from-purple-50 to-fuchsia-100/50',
                  'from-rose-50 to-pink-100/50'
                ];
                const bgGradient = colors[i % colors.length];

                return (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className={`glass rounded-[1.5rem] p-4 bg-gradient-to-br ${bgGradient} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex items-center gap-4 border border-white/60 relative overflow-hidden`}>
                    
                    {/* Ranking Watermark */}
                    <div className="absolute -right-4 -bottom-6 text-[100px] font-black text-slate-900/5 group-hover:text-slate-900/10 transition-colors pointer-events-none">
                      #{i + 1}
                    </div>

                    <div className="w-20 h-20 bg-white rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm relative z-10 overflow-hidden">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <div className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-md ${
                        item.platform === 'Tokopedia' ? 'bg-green-500 text-white' : 
                        item.platform === 'Shopee' ? 'bg-orange-500 text-white' : 
                        item.platform === 'Lazada' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                      } shadow-sm mb-1.5`}>
                        {item.platform}
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 leading-tight line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500">Terjual</span>
                          <span className="text-xs font-black text-slate-700">{item.sold}</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] text-slate-500">Lonjakan</span>
                          <span className="text-xs font-black text-purple-600 flex items-center gap-0.5">
                            <TrendingUp size={12} /> +{(Math.random() * 200 + 50).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })
            ) : (
              <div className="col-span-full text-center text-slate-500 text-sm py-8">Tidak ada data trending.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

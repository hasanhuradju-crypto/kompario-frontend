"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Search, Star, Loader2, ArrowLeft } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;
    
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Gagal mengambil data dari API");
        const data = await res.json();
        setResults(data.data || []);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat mencari.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Helper for badge color
  const getBadgeClass = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('tokopedia')) return 'bg-green-100 text-green-700';
    if (p.includes('shopee')) return 'bg-orange-100 text-orange-700';
    if (p.includes('lazada')) return 'bg-blue-100 text-blue-700';
    if (p.includes('tiktok')) return 'bg-black text-white';
    if (p.includes('blibli')) return 'bg-sky-500 text-white';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Search Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <div className="flex-1 max-w-2xl">
            <form action="/cari" className="flex rounded-2xl bg-white/60 backdrop-blur-md shadow-sm border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
              <Search className="text-slate-400 ml-4 my-auto" size={20} />
              <input 
                type="text" 
                name="q"
                defaultValue={query}
                placeholder="Cari produk..." 
                className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-slate-800"
              />
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 m-1.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-colors">
                Cari
              </button>
            </form>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900">
            Hasil pencarian untuk <span className="text-blue-600">"{query}"</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Membandingkan harga dari berbagai platform</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl text-center space-y-6 mx-auto">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                <Search size={32} className="animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Mencari Harga Terbaik...</h3>
              <p className="text-slate-500">Menganalisis Tokopedia, Shopee, Lazada, TikTok & Blibli secara *real-time*.</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl border border-red-100 flex items-center gap-3">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
            {results.map((item, i) => (
              <Link key={i} href={`/produk/${item.id}?url=${encodeURIComponent(item.url || '#')}&name=${encodeURIComponent(item.name)}&price=${item.price}&originalPrice=${item.original_price}&image=${encodeURIComponent(item.image_url)}&platform=${item.platform}&rating=${item.rating}&sold=${item.sold}`} className="glass bg-white/50 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-white/60">
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden relative">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-slate-400 text-sm font-medium">Gambar</span>
                  )}
                  <div className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md ${getBadgeClass(item.platform)} shadow-sm z-10`}>
                    {item.platform}
                  </div>
                  {item.original_price > item.price && (
                    <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm z-10">
                      Diskon!
                    </div>
                  )}
                </div>
                <div className="p-3.5 flex-1 flex flex-col bg-white/40">
                  <div className="text-[11px] md:text-xs font-bold leading-snug line-clamp-2 mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </div>
                  <div className="mt-auto">
                    {item.original_price > item.price && (
                      <div className="text-[10px] text-slate-400 line-through mb-0.5">
                        Rp {item.original_price.toLocaleString('id-ID')}
                      </div>
                    )}
                    <div className="text-sm md:text-[15px] font-black text-slate-900 mb-1">
                      Rp {item.price.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
                      <div className="flex items-center gap-1 bg-white/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700">
                        <Star size={10} className="text-yellow-500 fill-yellow-500" /> {item.rating}
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium">{item.sold} Terjual</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && results.length === 0 && query && (
          <div className="text-center py-20 glass rounded-3xl">
            <div className="text-5xl mb-4">🤷</div>
            <h3 className="text-xl font-bold text-slate-800">Tidak ada hasil ditemukan</h3>
            <p className="text-slate-500 mt-2">Coba gunakan kata kunci lain atau periksa ejaan Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center">Memuat mesin pencari...</div>}>
      <SearchResults />
    </Suspense>
  );
}

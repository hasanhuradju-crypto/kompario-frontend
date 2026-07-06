"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Search, Star, Loader2, ArrowLeft, Filter } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 15, params is a Promise, so we must unwrap it using React.use()
  const resolvedParams = use(params);
  const rawSlug = resolvedParams.slug;
  const categoryName = decodeURIComponent(rawSlug).replace(/-/g, ' ');
  // Title Case the category name
  const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        // We use the category name as a search keyword for our dummy API
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/search?q=${encodeURIComponent(categoryName)}`);
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
  }, [categoryName]);

  // Helper for badge color
  const getBadgeClass = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('tokopedia')) return 'bg-green-500';
    if (p.includes('shopee')) return 'bg-orange-500';
    if (p.includes('lazada')) return 'bg-blue-600';
    if (p.includes('tiktok')) return 'bg-black';
    return 'bg-slate-500';
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} className="text-slate-700" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">Kategori</span>
              <span className="text-sm font-medium text-slate-400">/</span>
              <span className="text-sm font-bold text-slate-800">{formattedCategory}</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mt-1">
              {formattedCategory}
            </h1>
          </div>
          <button className="hidden sm:flex glass px-4 py-2 rounded-full items-center gap-2 text-sm font-bold text-slate-700 hover:bg-white/60 transition-colors border border-white/60 shadow-sm">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Memuat produk di kategori {formattedCategory}...</p>
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
              <Link key={i} href={`/produk/${item.id}`} className="glass bg-white/50 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-white/60">
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden relative">
                  <span className="text-slate-400 text-sm font-medium">Gambar</span>
                  <div className={`absolute top-2 left-2 text-[9px] text-white font-bold px-2 py-0.5 rounded-md ${getBadgeClass(item.platform)} shadow-sm z-10`}>
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
        {!loading && !error && results.length === 0 && (
          <div className="text-center py-20 glass rounded-3xl">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-slate-800">Belum ada produk</h3>
            <p className="text-slate-500 mt-2">Belum ada produk yang ditemukan di kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}

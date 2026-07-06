"use client";

import { use, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ExternalLink, ShieldCheck, TrendingDown, TrendingUp, AlertTriangle, Star, CheckCircle2, MapPin, Bell, Heart } from "lucide-react";

function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const searchParams = useSearchParams();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [wishlistId, setWishlistId] = useState<number | null>(null);
  const [isAlertActive, setIsAlertActive] = useState(false);

  useEffect(() => {
    // Read from search params if available, else fallback
    const urlParam = searchParams.get('url');
    const nameParam = searchParams.get('name');
    const priceParam = searchParams.get('price');
    const originalPriceParam = searchParams.get('originalPrice');
    const imageParam = searchParams.get('image');
    const platformParam = searchParams.get('platform');
    const ratingParam = searchParams.get('rating');
    const soldParam = searchParams.get('sold');

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setProduct({
        id: unwrappedParams.id,
        name: nameParam || "Skintific 5X Ceramide Barrier Repair Moisture Gel 30g",
        platform: platformParam || "Shopee",
        price: priceParam ? parseInt(priceParam) : 139000,
        originalPrice: originalPriceParam ? parseInt(originalPriceParam) : 169000,
        rating: ratingParam ? parseFloat(ratingParam) : 4.9,
        sold: soldParam ? parseInt(soldParam) : 12500,
        shopName: `${platformParam || 'Shopee'} Seller`,
        shopLocation: "Jakarta",
        description: `Produk ${nameParam || 'unggulan'} dari ${platformParam || 'Shopee'}. Harga dan ketersediaan dapat berubah sewaktu-waktu.`,
        imageUrl: imageParam || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
        url: urlParam || "#",
        history: [
          { date: "1 Nov", price: 169000 },
          { date: "5 Nov", price: 169000 },
          { date: "10 Nov", price: 145000 },
          { date: "11 Nov", price: 129000 },
          { date: "15 Nov", price: (priceParam ? parseInt(priceParam) : 139000) },
        ]
      });
      setLoading(false);
    }, 500);

    // Get token and check wishlist status
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    
    if (storedToken) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/wishlists`, {
        headers: { "Authorization": `Bearer ${storedToken}`, "Accept": "application/json" }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const savedItem = data.find((item: any) => item.product_id === unwrappedParams.id);
          if (savedItem) {
            setIsSaved(true);
            setWishlistId(savedItem.id);
            setIsAlertActive(savedItem.is_alert_active);
          }
        }
      })
      .catch(err => console.error("Error fetching wishlist", err));
    }

    return () => clearTimeout(timer);
  }, [unwrappedParams.id]);

  const handleToggleWishlist = async () => {
    if (!token) {
      alert("Anda harus login terlebih dahulu untuk menyimpan barang.");
      window.location.href = "/login";
      return;
    }
    
    setIsSaving(true);
    try {
      if (isSaved) {
        // Find the item ID first to delete (this is a simplified approach, usually the backend would handle deleting by product_id)
        // For now, we alert since delete requires the specific wishlist ID
        alert("Fitur hapus pantauan sedang disempurnakan. Silakan kelola di Dasbor.");
      } else {
        const payload = {
          product_id: product.id,
          name: product.name,
          platform: product.platform,
          saved_price: product.price,
          image_url: product.imageUrl,
          url: product.url
        };
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/wishlists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });
        
        if (res.ok) {
          const data = await res.json();
          setIsSaved(true);
          setWishlistId(data.id);
        } else {
          alert("Gagal menyimpan barang.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleAlert = async () => {
    if (!token) {
      alert("Anda harus login untuk mengaktifkan Radar Harga.");
      window.location.href = "/login";
      return;
    }
    if (!isSaved || !wishlistId) {
      alert("Silakan 'Simpan ke Pantauan' (ikon Hati) terlebih dahulu sebelum mengaktifkan Radar Harga.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/wishlists/${wishlistId}/alert`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
      });
      if (res.ok) {
        setIsAlertActive(!isAlertActive);
        alert(isAlertActive ? "Radar Harga dinonaktifkan." : "Radar Harga diaktifkan! Anda akan menerima notifikasi jika harga turun.");
      }
    } catch (err) {
      alert("Gagal mengatur Radar Harga.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Menganalisis riwayat harga produk...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <ChevronRight size={14} />
          <Link href="/kategori/kecantikan" className="hover:text-blue-600 transition-colors">Kecantikan</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Image & Chart) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass bg-white/70 rounded-[2rem] p-4 border border-white/60 shadow-xl shadow-slate-200/50">
              <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-slate-100">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Star size={14} className="fill-white" /> {product.rating}
                </div>
              </div>
            </div>

            {/* Price History Chart Mock */}
            <div className="glass bg-white/80 rounded-[2rem] p-6 border border-white shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingDown className="text-emerald-500" /> Riwayat Harga (15 Hari)
              </h3>
              
              <div className="h-48 flex items-end justify-between gap-2 border-b border-l border-slate-200 p-4 relative">
                {product.history.map((point: any, idx: number) => {
                  const maxPrice = 170000;
                  const minPrice = 120000;
                  const height = ((point.price - minPrice) / (maxPrice - minPrice)) * 100;
                  
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 group relative w-full">
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-lg transition-opacity whitespace-nowrap z-20 shadow-lg">
                        Rp {point.price.toLocaleString("id-ID")}
                      </div>
                      <div 
                        className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${idx === 3 ? 'bg-emerald-400' : 'bg-blue-200 group-hover:bg-blue-400'}`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-[10px] font-bold text-slate-400 absolute -bottom-6">{point.date}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Harga saat ini adalah <strong>harga rata-rata</strong>. Harga terendah bulan ini adalah <strong className="text-emerald-600">Rp 129.000</strong> pada tanggal 11 Nov.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Info) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass bg-white/80 rounded-[2.5rem] p-8 lg:p-10 border border-white shadow-2xl shadow-slate-200/50">
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.platform}
                </span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} /> {product.shopName}
                </span>
              </div>

              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight flex-1">
                  {product.name}
                </h1>
                <button 
                  onClick={handleToggleWishlist}
                  disabled={isSaving}
                  className={`shrink-0 ml-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md hover:shadow-lg ${isSaved ? 'bg-rose-50 text-rose-500 border border-rose-200' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:text-rose-400 hover:bg-rose-50'}`}
                  title={isSaved ? "Tersimpan" : "Simpan ke Pantauan"}
                >
                  <Heart className={isSaved ? "fill-rose-500" : ""} size={24} />
                </button>
              </div>

              <div className="flex items-center gap-6 mb-8 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1"><MapPin size={16} /> {product.shopLocation}</span>
                <span>Terjual {product.sold.toLocaleString("id-ID")}+</span>
              </div>

              <div className="bg-slate-50 rounded-[1.5rem] p-6 mb-8 border border-slate-100">
                <div className="text-sm text-slate-500 font-bold mb-1">Harga Saat Ini</div>
                <div className="flex items-end gap-4">
                  <div className="text-4xl md:text-5xl font-black text-blue-600">
                    Rp {product.price.toLocaleString("id-ID")}
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="text-xl text-slate-400 font-bold line-through mb-1">
                      Rp {product.originalPrice.toLocaleString("id-ID")}
                    </div>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <div className="mt-3 inline-block bg-emerald-100 text-emerald-700 font-bold text-sm px-3 py-1 rounded-lg">
                    Diskon {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              <a href={product.url !== '#' ? product.url : 'https://shopee.co.id'} target="_blank" rel="noopener noreferrer" className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg rounded-2xl hover:opacity-90 shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2 mb-8">
                Beli Sekarang di {product.platform} <ExternalLink size={20} />
              </a>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Deskripsi Produk</h3>
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

            </div>

            {/* Price Alert CTA */}
            <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 flex items-center gap-6 relative overflow-hidden text-white shadow-xl shadow-slate-900/20">
              <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 z-10">
                <Bell className="text-blue-400" size={28} />
              </div>
              <div className="flex-1 z-10">
                <h3 className="text-xl font-bold mb-1">Ingin harga lebih murah?</h3>
                <p className="text-slate-400 text-sm mb-4">Kami akan email Anda saat harga turun di bawah Rp 130.000</p>
                <button onClick={handleToggleAlert} className={`px-6 py-2.5 font-bold rounded-xl text-sm transition-colors shadow-lg ${isAlertActive ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'}`}>
                  {isAlertActive ? "Radar Harga Aktif" : "Pasang Radar Harga"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

export default function DetailProduk({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center">Memuat produk...</div>}>
      <ProductContent params={params} />
    </Suspense>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, 
  BellRing, 
  Settings, 
  LogOut, 
  TrendingDown, 
  TrendingUp, 
  Minus,
  Star,
  Trash2,
  ExternalLink
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("wishlist");
  const [user, setUser] = useState<any>(null);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Profile Form States
  const [profileForm, setProfileForm] = useState({ name: '', email: '', wants_promotions: true });
  const [passwordForm, setPasswordForm] = useState({ current_password: '', password: '', password_confirmation: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const fetchUserAndWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    try {
      // Fetch User
      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/user`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      if (!userRes.ok) throw new Error("Sesi habis");
      const userData = await userRes.json();

      // Fetch Wishlist
      const wishRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/wishlists`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const wishData = await wishRes.ok ? await wishRes.json() : [];

      setUser({
        name: userData.name,
        email: userData.email,
        wants_promotions: userData.wants_promotions,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=2563eb&color=fff`,
        memberSince: new Date(userData.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
        totalSaved: wishData.length,
        totalAlerts: wishData.filter((w: any) => w.is_alert_active).length,
      });
      setProfileForm({ name: userData.name, email: userData.email, wants_promotions: userData.wants_promotions ?? true });

      // Add some dummy attributes to wishlist for UI since we don't track live price yet
      const formattedItems = wishData.map((item: any) => ({
        ...item,
        currentPrice: item.saved_price, // Simulate unchanged price
        trend: "flat",
        rating: 4.8,
        imageUrl: item.image_url || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop"
      }));
      
      setSavedItems(formattedItems);
    } catch (err) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndWishlist();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/logout`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        });
      } catch (err) {
        console.error("Logout error", err);
      }
    }
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Helper for badge color
  const getBadgeClass = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('tokopedia')) return 'bg-green-500';
    if (p.includes('shopee')) return 'bg-orange-500';
    if (p.includes('lazada')) return 'bg-blue-600';
    if (p.includes('tiktok')) return 'bg-black';
    return 'bg-slate-500';
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus barang ini dari pantauan?")) return;
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/wishlists/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
      });
      if (res.ok) {
        setSavedItems(prev => prev.filter(item => item.id !== id));
        setUser((prev: any) => ({ ...prev, totalSaved: prev.totalSaved - 1 }));
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus barang.");
    }
  };

  const toggleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    setSavedItems([...savedItems].sort((a, b) => {
      return newOrder === "desc" ? b.currentPrice - a.currentPrice : a.currentPrice - b.currentPrice;
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/user/profile`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(profileForm)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Profil berhasil diperbarui!");
        setUser((prev: any) => ({ ...prev, name: data.user.name, email: data.user.email, wants_promotions: data.user.wants_promotions, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=2563eb&color=fff` }));
      } else {
        alert(data.message || "Gagal memperbarui profil.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPassword(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/user/password`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(passwordForm)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Kata sandi berhasil diperbarui!");
        setPasswordForm({ current_password: '', password: '', password_confirmation: '' });
      } else {
        alert(data.message || "Gagal memperbarui kata sandi.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isLoading) return <div className="min-h-screen pt-32 flex items-center justify-center text-slate-500 font-bold text-xl">Memuat data pengguna...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Profil */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass bg-white/70 rounded-[2rem] p-6 border border-white shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-1">{user.name}</h2>
              <p className="text-sm text-slate-500 font-medium mb-6">{user.email}</p>
              
              <div className="w-full grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-100/80 rounded-2xl p-3">
                  <div className="text-2xl font-black text-blue-600">{user.totalSaved}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tersimpan</div>
                </div>
                <div className="bg-slate-100/80 rounded-2xl p-3">
                  <div className="text-2xl font-black text-purple-600">{user.totalAlerts}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Radar Aktif</div>
                </div>
              </div>

              <div className="w-full text-xs font-bold text-slate-400 bg-white/50 py-2 rounded-xl border border-white">
                Member sejak {user.memberSince}
              </div>
            </div>

            {/* Navigasi Dasbor */}
            <div className="glass bg-white/70 rounded-[2rem] p-4 border border-white shadow-xl shadow-slate-200/50 flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center gap-3 w-full p-4 rounded-xl font-bold transition-all ${activeTab === 'wishlist' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Heart size={20} className={activeTab === 'wishlist' ? 'fill-white' : ''} /> 
                Barang Pantauan
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 w-full p-4 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Settings size={20} /> 
                Pengaturan Akun
              </button>
              
              <div className="h-px w-full bg-slate-200 my-2"></div>
              
              <button onClick={handleLogout} className="flex items-center gap-3 w-full p-4 rounded-xl font-bold text-rose-500 hover:bg-rose-50 transition-all">
                <LogOut size={20} /> 
                Keluar
              </button>
            </div>
          </div>

          {/* Area Konten Utama */}
          <div className="lg:col-span-3">
            <div className="glass bg-white/80 rounded-[2.5rem] p-6 md:p-10 border border-white shadow-2xl shadow-slate-200/50 min-h-[600px]">
              
              {activeTab === "wishlist" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h1 className="text-2xl font-black text-slate-900 mb-1">Barang Pantauan Anda</h1>
                      <p className="text-sm text-slate-500 font-medium">Melacak {user.totalSaved} barang favorit Anda di berbagai toko.</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={toggleSort} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-4 py-2 rounded-xl transition-colors">
                        Urutkan: {sortOrder === 'desc' ? 'Harga Tertinggi' : 'Harga Terendah'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {savedItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-[1.5rem] p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 relative overflow-hidden group">
                        
                        {/* Status Label (Harga Turun/Naik) */}
                        <div className="absolute top-0 right-0 rounded-bl-2xl px-4 py-1.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 z-10 shadow-sm">
                          {item.trend === 'down' && <><TrendingDown size={14}/> <span className="text-emerald-700">Harga Turun</span><div className="absolute inset-0 bg-emerald-100 -z-10"></div></>}
                          {item.trend === 'up' && <><TrendingUp size={14}/> <span className="text-rose-700">Harga Naik</span><div className="absolute inset-0 bg-rose-100 -z-10"></div></>}
                          {item.trend === 'flat' && <><Minus size={14}/> <span className="text-slate-700">Harga Stabil</span><div className="absolute inset-0 bg-slate-100 -z-10"></div></>}
                        </div>

                        {/* Image */}
                        <div className="w-full md:w-40 aspect-square md:aspect-auto md:h-32 rounded-xl overflow-hidden bg-slate-50 relative shrink-0">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className={`absolute bottom-2 left-2 text-[9px] text-white font-bold px-2 py-0.5 rounded-md ${getBadgeClass(item.platform)} shadow-sm z-10`}>
                            {item.platform}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-center">
                          <Link href={`/produk/${item.id}`} className="text-base font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors mb-2 line-clamp-2 pr-20 md:pr-24">
                            {item.name}
                          </Link>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-700">
                              <Star size={12} className="text-yellow-500 fill-yellow-500" /> {item.rating}
                            </div>
                            <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${item.is_alert_active ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                              <BellRing size={12} /> {item.is_alert_active ? 'Radar Aktif' : 'Radar Nonaktif'}
                            </div>
                          </div>

                          <div className="flex items-end justify-between mt-auto">
                            <div>
                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Harga Saat Ini</div>
                              <div className="flex items-end gap-2">
                                <span className={`text-xl font-black ${item.trend === 'down' ? 'text-emerald-600' : item.trend === 'up' ? 'text-rose-600' : 'text-slate-900'}`}>
                                  Rp {item.currentPrice.toLocaleString('id-ID')}
                                </span>
                                {item.currentPrice !== item.saved_price && (
                                  <span className="text-xs text-slate-400 line-through mb-1">
                                    Rp {item.saved_price.toLocaleString('id-ID')}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors">
                                <Trash2 size={18} />
                              </button>
                              <Link href={`/produk/${item.product_id}`} className="w-10 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-500 flex items-center justify-center transition-colors shadow-lg shadow-blue-500/20">
                                <ExternalLink size={18} />
                              </Link>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="py-10 text-center">
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Informasi Dasar</h2>
                    <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                        <input type="text" required value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Email</label>
                        <input type="email" required value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                      </div>
                      
                      <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">Notifikasi Promosi</p>
                          <p className="text-xs text-slate-500 mt-1">Terima email diskon dan promo menarik dari kami.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={profileForm.wants_promotions} onChange={e => setProfileForm({...profileForm, wants_promotions: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="mt-2 text-right">
                        <button type="submit" disabled={isSavingProfile} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-colors disabled:opacity-50">
                          {isSavingProfile ? 'Menyimpan...' : 'Simpan Profil'}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Keamanan Akun</h2>
                    <form onSubmit={handleUpdatePassword} className="flex flex-col gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Kata Sandi Saat Ini</label>
                        <input type="password" required value={passwordForm.current_password} onChange={e => setPasswordForm({...passwordForm, current_password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Kata Sandi Baru</label>
                          <input type="password" required minLength={8} value={passwordForm.password} onChange={e => setPasswordForm({...passwordForm, password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Konfirmasi Sandi Baru</label>
                          <input type="password" required minLength={8} value={passwordForm.password_confirmation} onChange={e => setPasswordForm({...passwordForm, password_confirmation: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                        </div>
                      </div>
                      
                      <div className="mt-2 text-right">
                        <button type="submit" disabled={isSavingPassword} className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-slate-800 transition-colors disabled:opacity-50">
                          {isSavingPassword ? 'Memperbarui...' : 'Perbarui Sandi'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

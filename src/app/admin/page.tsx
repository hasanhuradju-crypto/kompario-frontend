"use client";

import { useEffect, useState } from "react";
import { Users, Heart, BellRing, ShieldCheck, Activity, DollarSign, Key } from "lucide-react";
import Link from "next/link";

const mockChartData = [
  { month: "Jan", amount: 1200000 },
  { month: "Feb", amount: 1550000 },
  { month: "Mar", amount: 2100000 },
  { month: "Apr", amount: 1800000 },
  { month: "Mei", amount: 3200000 },
  { month: "Jun", amount: 2800000 },
  { month: "Jul", amount: 4500000 }, // Current month (high)
];
const maxAmount = Math.max(...mockChartData.map(d => d.amount));

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [apiSettings, setApiSettings] = useState({ 
    rapidapi_key: '', 
    rapidapi_host: '', 
    tokopedia_rapidapi_host: '',
    lazada_rapidapi_host: '',
    blibli_rapidapi_host: '',
    tiktok_rapidapi_host: '',
    accesstrade_id: '' 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingApi, setIsSavingApi] = useState(false);
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({ title: '', message: '', action_url: '' });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      };

      try {
        const [statsRes, apiRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/admin/stats`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/admin/settings`, { headers })
        ]);

        if (statsRes.status === 403 || apiRes.status === 403) {
          setError("Akses Ditolak. Anda bukan Administrator.");
          setIsLoading(false);
          return;
        }

        if (!statsRes.ok || !apiRes.ok) throw new Error("Gagal mengambil data");

        const statsData = await statsRes.json();
        const apiData = await apiRes.json();
        
        setStats(statsData.stats);
        setUsers(statsData.users);
        setApiSettings({
          rapidapi_key: apiData.rapidapi_key || '',
          rapidapi_host: apiData.rapidapi_host || 'shopee-scraper1.p.rapidapi.com',
          tokopedia_rapidapi_host: apiData.tokopedia_rapidapi_host || '',
          lazada_rapidapi_host: apiData.lazada_rapidapi_host || '',
          blibli_rapidapi_host: apiData.blibli_rapidapi_host || '',
          tiktok_rapidapi_host: apiData.tiktok_rapidapi_host || '',
          accesstrade_id: apiData.accesstrade_id || ''
        });
      } catch (err) {
        console.error(err);
        setError("Koneksi ke server terputus.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleSaveApiSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingApi(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/admin/settings`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(apiSettings)
      });
      
      const data = await res.json();
      if (res.ok) {
        alert("Konfigurasi API berhasil disimpan!");
      } else {
        alert(data.message || "Gagal menyimpan konfigurasi.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSavingApi(false);
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.message) {
      alert("Judul dan isi pesan wajib diisi!");
      return;
    }
    
    setIsSendingBroadcast(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/admin/broadcasts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(broadcastForm)
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Broadcast berhasil dikirim ke semua pengguna!");
        setBroadcastForm({ title: '', message: '', action_url: '' });
      } else {
        alert(data.message || "Gagal mengirim broadcast.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold">Memverifikasi Otoritas Akses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">{error}</h1>
        <p className="text-slate-500 mb-8 max-w-md">Halaman ini hanya dapat diakses oleh akun tingkat Administrator. Silakan kembali ke halaman utama.</p>
        <Link href="/" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-2">
              <ShieldCheck size={18} /> KOMPARIO COMMAND CENTER
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Pantau performa dan aktivitas pengguna platform</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-emerald-600 shadow-sm">
            <Activity size={16} /> Sistem Normal
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Total Pengguna</p>
              <h2 className="text-3xl font-black text-slate-900">{stats?.total_users}</h2>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Heart size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Total Wishlist</p>
              <h2 className="text-3xl font-black text-slate-900">{stats?.total_wishlists}</h2>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <BellRing size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Radar Harga Aktif</p>
              <h2 className="text-3xl font-black text-slate-900">{stats?.total_alerts}</h2>
            </div>
          </div>
        </div>

        {/* Affiliate Revenue Chart & Table Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Pendapatan Afiliasi</h2>
                <p className="text-sm text-slate-500 font-medium">Estimasi komisi dari konversi klik e-commerce</p>
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl font-black flex items-center gap-2">
                <DollarSign size={18} />
                Rp {mockChartData.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('id-ID')}
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 pt-6 relative border-b border-slate-100 pb-2">
              {/* Y-Axis Guidelines */}
              <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between text-[10px] text-slate-400 font-bold z-0 pb-2 pointer-events-none">
                <div className="flex items-center gap-2 w-full"><span className="w-12 text-right">Rp {(maxAmount / 1000000).toFixed(1)}M</span><div className="flex-1 border-b border-dashed border-slate-200"></div></div>
                <div className="flex items-center gap-2 w-full"><span className="w-12 text-right">Rp {(maxAmount / 2 / 1000000).toFixed(1)}M</span><div className="flex-1 border-b border-dashed border-slate-200"></div></div>
                <div className="flex items-center gap-2 w-full"><span className="w-12 text-right">0</span><div className="flex-1 border-b border-dashed border-slate-200"></div></div>
              </div>

              {/* Bars */}
              {mockChartData.map((data, index) => {
                const heightPercentage = (data.amount / maxAmount) * 100;
                return (
                  <div key={index} className="relative z-10 flex flex-col items-center flex-1 h-full justify-end group">
                    <div 
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 group-hover:opacity-80 ${index === mockChartData.length - 1 ? 'bg-gradient-to-t from-emerald-500 to-teal-400' : 'bg-gradient-to-t from-blue-500 to-indigo-400'}`} 
                      style={{ height: `${heightPercentage}%` }}
                    ></div>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded-md pointer-events-none whitespace-nowrap">
                      Rp {data.amount.toLocaleString('id-ID')}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* X-Axis Labels */}
            <div className="flex justify-between mt-3 pl-[56px] pr-2">
              {mockChartData.map((data, index) => (
                <div key={index} className="flex-1 text-center text-xs font-bold text-slate-500">
                  {data.month}
                </div>
              ))}
            </div>
          </div>

          {/* Top Products or Stats */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Sumber Klik Teratas</h2>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center font-black">S</div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Shopee</div>
                    <div className="text-xs text-slate-500 font-medium">4,230 Klik</div>
                  </div>
                </div>
                <div className="font-bold text-emerald-600 text-sm">~65%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center font-black">T</div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Tokopedia</div>
                    <div className="text-xs text-slate-500 font-medium">1,820 Klik</div>
                  </div>
                </div>
                <div className="font-bold text-emerald-600 text-sm">~25%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black">L</div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Lazada</div>
                    <div className="text-xs text-slate-500 font-medium">450 Klik</div>
                  </div>
                </div>
                <div className="font-bold text-emerald-600 text-sm">~10%</div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button className="w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm">
                Lihat Laporan Detail
              </button>
            </div>
          </div>
        </div>

        {/* API Settings Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Key size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Konfigurasi API Afiliasi</h2>
              <p className="text-sm text-slate-500 font-medium">Hubungkan ke RapidAPI untuk menarik data produk e-commerce secara langsung</p>
            </div>
          </div>

          <form onSubmit={handleSaveApiSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">RapidAPI Key</label>
              <input 
                type="text" 
                placeholder="Masukkan API Key Anda..." 
                value={apiSettings.rapidapi_key}
                onChange={(e) => setApiSettings({...apiSettings, rapidapi_key: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">RapidAPI Host (Shopee)</label>
              <input 
                type="text" 
                placeholder="misal: shopee-scraper1.p.rapidapi.com" 
                value={apiSettings.rapidapi_host}
                onChange={(e) => setApiSettings({...apiSettings, rapidapi_host: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">RapidAPI Host (Tokopedia)</label>
              <input 
                type="text" 
                placeholder="misal: tokopedia-data.p.rapidapi.com" 
                value={apiSettings.tokopedia_rapidapi_host}
                onChange={(e) => setApiSettings({...apiSettings, tokopedia_rapidapi_host: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">RapidAPI Host (Lazada)</label>
              <input 
                type="text" 
                placeholder="misal: lazada-api1.p.rapidapi.com" 
                value={apiSettings.lazada_rapidapi_host}
                onChange={(e) => setApiSettings({...apiSettings, lazada_rapidapi_host: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">RapidAPI Host (Blibli)</label>
              <input 
                type="text" 
                placeholder="misal: blibli-scraper.p.rapidapi.com" 
                value={apiSettings.blibli_rapidapi_host}
                onChange={(e) => setApiSettings({...apiSettings, blibli_rapidapi_host: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">RapidAPI Host (TikTok Shop)</label>
              <input 
                type="text" 
                placeholder="misal: tiktok-shop-api.p.rapidapi.com" 
                value={apiSettings.tiktok_rapidapi_host}
                onChange={(e) => setApiSettings({...apiSettings, tiktok_rapidapi_host: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-sm" 
              />
            </div>
            <div className="md:col-span-2 pt-4 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-700 mb-2">AccessTrade Publisher ID (Opsional)</label>
              <input 
                type="text" 
                placeholder="Masukkan Publisher ID AccessTrade Anda..." 
                value={apiSettings.accesstrade_id}
                onChange={(e) => setApiSettings({...apiSettings, accesstrade_id: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono text-sm" 
              />
              <p className="text-xs text-slate-500 mt-2 font-medium">Jika diisi, semua tautan produk akan otomatis dibungkus menjadi tautan afiliasi AccessTrade.</p>
            </div>
            <div className="md:col-span-2 pt-4 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                disabled={isSavingApi}
                className="bg-purple-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/30 hover:bg-purple-500 transition-colors disabled:opacity-50"
              >
                {isSavingApi ? 'Menyimpan...' : 'Simpan Kunci API'}
              </button>
            </div>
          </form>
        </div>

        {/* Broadcast Form Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <BellRing size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Kirim Notifikasi Broadcast</h2>
              <p className="text-sm text-slate-500 font-medium">Kirimkan promo atau info diskon terbaru kepada semua pengguna.</p>
            </div>
          </div>

          <form onSubmit={handleSendBroadcast} className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Judul Pesan Promo</label>
                <input 
                  type="text" 
                  placeholder="Misal: Flash Sale Diskon 50% Jam Tangan Pintar!" 
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({...broadcastForm, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-bold" 
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Isi Pesan Lengkap</label>
                <textarea 
                  placeholder="Ceritakan detail diskon atau promonya di sini..." 
                  value={broadcastForm.message}
                  onChange={(e) => setBroadcastForm({...broadcastForm, message: e.target.value})}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-sm resize-none" 
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                  <span>Tautan Produk (Link Afiliasi / URL)</span>
                  <span className="text-xs text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">ID AccessTrade Anda otomatis disisipkan</span>
                </label>
                <input 
                  type="url" 
                  placeholder="https://shopee.co.id/..." 
                  value={broadcastForm.action_url}
                  onChange={(e) => setBroadcastForm({...broadcastForm, action_url: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-mono text-sm" 
                />
              </div>

              <div className="md:col-span-2 pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSendingBroadcast}
                  className="bg-rose-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-rose-500/30 hover:bg-rose-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <BellRing size={20} />
                  {isSendingBroadcast ? 'Mengirim...' : 'Kirim Broadcast Sekarang'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Daftar Pengguna Terdaftar</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-4 font-bold text-sm text-slate-500">Pengguna</th>
                  <th className="p-4 font-bold text-sm text-slate-500">Email</th>
                  <th className="p-4 font-bold text-sm text-slate-500">Role</th>
                  <th className="p-4 font-bold text-sm text-slate-500 text-center">Jml Wishlist</th>
                  <th className="p-4 font-bold text-sm text-slate-500">Tgl Daftar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=f1f5f9&color=64748b`} alt={u.name} className="w-10 h-10 rounded-full" />
                        <span className="font-bold text-slate-800">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 text-sm font-medium">{u.email}</td>
                    <td className="p-4">
                      {u.is_admin ? (
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">Admin</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">User</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-black text-slate-800 bg-slate-100 w-8 h-8 rounded-lg flex items-center justify-center mx-auto">
                        {u.wishlists_count}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 text-sm font-medium">{u.joined_at}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">Belum ada pengguna.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

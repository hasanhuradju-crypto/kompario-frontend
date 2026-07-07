import Link from "next/link";
import { Bell, Mail, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <div className="px-4 md:px-8 pb-8 mt-20">
      <footer className="max-w-7xl mx-auto rounded-[3rem] bg-slate-900 border border-slate-700 p-8 md:p-12 relative overflow-hidden shadow-2xl">
        
        {/* Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 relative z-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <div className="text-3xl font-black text-white mb-4 tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ShieldCheck size={18} className="text-white" />
              </div>
              Kompario<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">.ID</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 mb-6 font-medium">
              Mesin pencari harga independen pertama di Indonesia. Bandingkan jutaan produk dari Tokopedia, Shopee, Lazada & TikTok Shop dalam satu layar.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">Tokopedia</span>
              <span className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1 rounded-full">Shopee</span>
              <span className="bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full">Lazada</span>
              <span className="bg-slate-700/50 border border-slate-600 text-slate-300 text-xs font-bold px-3 py-1 rounded-full">TikTok</span>
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Eksplor</h4>
            <div className="flex flex-col gap-3">
              <Link href="/kategori/elektronik" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-2"><span className="text-lg">📱</span> Elektronik</Link>
              <Link href="/kategori/fashion" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-2"><span className="text-lg">👗</span> Fashion</Link>
              <Link href="/kategori/kecantikan" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-2"><span className="text-lg">💄</span> Kecantikan</Link>
              <Link href="/kategori/otomotif" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors flex items-center gap-2"><span className="text-lg">🚗</span> Otomotif</Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Perusahaan</h4>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Tentang Kami</Link>
              <Link href="/blog" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Blog & Edukasi</Link>
              <Link href="/komunitas" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Forum Komunitas</Link>
              <Link href="/kontak" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Hubungi Kami</Link>
              <Link href="/privacy" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Kebijakan Privasi</Link>
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Jangan Lewatkan Diskon</h4>
            <p className="text-sm text-slate-300 mb-4 font-medium">
              Bergabunglah dengan 50,000+ member lainnya. Dapatkan notifikasi saat harga gadget incaranmu turun drastis.
            </p>
            <div className="relative mb-4">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="Masukkan email Anda..." 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-11 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1">
            © {new Date().getFullYear()} Kompario.ID. Dibuat dengan <Heart size={12} className="text-rose-500 fill-rose-500 mx-0.5" /> di Indonesia.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">Admin Panel</Link>
            <Link href="/terms" className="hover:text-white cursor-pointer transition-colors">Syarat & Ketentuan</Link>
            <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
        
      </footer>
    </div>
  );
}


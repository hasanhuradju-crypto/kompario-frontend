"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto shadow-xl shadow-rose-500/30">
            <Mail size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Kami</span>
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Punya pertanyaan, tawaran kerja sama, atau ingin melaporkan bug? Jangan ragu untuk mengirimkan pesan kepada tim kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="glass bg-white/70 rounded-[2.5rem] p-8 md:p-10 border border-white/80 shadow-2xl shadow-slate-200/50">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Kirim Pesan</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Pesan Anda berhasil dikirim! Tim kami akan segera merespons melalui email.'); e.currentTarget.reset(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Budi Santoso"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email</label>
                  <input 
                    type="email" 
                    placeholder="budi@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Subjek</label>
                <input 
                  type="text" 
                  placeholder="Pertanyaan seputar integrasi API..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Pesan Anda</label>
                <textarea 
                  rows={5}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-2">
                Kirim Pesan Sekarang <Send size={18} />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-700 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-500/40 rounded-full blur-3xl pointer-events-none"></div>
              
              <h2 className="text-2xl font-black mb-8 relative z-10 drop-shadow-md">Informasi Kontak</h2>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Mail className="text-rose-300" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-300 mb-1">Email</h3>
                    <p className="text-lg font-bold text-white drop-shadow-sm">support@kompario.id</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Phone className="text-rose-300" size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-300 mb-1">Telepon / WhatsApp</h3>
                    <p className="text-lg font-bold text-white drop-shadow-sm">089697252993</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="glass bg-white/50 rounded-[2rem] p-8 border border-white/60">
              <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Ikuti Kami di Sosial Media</h3>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-md hover:scale-110 hover:bg-blue-600 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sky-500 shadow-md hover:scale-110 hover:bg-sky-500 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-md hover:scale-110 hover:bg-rose-500 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-md hover:scale-110 hover:bg-slate-900 hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

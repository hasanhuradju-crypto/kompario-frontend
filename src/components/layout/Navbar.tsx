"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Menu, Zap, TrendingUp } from "lucide-react";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    setIsLoggedIn(!!localStorage.getItem("token"));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full fixed top-0 z-50 px-4 md:px-8 pt-4 transition-all duration-300">
      <nav className={`mx-auto max-w-7xl transition-all duration-500 rounded-full flex items-center justify-between px-6 py-3 ${isScrolled ? 'glass shadow-lg scale-[0.98]' : 'bg-transparent'}`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-10 h-10 relative overflow-hidden rounded-xl shadow-lg group-hover:scale-105 transition-transform bg-white">
            <img src="/logo.png" alt="Kompario Logo" className="w-full h-full object-contain p-1" />
          </div>
          <div className="text-2xl font-black text-slate-800 tracking-tight hidden sm:block">
            Kompario<span className="text-blue-600">.ID</span>
          </div>
        </Link>

        {/* Center Search (Glass) */}
        <div className="hidden md:block flex-1 max-w-lg mx-6">
          <form action="/cari" className="flex rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-inner overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
            <input 
              type="text" 
              name="q"
              placeholder="Cari iPhone, Laptop, Skincare..." 
              className="flex-1 px-5 py-2.5 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-500"
            />
            <button type="submit" className="bg-blue-600 text-white px-5 py-1.5 m-1 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1.5">
              <Search size={14} /> Cari
            </button>
          </form>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <button onClick={() => alert('Sistem Trending sedang dibangun. Harap bersabar!')} className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            <TrendingUp size={16} /> Trending
          </button>
          <button onClick={() => alert('Halaman Flash Sale akan segera diluncurkan!')} className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors">
            <Zap size={16} /> Flash Sale
          </button>
          
          {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-4">
              <NotificationBell />
              <Link href="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-500 transition-colors shadow-md shadow-blue-500/20">
                Dasbor Anda
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <NotificationBell />
              <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors mr-2 ml-2">
                Masuk
              </Link>
              <Link href="/register" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors shadow-md">
                Daftar Gratis
              </Link>
            </div>
          )}
          
          <button className="md:hidden text-slate-800 p-2 glass rounded-full">
            <Menu size={20} />
          </button>
        </div>

      </nav>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Gagal masuk");
      }
      
      localStorage.setItem("token", data.access_token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative flex flex-col items-center justify-center">
      
      {/* Background Decorators */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] opacity-60 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] opacity-60 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="w-full max-w-md px-4 relative z-10">
        
        {/* Brand */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-10 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            Kompario<span className="text-blue-600">.ID</span>
          </div>
        </Link>

        {/* Login Box */}
        <div className="glass bg-white/80 rounded-[2.5rem] p-8 md:p-10 border border-white shadow-2xl shadow-slate-200/50">
          <h1 className="text-2xl font-black text-slate-900 mb-2">Selamat Datang Kembali!</h1>
          <p className="text-slate-500 text-sm font-medium mb-8">Masuk untuk melihat barang pantauan Anda.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            {error && <div className="p-3 bg-red-100 text-red-600 text-xs font-bold rounded-xl text-center">{error}</div>}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com" 
                  required
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Kata Sandi</label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Lupa Sandi?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  required
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <button disabled={isLoading} type="submit" className="w-full bg-blue-600 text-white font-bold text-lg rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30 mt-8 disabled:opacity-50">
              {isLoading ? "Memproses..." : <>Masuk <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 font-medium">
              Belum punya akun? <Link href="/register" className="text-blue-600 font-bold hover:underline">Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

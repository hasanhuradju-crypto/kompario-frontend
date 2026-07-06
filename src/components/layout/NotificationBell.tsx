"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, ExternalLink, X } from "lucide-react";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [unread, setUnread] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/broadcasts`);
        if (res.ok) {
          const data = await res.json();
          setBroadcasts(data);
          
          // Simple unread logic based on local storage
          const lastSeen = localStorage.getItem("last_seen_broadcasts");
          if (data.length > 0) {
            const latestId = data[0].id.toString();
            if (lastSeen !== latestId) {
              setUnread(true);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch broadcasts", err);
      }
    };

    fetchBroadcasts();

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && broadcasts.length > 0) {
      setUnread(false);
      localStorage.setItem("last_seen_broadcasts", broadcasts[0].id.toString());
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleOpen}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors relative"
        title="Notifikasi Promo"
      >
        <Bell size={20} className="text-slate-600" />
        {unread && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 transform origin-top-right transition-all">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Bell size={16} className="text-blue-500" /> Promo & Info
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {broadcasts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm font-medium">
                Belum ada notifikasi promo saat ini.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {broadcasts.map((b) => (
                  <div key={b.id} className="p-4 hover:bg-slate-50 transition-colors group">
                    <h4 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">{b.title}</h4>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">{b.message}</p>
                    {b.action_url && (
                      <a 
                        href={b.action_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Lihat Promo <ExternalLink size={12} />
                      </a>
                    )}
                    <div className="text-[10px] text-slate-400 mt-3 font-medium">
                      {new Date(b.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

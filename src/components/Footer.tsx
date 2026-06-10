import React from 'react';
import { Heart, Globe, Mail, Shield, BookOpen, Clock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'missions' | 'academy' | 'dashboard') => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-slate-950/75 text-slate-400 border-t border-white/10 backdrop-blur-lg py-12 px-4 sm:px-6 lg:px-8 mt-auto" id="main-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand column */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="text-white fill-white" size={16} />
            </div>
            <span className="text-white font-bold tracking-tight text-lg">KIZILAY GÖNÜLLÜ</span>
          </div>
          <p className="text-xs text-slate-505 leading-relaxed font-semibold">
            GönüllüOl 2.0 platformu, Türkiye Kızılay Derneği resmi gönüllü yönetim ve akreditasyon otomasyonudur.
          </p>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">
            SÜRÜM v2.4.0 (COSMIC GLASS)
          </div>
        </div>

        {/* Quick Nav links */}
        <div className="text-left">
          <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-4">Hızlı Navigasyon</h4>
          <ul className="space-y-2 text-xs font-semibold">
            <li><button onClick={() => setActiveTab('home')} className="hover:text-red-500 transition">Ana Sayfa</button></li>
            <li><button onClick={() => setActiveTab('missions')} className="hover:text-red-500 transition">Gönüllülük Görevi Ara</button></li>
            <li><button onClick={() => setActiveTab('academy')} className="hover:text-red-500 transition">Kızılay Gelişim Akademi</button></li>
          </ul>
        </div>

        {/* Operational Categories */}
        <div className="text-left">
          <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-4 font-display">Resmi Kanallar</h4>
          <ul className="space-y-2 text-xs font-semibold">
            <li><a href="https://kizilay.org.tr" target="_blank" rel="noreferrer" className="hover:text-red-500 transition flex items-center gap-1.5"><Globe size={12} /> kizilay.org.tr</a></li>
            <li><a href="mailto:gonullu@kizilay.org.tr" className="hover:text-red-500 transition flex items-center gap-1.5"><Mail size={12} /> gonullu@kizilay.org.tr</a></li>
            <li className="text-[10px] text-slate-500 font-mono">Çağrı Merkezi: ALO 168</li>
          </ul>
        </div>

        {/* Legal Compliance */}
        <div className="text-left">
          <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-4">KVKK ve Şeffaflık</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-2">
            Uluslararası Kızılhaç ve Kızılay Dernekleri Federasyonu (IFRC) ilkelerine ve 6698 Sayılı Kişisel Verilerin Korunması Kanunu'na tamamen uyumludur.
          </p>
          <div className="flex gap-1.5 flex-wrap">
            <span className="bg-white/5 text-slate-300 border border-white/10 px-2.5 py-1 rounded text-[9px] font-bold flex items-center gap-1"><Shield size={10} /> KVKK Onaylı</span>
            <span className="bg-white/5 text-slate-300 border border-white/10 px-2.5 py-1 rounded text-[9px] font-bold flex items-center gap-1"><Clock size={10} /> GDPR Compliant</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 text-center text-[10px] text-slate-600 font-bold uppercase tracking-wider">
        © 2026 TÜRKİYE KIZILAY DERNEĞİ. TÜM HAKLARI SAKLIDIR.
      </div>
    </footer>
  );
}

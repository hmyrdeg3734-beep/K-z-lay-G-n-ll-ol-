import React, { useState } from 'react';
import { Heart, Menu, X, Bell, Award, LogOut, ChevronDown, User, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  activeTab: 'home' | 'missions' | 'academy' | 'dashboard';
  setActiveTab: (tab: 'home' | 'missions' | 'academy' | 'dashboard') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onToggleRole?: () => void;
}

export default function Navbar({ user, activeTab, setActiveTab, onOpenAuth, onLogout, onToggleRole }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Template placeholder fallback to keep names generic
  const getDisplayName = () => {
    if (!user) return '';
    if (user.role === 'corporate') {
      if (user.name === 'Mehmet Akif (Şube Başkanı)' || user.name.includes('Mehmet Akif') || user.name.includes('Asım Bey') || user.name.includes('Şube Başkanı') || user.name.includes('Adı Soyadı') || user.name.includes('Ad Soyad') || user.name.includes('İsim Soyisim')) {
        return 'Şube Başkanı (İsim Soyisim)';
      }
      return user.name;
    }
    if (user.name === 'Genç Gönüllü' || user.name.includes('UDEMO') || user.name.includes('DEMO') || user.name.includes('Gönüllü') || user.name.includes('Adı Soyadı') || user.name.includes('Ad Soyad') || user.name.includes('İsim Soyisim')) {
      return 'Gönüllü (İsim Soyisim)';
    }
    return user.name;
  };

  const displayName = getDisplayName();

  // Simple Notification content
  const notifications = [
    { id: 1, title: "Yeni Görev Önerisi!", text: "İlgi alanlarınıza uygun bir 'Gezici Aşevi Yardımı' eklendi.", time: "1 saat önce", unread: true },
    { id: 2, title: "Tebrikler!", text: "İlk Yardım Eğitimini tamamlayıp sertifikanızı kazandınız.", time: "1 gün önce", unread: false },
    { id: 3, title: "Profil Güncelleme", text: "Gönüllü profilinizin %100 oranında tamamlanması için bilgilerinizi girmeyi unutmayın.", time: "3 gün önce", unread: false }
  ];

  const handleTabClick = (tab: 'home' | 'missions' | 'academy' | 'dashboard') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/60 backdrop-blur-md border-b border-white/50 shadow-sm" id="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick('home')} id="nav-logo">
            <div className="w-10 h-10 bg-white border border-red-100 rounded-full flex items-center justify-center shadow-md shadow-red-200/30 hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-600 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M 14.5 3.5 A 8.5 8.5 0 0 0 14.5 20.5 A 8.92 8.92 0 0 1 14.5 3.5 Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                KIZILAY
              </span>
              <span className="text-xs font-bold text-red-600 tracking-wider">
                GÖNÜLLÜOL
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link items */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {[
              { id: 'home', label: 'Ana Sayfa' },
              { id: 'missions', label: 'Gönüllülük Görevleri' },
              { id: 'academy', label: 'Kızılay Akademi' },
              ...(user ? [{ id: 'dashboard', label: 'Gönüllü Panelim' }] : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-red-50/80 text-red-600 backdrop-blur-sm border border-red-200/40 shadow-sm'
                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-900 hover:backdrop-blur-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* User Section & CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                
                {/* Switch Account Type Accent Pill */}
                {onToggleRole && (
                  <div className="flex items-center gap-1.5 bg-slate-200/40 backdrop-blur-md p-1 rounded-xl border border-white/50 shadow-sm">
                    <button
                      onClick={onToggleRole}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 border ${
                        user.role === 'corporate'
                          ? 'bg-amber-550 hover:bg-amber-600 text-slate-900 border-amber-400'
                          : 'bg-red-600 hover:bg-red-700 text-white border-red-500'
                      }`}
                      title="Kişisel ve Kurumsal Hesap Arasında Geçiş Yap"
                    >
                      <span className="text-xs">{user.role === 'corporate' ? 'Kurumsal (Başkan)' : 'Kişisel Gönüllü'}</span>
                      <span className="text-[10px] font-extrabold opacity-75 underline uppercase">Gez ⇄</span>
                    </button>
                  </div>
                )}
                
                {/* Notification Bell */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2.5 rounded-xl bg-white/50 backdrop-blur-md text-slate-600 hover:bg-white/85 border border-white/40 shadow-sm transition-colors relative"
                    id="btn-notifications"
                  >
                    <Bell size={18} />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white/75 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 pb-2 border-b border-white/30 flex justify-between items-center">
                        <span className="font-bold text-slate-900 text-sm">Bildirimler</span>
                        <span className="text-xs text-red-600 font-medium cursor-pointer hover:underline">Tümünü okundu işaretle</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto pt-2">
                        {notifications.map((notif) => (
                          <div key={notif.id} className={`px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 ${notif.unread ? 'bg-red-50/20' : ''}`}>
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-semibold text-xs text-slate-800">{notif.title}</span>
                              <span className="text-[10px] text-slate-400 font-medium shrink-0">{notif.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{notif.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown Trigger */}
                <div className="relative">
                  <button 
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/50 backdrop-blur-md hover:bg-white/80 transition-all border border-white/50 shadow-sm"
                    id="btn-user-dropdown"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                      {displayName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-800 leading-tight block truncate max-w-[120px]">{displayName}</span>
                      <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-0.5">
                        <Award size={10} /> Seviye {user.level}
                      </span>
                    </div>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 py-2 z-50">
                      <div className="px-4 py-2 border-b border-white/30 mb-1">
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">Gönüllü Puanı</p>
                        <p className="font-bold text-slate-700 text-xs mt-0.5">{user.xp} XP / {user.level * 1000} XP</p>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(user.xp / (user.level * 1000)) * 100}%` }} />
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => { handleTabClick('dashboard'); setShowUserDropdown(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors font-semibold flex items-center gap-2"
                      >
                        <User size={14} /> Gönüllü Panelim
                      </button>
                      
                      <button 
                        onClick={() => { onLogout(); setShowUserDropdown(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors font-bold flex items-center gap-2"
                      >
                        <LogOut size={14} /> Güvenli Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={onOpenAuth}
                  className="px-5 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                  id="btn-login-trigger"
                >
                  Giriş Yap
                </button>
                <button 
                  onClick={onOpenAuth}
                  className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 shadow-md shadow-red-200 transition-all flex items-center gap-1.5"
                  id="btn-signup-trigger"
                >
                  <Sparkles size={16} /> Aramıza Katıl
                </button>
              </div>
            )}
          </div>

          {/* Mobile responsive triggers */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <button 
                onClick={() => handleTabClick('dashboard')}
                className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs"
              >
                {displayName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white py-4 px-4 space-y-2 relative" id="mobile-menu-panel">
          {[
            { id: 'home', label: 'Ana Sayfa' },
            { id: 'missions', label: 'Gönüllülük Görevleri' },
            { id: 'academy', label: 'Kızılay Akademi' },
            ...(user ? [{ id: 'dashboard', label: 'Gönüllü Panelim' }] : [])
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id as any)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
          {user && onToggleRole && (
            <button 
              onClick={() => { onToggleRole(); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black border transition-all flex items-center justify-between ${
                user.role === 'corporate'
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              <span>Hesap Türü: {user.role === 'corporate' ? 'Kurumsal (Başkan)' : 'Kişisel Gönüllü'}</span>
              <span className="text-[10px] uppercase underline shrink-0">Geçiş Yap ⇄</span>
            </button>
          )}

          {!user && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold bg-slate-100 text-slate-700"
              >
                Giriş Yap
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold bg-red-600 text-white"
              >
                Aramıza Katıl
              </button>
            </div>
          )}
          {user && (
            <div className="pt-2 border-t border-slate-100">
              <button 
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} /> Güvenli Çıkış Yap
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

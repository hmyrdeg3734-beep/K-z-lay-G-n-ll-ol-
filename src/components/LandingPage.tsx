import React, { useState } from 'react';
import { Heart, Users, MapPin, Search, ArrowRight, ShieldCheck, Award, Timer, BookOpen, FlameKindling, Sparkles, CheckCircle2 } from 'lucide-react';
import { Mission, UserProfile } from '../types';

interface LandingPageProps {
  missions: Mission[];
  onApplyForMission: (missionId: string) => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  setActiveTab: (tab: 'home' | 'missions' | 'academy' | 'dashboard') => void;
  setSelectedMissionId: (id: string | null) => void;
}

export default function LandingPage({ 
  missions, 
  user, 
  onOpenAuth, 
  setActiveTab,
  setSelectedMissionId
}: LandingPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Highlight the urgent and top missions
  const featuredMissions = missions.slice(0, 3);

  const kızılayActivities = [
    { title: "Afet Yönetimi", desc: "Deprem, heyelan ve acil kriz anlarında çadır kurma, sıcak yemek ve lojistik koordinatörlüğü.", icon: <FlameKindling size={24} className="text-red-600" />, count: "12 Aktif Görev" },
    { title: "Kan Bağışı Kampanyası", desc: "Meydanlardaki Kızılay kan bağış çadırlarında vatandaşlarımızı bilgilendirme ve ikram süreçleri.", icon: <Heart size={24} className="text-red-600" />, count: "8 Aktif Görev" },
    { title: "Sosyal Hizmetler", desc: "Huzurevleri, sevgi evleri, hastanelerde çocuk etkinlikleri ve ihtiyar dostu ziyaret faaliyetleri.", icon: <Users size={24} className="text-red-600" />, count: "15 Aktif Görev" },
    { title: "Eğitim ve Gelişim", desc: "Lise ve ilkokul öğrencilerine akran mentörlüğü, kış kampları liderliği ve dijital dönüşüm desteği.", icon: <BookOpen size={24} className="text-red-500" />, count: "6 Aktif Görev" }
  ];

  const benefits = [
    { title: "Kızılay Akademi Eğitimi", text: "İlk yardım, afet yönetimi ve sivil savunma sertifikaları alarak donanımınızı artırın." },
    { title: "Modern Seviye Rozetleri", text: "Görevlerde yer aldıkça XP kazanın, gümüş ve altın rütbelerle Kızılay tarihine geçin." },
    { title: "QR Gönüllü Kimliği", text: "Tüm Kızılay şube ve kampüslerinde geçerli dijital QR kodlu resmi üye kartı edinin." }
  ];

  return (
    <div className="min-h-screen bg-transparent pt-20" id="landing-page-root">
      
      {/* 1. HERO SECTION WITH AMBIENT BACKGROUND */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="hero-section">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left" id="hero-left-content">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-1.5 rounded-full text-xs font-bold font-display animate-pulse">
              <Sparkles size={14} className="fill-red-200" />
              <span>GönüllüOl 2.0 • Türkiye'nin Saygın İyilik Platformu</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-black text-slate-900 tracking-tight leading-[1.1] font-display">
              Dünyayı Güzelleştirmek <br />
              <span className="text-red-600 relative inline-block">
                Senin Ellerinde.
                <span className="absolute left-0 bottom-1 w-full h-2 bg-red-100 -z-10 rounded" />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              Kızılay çatısı altında 2 milyondan fazla gönüllüye katıl; afetlerde, eğitimlerde, kan bağışı çadırlarında ve sosyal yardım noktalarında umut tacı ol.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {user ? (
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl text-sm shadow-xl shadow-red-200 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Gönüllü Panelime Git <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  onClick={onOpenAuth}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl text-sm shadow-xl shadow-red-200 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  id="btn-hero-join"
                >
                  Bugün Gönüllü Ol <ArrowRight size={18} />
                </button>
              )}
              
              <button 
                onClick={() => setActiveTab('missions')}
                className="bg-white/60 backdrop-blur-md border border-white/50 hover:bg-white/80 text-slate-700 font-bold px-8 py-4 rounded-2xl text-sm shadow-sm hover:scale-[1.01] transition-all text-center"
              >
                Görevleri Keşfet
              </button>
            </div>

            {/* Micro Live Alert Banner inside Hero */}
            <div className="pt-4 flex items-center gap-3">
              <div className="flex -space-x-3">
                <span className="w-8 h-8 rounded-full border-2 border-white bg-indigo-505 bg-red-500 text-white flex items-center justify-center font-bold text-[10px]">ZY</span>
                <span className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">AK</span>
                <span className="w-8 h-8 rounded-full border-2 border-white bg-slate-500 text-white flex items-center justify-center font-bold text-[10px]">MD</span>
              </div>
              <p className="text-xs text-slate-500 font-medium select-none">
                <span className="text-red-600 font-bold">14,250 aktif gönüllü</span> şu an deprem hazırlık ve eğitim sahalarında!
              </p>
            </div>
          </div>

          {/* Hero Right Graphics */}
          <div className="lg:col-span-5 relative" id="hero-right-visual">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              
              {/* Back ambient decor shapes */}
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-red-100 rounded-full blur-3xl opacity-60 -z-10" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-red-200 rounded-full blur-3xl opacity-60 -z-10" />
              
              {/* Card visual stack */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden transform hover:-rotate-1 transition-transform duration-300">
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <Heart size={180} fill="currentColor" />
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Heart className="fill-white" size={24} />
                    <span className="font-bold tracking-tight text-lg text-white">GönüllüOl Kart</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full">Kızılay 2.0</span>
                </div>

                <div className="my-10 space-y-1">
                  <p className="text-[10px] text-red-200 font-semibold tracking-wider uppercase">T.C. GÖNÜLLÜ KİMLİĞİ</p>
                  <p className="text-2xl font-bold tracking-tight font-display">Aramıza Katılman Bekleniyor</p>
                  <p className="text-xs text-red-100 opacity-80 mt-1">Hilal-i Ahmer Gönüllü Ağı Üyesi</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] text-red-200 uppercase font-semibold">GURUR SEVİYESİ</p>
                    <p className="font-bold font-mono text-sm flex items-center gap-1">
                      <Award size={14} className="text-amber-300 fill-amber-300" /> Seviye 1 (İlk Adım)
                    </p>
                  </div>
                  
                  {/* Visual QR Code Placeholder with Red Cross outline */}
                  <div className="bg-white p-2 rounded-xl border border-white flex flex-col items-center">
                    <div className="w-14 h-14 bg-slate-100 rounded flex flex-col justify-between p-1">
                      <div className="flex justify-between"><span className="w-2.5 h-2.5 border-t-2 border-l-2 border-red-600" /><span className="w-2.5 h-2.5 border-t-2 border-r-2 border-red-600" /></div>
                      <div className="text-center font-bold text-[8px] text-red-600 tracking-tighter">QR KOD</div>
                      <div className="flex justify-between"><span className="w-2.5 h-2.5 border-b-2 border-l-2 border-red-600" /><span className="w-2.5 h-2.5 border-b-2 border-r-2 border-red-600" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge widget */}
              <div className="absolute -bottom-6 -left-6 bg-white/60 backdrop-blur-md border border-white/50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">AYLIK YENİ GÖNÜLLÜ</p>
                  <p className="text-sm font-extrabold text-slate-800 tracking-tight">+18,450 Üye</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. REALTIME COUNTER BLOCK */}
      <section className="bg-white/30 backdrop-blur-md py-12 border-y border-white/40 shadow-sm relative z-10" id="stats-counter-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            {[
              { label: 'Aktif Gönüllü Sayısı', value: '2,408,122', sub: 'Kayıtlı ve Onaylı', icon: <Users className="mx-auto mb-2 text-red-600" /> },
              { label: 'Yapılan İyilik Saati', value: '345,980 sst.', sub: '2026 Gönüllülük Süresi', icon: <Timer className="mx-auto mb-2 text-red-600" /> },
              { label: 'Tamamlanan Faaliyet', value: '18,421 Görev', sub: 'Afet ve Yardım Kampanya', icon: <CheckCircle2 className="mx-auto mb-2 text-red-600" /> },
              { label: 'Kızılay Şubeleri', value: '81 Şehir', sub: 'Tüm Türkiye Canlı Ağ', icon: <MapPin className="mx-auto mb-2 text-red-600" /> }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                {stat.icon}
                <div className="text-xl sm:text-2xl lg:text-3.5xl font-black text-slate-900 tracking-tight font-display">{stat.value}</div>
                <div className="text-xs font-bold text-slate-700">{stat.label}</div>
                <div className="text-[10px] text-slate-400 font-medium">{stat.sub}</div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 4. ACTIVITY DOMAINS - BENTO BOX PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="activities-overview">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-600 tracking-wider bg-red-50 border border-red-100 px-3.5 py-1.5 rounded-full uppercase">KIZILAY ÇALIŞMA ALANLARI</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">Yeteneklerinle İyiliği İnşa Et</h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">İlgi alanlarına ve uzmanlığına göre aşağıdaki kategorilerden birinde yer alabilirsin.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kızılayActivities.map((act, i) => (
            <div key={i} className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/52 hover:border-red-500/30 hover:bg-white/65 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between">
              <div>
                <div className="p-3 bg-red-50 rounded-2xl w-fit group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  {act.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mt-6 group-hover:text-red-600 transition-colors duration-200">{act.title}</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-semibold">{act.desc}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>{act.count}</span>
                <span className="text-red-600 group-hover:translate-x-1 transition-transform">Keşfet &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED LABELED MISSIONS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/20 backdrop-blur-sm border-y border-white/30" id="featured-missions">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold text-red-600 uppercase tracking-widest bg-red-50 border border-red-100 px-3 py-1 rounded-full">EN YAKIN İLANLAR</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">Sana En Yakın Gönüllülük Görevleri</h2>
              <p className="text-sm text-slate-500 mt-1 font-medium">Bölgendeki acil Kızılay faaliyetlerine katılarak destek verebilirsin.</p>
            </div>
            <button 
              onClick={() => setActiveTab('missions')}
              className="text-red-600 font-bold hover:underline flex items-center gap-1.5 text-sm shrink-0 font-display group"
            >
              Tüm Görevleri Gör <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredMissions.map((mission) => (
              <div 
                key={mission.id} 
                onClick={() => { setSelectedMissionId(mission.id); setActiveTab('missions'); }}
                className="bg-white/40 backdrop-blur-md hover:bg-white/60 p-6 rounded-3xl border border-white/55 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${mission.colorClass}`}>
                      {mission.category}
                    </span>
                    {mission.isUrgent && (
                      <span className="bg-red-100 border border-red-200 text-red-600 px-2 py-0.5 rounded-full text-[9px] font-extrabold animate-pulse">ACİL ÇAĞRI</span>
                    )}
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-red-600 transition-colors leading-snug">
                    {mission.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed font-semibold">
                    {mission.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-1"><MapPin size={14} className="text-slate-400" /> {mission.city}</div>
                    <div className="flex items-center gap-1"><Timer size={14} className="text-slate-400" /> {mission.duration}</div>
                  </div>
                  <button className="w-full mt-4 py-2 bg-white/50 backdrop-blur-sm hover:bg-red-600 border border-white/50 hover:border-red-650 text-slate-700 hover:text-white font-bold rounded-xl text-xs transition-get duration-200">
                    Görev Detayına Git
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. WHY KIZILAY VOLUNTEER? BENEFITS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="volunteer-benefits">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-extrabold text-red-600 uppercase tracking-widest bg-red-50 border border-red-100 px-3 py-1 rounded-full">KAZANIMLARINIZ</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Neden Kızılay Çatısı Altında Gönüllü Olmalısın?</h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
              Kızılay çatısı sadece bir iyilik kulübü değil, aynı zamanda sivil savunma, afet koordinasyonu ve takım çalışması süreçlerini tecrübe edeceğiniz saygın bir akreditasyon kurumudur.
            </p>

            <div className="space-y-4 pt-4">
              {benefits.map((ben, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-white/50 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-display">{idx + 1}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{ben.title}</h5>
                    <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">{ben.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl aspect-video relative group">
              {/* Fallback elegant custom vector graphic styling or beautiful illustration with CSS */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-red-400 p-8 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/10 rounded-2xl"><Award size={32} /></div>
                  <span className="bg-white/20 text-[10px] font-bold px-3 py-1 rounded-full">Kızılay Sertifika ve Akreditasyonu</span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold font-display leading-tight">Milyonlarca Kişinin Hayatına Resmi Olarak Dokunun</h3>
                  <p className="text-xs text-red-50/80 mt-2 font-medium">İlk yardım kursları, afet müdahale brifingleri ve profesyonel akran rehberliği ile kariyerinize de saygın sivil toplum referansları ekleyin.</p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-4 border-t border-white/20">
                  <span>ÖĞRENMEYE BAŞLA</span>
                  <span className="underline cursor-pointer" onClick={() => setActiveTab('academy')}>Kızılay Akademi &rarr;</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

import React, { useState } from 'react';
import { MapPin, Search, Timer, Compass, Users, Sparkles, Filter, CheckCircle2, AlertCircle, Phone, X, Award } from 'lucide-react';
import { Mission, UserProfile } from '../types';
import { TURKEY_CITIES } from '../data';

interface MissionsPageProps {
  missions: Mission[];
  user: UserProfile | null;
  onApplyForMission: (missionId: string) => void;
  onOpenAuth: () => void;
  selectedMissionId: string | null;
  setSelectedMissionId: (id: string | null) => void;
}

export default function MissionsPage({
  missions,
  user,
  onApplyForMission,
  onOpenAuth,
  selectedMissionId,
  setSelectedMissionId
}: MissionsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('Tümü');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  // Main cities with activities to highlight on interactive mini-panel
  const activeCitiesMap = [
    { name: "İstanbul", count: 18, coords: "top-24 left-16" },
    { name: "Ankara", count: 14, coords: "top-28 left-40" },
    { name: "Hatay", count: 32, coords: "bottom-12 left-[180px]" },
    { name: "İzmir", count: 8, coords: "top-36 left-4" },
    { name: "Bursa", count: 5, coords: "top-28 left-12" }
  ];

  const categories = ['Tümü', 'Afet', 'Kan Bağışı', 'Eğitim', 'Sosyal Hizmet', 'Çevre', 'Teknoloji'];

  // Filtered array
  const filteredMissions = missions.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'Tümü' || m.city === selectedCity;
    const matchesCategory = selectedCategory === 'Tümü' || m.category === selectedCategory;
    const matchesUrgent = !onlyUrgent || m.isUrgent;

    return matchesSearch && matchesCity && matchesCategory && matchesUrgent;
  });

  const selectedMissionDetail = missions.find(m => m.id === selectedMissionId);

  // Check application state helper
  const getApplicationStatus = (missionId: string) => {
    if (!user) return null;
    const app = user.appliedMissions.find(a => a.missionId === missionId);
    return app ? app.status : null;
  };

  const handleApplyClick = (missionId: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    onApplyForMission(missionId);
  };

  return (
    <div className="min-h-screen bg-transparent pt-20 pb-16" id="missions-page-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header segment */}
        <div className="bg-red-600 text-white rounded-[2rem] p-8 sm:p-12 shadow-xl relative overflow-hidden mb-10" id="missions-header">
          <div className="absolute top-0 right-0 p-16 opacity-10 bg-radial from-white to-transparent" />
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">AKTİF İLAN KILAVUZU</span>
            <h1 className="text-3xl sm:text-4.5xl font-black font-display tracking-tight leading-none">Onlarca Şehir, Tek Bir Amaç</h1>
            <p className="text-sm text-red-100 max-w-xl font-medium leading-relaxed">
              Yapay zeka asistanımız; yeteneklerini, kan grubunu ve ilgi alanlarını süzerek en çok fayda üretebileceğin Kızılay görevlerini listeler.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: FILTERS & GEOGRAPHY MAP DECORATION */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Interactive Hotspot Map Simulation */}
            <div className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5 uppercase">
                <Compass size={16} className="text-red-600" /> Coğrafi Sıcaklık Haritası
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">Bölgelerdeki aktif gönüllü operasyon alanları. Şehre tıklayarak ilanları süzün.</p>
              
              {/* Visual simulated Turkey map projection with pins */}
              <div className="bg-slate-950/75 backdrop-blur-sm rounded-2xl h-48 relative overflow-hidden border border-white/10">
                {/* Background grid representation */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute bottom-4 right-4 text-[9px] text-slate-500 font-semibold uppercase tracking-wider">TÜRKİYE AKTİVASYON</div>
                
                {/* Pins */}
                {activeCitiesMap.map((pin) => (
                  <button
                    key={pin.name}
                    onClick={() => setSelectedCity(pin.name)}
                    className={`absolute ${pin.coords} flex items-center gap-1 bg-red-600 hover:bg-slate-50 text-white hover:text-red-600 px-2 py-1 rounded-lg text-[9px] font-bold shadow-lg transition-all duration-200 ring-2 ring-red-500/20`}
                    title={`${pin.name}: ${pin.count} aktif görev`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white block animate-ping" />
                    <span>{pin.name}</span>
                  </button>
                ))}
              </div>

              {selectedCity !== 'Tümü' && (
                <button 
                  onClick={() => setSelectedCity('Tümü')}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  Şehir Filtresini Temizle (Seçili: {selectedCity})
                </button>
              )}
            </div>

            {/* Filter controls */}
            <div className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                  <Filter size={16} className="text-red-600" /> Arama Filtreleri
                </span>
                <button 
                  onClick={() => { setSelectedCity('Tümü'); setSelectedCategory('Tümü'); setOnlyUrgent(false); setSearchTerm(''); }}
                  className="text-xs text-red-600 font-semibold hover:underline"
                >
                  Sıfırla
                </button>
              </div>

              {/* Search input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Anahtar kelime ara</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400"><Search size={16} /></span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Görev adı veya yetenek..."
                    className="w-full bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* City select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Şehir Seçin</label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-white/60 font-bold shadow-sm"
                >
                  <option value="Tümü">Tüm Şehirler</option>
                  {TURKEY_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Urgency checkbox toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyUrgent}
                    onChange={(e) => setOnlyUrgent(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
                  />
                  <span>Sadece Acil İhtiyaç Duyulanlar</span>
                </label>
              </div>

            </div>

          </div>

          {/* RIGHT GRID: MISSIONS MATCHING FILTERS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Horizontal Categories Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 shrink-0 rounded-full text-xs font-bold tracking-tight transition-all ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                      : 'bg-white/40 backdrop-blur-sm border border-white/50 text-slate-600 hover:bg-white/70 hover:backdrop-blur-md'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Total search results count */}
            <div className="flex justify-between items-center bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-xs text-slate-600 font-semibold border border-white/40 shadow-sm shadow-slate-100/30">
              <span>Toplam {filteredMissions.length} görev listeleniyor</span>
              {searchTerm && <span>Arama filtre aktif</span>}
            </div>

            {filteredMissions.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-red-50 text-red-600 rounded-full w-fit">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Uyuşan Görev Bulunamadı</h3>
                <p className="text-xs text-slate-500 max-w-sm">Farklı bir şehir aramayı veya filtreleri sıfırlayarak temel Kızılay görevlerinden birini tercih etmeyi deneyebilirsiniz.</p>
                <button 
                  onClick={() => { setSelectedCity('Tümü'); setSelectedCategory('Tümü'); setOnlyUrgent(false); setSearchTerm(''); }}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shadow-lg shadow-red-100"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6" id="missions-list">
                {filteredMissions.map((m) => {
                  const appStatus = getApplicationStatus(m.id);
                  return (
                    <div 
                      key={m.id}
                      className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/50 hover:border-red-500/20 hover:bg-white/65 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      onClick={() => setSelectedMissionId(m.id)}
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-2">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${m.colorClass}`}>
                            {m.category}
                          </span>
                          <span className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5 whitespace-nowrap">
                            <Award size={12} /> +{m.xpValue} XP
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors duration-250 line-clamp-1">
                          {m.title}
                        </h4>
                        
                        <p className="text-xs text-slate-500 font-semibold line-clamp-3 leading-relaxed">
                          {m.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-400" />
                            <span>{m.city} • {m.district}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={12} className="text-slate-400" />
                            <span>{m.volunteerCount}/{m.maxVolunteers} Gönüllü</span>
                          </div>
                        </div>

                        {appStatus ? (
                          <div className={`w-full py-2.5 rounded-xl text-center text-xs font-extrabold flex items-center justify-center gap-1.5 border ${
                            appStatus === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            <CheckCircle2 size={14} />
                            {appStatus === 'completed' ? 'Faaliyet Başarıyla Tamamlandı' : 'Aday Gönüllü Onay Sürecinde'}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedMissionId(m.id); }}
                              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-[11px] border border-slate-200 transition-all text-center"
                            >
                              Detay İncele
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleApplyClick(m.id); }}
                              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-[11px] transition-all text-center shadow-lg shadow-red-100 flex items-center justify-center gap-1"
                            >
                              Hızlı Başvur
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* DETAIL OVERLAY POPUP MODAL */}
      {selectedMissionDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-md animate-fade-in" id="mission-detail-modal">
          <div className="bg-white/75 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative border border-white/50 flex flex-col max-h-[90vh]">
            
            <button 
              onClick={() => setSelectedMissionId(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all z-10"
              id="btn-close-detail"
            >
              <X size={20} />
            </button>

            {/* Visual banner for details */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white space-y-3 relative">
              <span className="bg-white/20 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{selectedMissionDetail.category}</span>
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-snug">{selectedMissionDetail.title}</h3>
              
              <div className="flex flex-wrap gap-4 text-xs font-bold text-red-100">
                <div className="flex items-center gap-1"><MapPin size={14} /> {selectedMissionDetail.city} • {selectedMissionDetail.district}</div>
                <div className="flex items-center gap-1"><Timer size={14} /> {selectedMissionDetail.duration}</div>
                <div className="flex items-center gap-1"><Users size={14} /> {selectedMissionDetail.volunteerCount}/{selectedMissionDetail.maxVolunteers} Gönüllü Doluluğu</div>
              </div>
              
              {selectedMissionDetail.isUrgent && (
                <div className="absolute top-4 right-14 bg-white text-red-600 text-[9px] font-black px-3 py-1 rounded-full shadow-lg border border-red-500 animate-pulse">ACİL İLAN</div>
              )}
            </div>

            {/* Scrollable details */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">GÖREV AÇIKLAMASI & İÇERİK</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold whitespace-pre-line">
                  {selectedMissionDetail.description}
                </p>
              </div>

              {/* Training requirement or skill prerequisite alert */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-500 fill-amber-500" /> Kızılay Ödülleri & Kazanımlar
                </h5>
                <p className="text-xs text-slate-600 font-semibold">Bu görevi tamamladığınızda hanenize <span className="font-bold text-slate-800">+{selectedMissionDetail.xpValue} XP</span> eklenecek, ayın gönüllüsü derecelerine yaklaşıp yeni seviye rozetleri kazanacaksınız.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 border border-slate-100 rounded-2xl text-left bg-emerald-50/20">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ONAY SÜRECİ HIZI</p>
                  <p className="text-xs font-bold text-slate-900 mt-1">Görevin zamanına göre ortalama onay süresi 3 saattir.</p>
                </div>
                <div className="p-4 border border-slate-100 rounded-2xl text-left bg-indigo-50/20">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">EKİP LİDERİ ATAMASI</p>
                  <p className="text-xs font-bold text-slate-900 mt-1">Onaylandıktan sonra WhatsApp/Saha takip lideriniz atanacaktır.</p>
                </div>
              </div>

            </div>

            {/* Action buttons footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
              <button 
                onClick={() => setSelectedMissionId(null)}
                className="px-6 py-3 border border-slate-200 font-bold hover:bg-slate-100 text-slate-700 rounded-xl text-xs transition-all duration-150"
              >
                Geri Dön
              </button>
              
              {getApplicationStatus(selectedMissionId!) ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 px-6 py-3 rounded-xl text-xs font-extrabold">
                  Başvuruldu • Onay Bekliyor
                </div>
              ) : (
                <button
                  onClick={() => { handleApplyClick(selectedMissionId!); }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs shadow-lg shadow-red-100 transition-all duration-200 flex items-center gap-1.5"
                >
                  <Compass size={14} /> Göreve Başvurumu Gönder
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

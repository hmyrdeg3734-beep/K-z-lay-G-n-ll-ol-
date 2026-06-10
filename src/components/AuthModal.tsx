import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Heart, Sparkles, Check, Phone, ShieldCheck, Mail, User, Compass, Wrench } from 'lucide-react';
import { UserProfile } from '../types';
import { INTERESTS_LIST, SKILLS_LIST, TURKEY_CITIES } from '../data';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);

  // Account target switch
  const [selectedRole, setSelectedRole] = useState<'personal' | 'corporate'>('personal');
  const [regRole, setRegRole] = useState<'personal' | 'corporate'>('personal');

  // Form states - Login
  const [loginEmail, setLoginEmail] = useState('gonullu@kizilay.org.tr');
  const [loginPassword, setLoginPassword] = useState('123456');

  // Form states - Register Step 1 (Personal Info)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBirth, setRegBirth] = useState('2000-01-01');
  const [regCity, setRegCity] = useState('İstanbul');
  const [regDistrict, setRegDistrict] = useState('Kadıköy');
  const [regBlood, setRegBlood] = useState('A Rh(+)');
  const [regOccupation, setRegOccupation] = useState('');

  // Form states - Register Step 2 (Interests)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Form states - Register Step 3 (Skills)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleToggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;

    // Simulate login
    const mockUser: UserProfile = {
      id: "u_demo",
      name: selectedRole === 'corporate' ? "Şube Başkanı (İsim Soyisim)" : "Gönüllü (İsim Soyisim)",
      email: loginEmail,
      phone: selectedRole === 'corporate' ? "+90 533 999 8877" : "+90 532 111 2233",
      birthDate: selectedRole === 'corporate' ? "1980-04-12" : "1995-05-15",
      city: "İstanbul",
      district: selectedRole === 'corporate' ? "Kadıköy Şubesi" : "Beşiktaş",
      bloodType: "0 Rh(+)",
      occupation: selectedRole === 'corporate' ? "Kızılay Şube Başkanı / Koordinatör" : "Yazılım Mühendisi",
      interests: selectedRole === 'corporate' ? ["Afet Yönetimi", "Sosyal Yardım"] : ["Afet Yönetimi", "İlk Yardım", "Teknoloji & Yazılım"],
      skills: selectedRole === 'corporate' ? ["Eğitmenlik", "Arama Kurtarma Eğitimi"] : ["Yazılım / Grafik Tasarım", "Yabancı Dil (İngilizce/Arapça)", "B Sınıfı Ehliyet"],
      level: selectedRole === 'corporate' ? 5 : 3,
      xp: selectedRole === 'corporate' ? 4500 : 1250,
      completedHours: selectedRole === 'corporate' ? 120 : 18,
      badges: selectedRole === 'corporate' ? ["b1", "b2", "b3", "b4", "b5"] : ["b1", "b2", "b5"],
      completedTraining: ["t1"],
      appliedMissions: selectedRole === 'corporate' ? [] : [
        { missionId: "m2", status: 'approved' }
      ],
      notifications: { sms: true, email: true, push: true },
      qrCode: selectedRole === 'corporate' ? "KIZILAY-CORP-9102" : "KIZILAY-VOL-UDEMO-99126",
      role: selectedRole
    };

    onLoginSuccess(mockUser);
    onClose();
  };

  const handleRegisterSubmit = () => {
    // Generate real profile representation
    const newUser: UserProfile = {
      id: "u_" + Date.now(),
      name: regName || (regRole === 'corporate' ? "Şube Başkanı (İsim Soyisim)" : "Gönüllü (İsim Soyisim)"),
      email: regEmail || (regRole === 'corporate' ? "subebaskani@kizilay.org.tr" : "gonullu.genclik@gmail.com"),
      phone: regPhone || "+90 555 123 4567",
      birthDate: regBirth,
      city: regCity,
      district: regDistrict,
      bloodType: regBlood,
      occupation: regOccupation || (regRole === 'corporate' ? "Yönetici / Kızılay Başkanı" : "Öğrenci"),
      interests: selectedInterests.length > 0 ? selectedInterests : ["Sosyal Yardım", "Eğitim Desteği"],
      skills: selectedSkills,
      level: regRole === 'corporate' ? 5 : 1,
      xp: regRole === 'corporate' ? 3000 : 100, // Welcome gift XP
      completedHours: regRole === 'corporate' ? 50 : 0,
      badges: regRole === 'corporate' ? ["b1", "b4"] : ["b1"], // "İlk Adım" badge auto-unlocked
      completedTraining: [],
      appliedMissions: [],
      notifications: { sms: true, email: true, push: true },
      qrCode: `KIZILAY-${regRole === 'corporate' ? 'CORP' : 'VOL'}-${Math.floor(Math.random() * 900000 + 100000)}`,
      role: regRole
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" id="auth-modal-overlay">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden relative border border-slate-100 flex flex-col max-h-[90vh]" id="auth-modal-card">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all z-10"
          id="btn-close-auth-modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header Decoration */}
        <div className="bg-red-600 p-6 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Heart className="text-white fill-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">{isLogin ? 'Kızılay Gönüllü Girişi' : 'GönüllüOl Kayıt Paneli'}</h2>
              <p className="text-xs text-red-100 mt-0.5">{isLogin ? 'Bilgilerini girerek paneline erişebilirsin.' : 'Modern adımları izleyerek hiyerarşideki yerini al.'}</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 blur-[1px]">
            <Sparkles size={100} />
          </div>
        </div>

        {/* Content Panel Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLogin ? (
            /* ===================================== LOGIN FORM ===================================== */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Account Switcher Tabs */}
              <div className="flex p-1 bg-slate-100/70 backdrop-blur-sm rounded-xl border border-slate-200/50 mb-4 shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('personal');
                    setLoginEmail('gonullu@kizilay.org.tr');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedRole === 'personal'
                      ? 'bg-white text-red-600 shadow-sm border border-slate-200/30 font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Kişisel Gönüllü
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('corporate');
                    setLoginEmail('baskan@kizilay.org.tr');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedRole === 'corporate'
                      ? 'bg-white text-[#d32f2f] shadow-sm border border-slate-200/30 font-extrabold'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  Kurumsal / Kızılay Başkanı
                </button>
              </div>

              <div className="bg-red-50/60 rounded-2xl p-4 border border-red-100 flex gap-3 text-xs text-red-800 leading-relaxed mb-4">
                <ShieldCheck size={18} className="shrink-0 text-red-600 mt-0.5" />
                <div>
                  <span className="font-bold">Hesap Türü:</span> {selectedRole === 'corporate' ? (
                    <span>Şube başkanı paneliyle giriş yapmak üzeresiniz. Giriş yapınca yeni görevler/ilanlar oluşturabilirsiniz!</span>
                  ) : (
                    <span>Bireysel gönüllü hesabı ile giriş yapmak üzeresiniz. Eğitimler alabilir, görevlere başvurabilirsiniz!</span>
                  )}
                  <br />
                  <span className="text-[10px] text-red-500 mt-1 block">Herhangi bir şifre girmeden direkt <b>"Giriş Yap"</b> butonuna basarak anında bağlanabilirsiniz.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">E-posta Adresi</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-slate-400"><Mail size={16} /></span>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                    placeholder="ornek@kizilay.org.tr"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Şifre</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-slate-400"><User size={16} /></span>
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                    placeholder="••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs mt-1">
                <label className="flex items-center gap-1.5 text-slate-600 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-red-600 focus:ring-red-500" /> Beni Hatırla
                </label>
                <span className="text-red-600 hover:underline cursor-pointer font-bold">Şifremi Unuttum</span>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl mt-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-100 group"
              >
                Giriş Yap <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center pt-4 border-t border-slate-100 mt-6">
                <p className="text-xs text-slate-500 font-medium">
                  Henüz bir hesabın yok mu?{' '}
                  <span 
                    onClick={() => { setIsLogin(false); setStep(1); }}
                    className="text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Şimdi Gönüllü Ol
                  </span>
                </p>
              </div>
            </form>
          ) : (
            /* ===================================== REGISTER FORM (STEPPER) ===================================== */
            <div>
              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-between mb-8">
                {[
                  { num: 1, label: 'Kişisel' },
                  { num: 2, label: 'İlgi Alanları' },
                  { num: 3, label: 'Yetenekler' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display ${
                        step === s.num
                          ? 'bg-red-600 text-white ring-4 ring-red-100'
                          : step > s.num
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 text-slate-400'
                      }`}>
                        {step > s.num ? <Check size={14} /> : s.num}
                      </div>
                      <span className={`text-xs font-bold leading-none hidden sm:inline ${
                        step === s.num ? 'text-red-600' : 'text-slate-500'
                      }`}>{s.label}</span>
                    </div>
                    {s.num < 3 && (
                      <div className={`h-1 flex-1 mx-4 rounded ${
                        step > s.num ? 'bg-emerald-500' : 'bg-slate-100'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* Registration Role Switcher */}
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100/60 rounded-xl border border-slate-200/50">
                    <button
                      type="button"
                      onClick={() => setRegRole('personal')}
                      className={`py-2 text-[11px] font-extrabold rounded-lg transition-all ${
                        regRole === 'personal'
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Kişisel Gönüllü Kaydı
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('corporate')}
                      className={`py-2 text-[11px] font-extrabold rounded-lg transition-all ${
                        regRole === 'corporate'
                          ? 'bg-[#d32f2f] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Şube Başkanı Kaydı
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Ad Soyad</label>
                      <input 
                        type="text" 
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Zeynep Yılmaz"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">E-posta</label>
                      <input 
                        type="email" 
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="zeynep@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Cep Telefonu</label>
                      <input 
                        type="tel" 
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="05551234567"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Doğum Tarihi</label>
                      <input 
                        type="date" 
                        value={regBirth}
                        onChange={(e) => setRegBirth(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Şehir</label>
                      <select 
                        value={regCity} 
                        onChange={(e) => setRegCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        {TURKEY_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Kan Grubu</label>
                      <select 
                        value={regBlood} 
                        onChange={(e) => setRegBlood(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        {["A Rh(+)", "A Rh(-)", "B Rh(+)", "B Rh(-)", "AB Rh(+)", "AB Rh(-)", "0 Rh(+)", "0 Rh(-)"].map(k => (
                          <option key={k} value={k}>{k}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Meslek</label>
                      <input 
                        type="text" 
                        value={regOccupation}
                        onChange={(e) => setRegOccupation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Öğretmen, Mühendis vb."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">İlçe</label>
                      <input 
                        type="text" 
                        value={regDistrict}
                        onChange={(e) => setRegDistrict(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Kadıköy"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button 
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="px-6 py-3 font-bold text-xs text-slate-500 hover:text-slate-800 transition"
                    >
                      Zaten Üyeyim
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        if (!regName || !regEmail) {
                          alert("Lütfen en az Ad Soyad ve E-posta alanlarını doldurun.");
                          return;
                        }
                        setStep(2);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-red-100"
                    >
                      İleri <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Interests */}
              {step === 2 && (
                <div>
                  <p className="text-xs text-slate-500 mb-4 font-medium flex items-center gap-1">
                    <Compass size={14} className="text-red-500" /> Kızılay bünyesinde hangi alanlardaki faaliyetler sizi daha fazla heyecanlandırıyor? (Seçinize Göre Görevler Önerilecektir)
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {INTERESTS_LIST.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleToggleInterest(interest)}
                          className={`p-3 text-left rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-red-50 border-red-500 text-red-700 ring-2 ring-red-100'
                              : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {interest}
                          {isSelected && <Check size={14} className="text-red-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex justify-between mt-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 font-bold text-xs text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
                    >
                      <ArrowLeft size={14} /> Geri
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-red-100"
                    >
                      İleri <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Skills */}
              {step === 3 && (
                <div>
                  <p className="text-xs text-slate-500 mb-4 font-medium flex items-center gap-1">
                    <Wrench size={14} className="text-red-500" /> Sahip olduğunuz profesyonel beceriler, sertifikalar veya ehliyet durumları hangileridir?
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {SKILLS_LIST.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleToggleSkill(skill)}
                          className={`p-3 text-left rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-red-50 border-red-500 text-red-700 ring-2 ring-red-100'
                              : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {skill}
                          {isSelected && <Check size={14} className="text-red-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex justify-between mt-4">
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 font-bold text-xs text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
                    >
                      <ArrowLeft size={14} /> Geri
                    </button>
                    <button 
                      type="button"
                      onClick={handleRegisterSubmit}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-100"
                    >
                      <Sparkles size={14} strokeWidth={2.5} /> Gönüllü Kaydı Başlat!
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

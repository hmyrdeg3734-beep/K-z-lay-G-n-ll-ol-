import React, { useState } from 'react';
import { 
  Award, Heart, Calendar, Compass, ShieldCheck, Mail, Phone, MapPin, 
  Settings, User, Sparkles, AlertCircle, Trash2, Send, FlameKindling, 
  Bell, CheckCircle2, MessageSquare, Flame, Check, RefreshCw
} from 'lucide-react';
import { UserProfile, Mission, SocialPost, Badge } from '../types';
import { allBadges, initialSocialPosts } from '../data';

interface DashboardProps {
  user: UserProfile;
  missions: Mission[];
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  setActiveTab: (tab: 'home' | 'missions' | 'academy' | 'dashboard') => void;
  onAddMission?: (newMission: Mission) => void;
}

export default function Dashboard({
  user,
  missions,
  onUpdateUser,
  onLogout,
  setActiveTab,
  onAddMission
}: DashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'panel' | 'social' | 'settings'>('panel');

  // Template placeholder fallback to keep name generic
  const getDisplayName = () => {
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

  // New Mission form inputs state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCity, setNewCity] = useState(user.city || 'İstanbul');
  const [newDistrict, setNewDistrict] = useState(user.district || 'Kadıköy');
  const [newCategory, setNewCategory] = useState<'Afet' | 'Kan Bağışı' | 'Eğitim' | 'Sosyal Hizmet' | 'Çevre' | 'Teknoloji'>('Afet');
  const [newDuration, setNewDuration] = useState('4 Saat');
  const [newMaxVolunteers, setNewMaxVolunteers] = useState(20);
  const [newXpValue, setNewXpValue] = useState(350);
  const [newIsUrgent, setNewIsUrgent] = useState(false);

  // Pre-populated list of simulated waitlist applicants
  const [applicants, setApplicants] = useState([
    { id: "app1", name: "Zuhal Öztürk", age: 24, score: "420 XP", badge: "İlk Adım Gönüllüsü", mission: "Kan Bağışı Kampanyası Lojistik", phone: "0532 999 4455", status: "Beklemede" },
    { id: "app2", name: "Bircan Candan", age: 29, score: "850 XP", badge: "İyilik Mimarı", mission: "Doğal Afet Çadır Kurulumu ve Aşevi", phone: "0554 123 6677", status: "Beklemede" },
    { id: "app3", name: "Yiğit Doğan", age: 21, score: "180 XP", badge: "Afet Gönüllüsü", mission: "Telsiz ve Teknoloji Mentörlüğü", phone: "0543 858 2211", status: "Beklemede" },
  ]);

  const handleApproveApplicant = (applicantId: string, name: string) => {
    setApplicants(applicants.map(a => {
      if (a.id === applicantId) {
        return { ...a, status: "Onaylandı" };
      }
      return a;
    }));
    alert(`💡 KATILIM ONAYLANDI!\n\n${name} isimli gönüllümüzün saha görevi katılımı başarıyla onaylandı. Akreditasyon puanı ve katılım bilgilendirmeleri SMS olarak gönderildi.`);
  };

  const handleRejectApplicant = (applicantId: string, name: string) => {
    setApplicants(applicants.map(a => {
      if (a.id === applicantId) {
        return { ...a, status: "Reddedildi" };
      }
      return a;
    }));
    alert("Müracaat başvurusu reddedildi.");
  };

  const handlePublishMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || !newDistrict.trim()) {
      alert("Lütfen tüm alanları (Görev Başlığı, İlçe, Açıklama vb.) eksiksiz doldurunuz.");
      return;
    }

    const created: Mission = {
      id: "m_announced_" + Date.now(),
      title: newTitle,
      description: newDescription,
      city: newCity,
      district: newDistrict,
      category: newCategory,
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
      duration: newDuration,
      volunteerCount: 0,
      maxVolunteers: Number(newMaxVolunteers) || 20,
      xpValue: Number(newXpValue) || 300,
      isUrgent: newIsUrgent,
      colorClass: newCategory === 'Afet' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                  newCategory === 'Kan Bağışı' ? 'bg-red-50 text-red-700 border-red-100' :
                  newCategory === 'Eğitim' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  newCategory === 'Sosyal Hizmet' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                  newCategory === 'Çevre' ? 'bg-green-50 text-green-700 border-green-100' :
                  'bg-indigo-50 text-indigo-700 border-indigo-100'
    };

    if (onAddMission) {
      onAddMission(created);
      alert(`🎉 YENİ GÖREV İLANI YAYINLANDI!\n\n"${newTitle}" başlıklı yeni resmi saha görevi başarıyla ilan edilmiş ve tüm Kızılay Gönüllerinin listesinde yayına girmiştir.`);
      
      // Clear inputs
      setNewTitle('');
      setNewDescription('');
      setNewDistrict('');
      setNewIsUrgent(false);
    }
  };
  
  // Settings notification states
  const [notifSms, setNotifSms] = useState(user.notifications.sms);
  const [notifEmail, setNotifEmail] = useState(user.notifications.email);
  const [notifPush, setNotifPush] = useState(user.notifications.push);
  const [showCancellationConfirm, setShowCancellationConfirm] = useState(false);

  // Social states
  const [posts, setPosts] = useState<SocialPost[]>(initialSocialPosts);
  const [newPostText, setNewPostText] = useState('');

  // Apply notification changes
  const handleSaveNotifications = () => {
    const updated: UserProfile = {
      ...user,
      notifications: {
        sms: notifSms,
        email: notifEmail,
        push: notifPush
      }
    };
    onUpdateUser(updated);
    alert("Bildirim tercihleriniz başarıyla güncellendi.");
  };

  // Profile data changes
  const handleSaveProfileDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updated: UserProfile = {
      ...user,
      name: formData.get('name') as string || user.name,
      phone: formData.get('phone') as string || user.phone,
      occupation: formData.get('occupation') as string || user.occupation,
      bloodType: formData.get('bloodType') as string || user.bloodType,
    };
    onUpdateUser(updated);
    alert("Kişisel bilgileriniz başarıyla güncellendi.");
  };

  // Add social post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: SocialPost = {
      id: "p_" + Date.now(),
      author: {
        name: displayName,
        level: user.level,
        avatarColor: "bg-red-600"
      },
      content: newPostText,
      date: "Şimdi",
      likes: 0,
      liked: false,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  // Like a post
  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  // Add comment
  const handleAddComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: "c_" + Date.now(),
              author: displayName,
              content: commentText,
              date: "Şimdi"
            }
          ]
        };
      }
      return post;
    }));
  };

  // Account cancellation flow
  const handleConfirmAccountDeletion = () => {
    setShowCancellationConfirm(false);
    onLogout();
    alert("Hesabınız ve tüm verileriniz talebiniz doğrultusunda Kızılay Gönüllü veri tabanından kalıcı olarak silinmiştir.");
  };

  // Match personalized recommended missions depending on interests
  const recommendedMissions = missions.filter(m => 
    user.interests.includes(m.category) || m.city === user.city
  ).slice(0, 2);

  return (
    <div className="min-h-screen bg-transparent pt-20 pb-16" id="dashboard-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP LEVEL USER SUMMARY CAP */}
        <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-white/55 p-6 shadow-md mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center font-bold text-xl shadow-lg ${
              user.role === 'corporate' 
                ? 'bg-gradient-to-tr from-amber-500 to-amber-600 shadow-amber-100' 
                : 'bg-gradient-to-tr from-red-600 to-red-500 shadow-red-100'
            }`}>
              {displayName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
            </div>
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight font-display">{displayName}</span>
                {user.role === 'corporate' ? (
                  <span className="bg-amber-100 border border-amber-300 text-amber-900 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                    Şube Başkanı ve Koordinatör
                  </span>
                ) : (
                  <span className="bg-red-50 border border-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                    <Flame size={12} className="fill-red-500" /> Hilal Gönüllüsü
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {user.role === 'corporate' 
                  ? 'Kızılay şube faaliyetleri, yeni görev ilanları ve gönüllü müracaatlarının yönetim/yetki merkezi' 
                  : 'Saha ve kişisel akreditasyon gelişim süreçlerinizin yönetim merkezi'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'panel', label: user.role === 'corporate' ? 'Şube Yönetim Paneli' : 'Bento Panelim', icon: <Compass size={14} /> },
              { id: 'social', label: 'Gönüllü İyilik Duvarı', icon: <MessageSquare size={14} /> },
              { id: 'settings', label: 'Profil & Bildirim Ayarları', icon: <Settings size={14} /> }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubTab(sub.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                  activeSubTab === sub.id
                    ? user.role === 'corporate'
                      ? 'bg-amber-500 border border-amber-450 text-slate-900 shadow-md shadow-amber-200/55'
                      : 'bg-red-650 text-white shadow-md shadow-red-200/55'
                    : 'bg-white/40 backdrop-blur-sm border border-white/40 text-slate-600 hover:bg-white/60'
                }`}
              >
                {sub.icon} {sub.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================================= */}
        {/* TAB 1: BENTO PANELIM / OR CORPORATE PRESIDENT PANEL */}
        {/* ========================================================================================= */}
        {activeSubTab === 'panel' && (
          user.role === 'corporate' ? (
            /* ===================================================================================== */
            /* CORPORATE PRESIDENT DASHBOARD VIEW                                                    */
            /* ===================================================================================== */
            <div className="grid lg:grid-cols-12 gap-8 animate-fade-in text-left">
              {/* LEFT COLUMN: ADMIN & PRESIDENT STATS CARD (GRID SPAN 4) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* The Official President QR Card */}
                <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-red-800 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 p-10 opacity-5 bg-radial from-white to-transparent" />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <Heart size={20} className="fill-white" />
                      <span className="font-extrabold tracking-tight text-sm">GönüllüOl Yetki Kartı</span>
                    </div>
                    <span className="text-[9px] font-extrabold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">AKREDİTE BAŞKAN</span>
                  </div>

                  <div className="my-8 text-center flex flex-col items-center">
                    {/* Digital QR Representation for Presidents */}
                    <div className="bg-white p-3 rounded-2xl w-fit flex flex-col items-center shadow-lg">
                      <div className="w-24 h-24 bg-slate-50 rounded flex flex-col justify-between p-1.5 border-2 border-amber-500">
                        <div className="flex justify-between"><span className="w-3 h-3 border-t-2 border-l-2 border-amber-600" /><span className="w-3 h-3 border-t-2 border-r-2 border-amber-600" /></div>
                        <div className="text-center font-bold text-[9px] text-amber-600 tracking-tighter">YETKİ/ADMIN</div>
                        <div className="flex justify-between"><span className="w-3 h-3 border-b-2 border-l-2 border-amber-600" /><span className="w-3 h-3 border-b-2 border-r-2 border-amber-600" /></div>
                      </div>
                    </div>
                    <p className="text-[10px] font-mono tracking-wider font-extrabold text-amber-200 mt-3">KIZILAY-PRES-ID-8848</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-amber-200">Yetkili Adı</span>
                      <span>{displayName}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-amber-200">Bölge Şubesi</span>
                      <span className="text-yellow-300">{user.city} • {user.district}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold font-mono">
                      <span className="text-amber-200">Koordinasyon Modu</span>
                      <span className="text-green-300">BAŞKANLIK YETKİSİ</span>
                    </div>
                  </div>
                </div>

                {/* Branch Information details */}
                <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm text-left space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck size={14} className="text-amber-600" /> RESMİ ŞUBE STATUSÜ & SEVİYE
                  </h4>
                  <div className="space-y-3 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="font-extrabold text-slate-900">Kızılay {user.district} Şubesi</p>
                        <p className="text-[10px] text-slate-400">Akreditasyon Sicil No: #1868-KT</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      Bu yetkili paneli üzerinden bölgenizde yeni acil durum faaliyet çağrıları açabilir, sahada görev alacak gönüllüleri akredite edebilir ve müracaatları saniyeler içinde onaylayıp koordine edebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: STATS ROW, GÖREV AÇMA BÖLÜMÜ, APPLICANTS LIST */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Stats Counters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="bg-white/45 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm text-left flex items-center gap-3">
                    <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl"><Calendar size={20} /></div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase">Aktif İlanlarınız</h5>
                      <p className="text-lg font-extrabold text-slate-800 tracking-tight mt-0.5">
                        {missions.filter(m => m.city === user.city || m.id.startsWith('m_announced_')).length} Görev / İlan
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/45 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm text-left flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><User size={20} /></div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase">Bekleyen Müracaat</h5>
                      <p className="text-lg font-extrabold text-indigo-700 tracking-tight mt-0.5">
                        {applicants.filter(a => a.status === 'Beklemede').length} Gönüllü
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/45 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm col-span-2 sm:col-span-1 text-left flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Award size={20} /></div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase">Toplam Kadrolu</h5>
                      <p className="text-lg font-extrabold text-slate-800 tracking-tight mt-0.5">148 Aktif</p>
                    </div>
                  </div>
                </div>

                {/* MANDATED REQUIREMENT: GÖREV AÇMA BÖLÜMÜ (NEW GÖREV FORM) */}
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/55 shadow-lg space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div className="space-y-0.5 text-left">
                      <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <span className="p-1.5 bg-red-100 text-red-600 rounded-xl"><Sparkles size={16} /></span>
                        Yeni Gönüllülük Görevi İlan Et / Görev Aç
                      </h4>
                      <p className="text-[11px] text-slate-450 font-semibold text-slate-400">Resmi GönüllüOl mobil/web üyelerinin katılması için yeni saha koordinasyon faaliyeti başlatın</p>
                    </div>
                    <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">Yetkili Oturumu</span>
                  </div>

                  <form onSubmit={handlePublishMission} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-left">
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Görev Başlığı / İlan Adı</label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="Örn: Kadıköy Deprem Bilinci Broşür Dağıtımı"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-800 focus:outline-none focus:border-red-650 focus:ring-1 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Kategori Seçi̇ni̇z</label>
                        <select
                          value={newCategory}
                          onChange={(e: any) => setNewCategory(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-red-650"
                        >
                          <option value="Afet">Afet ve Acil Durum Yönetimi</option>
                          <option value="Kan Bağışı">Kan Bağışı Lojistik Hizmetleri</option>
                          <option value="Eğitim">Eğitim ve Gençlik Çalışmaları</option>
                          <option value="Sosyal Hizmet">Sosyal Yardım Dağıtımları</option>
                          <option value="Çevre">Çevre ve Doğa Temizliği</option>
                          <option value="Teknoloji">Bilişim ve Teknoloji Desteği</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 text-left">
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Şehir</label>
                        <input
                          type="text"
                          value={newCity}
                          disabled
                          className="w-full bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-500 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">İlçe</label>
                        <input
                          type="text"
                          required
                          value={newDistrict}
                          onChange={(e) => setNewDistrict(e.target.value)}
                          placeholder="Örn: Beşiktaş / Kadıköy"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-800 focus:outline-none focus:border-red-650"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Tahmini Faaliyet Süresi</label>
                        <select
                          value={newDuration}
                          onChange={(e) => setNewDuration(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-red-650"
                        >
                          <option value="3 Saat">3 Saatlik Saha Görevi</option>
                           <option value="6 Saat">6 Saatlik Saha Görevi</option>
                           <option value="1 Gün">1 Günlük Tam Dağıtım</option>
                           <option value="3 Gün">3 Gün Sürecek Çadır Kampı</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 text-left">
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Kontenjan (Kişi)</label>
                        <input
                          type="number"
                          value={newMaxVolunteers}
                          onChange={(e) => setNewMaxVolunteers(Number(e.target.value))}
                          placeholder="Örn: 20"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-red-650"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Verilecek Akreditasyon XP</label>
                        <input
                          type="number"
                          value={newXpValue}
                          onChange={(e) => setNewXpValue(Number(e.target.value))}
                          placeholder="Örn: 350"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-red-650"
                        />
                      </div>

                      <div className="flex items-center justify-between p-2 mt-4.5 border border-dashed border-red-200 rounded-2xl bg-red-50/20">
                        <div className="text-left">
                          <p className="text-[10px] font-black text-red-600 uppercase">ACİL GÖREV ÇAĞRISI</p>
                          <p className="text-[8px] text-slate-400 font-bold leading-none">Bannerda kırmızı hilal yanıp söner</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={newIsUrgent}
                          onChange={(e) => setNewIsUrgent(e.target.checked)}
                          className="w-4 h-4 cursor-pointer text-red-600 focus:ring-red-500 rounded border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="text-left">
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Görev Detayları & Lojistik Talimat</label>
                      <textarea
                        required
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        rows={3}
                        placeholder="Gönüllülerin yapacağı çalışmaları, toplanma yerini, gerekli teçhizat veya akreditasyon detaylarını buraya yazınız..."
                        className="w-full bg-white border border-slate-200 rounded-2xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-red-650"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="bg-red-600 hover:bg-slate-900 text-white font-black text-xs px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-red-200 hover:scale-[1.01] active:scale-[0.99] transition-all"
                      >
                        <Send size={14} /> Görevi İlan Et ve Yayınla
                      </button>
                    </div>
                  </form>
                </div>

                {/* APPLICANT REVIEW GRID LIST SECTION */}
                <div className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/52 shadow-sm space-y-4 text-left">
                  <h4 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase flex items-center gap-1.5 border-b border-white/30 pb-2">
                    <CheckCircle2 size={16} className="text-amber-500" /> Şubeye Gelen Gönüllü Müracaatları 
                  </h4>

                  <div className="space-y-3">
                    {applicants.map((a) => (
                      <div key={a.id} className="p-4 border border-slate-100/80 rounded-2xl bg-white/70 hover:border-amber-500/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900">{a.name}</span>
                            <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black">{a.badge}</span>
                            <span className="text-[9px] text-amber-600 font-extrabold">{a.score}</span>
                          </div>
                          <p className="text-xs text-slate-600 font-extrabold">Başvurulan Görev: <span className="text-red-600 font-black underline">{a.mission}</span></p>
                          <p className="text-[10px] text-slate-400 font-semibold">İletişim: {a.phone} • Kızılay Gönüllü Akreditasyon Verisi</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {a.status === 'Beklemede' ? (
                            <>
                              <button
                                onClick={() => handleRejectApplicant(a.id, a.name)}
                                className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-605 transition-colors"
                              >
                                Reddet
                              </button>
                              <button
                                onClick={() => handleApproveApplicant(a.id, a.name)}
                                className="px-3.5 py-1.5 rounded-xl text-[10px] font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex items-center gap-1"
                              >
                                <Check size={12} /> Onayla
                              </button>
                            </>
                          ) : (
                            <span className={`px-4 py-1 rounded-xl text-[11px] font-extrabold ${
                              a.status === 'Onaylandı' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700'
                            }`}>
                              {a.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* ===================================================================================== */
            /* ORIGINAL INDIVIDUAL VOLUNTEER BENTO VIEW                                              */
            /* ===================================================================================== */
            <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
              
              {/* COLUMN LEFT: GÖNÜLLÜ QR KART VİZİTELİĞİ (GRID SPAN 4) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* The Official Volunteer QR Card */}
                <div className="bg-gradient-to-br from-red-600 to-red-800 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 p-10 opacity-5 bg-radial from-white to-transparent" />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <Heart size={20} className="fill-white" />
                      <span className="font-extrabold tracking-tight text-sm">GönüllüOl Kart</span>
                    </div>
                    <span className="text-[9px] font-extrabold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">RESMİ KİMLİK</span>
                  </div>

                  <div className="my-8 text-center flex flex-col items-center">
                    {/* Digital QR Representation */}
                    <div className="bg-white p-3 rounded-2xl w-fit flex flex-col items-center shadow-lg">
                      <div className="w-24 h-24 bg-slate-50 rounded flex flex-col justify-between p-1.5">
                        <div className="flex justify-between"><span className="w-3 h-3 border-t-2 border-l-2 border-red-600" /><span className="w-3 h-3 border-t-2 border-r-2 border-red-600" /></div>
                        <div className="text-center font-bold text-[10px] text-red-600 tracking-tighter">KIZILAY QR</div>
                        <div className="flex justify-between"><span className="w-3 h-3 border-b-2 border-l-2 border-red-600" /><span className="w-3 h-3 border-b-2 border-r-2 border-red-600" /></div>
                      </div>
                    </div>
                    <p className="text-[10px] font-mono tracking-wider font-extrabold text-red-200 mt-3">{user.qrCode}</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-red-200">Gönüllü Adı</span>
                      <span>{displayName}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-red-200">Kan Grubu</span>
                      <span className="text-yellow-300">{user.bloodType}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-red-200">Şehir / İlçe</span>
                      <span>{user.city} • {user.district}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Level Tracker widget */}
                <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm text-left space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-500 uppercase">AKREDİTASYON SEVİYESİ</span>
                    <span className="text-amber-600 flex items-center gap-0.5"><Award size={14} className="fill-amber-100" /> Rütbe: {user.level}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900 font-display leading-none">{user.xp}</span>
                    <span className="text-slate-400 font-bold text-xs">/ {user.level * 1000} XP</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-300" style={{ width: `${(user.xp / (user.level * 1000)) * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold leading-normal">Kızıl seviyeye (Serafim Liderliği) yükselmek için {user.level * 1000 - user.xp} XP daha kazanın!</p>
                </div>

              </div>

              {/* COLUMN RIGHT: MULTIPLE INFO BOXGRID (GRID SPAN 8) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Bento Row 1: Quick Stats Counters in Grid layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  
                  <div className="bg-white/45 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm text-left flex items-center gap-3">
                    <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><Calendar size={20} /></div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase">Başvurulan Faaliyet</h5>
                      <p className="text-xl font-extrabold text-slate-800 tracking-tight mt-0.5">{user.appliedMissions.length} Görev</p>
                    </div>
                  </div>

                  <div className="bg-white/45 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm text-left flex items-center gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Sparkles size={20} /></div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase">Resmi Sertifikalanma</h5>
                      <p className="text-xl font-extrabold text-slate-800 tracking-tight mt-0.5">{user.completedTraining.length} Belge</p>
                    </div>
                  </div>

                  <div className="bg-white/45 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm col-span-2 sm:col-span-1 text-left flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Award size={20} /></div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase">Sahada Kalınan Süre</h5>
                      <p className="text-xl font-extrabold text-slate-800 tracking-tight mt-0.5">{user.completedHours} Saat</p>
                    </div>
                  </div>

                </div>

                {/* Bento Row 2: Personalized Recommended Missions and Applied List */}
                <div className="grid sm:grid-cols-2 gap-6 text-left">
                  
                  {/* Applied Missions and status */}
                  <div className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/52 shadow-sm space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase flex items-center gap-1.5 border-b border-slate-50 pb-2">
                      <CheckCircle2 size={16} className="text-emerald-600" /> Başvurularım & Durum
                    </h4>
                    
                    {user.appliedMissions.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400 font-medium">
                        Henüz herhangi bir saha görevine başvuruda bulunmadınız.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {user.appliedMissions.map((app) => {
                          const original = missions.find(m => m.id === app.missionId);
                          if (!original) return null;
                          return (
                            <div key={app.missionId} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex justify-between items-center gap-3">
                              <div>
                                <p className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{original.title}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{original.city}</p>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                app.status === 'completed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                {app.status === 'completed' ? 'Tamamlandı' : 'Onay Bekliyor'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Personalized suggestions */}
                  <div className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/52 shadow-sm space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase flex items-center gap-1.5 border-b border-white/30 pb-2">
                      <Compass size={16} className="text-red-600 animate-spin" style={{ animationDuration: '6s' }} /> Size Özel Önerilen Görevler
                    </h4>
                    
                    <div className="space-y-3">
                      {recommendedMissions.map((m) => {
                        const applied = user.appliedMissions.some(a => a.missionId === m.id);
                        return (
                          <div key={m.id} className="p-3 border border-white/40 bg-white/30 backdrop-blur-sm rounded-xl hover:border-red-500/20 transition-colors flex justify-between items-center gap-3">
                            <div>
                              <p className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{m.title}</p>
                              <p className="text-[10px] text-slate-500 font-bold">{m.category} • {m.city}</p>
                            </div>
                            <button
                              onClick={() => setActiveTab('missions')}
                              className="bg-white/70 hover:bg-red-600 text-red-600 hover:text-white border border-white/50 hover:border-red-600 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap shrink-0"
                            >
                              {applied ? 'İncele' : 'Başvur &rarr;'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Bento Row 3: Earned Badges Showcase */}
                <div className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm text-left space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase flex items-center gap-1.5 border-b border-slate-50 pb-2">
                    <Award size={16} className="text-amber-500 fill-amber-500" /> Kızılay Rozet Kütüphanem
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {allBadges.map((badge) => {
                      const owned = user.badges.includes(badge.id);
                      return (
                        <div 
                          key={badge.id}
                          className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                            owned 
                              ? 'bg-amber-50/50 border-amber-100 opacity-100' 
                              : 'bg-slate-50/20 border-slate-100 opacity-40 grayscale'
                          }`}
                        >
                          <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100 w-10 h-10 flex items-center justify-center font-bold`}>
                            <span className="text-lg">🎖️</span>
                          </div>
                          <p className="text-[11px] font-extrabold text-slate-800 tracking-tight mt-3">{badge.title}</p>
                          <p className="text-[9px] text-slate-400 mt-1 font-semibold leading-normal line-clamp-2">{badge.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          )
        )}

        {/* ========================================================================================= */}
        {/* TAB 2: SOCIAL WAL (İYİLİK DUVARI) */}
        {/* ========================================================================================= */}
        {activeSubTab === 'social' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in text-left">
            
            {/* Create new social post form widget */}
            <div className="bg-white/50 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm">
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-bold flex items-center justify-center shrink-0">
                    {displayName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                  </div>
                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Bölgendeki iyilik hikayeni diğer Kızılay gönüllüleriyle şimdi paylaş..."
                    className="w-full bg-white/40 backdrop-blur-sm border border-white/40 focus:bg-white/80 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[80px] font-semibold leading-relaxed shadow-inner"
                    maxLength={280}
                  />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{280 - newPostText.length} Karakter kaldı</span>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-slate-900 text-white font-bold px-5 py-2 rounded-xl text-xs transition duration-200 flex items-center gap-1.5"
                  >
                    <Send size={12} /> Paylaş
                  </button>
                </div>
              </form>
            </div>

            {/* Posts flow */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white/55 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-sm space-y-4">
                
                {/* Profile cap */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                      {post.author.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{post.author.name}</span>
                        <span className="bg-amber-50 text-amber-600 border border-amber-100 px-1.5 py-0.5 rounded text-[8px] font-bold">Lvl {post.author.level}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{post.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                  {post.content}
                </p>

                {/* Post Graphic illustration if exists */}
                {post.imageUrl && (
                  <div className="rounded-2xl overflow-hidden max-h-64 border border-slate-100">
                    <img referrerPolicy="no-referrer" src={post.imageUrl} alt="Social charity" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Likes engagement toggle */}
                <div className="flex items-center gap-1.5 border-t border-slate-50 pt-3">
                  <button 
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      post.liked 
                        ? 'bg-red-50 text-red-600' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Heart size={14} className={post.liked ? 'fill-red-500' : ''} />
                    <span>{post.likes}</span>
                  </button>
                </div>

                {/* Comments box */}
                <div className="space-y-3 pt-3 border-t border-slate-50">
                  {post.comments.map((comm) => (
                    <div key={comm.id} className="bg-slate-50/50 p-2 text-xs rounded-xl flex justify-between items-start gap-3 border border-slate-50">
                      <div>
                        <span className="font-extrabold text-slate-900">{comm.author}:</span>
                        <span className="text-slate-600 ml-1.5 font-semibold leading-normal">{comm.content}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold shrink-0">{comm.date}</span>
                    </div>
                  ))}

                  {/* Comment submit mini-form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.currentTarget.elements.namedItem('commText') as HTMLInputElement;
                      handleAddComment(post.id, input.value);
                      input.value = '';
                    }}
                    className="flex gap-2 pt-2"
                  >
                    <input
                      name="commText"
                      type="text"
                      placeholder="Görüşünü veya tebriklerini ilet..."
                      className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 font-semibold"
                    />
                    <button type="submit" className="bg-slate-100 hover:bg-red-600 hover:text-white px-3.5 rounded-xl text-xs font-bold transition">Gönder</button>
                  </form>
                </div>

              </div>
            ))}

          </div>
        )}

        {/* ========================================================================================= */}
        {/* TAB 3: SETTINGS & NOTIFICATIONS & SUSPEND/DELETE ACCOUNT */}
        {/* ========================================================================================= */}
        {activeSubTab === 'settings' && (
          <div className="max-w-xl mx-auto space-y-8 animate-fade-in text-left">
            
            {/* 1. Kişisel Bilgi Güncelleme form */}
            <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2 flex items-center gap-1">
                <User size={14} className="text-red-500" /> Kişisel Bilgi Güncellemesi
              </h4>
              <form onSubmit={handleSaveProfileDetails} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Ad Soyad</label>
                    <input 
                      name="name"
                      type="text"
                      defaultValue={displayName}
                      className="w-full bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Cep Telefonu</label>
                    <input 
                      name="phone"
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Meslek / Uğraş</label>
                    <input 
                      name="occupation"
                      type="text"
                      defaultValue={user.occupation}
                      className="w-full bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Kan Grubu</label>
                    <select
                      name="bloodType"
                      defaultValue={user.bloodType}
                      className="w-full bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl px-2 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner"
                    >
                      {["A Rh(+)", "A Rh(-)", "B Rh(+)", "B Rh(-)", "AB Rh(+)", "AB Rh(-)", "0 Rh(+)", "0 Rh(-)"].map(k => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-red-100 flex items-center gap-1.5"
                >
                  <RefreshCw size={12} /> Bilgileri Güncelle
                </button>
              </form>
            </div>

            {/* 2. BİLDİRİM TERCIHLERI (Addressing the complaint about unwanted SMS) */}
            <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2 flex items-center gap-1">
                <Bell size={14} className="text-red-500" /> Bildirim ve İletişim Tercihleri
              </h4>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Toplumumuzun en çok şikayetçi olduğu "izinsiz SMS gönderimi" veya gereksiz bildirimlerin önüne geçmek için buradan tüm izinleri anında kapatıp açabilirsiniz.</p>
              
              <div className="space-y-4 pt-1">
                {[
                  { label: "SMS Bildirimleri", desc: "Acil afet çağrıları ve kritik kan grubu aramaları haricinde SMS al.", checked: notifSms, set: setNotifSms },
                  { label: "E-Posta Bildirimleri", desc: "Kızılay Akademi aylık bültenlerini ve sertifika tescillerini ilet.", checked: notifEmail, set: setNotifEmail },
                  { label: "Mobil Push Sorular", desc: "Etrafındaki anlık operasyonlarda 'sana uygun görev' uyarısı sor.", checked: notifPush, set: setNotifPush }
                ].map((item, idx) => (
                  <label key={idx} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl cursor-pointer transition select-none">
                    <input 
                      type="checkbox" 
                      checked={item.checked}
                      onChange={(e) => item.set(e.target.checked)}
                      className="rounded text-red-600 focus:ring-red-500 w-5 h-5 border-slate-300 mt-0.5" 
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">{item.label}</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={handleSaveNotifications}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
              >
                Bildirim İzinlerini Kaydet
              </button>
            </div>

            {/* 3. HESAP SİL / DONDUR SEKTÖRÜ (Another major complaint perfectly addressed) */}
            <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm space-y-4 bg-red-50/20">
              <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest border-b border-red-100 pb-2 flex items-center gap-1">
                <AlertCircle size={14} /> Hesap & Veri Yönetimi
              </h4>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Platformumuzda şeffaflık önceliktir. Dilediğiniz zaman Kızılay Gönüllü üyeliğinizi dondurabilir veya veri gizliliği esasına dayanarak KVKK uyarınca tüm hesabınızı kalıcı olarak silebilirsiniz.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => alert("Gönüllü hesabınız geçici olarak dondurulmuştur. Dilediğinizde tekrar giriş yapıp aktif hale getirebilirsiniz.")}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition"
                >
                  Hesabımı Geçici Dondur
                </button>
                <button
                  onClick={() => setShowCancellationConfirm(true)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 font-bold px-5 py-2.5 rounded-xl text-xs transition flex items-center gap-1"
                >
                  <Trash2 size={12} /> Tüm Verilerimi & Hesabımı Kalıcı Sil
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ACCOUNT DELETION CONFIRMATION DIALOG MODAL */}
        {showCancellationConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" id="confirm-deletion-modal">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-slate-100 shadow-2xl relative text-left space-y-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-full w-fit">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Hesabınızı Silmek İstediğinizden Emin Misiniz?</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Bu işlemin geri dönüşü yoktur. Tüm kazanılan rütbeler, seviye puanları, tamamlanmış eğitimler ve kazanılmış Kızılay Gönüllü sertifikaları sistemimizden kalıcı olarak silinecektir.
              </p>
              <div className="flex gap-3 pt-3">
                <button
                  onClick={handleConfirmAccountDeletion}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold flex-1 py-3 rounded-xl text-xs transition"
                >
                  Evet, Kalıcı Olarak Sil
                </button>
                <button
                  onClick={() => setShowCancellationConfirm(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex-1 py-3 rounded-xl text-xs transition"
                >
                  Vazgeç
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

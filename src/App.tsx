import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import MissionsPage from './components/MissionsPage';
import AcademyPage from './components/AcademyPage';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import { initialMissions, allTrainingModules } from './data';
import { UserProfile, Mission } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'missions' | 'academy' | 'dashboard'>('home');
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Load from local storage state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('kizilay_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('kizilay_missions');
    return saved ? JSON.parse(saved) : initialMissions;
  });

  // Save changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('kizilay_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kizilay_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('kizilay_missions', JSON.stringify(missions));
  }, [missions]);

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    setAuthModalOpen(false);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const handleToggleUserRole = () => {
    if (!user) return;
    const newRole = user.role === 'corporate' ? 'personal' : 'corporate';
    const updatedUser: UserProfile = {
      ...user,
      role: newRole
    };
    setUser(updatedUser);
  };

  const handleCreateMission = (newMission: Mission) => {
    setMissions(prev => [newMission, ...prev]);
  };

  // Process Apply to Mission
  const handleApplyForMission = (missionId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    // Check duplicate
    const alreadyApplied = user.appliedMissions.some(a => a.missionId === missionId);
    if (alreadyApplied) return;

    // Update user profile representation
    const updatedUser: UserProfile = {
      ...user,
      appliedMissions: [...user.appliedMissions, { missionId, status: 'pending' }]
    };

    // Increment original mission counter in page list
    const updatedMissions = missions.map(m => {
      if (m.id === missionId) {
        return {
          ...m,
          volunteerCount: Math.min(m.volunteerCount + 1, m.maxVolunteers)
        };
      }
      return m;
    });

    setUser(updatedUser);
    setMissions(updatedMissions);
    alert("BAŞVURU BAŞARILI! Gönüllü adaylığı kaydınız başarıyla oluşturulmuştur. Onay süreci tamamlandığında iletişim numaranızdan lideriniz size ulaşacaktır.");
  };

  // Complete Training Quiz and update certificate
  const handleCompleteTraining = (moduleId: string, xpReward: number, certificateName: string) => {
    if (!user) return;

    // Check duplicate training status
    if (user.completedTraining.includes(moduleId)) return;

    const newXp = user.xp + xpReward;
    let newLevel = user.level;
    let earnedBadges = [...user.badges];

    // Award immediate Afet badge if basic courses completed
    if (moduleId === "t1" && !earnedBadges.includes("b5")) {
      earnedBadges.push("b5");
    }
    // Award first aid helper badge if training is first aid
    if (moduleId === "t2" && !earnedBadges.includes("b3")) {
      earnedBadges.push("b3");
    }

    // Rank level up simulation (e.g. 1000 XP per level requirement threshold)
    const nextLevelThreshold = newLevel * 1000;
    if (newXp >= nextLevelThreshold) {
      newLevel = newLevel + 1;
      // Unlock Hero Rank badge
      if (newLevel === 2 && !earnedBadges.includes("b2")) {
        earnedBadges.push("b2");
      }
      alert(`TEBRİKLER! Gelişim eğitimlerin sayende seviye atladın! Yeni Rütbeniz: Seviye ${newLevel}! Yeni resmi görev ve koordinasyon yetkileriniz açılmıştır.`);
    }

    const updatedUser: UserProfile = {
      ...user,
      xp: newXp,
      level: newLevel,
      badges: earnedBadges,
      completedTraining: [...user.completedTraining, moduleId]
    };

    setUser(updatedUser);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800 font-sans relative overflow-x-hidden" id="app-root-container">
      
      {/* Frosted Glass Background Ambient Gradients */}
      <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] bg-red-100 rounded-full blur-[110px] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute bottom-[15%] left-[-8%] w-[500px] h-[500px] bg-slate-200 rounded-full blur-[100px] opacity-50 pointer-events-none z-0"></div>
      <div className="absolute top-[45%] left-[55%] w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[120px] opacity-45 pointer-events-none z-0"></div>

      {/* Dynamic Header Navbar Bar */}
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onToggleRole={handleToggleUserRole}
      />

      {/* Primary Section Switch Router Panel */}
      <main className="flex-grow relative z-10">
        {activeTab === 'home' && (
          <LandingPage 
            missions={missions} 
            onApplyForMission={handleApplyForMission}
            user={user}
            onOpenAuth={() => setAuthModalOpen(true)}
            setActiveTab={setActiveTab}
            setSelectedMissionId={setSelectedMissionId}
          />
        )}

        {activeTab === 'missions' && (
          <MissionsPage 
            missions={missions}
            user={user}
            onApplyForMission={handleApplyForMission}
            onOpenAuth={() => setAuthModalOpen(true)}
            selectedMissionId={selectedMissionId}
            setSelectedMissionId={setSelectedMissionId}
          />
        )}

        {activeTab === 'academy' && (
          <AcademyPage 
            modules={allTrainingModules}
            user={user}
            onCompleteTraining={handleCompleteTraining}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && user && (
          <Dashboard 
            user={user}
            missions={missions}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
            setActiveTab={setActiveTab}
            onAddMission={handleCreateMission}
          />
        )}
      </main>

      {/* Legal & Corporate Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Authentication & stepper signup Modal */}
      {authModalOpen && (
        <AuthModal 
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}

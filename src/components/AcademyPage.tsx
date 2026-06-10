import React, { useState } from 'react';
import { BookOpen, Timer, Award, Sparkles, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, Play, CircleDot, HelpCircle } from 'lucide-react';
import { TrainingModule, UserProfile } from '../types';

interface AcademyPageProps {
  modules: TrainingModule[];
  user: UserProfile | null;
  onCompleteTraining: (moduleId: string, xpReward: number, certificateName: string) => void;
  onOpenAuth: () => void;
}

export default function AcademyPage({
  modules,
  user,
  onCompleteTraining,
  onOpenAuth
}: AcademyPageProps) {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [inQuizMode, setInQuizMode] = useState(false);
  
  // Quiz evaluation states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [certificateEarned, setCertificateEarned] = useState<string | null>(null);

  const activeModule = modules.find(m => m.id === activeModuleId);

  // Check if training completed already helper
  const isCompletedAlready = (moduleId: string) => {
    if (!user) return false;
    return user.completedTraining.includes(moduleId);
  };

  const handleStartModule = (moduleId: string) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    setActiveModuleId(moduleId);
    setCurrentSlideIndex(0);
    setInQuizMode(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setCertificateEarned(null);
  };

  const handleNextSlide = () => {
    if (!activeModule) return;
    if (currentSlideIndex < activeModule.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setInQuizMode(true);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handleNextQuestion = () => {
    if (!activeModule) return;
    if (selectedAnswers[currentQuestionIndex] === undefined) {
      alert("Lütfen bir şık seçip ilerleyiniz.");
      return;
    }

    if (currentQuestionIndex < activeModule.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Evaluate quiz score
      let correctGuesses = 0;
      activeModule.quiz.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correctGuesses++;
        }
      });

      const passed = correctGuesses === activeModule.quiz.length; // Needs 100% correct
      setQuizFinished(true);

      if (passed) {
        setCertificateEarned(activeModule.certificateName);
        onCompleteTraining(activeModule.id, activeModule.xpReward, activeModule.certificateName);
      } else {
        setCertificateEarned(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent pt-20 pb-16" id="academy-page-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module detail view or list view */}
        {!activeModuleId ? (
          /* ===================================== ACADEMY LISTING VIEW ===================================== */
          <div className="space-y-10 animate-fade-in">
            {/* Header banner */}
            <div className="bg-gradient-to-br from-indigo-950/80 to-slate-950/80 backdrop-blur-md text-white rounded-[2rem] p-8 sm:p-12 border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-24 opacity-10 bg-radial from-violet-400 to-transparent" />
              <div className="max-w-2xl relative z-10 space-y-4 text-left">
                <span className="bg-indigo-500/15 backdrop-blur-sm text-indigo-300 border border-indigo-500/25 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">KIZILAY SERTİFİKA VE AKREDİTASYON SİSTEMİ</span>
                <h1 className="text-3xl sm:text-4.5xl font-black font-display tracking-tight leading-none text-white">
                  Kızılay Gönüllü Akademisi
                </h1>
                <p className="text-xs sm:text-sm text-indigo-200/80 font-semibold leading-relaxed">
                  Resmi sahalarda çadır liderliği, ilk yardım ekibi veya kan bağışçısı elçisi ünvanı kazanmak için dilediğiniz eğitimi tamamlayarak yetkili bir Kızılay neferi rütbesi edinin.
                </p>
              </div>
            </div>

            {/* Existing certificates counter */}
            {user && user.completedTraining.length > 0 && (
              <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-600 text-white rounded-2xl"><Award size={24} /></div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Mevcut Sertifikalarınız Aktif!</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Gönüllü profilinizde tescillenmiş {user.completedTraining.length} adet resmi Kızılay akreditasyonunuz bulunmaktadır.</p>
                  </div>
                </div>
                <div className="bg-white border border-emerald-100 px-5 py-2 rounded-2xl text-xs font-bold text-emerald-800 shrink-0">
                  +{user.completedTraining.length * 150} Gönüllü XP Kazancı
                </div>
              </div>
            )}

            {/* Modules Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {modules.map((m) => {
                const completed = isCompletedAlready(m.id);
                return (
                  <div 
                    key={m.id} 
                    className="bg-white/45 backdrop-blur-md rounded-3xl p-6 border border-white/50 hover:shadow-xl hover:border-indigo-500/30 hover:bg-white/65 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between items-center">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-250">
                          <BookOpen size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 rounded-full flex items-center gap-0.5">
                          <Sparkles size={10} fill="currentColor" /> +{m.xpReward} XP
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {m.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                        {m.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500">
                        <span className="flex items-center gap-1"><Timer size={12} /> {m.duration}</span>
                        <span className="font-mono text-indigo-600 font-bold uppercase">{m.quiz.length} Sorulu Sınav</span>
                      </div>

                      {completed ? (
                        <div className="w-full bg-emerald-50 text-emerald-700 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200">
                          <CheckCircle2 size={16} /> Sertifika Kazanıldı!
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartModule(m.id)}
                          className="w-full py-3 bg-indigo-600 hover:bg-slate-900 hover:scale-[1.01] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-100"
                        >
                          <Play size={12} fill="currentColor" /> Eğitimi Başlat
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ===================================== INTERACTIVE STUDY / QUIZ WORKSPACE ===================================== */
          <div className="max-w-3xl mx-auto bg-white/75 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl overflow-hidden animate-fade-in text-left">
            
            {/* Module Workspace Header */}
            <div className="bg-indigo-950 p-6 text-white flex justify-between items-center">
              <div>
                <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">KIZILAY AKADEMİ AKUSTİK LAB</p>
                <h2 className="text-lg font-bold font-display leading-tight">{activeModule.title}</h2>
              </div>
              <button
                onClick={() => setActiveModuleId(null)}
                className="text-xs font-bold text-indigo-200 hover:text-white bg-white/10 px-4 py-2 rounded-xl transition"
              >
                Eğitimden Çık
              </button>
            </div>

            {/* Slider visual bar */}
            {!inQuizMode && (
              <div className="w-full bg-slate-100 h-1.5 flex">
                {activeModule.slides.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-full flex-1 transition-all ${
                      idx <= currentSlideIndex ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Main Interactive Container */}
            <div className="p-8 min-h-[300px] flex flex-col justify-between">
              
              {!inQuizMode ? (
                /* ================= SLIDE CONTENT ================= */
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded">BÖLÜM {currentSlideIndex + 1} / {activeModule.slides.length}</span>
                    <h3 className="text-xl font-bold text-slate-900 pt-2">{activeModule.slides[currentSlideIndex].title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold whitespace-pre-line bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-inner">
                    {activeModule.slides[currentSlideIndex].text}
                  </p>

                  <div className="pt-8 flex justify-between">
                    <button
                      disabled={currentSlideIndex === 0}
                      onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition ${
                        currentSlideIndex === 0
                          ? 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-400'
                          : 'bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      Önceki Sayfa
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-100"
                    >
                      {currentSlideIndex === activeModule.slides.length - 1 ? 'Sınavı Başlat' : 'Sonraki Sayfa'} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                /* ================= QUIZ MODE WORKSPACE ================= */
                <div>
                  {!quizFinished ? (
                    <div className="space-y-6">
                      <div className="space-y-1 border-b border-slate-100 pb-3 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-1 rounded">Sertifika Sınavı</span>
                          <h3 className="text-sm font-bold text-slate-500 mt-2">Soru {currentQuestionIndex + 1} / {activeModule.quiz.length}</h3>
                        </div>
                        <HelpCircle size={20} className="text-indigo-600" />
                      </div>

                      <p className="text-sm font-bold text-slate-900 bg-indigo-50/50 p-4 rounded-xl">
                        {activeModule.quiz[currentQuestionIndex].question}
                      </p>

                      <div className="space-y-2 mt-4">
                        {activeModule.quiz[currentQuestionIndex].options.map((option, choiceIdx) => {
                          const isSelected = selectedAnswers[currentQuestionIndex] === choiceIdx;
                          return (
                            <button
                              key={choiceIdx}
                              onClick={() => handleAnswerSelect(choiceIdx)}
                              className={`w-full text-left p-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-between ${
                                isSelected
                                  ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-800 ring-2 ring-indigo-500/25 backdrop-blur-sm'
                                  : 'bg-white/35 border-white/40 text-slate-700 hover:bg-white/55'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <CircleDot size={14} className={isSelected ? 'text-indigo-600' : 'text-slate-300'} />
                                <span>{option}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-8 flex justify-end">
                        <button
                          onClick={handleNextQuestion}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-indigo-100"
                        >
                          {currentQuestionIndex === activeModule.quiz.length - 1 ? 'Sınavı Bitir' : 'Sonraki Soru'} &rarr;
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ================= QUIZ FINISHED RESULTS ================= */
                    <div className="space-y-6 text-center py-6">
                      {certificateEarned ? (
                        <div className="space-y-4 flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                            <Award size={36} />
                          </div>
                          <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight">Tebrikler! Sınavı Tamamladınız</h3>
                          <p className="text-xs text-slate-500 max-w-md font-medium">Sertifika sınavında tam puan aldınız ve hanenize <span className="font-bold text-indigo-700">+{activeModule.xpReward} XP</span> yazıldı!</p>
                          
                          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-2xl max-w-sm w-full border border-amber-400 shadow-xl space-y-2 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><Award size={100} /></div>
                            <p className="text-[9px] font-bold tracking-widest text-amber-100">TÜRKİYE KIZILAY DERNEĞİ</p>
                            <h4 className="text-lg font-black font-display">{certificateEarned}</h4>
                            <p className="text-[10px] text-amber-100">{user?.name} adına tescil edilmiştir.</p>
                          </div>

                          <button
                            onClick={() => setActiveModuleId(null)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl text-xs tracking-tight transition shadow-lg shadow-indigo-100"
                          >
                            Akademi Paneline Dön
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4 flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <AlertCircle size={36} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">Maalesef Başarılı Olamadınız</h3>
                          <p className="text-xs text-slate-500 max-w-sm">Kızılay akreditasyonu için tüm sorulara doğru yanıt vermeniz gerekmektedir. Bir kez daha çalışıp tekrar deneyin!</p>
                          
                          <div className="flex gap-4 pt-4">
                            <button
                              onClick={() => handleStartModule(activeModule.id)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow"
                            >
                              Tekrar Dene
                            </button>
                            <button
                              onClick={() => setActiveModuleId(null)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs"
                            >
                              Kapat
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

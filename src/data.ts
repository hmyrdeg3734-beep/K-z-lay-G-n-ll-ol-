import { Mission, TrainingModule, Badge, SocialPost } from './types';

export const TURKEY_CITIES = [
  "İstanbul", "Ankara", "İzmir", "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", 
  "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", 
  "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", 
  "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", 
  "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "Kahramanmaraş", "Karabük", 
  "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli", "Kırşehir", 
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş", 
  "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", 
  "Sinop", "Sivas", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", 
  "Yozgat", "Zonguldak"
];

export const INTERESTS_LIST = [
  "Afet Yönetimi", "İlk Yardım", "Sosyal Yardım", "Kan Bağışı Örgütlenmesi", 
  "Çevre ve İklim", "Çocuk ve Gençlik", "Eğitim Desteği", "Psikolojik Destek", 
  "Teknoloji & Yazılım", "Fotoğrafçılık & Medya"
];

export const SKILLS_LIST = [
  "B Sınıfı Ehliyet", "Yabancı Dil (İngilizce/Arapça)", "Pedagojik Formasyon", 
  "Tıbbi Eğitim", "Arama Kurtarma Eğitimi", "Yazılım / Grafik Tasarım", 
  "Aşçılık / Yemek Dağıtımı", "Fotoğraf & Video Düzenleme", "Eğitmenlik"
];

export const initialMissions: Mission[] = [
  {
    id: "m1",
    title: "Genç Kızılay Doğa ve Eğitim Kampı Liderliği",
    description: "Yaz döneminde gençlerin kişisel gelişim süreçlerine katkıda bulunmak, afet farkındalığını artırmak ve kamp liderliği yapmak üzere takım arkadaşları arıyoruz. Kamp programında eğitim koordinatörlüğü, etkinlik organizasyonu ve takım oyunları liderliği yapılacaktır. Pedagojik formasyonu veya çocuk eğitimi tecrübesi olan gönüllüler önceliklidir.",
    city: "Ankara",
    district: "Çamlıdere",
    category: "Eğitim",
    date: "2026-07-15",
    duration: "3 Gün (Yatılı)",
    volunteerCount: 14,
    maxVolunteers: 20,
    xpValue: 400,
    colorClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
    isUrgent: false
  },
  {
    id: "m2",
    title: "Gezici Aşevi Acil Gıda ve Çorba Dağıtımı",
    description: "Kızılay gezici aşevi ekibi ile birlikte sıcak gıda yardımı dağıtımı, lojistik destek ve çadır kurulum alanlarında görev alacak gönüllüler arıyoruz. Ekibimiz sahada düzenli yemek dağıtımlarını koordine ederek ihtiyaç sahiplerine sıcak yemek ulaştıracaktır.",
    city: "Hatay",
    district: "Antakya",
    category: "Afet",
    date: "2026-06-12",
    duration: "6 Saat",
    volunteerCount: 38,
    maxVolunteers: 40,
    xpValue: 500,
    colorClass: "bg-amber-50 text-amber-700 border-amber-100",
    isUrgent: true
  },
  {
    id: "m3",
    title: "Çocuk Onkoloji Servisi Moral ve Etkinlik Günleri",
    description: "Hastanelerde yatan çocuklarımızın moral seviyesini yükseltmek amacıyla düzenlenen yüz boyama, oyun, masal okuma ve mini tiyatro etkinliklerimiz için yaratıcı ve enerjik gönüllüler arıyoruz. Hijyen kuralları gereği sağlık geçmişi sorgulaması yapılacaktır.",
    city: "İstanbul",
    district: "Şişli",
    category: "Sosyal Hizmet",
    date: "2026-06-20",
    duration: "4 Saat",
    volunteerCount: 5,
    maxVolunteers: 12,
    xpValue: 300,
    colorClass: "bg-purple-50 text-purple-700 border-purple-100",
    isUrgent: false
  },
  {
    id: "m4",
    title: "Dünya Kan Bağışçıları Günü Kampanya Desteği",
    description: "Kan bağışının önemini anlatmak, broşür dağıtmak, bağışçı formlarının doldurulmasına destek olmak ve bağışçılara ikram sunumları gerçekleştirmek üzere meydanlarda kurulacak kan bağışı çadırlarımızda görev yapacak gönüllüler arıyoruz.",
    city: "İzmir",
    district: "Konak",
    category: "Kan Bağışı",
    date: "2026-06-14",
    duration: "8 Saat",
    volunteerCount: 18,
    maxVolunteers: 30,
    xpValue: 350,
    colorClass: "bg-red-50 text-red-700 border-red-100",
    isUrgent: true
  },
  {
    id: "m5",
    title: "İklim Krizi ve Ağaçlandırma Seferberliği",
    description: "Gelecek nesillere daha yeşil bir vatan bırakmak adına Kızılay Çevre Kulübü liderliğinde gerçekleştireceğimiz 10.000 fidan dikme etkinliğine davetlisiniz! Kazma, sulama, dikim ve alan organizasyonlarında görev alarak doğaya hayat verin.",
    city: "Bursa",
    district: "Nilüfer",
    category: "Çevre",
    date: "2026-10-18",
    duration: "5 Saat",
    volunteerCount: 82,
    maxVolunteers: 150,
    xpValue: 250,
    colorClass: "bg-green-50 text-green-700 border-green-100",
    isUrgent: false
  },
  {
    id: "m6",
    title: "Teknoloji Odaklı Akran Mentörlüğü",
    description: "Gelişmekte olan bölgelerdeki lise öğrencilerine kodlama temelleri, algoritma mantığı ve Scratch ile oyun geliştirme eğitimleri sunacak bilgisayar/yazılım bilgisine sahip eğitmen gönüllüler arıyoruz. Haftalık 2 saatlik online seanslar halinde yürütülecektir.",
    city: "Trabzon",
    district: "Ortahisar",
    category: "Teknoloji",
    date: "2026-06-25",
    duration: "1 Ay (Haftada 2 saat)",
    volunteerCount: 6,
    maxVolunteers: 10,
    xpValue: 450,
    colorClass: "bg-indigo-50 text-indigo-700 border-indigo-100",
    isUrgent: false
  }
];

export const allTrainingModules: TrainingModule[] = [
  {
    id: "t1",
    title: "Temel Afet Bilinci ve İlk Önlemler",
    description: "Deprem, heyelan, yangın ve sel gibi doğal afetler öncesinde, esnasında ve sonrasında atılması gereken doğru adımları öğrenin. Kızılay ekipleriyle koordinatörlük yapmanın temelleridir.",
    duration: "45 Dakika",
    xpReward: 150,
    certificateName: "Temel Afet Hazırlık Sertifikası",
    slides: [
      {
        title: "1. Afet Nedir ve Türleri Nelerdir?",
        text: "Afet, toplumun tamamı veya belli kesimleri için fiziksel, ekonomik ve sosyal kayıplar doğuran, normal hayatı kesintiye uğratan doğa veya insan kaynaklı olaylardır. Deprem, sel, heyelan ve çığ ülkemizde en sık görülen afet türleridir."
      },
      {
        title: "2. Afet Öncesi Planlama (Altın Kurallar)",
        text: "Afetler yaşanmadan önce her aile kendi 'Afet ve Acil Durum Planı'nı yapmalıdır. Eşyaları sabitlemek, bir acil durum çantası hazırlamak ve güvenli buluşma noktasını belirlemek hayatta kalma şansını %80 artırır."
      },
      {
        title: "3. Deprem Esnasında 'Çök-Kapan-Tutun'",
        text: "Sarsıntı hissedildiğinde panik yapmadan sağlam bir masa veya sıranın yanına geçip 'ÇÖK, KAPAN, TUTUN' hareketi yapılmalıdır. Balkon, asansör ve merdivenler en dayanıksız bölgelerdir, uzak durulmalıdır."
      }
    ],
    quiz: [
      {
        question: "Deprem sarsıntısı başladığında hangisi kesinlikle yapılmamalıdır?",
        options: [
          "Hemen asansöre koşup binayı terk etmeye çalışmak",
          "Sağlam bir eşyanın yanında Çök-Kapan-Tutun yapmak",
          "Pencerelerden ve cam dolaplardan uzak durmak",
          "Varsa kafamızı bir yastık veya montla korumak"
        ],
        correctIndex: 0
      },
      {
        question: "Afet ve Acil Durum Çantası nerede saklanmalıdır?",
        options: [
          "Balkonda veya bodrum katında",
          "Ayakkabılıkta veya kilitli bir dolabın derinliklerinde",
          "Yatak odasında gardırobun en üst rafında",
          "Çıkış kapısına yakın, kolay ulaşılabilecek bir yerde"
        ],
        correctIndex: 3
      }
    ]
  },
  {
    id: "t2",
    title: "İlk Yardım ve Temel Yaşam Desteği Müfredatı",
    description: "Tıbbi ambulans ulaşana kadar kritik dakikalarda hayat kurtaran, doğru müdahale tekniklerini ve zehirlenmelerde, kırıklarda yapılacak manevraları kapsayan rehber.",
    duration: "1 Saat 15 Dakika",
    xpReward: 250,
    certificateName: "Kızılay İlk Yardım Gönüllüsü Akreditasyonu",
    slides: [
      {
        title: "1. İlk Yardım Nedir, Öncelikli Amaçları Nelerdir?",
        text: "Herhangi bir kaza veya yaşamı tehlikeye düşüren durumda, sağlık görevlilerinin yardımı sağlanıncaya kadar hayatta kalmayı sağlamak, durumu kötüleşmesini engellemek amacıyla ilaçsız yapılan müdahalelerdir."
      },
      {
        title: "2. Bilinç ve Solunum Kontrolü",
        text: "Hastaya hafifçe omuzlarından dokunup 'İyi misiniz?' diye sorularak bilinç kontrol edilir. Solunum, 'Bak-Dinle-Hisset' yöntemi ile en fazla 10 saniye süreyle kontrol edilir."
      },
      {
        title: "3. Solunum Yolunun Açılması (Heimlich Manevrası)",
        text: "Yabancı bir cisim kaçması sonucu tam tıkanma (nefes alamama, konuşamama, morarma) yaşayan bir hastaya Heimlich Manevrası uygulanır. Yumruk yapılan el iki kürek kemiği arkasından vurduktan sonra, karın üstüne yerleştirilip yukarı ve içeri doğru bastırılır."
      }
    ],
    quiz: [
      {
        question: "Tam tıkanıklık (konuşamama, nefes alamama, morarma) yaşayan bir kazazedeye hangi manevra uygulanır?",
        options: [
          "Rantek Manevrası",
          "Heimlich Manevrası",
          "Şok Pozisyonu Manevrası",
          "Kalp Masajı Manevrası"
        ],
        correctIndex: 1
      },
      {
        question: "İlk yardım esnasında solunum en fazla kaç saniye kontrol edilmelidir?",
        options: [
          "5 Saniye",
          "10 Saniye",
          "30 Saniye",
          "1 Dakika"
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: "t3",
    title: "Kan Bağışı Örgütçülüğü ve Farkındalık Eğitimi",
    description: "Dünyada her saniye ihtiyaç duyulan kan bağışının fizyolojisi, bağışçı kabul kriterleri ve Kızılay kan bağış merkezlerinde operasyonel gönüllülük dinamikleri.",
    duration: "30 Dakika",
    xpReward: 100,
    certificateName: "Kan Bağışı Elçisi Sertifikası",
    slides: [
      {
        title: "1. Neden Kan Bağışı?",
        text: "Kan, kaynağı sadece insan olan ve yapay olarak üretilemeyen hayati bir sıvıdır. Bir ünite kan bağışı, ayrıştırılan bileşenleriyle tam 3 kişinin hayatını kurtarmaktadır."
      },
      {
        title: "2. Kan Bağışı Koşulları",
        text: "18-65 yaş arasındaki, 50 kg'ın üzerindeki her sağlıklı birey kan bağışında bulunabilir. Tansiyon, hemoglobin seviyesi ve genel sağlık anamnezi doktorlarımız tarafından taranır."
      }
    ],
    quiz: [
      {
        question: "1 Ünite tam kan bağışı işlendiğinde kaç kişinin hayatını kurtarabilir?",
        options: [
          "Sadece 1 kişi",
          "En fazla 2 kişi",
          "Tam 3 kişi",
          "5 kişi"
        ],
        correctIndex: 2
      }
    ]
  }
];

export const allBadges: Badge[] = [
  {
    id: "b1",
    title: "İlk Adım",
    description: "Kızılay Gönüllüsü olarak kaydını başarıyla tamamladın.",
    icon: "Award",
    color: "text-slate-600 bg-slate-100 border-slate-200"
  },
  {
    id: "b2",
    title: "Kahraman Adayı",
    description: "En az 1 aktif saha görevini tamamladın.",
    icon: "ShieldAlert",
    color: "text-amber-600 bg-amber-50 border-amber-200"
  },
  {
    id: "b3",
    title: "Hayat Kurtarıcı",
    description: "Tüm ilk yardım eğitimlerini başarıyla bitirdin.",
    icon: "HeartHandshake",
    color: "text-red-600 bg-red-50 border-red-200"
  },
  {
    id: "b4",
    title: "İyilik Mimarı",
    description: "Saha görevlerinde 10 saati geride bıraktın.",
    icon: "Sparkles",
    color: "text-purple-600 bg-purple-50 border-purple-200"
  },
  {
    id: "b5",
    title: "Afet Gönüllüsü",
    description: "Temel Afet Bilinci eğitimini tamamlayıp sertifika aldın.",
    icon: "FlameKindling",
    color: "text-orange-600 bg-orange-50 border-orange-200"
  }
];

export const initialSocialPosts: SocialPost[] = [
  {
    id: "p1",
    author: {
      name: "Zeynep Yılmaz",
      level: 4,
      avatarColor: "bg-red-500"
    },
    content: "Bugün İzmir Alsancak Meydanı'ndaki Kan Bağışı kampanyasında muazzam bir ilgi vardı! 150 vatandaşı form doldurma ve bağış süreçlerinde yönlendirerek harika bir gün geçirdik. İyilik paylaştıkça çoğalır ❤️🩸",
    imageUrl: "https://images.unsplash.com/photo-1579156492013-662f9407331a?auto=format&fit=crop&w=600&q=80",
    date: "2 Saat Önce",
    likes: 42,
    liked: false,
    comments: [
      {
        id: "c1",
        author: "Ahmet Kurt",
        content: "Muazzam emekleriniz için teşekkür ederiz Zeynep Hanım!",
        date: "1 Saat Önce"
      }
    ]
  },
  {
    id: "p2",
    author: {
      name: "Murat Demir",
      level: 12,
      avatarColor: "bg-blue-600"
    },
    content: "Ankara Genç Kızılay ekibi ile birlikte Doğa Kampı liderlik brifingimizi aldık. Çok yakında yüzlerce gencimizle doğayı, yardımlaşmayı ve kıymetli afet önleme bilgilerini konuşacağız. Hazırız! 🌲 शिविर",
    imageUrl: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=600&q=80",
    date: "1 Gün Önce",
    likes: 85,
    liked: true,
    comments: [
      {
        id: "c2",
        author: "Selin Şahin",
        content: "Ben de o kampta olacağım sabırsızlıkla bekliyorum!",
        date: "18 Saat Önce"
      }
    ]
  }
];

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  district: string;
  bloodType: string;
  occupation: string;
  interests: string[];
  skills: string[];
  level: number;
  xp: number;
  completedHours: number;
  badges: string[]; // Badge IDs
  completedTraining: string[]; // Training Module IDs
  appliedMissions: { missionId: string; status: 'pending' | 'approved' | 'completed' }[];
  notifications: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
  qrCode: string; // generated static visual reference
  role?: 'personal' | 'corporate'; // account flow switch: personal volunteer vs corporate head (president)
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  city: string;
  district: string;
  category: 'Afet' | 'Kan Bağışı' | 'Eğitim' | 'Sosyal Hizmet' | 'Çevre' | 'Teknoloji';
  date: string;
  duration: string;
  volunteerCount: number;
  maxVolunteers: number;
  xpValue: number;
  colorClass: string;
  isUrgent: boolean;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  slides: { title: string; text: string }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  xpReward: number;
  certificateName: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon string
  color: string;
}

export interface SocialPost {
  id: string;
  author: {
    name: string;
    level: number;
    avatarColor: string;
  };
  content: string;
  imageUrl?: string;
  date: string;
  likes: number;
  liked: boolean;
  comments: {
    id: string;
    author: string;
    content: string;
    date: string;
  }[];
}

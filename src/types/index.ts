export interface BirthDetails {
  name: string;
  email?: string;
  gender: string;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  country: string;
  city: string;
  latitude?: number;
  longitude?: number;
  language: 'english' | 'hindi';
  focusArea?: string;
}

export interface NakshatraDetails {
  nkName: string;
  zodiacSign: string;
  rulingPlanet: string;
  associatedDeity: string;
  description: string;
  strengths: string;
  weaknesses: string;
}

export interface ElementRatio {
  name: 'Fire' | 'Earth' | 'Air' | 'Water' | 'Ether';
  percentage: number;
  description: string;
}

export interface KarmaProfile {
  goodPercentage: number;
  pendingLessons: string[];
  karmicDebtPlanet: string;
  storedKarmasDescription: string;
}

export interface ChakraDetails {
  name: 'Muladhara' | 'Svadhishthana' | 'Manipura' | 'Anahata' | 'Vishuddha' | 'Ajna' | 'Sahasrara';
  sanskritName: string;
  percentage: number;
  status: 'Balanced' | 'Imbalanced' | 'Underactive' | 'Hyperactive';
  description: string;
  remedy: string;
}

export interface DoshaRatio {
  name: 'Vata' | 'Pitta' | 'Kapha';
  percentage: number;
  description: string;
  symptoms: string[];
}

export interface PlanetPosition {
  name: string;
  sanskritName: string;
  sign: string;
  degree: string;
  house: number;
  nakshatra: string;
  isBenefic: boolean;
  status: 'Yogakaraka' | 'Benefic' | 'Malefic' | 'Neutral';
  description: string;
  remediation: string;
}

export interface DashaPeriod {
  levelName: 'Maha Dasha' | 'Antar Dasha' | 'Pratyantar Dasha' | 'Sookshma Dasha' | 'Prana Dasha';
  planetName: string;
  startDate: string;
  endDate: string;
}

export interface DailyPrediction {
  category: 'Career' | 'Wealth' | 'Health' | 'Relationships' | 'Spirituality';
  score: number;
  text: string;
  remedy: string;
}

export interface KundliReportData {
  [key: string]: any; // Allow dynamic API response keys
  birthDetails: BirthDetails;
  birthStar: NakshatraDetails;
  personality: {
    coreTraits: string[];
    description: string;
    bigThree: {
      sun: { sign: string; description: string };
      moon: { sign: string; description: string };
      ascendant: { sign: string; description: string };
    };
  };
  elementAnalysis: {
    ratios: ElementRatio[];
    dominant: string;
    description: string;
  };
  storedKarma: KarmaProfile;
  chakraAnalysis: {
    chakras: ChakraDetails[];
    dominantChakra: ChakraDetails;
    description: string;
  };
  doshaAnalysis: {
    doshas: DoshaRatio[];
    dominantDosha: string;
    balanceRemedy: string;
  };
  planetaryStrengths: {
    planets: Record<string, PlanetPosition>;
    yogakaraka: string[];
    benefics: string[];
    malefics: string[];
  };
  spiritualProfile?: {
    ishtaDevata?: {
      name: string;
      deities: Array<{ name: string; avatarUrl: string; emoji: string }>;
      description: string;
    };
    atmakaraka?: {
      planetName: string;
      description: string;
      soulDesireText: string;
    };
  };
  atmakaraka?: {
    planetName: string;
    description: string;
    soulDesireText: string;
  };
  dashaTimeline: DashaPeriod[];
  predictions: DailyPrediction[];
}

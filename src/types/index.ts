export type AQISeverity = 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';

export interface DiurnalHourData {
  hour: number;
  timeLabel: string;
  aqi: number;
  pm25: number; // in µg/m³
  pm10: number; // in µg/m³
  inversionHeight: number; // in meters (lower means trapped smog)
  safetyLevel: 'safe' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';
  recommendation: string;
}

export interface LocationCity {
  id: string;
  name: string;
  country: string;
  neighborhood: string;
  aqi: number;
  severity: AQISeverity;
  pm25: number;
  pm10: number;
  no2: number;
  co: number;
  so2: number;
  o3: number;
  temperatureC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  inversionCeilingMeters: number;
  primaryPollutant: string;
  weatherSummary: string;
  historicalComparison: string;
  diurnalCurve: DiurnalHourData[];
}

export interface HouseholdProfile {
  name: string;
  members: {
    adults: number;
    infants: number; // < 3 years
    children: number; // 3-12 years
    seniors: number; // 65+
    asthmaticsOrSensitive: number;
    pets: number;
  };
  homeType: 'high-rise-apartment' | 'low-rise-apartment' | 'independent-house' | 'older-brick-building';
  sealingQuality: 'drafty-leaky' | 'standard' | 'weather-stripped' | 'hermetic-triple-glazed';
  roomCount: number;
  floorLevel: number;
  cookingFuel: 'lpg-cylinder' | 'piped-natural-gas' | 'electric-induction' | 'biomass-wood';
  heatingSystem: 'inverter-heat-pump' | 'electric-space-heater' | 'gas-flued-heater' | 'wood-fireplace-stove';
  hasKitchenChimneyExhaust: boolean;
  commuteMode: 'public-metro-electric-bus' | 'private-ice-car' | 'electric-vehicle' | 'two-wheeler-bike' | 'walking-cycling';
  commuteRoundtripMinutes: number;
  defenses: {
    hepaPurifiersCount: number;
    hasCorsiRosenthalBox: boolean;
    indoorPlantsCount: number;
    hasContinuousAQIMonitor: boolean;
    n95MasksAvailable: boolean;
  };
}

export interface HomeTwinRoomState {
  roomName: string;
  pm25: number;
  no2: number;
  status: 'safe' | 'moderate' | 'unhealthy' | 'hazardous';
  factors: string[];
}

export interface HomeTwinState {
  kitchen: {
    cookingActive: boolean;
    fuel: 'gas' | 'induction';
    exhaustOn: boolean;
    pm25: number;
    no2: number;
  };
  livingRoom: {
    windowsState: 'sealed' | 'cracked' | 'wide-open';
    purifierMode: 'off' | 'quiet' | 'boost' | 'turbo';
    cleaningMethod: 'damp-microfiber' | 'dry-broom-vacuum';
    pm25: number;
    no2: number;
  };
  bedroom: {
    doorClosed: boolean;
    purifierMode: 'off' | 'quiet' | 'boost' | 'turbo';
    bedtimeSeal: boolean;
    pm25: number;
    no2: number;
  };
  balcony: {
    outdoorAmbientPm25: number;
    doorSealed: boolean;
  };
}

export interface DirectImpactMetrics {
  equivalentCigarettesAvoidedDay: number;
  pm25DoseReductionPercent: number;
  co2SavedKgMonth: number;
  pm25EmissionsPreventedGramsDay: number;
  energyCostSavedUsdMonth: number;
  lungDepositionIndexScore: number; // 0-100 where lower means cleaner lungs
  inversionSafetyWindowHours: string;
}

export interface DailyRoutineItem {
  id: string;
  timeRange: string;
  phase: 'Early Morning' | 'Morning Peak' | 'Midday Sun' | 'Evening Commute' | 'Night Haven';
  title: string;
  category: 'commute' | 'ventilation' | 'indoor-care' | 'physical-health' | 'community-action';
  action: string;
  smogContext: string;
  directEmissionImpact: string;
  directHealthImpact: string;
  severity: 'hazardous' | 'unhealthy' | 'moderate' | 'safe';
  completed?: boolean;
}

export interface IAQHack {
  id: string;
  title: string;
  category: 'diy-filtration' | 'ventilation-timing' | 'kitchen-source' | 'wet-cleaning' | 'plants-truth' | 'mask-seals';
  difficulty: 'Quick & Free' | 'DIY (30 mins)' | 'Hardware Setup';
  costLevel: 'Zero Cost' | '$ Under $25' | '$$ Around $60';
  pm25ReductionPercent: number;
  summary: string;
  stepByStep: string[];
  scientificMechanism: string;
  impactVerdict: string;
  iconName: string;
}

export interface SustainableAlternative {
  id: string;
  domain: 'Mobility' | 'Cooking' | 'Heating' | 'Air Cleaning' | 'Neighborhood';
  conventionalChoice: string;
  sustainableChoice: string;
  emissionsCutPercent: number;
  costDeltaMonthly: string;
  healthBonus: string;
  impactExplanation: string;
  roiTimeline: string;
  immediateAction: string;
}

export interface CommunityInitiative {
  id: string;
  title: string;
  targetNeighborhood: string;
  collectiveSmogAbatedKg: number;
  activePledgers: number;
  badge: string;
  category: 'School Anti-Idling' | 'Clean Air Corridor' | 'Bulk MERV13 Buy' | 'Smog Watch';
  description: string;
  userPledged: boolean;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestions?: string[];
  metricsHighlight?: {
    label: string;
    value: string;
    trend: 'positive' | 'warning' | 'alert';
  };
}

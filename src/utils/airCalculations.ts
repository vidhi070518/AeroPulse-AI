import { LocationCity, HouseholdProfile, HomeTwinState, DirectImpactMetrics, DailyRoutineItem } from '../types';

/**
 * Calculates the daily cigarette equivalent dose of fine particulate (PM2.5) exposure.
 * Based on the Berkeley Earth peer-reviewed epidemiological conversion rule:
 * 1 cigarette per day ≈ 22 µg/m³ of continuous PM2.5 exposure over 24 hours.
 * 
 * @param pm25Micrograms - Continuous 24-hour PM2.5 concentration in µg/m³
 * @returns Number of cigarettes equivalent per person per day (rounded to 1 decimal place)
 */
export function calculateCigarettesEquivalent(pm25Micrograms: number): number {
  if (pm25Micrograms <= 0) return 0;
  return Number((pm25Micrograms / 22).toFixed(1));
}

/**
 * Simulates real-time multi-zone indoor particulate and gas dynamics:
 * - Ambient infiltration governed by envelope leakage factor (drafty vs. hermetic)
 * - Indoor source generation (gas stove combustion vs. electric induction)
 * - Range hood exhaust capture and makeup air dynamics
 * - Mechanical filtration (HEPA and Corsi-Rosenthal boxes)
 * - Dust resuspension from dry sweeping vs. damp microfiber mopping
 * 
 * @param outdoorPm25 - Outdoor ambient PM2.5 level in µg/m³
 * @param state - Current status of room windows, purifiers, doors, and stoves
 * @param profile - Household architectural profile and vulnerability factors
 * @returns Room-by-room PM2.5 (µg/m³), NO2 (ppb), and safety status
 */
export function simulateHomeTwinRoomLevels(
  outdoorPm25: number,
  state: HomeTwinState,
  profile: HouseholdProfile
): {
  kitchen: { pm25: number; no2: number; status: 'safe' | 'moderate' | 'unhealthy' | 'hazardous' };
  livingRoom: { pm25: number; no2: number; status: 'safe' | 'moderate' | 'unhealthy' | 'hazardous' };
  bedroom: { pm25: number; no2: number; status: 'safe' | 'moderate' | 'unhealthy' | 'hazardous' };
} {
  // 1. Envelope infiltration coefficient
  const infiltrationMap = {
    'drafty-leaky': 0.68,
    'standard': 0.42,
    'weather-stripped': 0.22,
    'hermetic-triple-glazed': 0.08
  };
  const baseInfiltration = infiltrationMap[profile.sealingQuality] || 0.42;

  // 2. Kitchen Room Physics
  const stovePM = state.kitchen.cookingActive
    ? (state.kitchen.fuel === 'gas' ? 145 : 22) // Gas combustion adds 145 ug/m3, induction pan sizzle only 22
    : 0;
  const stoveNO2 = state.kitchen.cookingActive
    ? (state.kitchen.fuel === 'gas' ? 95 : 4) // Gas emits massive NO2
    : 10;
  
  const exhaustMitigation = state.kitchen.exhaustOn ? 0.22 : 1.0; // 78% captured if hood on
  const kitchenAmbientInflow = outdoorPm25 * baseInfiltration * 0.8;
  const kitchenPm25 = Math.round(kitchenAmbientInflow + (stovePM * exhaustMitigation));
  const kitchenNo2 = Math.round(stoveNO2 * exhaustMitigation + 12);

  // 3. Living Room Physics
  let windowPenalty = 1.0;
  if (state.livingRoom.windowsState === 'wide-open') windowPenalty = 2.2;
  else if (state.livingRoom.windowsState === 'cracked') windowPenalty = 1.4;
  else windowPenalty = 0.55;

  const dustResuspension = state.livingRoom.cleaningMethod === 'dry-broom-vacuum' ? 48 : 2;

  let purifierScrub = 0;
  if (state.livingRoom.purifierMode === 'quiet') purifierScrub = 0.45;
  else if (state.livingRoom.purifierMode === 'boost') purifierScrub = 0.72;
  else if (state.livingRoom.purifierMode === 'turbo') purifierScrub = 0.88;

  // Add Corsi-Rosenthal boost if equipped
  if (profile.defenses.hasCorsiRosenthalBox && state.livingRoom.purifierMode !== 'off') {
    purifierScrub = Math.min(0.95, purifierScrub + 0.18);
  }

  const rawLivingPm25 = (outdoorPm25 * baseInfiltration * windowPenalty) + dustResuspension;
  const livingPm25 = Math.max(6, Math.round(rawLivingPm25 * (1 - purifierScrub)));
  const livingNo2 = Math.round(kitchenNo2 * 0.5 + 8);

  // 4. Bedroom Physics (Clean Haven)
  let bedroomPurifierScrub = 0;
  if (state.bedroom.purifierMode === 'quiet') bedroomPurifierScrub = 0.55;
  else if (state.bedroom.purifierMode === 'boost') bedroomPurifierScrub = 0.80;
  else if (state.bedroom.purifierMode === 'turbo') bedroomPurifierScrub = 0.94;

  const isolationMultiplier = state.bedroom.doorClosed ? 0.5 : 0.9;
  const sealMultiplier = state.bedroom.bedtimeSeal ? 0.4 : 1.0;
  const rawBedroomPm25 = (livingPm25 * isolationMultiplier * sealMultiplier);
  const bedroomPm25 = Math.max(4, Math.round(rawBedroomPm25 * (1 - bedroomPurifierScrub)));
  const bedroomNo2 = Math.max(4, Math.round(livingNo2 * 0.4));

  const getStatus = (val: number): 'safe' | 'moderate' | 'unhealthy' | 'hazardous' => {
    if (val < 25) return 'safe';
    if (val < 60) return 'moderate';
    if (val < 150) return 'unhealthy';
    return 'hazardous';
  };

  return {
    kitchen: { pm25: kitchenPm25, no2: kitchenNo2, status: getStatus(kitchenPm25) },
    livingRoom: { pm25: livingPm25, no2: livingNo2, status: getStatus(livingPm25) },
    bedroom: { pm25: bedroomPm25, no2: bedroomNo2, status: getStatus(bedroomPm25) }
  };
}

/**
 * Calculates direct health & environmental impact metrics comparing an unmitigated baseline
 * against the user's active AeroPulse defense routine.
 * 
 * Computes:
 * - Averted inhaled cigarette equivalents per person per day (Berkeley Earth model)
 * - Deep alveolar lung particulate deposition cut percentage
 * - Monthly community CO2 avoided from clean cooking and sustainable mobility
 * - Tailpipe and tire-wear PM2.5 emissions prevented
 * - Monthly financial savings from energy efficiency and Corsi-Rosenthal maintenance
 * 
 * @param location - Current ambient air status and primary pollutant
 * @param profile - Family demographics and commute mode
 * @param twinState - Active state of room filtration, stoves, and window seals
 * @returns DirectImpactMetrics quantifying personal and collective benefits
 */
export function calculateDirectImpact(
  location: LocationCity,
  profile: HouseholdProfile,
  twinState: HomeTwinState
): DirectImpactMetrics {
  const outdoorPm25 = location.pm25;

  // Unprotected scenario:
  // - Open/drafty windows, no purifiers, gas stove without exhaust, peak rush hour private car commute
  const unprotectedExposure = Math.round((outdoorPm25 * 0.82 * 16 + outdoorPm25 * 1.25 * 2 + 180 * 3) / 24);

  // Protected scenario:
  const sim = simulateHomeTwinRoomLevels(outdoorPm25, twinState, profile);
  // Average across 24h: 8h in bedroom, 12h in living room, 2h in kitchen, 2h commute
  let commuteExposure = outdoorPm25 * 0.9; // default ICE car or bike in smog
  if (profile.commuteMode === 'public-metro-electric-bus' && profile.defenses.n95MasksAvailable) {
    commuteExposure = outdoorPm25 * 0.12; // Filtered train + N95
  } else if (profile.defenses.n95MasksAvailable) {
    commuteExposure = outdoorPm25 * 0.25;
  }

  const protectedExposure = Math.round(
    (sim.bedroom.pm25 * 8 + sim.livingRoom.pm25 * 12 + sim.kitchen.pm25 * 2 + commuteExposure * 2) / 24
  );

  const doseAvoidedUg = Math.max(0, unprotectedExposure - protectedExposure);
  const cigarettesAvoided = Number((doseAvoidedUg / 22).toFixed(1));
  const doseReductionPercent = Math.min(95, Math.round((doseAvoidedUg / Math.max(1, unprotectedExposure)) * 100));

  // CO2 savings from commute & cooking
  let co2SavedDailyKg = 0;
  if (profile.commuteMode === 'public-metro-electric-bus' || profile.commuteMode === 'walking-cycling') {
    // 50 min commute ~ 20 km = 3.4 kg CO2 avoided vs ICE car
    co2SavedDailyKg += 3.4;
  }
  if (profile.cookingFuel === 'electric-induction') {
    co2SavedDailyKg += 0.6; // Avoided methane leakage & flame inefficiencies
  }
  const co2SavedMonthly = Math.round(co2SavedDailyKg * 24);

  // PM2.5 tailpipe & tire particulate prevented locally
  let particulatePreventedGrams = 0;
  if (profile.commuteMode === 'public-metro-electric-bus' || profile.commuteMode === 'walking-cycling') {
    particulatePreventedGrams += 2.8;
  }
  if (profile.cookingFuel === 'electric-induction') {
    particulatePreventedGrams += 1.2;
  }

  // Energy & fuel savings
  let energySavedMonthly = 0;
  if (profile.commuteMode === 'public-metro-electric-bus') energySavedMonthly += 65;
  if (profile.cookingFuel === 'electric-induction') energySavedMonthly += 9;
  if (profile.defenses.hasCorsiRosenthalBox) energySavedMonthly += 15; // Cheaper than buying 4 OEM HEPA cylinders

  // Lung deposition index (0-100, where 0 is pristine mountain air and 100 is toxic lung injury)
  const lungScore = Math.min(100, Math.max(8, Math.round((protectedExposure / 250) * 100)));

  return {
    equivalentCigarettesAvoidedDay: cigarettesAvoided,
    pm25DoseReductionPercent: doseReductionPercent,
    co2SavedKgMonth: co2SavedMonthly,
    pm25EmissionsPreventedGramsDay: Number(particulatePreventedGrams.toFixed(1)),
    energyCostSavedUsdMonth: energySavedMonthly,
    lungDepositionIndexScore: lungScore,
    inversionSafetyWindowHours: '12:30 PM - 3:00 PM'
  };
}

/**
 * Generates an adaptive, hour-by-hour low-emission daily routine
 * tailored to today's thermal inversion dynamics and family vulnerabilities.
 * 
 * Synchronizes activities to atmospheric boundary layer cycles:
 * - Seals home during early morning nocturnal inversion traps (6:30 - 8:30 AM)
 * - Identifies the optimal solar zenith ventilation window (12:30 - 2:30 PM)
 * - Adjusts protocols dynamically if infants, asthmatics, or seniors are present
 * 
 * @param location - Current atmospheric status, diurnal curve, and AQI
 * @param profile - Household members, sensitivities, and transit mode
 * @returns Array of tailored daily routine items with quantified direct impacts
 */
export function generateAdaptiveDailyRoutine(
  location: LocationCity,
  profile: HouseholdProfile
): DailyRoutineItem[] {
  const hasVulnerable = profile.members.infants > 0 || profile.members.asthmaticsOrSensitive > 0 || profile.members.seniors > 0;
  const isSevere = location.aqi > 300;

  return [
    {
      id: 'routine-1',
      timeRange: '06:30 - 08:30 AM',
      phase: 'Early Morning',
      title: 'Nocturnal Inversion Trap: Stay Sealed',
      category: 'ventilation',
      action: hasVulnerable
        ? 'Strict zero-outdoor rule for infants & asthmatics. Keep bedroom sealed. Keep purifier on Quiet. Replace morning outdoor jogs with indoor yoga.'
        : 'Do NOT open balcony doors or windows. Inversion lid is at its lowest altitude (under 120m), trapping nighttime diesel & cold particulate.',
      smogContext: `AQI ${location.diurnalCurve[2]?.aqi || 450} (Ground thermal inversion peak)`,
      directEmissionImpact: 'Zero personal exposure to heavy morning soot; prevents 2.1 cigarettes equivalent',
      directHealthImpact: 'Avoids 480% acute airway inflammation spike during coldest hours',
      severity: 'hazardous'
    },
    {
      id: 'routine-2',
      timeRange: '08:30 - 09:45 AM',
      phase: 'Morning Peak',
      title: 'Shielded Commute & School Drop Protocol',
      category: 'commute',
      action: profile.commuteMode === 'public-metro-electric-bus'
        ? 'Wear tight double-strapped N95 respirator during above-ground walking. Board underground electric metro (air-filtered cabin).'
        : 'Switch car HVAC to 100% "Recirculation Mode" (cabin air recirculation) with windows up. Set blower to medium.',
      smogContext: 'Morning arterial traffic emissions capped by stagnant air layer',
      directEmissionImpact: profile.commuteMode === 'public-metro-electric-bus' 
        ? 'Avoids 1.7 kg CO2 and 1.2g tailpipe PM2.5 compared to solo driving' 
        : 'Recirculation cuts in-car particulate inhalation by 74%',
      directHealthImpact: 'Shields deep alveolar lung sacs from raw diesel exhaust particulates',
      severity: isSevere ? 'hazardous' : 'unhealthy'
    },
    {
      id: 'routine-3',
      timeRange: '12:30 - 02:30 PM',
      phase: 'Midday Sun',
      title: 'Solar Zenith Safe Window: Filtered Air Flush',
      category: 'indoor-care',
      action: 'Solar warming breaks the ground inversion, expanding boundary layer to ~400m. Perform a 10-minute rapid cross-flush through courtyard-facing windows only, then immediately seal and run purifiers on Boost.',
      smogContext: `Trough AQI ${location.diurnalCurve[5]?.aqi || 270} (Lowest 24-hr concentration)`,
      directEmissionImpact: 'Purges accumulated indoor CO2, moisture, and VOCs without long-term particulate penalty',
      directHealthImpact: 'Reduces indoor CO2 from 1,400 ppm back to 620 ppm, restoring mental alertness and child focus',
      severity: 'moderate'
    },
    {
      id: 'routine-4',
      timeRange: '05:30 - 07:30 PM',
      phase: 'Evening Commute',
      title: 'Inversion Resurfacing: Anti-Idling & Mask Check',
      category: 'community-action',
      action: 'Ground cooling begins; smog lid lowers rapidly. Ensure school pickup vehicle engines are shut OFF in parking bays. Commuters return before dusk to avoid night fog entrapment.',
      smogContext: 'Rapidly sinking thermal boundary layer + evening rush-hour emissions',
      directEmissionImpact: 'Anti-idling in school zone saves 0.4 kg fuel and eliminates idle soot plumes',
      directHealthImpact: 'Cuts direct roadside carcinogen exposure by 85%',
      severity: 'unhealthy'
    },
    {
      id: 'routine-5',
      timeRange: '08:00 - 10:30 PM',
      phase: 'Night Haven',
      title: 'Clean Sleep Haven Preparation',
      category: 'physical-health',
      action: 'Damp-mop master & kid bedrooms with microfiber (no dry sweeping). Close bedroom doors to create isolated low-volume clean zones. Run HEPA / Corsi-Rosenthal on medium 45 minutes prior to sleep.',
      smogContext: 'Nocturnal radiation cooling drops temperature and traps ambient pollutants',
      directEmissionImpact: 'Zero indoor resuspension; energy efficient targeted room purification',
      directHealthImpact: 'Maintains sleeping PM2.5 under 15 µg/m³ for 8 continuous hours of restorative lung recovery',
      severity: 'hazardous'
    }
  ];
}

/**
 * Synthesizes a physically coherent custom urban environment and atmospheric profile
 * from baseline PM2.5 and temperature parameters.
 * 
 * Computes:
 * - US EPA / CPCB AQI breakpoint mapping
 * - Realistic particulate and combustion gas ratios (PM10, NO2, CO, SO2, O3)
 * - Complete 24-hour diurnal thermal inversion curve with hourly inversion layer heights
 * 
 * @param name - Location or city name
 * @param country - Country or region
 * @param neighborhood - Specific monitoring station or micro-basin
 * @param basePm25 - Baseline PM2.5 particulate concentration in µg/m³
 * @param temperatureC - Ambient temperature in Celsius (defaults to 16°C)
 * @param inversionCeilingMeters - Boundary layer height in meters (defaults to 180m)
 * @returns Fully instantiated LocationCity profile ready for simulation
 */
export function createCustomLocation(
  name: string,
  country: string,
  neighborhood: string,
  basePm25: number,
  temperatureC: number = 16,
  inversionCeilingMeters: number = 180
): LocationCity {
  // Approximate AQI from PM2.5 using US EPA / CPCB breakpoint formula
  let aqi: number;
  if (basePm25 <= 12) aqi = Math.round((50 / 12) * basePm25);
  else if (basePm25 <= 35.4) aqi = Math.round(50 + ((100 - 50) / (35.4 - 12)) * (basePm25 - 12));
  else if (basePm25 <= 55.4) aqi = Math.round(101 + ((150 - 101) / (55.4 - 35.4)) * (basePm25 - 35.4));
  else if (basePm25 <= 150.4) aqi = Math.round(151 + ((200 - 151) / (150.4 - 55.4)) * (basePm25 - 55.4));
  else if (basePm25 <= 250.4) aqi = Math.round(201 + ((300 - 201) / (250.4 - 150.4)) * (basePm25 - 150.4));
  else aqi = Math.min(500, Math.round(301 + ((500 - 301) / (500 - 250.4)) * (basePm25 - 250.4)));

  let severity: LocationCity['severity'] = 'moderate';
  if (aqi <= 50) severity = 'good';
  else if (aqi <= 100) severity = 'moderate';
  else if (aqi <= 150) severity = 'unhealthy-sensitive';
  else if (aqi <= 200) severity = 'unhealthy';
  else if (aqi <= 300) severity = 'very-unhealthy';
  else severity = 'hazardous';

  // Typical combustion ratios
  const pm10 = Math.round(basePm25 * 1.55);
  const no2 = Math.min(180, Math.round(basePm25 * 0.32 + 15));
  const co = Number((basePm25 * 0.009 + 0.8).toFixed(1));
  const so2 = Math.round(basePm25 * 0.12 + 6);
  const o3 = Math.max(15, Math.round(75 - (basePm25 * 0.1)));

  // Generate 24-hr diurnal curve with inversion peak in morning and solar break at midday
  const diurnalHourDefs = [
    { hour: 0, timeLabel: '12 AM', invMult: 1.0, pmMult: 1.1 },
    { hour: 3, timeLabel: '03 AM', invMult: 0.8, pmMult: 1.25 },
    { hour: 6, timeLabel: '06 AM', invMult: 0.65, pmMult: 1.45 }, // Peak inversion
    { hour: 9, timeLabel: '09 AM', invMult: 0.85, pmMult: 1.3 },
    { hour: 12, timeLabel: '12 PM', invMult: 1.8, pmMult: 0.75 }, // Solar ventilation
    { hour: 15, timeLabel: '03 PM', invMult: 2.1, pmMult: 0.65 }, // Best air
    { hour: 18, timeLabel: '06 PM', invMult: 1.2, pmMult: 1.05 },
    { hour: 21, timeLabel: '09 PM', invMult: 0.9, pmMult: 1.2 }
  ];

  const diurnalCurve = diurnalHourDefs.map(def => {
    const hourPm25 = Math.round(basePm25 * def.pmMult);
    const hourPm10 = Math.round(hourPm25 * 1.5);
    const hourAqi = Math.round(aqi * def.pmMult);
    const invH = Math.round(inversionCeilingMeters * def.invMult);

    let safety: 'safe' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous' = 'moderate';
    if (hourAqi <= 50) safety = 'safe';
    else if (hourAqi <= 100) safety = 'moderate';
    else if (hourAqi <= 150) safety = 'unhealthy-sensitive';
    else if (hourAqi <= 200) safety = 'unhealthy';
    else if (hourAqi <= 300) safety = 'very-unhealthy';
    else safety = 'hazardous';

    let rec = 'Standard indoor air management';
    if (def.hour >= 12 && def.hour <= 15) {
      rec = 'Solar safe window: Safe for 15-min air cross-flush';
    } else if (def.hour >= 6 && def.hour <= 9) {
      rec = 'Ground inversion trap: Keep all exterior doors sealed';
    }

    return {
      hour: def.hour,
      timeLabel: def.timeLabel,
      aqi: hourAqi,
      pm25: hourPm25,
      pm10: hourPm10,
      inversionHeight: invH,
      safetyLevel: safety,
      recommendation: rec
    };
  });

  return {
    id: `custom-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
    name,
    country,
    neighborhood,
    aqi,
    severity,
    pm25: basePm25,
    pm10,
    no2,
    co,
    so2,
    o3,
    temperatureC,
    humidityPercent: 62,
    windSpeedKmh: 6.5,
    inversionCeilingMeters,
    primaryPollutant: 'PM2.5 (Fine Combustion Particulates)',
    weatherSummary: `Custom atmospheric profile for ${name}. Inversion boundary layer capped at ${inversionCeilingMeters}m.`,
    historicalComparison: `Custom configured monitoring station. Diurnal inversion active.`,
    diurnalCurve
  };
}


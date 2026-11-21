import { LocationCity, HouseholdProfile, IAQHack, SustainableAlternative, CommunityInitiative } from '../types';

export const LOCATION_PRESETS: LocationCity[] = [
  {
    id: 'delhi-anand-vihar',
    name: 'Delhi NCR',
    country: 'India',
    neighborhood: 'Anand Vihar / East Delhi',
    aqi: 438,
    severity: 'hazardous',
    pm25: 395,
    pm10: 512,
    no2: 88,
    co: 3.4,
    so2: 24,
    o3: 42,
    temperatureC: 14,
    humidityPercent: 86,
    windSpeedKmh: 4,
    inversionCeilingMeters: 130,
    primaryPollutant: 'PM2.5 (Severe Winter Crop Residue & Stagnant Inversion)',
    weatherSummary: 'Dense winter radiation fog with severe nocturnal temperature inversion',
    historicalComparison: '38% higher than 5-year November average due to sub-100m thermal inversion ceiling',
    diurnalCurve: [
      { hour: 0, timeLabel: '12 AM', aqi: 410, pm25: 370, pm10: 480, inversionHeight: 120, safetyLevel: 'hazardous', recommendation: 'Stay indoors; run bedroom air purifier on medium' },
      { hour: 3, timeLabel: '3 AM', aqi: 430, pm25: 388, pm10: 495, inversionHeight: 105, safetyLevel: 'hazardous', recommendation: 'Deep inversion layer trapping overnight industrial & freight emissions' },
      { hour: 6, timeLabel: '6 AM', aqi: 468, pm25: 422, pm10: 540, inversionHeight: 90, safetyLevel: 'hazardous', recommendation: 'PEAK HAZARD: Cancel morning walks/jogs completely; zero outdoor exposure' },
      { hour: 8, timeLabel: '8 AM', aqi: 455, pm25: 410, pm10: 520, inversionHeight: 110, safetyLevel: 'hazardous', recommendation: 'School/office rush hour trapped by cold ground air; wear tight N95 mask' },
      { hour: 11, timeLabel: '11 AM', aqi: 360, pm25: 320, pm10: 420, inversionHeight: 210, safetyLevel: 'hazardous', recommendation: 'Inversion layer slowly lifting under weak winter sunlight' },
      { hour: 13, timeLabel: '1 PM', aqi: 275, pm25: 235, pm10: 310, inversionHeight: 380, safetyLevel: 'unhealthy', recommendation: 'SAFE WINDOW: Best window for brief errands and strictly filtered ventilation' },
      { hour: 15, timeLabel: '3 PM', aqi: 290, pm25: 250, pm10: 330, inversionHeight: 340, safetyLevel: 'unhealthy', recommendation: 'Afternoon sun peaking; finish outdoor transit before 4:30 PM' },
      { hour: 18, timeLabel: '6 PM', aqi: 395, pm25: 360, pm10: 470, inversionHeight: 160, safetyLevel: 'hazardous', recommendation: 'Inversion clamping back down; evening traffic soot trapped near surface' },
      { hour: 21, timeLabel: '9 PM', aqi: 442, pm25: 400, pm10: 515, inversionHeight: 115, safetyLevel: 'hazardous', recommendation: 'Seal doors and windows; activate sleep clean-zone in bedroom' }
    ]
  },
  {
    id: 'lahore-gulberg',
    name: 'Lahore',
    country: 'Pakistan',
    neighborhood: 'Gulberg / Canal Road',
    aqi: 462,
    severity: 'hazardous',
    pm25: 425,
    pm10: 560,
    no2: 92,
    co: 3.8,
    so2: 31,
    o3: 39,
    temperatureC: 15,
    humidityPercent: 82,
    windSpeedKmh: 3,
    inversionCeilingMeters: 110,
    primaryPollutant: 'PM2.5 (Brick Kilns, Stubble Smoke & Stagnant Basin)',
    weatherSummary: 'Persistent hazardous winter haze with stagnant atmospheric basin effect',
    historicalComparison: 'Ranked #1 most polluted globally today; 45x WHO safety threshold',
    diurnalCurve: [
      { hour: 0, timeLabel: '12 AM', aqi: 435, pm25: 395, pm10: 510, inversionHeight: 110, safetyLevel: 'hazardous', recommendation: 'Run DIY/HEPA purifiers; keep bedroom door closed' },
      { hour: 6, timeLabel: '6 AM', aqi: 480, pm25: 445, pm10: 580, inversionHeight: 85, safetyLevel: 'hazardous', recommendation: 'Extreme hazard: children and asthmatics must strictly remain indoors' },
      { hour: 13, timeLabel: '1 PM', aqi: 310, pm25: 280, pm10: 360, inversionHeight: 320, safetyLevel: 'hazardous', recommendation: 'Relative trough; minimal outdoor transit only with sealed N95' },
      { hour: 19, timeLabel: '7 PM', aqi: 445, pm25: 410, pm10: 530, inversionHeight: 130, safetyLevel: 'hazardous', recommendation: 'Cold air pooling; cook with exhaust fans on and windows shut' }
    ]
  },
  {
    id: 'beijing-chaoyang',
    name: 'Beijing',
    country: 'China',
    neighborhood: 'Chaoyang District',
    aqi: 215,
    severity: 'very-unhealthy',
    pm25: 165,
    pm10: 220,
    no2: 65,
    co: 1.8,
    so2: 12,
    o3: 35,
    temperatureC: -2,
    humidityPercent: 48,
    windSpeedKmh: 8,
    inversionCeilingMeters: 220,
    primaryPollutant: 'PM2.5 (District Heating Coal Inversion)',
    weatherSummary: 'Sub-zero winter anticyclone with northern basin trapped particulates',
    historicalComparison: 'Orange air pollution alert issued; industrial output curtailed',
    diurnalCurve: [
      { hour: 0, timeLabel: '12 AM', aqi: 195, pm25: 145, pm10: 190, inversionHeight: 200, safetyLevel: 'unhealthy', recommendation: 'Purifier in auto mode' },
      { hour: 7, timeLabel: '7 AM', aqi: 240, pm25: 190, pm10: 260, inversionHeight: 150, safetyLevel: 'very-unhealthy', recommendation: 'Morning commuter mask protocol' },
      { hour: 14, timeLabel: '2 PM', aqi: 175, pm25: 125, pm10: 165, inversionHeight: 450, safetyLevel: 'unhealthy', recommendation: 'Solar heating lifting northern basin fog' },
      { hour: 20, timeLabel: '8 PM', aqi: 225, pm25: 175, pm10: 240, inversionHeight: 180, safetyLevel: 'very-unhealthy', recommendation: 'Heating plants throttling up for cold night' }
    ]
  },
  {
    id: 'salt-lake-city',
    name: 'Salt Lake City',
    country: 'United States',
    neighborhood: 'Sugar House / Salt Lake Basin',
    aqi: 118,
    severity: 'unhealthy-sensitive',
    pm25: 42,
    pm10: 68,
    no2: 38,
    co: 1.1,
    so2: 4,
    o3: 28,
    temperatureC: -1,
    humidityPercent: 74,
    windSpeedKmh: 5,
    inversionCeilingMeters: 410,
    primaryPollutant: 'PM2.5 (Wasatch Mountain Cold-Pool Inversion)',
    weatherSummary: 'Classic Wasatch Front mountain basin capping inversion trapping auto emissions',
    historicalComparison: 'Day 3 of multi-day high pressure cap; expected to worsen without Pacific storm',
    diurnalCurve: [
      { hour: 0, timeLabel: '12 AM', aqi: 105, pm25: 37, pm10: 60, inversionHeight: 380, safetyLevel: 'unhealthy-sensitive', recommendation: 'Mountain air stagnation' },
      { hour: 8, timeLabel: '8 AM', aqi: 135, pm25: 49, pm10: 78, inversionHeight: 310, safetyLevel: 'unhealthy-sensitive', recommendation: 'I-15 traffic emissions trapped below 5000ft elevation' },
      { hour: 14, timeLabel: '2 PM', aqi: 95, pm25: 33, pm10: 52, inversionHeight: 520, safetyLevel: 'moderate', recommendation: 'Best window for outdoor exercise in higher benches above inversion' },
      { hour: 19, timeLabel: '7 PM', aqi: 125, pm25: 45, pm10: 72, inversionHeight: 350, safetyLevel: 'unhealthy-sensitive', recommendation: 'Inversion cap tightens as sun sets' }
    ]
  },
  {
    id: 'london-westminster',
    name: 'London',
    country: 'United Kingdom',
    neighborhood: 'Westminster / Marylebone Road',
    aqi: 68,
    severity: 'moderate',
    pm25: 21,
    pm10: 38,
    no2: 74,
    co: 0.9,
    so2: 6,
    o3: 31,
    temperatureC: 6,
    humidityPercent: 88,
    windSpeedKmh: 11,
    inversionCeilingMeters: 620,
    primaryPollutant: 'NO2 & Diesel PM2.5 (Street Canyon Stagnation)',
    weatherSummary: 'Damp winter overcast with street canyon diesel exhaust entrapment',
    historicalComparison: 'Elevated NO2 spikes along major arterial traffic routes',
    diurnalCurve: [
      { hour: 0, timeLabel: '12 AM', aqi: 45, pm25: 12, pm10: 22, inversionHeight: 650, safetyLevel: 'safe', recommendation: 'Good baseline air dispersion' },
      { hour: 8, timeLabel: '8 AM', aqi: 82, pm25: 27, pm10: 48, inversionHeight: 480, safetyLevel: 'moderate', recommendation: 'Commuter peak; take tube or quieter residential streets' },
      { hour: 13, timeLabel: '1 PM', aqi: 55, pm25: 16, pm10: 30, inversionHeight: 700, safetyLevel: 'moderate', recommendation: 'Safe walking window in parks and pedestrian corridors' },
      { hour: 18, timeLabel: '6 PM', aqi: 76, pm25: 24, pm10: 42, inversionHeight: 520, safetyLevel: 'moderate', recommendation: 'Avoid congested bus queues on main high streets' }
    ]
  },
  {
    id: 'milan-po-valley',
    name: 'Milan',
    country: 'Italy',
    neighborhood: 'Porta Nuova / Po Basin',
    aqi: 134,
    severity: 'unhealthy-sensitive',
    pm25: 48,
    pm10: 76,
    no2: 62,
    co: 1.2,
    so2: 7,
    o3: 26,
    temperatureC: 4,
    humidityPercent: 90,
    windSpeedKmh: 4,
    inversionCeilingMeters: 290,
    primaryPollutant: 'PM2.5 (Po Valley Alpine Stagnation)',
    weatherSummary: 'Alpine valley winter inversion trapping heavy industrial and residential emissions',
    historicalComparison: 'Winter fog (nebbia) with micro-droplet particulate adherence',
    diurnalCurve: [
      { hour: 0, timeLabel: '12 AM', aqi: 120, pm25: 43, pm10: 68, inversionHeight: 260, safetyLevel: 'unhealthy-sensitive', recommendation: 'Night fog traps biomass heating soot' },
      { hour: 8, timeLabel: '8 AM', aqi: 148, pm25: 54, pm10: 84, inversionHeight: 210, safetyLevel: 'unhealthy', recommendation: 'High risk for elderly & respiratory sensitive' },
      { hour: 14, timeLabel: '2 PM', aqi: 110, pm25: 39, pm10: 62, inversionHeight: 420, safetyLevel: 'unhealthy-sensitive', recommendation: 'Brief clearing window as ground warms' },
      { hour: 19, timeLabel: '7 PM', aqi: 138, pm25: 50, pm10: 79, inversionHeight: 250, safetyLevel: 'unhealthy-sensitive', recommendation: 'Avoid wood-pellet fireplace use' }
    ]
  }
];

export const DEFAULT_HOUSEHOLD: HouseholdProfile = {
  name: 'Urban Family Profile',
  members: {
    adults: 2,
    infants: 1, // 10-month-old infant
    children: 1, // 7-year-old child
    seniors: 1, // 68-year-old grandparent
    asthmaticsOrSensitive: 2, // infant and senior
    pets: 1 // family dog
  },
  homeType: 'high-rise-apartment',
  sealingQuality: 'drafty-leaky',
  roomCount: 4,
  floorLevel: 6,
  cookingFuel: 'lpg-cylinder',
  heatingSystem: 'electric-space-heater',
  hasKitchenChimneyExhaust: true,
  commuteMode: 'private-ice-car',
  commuteRoundtripMinutes: 50,
  defenses: {
    hepaPurifiersCount: 1,
    hasCorsiRosenthalBox: false,
    indoorPlantsCount: 3,
    hasContinuousAQIMonitor: true,
    n95MasksAvailable: true
  }
};

export const IAQ_HACKS_CATALOG: IAQHack[] = [
  {
    id: 'corsi-rosenthal-box',
    title: 'The Corsi-Rosenthal DIY Box Cleaner',
    category: 'diy-filtration',
    difficulty: 'DIY (30 mins)',
    costLevel: '$ Under $25',
    pm25ReductionPercent: 88,
    summary: 'Build a high-volume MERV-13 air cleaner that outperforms $400 commercial HEPA purifiers at 1/5th the cost.',
    stepByStep: [
      'Get a standard 20-inch box fan and 4 MERV-13 furnace filters (20"x20"x1" or 20"x20"x2").',
      'Tape the 4 filters into an open cube formation, with the airflow directional arrows pointing INWARD toward the center.',
      'Tape a cardboard square at the bottom to seal the floor.',
      'Mount the box fan on top, blowing UPWARD and away from the filters. Tape all corner seams airtight with duct or painter tape.',
      'Add a simple cardboard "shroud" donut collar on the top fan face (14" circular opening) to eliminate blade tip vortex recirculating drag, boosting CFM clean air delivery by 40%!'
    ],
    scientificMechanism: 'Delivers 500-600 CFM (cubic feet per minute) of clean air. Because the 4 filter banks provide huge surface area, air face-velocity is low, allowing electrostatic capture of sub-micron PM0.3-PM2.5 particles with near-zero motor strain.',
    impactVerdict: 'Drops room PM2.5 from 350 µg/m³ to under 25 µg/m³ in less than 22 minutes.',
    iconName: 'BoxFan'
  },
  {
    id: 'diurnal-inversion-timing',
    title: 'The Thermal Inversion Ventilation Protocol',
    category: 'ventilation-timing',
    difficulty: 'Quick & Free',
    costLevel: 'Zero Cost',
    pm25ReductionPercent: 72,
    summary: 'Master the physics of the atmospheric boundary layer: never open windows in early morning or evening; ventilate solely at the solar apex.',
    stepByStep: [
      'Keep all exterior windows and balcony doors hermetically sealed between 6:00 PM and 11:30 AM.',
      'Identify the daily solar zenith (usually 1:00 PM to 2:30 PM), when ground heating breaks the cold capping inversion layer and particulate disperses vertically.',
      'Perform a rapid 8-to-12 minute "cross-flush" ONLY on sheltered courtyard-facing windows (avoid street-facing facades).',
      'Immediately seal windows and run air purifiers on Boost mode for 15 minutes to scrub the fresh air intake.',
      'Never ventilate during calm, windless fog, even at noon.'
    ],
    scientificMechanism: 'During nocturnal radiative cooling, cold air pools near the ground under a warm air lid (temperature inversion). Ground emissions (traffic, biomass) are trapped in a shallow 80-150m boundary layer. At solar noon, thermal convection expands the layer to 400-600m, slashing surface pollutant concentration by 40-60%.',
    impactVerdict: 'Prevents indoor CO2 stagnation while blocking 70%+ of peak daily particulate infiltration.',
    iconName: 'SunMedium'
  },
  {
    id: 'kitchen-capture-negative-pressure',
    title: 'Kitchen Chimney & Negative Pressure Trap Fix',
    category: 'kitchen-source',
    difficulty: 'Quick & Free',
    costLevel: 'Zero Cost',
    pm25ReductionPercent: 84,
    summary: 'Running a high-power kitchen exhaust in a sealed apartment creates negative pressure that sucks toxic corridor and drain fumes into bedrooms. Here is how to fix it.',
    stepByStep: [
      'Always turn on your kitchen exhaust 2 minutes BEFORE igniting burners, on low or medium.',
      'Close the kitchen door leading to the rest of the apartment.',
      'Crack a window located IN THE KITCHEN by 1 inch. This provides dedicated "makeup air" so the exhaust does not depressurize the rest of your home.',
      'Cook on back burners where chimney capture hood efficiency is 90% vs 55% on front burners.',
      'Leave the exhaust running for 5 minutes after finishing cooking to scavenge residual ultrafine oil aerosols and nitrogen dioxide.'
    ],
    scientificMechanism: 'Gas combustion produces nitrogen dioxide (NO2), carbon monoxide, and ultrafine soot. High-CFM range hoods without makeup air depressurize the apartment by 5-15 Pascals, sucking outdoor smog through window crevices and building plumbing stacks into living areas.',
    impactVerdict: 'Cuts whole-apartment NO2 exposure by 80% and stops grease PM2.5 migration into bedrooms.',
    iconName: 'Flame'
  },
  {
    id: 'damp-microfiber-mopping',
    title: 'Wet-Trapping vs Dry Sweeping (Resuspension Defense)',
    category: 'wet-cleaning',
    difficulty: 'Quick & Free',
    costLevel: 'Zero Cost',
    pm25ReductionPercent: 65,
    summary: 'Banning dry brooms, feather dusters, and bagless vacuums halts toxic particle resuspension.',
    stepByStep: [
      'Stop using dry plastic brooms, straw brooms, or feather dusters during smog season.',
      'Use a slightly damp microfiber flat-mop sprayed with plain water or mild vegetable soap.',
      'Mop in a single "S" motion rather than back-and-forth scrubbing to trap particulate in the fibers.',
      'If using a vacuum cleaner, verify it features a certified sealed-body HEPA exhaust. Traditional vacuums act like aerosol spray guns, grinding heavy floor particles into respirable PM1.0.',
      'Damp-wipe high-touch surfaces (dining tables, headboards, windowsills) twice weekly.'
    ],
    scientificMechanism: 'Settled urban dust contains toxic polycyclic aromatic hydrocarbons (PAHs), heavy metals (lead, cadmium from brake pads), and tire rubber. Dry sweeping provides aerodynamic lift, resuspending 80% of settled particles into the human breathing zone (1.2m-1.5m height) where they stay suspended for 4 to 8 hours.',
    impactVerdict: 'Prevents daily resuspension spikes of 150+ µg/m³ in living areas without buying any new equipment.',
    iconName: 'Droplets'
  },
  {
    id: 'plants-truth-activated-carbon',
    title: 'The Houseplant Reality Check & Carbon Bed Upgrade',
    category: 'plants-truth',
    difficulty: 'Hardware Setup',
    costLevel: '$$ Around $60',
    pm25ReductionPercent: 92,
    summary: 'Bust the houseplant myth: NASA clean air studies used sealed airtight chambers. In real homes, replace wishful greenery with real virgin coconut-shell activated carbon.',
    stepByStep: [
      'Understand the math: To match ONE standard HEPA air purifier in CADR, an apartment needs over 680 mature houseplants—an impossible indoor jungle.',
      'Retain existing plants for psychological well-being and modest humidity buffering, but do not rely on them for winter smog filtration.',
      'Check your current air purifier: most budget purifiers have only a paper-thin carbon-coated sheet (less than 50 grams of carbon) that saturates in 3 weeks.',
      'Add a true granulated activated carbon canister or thick pellet honeycomb filter (at least 500g-1kg of virgin coconut-shell carbon).',
      'Position the carbon stage directly downstream of your MERV-13/HEPA stage to adsorb toxic winter smog VOCs, benzene, and NO2.'
    ],
    scientificMechanism: 'Particulate matter (PM2.5) cannot be absorbed through plant stomata at rates comparable to air exchanges per hour (ACH). In contrast, activated carbon has a surface area exceeding 1,000 m²/gram and uses Van der Waals physical adsorption to trap gaseous combustion pollutants.',
    impactVerdict: 'Eliminates stinging smog odor, formaldehyde, and secondary organic aerosols (SOAs) within 30 minutes.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'n95-mask-seal-and-breath-test',
    title: 'The N95 Mask Fit & Cold Breath Seal Test',
    category: 'mask-seals',
    difficulty: 'Quick & Free',
    costLevel: 'Zero Cost',
    pm25ReductionPercent: 95,
    summary: 'A poorly fitted N95 mask leaks up to 60% of toxic particles. Master the 5-point seal check in 30 seconds.',
    stepByStep: [
      'Throw away cloth masks and loose blue surgical masks—they filter less than 20% of sub-micron winter smog particles.',
      'Choose a cup-shaped or bifold N95 / FFP2 / KF94 respirator with dual headstraps (headstraps achieve 3x tighter seal than ear loops).',
      'Use both index fingers to mold the aluminum nose clip firmly across the bridge of your nose (do not pinch with one hand).',
      'The Cold Breath Seal Test: Cup both hands over the mask without pressing it hard, and exhale sharply. If you feel warm air rushing onto your eyelids or cheeks, re-adjust the nose wire or straps.',
      'The Inhalation Test: Inhale sharply. The mask should visibly collapse inward toward your face slightly, confirming an airtight perimeter seal.'
    ],
    scientificMechanism: 'Fluid dynamics dictates that air takes the path of least resistance. A 2mm gap around the nasal bridge reduces total filtration efficiency from 98% down to 34%, as turbulent unconditioned air bypasses the electrostatically charged meltblown polypropylene fibers.',
    impactVerdict: 'Restores the full 95-99% protective barrier against carcinogenic black carbon and ultrafines during travel.',
    iconName: 'Smile'
  }
];

export const SUSTAINABLE_ALTERNATIVES: SustainableAlternative[] = [
  {
    id: 'commute-ice-to-transit',
    domain: 'Mobility',
    conventionalChoice: 'Solo Petrol/Diesel Car or Motorbike in peak smog traffic',
    sustainableChoice: 'Electric Metro Rail + Last-Mile Shared E-Rickshaw / Walking Corridor',
    emissionsCutPercent: 78,
    costDeltaMonthly: 'Saves $85 - $140 / mo (fuel + parking)',
    healthBonus: 'Avoids sitting directly behind diesel truck exhaust pipes where in-cabin PM2.5 reaches 450 µg/m³',
    impactExplanation: 'Highway vehicle congestion accounts for 32% of localized morning surface smog. Switching to electric rail removes direct roadside emissions while shielding you inside filtered underground transit cars.',
    roiTimeline: 'Immediate daily cost & health savings',
    immediateAction: 'Swap 3 commute days per week to rapid transit; wear N95 during last-mile walking'
  },
  {
    id: 'cooking-gas-to-induction',
    domain: 'Cooking',
    conventionalChoice: 'LPG or Piped Methane Gas Stove',
    sustainableChoice: 'Smart Induction Cooktop with Timer & Flat Ceramic Top',
    emissionsCutPercent: 92,
    costDeltaMonthly: 'Saves $8 - $14 / mo (induction is 85% thermal efficient vs 40% for gas flames)',
    healthBonus: 'Eliminates 100% of open-flame nitrogen dioxide (NO2), carbon monoxide, and ultrafine soot spikes in your home',
    impactExplanation: 'Gas cooking produces up to 400 ppb of NO2 inside kitchens—exceeding WHO outdoor safety standards by 4x. Pediatric asthma incidence is 24% higher in homes cooking on open gas flames without commercial extraction.',
    roiTimeline: 'Payback in 4 months on energy efficiency and respiratory medicine reduction',
    immediateAction: 'Buy a portable 2000W single induction plate for boiling, curries, and daily simmering'
  },
  {
    id: 'heating-wood-gas-to-heatpump',
    domain: 'Heating',
    conventionalChoice: 'Wood Fireplace, Coal Brazier, or Flueless Gas Space Heater',
    sustainableChoice: 'Inverter Air-to-Air Heat Pump (Reverse Cycle AC) or Mica Panel',
    emissionsCutPercent: 99,
    costDeltaMonthly: 'Saves $45 - $90 / mo on winter fuel',
    healthBonus: 'Completely eliminates deadly indoor carbon monoxide hazards and smoky tar aerosol buildup',
    impactExplanation: 'Burning 1 kg of wood indoors generates over 10 grams of pure fine soot and carcinogenic benzene. Heat pumps produce zero on-site emissions and transfer 3.5x more heat energy than they consume in electricity.',
    roiTimeline: 'Payback within 2 winter heating seasons',
    immediateAction: 'Switch existing split AC to heating mode (Reverse cycle); ban all unvented flame heaters'
  },
  {
    id: 'air-cleaning-commercial-to-diy',
    domain: 'Air Cleaning',
    conventionalChoice: 'One expensive boutique brand purifier with tiny proprietary replacement filters',
    sustainableChoice: 'Dual-Zone Setup: 1 Certified HEPA + 1 DIY Corsi-Rosenthal MERV-13 Box',
    emissionsCutPercent: 85,
    costDeltaMonthly: 'Saves $180 / year on filter markup',
    healthBonus: 'Increases whole-house Clean Air Delivery Rate (CADR) from 120 CFM to over 700 CFM',
    impactExplanation: 'Most homes suffer because their single purifier is drastically undersized for their cubic footage. Multiplying airflow using standardized MERV-13 media maintains clean air exchanges even when outdoor infiltration is severe.',
    roiTimeline: 'Immediate; build in one afternoon',
    immediateAction: 'Assemble 1 Corsi-Rosenthal box for living room; move quiet HEPA into child/grandparent bedroom'
  },
  {
    id: 'neighborhood-waste-management',
    domain: 'Neighborhood',
    conventionalChoice: 'Open burning of dry leaves, garden clippings, and plastic waste on curbsides',
    sustainableChoice: 'Community Bokashi / Aerobic Composting Pit + Municipal Mulching',
    emissionsCutPercent: 98,
    costDeltaMonthly: 'Free; produces nutrient-rich organic soil conditioner for society gardens',
    healthBonus: 'Stops acrid dioxin and chlorinated smoke from entering ground-floor and first-floor bedroom windows',
    impactExplanation: 'A single leaf pile burn emits as much particulate matter as 1,500 idling diesel passenger cars over 2 hours. Composting sequesters organic carbon into soil biology without combustion.',
    roiTimeline: 'Immediate community air quality relief',
    immediateAction: 'Post anti-burning society notice and designate 2 shaded compost bins for dry sweepings'
  }
];

export const COMMUNITY_INITIATIVES: CommunityInitiative[] = [
  {
    id: 'school-gate-idle-free',
    title: 'School Gate Zero-Idle Zone',
    targetNeighborhood: 'Vasant Vihar / Anand Niketan School Cluster',
    collectiveSmogAbatedKg: 420,
    activePledgers: 284,
    badge: 'Kids Clean Air Champion',
    category: 'School Anti-Idling',
    description: 'Parents and school buses commit to turning off engines while waiting at pickup zones. Eliminates localized exhaust hotspots at child breathing height (0.8m).',
    userPledged: true
  },
  {
    id: 'green-corridor-navigator',
    title: 'Clean-Air Commute Corridor',
    targetNeighborhood: 'East Delhi & Noida Expressway Link',
    collectiveSmogAbatedKg: 850,
    activePledgers: 512,
    badge: 'Corridor Pioneer',
    category: 'Clean Air Corridor',
    description: 'Crowdsourced navigation map routing cyclists and pedestrians through tree-canopied interior residential lanes, avoiding high-particulate diesel bypass roads.',
    userPledged: false
  },
  {
    id: 'merv13-bulk-purchase-club',
    title: 'Community MERV-13 Filter Cooperative',
    targetNeighborhood: 'Civil Lines & Model Town Welfare Association',
    collectiveSmogAbatedKg: 1240,
    activePledgers: 198,
    badge: 'Filter Co-op Organizer',
    category: 'Bulk MERV13 Buy',
    description: 'Pool orders for bulk industrial MERV-13 and activated carbon rolls directly from manufacturers, slashing DIY air cleaner costs by 52% for all society members.',
    userPledged: true
  },
  {
    id: 'smog-smoke-hotspot-watch',
    title: 'Neighborhood Smoke & Stubble Watch',
    targetNeighborhood: 'Peri-Urban Ring & Border Checkposts',
    collectiveSmogAbatedKg: 640,
    activePledgers: 340,
    badge: 'Smoke Guardian',
    category: 'Smog Watch',
    description: 'Instant community reporting of curb trash burning, diesel generator violations, and unpaved construction dust with automated geotags to local nodal officers.',
    userPledged: false
  }
];

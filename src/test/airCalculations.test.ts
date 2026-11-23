import { describe, it, expect } from 'vitest';
import { 
  calculateCigarettesEquivalent, 
  simulateHomeTwinRoomLevels, 
  calculateDirectImpact,
  generateAdaptiveDailyRoutine,
  createCustomLocation 
} from '../utils/airCalculations';
import { LOCATION_PRESETS, DEFAULT_HOUSEHOLD } from '../data/mockData';
import { HomeTwinState } from '../types';

describe('Air Quality Physics & Calculations Engine', () => {
  it('correctly calculates Berkeley Earth cigarette equivalent dose', () => {
    // 22 ug/m3 is 1 cigarette/day
    expect(calculateCigarettesEquivalent(22)).toBe(1.0);
    expect(calculateCigarettesEquivalent(44)).toBe(2.0);
    expect(calculateCigarettesEquivalent(110)).toBe(5.0);
    expect(calculateCigarettesEquivalent(0)).toBe(0);
  });

  it('simulates Home Twin room physics and mitigation factors', () => {
    const twinState: HomeTwinState = {
      kitchen: {
        cookingActive: true,
        fuel: 'gas',
        exhaustOn: false,
        pm25: 140,
        no2: 90
      },
      livingRoom: {
        windowsState: 'wide-open',
        purifierMode: 'off',
        cleaningMethod: 'dry-broom-vacuum',
        pm25: 180,
        no2: 40
      },
      bedroom: {
        doorClosed: false,
        purifierMode: 'off',
        bedtimeSeal: false,
        pm25: 120,
        no2: 30
      },
      balcony: {
        outdoorAmbientPm25: 400,
        doorSealed: false
      }
    };

    const unmitigated = simulateHomeTwinRoomLevels(400, twinState, DEFAULT_HOUSEHOLD);
    expect(unmitigated.kitchen.pm25).toBeGreaterThan(150);
    expect(unmitigated.kitchen.no2).toBeGreaterThan(50);
    expect(unmitigated.livingRoom.pm25).toBeGreaterThan(100);

    // Now test mitigated state (Induction + Chimney ON + Sealed + Turbo Purifier)
    const mitigatedState: HomeTwinState = {
      kitchen: {
        cookingActive: true,
        fuel: 'induction',
        exhaustOn: true,
        pm25: 20,
        no2: 8
      },
      livingRoom: {
        windowsState: 'sealed',
        purifierMode: 'turbo',
        cleaningMethod: 'damp-microfiber',
        pm25: 15,
        no2: 10
      },
      bedroom: {
        doorClosed: true,
        purifierMode: 'turbo',
        bedtimeSeal: true,
        pm25: 8,
        no2: 6
      },
      balcony: {
        outdoorAmbientPm25: 400,
        doorSealed: true
      }
    };

    const mitigated = simulateHomeTwinRoomLevels(400, mitigatedState, DEFAULT_HOUSEHOLD);
    expect(mitigated.kitchen.pm25).toBeLessThan(unmitigated.kitchen.pm25);
    expect(mitigated.livingRoom.pm25).toBeLessThan(50);
    expect(mitigated.bedroom.pm25).toBeLessThan(25);
  });

  it('computes direct impact metrics with quantified personal shield', () => {
    const delhi = LOCATION_PRESETS[0];
    const twinState: HomeTwinState = {
      kitchen: { cookingActive: false, fuel: 'induction', exhaustOn: true, pm25: 15, no2: 5 },
      livingRoom: { windowsState: 'sealed', purifierMode: 'boost', cleaningMethod: 'damp-microfiber', pm25: 18, no2: 10 },
      bedroom: { doorClosed: true, purifierMode: 'quiet', bedtimeSeal: true, pm25: 10, no2: 5 },
      balcony: { outdoorAmbientPm25: delhi.pm25, doorSealed: true }
    };

    const metrics = calculateDirectImpact(delhi, DEFAULT_HOUSEHOLD, twinState);
    expect(metrics.equivalentCigarettesAvoidedDay).toBeGreaterThan(0);
    expect(metrics.pm25DoseReductionPercent).toBeGreaterThan(50);
    expect(metrics.co2SavedKgMonth).toBeGreaterThanOrEqual(0);
    expect(metrics.lungDepositionIndexScore).toBeLessThanOrEqual(100);
  });

  it('evaluates hermetic sealing vs drafty envelope infiltration', () => {
    const twinState: HomeTwinState = {
      kitchen: { cookingActive: false, fuel: 'induction', exhaustOn: true, pm25: 10, no2: 5 },
      livingRoom: { windowsState: 'sealed', purifierMode: 'off', cleaningMethod: 'damp-microfiber', pm25: 20, no2: 10 },
      bedroom: { doorClosed: true, purifierMode: 'off', bedtimeSeal: false, pm25: 15, no2: 8 },
      balcony: { outdoorAmbientPm25: 300, doorSealed: true }
    };

    const draftyHousehold = { ...DEFAULT_HOUSEHOLD, sealingQuality: 'drafty-leaky' as const };
    const hermeticHousehold = { ...DEFAULT_HOUSEHOLD, sealingQuality: 'hermetic-triple-glazed' as const };

    const draftySim = simulateHomeTwinRoomLevels(300, twinState, draftyHousehold);
    const hermeticSim = simulateHomeTwinRoomLevels(300, twinState, hermeticHousehold);

    expect(hermeticSim.livingRoom.pm25).toBeLessThan(draftySim.livingRoom.pm25);
    expect(hermeticSim.kitchen.pm25).toBeLessThan(draftySim.kitchen.pm25);
  });

  it('demonstrates Corsi-Rosenthal box supplemental clean air delivery', () => {
    const twinState: HomeTwinState = {
      kitchen: { cookingActive: false, fuel: 'induction', exhaustOn: true, pm25: 10, no2: 5 },
      livingRoom: { windowsState: 'sealed', purifierMode: 'boost', cleaningMethod: 'damp-microfiber', pm25: 25, no2: 10 },
      bedroom: { doorClosed: true, purifierMode: 'quiet', bedtimeSeal: true, pm25: 12, no2: 6 },
      balcony: { outdoorAmbientPm25: 350, doorSealed: true }
    };

    const withoutCR = {
      ...DEFAULT_HOUSEHOLD,
      defenses: { ...DEFAULT_HOUSEHOLD.defenses, hasCorsiRosenthalBox: false }
    };
    const withCR = {
      ...DEFAULT_HOUSEHOLD,
      defenses: { ...DEFAULT_HOUSEHOLD.defenses, hasCorsiRosenthalBox: true }
    };

    const simWithout = simulateHomeTwinRoomLevels(350, twinState, withoutCR);
    const simWith = simulateHomeTwinRoomLevels(350, twinState, withCR);

    expect(simWith.livingRoom.pm25).toBeLessThanOrEqual(simWithout.livingRoom.pm25);
  });

  it('adjusts daily routine actions when vulnerable members are present', () => {
    const delhi = LOCATION_PRESETS[0];
    const vulnerableProfile = {
      ...DEFAULT_HOUSEHOLD,
      members: { ...DEFAULT_HOUSEHOLD.members, infants: 1, asthmaticsOrSensitive: 1 }
    };
    const nonVulnerableProfile = {
      ...DEFAULT_HOUSEHOLD,
      members: { adults: 2, infants: 0, children: 0, seniors: 0, asthmaticsOrSensitive: 0, pets: 0 }
    };

    const vulnerableRoutines = generateAdaptiveDailyRoutine(delhi, vulnerableProfile);
    const standardRoutines = generateAdaptiveDailyRoutine(delhi, nonVulnerableProfile);

    expect(vulnerableRoutines.length).toBeGreaterThanOrEqual(5);
    expect(vulnerableRoutines[0].action).toMatch(/infants/i);
    expect(standardRoutines[0].action).not.toMatch(/strict zero-outdoor rule for infants/i);
  });

  it('generates custom atmospheric locations with accurate diurnal curves', () => {
    const custom = createCustomLocation(
      'Alpine Basin',
      'Switzerland',
      'Valley Central',
      10,
      12,
      600
    );

    expect(custom.name).toBe('Alpine Basin');
    expect(custom.severity).toBe('good');
    expect(custom.diurnalCurve).toHaveLength(8);
    expect(custom.diurnalCurve[0].inversionHeight).toBeDefined();
    expect(custom.primaryPollutant).toBeDefined();
  });

  it('generates adaptive daily routine items for severe smog', () => {
    const delhi = LOCATION_PRESETS[0];
    const routines = generateAdaptiveDailyRoutine(delhi, DEFAULT_HOUSEHOLD);

    expect(routines.length).toBeGreaterThanOrEqual(4);
    const morning = routines.find(r => r.phase === 'Early Morning');
    expect(morning).toBeDefined();
    expect(morning?.severity).toBe('hazardous');

    const midday = routines.find(r => r.phase === 'Midday Sun');
    expect(midday).toBeDefined();
    expect(midday?.severity).toBe('moderate');
  });

  it('creates custom atmospheric location with physical ratios and diurnal curve', () => {
    const custom = createCustomLocation('Chicago', 'USA', 'Loop District', 125, 12, 160);
    expect(custom.name).toBe('Chicago');
    expect(custom.pm25).toBe(125);
    expect(custom.pm10).toBeGreaterThan(125);
    expect(custom.diurnalCurve.length).toBe(8);
    expect(custom.severity).toBe('unhealthy');
  });

  it('safely handles zero and extreme severe smog inputs', () => {
    expect(calculateCigarettesEquivalent(-50)).toBe(0);
    expect(calculateCigarettesEquivalent(0)).toBe(0);

    const extremeLocation = createCustomLocation('Industrial Epicenter', 'Global', 'Zone 9', 850, -5, 50);
    expect(extremeLocation.severity).toBe('hazardous');
    expect(extremeLocation.aqi).toBe(500);

    const twinState: HomeTwinState = {
      kitchen: { cookingActive: false, fuel: 'induction', exhaustOn: true, pm25: 15, no2: 5 },
      livingRoom: { windowsState: 'sealed', purifierMode: 'turbo', cleaningMethod: 'damp-microfiber', pm25: 18, no2: 10 },
      bedroom: { doorClosed: true, purifierMode: 'turbo', bedtimeSeal: true, pm25: 10, no2: 5 },
      balcony: { outdoorAmbientPm25: 850, doorSealed: true }
    };

    const impact = calculateDirectImpact(extremeLocation, DEFAULT_HOUSEHOLD, twinState);
    expect(impact.equivalentCigarettesAvoidedDay).toBeGreaterThan(0);
    expect(impact.lungDepositionIndexScore).toBeGreaterThanOrEqual(8);
  });
});


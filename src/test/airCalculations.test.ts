import { describe, it, expect } from 'vitest';
import { 
  calculateCigarettesEquivalent, 
  simulateHomeTwinRoomLevels, 
  calculateDirectImpact,
  generateAdaptiveDailyRoutine 
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
    expect(metrics.lungDepositionIndexScore).toBeLessThan(60);
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
});


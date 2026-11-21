import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { AirQualityOverview } from '../components/AirQualityOverview';
import { DirectImpactMeter } from '../components/DirectImpactMeter';
import { HomeAirTwin } from '../components/HomeAirTwin';
import { LOCATION_PRESETS, DEFAULT_HOUSEHOLD } from '../data/mockData';
import { calculateDirectImpact } from '../utils/airCalculations';
import { HomeTwinState } from '../types';

describe('UI Components Render Suite', () => {
  const delhi = LOCATION_PRESETS[0];
  const twinState: HomeTwinState = {
    kitchen: { cookingActive: true, fuel: 'gas', exhaustOn: true, pm25: 65, no2: 38 },
    livingRoom: { windowsState: 'sealed', purifierMode: 'boost', cleaningMethod: 'damp-microfiber', pm25: 22, no2: 18 },
    bedroom: { doorClosed: true, purifierMode: 'quiet', bedtimeSeal: true, pm25: 12, no2: 8 },
    balcony: { outdoorAmbientPm25: delhi.pm25, doorSealed: true }
  };

  it('renders AirQualityOverview with AQI gauge and diurnal profile', () => {
    render(<AirQualityOverview location={delhi} />);
    expect(screen.getByText(/Delhi NCR/i)).toBeInTheDocument();
    expect(screen.getByText(/438/)).toBeInTheDocument();
    expect(screen.getByText(/Fine Soot/i)).toBeInTheDocument();
    expect(screen.getByText(/Diurnal Inversion & Particulate Profile/i)).toBeInTheDocument();
  });

  it('renders DirectImpactMeter with cigarette equivalent and lung metrics', () => {
    const metrics = calculateDirectImpact(delhi, DEFAULT_HOUSEHOLD, twinState);
    render(
      <DirectImpactMeter
        metrics={metrics}
        onOpenCopilotWithContext={vi.fn()}
      />
    );

    expect(screen.getByText(/Direct Impact & Exposure Quantification/i)).toBeInTheDocument();
    expect(screen.getByText(/Cigarettes \/ Person \/ Day/i)).toBeInTheDocument();
    expect(screen.getByText(/Lung Deposition Cut/i)).toBeInTheDocument();
  });

  it('renders HomeAirTwin interactive simulator rooms', () => {
    render(
      <HomeAirTwin
        outdoorPm25={delhi.pm25}
        household={DEFAULT_HOUSEHOLD}
        twinState={twinState}
        onUpdateState={vi.fn()}
      />
    );

    expect(screen.getByText(/Interactive Home Air Twin/i)).toBeInTheDocument();
    expect(screen.getByText(/Kitchen Zone/i)).toBeInTheDocument();
    expect(screen.getByText(/Living Room Area/i)).toBeInTheDocument();
    expect(screen.getByText(/Clean Sleep Haven/i)).toBeInTheDocument();
  });
});

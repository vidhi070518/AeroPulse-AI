import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AirQualityOverview } from '../components/AirQualityOverview';
import { DirectImpactMeter } from '../components/DirectImpactMeter';
import { HomeAirTwin } from '../components/HomeAirTwin';
import { Header } from '../components/Header';
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

    expect(screen.getByText(/Personal Exposure & Emissions Shield/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Living Area/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedroom Haven/i)).toBeInTheDocument();
  });

  it('switches DirectImpactMeter to Before vs After Delta comparison view', () => {
    const metrics = calculateDirectImpact(delhi, DEFAULT_HOUSEHOLD, twinState);
    render(
      <DirectImpactMeter
        metrics={metrics}
        onOpenCopilotWithContext={vi.fn()}
      />
    );

    const deltaButton = screen.getByText(/Before vs. After Delta/i);
    expect(deltaButton).toBeInTheDocument();
    fireEvent.click(deltaButton);

    expect(screen.getByText(/Unmitigated Conventional Baseline/i)).toBeInTheDocument();
    expect(screen.getByText(/AeroPulse Shielded Defense/i)).toBeInTheDocument();
  });

  it('renders Header with location selector and simulator trigger', () => {
    const onOpenCustomMock = vi.fn();
    render(
      <Header
        currentLocation={delhi}
        onSelectLocation={vi.fn()}
        household={DEFAULT_HOUSEHOLD}
        onOpenHouseholdModal={vi.fn()}
        onOpenCopilot={vi.fn()}
        emergencyMode={false}
        onToggleEmergencyMode={vi.fn()}
        airShieldScore={88}
        onExportReport={vi.fn()}
        darkMode={false}
        onToggleDarkMode={vi.fn()}
        onOpenCustomLocationModal={onOpenCustomMock}
      />
    );

    expect(screen.getByText(/AeroPulse/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ Sim/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/\+ Sim/i));
    expect(onOpenCustomMock).toHaveBeenCalledTimes(1);
  });
});


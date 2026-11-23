import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AirQualityOverview } from '../components/AirQualityOverview';
import { DirectImpactMeter } from '../components/DirectImpactMeter';
import { HomeAirTwin } from '../components/HomeAirTwin';
import { Header } from '../components/Header';
import { DailyRoutineScheduler } from '../components/DailyRoutineScheduler';
import { IAQHacksLibrary } from '../components/IAQHacksLibrary';
import { SustainableAlternativesMatrix } from '../components/SustainableAlternativesMatrix';
import { CommunityHub } from '../components/CommunityHub';
import { HouseholdModal } from '../components/HouseholdModal';
import { SmogEmergencyModal } from '../components/SmogEmergencyModal';
import { CustomLocationModal } from '../components/CustomLocationModal';
import { LOCATION_PRESETS, DEFAULT_HOUSEHOLD } from '../data/mockData';
import { calculateDirectImpact, generateAdaptiveDailyRoutine } from '../utils/airCalculations';
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

  it('renders DailyRoutineScheduler and handles action completion', () => {
    const routines = generateAdaptiveDailyRoutine(delhi, DEFAULT_HOUSEHOLD);
    const onCompleteMock = vi.fn();
    render(
      <DailyRoutineScheduler
        routineItems={routines}
        location={delhi}
        household={DEFAULT_HOUSEHOLD}
        onActionComplete={onCompleteMock}
        onOpenCopilot={vi.fn()}
      />
    );

    expect(screen.getByText(/Adaptive Low-Emission Daily Routine/i)).toBeInTheDocument();
    const markButtons = screen.getAllByTitle(/Mark action completed/i);
    expect(markButtons.length).toBeGreaterThan(0);
    fireEvent.click(markButtons[0]);
    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });

  it('renders IAQHacksLibrary with interactive Corsi-Rosenthal calculator', () => {
    render(<IAQHacksLibrary onOpenCopilot={vi.fn()} />);

    expect(screen.getByText(/Indoor Air Quality \(IAQ\) Masterclass Hacks/i)).toBeInTheDocument();
    expect(screen.getByText(/Needed CADR:/i)).toBeInTheDocument();
    expect(screen.getByText(/Corsi-Rosenthal Box/i)).toBeInTheDocument();
  });

  it('renders SustainableAlternativesMatrix and allows pledging alternative', () => {
    const onPledgeMock = vi.fn();
    render(
      <SustainableAlternativesMatrix
        onOpenCopilot={vi.fn()}
        onPledgeAlternative={onPledgeMock}
      />
    );

    expect(screen.getByText(/Sustainable Alternatives Matrix/i)).toBeInTheDocument();
    const pledgeButtons = screen.getAllByText(/Adopt This Alternative/i);
    expect(pledgeButtons.length).toBeGreaterThan(0);
    fireEvent.click(pledgeButtons[0]);
    expect(onPledgeMock).toHaveBeenCalledTimes(1);
  });

  it('renders CommunityHub with collective smog reduction tracking', () => {
    const onPledgeUpdateMock = vi.fn();
    render(<CommunityHub onPledgeUpdate={onPledgeUpdateMock} />);

    expect(screen.getByText(/Community Smog Shield & Collective Action/i)).toBeInTheDocument();
    const joinButtons = screen.getAllByText(/Join Initiative/i);
    expect(joinButtons.length).toBeGreaterThan(0);
    fireEvent.click(joinButtons[0]);
    expect(onPledgeUpdateMock).toHaveBeenCalledTimes(1);
  });

  it('renders HouseholdModal and allows updating demographics', () => {
    const onSaveMock = vi.fn();
    render(
      <HouseholdModal
        isOpen={true}
        onClose={vi.fn()}
        household={DEFAULT_HOUSEHOLD}
        onSave={onSaveMock}
      />
    );

    expect(screen.getByText(/Household & Lifestyle Profile/i)).toBeInTheDocument();
    const saveButton = screen.getByText(/Apply & Recalculate/i);
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
    expect(onSaveMock).toHaveBeenCalledTimes(1);
  });

  it('renders SmogEmergencyModal and executes crisis protocol', () => {
    const onExecuteMock = vi.fn();
    render(
      <SmogEmergencyModal
        isOpen={true}
        onClose={vi.fn()}
        location={delhi}
        onExecuteProtocol={onExecuteMock}
      />
    );

    expect(screen.getByText(/HAZARDOUS WINTER SMOG CRISIS PROTOCOL/i)).toBeInTheDocument();
    const executeButton = screen.getByText(/Execute Crisis Protocol/i);
    expect(executeButton).toBeInTheDocument();
    fireEvent.click(executeButton);
    expect(onExecuteMock).toHaveBeenCalledTimes(1);
  });

  it('renders CustomLocationModal and loads atmospheric presets', () => {
    const onApplyMock = vi.fn();
    render(
      <CustomLocationModal
        isOpen={true}
        onClose={vi.fn()}
        onApplyLocation={onApplyMock}
      />
    );

    expect(screen.getByText(/Custom Location & Atmospheric Simulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Wildfire Smoke Wave/i)).toBeInTheDocument();
    expect(screen.getByText(/Stubble Burning Peak/i)).toBeInTheDocument();
    const applyButton = screen.getByText(/Simulate & Apply Environment/i);
    expect(applyButton).toBeInTheDocument();
    fireEvent.click(applyButton);
    expect(onApplyMock).toHaveBeenCalledTimes(1);
  });
});


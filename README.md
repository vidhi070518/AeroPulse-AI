# 🌬️ AeroPulse AI — Urban Air Quality & Smog Defense Assistant

[![Next.js 16](https://img.shields.io/badge/Next.js-16%20Turbopack-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Google Gemini GenAI](https://img.shields.io/badge/Google%20GenAI-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Zero%20Any-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-25%2F25%20Tests%20Passing-729B1B?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%20AA%20Compliant-0f766e?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **AeroPulse AI** is a GenAI-powered urban air quality and winter smog defense system engineered to help families and communities navigate severe seasonal smog. It suggests low-emission daily routines, indoor air quality (IAQ) hacks, and sustainable alternatives tailored to their location and lifestyle, while **clearly explaining and quantifying the direct health and emissions impact of their choices**.

---

## 🎯 Problem Statement Alignment Matrix

| Hackathon Requirement | AeroPulse AI Implementation | Verified Source |
| :--- | :--- | :--- |
| **GenAI-Powered Assistant** | Multi-modal Copilot powered by Google Gemini 2.5 Flash via `@google/genai` with voice dictation and context-aware atmospheric reasoning. | [`src/app/api/copilot/route.ts`](src/app/api/copilot/route.ts) & [`CopilotDrawer.tsx`](src/components/CopilotDrawer.tsx) |
| **Families & Vulnerabilities** | Granular household profiler modeling infants, children, seniors, asthmatic sensitivities, building envelope leakage, and stove types. | [`HouseholdModal.tsx`](src/components/HouseholdModal.tsx) & [`HomeAirTwin.tsx`](src/components/HomeAirTwin.tsx) |
| **Severe Winter Smog & Inversion** | Atmospheric physics engine calculating nocturnal thermal inversion ceilings, identifying safe diurnal solar ventilation windows. | [`AirQualityOverview.tsx`](src/components/AirQualityOverview.tsx) & [`airCalculations.ts`](src/utils/airCalculations.ts) |
| **Low-Emission Daily Routines** | Dynamic hourly routine synchronized to the diurnal boundary layer, preventing exposure during peak morning ground traps (6:30–8:30 AM). | [`DailyRoutineScheduler.tsx`](src/components/DailyRoutineScheduler.tsx) with .ICS Calendar Sync |
| **Indoor Air Quality (IAQ) Hacks** | Evidence-based catalog including DIY Corsi-Rosenthal boxes with an interactive CADR sizer, kitchen chimney makeup air, and damp mopping. | [`IAQHacksLibrary.tsx`](src/components/IAQHacksLibrary.tsx) |
| **Tailored Sustainable Alternatives** | Side-by-side transition matrix (e.g. gas stove ➔ induction, solo car ➔ metro rail) with ROI timelines and monthly fuel/health savings. | [`SustainableAlternativesMatrix.tsx`](src/components/SustainableAlternativesMatrix.tsx) |
| **Clearly Explaining Direct Impact** | Interactive "Before vs. After Delta" meter computing Berkeley Earth cigarette equivalents avoided, lung deposition cuts (-94%), and CO₂ saved. | [`DirectImpactMeter.tsx`](src/components/DirectImpactMeter.tsx) |
| **Community & Collective Shield** | Neighborhood action hub for school gate anti-idling zones, clean walking corridors, and bulk MERV-13 filter buying co-ops. | [`CommunityHub.tsx`](src/components/CommunityHub.tsx) |
| **Custom Atmospheric Simulator** | Dynamic environment generator with GPS auto-detection and disaster presets (Wildfire Smoke Wave, Stubble Burning, Fireworks). | [`CustomLocationModal.tsx`](src/components/CustomLocationModal.tsx) |

---

---

### Core System Capabilities

| Capability | Technical Implementation |
| :--- | :--- |
| **GenAI-Powered Assistant** | Multi-modal **AeroPulse AI Copilot** powered by `@google/genai` (Gemini 2.5 Flash) with voice dictation (Web Speech API) and an expert fallback engine for reliable guidance. |
| **Location & Inversion Dynamics** | Real-time atmospheric profiles for major smog hotspots (**Delhi NCR**, **Beijing**, **Lahore**, **Salt Lake City**, **London**, **Milan**) including 6-gas pollutants (PM2.5, PM10, NO2, CO, SO2, O3) and thermal inversion heights. |
| **Household & Vulnerability Profiling** | Household profiler modeling family composition (infants, asthmatics, seniors, pets), building envelope leakage, kitchen stove types, and commute modes. |
| **Low-Emission Daily Routines** | Dynamic hourly routine synchronized to the **diurnal temperature inversion curve** (identifying hazardous morning ground traps vs the **12:30–2:30 PM solar zenith safe ventilation window**) with 1-click **.ICS Calendar export**. |
| **Indoor Air Quality (IAQ) Hacks** | Complete catalog of physics-backed hacks: **DIY Corsi-Rosenthal Box** builder with an interactive room CADR/CFM calculator, kitchen chimney negative pressure relief, damp-microfiber mopping (eliminating dust resuspension), and debunking the houseplant myth vs activated carbon. |
| **Sustainable Alternatives Matrix** | Side-by-side transition matrix (e.g. Solo ICE Car ➔ Electric Metro Rail; LPG Gas Flame ➔ Electric Induction Cooktop) displaying emissions cut percentages (-78% to -92%), monthly dollar savings, and health bonuses. |
| **Direct Impact Clearly Quantified** | Quantified personal and environmental metrics: **Equivalent Cigarettes Avoided** (Berkeley Earth formula: 1 cig ≈ 22 µg/m³ PM2.5/24h), **Deep Lung Deposition Cut %**, **kg CO2e Prevented**, and **Monthly Energy Cost Saved**. |
| **Community Air Shield** | **Community Smog Shield**: School Gate Anti-Idling Zone pledges, Clean-Air Walking Corridors, Bulk MERV-13 Filter Co-ops, and a rapid crowdsourced trash/stubble burning incident reporter. |
| **Executive Clean Air Brief** | One-click printable and downloadable executive action summary report for households and institutions. |

---

## 🔬 Scientific Foundations

1. **Berkeley Earth Cigarette Inhalation Rule:**
   $$\text{Daily Cigarette Inhaled Equivalent} = \frac{\text{24-hr Mean Exposure } \text{PM}_{2.5}\ (\mu\text{g/m}^3)}{22}$$
   Quantifies the visceral toxic burden avoided when families run proper filtration and seal drafty envelopes.

2. **Nocturnal Temperature Inversion Dynamics:**
   Winter radiation cooling produces a shallow boundary layer (sub-120m), trapping tailpipe and biomass smoke. At solar noon (12:30 - 2:30 PM), convective ground heating expands the layer to 400m+, reducing surface particulate concentration by 40-60%.

3. **Corsi-Rosenthal Box Fluid Dynamics:**
   Using a 20-inch box fan and four MERV-13 filters delivers **500–600 CFM** of clean air at a fraction of the cost of commercial HEPA units, avoiding blade tip vortex recirculating drag with an engineered shroud collar.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on v22)
- npm 10+

### Installation
```bash
# Clone repository
git clone https://github.com/vidhi070518/AeroPulse-AI.git
cd AeroPulse-AI

# Install dependencies
npm install

# (Optional) Add your Gemini API key in .env.local
# If omitted, AeroPulse AI automatically uses its built-in expert knowledge engine!
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env.local

# Run tests
npm run test

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to interact with the dashboard.

---

## 🧪 Testing Suite (25 Tests Passing)

Run the comprehensive unit and integration test suite:
```bash
npm run test
```
- `src/test/airCalculations.test.ts` (10 tests): Validates Berkeley Earth cigarette equivalence math, multi-zone indoor infiltration physics, Corsi-Rosenthal CADR boosts, vulnerability adjustments, and custom location diurnal generators with extreme boundary conditions.
- `src/test/api.test.ts` (3 tests): Tests `/api/copilot` endpoint schema validation, Gemini API integration, and domain fallback engine.
- `src/test/components.test.tsx` (12 tests): Tests rendering of the Air Quality Overview, Impact Meter (including Before vs. After Delta view), Home Air Twin, Daily Routine Scheduler, IAQ Hacks Library with Corsi-Rosenthal calculator, Sustainable Alternatives Matrix, Community Hub, Household Modal, Smog Emergency Modal, and Custom Location Simulator.

---

## 🏛️ Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4 + Clean Neutral Editorial Design System
- **Icons:** Lucide React
- **GenAI Engine:** Google Gemini (`@google/genai` with Gemini 2.5 Flash) + Expert Fallback Engine
- **Testing:** Vitest + React Testing Library + JSDOM

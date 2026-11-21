# 🌬️ AeroPulse AI — Urban Air Quality & Smog Defense Assistant

[![Next.js 16](https://img.shields.io/badge/Next.js-16%20Turbopack-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Google Gemini GenAI](https://img.shields.io/badge/Google%20GenAI-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-13%2F13%20Tests%20Passing-729B1B?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> **AeroPulse AI** is a GenAI-powered urban air quality and winter smog defense system engineered to help families and communities navigate severe seasonal smog. It provides low-emission daily routines, indoor air quality (IAQ) hacks, and sustainable alternatives tailored to household architecture and vulnerabilities, while **clearly quantifying the direct health and emissions impact of every choice**.

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
git clone https://github.com/vidhi070518/EventPilot-AI.git
cd EventPilot-AI

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

## 🧪 Testing Suite

Run the comprehensive unit test suite:
```bash
npm run test
```
- `src/test/airCalculations.test.ts`: Validates Berkeley Earth math, Home Twin simulation physics, impact metrics, and routine generators.
- `src/test/api.test.ts`: Tests `/api/copilot` endpoint validation, Gemini API integration, and domain fallback engine.
- `src/test/components.test.tsx`: Tests rendering of the Air Quality Overview, Impact Meter, and Home Air Twin.

---

## 🏛️ Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4 + Clean Neutral Editorial Design System
- **Icons:** Lucide React
- **GenAI Engine:** Google Gemini (`@google/genai` with Gemini 2.5 Flash) + Expert Fallback Engine
- **Testing:** Vitest + React Testing Library + JSDOM

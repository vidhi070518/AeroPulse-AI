import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AeroPulse AI — Urban Air Quality & Smog Defense Assistant',
  description: 'AI-powered assistant helping families and communities navigate severe winter smog with low-emission routines, indoor air quality hacks, and sustainable alternatives.',
  keywords: [
    'Urban Air Quality Assistant',
    'Winter Smog Defense',
    'GenAI Copilot',
    'Corsi-Rosenthal Box',
    'Thermal Inversion',
    'PM2.5 Protection',
    'Clean Air Solutions',
    'Public Health'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-emerald-500/20 selection:text-emerald-800 dark:selection:text-emerald-200">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

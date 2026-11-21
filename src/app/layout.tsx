import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AeroPulse AI — GenAI Urban Air Quality & Smog Defense Assistant',
  description: 'AI-powered assistant helping families and communities navigate severe winter smog with low-emission routines, indoor air hacks, and sustainable alternatives.',
  keywords: [
    'Urban Air Quality',
    'Winter Smog',
    'GenAI Assistant',
    'Corsi-Rosenthal Box',
    'Thermal Inversion',
    'PM2.5 Defense',
    'Prompt Wars'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}


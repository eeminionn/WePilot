import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WePilot — Un viaje más seguro empieza con una conversación',
  description: 'Copiloto conversacional de seguridad vial que ayuda a reconocer el cansancio antes de que se transforme en riesgo.',
  icons: { icon: '/WePilot/favicon.png' },
  metadataBase: new URL('https://eeminionn.github.io/WePilot/'),
  openGraph: {
    title: 'WePilot — Un viaje más seguro empieza con una conversación',
    description: 'Seguridad vial que acompaña, reconoce y ayuda a detenerse a tiempo. Sin cámaras. Sin vigilancia.',
    url: 'https://eeminionn.github.io/WePilot/',
    siteName: 'WePilot',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'WePilot: un viaje más seguro empieza con una conversación.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WePilot — Seguridad vial conversacional',
    description: 'Un viaje más seguro empieza con una conversación.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}

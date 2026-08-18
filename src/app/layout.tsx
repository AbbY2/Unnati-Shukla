import type { Metadata, Viewport } from 'next';
import './globals.css';
import { beVietnamPro } from './fonts';
import { clinic, doctor } from '@/lib/content';
import SmoothScroll from '@/components/providers/SmoothScroll';
import ThemeProvider from '@/components/providers/ThemeProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const siteUrl = 'https://unnatiretina.clinic';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${clinic.name} — Advanced Retina Care in ${clinic.city}`,
    template: `%s · ${clinic.name}`,
  },
  description: `${clinic.name}, ${clinic.city}. ${doctor.name}, ${doctor.role}. Advanced retina imaging, vitreoretinal surgery and compassionate, personalised care to protect and restore your vision.`,
  keywords: [
    'retina clinic Ahmedabad',
    'vitreoretinal surgeon',
    'diabetic retinopathy',
    'retinal detachment',
    'macular degeneration',
    'OCT scan',
    'retina specialist Gujarat',
    doctor.name,
  ],
  authors: [{ name: doctor.name }],
  openGraph: {
    type: 'website',
    title: `${clinic.name} — Advanced Retina Care`,
    description: `Cinematic retina care with ${doctor.name}. World-class technology, compassionate treatment.`,
    url: siteUrl,
    siteName: clinic.name,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${clinic.name} — Advanced Retina Care`,
    description: `World-class retina care in ${clinic.city} with ${doctor.name}.`,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: '#04101f',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: clinic.name,
  medicalSpecialty: 'Ophthalmology',
  address: {
    '@type': 'PostalAddress',
    addressLocality: clinic.city,
    addressRegion: clinic.state,
    addressCountry: 'IN',
  },
  physician: {
    '@type': 'Physician',
    name: doctor.name,
    medicalSpecialty: 'Ophthalmology',
  },
  url: siteUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={beVietnamPro.variable} suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <ScrollProgress />
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

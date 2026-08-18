import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/ui/FloatingContact';

import Hero from '@/sections/Hero';
import JourneyIntoVision from '@/sections/JourneyIntoVision';
import WhyRetina from '@/sections/WhyRetina';
import Conditions from '@/sections/Conditions';
import Technology from '@/sections/Technology';
import AIRetinaScan from '@/sections/AIRetinaScan';
import Doctor from '@/sections/Doctor';
import PatientJourney from '@/sections/PatientJourney';
import VisionSimulator from '@/sections/VisionSimulator';
import VisionTimeline from '@/sections/VisionTimeline';
import Testimonials from '@/sections/Testimonials';
import Stats from '@/sections/Stats';
import Locations from '@/sections/Locations';
import Booking from '@/sections/Booking';
import FinalCTA from '@/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <JourneyIntoVision />
        <WhyRetina />
        <Conditions />
        <Technology />
        <AIRetinaScan />
        <Doctor />
        <PatientJourney />
        <VisionSimulator />
        <VisionTimeline />
        <Testimonials />
        <Stats />
        <Locations />
        <Booking />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

import { GateProvider } from './context/GateContext';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingPetals } from './components/FloatingPetals';
import { AudioFloatingButton } from './components/AudioFloatingButton';
import { HeroSection } from './components/HeroSection';
import { SaveTheDateCard } from './components/SaveTheDateCard';
import { FamilyBlessingsSection } from './components/FamilyBlessingsSection';
import { EventDetailsSection } from './components/EventDetailsSection';
import { VenueSection } from './components/VenueSection';
import { BlessingSection } from './components/BlessingSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  return (
    <GateProvider>
      <main className="relative bg-parchment">
        <ScrollProgress />
        <FloatingPetals />
        <AudioFloatingButton />
        <HeroSection />
        <SaveTheDateCard />
        <FamilyBlessingsSection />
        <EventDetailsSection />
        <VenueSection />
        <BlessingSection />
        <FooterSection />
      </main>
    </GateProvider>
  );
}

import AboutHero from './AboutHero';
import Mission from './Mission';
import Values from './Values';
import Journey from './Journey';
import Team from './Team';
import Commitment from './Commitment';

export default function AboutPageComponent() {
  return (
    <main className="bg-white dark:bg-[#0f1219] transition-colors duration-300 overflow-x-clip">
      {/* About Page Sections */}
      <AboutHero />
      <Mission />
      <Values />
      {/* <Journey /> */}
      <Team />
      <Commitment />
    </main>
  );
}

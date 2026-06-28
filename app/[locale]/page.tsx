import GdgEventBanner from '../../components/GdgEventBanner';
import HeroSection from '../../components/HeroSection';
import NavBar from '../../components/NavBar';
import ProjectsSection from '../../components/ProjectsSection';

export default async function Home() {
  return (
    <main>
      <GdgEventBanner />
      <NavBar />
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}


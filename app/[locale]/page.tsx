import HeroSection from '../../components/HeroSection';
import NavBar from '../../components/NavBar';
import ProjectsSection from '../../components/ProjectsSection';

export default async function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}


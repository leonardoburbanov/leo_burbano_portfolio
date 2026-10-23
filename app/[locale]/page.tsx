import { setRequestLocale } from 'next-intl/server';
import HeroSection from '../../components/HeroSection';
import NavBar from '../../components/NavBar';
import CaseStudySection from '../../components/CaseStudySection';
import ExperienceSection from '../../components/ExperienceSection';
import LinkedInPostsSection from '../../components/LinkedInPostsSection';
import ProjectsSection from '../../components/ProjectsSection';
import SpeakingSection from '../../components/SpeakingSection';
import LatestPostsSection from '../../components/LatestPostsSection';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/motion/ScrollProgress';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollProgress />
      <NavBar />
      <main>
        <HeroSection />
        <CaseStudySection />
        <ExperienceSection />
        <LinkedInPostsSection />
        <ProjectsSection />
        <SpeakingSection />
        <LatestPostsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

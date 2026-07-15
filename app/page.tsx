import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AssessmentSection } from "./components/AssessmentSection";
import { NotForEveryOrg } from "./components/NotForEveryOrg";
import { VideoSection } from "./components/VideoSection";
import { ProcessSteps } from "./components/ProcessSteps";
import { ScheduleSection } from "./components/ScheduleSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Header />
      <main className="flex-1">
        <Hero />
        <VideoSection />
        <AssessmentSection />
        <NotForEveryOrg />
        <ProcessSteps />
        <ScheduleSection />
      </main>
      <Footer />
    </div>
  );
}

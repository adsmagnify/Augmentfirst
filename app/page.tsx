import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PainSection } from "./components/PainSection";
import { AssessmentSection } from "./components/AssessmentSection";
import { VideoSection } from "./components/VideoSection";
import { ProcessSteps } from "./components/ProcessSteps";
import { NotForEveryOrg } from "./components/NotForEveryOrg";
import { ScheduleSection } from "./components/ScheduleSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="page-atmosphere flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-24 sm:pb-28">
        <Hero />
        <VideoSection />
        <PainSection />
        <AssessmentSection />
        <ProcessSteps />
        <NotForEveryOrg />
        <ScheduleSection />
      </main>
      <Footer />
    </div>
  );
}

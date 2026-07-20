import { AssessmentForm } from "./AssessmentForm";
import { ProblemTable } from "./ProblemTable";

export function AssessmentSection() {
  return (
    <section id="assessment" className="scroll-mt-24 py-12 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.95fr] lg:items-start lg:gap-14">
          <ProblemTable />
          <div className="lg:sticky lg:top-24">
            <AssessmentForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}

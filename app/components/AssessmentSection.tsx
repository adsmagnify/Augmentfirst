import { AssessmentForm } from "./AssessmentForm";
import { ProblemTable } from "./ProblemTable";

export function AssessmentSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <ProblemTable />
        <div className="lg:sticky lg:top-8">
          <AssessmentForm compact />
        </div>
      </div>
    </section>
  );
}

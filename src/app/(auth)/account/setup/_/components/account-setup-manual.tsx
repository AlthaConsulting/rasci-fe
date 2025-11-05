// import { CheckCircle } from "@phosphor-icons/react";
// import { Fragment } from "react";
// import { defineStepper } from "@stepperize/react";

// import { Progress } from "@altha/core/components/ui/progress";
// import { Separator } from "@altha/core/components/ui/separator";
// import { cn } from "@altha/core/lib/utils";
// import { useMediaQuery } from "@altha/core/hooks/use-media-query";

// import { FormalEducationForm } from "./forms/formal-education-form";
// import { PersonalInformationForm } from "./forms/personal-information-form";
// import { WorkingExperienceForm } from "./forms/working-experience-form";
// import { ReviewSubmission } from "./forms/review-submission";

// const { useStepper, utils } = defineStepper(
//   { id: "personal_information", label: "Personal Information" },
//   { id: "formal_education", label: "Formal Education" },
//   { id: "working_experience", label: "Working Experience" },
//   { id: "review_submit", label: "Review & Submit" }
// );

// export const AccountSetupManual = ({
//   backFn,
//   nextFn,
// }: {
//   backFn: () => void;
//   nextFn: () => void;
// }) => {
//   const isDesktop = useMediaQuery("(min-width: 1024px)");
//   const stepper = useStepper();

//   return (
//     <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-8">
//       {isDesktop ? (
//         <aside className="shrink-0 self-start sticky top-[140px] left-0 hidden lg:flex flex-col gap-2 p-4 rounded-lg border">
//           {stepper.all.map((step, index, items) => (
//             <Fragment key={step.id}>
//               <button
//                 className={cn(
//                   "flex items-center gap-2 px-3 py-1.5 rounded disabled:pointer-events-none",
//                   utils.getIndex(stepper.current.id) ===
//                     utils.getIndex(step.id) && "text-primary bg-accent"
//                 )}
//                 disabled={
//                   utils.getIndex(stepper.current.id) <= utils.getIndex(step.id)
//                 }
//                 onClick={() => stepper.goTo(step.id)}
//               >
//                 <CheckCircle
//                   className={cn(
//                     "size-4 shrink-0",
//                     utils.getIndex(stepper.current.id) >
//                       utils.getIndex(step.id) && "text-primary"
//                   )}
//                   weight={
//                     utils.getIndex(stepper.current.id) > utils.getIndex(step.id)
//                       ? "fill"
//                       : "regular"
//                   }
//                 />
//                 <span className="font-semibold">{step.label}</span>
//               </button>
//               {index !== items.length - 1 && <Separator />}
//             </Fragment>
//           ))}
//         </aside>
//       ) : (
//         <header className="flex flex-col items-center justify-center gap-4">
//           <p className="text-heading-small text-primary">
//             {stepper.current.label}
//           </p>
//           <Progress
//             value={
//               ((utils.getIndex(stepper.current.id) + 1) /
//                 (stepper.all.length + 1)) *
//               100
//             }
//           />
//         </header>
//       )}

//       <section className="flex-1">
//         {stepper.switch({
//           personal_information: () => (
//             <PersonalInformationForm backFn={backFn} nextFn={stepper.next} />
//           ),
//           formal_education: () => (
//             <FormalEducationForm backFn={stepper.prev} nextFn={stepper.next} />
//           ),
//           working_experience: () => (
//             <WorkingExperienceForm
//               backFn={stepper.prev}
//               nextFn={stepper.next}
//             />
//           ),
//           review_submit: () => (
//             <ReviewSubmission backFn={stepper.prev} nextFn={nextFn} />
//           ),
//         })}
//       </section>
//     </div>
//   );
// };

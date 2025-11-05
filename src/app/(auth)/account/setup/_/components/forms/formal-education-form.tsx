// "use client";

// import { Plus, Trash } from "@phosphor-icons/react";
// import { useFieldArray } from "react-hook-form";
// import { useState } from "react";

// import { Button } from "@altha/core/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@altha/core/components/ui/card";
// import { Form } from "@altha/core/components/ui/form";
// import { Separator } from "@altha/core/components/ui/separator";

// import { AcademicTranscriptsField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/academic-transcripts-field";
// import { DegreeField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/degree-field";
// import { EndDateField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/end-date-field";
// import { FieldOfStudyField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/field-of-study-field";
// import { GPAField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/gpa-field";
// import { IjazahField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/ijazah-field";
// import { InstitutionNameField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/institution-name-field";
// import { StartDateField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/start-date-field";
// import { StillStudyingField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/still-studying-field";

// import { useFormalEducationForm } from "../../hooks/use-formal-education-form";

// export const FormalEducationForm = ({
//   backFn,
//   nextFn,
// }: {
//   backFn: () => void;
//   nextFn: () => void;
// }) => {
//   const [addNow, setAddNow] = useState<boolean>(true);

//   const { form, loading, submitHandler } = useFormalEducationForm({
//     onSubmitted: () => {
//       nextFn();
//     },
//   });

//   const educationFields = useFieldArray({
//     name: "educations",
//     control: form.control,
//   });

//   const addEducation = () => {
//     educationFields.append({
//       academic_transcripts: [],
//       degree: "",
//       end_date: undefined,
//       field_of_study: "",
//       gpa: "",
//       ijazah: [],
//       institution_name: "",
//       start_date: undefined as unknown as Date,
//       still_studying: false,
//     });
//   };

//   const Header = () => {
//     return (
//       <CardHeader>
//         <CardTitle>Formal Education</CardTitle>
//         <CardDescription>
//           List your formal education details, including degrees and
//           institutions.
//         </CardDescription>
//       </CardHeader>
//     );
//   };

//   if (!addNow) {
//     return (
//       <div className="flex flex-col gap-8">
//         <Card>
//           {Header()}
//           <CardFooter className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
//             <Button
//               className="order-2 md:order-1 flex-1"
//               variant="outline"
//               onClick={nextFn}
//             >
//               Add Later
//             </Button>
//             <Button
//               className="order-1 md:order-2 flex-1"
//               onClick={() => setAddNow(true)}
//             >
//               Add Now
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <Form {...form}>
//       <form className="flex flex-col gap-8" onSubmit={submitHandler}>
//         <Card>
//           {Header()}
//           <CardContent className="space-y-4">
//             {educationFields.fields.map((field, index) => (
//               <div key={field.id} className="flex flex-col gap-4">
//                 <header className="flex items-center gap-6 lg:py-2">
//                   <p className="text-base font-semibold">
//                     Education {index + 1}
//                   </p>
//                   <Separator className="flex-1" />
//                   {index !== 0 && (
//                     <Button
//                       className="text-destructive hover:text-destructive hover:bg-destructive/5"
//                       onClick={() => educationFields.remove(index)}
//                       type="button"
//                       variant="ghost"
//                     >
//                       <Trash /> Delete
//                     </Button>
//                   )}
//                 </header>
//                 <InstitutionNameField
//                   name={`educations.${index}.institution_name`}
//                 />
//                 <div className="grid xl:grid-cols-2 gap-[inherit]">
//                   <FieldOfStudyField
//                     name={`educations.${index}.field_of_study`}
//                   />
//                   <DegreeField name={`educations.${index}.degree`} />
//                 </div>
//                 <GPAField name={`educations.${index}.gpa`} />
//                 <div className="grid xl:grid-cols-2 gap-[inherit]">
//                   <StartDateField name={`educations.${index}.start_date`} />
//                   <div className="flex flex-col gap-1.5">
//                     <EndDateField
//                       disabledIf={form.watch(
//                         `educations.${index}.still_studying`
//                       )}
//                       name={`educations.${index}.end_date`}
//                     />
//                     <StillStudyingField
//                       name={`educations.${index}.still_studying`}
//                       relatedTo={`educations.${index}.end_date`}
//                     />
//                   </div>
//                 </div>
//                 <div className="grid xl:grid-cols-2 gap-[inherit]">
//                   <AcademicTranscriptsField
//                     name={`educations.${index}.academic_transcripts`}
//                   />
//                   <IjazahField name={`educations.${index}.ijazah`} />
//                 </div>
//               </div>
//             ))}
//             <div className="flex items-center gap-6 lg:py-2">
//               <div className="flex-1 border-b border-dashed" />
//               <Button
//                 className="text-primary hover:text-primary hover:bg-primary/5"
//                 onClick={addEducation}
//                 type="button"
//                 variant="ghost"
//               >
//                 <Plus /> Add education
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//         <footer className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
//           <Button
//             className="order-2 md:order-1 flex-1"
//             disabled={loading}
//             type="button"
//             variant="outline"
//             onClick={backFn}
//           >
//             Back
//           </Button>
//           <Button
//             className="order-1 md:order-2 flex-1"
//             disabled={loading}
//             loading={loading}
//           >
//             Next
//           </Button>
//         </footer>
//       </form>
//     </Form>
//   );
// };

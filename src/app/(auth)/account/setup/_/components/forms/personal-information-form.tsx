// "use client";

// import { Button } from "@altha/core/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@altha/core/components/ui/card";
// import { Form } from "@altha/core/components/ui/form";
// import { Separator } from "@altha/core/components/ui/separator";

// import { ApplicationSourceField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/application-source-field";
// import { CVField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/cv-field";
// import { CityField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/city-field";
// import { DateOfBirthField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/date-of-birth-field";
// import { EmailField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/email-field";
// import { ExpectedSalaryField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/expected-salary-field";
// import { FullNameField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/full-name-field";
// import { GenderField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/gender-field";
// import { InterestStatusField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/interest-status-field";
// import { PhoneNumberField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/phone-number-field";
// import { ProfilePictureField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/profile-picture-field";
// import { ProvinceField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/province-field";
// import { StreetAddressField } from "@altha/app/(web)/(app)/account/profile/_/components/form-blocks/street-address-field";

// import { usePersonalInformationForm } from "../../hooks/use-personal-information-form";

// export const PersonalInformationForm = ({
//   backFn,
//   nextFn,
// }: {
//   backFn: () => void;
//   nextFn: () => void;
// }) => {
//   const { form, loading, submitHandler } = usePersonalInformationForm({
//     onSubmitted: () => {
//       nextFn();
//     },
//   });

//   return (
//     <Form {...form}>
//       <form className="flex flex-col gap-8" onSubmit={submitHandler}>
//         <Card>
//           <CardHeader>
//             <CardTitle>Personal Information</CardTitle>
//             <CardDescription>
//               Fill in your essential personal details to complete your profile.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
//             <div className="w-full flex items-center justify-center md:w-auto md:block">
//               <ProfilePictureField name="Bram Adl" profile_picture="" />
//             </div>
//             <div className="w-full md:w-auto md:flex-1 flex flex-col gap-4">
//               <FullNameField name="personal_information.full_name" />
//               <DateOfBirthField name="personal_information.date_of_birth" />
//               <GenderField name="personal_information.gender" />
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Contact Details</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-4">
//             <div className="grid md:grid-cols-2 gap-4">
//               <EmailField name="contact_details.email" />
//               <PhoneNumberField name="contact_details.phone_number" />
//             </div>
//             <div className="flex flex-col gap-4">
//               <header className="flex items-center gap-6 py-2">
//                 <p className="text-base font-semibold">Current Address</p>
//                 <Separator className="flex-1" />
//               </header>
//               <StreetAddressField name="contact_details.current_address.street_address" />
//               <div className="grid md:grid-cols-2 gap-4">
//                 <CityField name="contact_details.current_address.city" />
//                 <ProvinceField name="contact_details.current_address.province" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Application Details</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-4">
//             <CVField />
//             <ExpectedSalaryField name="application_details.expected_salary" />
//             <div className="grid md:grid-cols-2 gap-4">
//               <InterestStatusField name="application_details.interest_status" />
//               <ApplicationSourceField name="application_details.application_source" />
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

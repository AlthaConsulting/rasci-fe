// import { NotePencil } from "@phosphor-icons/react";

// import { Button } from "@altha/core/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@altha/core/components/ui/card";
// import { Checkbox } from "@altha/core/components/ui/checkbox";
// import { Label } from "@altha/core/components/ui/label";

// export const ReviewSubmission = ({
//   backFn,
//   nextFn,
// }: {
//   backFn: () => void;
//   nextFn: () => void;
// }) => {
//   return (
//     <div className="flex flex-col lg:gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             Personal Information
//             <Button
//               className="w-7 h-7 rounded-full text-primary"
//               size="icon"
//               variant="outline"
//             >
//               <NotePencil />
//             </Button>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="divide-y -my-4">
//             <li className="flex flex-col gap-1 py-4">
//               <p>
//                 <strong className="mr-2 font-semibold">Full Name:</strong>
//                 Ally Louks
//               </p>
//               <p>
//                 <strong className="mr-2 font-semibold">Date of Birth:</strong>
//                 09 September 1999
//               </p>
//               <p>
//                 <strong className="mr-2 font-semibold">Gender:</strong>
//                 Female
//               </p>
//             </li>
//             <li className="flex flex-col gap-1 py-4">
//               <p>
//                 <strong className="mr-2 font-semibold">Email:</strong>
//                 allylk@gmail.com
//               </p>
//               <p>
//                 <strong className="mr-2 font-semibold">Phone Number:</strong>
//                 +6281234567890
//               </p>
//               <p>
//                 <strong className="mr-2 font-semibold">Address:</strong>
//                 Jl. Prof. Dr. Satrio, Jakarta Selatan, DKI Jakarta.
//               </p>
//             </li>
//             <li className="flex flex-col gap-1 py-4">
//               <p>
//                 <strong className="mr-2 font-semibold">CV:</strong>
//                 <span className="text-primary">12390809321908301931.pdf</span>
//               </p>
//               <p>
//                 <strong className="mr-2 font-semibold">Salary:</strong>
//                 Rp50.000.000
//               </p>
//               <p>
//                 <strong className="mr-2 font-semibold">
//                   Interest in Opportunities:
//                 </strong>
//                 Open to Opportunities
//               </p>
//             </li>
//           </ul>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             Formal Education
//             <Button
//               className="w-7 h-7 rounded-full text-primary"
//               size="icon"
//               variant="outline"
//             >
//               <NotePencil />
//             </Button>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="divide-y -my-4">
//             <li className="flex flex-col gap-1 py-4">
//               <p className="font-semibold">Universitas Indonesia</p>
//               <p className="text-muted-foreground">Sep 2012 - Sep 2016</p>
//               <p>Bachelor Degree • Management</p>
//               <p>GPA 3.90</p>
//             </li>
//           </ul>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             Working Experience
//             <Button
//               className="w-7 h-7 rounded-full text-primary"
//               size="icon"
//               variant="outline"
//             >
//               <NotePencil />
//             </Button>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="divide-y -my-4">
//             <li className="flex flex-col gap-1 py-4">
//               <p className="font-semibold">PT ABC</p>
//               <p>Analyst</p>
//               <p className="text-muted-foreground">Aug 2016 - Jan 2017</p>
//             </li>
//             <li className="flex flex-col gap-1 py-4">
//               <p className="font-semibold">PT ABC</p>
//               <p>Analyst</p>
//               <p className="text-muted-foreground">Aug 2016 - Jan 2017</p>
//             </li>
//           </ul>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle>Consent</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>
//             By checking the box below, I consent to Altha Consulting retaining
//             my personal information for up to 5 years as outlined in the Privacy
//             Policy. I understand that my data will be used solely for
//             recruitment purposes, and I may withdraw my consent or request data
//             deletion at any time.
//           </p>
//         </CardContent>
//         <CardFooter>
//           <div className="flex items-center gap-2">
//             <Checkbox id="tnc-consent" />
//             <Label htmlFor="tnc-consent">Accept terms and conditions</Label>
//           </div>
//         </CardFooter>
//       </Card>
//       <footer className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
//         <Button
//           className="order-2 md:order-1 flex-1"
//           variant="outline"
//           onClick={backFn}
//         >
//           Back
//         </Button>
//         <Button className="order-1 md:order-2 flex-1" onClick={nextFn}>
//           Submit
//         </Button>
//       </footer>
//     </div>
//   );
// };

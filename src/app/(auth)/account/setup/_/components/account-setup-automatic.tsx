import { Button } from "@altha/core/components/ui/button";

// import { FailedCVIllustration } from "./setup-options/failed-cv-illustration";
import { SuccessCVIllustration } from "./illustrations/success-cv-illustration";

export const AccountSetupAutomatic = ({
  nextFn,
}: {
  cv?: File;
  nextFn: () => void;
}) => {
  return (
    <div className="max-w-[300px] mx-auto">
      <SuccessFeedback onReviewed={nextFn} />
    </div>
  );
};

// const FailedFeedback = () => {
//   return (
//     <div className="flex flex-col items-center justify-center text-center gap-4">
//       <FailedCVIllustration />
//       <p className="text-heading-medium-semibold">Unable to Scan Your CV</p>
//       <p>
//         We couldn&apos;t extract the information from your CV. Please ensure
//         it&apos;s in an ATS-friendly format, with clear, readable text and a
//         supported file type.
//       </p>
//       <div className="w-full flex flex-col gap-2">
//         <Button className="w-full">Try Again</Button>
//         <p>
//           Prefer manual input?{" "}
//           <button className="text-primary font-semibold">
//             Fill out the form manually instead
//           </button>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

const SuccessFeedback = ({ onReviewed }: { onReviewed: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <SuccessCVIllustration />
      <p className="text-heading-medium-semibold">CV Scanned Successfully!</p>
      <p>
        We&apos;ve filled out your profile based on the information in your CV.
        Please review the details and make any necessary adjustments before
        submitting.
      </p>
      <Button className="w-full" onClick={onReviewed}>
        Review Profile
      </Button>
    </div>
  );
};

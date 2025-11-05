// "use client";

// import { defineStepper } from "@stepperize/react";
// import { useNavigationGuard } from "next-navigation-guard";

// import { AccountSetupAutomatic } from "./account-setup-automatic";
// import { AccountSetupCompleted } from "./account-setup-completed";
// import { AccountSetupIntroduction } from "./account-setup-introduction";
// import { AccountSetupManual } from "./account-setup-manual";
// import { AccountSetupOption } from "./account-setup-option";
// import { useState } from "react";

// const { useStepper } = defineStepper(
//   { id: "introduction" },
//   { id: "setup_option" },
//   { id: "setup_automatic" },
//   { id: "setup_manual" },
//   { id: "final_step" }
// );

// export const AccountSetup = () => {
//   const stepper = useStepper({ initialStep: "introduction" });

//   const [enabled, setEnabled] = useState<boolean>(false);
//   useNavigationGuard({ enabled });

//   return stepper.switch({
//     introduction: () => (
//       <AccountSetupIntroduction
//         nextFn={() => {
//           stepper.next();
//           setEnabled(true);
//         }}
//       />
//     ),
//     setup_option: () => (
//       <AccountSetupOption
//         onCVSelected={(cv) => {
//           stepper.setMetadata("setup_automatic", { cv });
//           stepper.goTo("setup_automatic");
//         }}
//         onManualSelected={() => stepper.goTo("setup_manual")}
//       />
//     ),
//     setup_automatic: () => (
//       <AccountSetupAutomatic
//         cv={stepper.metadata.setup_automatic?.cv}
//         nextFn={() => stepper.goTo("setup_manual")}
//       />
//     ),
//     setup_manual: () => (
//       <AccountSetupManual
//         backFn={() => stepper.goTo("setup_option")}
//         nextFn={stepper.next}
//       />
//     ),
//     final_step: () => <AccountSetupCompleted />,
//   });
// };

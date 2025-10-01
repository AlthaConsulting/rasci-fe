import {
  AlertDrawer,
  AlertDrawerClose,
  AlertDrawerContent,
  AlertDrawerDescription,
  AlertDrawerFooter,
  AlertDrawerHeader,
  AlertDrawerTitle,
  AlertDrawerTrigger,
} from "@altha/core/components/ui/alert-drawer";
import { ScrollArea } from "@altha/core/components/ui/scroll-area";

export const PrivacyPolicyLetter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AlertDrawer>
      <AlertDrawerTrigger asChild>{children}</AlertDrawerTrigger>
      <AlertDrawerContent>
        <AlertDrawerHeader>
          <AlertDrawerTitle className="text-left">
            Privacy Policy
          </AlertDrawerTitle>
          <AlertDrawerDescription className="sr-only">
            Read our privacy policy carefully
          </AlertDrawerDescription>
        </AlertDrawerHeader>
        <PrivacyPolicy />
        <AlertDrawerFooter className="hidden md:flex">
          <AlertDrawerClose className="flex-1">Close</AlertDrawerClose>
        </AlertDrawerFooter>
      </AlertDrawerContent>
    </AlertDrawer>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="p-4 md:p-0">
      <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px] rounded-md border">
        <div className="prose text-sm w-full max-w-none p-4">
          <h3 className="mt-0 text-base">
            Privacy Policy for Recruitment Process
          </h3>
          <p>
            We value your privacy and are committed to protecting your personal
            data. By proceeding with your application, you consent to the
            collection, use, and storage of your personal information for
            recruitment purposes as outlined below:
          </p>
          <ol>
            <li>
              <p className="font-semibold">Personal Data Collected:</p>
              <ul>
                <li>Full name, contact details, date of birth, and address.</li>
                <li>
                  Educational background, work history, and certifications.
                </li>
                <li>
                  Additional information you provide in your CV, cover letter,
                  or during the recruitment process.
                </li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">Purpose of Data Collection:</p>
              <ul>
                <li>
                  To evaluate your qualifications for the position you applied
                  for.
                </li>
                <li>To communicate with you during the recruitment process.</li>
                <li>To comply with legal obligations related to employment.</li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">Data Retention:</p>
              <p>
                Your personal data will be retained for 5 years after the
                recruitment process. If you wish to withdraw your data, you can
                contact us at hr@altha.co.id.
              </p>
            </li>
            <li>
              <p className="font-semibold">Your Rights:</p>
              <ul>
                <li>To access, correct, or delete your personal data.</li>
                <li>
                  To withdraw your consent at any time, which may impact your
                  application process.
                </li>
              </ul>
              <p>
                For more details, please refer to our full{" "}
                <a
                  className="text-[#2B6EB2]"
                  href="https://www.altha.co.id/en-ID/privacy-policy"
                  rel="nofollow"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </li>
          </ol>
        </div>
      </ScrollArea>
    </div>
  );
};

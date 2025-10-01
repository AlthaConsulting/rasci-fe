import GoogleReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

import { captcha } from "../api/captcha";

export const ReCAPTCHA = ({
  setVerification,
}: {
  setVerification: (verified: boolean) => void;
}) => {
  const recaptchaRef = useRef<GoogleReCAPTCHA>(null);
  async function handleCaptchaSubmission(token: string | null) {
    if (token) {
      try {
        await captcha({ token });
        setVerification(true);
      } catch {
        setVerification(false);
      }
    }
  }

  return (
    <GoogleReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
      onChange={handleCaptchaSubmission}
      onExpired={() => setVerification(false)}
    />
  );
};

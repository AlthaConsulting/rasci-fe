import { Button } from "@altha/core/components/ui/button";

export const AccountSetupIntroduction = ({
  nextFn,
}: {
  nextFn: () => void;
}) => {
  return (
    <div className="max-w-[300px] mx-auto flex flex-col gap-8">
      <article className="prose prose-sm max-w-none">
        <h1 className="text-heading-medium-semibold">
          Welcome to Altha Consulting Careers!
        </h1>
        <p>
          Congratulations! Your account is now active, and you&apos;re just one
          step away from exploring exciting career opportunities with us.
        </p>
        <p>
          To proceed, <strong>please complete your profile</strong>. It&apos;s a
          mandatory step that helps us understand your background and
          qualifications better.
        </p>
        <section>
          <strong>What You&apos;ll Need:</strong>
          <ul>
            <li>Your most recent CV</li>
            <li>Academic Transcript</li>
            <li>
              Graduate Certificate (optional if you&apos;re currently enrolled
              in college)
            </li>
          </ul>
        </section>
        <p>We recommend keeping these documents ready before starting.</p>
      </article>
      <Button onClick={nextFn}>Complete Profile</Button>
    </div>
  );
};

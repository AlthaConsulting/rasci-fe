import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

import { CVIllustration } from "./illustrations/cv-illustration";
import { ManualIllustration } from "./illustrations/manual-illustration";

export const AccountSetupOption = ({
  onCVSelected,
  onManualSelected,
}: {
  onCVSelected(file: File): void;
  onManualSelected(): void;
}) => {
  const { getInputProps, getRootProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length) {
        const file = acceptedFiles[0];
        onCVSelected(file);
      }
    },
    onDropRejected(rejectedFiles) {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          toast.error(`File ${file.name} was rejected`, {
            description: errors.map((error) => error.message).join(", "),
            descriptionClassName: "!text-destructive",
          });
        });
      }
    },
  });

  return (
    <div className="max-w-[300px] mx-auto flex flex-col gap-8">
      <article className="prose prose-sm max-w-none text-center">
        <h1 className="text-heading-medium-semibold">
          How would you like to complete your profile?
        </h1>
        <p>
          You can choose to manually fill out the form or upload your CV in{" "}
          <strong>PDF format</strong>, and we&apos;ll extract the details to
          save you time. For the best results, we recommend an ATS-friendly
          format to ensure accurate processing.
        </p>
      </article>
      <div className="flex flex-col gap-4">
        <Option {...getRootProps({ className: "dropzone" })} label="Upload CV">
          <input {...getInputProps()} />
          <CVIllustration />
        </Option>
        <Option label="Manual Input" onClick={onManualSelected}>
          <ManualIllustration />
        </Option>
      </div>
    </div>
  );
};

const Option = ({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="relative flex flex-col items-center gap-2 p-3 rounded-lg border shadow transition"
      onClick={onClick}
    >
      {children}
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
};

"use client";

import * as React from "react";
import Image from "next/image";
import { FileText, X } from "@phosphor-icons/react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import { toast } from "sonner";

import { cn, formatBytes } from "@altha/core/lib/utils";
import { useControllableState } from "@altha/core/hooks/use-controllable-state";
import { Button } from "@altha/core/components/ui/button";
import { Progress } from "@altha/core/components/ui/progress";
import { ScrollArea } from "@altha/core/components/ui/scroll-area";

export interface FileUploaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[];

  /**
   * Function to be called when the value changes.
   * @type (files: File[]) => void
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onValueChange?: (files: File[]) => void;

  /**
   * Function to be called when files are uploaded.
   * @type (files: File[]) => Promise<void>
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type Record<string, number> | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps["accept"];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 1 // 1MB
   * @example maxSize={1024 * 1024 * 1} // 1MB
   */
  maxSize?: DropzoneProps["maxSize"];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFileCount={4}
   */
  maxFileCount?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;

  /**
   * Name of the input used on form.
   * @type string
   * @default undefined
   * @example "files"
   */
  name?: string;
}

export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (props, ref) => {
    const {
      value: valueProp,
      onValueChange,
      onUpload,
      progresses,
      accept = {
        "image/*": [],
      },
      maxSize = 1024 * 1024 * 1,
      maxFileCount = 1,
      multiple = false,
      name,
      disabled = false,
      className,
      ...dropzoneProps
    } = props;

    const [files, setFiles] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
    });

    const onDrop = React.useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
          toast.error("Cannot upload more than 1 file at a time");
          return;
        }

        if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
          toast.error(`Cannot upload more than ${maxFileCount} files`);
          return;
        }

        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        const updatedFiles = files ? [...files, ...newFiles] : newFiles;

        setFiles(updatedFiles);

        if (rejectedFiles.length > 0) {
          rejectedFiles.forEach(({ file, errors }) => {
            toast.error(`File ${file.name} was rejected`, {
              description: errors.map((error) => error.message).join(", "),
              descriptionClassName: "!text-destructive",
            });
          });
        }

        if (
          onUpload &&
          updatedFiles.length > 0 &&
          updatedFiles.length <= maxFileCount
        ) {
          const target =
            updatedFiles.length > 0 ? `${updatedFiles.length} files` : `file`;

          toast.promise(onUpload(updatedFiles), {
            loading: `Uploading ${target}...`,
            success: () => {
              setFiles([]);
              return `${target} uploaded`;
            },
            error: `Failed to upload ${target}`,
          });
        }
      },

      [files, maxFileCount, multiple, onUpload, setFiles]
    );

    function onRemove(index: number) {
      if (!files) return;
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onValueChange?.(newFiles);
    }

    // Revoke preview url when component unmounts
    React.useEffect(() => {
      return () => {
        if (!files) return;
        files.forEach((file) => {
          if (isFileWithPreview(file)) {
            URL.revokeObjectURL(file.preview);
          }
        });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isDisabled = React.useMemo(
      () => disabled || (files?.length ?? 0) >= maxFileCount,
      [disabled, files?.length, maxFileCount]
    );

    const isMultiple = React.useMemo(
      () => maxFileCount > 1 || multiple,
      [maxFileCount, multiple]
    );

    return (
      <div ref={ref} className="relative flex flex-col gap-4">
        <Dropzone
          onDrop={onDrop}
          accept={accept}
          maxSize={maxSize}
          maxFiles={maxFileCount}
          multiple={isMultiple}
          disabled={isDisabled}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={cn(
                "group relative w-full h-10 flex items-center rounded-md border border-input bg-background px-3 py-2 ring-offset-background text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive cursor-pointer",
                isDragActive && "bg-secondary",
                isDisabled && "pointer-events-none opacity-60",
                className
              )}
              {...dropzoneProps}
            >
              <input {...getInputProps()} name={name} />
              <div className="flex items-center">
                <p className="font-medium px-1.5">
                  Choose File{isMultiple ? "s" : ""}
                </p>
                <p className="pl-1">
                  {files?.length
                    ? `${files?.length} selected`
                    : "No file choosen"}
                </p>
              </div>
            </div>
          )}
        </Dropzone>
        {files?.length ? (
          <ScrollArea className="h-fit w-full">
            <div className="flex max-h-48 flex-col gap-4">
              {files?.map((file, index) => (
                <FileCard
                  key={index}
                  file={file}
                  onRemove={() => onRemove(index)}
                  progress={progresses?.[file.name]}
                />
              ))}
            </div>
          </ScrollArea>
        ) : null}
      </div>
    );
  }
);
FileUploader.displayName = "FileUploader";

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
  return (
    <div className="relative flex items-start gap-2.5">
      <div className="flex flex-1 gap-2.5">
        {isFileWithPreview(file) ? <FilePreview file={file} /> : null}
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatBytes(file.size)}
            </p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7"
          onClick={onRemove}
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return "preview" in file && typeof file.preview === "string";
}

interface FilePreviewProps {
  file: File & { preview: string };
}

function FilePreview({ file }: FilePreviewProps) {
  if (file.type.startsWith("image/")) {
    return (
      <Image
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    );
  }

  return (
    <FileText className="size-10 text-muted-foreground" aria-hidden="true" />
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type UseFormReturn } from "react-hook-form";
import { type ClassValue, clsx } from "clsx";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formErrorHandler(
  error: AxiosError<{ errors: ApiResponseError[] }, any>,
  form: UseFormReturn<any>
) {
  if (error.status === 400 && error.response) {
    const { errors } = error.response.data;
    errors.forEach((error, index) => {
      if (error.param) {
        form.setError(
          error.param,
          { message: error.message },
          { shouldFocus: index === 0 }
        );
      }
    });
  } else {
    try {
      if (error.response) {
        const { errors } = error.response.data;
        toast.error(errors[0].message);
      } else {
        console.error(error);
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytes" : sizes[i] ?? "Bytes"
  }`;
}

export function toCamelCase(string: string): string {
  return string
    .toLowerCase()
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase());
}

export const fetchFileFromUrl = async (url: string) => {
  try {
    const base = process.env.NEXT_PUBLIC_API_CAREER_URL || "";
    const fullUrl = url.startsWith("http")
      ? url
      : new URL(url, base).toString(); 

    const response = await fetch(fullUrl);
    if (!response.ok) throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);

    const blob = await response.blob();
    const filename = decodeURIComponent(fullUrl.split("/").pop() || "file");
    const file = new File([blob], filename, { type: blob.type });

    Object.assign(file, { preview: fullUrl });

    return [file];
  } catch (error: any) {
    console.error("fetchFileFromUrl error:", error);
    const err = new Error("Failed to fetch file from URL");
    (err as any).cause = error;
    throw err;
  }
};




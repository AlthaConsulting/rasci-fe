import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function highlightApiError(errors: BaseApiError[]) {
  return {
    from<T extends FieldValues>(form: UseFormReturn<T>) {
      if (!errors) return;
      errors.forEach((error) => {
        if (error.param) {
          form.setError(
            error.param as Path<T>,
            { message: error.message, type: error.code },
            { shouldFocus: true }
          );
        }
      });
    },
  };
}

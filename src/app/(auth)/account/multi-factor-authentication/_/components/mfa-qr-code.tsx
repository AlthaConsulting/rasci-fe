"use client";

import { toast } from "sonner";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export const MfaQrCode = ({ url }: { url?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (url && canvasRef.current) {
      const canvas = canvasRef.current;
      const size = 200;

      canvas.width = size;
      canvas.height = size;

      QRCode.toCanvas(canvasRef.current, decodeURIComponent(url), (error) => {
        if (error) toast.error(error.message);
      });
    }
  }, [url]);

  return (
    <div className="flex items-center justify-center">
      {url ? (
        <canvas ref={canvasRef} style={{ width: "200px", height: "200px" }} />
      ) : (
        <div className="w-[200px] h-[200px] bg-secondary animate-pulse" />
      )}
    </div>
  );
};

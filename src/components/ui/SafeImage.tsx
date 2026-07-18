"use client";
import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

type SafeImageProps = Omit<ImageProps, "onError"> & {
  fallbackSrc?: string;
};

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/placeholder-puja.png",
  ...props
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  return (
    <>
      {errored ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 text-amber-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 mb-2 opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs text-amber-500 font-medium px-2 text-center">
            {alt || "Image not available"}
          </span>
        </div>
      ) : (
        <Image
          {...props}
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
        />
      )}
    </>
  );
}

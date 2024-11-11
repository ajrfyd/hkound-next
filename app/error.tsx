"use client";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";
import Image from "next/image";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  const router = useRouter();

  const resetHandler = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <main>
      <div className="section-xs">
        <div className="container-fluid text-center">
          <Image
            src="/images/error.png"
            alt="error-image"
            width={640}
            height={320}
          />
          <h1 className="display-1 fw-medium mb-0">{error.name}</h1>
          <h2 className="display-9 mt-2">{error.message}</h2>
          <button className="button button-outline mt-4" onClick={resetHandler}>
            재 시 도
          </button>
        </div>
      </div>
    </main>
  );
};

export default Error;

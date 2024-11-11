"use client";
import React, { useCallback, useEffect, useState } from "react";

const ScrollToTopBtn = () => {
  const [position, setPosition] = useState(0);
  const [bottom, setBottom] = useState(0);

  const moveToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [],
  );

  const positionSetter = useCallback(
    (position: number) => setPosition(position),
    [],
  );

  useEffect(() => {
    setPosition(window.scrollY);
    setBottom(document.documentElement.scrollHeight - window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", (_) => {
      positionSetter(window.scrollY);
    });

    return () => {
      window.removeEventListener("scroll", (_) =>
        positionSetter(window.scrollY),
      );
    };
  }, [position]);

  return (
    <div
      onClick={moveToTop}
      className={`scroll-button ${position === 0 || bottom === position ? "" : "show"}`}
    >
      <i className="bi bi-arrow-up-circle"></i>
    </div>
  );
};

export default ScrollToTopBtn;

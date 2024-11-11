"use client";
import React, { useEffect } from "react";

const BackDrop = () => {
  useEffect(() => {
    const backDropHandler = (e: MouseEvent) => {
      const { target } = e;
      if (!target) return;
      const cl = (target as HTMLDivElement).classList;
      if (!cl.length) return;

      for (let i of cl) {
        if (i === "back-drop") {
          return;
        }
      }
      // console.log((target as HTMLDivElement)?.classList);
    };

    window.addEventListener("click", backDropHandler);

    return () => {
      window.removeEventListener("click", backDropHandler);
    };
  }, []);

  return <div className="back-drop"></div>;
};

export default BackDrop;

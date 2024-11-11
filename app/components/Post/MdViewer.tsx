"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import FluidSection from "./FluidSection";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"));

type MDViewerProps = {
  content: string;
};

const MDViewer = ({ content }: MDViewerProps) => {
  const editorRef = useRef<HTMLPreElement>(null);
  const [n, setN] = useState(700);

  useEffect(() => {
    if (!editorRef.current) return;
    setN(+editorRef.current.clientHeight + 100);
  }, []);

  return (
    <FluidSection>
      <div className="mdx-container">
        <MDEditor
          value={content}
          preview="preview"
          data-color-mode="light"
          hideToolbar
          height={n}
          // className="tex/t-center"
        />
        <pre ref={editorRef} aria-disabled>
          {content}
        </pre>
      </div>
    </FluidSection>
  );
};

export default MDViewer;

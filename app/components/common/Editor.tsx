"use client";
import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import * as commands from "@uiw/react-md-editor/commands";
import dynamic from "next/dynamic";
import FluidSection from "@/components/Post/FluidSection";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"));

const Editor = () => {
  return (
    <FluidSection>
      <MDEditor
        preview="live"
        commands={[commands.codeBlock, commands.code, commands.comment]}
        data-color-mode="light"
        previewOptions={{
          allowedElements: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "p",
            "a",
            "sapn",
            "br",
          ],
        }}
      />
    </FluidSection>
  );
};

export default Editor;

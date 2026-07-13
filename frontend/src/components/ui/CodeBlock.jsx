"use client";

import { useState } from "react";

import {
  Copy,
  Check,
} from "lucide-react";

import toast from "react-hot-toast";

export default function CodeBlock({
  code,
  language = "bash",
}) {
  const [copied, setCopied] =
    useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        code
      );

      setCopied(true);

      toast.success("Copied");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error(
        "Failed to copy"
      );
    }
  };

  return (
    <div
      className="
      overflow-hidden

      rounded-2xl

      border
      border-slate-800

      bg-slate-950
      "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between

        border-b
        border-slate-800

        px-4
        py-3
        "
      >
        <span
          className="
          text-xs
          uppercase
          tracking-wider

          text-slate-500
          "
        >
          {language}
        </span>

        <button
          onClick={handleCopy}
          className="
          flex
          items-center
          gap-2

          rounded-lg

          px-3
          py-1.5

          text-sm

          text-slate-400

          transition-colors

          hover:bg-slate-800
          hover:text-orange-400
          "
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}

      <pre
        className="
        overflow-x-auto

        p-5

        text-sm

        text-orange-400
        "
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
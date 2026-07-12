import Card from "@/components/ui/Card";
import { useEffect, useRef, useState } from "react";
import {
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

export default function QuickStartCard({
  apiKey,
}) {
    const [copiedItem, setCopiedItem] = useState(false);
    const copyTimeoutRef = useRef(null);

    useEffect(() => {
      return () => {
        if (copyTimeoutRef.current) {
          clearTimeout(copyTimeoutRef.current);
        }
      };
    }, []);


    const installCommand =
  "npm install pingnest";

const snippet = `import pingNest from "pingnest";

app.use(
  pingNest({
    apiKey: "${apiKey}",
    service: "my-service",
  })
);`;


    const handleCopy = async (
  text,
  type
) => {
  try {

    await navigator.clipboard
      .writeText(text);
      

    setCopiedItem(type);

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    copyTimeoutRef.current = setTimeout(() => {
      setCopiedItem(null);
    }, 2000);

  } catch {
    toast.error("Failed to copy");

  }
};

  return (
    <Card>
      <div
        className="
        flex
        justify-between
        items-center
        mb-4
      "
      >
        <h2
          className="
          text-lg
          font-semibold
          "
        >
          Quick Start
        </h2>

      </div>

      <div className="space-y-4">
        <div>

  <div
    className="
    flex
    justify-between
    items-center
    mb-2
    "
  >
    <p
      className="
      text-sm
      text-gray-500
      "
    >
      Install SDK
    </p>

    <button
      onClick={() =>
        handleCopy(
          installCommand,
          "install"
        )
      }
      className="
      flex
      items-center
      gap-1
      text-sm
      "
    >
      {copiedItem ===
      "install" ? (
        <>
          <Check size={16}/>
          Copied
        </>
      ) : (
        <>
          <Copy size={16}/>
          Copy
        </>
      )}
    </button>

  </div>

  <pre
    className="
    bg-gray-100
    p-3
    rounded
    "
  >
    {installCommand}
  </pre>

</div>

       <div>

  <div
    className="
    flex
    justify-between
    items-center
    mb-2
    "
  >
    <p
      className="
      text-sm
      text-gray-500
      "
    >
      Add Middleware
    </p>

    <button
      onClick={() =>
        handleCopy(
          snippet,
          "snippet"
        )
      }
      className="
      flex
      items-center
      gap-1
      text-sm
      "
    >
      {copiedItem ===
      "snippet" ? (
        <>
          <Check size={16}/>
          Copied
        </>
      ) : (
        <>
          <Copy size={16}/>
          Copy
        </>
      )}
    </button>
    

  </div>

  <pre
    className="
    bg-gray-100
    p-3
    rounded
    overflow-x-auto
    text-sm
    "
  >
    {snippet}
  </pre>

</div>
      </div>
    </Card>
  );
}

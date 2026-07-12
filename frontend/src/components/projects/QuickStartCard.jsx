import Card from "@/components/ui/Card";
import { useState } from "react";
import {
  Copy,
  Check,
} from "lucide-react";

export default function QuickStartCard({
  apiKey,
}) {
    const [copied, setCopied] = useState(false);
    const [copiedItem, setCopiedItem] = useState(false);


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

    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);

  } catch (error) {

    console.error(error);

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
import { createFileRoute } from "@tanstack/react-router";
import PriorityWithTanstack from "../../components/with-tanstack";
import { useState } from "react";

export default function TanstackQuerySample() {
  const [priority, setPriority] = useState("low");

  const handlePriority = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPriority(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col mt-4">
      <h1 className="text-3xl font-bold">Sample Using useQuery</h1>

      <div className="mt-4 flex gap-4">
        <button className="border p-2" value="low" onClick={handlePriority}>
          Low
        </button>
        <button className="border p-2" value="medium" onClick={handlePriority}>
          Medium
        </button>
        <button className="border p-2" value="high" onClick={handlePriority}>
          High
        </button>
      </div>

      <PriorityWithTanstack priority={priority} />
    </div>
  );
}

export const Route = createFileRoute("/tanstack-query/")({
  component: TanstackQuerySample,
});

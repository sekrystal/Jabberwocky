
import * as React from "react";
import PiiToggle from "./PiiToggle";

type Props = {
  enabled: boolean;
  setEnabled: (e: boolean) => void;
};

export default function InterceptControls({ enabled, setEnabled }: Props) {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-3 mt-2 mb-2">
      <span className={
        enabled
          ? "bg-red-500/90 text-white font-semibold text-sm rounded-full px-4 py-1 drop-shadow select-none"
          : "bg-gray-900 text-gray-400 font-semibold text-sm rounded-full px-4 py-1 select-none"}>
        Live PII Intercept Log {enabled ? "ON" : "OFF"}
      </span>
      <PiiToggle enabled={enabled} onToggle={setEnabled} />
    </div>
  );
}

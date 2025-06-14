
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { enablePiiInterception, disablePiiInterception } from "../lib/snifferjs-mock";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

type Props = {
  enabled: boolean;
  onToggle: (state: boolean) => void;
  showClickHint?: boolean; // NEW: for "Click to ..." message below
};

export default function PiiToggle({ enabled, onToggle, showClickHint }: Props) {
  const [switchAnim, setSwitchAnim] = React.useState(false);

  const handleSwitch = (checked: boolean) => {
    onToggle(checked);
    setSwitchAnim(true);
    if (checked) {
      enablePiiInterception();
      toast({ title: "Protection enabled", description: "Intercepting & spoofing PII/device info." });
    } else {
      disablePiiInterception();
      toast({ title: "Protection disabled", description: "Stopped intercepting outgoing data." });
    }
    setTimeout(() => setSwitchAnim(false), 600);
  };

  return (
    <div className={`flex flex-col gap-0 items-start`}>
      <div
        className={`flex items-center gap-3 transition-all duration-300 ${
          enabled
            ? "scale-105 drop-shadow-[0_2px_12px_rgba(239,68,68,0.18)]"
            : "opacity-80"
        } ${switchAnim ? "animate-pulse" : ""}`}
        title="Toggle PII shielding ON/OFF anytime. No data ever leaves your computer."
      >
        <Switch
          id="pii-toggle"
          checked={enabled}
          onCheckedChange={handleSwitch}
          className="border-red-400 border-2"
        />
        <span
          className={`px-2 py-0.5 rounded text-xs font-mono transition-all ${
            enabled
              ? "bg-red-100/80 text-red-700 border-red-400 border font-bold"
              : "bg-gray-700/80 text-gray-300 border border-gray-400"
          }`}
          aria-live="polite"
        >
          {enabled ? "ON" : "OFF"}
        </span>
      </div>
      {showClickHint && (
        <span className="text-xs text-muted-foreground mt-1 pl-1 italic select-none">
          (Click to {enabled ? "disable" : "enable"})
        </span>
      )}
    </div>
  );
}

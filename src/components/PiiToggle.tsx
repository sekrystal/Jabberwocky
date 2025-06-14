
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { enablePiiInterception, disablePiiInterception } from "../lib/snifferjs-mock";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck, Bug } from "lucide-react";

type Props = {
  enabled: boolean;
  onToggle: (state: boolean) => void;
};

export default function PiiToggle({ enabled, onToggle }: Props) {
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
    // End anim after a short time
    setTimeout(() => setSwitchAnim(false), 600);
  };

  return (
    <div
      className={`flex items-center gap-3 transition-all duration-300 ${
        enabled
          ? "scale-105 drop-shadow-[0_2px_12px_rgba(34,197,94,0.30)]"
          : "opacity-80"
      } ${switchAnim ? "animate-pulse" : ""}`}
      title="Toggle PII shielding ON/OFF anytime. No data ever leaves your computer."
    >
      <Switch
        id="pii-toggle"
        checked={enabled}
        onCheckedChange={handleSwitch}
        className="border-green-400 border-2"
      />
      <label
        htmlFor="pii-toggle"
        className="text-lg font-semibold cursor-pointer select-none flex gap-2 items-center"
      >
        <ShieldCheck className="text-green-400" size={22} />
        Live PII Intercept
        <span className="ml-2 text-xs font-normal text-muted-foreground hidden sm:inline">
          (Click to {enabled ? "disable" : "enable"})
        </span>
      </label>
      <span
        className={`px-2 py-0.5 rounded text-xs font-mono transition-all ${
          enabled
            ? "bg-green-100/80 text-green-700 border-green-400 border font-bold"
            : "bg-gray-600/60 text-gray-200 border border-gray-400"
        }`}
        aria-live="polite"
      >
        {enabled ? "ON" : "OFF"}
      </span>
    </div>
  );
}

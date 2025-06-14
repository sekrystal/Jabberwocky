
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { enablePiiInterception, disablePiiInterception } from "../lib/snifferjs-mock";
import { toast } from "@/hooks/use-toast";

type Props = {
  enabled: boolean;
  onToggle: (state: boolean) => void;
};

export default function PiiToggle({ enabled, onToggle }: Props) {
  const handleSwitch = (checked: boolean) => {
    onToggle(checked);
    if (checked) {
      enablePiiInterception();
      toast({ title: "Protection enabled", description: "Intercepting PII/device info" });
    } else {
      disablePiiInterception();
      toast({ title: "Protection disabled", description: "No longer intercepting" });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Switch id="pii-toggle" checked={enabled} onCheckedChange={handleSwitch} />
      <label htmlFor="pii-toggle" className="text-lg font-semibold cursor-pointer select-none">
        Live PII Intercept
      </label>
      <span className={`px-2 py-0.5 rounded text-xs font-mono ${enabled ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
        {enabled ? "ON" : "OFF"}
      </span>
    </div>
  );
}


import * as React from "react";
import { Info } from "lucide-react";

export default function HelpPopover() {
  const [open, setOpen] = React.useState(true);

  if (!open) return null;
  return (
    <div className="fixed z-50 top-5 right-5 max-w-sm bg-card border border-border shadow-xl rounded-xl p-6 animate-fade-in flex gap-3">
      <div>
        <Info className="text-blue-400 mb-2" size={28} />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">How this works</h3>
        <p className="text-sm text-muted-foreground mb-2">
          <span className="font-medium text-foreground">Privacy Shield</span> detects and live-scrambles PII/device info <em>before</em> it is ever sent by your browser—without breaking site functionality.
        </p>
        <ul className="text-sm list-disc pl-5 text-muted-foreground mb-2">
          <li>No account or login required.</li>
          <li>Nothing leaves your device. No cloud, no analytics.</li>
          <li>Turn it ON with the toggle. Intercepts are shown live below.</li>
        </ul>
        <button
          className="text-xs font-medium rounded px-2 py-1 mt-1 bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
          onClick={() => setOpen(false)}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

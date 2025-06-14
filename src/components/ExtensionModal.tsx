
import * as React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, ExternalLink } from "lucide-react";

// Simulate extension popup modal
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ExtensionModal({ open, onClose }: Props) {
  const [enabled, setEnabled] = React.useState(true);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6 w-80 bg-black border-red-800 text-white font-sans">
        <DialogTitle className="mb-2 flex items-center gap-2 text-lg text-red-400">
          <ShieldCheck className="text-red-400" size={22} />
          Jabberwocky
        </DialogTitle>
        <DialogDescription className="text-gray-300 mb-3 text-base">
          PII Intercept Shield
        </DialogDescription>
        <div className="flex items-center justify-between gap-4 my-4">
          <span className="text-white font-semibold">Protection</span>
          <Switch id="pii-modal-toggle" checked={enabled} onCheckedChange={setEnabled} className="border-red-400 border-2" />
          <span className={`ml-3 px-2 py-0.5 rounded text-xs font-mono ${enabled ? "bg-red-100/80 text-red-700 border-red-400 border font-bold" : "bg-gray-700/80 text-gray-300 border border-gray-400"}`}>{enabled ? "ON" : "OFF"}</span>
        </div>
        <hr className="border-t border-gray-800 my-3" />
        <a
          href="/"
          className="flex gap-2 items-center justify-center mt-2 text-xs text-red-400 hover:text-white transition"
          target="_blank" rel="noopener"
        >
          Go to Dashboard <ExternalLink size={14} />
        </a>
      </DialogContent>
    </Dialog>
  );
}

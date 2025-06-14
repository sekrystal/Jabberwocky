
import * as React from "react";
import { Download, Trash2 } from "lucide-react";
import { InterceptRecord } from "../lib/snifferjs-mock";

type Props = {
  records: InterceptRecord[];
  onClear: () => void;
  onDownload: () => void;
};

export default function InterceptLogActions({ records, onClear, onDownload }: Props) {
  return (
    <div className="flex gap-3 mt-4 justify-center">
      <button
        onClick={onClear}
        className="px-3 py-1 bg-gray-800 hover:bg-red-800 text-white transition-colors rounded text-xs font-semibold border border-red-900 flex items-center gap-1"
      >
        <Trash2 size={14} className="inline mr-1" />Clear
      </button>
      <button
        onClick={onDownload}
        className="px-3 py-1 bg-gray-800 hover:bg-red-800 text-white transition-colors rounded text-xs font-semibold border border-red-900 flex items-center gap-1"
      >
        <Download size={14} className="inline mr-1" />Download CSV
      </button>
    </div>
  );
}

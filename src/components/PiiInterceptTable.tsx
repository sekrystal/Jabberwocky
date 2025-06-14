
import * as React from "react";
import type { InterceptRecord } from "../lib/snifferjs-mock";

type Props = {
  records: InterceptRecord[];
};

export default function PiiInterceptTable({ records }: Props) {
  return (
    <div className="bg-white rounded-lg shadow border border-muted p-0 overflow-auto max-h-[370px]">
      <table className="min-w-full text-sm table-auto">
        <thead>
          <tr className="bg-secondary text-secondary-foreground sticky top-0">
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Original Value</th>
            <th className="px-4 py-2 text-left">Replaced With</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No intercepted data yet.</td>
            </tr>
          ) : (
            records.map((rec, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-gray-50"}>
                <td className="px-4 py-2 font-mono text-xs">{rec.time}</td>
                <td className="px-4 py-2">{rec.type}</td>
                <td className="px-4 py-2 font-mono whitespace-nowrap max-w-[230px] truncate" title={rec.original}>{rec.original}</td>
                <td className="px-4 py-2 font-mono whitespace-nowrap max-w-[240px] truncate text-primary" title={rec.replaced}>{rec.replaced}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

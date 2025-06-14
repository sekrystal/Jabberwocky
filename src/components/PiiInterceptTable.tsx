
import * as React from "react";
import type { InterceptRecord } from "../lib/snifferjs-mock";

// User-friendly BinaryDivider: faded, subtle, with a tooltip for clarity.
function BinaryDivider() {
  // Fixed repeated pattern for performance; can be randomized if desired
  const binary =
    "01010110010100111011000101101001010110101010101100010101101010110110101101";
  return (
    <tr>
      <td colSpan={4} className="px-0 py-1 bg-black group hover:bg-gray-900 transition-colors">
        <div className="w-full flex items-center justify-center relative">
          <span
            className="font-mono text-xs tracking-wider select-none"
            style={{
              color: "#67686b",
              opacity: 0.28,
              whiteSpace: "nowrap",
              letterSpacing: "2px",
              userSelect: "none",
              fontWeight: 600,
              pointerEvents: "auto",
              transition: "opacity 0.12s"
            }}
            aria-hidden="true"
            tabIndex={0}
            title="Binary boundary – intercepted events are separated for clarity."
          >
            {binary.repeat(4).slice(0, 68)}
          </span>
        </div>
      </td>
    </tr>
  );
}

type Props = {
  records: InterceptRecord[];
};

export default function PiiInterceptTable({ records }: Props) {
  return (
    <div className="rounded-lg shadow border border-red-900 border-opacity-40 p-0 overflow-auto max-h-[370px] bg-black">
      <table className="min-w-full text-sm table-auto bg-black text-white border-separate border-spacing-0">
        <thead>
          <tr className="bg-black text-white sticky top-0 z-10 border-b border-red-900">
            <th className="px-4 py-2 text-left font-bold">Time</th>
            <th className="px-4 py-2 text-left font-bold">Type</th>
            <th className="px-4 py-2 text-left font-bold">Original Value</th>
            <th className="px-4 py-2 text-left font-bold">Replaced With</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground bg-black">
                No intercepted data yet.
              </td>
            </tr>
          ) : (
            records.flatMap((rec, idx) => [
              <tr
                key={idx}
                className="bg-black even:bg-black border-b border-red-900/30"
                style={{ borderBottomWidth: "0px" }}
              >
                <td className="px-4 py-2 font-mono text-xs">{rec.time}</td>
                <td className="px-4 py-2">{rec.type}</td>
                <td
                  className="px-4 py-2 font-mono whitespace-nowrap max-w-[200px] truncate"
                  title={rec.original}
                >
                  {rec.original}
                </td>
                <td
                  className="px-4 py-2 font-mono whitespace-nowrap max-w-[220px] truncate text-red-500"
                  title={rec.replaced}
                >
                  {rec.replaced}
                </td>
              </tr>,
              // Insert a faded binary divider after every row except last
              idx < records.length - 1 ? <BinaryDivider key={`divider-${idx}`} /> : null,
            ])
          )}
        </tbody>
      </table>
    </div>
  );
}

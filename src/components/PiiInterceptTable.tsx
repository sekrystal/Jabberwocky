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

function isValidRecord(record: any): record is InterceptRecord {
  // Validate structure and basic length constraints (can adjust limits as needed)
  return (
    record &&
    typeof record.time === "string" &&
    record.time.length < 64 &&
    typeof record.type === "string" &&
    record.type.length < 120 &&
    typeof record.original === "string" &&
    record.original.length < 1000 &&
    typeof record.replaced === "string" &&
    record.replaced.length < 1000
  );
}

// Helper to safely display strings (truncate at 180 chars for UI, full in tooltip)
function displayCell(text: string, max = 180) {
  if (typeof text !== "string") return "";
  if (text.length <= max) return text;
  return text.slice(0, max) + "…";
}

export default function PiiInterceptTable({ records }: Props) {
  const safeRecords = React.useMemo(
    () => records.filter(isValidRecord),
    [records]
  );

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
          {safeRecords.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground bg-black">
                No intercepted data yet.
              </td>
            </tr>
          ) : (
            safeRecords.flatMap((rec, idx) => [
              <tr
                key={idx}
                className="bg-black even:bg-black border-b border-red-900/30"
                style={{ borderBottomWidth: "0px" }}
              >
                <td className="px-4 py-2 font-mono text-xs">{displayCell(rec.time, 30)}</td>
                <td className="px-4 py-2">{displayCell(rec.type, 70)}</td>
                <td
                  className="px-4 py-2 font-mono whitespace-nowrap max-w-[200px] truncate"
                  title={rec.original}
                >
                  {displayCell(rec.original)}
                </td>
                <td
                  className="px-4 py-2 font-mono whitespace-nowrap max-w-[220px] truncate text-red-500"
                  title={rec.replaced}
                >
                  {displayCell(rec.replaced)}
                </td>
              </tr>,
              // Insert a faded binary divider after every row except last
              idx < safeRecords.length - 1 ? <BinaryDivider key={`divider-${idx}`} /> : null,
            ])
          )}
        </tbody>
      </table>
    </div>
  );
}

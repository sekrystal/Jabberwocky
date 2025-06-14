import * as React from "react";
import PiiToggle from "../components/PiiToggle";
import PiiInterceptTable from "../components/PiiInterceptTable";
import { subscribeToIntercepts, InterceptRecord, enablePiiInterception, disablePiiInterception } from "../lib/snifferjs-mock";
import { ShieldCheck, Bug, Info, Download, Trash2, Shield, Check } from "lucide-react";
import HelpPopover from "../components/HelpPopover";
import MatrixBackground from "../components/MatrixBackground";

const DATA_TYPES = [
  { name: "navigator properties", desc: "userAgent, language, device memory, etc." },
  { name: "document.cookie", desc: "cookies sent by client" },
  { name: "window.location", desc: "referring URLs or redirects" },
  { name: "Form POST fields", desc: "emails, names, IDs (unencrypted)" },
];

function downloadAsCSV(records: InterceptRecord[]) {
  if (!records.length) return;
  const header = ["Time", "Type", "Original Value", "Replaced With"];
  const csv =
    [header, ...records.map(r => [r.time, r.type, r.original, r.replaced])]
      .map(arr => arr.map(v => `"${(v ?? "").replace(/"/g, '""')}"`).join(','))
      .join('\n');
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "pii_intercepts.csv";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

export default function Index() {
  const [enabled, setEnabled] = React.useState(true);
  const [records, setRecords] = React.useState<InterceptRecord[]>([]);

  // Animate card opening
  const mainCardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let unsub = subscribeToIntercepts((event) => {
      setRecords((prev) => [event, ...prev.slice(0, 99)]);
    });
    enablePiiInterception();
    if (mainCardRef.current) mainCardRef.current.classList.add("animate-fade-in");
    return () => {
      disablePiiInterception();
      unsub();
    };
  }, []);

  // Hero/Intro copy - refined for elegance and clarity
  const hero = (
    <div className="flex-1">
      <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 text-white">
        <Shield className="text-red-500" size={36} />
        PII & Device Info Intercept Shield
      </h1>
      <p className="mt-2 md:mt-3 max-w-2xl text-white/90 text-lg leading-relaxed">
        <span className="inline-block font-bold text-red-400 bg-white/[0.05] rounded px-2 py-0.5 mr-2">Private Demo</span>
        Stops unencrypted personal or device info from leaking out—scrambles outgoing data before it leaves your browser.
        <br className="hidden md:inline" />
        <span className="block mt-2 text-sm text-gray-300">
          <span className="font-semibold text-white">No login.</span> <span className="text-red-400">No tracking.</span> <span className="font-semibold text-white">Everything happens 100% on your device.</span>
        </span>
      </p>
    </div>
  );

  // Responsive sidebar navigation (mock: as a vertical panel)
  return (
    <div className="relative min-h-screen flex text-white transition-colors duration-300 bg-black">
      {/* Matrix background, full-viewport, behind all content */}
      <MatrixBackground />

      {/* Sidebar mock */}
      <aside className="hidden md:flex flex-col w-64 bg-[#191c23] border-r border-red-900 border-opacity-60 p-8 min-h-screen shadow-xl z-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <Shield size={52} className="text-red-500 mb-2 drop-shadow" />
          <h1 className="text-2xl font-bold text-center text-white">PII Intercept Shield</h1>
          <p className="text-sm text-gray-400 text-center mt-2 mb-6">
            Your browser privacy—<span className="font-semibold text-red-400">supercharged</span>.
          </p>
        </div>
        <div className="mt-10 text-xs text-gray-400 space-y-2">
          <div className="flex items-center gap-2">
            <Check className="text-red-400" size={16} />
            <span>No login needed</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-red-400" size={16} />
            <span>No cloud data</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-red-400" size={16} />
            <span>Runs 100% local</span>
          </div>
        </div>
        <div className="flex-1" />
        <a href="https://github.com/cyphunk/snifferjs" target="_blank" className="mt-6 text-gray-400 hover:text-red-500 underline text-xs text-center">
          Learn about the real snifferjs
        </a>
        <footer className="pt-12 text-[10px] text-gray-500 text-center">
          <div>
            <span>♥ Privacy First. No tracking ever.</span>
          </div>
        </footer>
      </aside>

      <main className="flex-1 flex flex-col items-center px-2 sm:px-8 pt-8 min-h-screen relative z-10">
        <HelpPopover />

        <div
          ref={mainCardRef}
          className="w-full max-w-4xl mx-auto bg-gradient-to-tr from-[#18181b] via-[#222226] to-[#1a1a1d] rounded-2xl shadow-2xl border border-red-900 border-opacity-50 p-7 sm:p-10 space-y-8 relative animate-fade-in"
        >
          {/* Refined Header + Toggle Layout */}
          <section className="flex flex-col gap-4 pb-2 w-full">
            {hero}
          </section>

          {/* What is protected card */}
          <section className="w-full border border-gray-800 rounded-lg bg-gradient-to-br from-[#18181b]/90 to-[#232324]/95 p-6 mb-4 shadow-md">
            <h2 className="font-bold text-xl flex gap-2 items-center text-white">
              <Info className="text-red-500" size={22} />
              What is protected?
            </h2>
            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-2 mt-4 text-base">
              {DATA_TYPES.map((item, i) => (
                <li key={i} className="pl-2 flex flex-col pb-1">
                  <span className="font-medium text-white">{item.name}</span>
                  <span className="text-gray-400 text-sm">{item.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Live Intercept Log */}
          <section className="w-full">
            <div className="flex flex-col gap-2 mb-2">
              <h3 className="font-semibold text-xl text-white mb-1">Live PII Intercept Log</h3>
              <div className="flex items-center gap-3">
                <PiiToggle
                  enabled={enabled}
                  onToggle={setEnabled}
                  showClickHint
                />
              </div>
            </div>
            <PiiInterceptTable records={records} />
          </section>
        </div>
        {/* Footer privacy badge */}
        <div className="mt-10 mb-2 text-center text-xs text-gray-500">
          <span className="opacity-80">This tool requires no accounts or tracking. All interception stays 100% on your device.</span>
        </div>
      </main>
    </div>
  );
}

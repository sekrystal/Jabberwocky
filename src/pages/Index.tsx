import * as React from "react";
import PiiToggle from "../components/PiiToggle";
import PiiInterceptTable from "../components/PiiInterceptTable";
import { subscribeToIntercepts, InterceptRecord, enablePiiInterception, disablePiiInterception } from "../lib/snifferjs-mock";
import { ShieldCheck, Bug, Info, Download, Trash2, Shield, Check } from "lucide-react";
import HelpPopover from "../components/HelpPopover";
import MatrixBackground from "../components/MatrixBackground";
import ExtensionModal from "../components/ExtensionModal";

// DATA_TYPES same as before
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
  const [showExtensionModal, setShowExtensionModal] = React.useState(false);
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

  // Redesigned Hero/Intro copy - more elegant, concise, privacy-first
  const hero = (
    <div className="flex-1 text-center font-sans">
      <h1 className="text-3xl md:text-4xl font-extrabold flex flex-col items-center justify-center gap-1 text-white">
        <span className="font-brand block text-4xl tracking-tight text-red-400 drop-shadow-sm mb-1">Jabberwocky</span>
        <span className="flex items-center gap-2">
          <Shield className="text-red-500" size={32} />
          <span>PII Intercept Shield</span>
        </span>
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-white/90 text-lg leading-relaxed font-medium">
        <span className="inline-block font-semibold text-red-400 bg-white/[0.05] rounded px-2 py-0.5 mr-2 tracking-wide">PII = <span className="underline decoration-red-400/60">Personally Identifiable Information</span></span>
        <span className="block mt-2 text-xl font-semibold text-white">
          Instantly intercepts and scrambles unencrypted PII/device info before it’s transmitted.
        </span>
        <span className="block mt-2 text-base text-gray-300 font-normal">
          100% private—no accounts, no tracking, no cloud.<br className="hidden sm:inline" />
          PII never leaves your computer. 
        </span>
      </p>
    </div>
  );

  // Side project rationale blurb for the sidebar
  const sidebarBlurb = (
    <div className="mt-8 bg-[#151516] rounded-lg border border-red-900/40 p-4 text-xs text-left text-gray-400 shadow-inner font-medium">
      <div className="font-semibold text-sm text-red-400 mb-2">
        Why Jabberwocky exists
      </div>
      <div>
        <span className="font-bold text-white/90">In June 2024, Google forced ad blockers and privacy extensions to stop working on Chromium (the engine behind Chrome, Edge, and others).</span> 
        <br /><br />
        Suddenly, most people lost meaningful control over their private data and PII flowing from their browser—even before it leaves their machine.
        <br /><br />
        <span className="text-white/90 font-semibold">Jabberwocky</span> was built to prove you can scramble and intercept unencrypted PII (personally identifiable information) before it’s ever exposed—no tracking, no servers, privacy by default.<br />
        Bring your own shield back, whatever Google breaks.
      </div>
    </div>
  );

  // Controls for the log: Clear + Download buttons
  function handleClear() {
    setRecords([]);
  }

  return (
    <div className="relative min-h-screen flex text-white font-sans transition-colors duration-300 bg-black">
      {/* Matrix background, full-viewport */}
      <MatrixBackground />

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#131314] border-r border-red-900 border-opacity-60 p-8 min-h-screen shadow-xl z-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <Shield size={52} className="text-red-500 mb-2 drop-shadow" />
          <h1 className="text-2xl font-bold text-center text-white">Jabberwocky</h1>
          <p className="text-sm text-gray-400 text-center mt-2 mb-6">
            Your PII privacy—<span className="font-semibold text-red-400">supercharged</span>.
          </p>
        </div>
        {sidebarBlurb}
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
        <button
          className="mt-6 text-red-400 hover:text-red-500 underline text-xs text-center font-semibold"
          onClick={() => setShowExtensionModal(true)}
        >
          Browser extension preview
        </button>
        <footer className="pt-12 text-[10px] text-gray-500 text-center">
          <div>
            <span>♥ Privacy First. No tracking ever.</span>
          </div>
        </footer>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-2 sm:px-8 pt-8 min-h-screen relative z-10 font-sans">
        <HelpPopover />

        <div
          ref={mainCardRef}
          className="w-full max-w-4xl mx-auto bg-gradient-to-tr from-[#0b0b0d] via-[#131314] to-[#17171a] rounded-2xl shadow-2xl border border-red-900 border-opacity-50 p-7 sm:p-10 space-y-8 relative animate-fade-in"
        >
          {/* Hero */}
          <section className="flex flex-col gap-4 pb-2 w-full">
            {hero}
          </section>
          {/* Centered ON indicator */}
          <section className="w-full flex flex-col items-center mt-0 mb-2">
            <div className="flex flex-row items-center justify-center gap-3 mt-2 mb-4">
              <span className={enabled
                ? "bg-red-500/90 text-white font-semibold text-sm rounded-full px-4 py-1 drop-shadow"
                : "bg-gray-900 text-gray-400 font-semibold text-sm rounded-full px-4 py-1"}>
                Live PII Intercept Log {enabled ? "ON" : "OFF"}
              </span>
              {/* The toggle is now in the log control bar; so we just show ON/OFF here */}
            </div>
          </section>

          {/* Log Controls and Toggle */}
          <section className="w-full flex flex-row flex-wrap items-center justify-between mb-1 gap-y-2">
            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="px-3 py-1 bg-gray-800 hover:bg-red-800 text-white transition-colors rounded text-xs font-semibold border border-red-900"
              >
                <Trash2 size={14} className="inline mr-1" />Clear
              </button>
              <button
                onClick={() => downloadAsCSV(records)}
                className="px-3 py-1 bg-gray-800 hover:bg-red-800 text-white transition-colors rounded text-xs font-semibold border border-red-900"
              >
                <Download size={14} className="inline mr-1" />Download CSV
              </button>
            </div>
            <div className="flex flex-col items-center">
              <PiiToggle enabled={enabled} onToggle={setEnabled} />
              <span className="text-xs text-muted-foreground mt-1 italic select-none">
                (Click to {enabled ? "disable" : "enable"})
              </span>
            </div>
          </section>

          {/* What is protected? */}
          <section className="w-full border border-gray-900 rounded-lg bg-gradient-to-br from-[#101012]/95 to-[#1b1b1e]/97 p-6 mb-4 shadow-md">
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
            <PiiInterceptTable records={records} />
          </section>
        </div>
        <div className="mt-10 mb-2 text-center text-xs text-gray-500">
          <span className="opacity-80">Jabberwocky keeps all intercepted PII logs on your device. No tracking. 100% private.</span>
        </div>
      </main>
      {/* Extension modal preview */}
      {showExtensionModal && (
        <ExtensionModal open={showExtensionModal} onClose={() => setShowExtensionModal(false)} />
      )}
    </div>
  );
}

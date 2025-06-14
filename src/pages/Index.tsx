
import * as React from "react";
import PiiToggle from "../components/PiiToggle";
import PiiInterceptTable from "../components/PiiInterceptTable";
import { subscribeToIntercepts, InterceptRecord, enablePiiInterception, disablePiiInterception } from "../lib/snifferjs-mock";
import { ShieldCheck, Bug, Info, Download, Trash2, Shield, Check } from "lucide-react";
import HelpPopover from "../components/HelpPopover";
import MatrixBackground from "../components/MatrixBackground";

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
    <div className="flex-1 text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-3 text-white">
        <Shield className="text-red-500" size={36} />
        PII & Device Info Intercept Shield
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-white/90 text-lg leading-relaxed font-medium">
        <span className="inline-block font-extrabold text-red-400 bg-white/[0.05] rounded px-2 py-0.5 mr-2 tracking-wide">Private Demo</span>
        Instantly scrambles sensitive personal and device info before it can ever leave your browser.
        <span className="block mt-1.5 text-base text-gray-300 font-normal">
          No login, no tracking, no accounts—100% private and local.
        </span>
      </p>
    </div>
  );

  // Side project rationale blurb for the sidebar
  const sidebarBlurb = (
    <div className="mt-8 bg-[#151516] rounded-lg border border-red-900/40 p-4 text-xs text-left text-gray-400 shadow-inner font-medium">
      <div className="font-semibold text-sm text-red-400 mb-2">
        Why I built this
      </div>
      <div>
        As of June 2024, Google forced ad blockers and privacy extensions to stop working on Chromium browsers. Most users lost meaningful control over what leaks from their browser.<br /><br />
        <span className="text-white/90 font-semibold">This project</span> proves it's possible to intercept and scramble unencrypted data—giving privacy back, with zero tracking or server dependency.<br /><br />
        Bring your privacy shield to every session, no matter what Google changes.
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen flex text-white transition-colors duration-300 bg-black">
      {/* Matrix background, full-viewport */}
      <MatrixBackground />

      {/* Sidebar mock */}
      <aside className="hidden md:flex flex-col w-64 bg-[#131314] border-r border-red-900 border-opacity-60 p-8 min-h-screen shadow-xl z-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <Shield size={52} className="text-red-500 mb-2 drop-shadow" />
          <h1 className="text-2xl font-bold text-center text-white">PII Intercept Shield</h1>
          <p className="text-sm text-gray-400 text-center mt-2 mb-6">
            Your browser privacy—<span className="font-semibold text-red-400">supercharged</span>.
          </p>
        </div>
        {/* Sidebar blurb about Google/ad blockers */}
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
          className="w-full max-w-4xl mx-auto bg-gradient-to-tr from-[#0b0b0d] via-[#18181b] to-[#17181a] rounded-2xl shadow-2xl border border-red-900 border-opacity-50 p-7 sm:p-10 space-y-8 relative animate-fade-in"
        >
          {/* Hero section */}
          <section className="flex flex-col gap-4 pb-2 w-full">
            {hero}
          </section>

          {/* Live intercept title & toggle */}
          <section className="flex flex-col items-center gap-2 w-full mb-2">
            <h3 className="font-semibold text-xl text-white text-center mb-1">Live PII Intercept Log</h3>
            <div className="flex flex-row gap-3 items-center justify-center">
              <PiiToggle enabled={enabled} onToggle={setEnabled} showClickHint />
            </div>
          </section>

          {/* What is protected card */}
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
        {/* Footer privacy badge */}
        <div className="mt-10 mb-2 text-center text-xs text-gray-500">
          <span className="opacity-80">This tool requires no accounts or tracking. All interception stays 100% on your device.</span>
        </div>
      </main>
    </div>
  );
}

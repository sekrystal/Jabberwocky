import * as React from "react";
import PiiToggle from "../components/PiiToggle";
import PiiInterceptTable from "../components/PiiInterceptTable";
import { subscribeToIntercepts, InterceptRecord, enablePiiInterception, disablePiiInterception } from "../lib/snifferjs-mock";
import { Check, Shield } from "lucide-react";
import HelpPopover from "../components/HelpPopover";
import MatrixBackground from "../components/MatrixBackground";
import ExtensionModal from "../components/ExtensionModal";
import HeroSection from "../components/HeroSection";
import SidebarBlurb from "../components/SidebarBlurb";
import DataTypeList from "../components/DataTypeList";
import InterceptControls from "../components/InterceptControls";
import InterceptLogActions from "../components/InterceptLogActions";

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

  function handleClear() {
    setRecords([]);
  }

  return (
    <div className="relative min-h-screen flex text-white font-sans transition-colors duration-300 bg-black">
      <MatrixBackground />

      <aside className="hidden md:flex flex-col w-64 bg-[#131314] border-r border-red-900 border-opacity-60 p-8 min-h-screen shadow-xl z-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <Shield size={52} className="text-red-500 mb-2 drop-shadow" />
          <h1 className="text-2xl font-bold text-center text-white">Jabberwocky</h1>
          <p className="text-sm text-gray-400 text-center mt-2 mb-6">
            Your PII privacy—<span className="font-semibold text-red-400">supercharged</span>.
          </p>
        </div>
        <SidebarBlurb />
        <div className="mt-10 text-xs text-gray-400 space-y-2">
          <div className="flex items-center gap-2"><Check className="text-red-400" size={16} /><span>No login needed</span></div>
          <div className="flex items-center gap-2"><Check className="text-red-400" size={16} /><span>No cloud data</span></div>
          <div className="flex items-center gap-2"><Check className="text-red-400" size={16} /><span>Runs 100% local</span></div>
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

      <main className="flex-1 flex flex-col items-center px-2 sm:px-8 pt-8 min-h-screen relative z-10 font-sans">
        <HelpPopover />

        <div
          ref={mainCardRef}
          className="w-full max-w-4xl mx-auto bg-gradient-to-tr from-[#0b0b0d] via-[#131314] to-[#17171a] rounded-2xl shadow-2xl border border-red-900 border-opacity-50 p-7 sm:p-10 space-y-8 relative animate-fade-in"
        >
          {/* Hero */}
          <section className="flex flex-col gap-4 pb-2 w-full">
            <HeroSection />
          </section>

          {/* Intercept Controls */}
          <section className="w-full flex flex-col items-center mt-0 mb-4">
            <InterceptControls enabled={enabled} setEnabled={setEnabled} />
          </section>

          {/* What is protected */}
          <DataTypeList />

          {/* Live Intercept Log */}
          <section className="w-full">
            <PiiInterceptTable records={records} />
            <InterceptLogActions
              records={records}
              onClear={handleClear}
              onDownload={() => downloadAsCSV(records)}
            />
          </section>
        </div>
        <div className="mt-10 mb-2 text-center text-xs text-gray-500">
          <span className="opacity-80">Jabberwocky keeps all intercepted PII logs on your device. No tracking. 100% private.</span>
        </div>
      </main>

      {showExtensionModal && (
        <ExtensionModal open={showExtensionModal} onClose={() => setShowExtensionModal(false)} />
      )}
    </div>
  );
}

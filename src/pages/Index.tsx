
import * as React from "react";
import PiiToggle from "../components/PiiToggle";
import PiiInterceptTable from "../components/PiiInterceptTable";
import { subscribeToIntercepts, InterceptRecord, enablePiiInterception, disablePiiInterception } from "../lib/snifferjs-mock";
import { ShieldCheck, Bug, Info } from "lucide-react";

const DATA_TYPES = [
  { name: "navigator properties", desc: "userAgent, language, device memory, etc." },
  { name: "document.cookie", desc: "cookies sent by client" },
  { name: "window.location", desc: "referring URLs or redirects" },
  { name: "Form POST fields", desc: "emails, names, IDs (unencrypted)" },
];

export default function Index() {
  const [enabled, setEnabled] = React.useState(true);
  const [records, setRecords] = React.useState<InterceptRecord[]>([]);

  React.useEffect(() => {
    let unsub = subscribeToIntercepts((event) => {
      setRecords((prev) => [event, ...prev.slice(0, 99)]);
    });
    enablePiiInterception();
    return () => {
      disablePiiInterception();
      unsub();
    };
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-start py-10">
      <div className="w-full max-w-5xl space-y-8">
        <section className="flex flex-col md:flex-row gap-7 md:items-center pb-4 md:justify-between w-full">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
              <ShieldCheck className="text-green-500" size={36} />
              PII & Device Info Intercept Shield
            </h1>
            <p className="text-lg mt-2 md:mt-4 max-w-2xl text-muted-foreground">
              Instantly identifies and scrambles browser-transmitted unencrypted PII and device information, protecting your privacy without breaking website functionality.
              <span className="ml-2 inline-block"><Bug size={16} className="inline text-accent" /> Experimental Preview</span>
            </p>
          </div>
          <div className="shrink-0 pt-4 md:pt-0 md:pl-4">
            <PiiToggle enabled={enabled} onToggle={setEnabled} />
          </div>
        </section>

        <section className="w-full border rounded-lg bg-card p-6 mb-4 shadow-md">
          <h2 className="font-bold text-xl flex gap-2 items-center">
            <Info className="text-blue-400" size={22} />
            What is protected?
          </h2>
          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-2 mt-4 text-base">
            {DATA_TYPES.map((item, i) => (
              <li key={i} className="pl-2 flex flex-col pb-1">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground text-sm">{item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full">
          <div className="flex items-center mb-2 gap-2">
            <h3 className="font-semibold text-lg">Live Intercept Log</h3>
            <span className="text-xs text-gray-400">(Recent events, newest first; simulated demo)</span>
          </div>
          <PiiInterceptTable records={records} />
        </section>
      </div>
    </main>
  );
}

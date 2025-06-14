
import * as React from "react";
import { Info } from "lucide-react";

const DATA_TYPES = [
  { name: "navigator properties", desc: "userAgent, language, device memory, etc." },
  { name: "document.cookie", desc: "cookies sent by client" },
  { name: "window.location", desc: "referring URLs or redirects" },
  { name: "Form POST fields", desc: "emails, names, IDs (unencrypted)" },
];

export default function DataTypeList() {
  return (
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
  );
}

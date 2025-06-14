
import * as React from "react";
import { Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="flex-1 text-center font-sans">
      <h1 className="text-3xl md:text-4xl font-extrabold flex flex-col items-center justify-center gap-2 text-white">
        <span className="flex items-center gap-2 font-brand block text-4xl tracking-tight text-red-400 drop-shadow-sm mb-1">
          <Shield className="text-red-400 mr-1" size={32} />
          Jabberwocky
        </span>
        <span className="text-base md:text-lg font-medium text-gray-300 tracking-wide" style={{ fontSize: "1.17rem" }}>
          <span className="font-semibold">Personally Identifiable Information Shield</span>
        </span>
      </h1>
    </div>
  );
}

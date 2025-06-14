
import * as React from "react";

export default function SidebarBlurb() {
  return (
    <div className="mt-8 bg-[#151516] rounded-lg border border-red-900/40 p-4 text-xs text-left text-gray-400 shadow-inner font-medium">
      <div className="font-semibold text-sm text-red-400 mb-2">Why Jabberwocky exists</div>
      <div>
        <span className="font-bold text-white/90">In June 2024, Google forced ad blockers and privacy extensions to stop working on Chromium (the engine behind Chrome, Edge, and others).</span>
        <br /><br />
        Overnight, most people lost meaningful control over their private data and PII flowing from their browser - all in the name of monetization.
        <br /><br />
        <span className="text-white/90 font-semibold">Jabberwocky</span> was built to prove you can scramble and intercept unencrypted PII (personally identifiable information) before it’s ever exposed—no tracking, no servers, privacy by default.<br />
        Here's your shield, protect your privacy.
      </div>
    </div>
  );
}

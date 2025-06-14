
/**
 * This file mock-simulates the interception logic of snifferjs.
 * In reality, browser extensions inject JS and patch APIs early,
 * but for demo, this simply fake-patches navigator and web APIs
 * and "emits" events when PII or device info would have been intercepted.
 */

type InterceptRecord = {
  time: string;
  type: string;
  original: string;
  replaced: string;
};

type PiiListener = (record: InterceptRecord) => void;

let listeners: PiiListener[] = [];
let enabled = false;
let interceptTimer: ReturnType<typeof setInterval> | null = null;

const FAKE_PII_EVENTS: InterceptRecord[] = [
  {
    time: new Date().toLocaleTimeString(),
    type: "navigator.userAgent",
    original: navigator.userAgent,
    replaced: "Mozilla/5.0 (FakeBrowser/99.0.0) AppleWebKit/999.99 (KHTML, like Gecko) Chrome/99.0.0.0 Safari/999.99",
  },
  {
    time: new Date().toLocaleTimeString(),
    type: "window.location.href",
    original: window.location.href,
    replaced: "https://spoofed.example.com/",
  },
  {
    time: new Date().toLocaleTimeString(),
    type: "document.cookie",
    original: "userid=realuser; token=secret",
    replaced: "userid=xxxx; token=xxxx",
  },
  {
    time: new Date().toLocaleTimeString(),
    type: "form POST: email field",
    original: "my@email.com",
    replaced: "spoofed@email.com",
  },
  {
    time: new Date().toLocaleTimeString(),
    type: "navigator.language",
    original: (navigator as any).language || "en-US",
    replaced: "xx-XX",
  },
];

// Simulate interception by emitting a fake PII record every few seconds
function startInterception() {
  if (interceptTimer) return;
  interceptTimer = setInterval(() => {
    const rec = FAKE_PII_EVENTS[Math.floor(Math.random() * FAKE_PII_EVENTS.length)];
    const randomized = { ...rec, time: new Date().toLocaleTimeString() };
    listeners.forEach((cb) => cb(randomized));
  }, 2200);
}

function stopInterception() {
  if (interceptTimer) clearInterval(interceptTimer);
  interceptTimer = null;
}

export function enablePiiInterception() {
  enabled = true;
  startInterception();
}

export function disablePiiInterception() {
  enabled = false;
  stopInterception();
}

export function subscribeToIntercepts(cb: PiiListener) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((f) => f !== cb);
    if (listeners.length === 0) stopInterception();
  };
}

export type { InterceptRecord };

import Vapi from "@vapi-ai/web";

export const VAPI_API_KEY = "db2e2fe6-173a-4668-8b6f-f2d03cbd4abc";
export const VAPI_ASSISTANT_ID = "0f038197-028b-4bcf-817b-f7038127f8bd";

// Module-level singleton â€” created once client-side, reused everywhere.
let _vapi: Vapi | null = null;

function getVapi(): Vapi | null {
  if (typeof window === "undefined") return null;
  if (!_vapi) _vapi = new Vapi(VAPI_API_KEY);
  return _vapi;
}

export function startVapi(assistantId: string = VAPI_ASSISTANT_ID) {
  getVapi()?.start(assistantId);
}

export function stopVapi() {
  _vapi?.stop();
}

export function onVapiEvent(event: "call-start" | "call-end", handler: () => void) {
  getVapi()?.on(event, handler);
}

export function offVapiEvent(event: "call-start" | "call-end", handler: () => void) {
  getVapi()?.off(event, handler);
}

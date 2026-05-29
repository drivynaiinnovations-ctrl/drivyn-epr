import { createServerFn } from "@tanstack/react-start";
import { VAPI_ASSISTANT_ID } from "./vapi";

export const chatWithAlex = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const { message, sessionId } = data as { message: string; sessionId?: string };
    if (!message || typeof message !== "string") throw new Error("message required");
    return { message, sessionId: sessionId ?? null };
  })
  .handler(async ({ data }) => {
    const body: Record<string, unknown> = {
      assistantId: VAPI_ASSISTANT_ID,
      input: data.message,
    };
    if (data.sessionId) body.sessionId = data.sessionId;

    const res = await fetch("https://api.vapi.ai/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`VAPI chat error: ${err}`);
    }

    const json = await res.json() as { output?: string; sessionId?: string };
    return { reply: json.output ?? "Sorry, I didn't get a response.", sessionId: json.sessionId ?? null };
  });

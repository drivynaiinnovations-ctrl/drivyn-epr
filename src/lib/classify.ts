import { createServerFn } from "@tanstack/react-start";
import Anthropic from "@anthropic-ai/sdk";

export const classifyIssue = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const { issue } = data as { issue: string };
    if (!issue || typeof issue !== "string") throw new Error("issue is required");
    return { issue };
  })
  .handler(async ({ data }) => {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 10,
      messages: [
        {
          role: "user",
          content: `You are a plumbing dispatcher for EPR Plumbing & Remodeling in Southern Maryland. Classify the following customer issue as either EMERGENCY or ROUTINE. Emergencies include burst pipes, sewage backups, active flooding, gas leaks, no hot water, and overflowing toilets. Reply with one word only.\n\nIssue: ${data.issue}`,
        },
      ],
    });

    const text = (msg.content[0] as { text: string }).text.trim().toUpperCase();
    return { urgent: text.includes("EMERGENCY") };
  });

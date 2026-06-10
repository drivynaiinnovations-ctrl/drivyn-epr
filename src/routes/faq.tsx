import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, ChevronDown, AlertTriangle, Wrench, DollarSign, ShieldCheck, Calendar, ArrowRight, Siren } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const PHONE = "(240) 381-9035";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "Plumbing FAQ | EPR Plumbing & Remodeling — Southern Maryland" },
      { name: "description", content: "Expert plumbing answers from EPR Plumbing & Remodeling. Burst pipes, sewage backups, water heater issues, pricing, prevention tips, and more. Serving Southern Maryland, DC & Northern Virginia." },
      { property: "og:title", content: "Plumbing FAQ | EPR Plumbing & Remodeling" },
      { property: "og:description", content: "Get straight answers to the most common plumbing questions — from emergencies to prevention." },
      { name: "robots", content: "index, follow" },
    ],
  }),
});

const EMERGENCY_STEPS = [
  {
    label: "Burst Pipe / Major Leak",
    steps: ["Shut main water valve (clockwise)", "Turn off electricity near affected area", "Open lowest faucet to release pressure", "Take photos for insurance", "Call EPR — (240) 381-9035"],
  },
  {
    label: "Sewage Backup",
    steps: ["Stop ALL water use immediately", "Don't touch backed-up water", "Open windows for ventilation", "Call EPR — priority dispatch"],
  },
  {
    label: "Gas Smell",
    steps: ["Evacuate immediately — don't touch switches", "Call 911 from outside", "Call your gas company", "Call us after you're safe"],
  },
  {
    label: "Water Heater Leaking",
    steps: ["Shut cold water supply line to heater", "Turn off power (breaker or gas to pilot)", "Call EPR — (240) 381-9035"],
  },
  {
    label: "Frozen Pipes",
    steps: ["Open affected faucet", "Warm slowly — hair dryer or heating pad only", "Never use boiling water or open flame", "Check for cracks after thawing", "Call us if you can't locate the frozen section"],
  },
  {
    label: "Toilet Overflow",
    steps: ["Turn valve at base of toilet clockwise", "Plunge with a flange plunger", "Call us if it won't clear"],
  },
];

interface FaqItem { q: string; a: string | React.ReactNode }
interface FaqSection { id: string; label: string; icon: React.ElementType; items: FaqItem[] }

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "emergencies",
    label: "Emergencies",
    icon: AlertTriangle,
    items: [
      {
        q: "My pipe burst — water is everywhere. What do I do right now?",
        a: "First, shut the main water valve immediately — clockwise until it stops. It's usually near the water meter, in the basement, or outside at the foundation. If water is near outlets or an electrical panel, flip the breaker for that area before touching anything. Open a faucet on the lowest floor to release remaining pressure, move valuables, take photos for insurance, and call us. Once the main valve is off, the flooding stops — you've handled the hard part.",
      },
      {
        q: "Sewage is coming up through my drains. What should I do?",
        a: "Your main sewer line is blocked. Stop all water use immediately — no flushing, no sinks, no showers. Don't use chemical drain cleaners; they won't reach the blockage and can damage pipes. Avoid contact with backed-up water, open windows to ventilate, and call us for emergency drain camera inspection and hydro-jetting. Common causes include grease buildup, tree roots, flushed wipes, or collapsed clay pipes in older homes.",
      },
      {
        q: "My water heater is leaking — what are the first steps?",
        a: "Turn off the cold water supply line at the top of the heater (clockwise). Then shut off the power — flip the breaker for electric, or turn the gas dial to 'pilot.' If it's leaking from the bottom of the tank, that's corrosion — that's a replacement, not a repair. If it's leaking from the pressure relief valve on the side, the valve is doing its job, but excess pressure is building up and needs diagnosis. Call us and we'll walk you through it.",
      },
      {
        q: "I have zero water anywhere in the house.",
        a: "Check your main shut-off valve first — it may have been accidentally bumped closed. It should be fully open (counterclockwise). Then check with neighbors to rule out a municipal outage. If it's just your home and the valve is open, you may have a break in your main water line between the street and the house. Look for wet spots or soggy patches in the yard — a main line break can waste thousands of gallons per day and shouldn't wait.",
      },
      {
        q: "My pipes might be frozen — I'm getting little or no water.",
        a: "Reduced flow during cold weather almost always means a frozen pipe. Open the faucet so water can escape as it thaws — even a trickle means it's working. Find the frozen section (usually an exterior wall, crawl space, or garage) and warm it slowly with a hair dryer, heating pad, or warm damp towels. Never use open flame or boiling water — that causes immediate bursts. After it thaws, check for drips or cracks. If found, shut the main valve and call us.",
      },
    ],
  },
  {
    id: "common",
    label: "Common Problems",
    icon: Wrench,
    items: [
      {
        q: "My faucet won't stop dripping — is it a big deal?",
        a: "One drip per second wastes over 3,000 gallons per year — it shows up on your water bill every single month. The cause is almost always a worn rubber washer or O-ring inside the faucet. Quick fix once we're in there. Let us know when you call whether it's only hot water or only cold — that tells us which side of the valve is failing and helps us bring the right part on the first visit.",
      },
      {
        q: "My toilet keeps running — I can hear water going constantly.",
        a: "That constant hiss means your toilet is wasting water nonstop — sometimes 200 gallons a day. It's almost always a worn flapper valve or failing fill valve. Quick test: put a few drops of food coloring in the tank. If color appears in the bowl without flushing, the flapper is leaking and needs replacing. A toilet that flushes by itself randomly ('ghost flushing') is the same issue. Don't ignore it — the water loss is real.",
      },
      {
        q: "My toilet is clogged and about to overflow.",
        a: "Stop flushing immediately — every flush adds more water. Find the valve at the base of the toilet (behind or below the tank) and turn it clockwise to cut off the water supply. Use a flange plunger — the one with a rubber collar that fits into the drain hole — and push slowly, pull back firmly. If it doesn't clear after several tries, stop and call us. Forcing it can damage the toilet. And if multiple drains are backing up at once, it's a main sewer line issue — a bigger problem.",
      },
      {
        q: "My sink or shower drains really slowly.",
        a: "Slow drains are the early warning sign of a bigger clog forming. In bathrooms, hair and soap scum are almost always the cause. In kitchens, grease and food particles are the culprit. A drain snake or hair-remover tool often clears a bathroom drain. For kitchens, avoid pouring grease or oil down the drain — it hardens inside the pipe. Warning: if two or more drains in the house are slow at the same time, that's a blockage in the main line — beyond any plunger or home remedy.",
      },
      {
        q: "My water pressure dropped suddenly.",
        a: "The location of the drop tells us everything. One faucet only: clogged aerator — the small screen at the tip of the faucet. Hot water only: sediment in the water heater or a failing pressure valve. Whole house suddenly: could be a hidden leak, damaged main line, or a failing pressure regulator. Do the meter test — write down the reading, use zero water for 30 minutes, check again. If the number moved, water is escaping somewhere.",
      },
      {
        q: "I have no hot water at all.",
        a: "Gas heater: check if the pilot light went out — many modern heaters have an ignition button on the unit. If it won't relight or you smell gas, stop and call us. Electric heater: the breaker may have tripped — reset it and wait 45 minutes. If it keeps tripping, that's a wiring or element issue. Tankless heater: check for an error code on the display panel. Water heaters last 8–12 years on average — if yours is in that range and struggling, we can help you weigh repair vs. replacement.",
      },
      {
        q: "My sump pump isn't working and my basement is starting to flood.",
        a: "Check that it's plugged in first — the outlet can come unplugged in hard-to-reach spots. Check the float — it can get stuck against the pit wall; gently lift it to see if the pump kicks on. Check the discharge pipe outside for freezing or blockage. If the pump hums but nothing moves, the impeller may be jammed — that usually means replacement. Pro tip: always keep a battery backup sump pump. Power outages and heavy rain often happen together.",
      },
      {
        q: "My pipes make a loud banging noise when I use water.",
        a: "That's 'water hammer' — when water flow stops suddenly, the pressure wave slams the pipe walls. Not dangerous short-term, but repeated vibration loosens fittings over time. The fix is a water hammer arrestor — a small device installed at the supply line of the affected fixture. If it only happens with hot water, the pipe may be rubbing against a bracket as it expands with heat — a different but equally easy fix.",
      },
      {
        q: "My garbage disposal stopped working or is humming but not spinning.",
        a: "A humming disposal that won't spin is jammed. Turn it off and unplug it under the sink. Find the hex (Allen) wrench slot at the bottom center of the unit and turn it back and forth to free the jam. Press the small red reset button on the bottom, plug back in, and test. Never put grease, eggshells, coffee grounds, pasta, rice, or fibrous vegetables in the disposal — they cause most jams and clogs. Never reach inside, even when it's off.",
      },
      {
        q: "My water bill spiked but I can't find any leak.",
        a: "A spike with no obvious cause almost always means water is escaping somewhere hidden. Check the toilet first — drop food coloring in the tank; color in the bowl without flushing means a leaking flapper. Do the meter test: note the reading, use zero water for 30 minutes, check again. Any movement means an active leak. Check under all sinks and behind appliances for moisture or soft flooring. If the meter confirms loss but you can't find the source, we use sound amplification equipment to locate hidden leaks without opening walls.",
      },
      {
        q: "I have white crusty buildup on my fixtures and faucets.",
        a: "That's calcium and magnesium scale from hard water. On the outside of fixtures it's cosmetic — a 50/50 white vinegar and water solution dissolves it; soak a cloth and wrap it around the fixture for an hour. Inside your pipes and water heater it's a bigger issue: scale reduces flow, forces appliances to work harder, and shortens their lifespan. A water softener is the long-term solution. Tankless water heaters should also be flushed annually with descaling solution — most manufacturers require it for warranty coverage.",
      },
      {
        q: "What can actually be flushed down the toilet?",
        a: "Two things only: human waste and toilet paper. Despite what packaging claims, 'flushable' wipes don't break down the way toilet paper does — they're one of the biggest causes of sewer blockages. Same goes for paper towels, cotton balls, cotton swabs, dental floss, feminine products, and medication. If you use wipes, throw them in the trash. A single main line backup caused by wipes is a costly and completely avoidable fix.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Estimates",
    icon: DollarSign,
    items: [
      {
        q: "How much will this cost?",
        a: "Every plumbing job is different — and the only way to give you a price that's accurate is to see the situation in person. We don't quote prices over the phone because we'd rather be honest with you than throw out a number that changes when our tech shows up. The size of the pipe, accessibility, age of the system, and what we find behind the wall all affect what a job truly costs. We schedule an in-person inspection, assess everything properly, and give you a clear quote before any work begins. No surprises.",
      },
      {
        q: "Why won't you give me a price over the phone?",
        a: "Because a price over the phone is almost never the real price — and that's not fair to you. Plumbing problems that look simple on the surface can involve hidden pipe access, older materials, code requirements, or damage that isn't visible until we're actually there. A number given blindly either ends up too low (and we have to revise it on-site) or too high (and you overpay). An in-person inspection protects you. It means the price we quote is the price we stand behind.",
      },
      {
        q: "Does homeowner's insurance cover plumbing repairs?",
        a: "It depends on the cause. Usually covered: sudden, accidental events — a pipe bursts unexpectedly, a water heater suddenly fails and floods the floor. Usually not covered: slow leaks you ignored, general wear and tear, tree root damage, or flooding from outside the home (that requires separate flood insurance). Document everything with photos before and after cleanup, save all receipts, and report to your insurer quickly. We can provide detailed documentation of what we found and repaired, which helps significantly with insurance claims.",
      },
      {
        q: "Should I repair or replace it?",
        a: "That's exactly the kind of question we answer during an inspection — and we always give you the honest answer, not the more expensive one. Lean toward repair when: it's an isolated issue on a newer system, the fix is straightforward and localized, nothing else nearby shows wear. Lean toward replacement when: the appliance is over 10–15 years old, you've had the same issue repaired more than once, or the system shows multiple signs of wear. For water heaters specifically: if yours is over 10 years old and struggling, replacement often makes more long-term sense — newer units are significantly more energy efficient.",
      },
    ],
  },
  {
    id: "prevention",
    label: "Prevention & Maintenance",
    icon: ShieldCheck,
    items: [
      {
        q: "What should I do every year to keep my plumbing healthy?",
        a: "Annual maintenance prevents most of the expensive emergency calls we get. Flush your water heater to remove sediment — 15 minutes once a year extends life significantly. Test all shut-off valves (sinks, toilets, water heater) — just a quarter turn and back to make sure they won't seize in an emergency. Check under every sink and behind every toilet for moisture or soft flooring. Clean faucet aerators and showerheads to remove mineral buildup. If you have a sump pump, pour water into the pit to confirm it kicks on. Most importantly: know where your main shut-off valve is — and make sure every adult in the home knows too.",
      },
      {
        q: "What is a water pressure regulator and do I need one?",
        a: "A pressure regulator (PRV) keeps your home's water pressure in a safe range — typically 40–80 PSI. High pressure feels great in the shower but hammers pipes, fittings, and appliances over time. It's one of the leading causes of premature pipe and fixture failure. If you notice banging pipes, fast-dripping faucets, or appliances wearing out quickly, a failing PRV may be the reason. A basic water pressure gauge (under $15) screws onto a hose bib — if your reading is above 80 PSI, call us. A PRV replacement is straightforward and protects everything in your home.",
      },
      {
        q: "My shut-off valve won't turn — it's stuck.",
        a: "Valves that haven't moved in years seize up with mineral buildup or corrosion — and this always matters most in an emergency. Don't force it with a wrench — too much torque can snap the valve stem. Try penetrating oil on the stem, wait 5 minutes, and gently attempt again. If it still won't move during an emergency, call the water utility — they can shut the street-side valve. Once the crisis is over, let us replace it. And going forward: test all shut-off valves once a year with a simple quarter turn and back.",
      },
      {
        q: "What's my seasonal plumbing checklist?",
        a: "Before winter: disconnect and drain outdoor hoses, shut off and drain outdoor hose bibs, insulate pipes in crawl spaces and garages, confirm everyone knows where the main shut-off valve is, and set heat to at least 55Â°F if leaving home. During cold snaps: open cabinet doors under sinks on exterior walls to circulate warm air. Spring/summer: turn outdoor hose bibs back on slowly and check for winter damage, inspect the sump pump before rain season, check for tree root growth near sewer lines, flush and test irrigation systems, and check the water heater anode rod if it's over 3 years old.",
      },
      {
        q: "How do I know if I have a hidden water leak?",
        a: "The most reliable method is the water meter test: write down the meter reading, use zero water for 30 minutes, then check again. Any movement means water is escaping somewhere. After confirming a leak, check toilets first (food coloring test in the tank), then under all sinks and behind appliances for moisture or staining, then the yard for wet patches or unusually lush grass above where the water or sewer line runs. If you can't find the source, we use sound amplification equipment to locate hidden leaks precisely — no guessing, no unnecessary wall cuts.",
      },
      {
        q: "I think there's a water or sewer line problem in my yard.",
        a: "Water line break signs: unexplained wet or soggy patch in the yard, dropping water pressure, or a water bill that jumped with no change in usage. Sewer line problem signs: gurgling drains, slow drains across the whole house, sewage smell outside, or an unusually green patch of grass above where the sewer line runs — sewage acting as fertilizer. For a suspected water line break, shut the main valve and call us. For a suspected sewer issue, stop heavy water use and call us for a camera inspection. Tree roots are the #1 cause of sewer line damage — we locate the problem without digging up your entire yard.",
      },
    ],
  },
];

const ALL_FAQ_ITEMS = FAQ_SECTIONS.flatMap((s) => s.items);

function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: typeof f.a === "string" ? f.a : String(f.a) },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />
      <div className="min-h-screen bg-background text-charcoal">
        <SiteHeader />

        {/* Hero */}
        <section className="bg-charcoal text-white py-20 px-5 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <ShieldCheck className="size-3.5" /> Expert Plumbing Answers
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-6">
              Plumbing FAQ<span className="text-turquoise">.</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
              Straight answers to the most common plumbing questions — from burst pipe emergencies to annual maintenance. No fluff, no upsells.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#book-service"
                className="bg-turquoise text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition">
                <Calendar className="size-5" /> Book a Service <ArrowRight className="size-4" />
              </a>
              <a href={`tel:${PHONE}`}
                className="border-2 border-white text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-charcoal transition">
                <Phone className="size-5" /> {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* Emergency quick reference */}
        <section className="bg-red-950 text-white py-14 px-5 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Siren className="size-6 text-turquoise shrink-0" />
              <h2 className="font-display text-2xl font-semibold">Emergency? What to Do Before We Arrive</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {EMERGENCY_STEPS.map((e) => (
                <div key={e.label} className="bg-white/5 rounded-xl p-5">
                  <p className="font-semibold text-turquoise text-sm mb-3">{e.label}</p>
                  <ol className="space-y-1.5">
                    {e.steps.map((step, i) => (
                      <li key={i} className="text-sm text-white/80 flex gap-2">
                        <span className="text-turquoise font-bold shrink-0">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section nav */}
        <div className="bg-white border-b border-border sticky top-16 z-30">
          <div className="max-w-4xl mx-auto px-5 lg:px-8 flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {FAQ_SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <a key={s.id} href={`#${s.id}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-charcoal/70 hover:bg-turquoise/10 hover:text-charcoal whitespace-nowrap transition">
                  <Icon className="size-4 text-turquoise" /> {s.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* FAQ sections */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-5 lg:px-8 space-y-16">
            {FAQ_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} id={section.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-xl bg-turquoise/10 flex items-center justify-center">
                      <Icon className="size-5 text-turquoise" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-charcoal">{section.label}</h2>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item, i) => {
                      const key = `${section.id}-${i}`;
                      const isOpen = openItem === key;
                      return (
                        <div key={key} className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => setOpenItem(isOpen ? null : key)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-charcoal hover:bg-secondary/40 transition"
                          >
                            <span className="pr-4">{item.q}</span>
                            <ChevronDown className={`size-4 text-turquoise shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-charcoal text-white text-center px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-semibold mb-4">Still Have a Question?</h2>
            <p className="text-white/70 mb-8 text-lg">Call us directly or book online — our team is ready 24/7.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#book-service"
                className="bg-turquoise text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition">
                <Calendar className="size-5" /> Book Online
              </a>
              <a href={`tel:${PHONE}`}
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-charcoal transition">
                <Phone className="size-5" /> {PHONE}
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}

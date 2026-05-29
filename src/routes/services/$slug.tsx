import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, Calendar, CheckCircle2, ArrowRight, ChevronDown, ChevronUp,
  MapPin, Droplets, Gauge, Wrench, Home, AlertTriangle, Zap, ShieldCheck, Siren, Star,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/site/Reveal";
import { VoiceWidget } from "@/components/site/VoiceWidget";

const PHONE = "(240) 381-9035";
const GHL_BOOKING_URL = "#book";
const AREA = "La Plata, Waldorf, White Plains, Indian Head, Clinton, Bowie, Upper Marlboro, Prince Frederick & Leonardtown";

// ── Service data ───────────────────────────────────────────────────────────────
const SERVICES_DATA = {
  "drain-cleaning": {
    name: "Drain Cleaning",
    icon: Droplets,
    title: "Drain Cleaning Services in La Plata & Southern Maryland | EPR Plumbing",
    description: "Professional drain cleaning in La Plata, Waldorf & Charles County MD. Hydro-jetting, sewer snaking, clogged sinks & toilets cleared same day. Call (240) 381-9035.",
    badge: "Drain & Sewer Specialists",
    heroLine1: "Clogged Drain?",
    heroLine2: "Fixed Today.",
    heroSub: "Standing water, slow drains, and backed-up sinks — EPR clears the clog the same day across Southern Maryland. No runaround, no guesswork.",
    intro: "A clogged drain never waits for a good time. Whether it's a kitchen sink backing up before dinner, a shower that won't drain, or a main sewer line showing trouble, EPR Plumbing's licensed technicians respond fast with professional hydro-jetting, snaking, and camera inspection equipment to clear your drains completely — not just push the problem further down the line.",
    offers: [
      "Hydro-jetting for complete sewer line cleaning",
      "Drain snaking for sinks, tubs & toilets",
      "Main sewer line clearing & inspection",
      "Sewer camera inspection to find hidden blockages",
      "Grease trap cleaning for commercial kitchens",
      "Root intrusion cutting & removal",
    ],
    signs: [
      "Water draining slowly in sinks, tubs or showers",
      "Gurgling sounds from drains or toilets",
      "Multiple fixtures clogging at the same time",
      "Sewage smell inside or outside the home",
      "Water backing up into tubs when toilet is flushed",
    ],
    process: [
      { n: "01", title: "Diagnose the Block", body: "We run a camera through your line to pinpoint exactly where and what the blockage is — grease, roots, or debris." },
      { n: "02", title: "Choose the Right Method", body: "Snaking for simple blockages. Hydro-jetting for grease buildup and root intrusion. We use the right tool every time." },
      { n: "03", title: "Clear It Completely", body: "We don't just poke a hole — we fully clear the line so water flows like new." },
      { n: "04", title: "Verify & Prevent", body: "Final camera pass confirms the line is clear. We'll also advise on preventing future clogs." },
    ],
    faq: [
      { q: "How long does drain cleaning take?", a: "Most drain cleanings take 1–2 hours. Hydro-jetting a full sewer line may take 2–3 hours depending on line length and severity." },
      { q: "Can you clear drains same day?", a: "Yes — we offer same-day drain cleaning throughout Southern Maryland. Call (240) 381-9035 and we'll get a tech to you fast." },
      { q: "Is hydro-jetting safe for older pipes?", a: "Yes, when done by a trained technician. We inspect the pipe condition first and adjust water pressure accordingly to avoid damage." },
      { q: "Why does my drain keep clogging?", a: "Recurring clogs usually mean there's a deeper buildup or a structural issue like root intrusion or a partially collapsed pipe. Camera inspection will find it." },
      { q: "Do you serve commercial properties?", a: "Absolutely. EPR handles grease trap cleaning and commercial sewer line service throughout Charles, Prince George's, Calvert & St. Mary's Counties." },
    ],
  },

  "water-heater": {
    name: "Water Heater Service",
    icon: Gauge,
    title: "Water Heater Repair & Replacement in La Plata MD | EPR Plumbing",
    description: "Water heater repair, replacement & installation in La Plata & Southern Maryland. Tank & tankless, same-day service. Licensed plumbers — call (240) 381-9035.",
    badge: "Water Heater Experts · Same-Day Service",
    heroLine1: "No Hot Water?",
    heroLine2: "Fixed Today.",
    heroSub: "From emergency repairs to full tank replacements — EPR's licensed techs arrive stocked and ready to restore your hot water, fast.",
    intro: "When your water heater fails, it affects everything — showers, dishes, laundry. EPR Plumbing specializes in fast water heater diagnosis, repair, and same-day replacement throughout Southern Maryland. Whether you have a traditional tank, a tankless system, or an aging unit running out of time, our licensed technicians will get your hot water back on quickly and recommend the most cost-effective solution.",
    offers: [
      "Tank water heater repair & replacement (all brands)",
      "Tankless water heater installation & service",
      "Thermostat & heating element replacement",
      "Anode rod inspection & replacement",
      "Pressure relief valve testing & repair",
      "Energy-efficient water heater upgrades",
    ],
    signs: [
      "No hot water or water that's only lukewarm",
      "Rusty or discolored water from hot taps",
      "Rumbling, popping or banging sounds from the tank",
      "Water pooling around the base of the heater",
      "Water heater over 10 years old and running slower",
    ],
    process: [
      { n: "01", title: "Diagnose the Problem", body: "We inspect the unit — thermostat, elements, valves, and tank condition — and tell you honestly whether repair or replacement makes sense." },
      { n: "02", title: "Repair or Replace", body: "Many repairs are handled on the spot. Replacements are done same day — we carry the most common tank sizes on our trucks." },
      { n: "03", title: "Proper Installation", body: "All water heaters are installed to Maryland code with correct venting, pressure, and temperature settings." },
      { n: "04", title: "Test & Walk You Through", body: "We test the unit thoroughly before we leave and walk you through maintenance to extend the life of your new heater." },
    ],
    faq: [
      { q: "How long does a water heater last?", a: "Traditional tank heaters last 8–12 years. Tankless units last 15–20 years with proper maintenance. If yours is over 10 years old and causing problems, replacement is usually more cost-effective than repair." },
      { q: "Should I repair or replace my water heater?", a: "If the tank is leaking, heavily corroded, or over 10 years old, replacement is usually the smarter investment. EPR will give you an honest recommendation with no upsell pressure." },
      { q: "Can you replace a water heater same day?", a: "Yes. For standard tank replacements, we typically complete same-day installation throughout Southern Maryland. Call us at (240) 381-9035 to confirm availability." },
      { q: "What size water heater do I need?", a: "A 40-gallon tank works for 1–3 people; 50 gallons for 3–5. For larger households or commercial use, we'll size the unit correctly during the visit." },
      { q: "Do you service tankless water heaters?", a: "Absolutely. We install, repair, and perform annual descaling and maintenance on all major tankless brands including Navien, Rinnai, and Rheem." },
    ],
  },

  "pipe-repair": {
    name: "Pipe Repair & Repiping",
    icon: Wrench,
    title: "Pipe Repair & Repiping in Southern Maryland | EPR Plumbing La Plata",
    description: "Burst pipe repair, leak detection & whole-house repiping in La Plata & Southern Maryland. Fast emergency response. Licensed plumbers — call (240) 381-9035.",
    badge: "Pipe & Leak Repair Specialists",
    heroLine1: "Burst Pipe?",
    heroLine2: "We Fix It Fast.",
    heroSub: "Leaking, bursting, or corroded pipes cause damage by the minute. EPR responds fast across Southern Maryland to stop the leak and protect your home.",
    intro: "A leaking or burst pipe can cause thousands of dollars in water damage within hours. EPR Plumbing's emergency pipe repair team responds fast throughout Southern Maryland — locating leaks with minimal wall damage, repairing or replacing damaged sections, and completing whole-house repiping projects when aging infrastructure needs a full upgrade. We work with copper, PVC, CPVC, and PEX pipe systems.",
    offers: [
      "Emergency burst & leaking pipe repair",
      "Slab leak detection & repair",
      "Whole-house repiping (copper, PEX, CPVC)",
      "Pipe rerouting around problem areas",
      "Pinhole leak repair & copper pipe work",
      "Water pressure testing & balancing",
    ],
    signs: [
      "Sudden drop in water pressure throughout the house",
      "Wet spots on walls, ceilings, or floors",
      "Unusually high water bills without a usage change",
      "Discolored or rust-colored water",
      "Sound of running water when nothing is on",
    ],
    process: [
      { n: "01", title: "Locate the Leak", body: "We use pressure testing and leak detection equipment to pinpoint the exact source — even inside walls or under slabs." },
      { n: "02", title: "Minimize Access", body: "We make the smallest possible opening to reach the damaged pipe, protecting your walls, floors, and finishes." },
      { n: "03", title: "Repair or Replace", body: "Isolated damage gets repaired in-place. If aging pipes are the underlying issue, we'll discuss repiping options honestly." },
      { n: "04", title: "Test & Restore Pressure", body: "After repair, we pressure-test the entire system to confirm there are no additional leaks and your water pressure is correct." },
    ],
    faq: [
      { q: "What should I do if a pipe bursts?", a: "Shut off your main water valve immediately, then call EPR at (240) 381-9035. We offer emergency dispatch 24/7 across Southern Maryland." },
      { q: "How do you find a slab leak without tearing up the floor?", a: "We use electronic leak detection and pressure testing to locate slab leaks precisely, minimizing concrete removal and repair costs." },
      { q: "Is whole-house repiping worth it?", a: "For homes over 40 years old with original galvanized or polybutylene pipes, repiping prevents chronic leaks, improves water quality, and protects your home's value." },
      { q: "How long does pipe repair take?", a: "Simple repairs take 1–3 hours. Slab leaks or repiping projects are planned over 1–3 days depending on home size." },
      { q: "Do you repair pipes under concrete slabs?", a: "Yes. EPR handles full slab leak detection and repair throughout Southern Maryland, including tunneling or rerouting as the best solution for your situation." },
    ],
  },

  "fixture-install": {
    name: "Fixture Installation",
    icon: Home,
    title: "Plumbing Fixture Installation in La Plata MD | EPR Plumbing",
    description: "Professional faucet, sink, toilet & shower fixture installation in Southern Maryland. Licensed plumbers, clean work, no mess left behind. Call (240) 381-9035.",
    badge: "Fixture & Appliance Specialists",
    heroLine1: "New Fixtures.",
    heroLine2: "Done Right.",
    heroSub: "Faucets, sinks, showers, toilets — EPR installs them cleanly and correctly the first time, across Southern Maryland.",
    intro: "Whether you're upgrading your bathroom fixtures, installing a new kitchen faucet, or replacing outdated hardware throughout your home, EPR Plumbing handles fixture installation with precision. We work with all major brands and can source fixtures for you or install customer-supplied hardware. Every installation is leak-checked and fully tested before we leave.",
    offers: [
      "Kitchen & bathroom faucet installation & replacement",
      "Sink and vanity installation",
      "Toilet installation & replacement",
      "Shower & tub fixtures and valves",
      "Garbage disposal installation",
      "Dishwasher & appliance water line hookup",
    ],
    signs: [
      "Faucet dripping constantly even when fully closed",
      "Fixture handles that are stiff or corroded",
      "Visible rust, cracks, or chips in porcelain fixtures",
      "Slow toilet fill after flushing",
      "Dishwasher or appliance hookup needed for renovation",
    ],
    process: [
      { n: "01", title: "Review Your Fixtures", body: "We assess the existing plumbing connections, water supply lines, and drain configurations to confirm compatibility." },
      { n: "02", title: "Shut Off & Remove", body: "Supply lines are shut off, old fixtures are removed cleanly, and connections are inspected for corrosion or damage." },
      { n: "03", title: "Install & Seal", body: "New fixtures are installed, sealed, and connected to code. We don't leave anything dripping or loose." },
      { n: "04", title: "Test Thoroughly", body: "We run through every function — hot, cold, drainage — and check under-sink connections before we call it done." },
    ],
    faq: [
      { q: "Can I supply my own fixtures?", a: "Yes. EPR installs customer-supplied fixtures. Just make sure the fixture matches your existing rough-in dimensions — we'll confirm during scheduling." },
      { q: "How long does fixture installation take?", a: "A standard faucet or toilet replacement takes 1–2 hours. Full bathroom fixture packages vary by scope." },
      { q: "Do you handle full bathroom remodeling plumbing?", a: "Yes — EPR handles the rough-in plumbing for bathroom additions and remodels, coordinating with your contractor." },
      { q: "What brands do you work with?", a: "We work with all major brands — Moen, Delta, Kohler, American Standard, Toto, and more. We can also source fixtures directly if needed." },
      { q: "Can you replace a toilet without shutting off water to the whole house?", a: "In most cases, yes — toilets have their own supply shut-off. We close the local valve and replace the toilet without affecting the rest of the house." },
    ],
  },

  "toilet-repair": {
    name: "Toilet Repair & Installation",
    icon: AlertTriangle,
    title: "Toilet Repair & Installation in Southern Maryland | EPR Plumbing",
    description: "Emergency toilet repair, leaking toilet fix & toilet installation in La Plata, Waldorf & Southern Maryland. Priority dispatch — call (240) 381-9035.",
    badge: "Priority Dispatch · Toilet Specialists",
    heroLine1: "Toilet Leaking?",
    heroLine2: "Priority Dispatch.",
    heroSub: "Toilet leaks are flagged for our fastest available tech. EPR responds across Southern Maryland — day or night, same day.",
    intro: "A leaking or malfunctioning toilet is more than an inconvenience — it's a water waste emergency. EPR Plumbing flags all toilet leak calls for priority dispatch, because a running or leaking toilet can waste hundreds of gallons per day and cause floor damage quickly. Our licensed technicians handle everything from a simple flapper replacement to full toilet installation, always arriving prepared to resolve the issue in a single visit.",
    offers: [
      "Toilet leak detection & repair (base, tank, supply line)",
      "Running toilet repair (flapper, fill valve, flush valve)",
      "Complete toilet replacement & installation",
      "Wax ring replacement for base-leaking toilets",
      "Toilet clog clearing & auger service",
      "Low-flow & water-efficient toilet upgrades",
    ],
    signs: [
      "Water puddling at the base of the toilet",
      "Toilet running constantly or cycling on and off",
      "Toilet rocking or shifting on the floor",
      "Slow or incomplete flush",
      "Visible cracks in the porcelain tank or bowl",
    ],
    process: [
      { n: "01", title: "Identify the Source", body: "We check the tank components, wax ring seal, supply line, and flange to find exactly where water is escaping." },
      { n: "02", title: "Prioritize Fast", body: "Toilet leaks are flagged for our fastest available tech — we treat them with the urgency they deserve." },
      { n: "03", title: "Repair or Replace", body: "Most repairs are done in a single visit. If the toilet is cracked or structurally compromised, we'll recommend the right replacement." },
      { n: "04", title: "Test & Confirm", body: "We flush multiple times, check all connections, and confirm the floor is dry before leaving." },
    ],
    faq: [
      { q: "Is a leaking toilet an emergency?", a: "Yes — a toilet leaking at the base or running constantly can waste hundreds of gallons daily and cause floor damage. Call EPR at (240) 381-9035 for priority dispatch." },
      { q: "Why is my toilet leaking at the base?", a: "Usually a failed wax ring seal between the toilet and the flange. This requires removing the toilet and replacing the wax ring — a straightforward repair for a licensed plumber." },
      { q: "Why does my toilet keep running?", a: "Almost always a worn flapper or faulty fill valve. Parts are inexpensive and the repair takes under an hour in most cases." },
      { q: "How long does a toilet replacement take?", a: "Standard toilet replacement takes 1–2 hours including shutoff, removal, new toilet installation, and testing." },
      { q: "Can you repair older low-flush toilets?", a: "Yes — we stock replacement parts for most common toilet brands and can service older models. If parts aren't available, we'll recommend a compatible upgrade." },
    ],
  },

  "sewer-line": {
    name: "Sewer Line Service",
    icon: Zap,
    title: "Sewer Line Repair & Replacement in Southern Maryland | EPR Plumbing",
    description: "Sewer line inspection, repair & replacement in La Plata & Southern Maryland. Camera inspection, hydro-jetting, trenchless options. Call (240) 381-9035.",
    badge: "Sewer Line Specialists · Camera Inspection",
    heroLine1: "Sewer Backup?",
    heroLine2: "We Handle It.",
    heroSub: "Sewer line problems back up every drain in your home. EPR uses camera inspection and hydro-jetting to clear and repair lines across Southern Maryland.",
    intro: "Sewer line problems are among the most serious plumbing issues a homeowner or property manager can face. When the main sewer line is blocked, broken, or infiltrated by tree roots, every drain in the building is affected. EPR Plumbing uses sewer camera inspection to diagnose sewer issues accurately, then applies the right solution — hydro-jetting, mechanical clearing, spot repair, or full line replacement — without unnecessary digging.",
    offers: [
      "Sewer camera inspection & video reporting",
      "Hydro-jetting for root intrusion & grease buildup",
      "Main sewer line clearing & snaking",
      "Sewer line spot repair & pipe relining",
      "Full sewer line replacement",
      "Root intrusion cutting & treatment",
    ],
    signs: [
      "Multiple drains backing up at the same time",
      "Sewage smell inside the home or yard",
      "Gurgling sounds from toilets or floor drains",
      "Wet patches or unusually green grass over the sewer line",
      "Sewage coming up through a floor drain",
    ],
    process: [
      { n: "01", title: "Camera Inspection", body: "We run a waterproof camera through the sewer line to see exactly what's blocking or damaging it — roots, grease, broken pipe, or offset joints." },
      { n: "02", title: "Choose the Right Fix", body: "Hydro-jetting for organic blockages. Spot repair for isolated breaks. Full replacement when the line is too deteriorated to clear or patch." },
      { n: "03", title: "Execute the Repair", body: "Our crew completes the work with minimal disruption to your yard. We use trenchless techniques where possible." },
      { n: "04", title: "Post-Repair Camera Verify", body: "We run the camera through again after repair to confirm the line is clear, joints are solid, and flow is restored." },
    ],
    faq: [
      { q: "How do I know if my sewer line is broken?", a: "Signs include multiple drains backing up simultaneously, sewage odors inside or outside, and unusually wet or lush patches over the sewer path in your yard. Camera inspection confirms the diagnosis." },
      { q: "How much does sewer line repair cost?", a: "Costs range from $300–$600 for hydro-jetting to $3,000–$10,000+ for full sewer line replacement, depending on depth, length, and access. EPR gives upfront pricing before any work starts." },
      { q: "Can you fix a sewer line without digging up the yard?", a: "In many cases, yes. Trenchless pipe lining and pipe bursting methods allow us to repair or replace sewer lines with minimal excavation." },
      { q: "How long does sewer line replacement take?", a: "A sewer camera inspection takes 1–2 hours. Spot repairs are typically done in a day. Full replacements are 1–3 days depending on line length and access." },
      { q: "Do tree roots really break sewer lines?", a: "Yes — tree roots are one of the most common causes of sewer line damage in Southern Maryland. Roots infiltrate joints and cracks, then grow until they block or burst the pipe." },
    ],
  },

  "leak-detection": {
    name: "Leak Detection",
    icon: Droplets,
    title: "Leak Detection Services in La Plata & Southern Maryland | EPR Plumbing",
    description: "Professional water leak detection in Southern Maryland. Slab leaks, hidden pipe leaks & wall leaks found without unnecessary damage. Call (240) 381-9035.",
    badge: "Precision Leak Detection · Minimal Damage",
    heroLine1: "Hidden Leak?",
    heroLine2: "We'll Find It.",
    heroSub: "High water bills, wet walls, or mysterious water sounds — EPR locates hidden leaks precisely, with minimal damage to your home.",
    intro: "Hidden leaks are silent destroyers. Behind walls, under slabs, and in ceilings, undetected leaks cause mold, structural damage, and sky-high water bills before you ever see a drop. EPR Plumbing uses electronic leak detection, pressure testing, and thermal imaging to locate leaks precisely — so we open only what we need to open, and fix what actually needs fixing.",
    offers: [
      "Electronic leak detection for hidden pipe leaks",
      "Slab leak detection & repair",
      "Wall & ceiling leak location",
      "Pressure testing to confirm suspected leaks",
      "Water meter testing for invisible supply leaks",
      "Post-repair leak verification",
    ],
    signs: [
      "Unexplained spike in your monthly water bill",
      "Sound of water running when all fixtures are off",
      "Damp spots, discoloration or soft areas on walls or ceilings",
      "Mold or mildew odor without a visible source",
      "Warm spots on the floor (possible hot water slab leak)",
    ],
    process: [
      { n: "01", title: "Pressure Test the System", body: "We isolate zones and pressure-test each section to determine where the system is losing water." },
      { n: "02", title: "Electronic Leak Location", body: "We use acoustic and electronic detection equipment to listen for and locate the leak without cutting or digging." },
      { n: "03", title: "Targeted Access Only", body: "We open only the specific wall section, slab area, or ceiling panel needed — not a large exploratory hole." },
      { n: "04", title: "Repair & Verify", body: "The leak is repaired and the system is pressure-tested again to confirm complete resolution before we leave." },
    ],
    faq: [
      { q: "How do I know if I have a hidden water leak?", a: "Check your water meter with all fixtures off — if it's still moving, water is escaping somewhere. Other signs include higher-than-normal water bills, warm spots on floors, or unexplained mold." },
      { q: "Can you detect a slab leak without breaking concrete?", a: "Yes. Electronic and acoustic leak detection equipment locates the leak precisely first. We then open only the minimal amount of concrete required for the repair." },
      { q: "How accurate is leak detection?", a: "Using professional-grade equipment, we can pinpoint leaks within inches in most cases — dramatically reducing damage compared to exploratory opening." },
      { q: "What causes slab leaks?", a: "Corrosion of copper pipes, high water pressure, shifting soil, and poor original installation are common causes in Southern Maryland homes." },
      { q: "Does insurance cover hidden leak damage?", a: "Typically yes — sudden and accidental water damage from hidden leaks is often covered. EPR can provide documentation for your insurance claim." },
    ],
  },

  "garbage-disposal": {
    name: "Garbage Disposal",
    icon: Wrench,
    title: "Garbage Disposal Repair & Installation in Southern Maryland | EPR Plumbing",
    description: "Garbage disposal repair, replacement & installation in La Plata & Southern Maryland. All brands, same-day service. Licensed plumbers — call (240) 381-9035.",
    badge: "Garbage Disposal Specialists",
    heroLine1: "Disposal Jammed",
    heroLine2: "or Dead? Fixed.",
    heroSub: "Don't live with a broken garbage disposal. EPR repairs and replaces all brands same day throughout Southern Maryland.",
    intro: "A jammed, leaking, or dead garbage disposal makes kitchen cleanup miserable. EPR Plumbing handles garbage disposal repair and installation for all major brands — InSinkErator, Moen, Waste King, and more. We diagnose the problem accurately and resolve it in a single visit, whether that's clearing a jam, replacing a motor, or installing a new unit with better capacity.",
    offers: [
      "Garbage disposal repair (jams, humming motor, no power)",
      "Complete disposal replacement & installation",
      "Dishwasher drain connection to disposal",
      "Drain line connection & leaking flange repair",
      "Disposal reset & electrical troubleshooting",
      "Upgrade to high-powered or quiet disposal models",
    ],
    signs: [
      "Disposal hums but doesn't spin (jam or motor issue)",
      "Complete silence when switched on (no power)",
      "Water leaking from the unit bottom, top, or side",
      "Persistent bad odors that cleaning doesn't fix",
      "Disposal runs but drains slowly or backs up",
    ],
    process: [
      { n: "01", title: "Diagnose the Issue", body: "We test for jams, motor failure, electrical issues, and plumbing leaks to identify the exact problem." },
      { n: "02", title: "Repair or Replace", body: "Many disposals can be repaired on-site. When the unit is beyond repair, we carry replacement units on our trucks." },
      { n: "03", title: "Proper Connection", body: "We connect the new or repaired disposal to the drain, dishwasher line, and electrical supply correctly and to code." },
      { n: "04", title: "Test Thoroughly", body: "We run the disposal through a full test cycle, check all connections for leaks, and confirm proper drainage." },
    ],
    faq: [
      { q: "Why is my garbage disposal humming but not working?", a: "The disposal motor is receiving power but the grinding plate is jammed. We use the hex wrench reset port to clear the jam. If the motor is burned out, replacement is needed." },
      { q: "Can garbage disposals be repaired?", a: "Jams, resets, and minor leaks can often be repaired. If the motor has failed or the unit is over 8–10 years old, replacement is usually more cost-effective." },
      { q: "How long does a disposal installation take?", a: "Usually 45–90 minutes for a standard replacement, including drain and dishwasher line connection." },
      { q: "What size disposal do I need?", a: "For a standard household, 1/2 to 3/4 horsepower is sufficient. Larger families or heavy kitchen use benefit from 1+ HP units with better grinding and noise insulation." },
      { q: "My disposal smells bad even after cleaning — what's wrong?", a: "Food debris buildup inside the grinding chamber or under the splash guard is usually the cause. If cleaning doesn't help, EPR can inspect and advise on repair or replacement." },
    ],
  },

  "emergency-service": {
    name: "Emergency Plumbing",
    icon: Siren,
    title: "24/7 Emergency Plumbing in La Plata & Southern Maryland | EPR Plumbing",
    description: "24/7 emergency plumber in La Plata, Waldorf & Southern Maryland. Burst pipes, flood response, sewer backup — fast dispatch, higher rate after 3pm. Call (240) 381-9035.",
    badge: "24/7 Emergency Dispatch · Fast Response",
    heroLine1: "Plumbing Emergency?",
    heroLine2: "We Come to You.",
    heroSub: "Day or night, EPR dispatches fast across Southern Maryland. We screen every call, confirm urgency, and get a licensed tech to you — no waiting.",
    intro: "Plumbing emergencies don't wait for business hours. EPR Plumbing provides 24/7 emergency plumbing service throughout Charles, Prince George's, Calvert, and St. Mary's Counties. We screen every after-hours call with care, confirm the nature and urgency of your situation, and dispatch a licensed technician with the right parts. Emergency slots start at 3pm — and we treat every one of them with the speed and professionalism they deserve.",
    offers: [
      "Burst pipe emergency response & repair",
      "Flood & water overflow mitigation",
      "Sewer backup emergency clearing",
      "Emergency toilet leak priority dispatch",
      "Shut-off valve service & emergency isolation",
      "After-hours water heater failure response",
    ],
    signs: [
      "Water actively spraying or flooding in the home",
      "Sewage backing up through floor drains or toilets",
      "Complete loss of water supply",
      "Gas-line related water heater failure",
      "Toilet leaking at base with water on floor",
    ],
    process: [
      { n: "01", title: "Call or Book", body: "Call (240) 381-9035 or book online. After 3pm, our emergency line connects you to a live team member immediately." },
      { n: "02", title: "We Screen & Confirm", body: "We ask about the nature of the emergency, confirm urgency with empathy, and make sure you know this is an after-hours service." },
      { n: "03", title: "Dispatch & Update", body: "A licensed EPR tech is dispatched immediately. You get an SMS and email confirmation with job summary sent to our night-duty manager." },
      { n: "04", title: "Fix It Tonight", body: "Our tech arrives, resolves the emergency, and ensures your home is stable before leaving — no partial fixes, no callbacks." },
    ],
    faq: [
      { q: "How quickly can EPR respond to an emergency?", a: "We aim for fast dispatch across Southern Maryland. Response times depend on your location and current call volume — we'll give you an honest ETA when you call." },
      { q: "Is there an extra charge for emergency service?", a: "Yes — after-hours emergency slots (3pm onwards) carry a higher rate. We're transparent about this upfront when you call, before any work begins." },
      { q: "What counts as a plumbing emergency?", a: "Burst pipes, active flooding, sewer backups into the home, no water supply, and toilet leaks with water on the floor are all true emergencies. If you're unsure, call us — we'll help you decide." },
      { q: "What should I do while I wait for the plumber?", a: "Shut off the main water supply valve if water is flooding. Place towels or containers to limit damage. Don't use any drains or fixtures if sewage is backing up." },
      { q: "Do you prioritize toilet leaks?", a: "Yes — toilet leaks are flagged for priority dispatch at EPR. Water at the base of a toilet can cause significant floor damage quickly, so we treat it urgently." },
    ],
  },

  "inspection-prevention": {
    name: "Plumbing Inspections",
    icon: ShieldCheck,
    title: "Plumbing Inspections & Preventive Maintenance in Southern Maryland | EPR Plumbing",
    description: "Pre-purchase plumbing inspections, backflow testing & preventive maintenance in La Plata & Southern Maryland. Licensed plumbers — call (240) 381-9035.",
    badge: "Inspections & Preventive Maintenance",
    heroLine1: "Catch Problems",
    heroLine2: "Before They Start.",
    heroSub: "Pre-purchase inspections, backflow testing, and preventive maintenance across Southern Maryland — EPR keeps your plumbing healthy year-round.",
    intro: "The best plumbing repair is the one you never need. EPR Plumbing offers comprehensive plumbing inspections and preventive maintenance programs for homeowners, property managers, and commercial clients throughout Southern Maryland. From pre-purchase inspections before you buy a home to annual backflow testing for commercial properties, we help you avoid expensive surprises and keep your plumbing running efficiently.",
    offers: [
      "Pre-purchase home plumbing inspections",
      "Backflow prevention device testing & certification",
      "Water pressure testing & regulation",
      "Full plumbing system health inspection",
      "Water quality testing & analysis",
      "Annual preventive maintenance plans for properties",
    ],
    signs: [
      "Purchasing a home and wanting plumbing peace of mind",
      "Commercial property requiring annual backflow certification",
      "Older home with unknown pipe condition",
      "High water bills without an obvious explanation",
      "Property management needing regular maintenance scheduling",
    ],
    process: [
      { n: "01", title: "Schedule & Scope", body: "We discuss what you need — full home inspection, backflow test, or targeted evaluation — and schedule at your convenience." },
      { n: "02", title: "Full System Review", body: "We inspect supply lines, drains, water heater, fixtures, visible pipes, water pressure, and any accessible connections." },
      { n: "03", title: "Written Report", body: "You receive a detailed written report of findings, condition ratings, and prioritized recommendations with no pressure to act immediately." },
      { n: "04", title: "Repair or Monitor", body: "If issues are found, we provide honest repair quotes. For healthy systems, we'll recommend a maintenance schedule to stay ahead of problems." },
    ],
    faq: [
      { q: "Do I need a plumbing inspection before buying a home?", a: "Strongly recommended. A standard home inspection often overlooks plumbing-specific issues like pinhole leaks, galvanized pipe deterioration, and sewer line condition. EPR's inspection gives you a complete picture." },
      { q: "How long does a plumbing inspection take?", a: "A thorough residential inspection takes 1.5–2.5 hours. Commercial inspections vary by property size and complexity." },
      { q: "What is backflow testing and who needs it?", a: "Backflow preventers protect your drinking water from contamination. Commercial properties, irrigation systems, and some residential connections require annual backflow testing and certification by law in Maryland." },
      { q: "How often should I have my plumbing inspected?", a: "For older homes (30+ years), annual inspection is smart. For newer construction, every 2–3 years is sufficient unless you notice a problem." },
      { q: "Can you provide documentation for insurance or code compliance?", a: "Yes — EPR provides written inspection reports, backflow test certificates, and compliance documentation for insurance, property sales, and regulatory requirements." },
    ],
  },
} as const;

type ServiceSlug = keyof typeof SERVICES_DATA;
const VALID_SLUGS = Object.keys(SERVICES_DATA) as ServiceSlug[];

// ── Route ──────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const svc = SERVICES_DATA[params.slug as ServiceSlug] ?? null;
    if (!svc) throw notFound();
    return { svc, slug: params.slug as ServiceSlug };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.svc) return {};
    const { svc } = loaderData;
    return {
      meta: [
        { title: svc.title },
        { name: "description", content: svc.description },
        { property: "og:title", content: svc.title },
        { property: "og:description", content: svc.description },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index, follow" },
      ],
    };
  },
  component: ServicePage,
});

// ── FAQ Item ───────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-charcoal hover:bg-secondary/50 transition"
      >
        <span>{q}</span>
        {open ? <ChevronUp className="size-4 text-turquoise shrink-0" /> : <ChevronDown className="size-4 text-turquoise shrink-0" />}
      </button>
      {open && <div className="px-5 pb-4 text-charcoal/80 text-sm leading-relaxed">{a}</div>}
    </div>
  );
}

// ── JSON-LD schemas ────────────────────────────────────────────────────────────
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function buildSchemas(svc: (typeof SERVICES_DATA)[ServiceSlug]) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "EPR Plumbing & Remodeling",
    image: "https://epr-plumbing-app.drivyn-ai-innovations.workers.dev",
    "@id": "https://epr-plumbing-app.drivyn-ai-innovations.workers.dev",
    url: "https://epr-plumbing-app.drivyn-ai-innovations.workers.dev",
    telephone: "+12403819035",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8270 Fairground Rd",
      addressLocality: "La Plata",
      addressRegion: "MD",
      postalCode: "20646",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 38.5359, longitude: -76.9758 },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" }],
    priceRange: "$$",
    areaServed: ["Charles County MD", "Prince George's County MD", "Calvert County MD", "St. Mary's County MD"],
    sameAs: ["https://eprplumbingandremodeling.com"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: svc.name,
    provider: { "@type": "Plumber", name: "EPR Plumbing & Remodeling" },
    areaServed: { "@type": "State", name: "Maryland" },
    description: svc.description,
  };

  return { localBusiness, faqSchema, serviceSchema };
}

// ── Page component ─────────────────────────────────────────────────────────────
function ServicePage() {
  const { svc } = Route.useLoaderData();
  const Icon = svc.icon;
  const schemas = buildSchemas(svc);

  return (
    <div className="min-h-screen bg-background text-charcoal">
      <JsonLd data={schemas.localBusiness} />
      <JsonLd data={schemas.faqSchema} />
      <JsonLd data={schemas.serviceSchema} />

      <SiteHeader bookHref="/#book-service" />

      {/* Service Hero */}
      <section className="bg-charcoal py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-turquoise/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <Icon className="size-4" /> {svc.badge}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-[1.05] mb-5">
              {svc.heroLine1} <span className="text-turquoise">{svc.heroLine2}</span>
            </h1>
            <p className="text-xl text-white/75 leading-relaxed mb-8 max-w-2xl">{svc.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/#book-service"
                className="group bg-turquoise text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 shadow-turquoise transition">
                <Calendar className="size-5" /> Book a Service
                <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </a>
              <a href={`tel:${PHONE}`}
                className="bg-transparent border-2 border-white text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-charcoal transition">
                <Phone className="size-5 text-turquoise" /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex flex-wrap gap-6">
          {["Licensed & Insured", "Southern Maryland", "Open 24 Hours", "Same-Day Service", "No Hidden Fees"].map((t) => (
            <span key={t} className="flex items-center gap-2 text-sm text-charcoal/80 font-medium">
              <CheckCircle2 className="size-4 text-turquoise" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <div>
              <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">About This Service</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-5">{svc.name} by EPR Plumbing</h2>
              <p className="text-lg text-charcoal/75 leading-relaxed">{svc.intro}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-secondary/40 rounded-2xl p-7 border border-border">
              <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-4">What's Included</p>
              <ul className="space-y-3">
                {svc.offers.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-charcoal/85">
                    <CheckCircle2 className="size-4 text-turquoise shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">Warning Signs</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal">Do You Need {svc.name}?</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {svc.signs.map((sign, i) => (
              <Reveal key={sign} delay={i * 60}>
                <div className="bg-white rounded-xl border border-border p-5 flex items-start gap-3">
                  <AlertTriangle className="size-5 text-turquoise shrink-0 mt-0.5" />
                  <span className="text-sm text-charcoal/85">{sign}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">Recognizing any of these? Don't wait — call EPR now.</p>
              <a href={`tel:${PHONE}`}
                className="bg-turquoise text-white font-semibold px-7 py-3.5 rounded-xl inline-flex items-center gap-2 hover:opacity-90 shadow-turquoise transition">
                <Phone className="size-4" /> Call {PHONE}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">Our Process</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal">How EPR Gets It Done</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {svc.process.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="text-center bg-secondary/40 rounded-2xl p-7 border border-border">
                  <div className="size-16 mx-auto rounded-full bg-white border-2 border-turquoise flex items-center justify-center font-display text-xl font-bold text-turquoise mb-4 shadow-sm">
                    {s.n}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-charcoal mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why EPR */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why EPR Plumbing</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-5">Southern Maryland's Trusted Plumbers</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                EPR Plumbing & Remodeling is based in La Plata, MD and serves Charles, Prince George's, Calvert, and St. Mary's Counties. We're licensed, insured, and available 24 hours a day — with emergency dispatch for after-hours calls starting at 3pm.
              </p>
              <ul className="space-y-3">
                {["Licensed & fully insured in Maryland", "Same-day and emergency service available", "Upfront pricing — no surprises on your invoice", "SMS & email confirmation on every booking", "Toilet leaks flagged for priority dispatch"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                    <CheckCircle2 className="size-4 text-turquoise shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "24/7", sub: "Emergency Service" },
                { label: "5★", sub: "Google Rated" },
                { label: "4 Counties", sub: "Service Area" },
                { label: "Same Day", sub: "Appointments" },
              ].map((stat) => (
                <div key={stat.label} className="bg-turquoise/10 border border-turquoise/30 rounded-2xl p-6 text-center">
                  <p className="font-display text-3xl font-bold text-turquoise mb-1">{stat.label}</p>
                  <p className="text-white/70 text-sm">{stat.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">Common Questions</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal">{svc.name} FAQ</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {svc.faq.map((item) => (
              <Reveal key={item.q}>
                <FaqItem q={item.q} a={item.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Local Service Area */}
      <section className="py-16 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">Service Area</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-4">
              {svc.name} — Southern Maryland
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              EPR Plumbing provides {svc.name.toLowerCase()} services throughout {AREA} — and everywhere in between across Charles, Prince George's, Calvert & St. Mary's Counties.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["La Plata", "Waldorf", "White Plains", "Indian Head", "Clinton", "Bowie", "Upper Marlboro", "Prince Frederick", "Leonardtown"].map((city) => (
                <span key={city} className="inline-flex items-center gap-1.5 bg-white border border-border px-4 py-2 rounded-full text-sm text-charcoal font-medium">
                  <MapPin className="size-3 text-turquoise" /> {city}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-turquoise/10 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
              Ready to Book Your <span className="text-turquoise">{svc.name}?</span>
            </h2>
            <p className="text-white/75 text-lg mb-8">Schedule online or call EPR directly — same-day service across Southern Maryland.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href="/#book-service"
                className="bg-turquoise text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:opacity-90 shadow-turquoise transition">
                <Calendar className="size-5" /> Book Online
              </a>
              <a href={`tel:${PHONE}`}
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white hover:text-charcoal transition">
                <Phone className="size-5" /> {PHONE}
              </a>
            </div>
            <p className="text-white/50 text-sm">Licensed. Insured. Open 24 Hours. La Plata, MD 20646.</p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
      <VoiceWidget />
    </div>
  );
}

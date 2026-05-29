import { createFileRoute, notFound } from "@tanstack/react-router";
import { Phone, MapPin, CheckCircle2, ArrowRight, Calendar, ShieldCheck, Clock, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const PHONE = "(240) 381-9035";
const EMAIL = "GetStarted@eprplumbingandremodeling.com";

interface LocationData {
  name: string;
  state: string;
  county: string;
  zip: string;
  title: string;
  description: string;
  badge: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  intro: string;
  nearbyAreas: string[];
  faq: { q: string; a: string }[];
}

type LocationSlug =
  | "la-plata"
  | "waldorf"
  | "clinton"
  | "fort-washington"
  | "prince-frederick"
  | "lexington-park"
  | "brandywine"
  | "accokeek"
  | "washington-dc"
  | "northern-virginia";

const LOCATIONS_DATA: Record<LocationSlug, LocationData> = {
  "la-plata": {
    name: "La Plata",
    state: "MD",
    county: "Charles County",
    zip: "20646",
    title: "Plumber in La Plata, MD | EPR Plumbing & Remodeling",
    description: "Licensed plumbers in La Plata, MD serving Charles County 24/7. Drain cleaning, water heaters, pipe repair, emergency service. Call (240) 381-9035 for same-day service.",
    badge: "La Plata, MD · Charles County Headquarters",
    heroLine1: "La Plata's Trusted",
    heroLine2: "Plumbing Team.",
    heroSub: "EPR Plumbing is headquartered right here in La Plata. When you need a licensed plumber fast, we're already in your neighborhood — 24/7, no dispatching delays.",
    intro: "As La Plata's home-based plumbing company, EPR Plumbing & Remodeling has served Charles County homeowners, businesses, and government facilities since day one. Our trucks are local, our techs know the area, and our response times reflect it. Whether it's a weekend leak or a full bathroom remodel, we handle it with the professionalism La Plata deserves.",
    nearbyAreas: ["Waldorf", "White Plains", "Pomfret", "Hughesville", "Port Tobacco"],
    faq: [
      { q: "Do you offer emergency plumbing in La Plata, MD?", a: "Yes — EPR Plumbing is available 24/7 for emergencies in La Plata and all of Charles County. Call (240) 381-9035 any time for same-day emergency dispatch." },
      { q: "How fast can a plumber arrive in La Plata?", a: "Because we're headquartered in La Plata, our response times are among the fastest in the area — typically within 60–90 minutes for urgent calls." },
      { q: "Do you service government facilities in La Plata?", a: "Yes. EPR Plumbing works with government and municipal facilities across Charles County. Our technicians are vetted, background-checked, and carry the documentation required for government work." },
      { q: "What plumbing services do you offer in La Plata?", a: "We offer the full range: drain cleaning, water heater install and repair, pipe repair, leak detection, sewer line work, fixture installation, toilet repair, garbage disposal, and preventive inspections." },
      { q: "Are your La Plata plumbers licensed and insured?", a: "Every technician EPR dispatches in La Plata is fully licensed in Maryland and carries liability insurance. We never use subcontractors without verification." },
    ],
  },
  "waldorf": {
    name: "Waldorf",
    state: "MD",
    county: "Charles County",
    zip: "20601",
    title: "Plumber in Waldorf, MD | EPR Plumbing & Remodeling",
    description: "Licensed plumbers serving Waldorf, MD 24/7. Fast response for drain cleaning, water heaters, pipe repair, and emergency plumbing in Charles County. Call (240) 381-9035.",
    badge: "Waldorf, MD · Charles County",
    heroLine1: "Waldorf Plumbing",
    heroLine2: "Done Right, Fast.",
    heroSub: "EPR Plumbing serves Waldorf homeowners and businesses with fast, licensed plumbing — from routine drain cleaning to after-hours burst pipe emergencies.",
    intro: "Waldorf is Charles County's largest community, and EPR Plumbing is one of its most trusted service providers. We handle everything from clogged kitchen drains to complete water heater replacements — with upfront pricing, licensed technicians, and same-day availability when you need it most.",
    nearbyAreas: ["La Plata", "White Plains", "Brandywine", "Accokeek", "Clinton"],
    faq: [
      { q: "Do you offer same-day plumbing in Waldorf, MD?", a: "Yes. EPR Plumbing offers same-day service in Waldorf for most plumbing needs. Call (240) 381-9035 and we'll confirm your slot." },
      { q: "Can you fix a clogged drain in Waldorf today?", a: "Absolutely. Drain cleaning is one of our most common calls in Waldorf. We use professional-grade equipment to clear blockages completely — not just temporarily." },
      { q: "Do you replace water heaters in Waldorf?", a: "Yes. We install, replace, and repair both tank and tankless water heaters in Waldorf, MD. Most replacements are completed same-day or next morning." },
      { q: "What areas of Waldorf do you cover?", a: "We cover all of Waldorf including St. Charles, Waldorf Station, Berry Road corridor, and surrounding neighborhoods in Charles County." },
      { q: "Do you handle plumbing for Waldorf businesses?", a: "Yes. EPR serves commercial properties in Waldorf from retail and restaurants to multi-unit complexes. We offer scheduled maintenance programs and priority emergency response." },
    ],
  },
  "clinton": {
    name: "Clinton",
    state: "MD",
    county: "Prince George's County",
    zip: "20735",
    title: "Plumber in Clinton, MD | EPR Plumbing & Remodeling",
    description: "Licensed plumbers in Clinton, MD (Prince George's County) available 24/7. Drain cleaning, water heaters, leak detection, pipe repair. Call (240) 381-9035 for fast service.",
    badge: "Clinton, MD · Prince George's County",
    heroLine1: "Clinton's Go-To",
    heroLine2: "Plumbing Crew.",
    heroSub: "EPR Plumbing serves Clinton, MD with licensed, insured technicians ready for any plumbing job — emergency or planned. Same-day available, 24/7 emergency dispatch.",
    intro: "Clinton homeowners know that plumbing problems don't keep business hours. EPR Plumbing brings the same fast, professional service to Clinton that we're known for across Southern Maryland — with upfront pricing, licensed techs, and zero hidden fees. From leak detection to water heater installs, we've got Clinton covered.",
    nearbyAreas: ["Fort Washington", "Brandywine", "Waldorf", "Oxon Hill", "Temple Hills"],
    faq: [
      { q: "Do you serve Clinton, MD for emergency plumbing?", a: "Yes — EPR Plumbing dispatches to Clinton 24/7 for burst pipes, major leaks, and other emergencies. Call (240) 381-9035 any time." },
      { q: "How much does a plumber cost in Clinton, MD?", a: "Pricing depends on the job. EPR provides upfront quotes before any work begins — no surprise charges. Standard drain cleaning typically starts around $100–$200 in Clinton." },
      { q: "Do you handle sewer line issues in Clinton?", a: "Yes. We diagnose and repair sewer line problems in Clinton including root intrusion, collapsed lines, and blockages using camera inspection and hydro-jetting." },
      { q: "Can you replace a water heater in Clinton same day?", a: "In most cases, yes. Call us in the morning and we can often have your new water heater installed by evening." },
      { q: "Are you licensed to work in Prince George's County?", a: "Yes. EPR Plumbing holds the required Maryland state license and is authorized to work in Prince George's County including Clinton." },
    ],
  },
  "fort-washington": {
    name: "Fort Washington",
    state: "MD",
    county: "Prince George's County",
    zip: "20744",
    title: "Plumber in Fort Washington, MD | EPR Plumbing & Remodeling",
    description: "Licensed plumbers serving Fort Washington, MD 24/7. Drain cleaning, water heaters, pipe repair, leak detection in Prince George's County. Call (240) 381-9035.",
    badge: "Fort Washington, MD · Prince George's County",
    heroLine1: "Fort Washington Plumbing",
    heroLine2: "Fast & Licensed.",
    heroSub: "EPR Plumbing serves Fort Washington with licensed technicians, upfront pricing, and 24/7 emergency availability — from routine maintenance to urgent pipe repairs.",
    intro: "Fort Washington sits at the crossroads of Prince George's and Charles Counties, and EPR Plumbing is positioned to serve it well. Our technicians are familiar with the homes, infrastructure, and neighborhoods of Fort Washington — from the older communities along the Potomac to newer subdivisions off Old Fort Road. We bring the same professional standard to every call.",
    nearbyAreas: ["Clinton", "Accokeek", "Oxon Hill", "National Harbor", "Waldorf"],
    faq: [
      { q: "Do you provide plumbing services in Fort Washington, MD?", a: "Yes. EPR Plumbing serves all of Fort Washington, MD including residential neighborhoods, commercial properties, and government facilities." },
      { q: "What's the fastest way to get a plumber in Fort Washington?", a: "Call (240) 381-9035 directly for the fastest response. For non-emergencies, you can also book online through our website." },
      { q: "Do you fix slab leaks in Fort Washington?", a: "Yes. We perform leak detection including slab leak location using advanced equipment, and handle the repair from diagnosis through resolution." },
      { q: "Can EPR handle older homes in Fort Washington?", a: "Absolutely. We work with older plumbing systems including galvanized pipe, cast iron drain lines, and outdated fixtures — common in Fort Washington's established neighborhoods." },
      { q: "Is EPR Plumbing licensed in Prince George's County?", a: "Yes. We hold a valid Maryland plumbing license and are fully authorized to work in Prince George's County including Fort Washington." },
    ],
  },
  "prince-frederick": {
    name: "Prince Frederick",
    state: "MD",
    county: "Calvert County",
    zip: "20678",
    title: "Plumber in Prince Frederick, MD | EPR Plumbing & Remodeling",
    description: "Licensed plumbers serving Prince Frederick and Calvert County 24/7. Drain cleaning, water heater install, pipe repair, sewer line service. Call (240) 381-9035.",
    badge: "Prince Frederick, MD · Calvert County",
    heroLine1: "Calvert County's",
    heroLine2: "Trusted Plumbers.",
    heroSub: "EPR Plumbing serves Prince Frederick and all of Calvert County with licensed, insured technicians available 24/7 — fast response, fair pricing, no surprises.",
    intro: "Prince Frederick is the heart of Calvert County, and EPR Plumbing is proud to serve its residents and businesses. Whether you're in a waterfront home on the Bay or a neighborhood off Route 4, our team responds fast with the tools and expertise to get it done right. We bring Southern Maryland's best plumbing service directly to your door.",
    nearbyAreas: ["Dunkirk", "Lusby", "Chesapeake Beach", "North Beach", "Huntingtown"],
    faq: [
      { q: "Do you offer plumbing service in Prince Frederick, MD?", a: "Yes. EPR Plumbing serves Prince Frederick and all of Calvert County with full residential and commercial plumbing services." },
      { q: "How quickly can you get to Prince Frederick for an emergency?", a: "EPR typically reaches Prince Frederick within 60–120 minutes for emergency calls. Call (240) 381-9035 any time, day or night." },
      { q: "Do you install well pumps or water treatment systems in Calvert County?", a: "Yes. We work with well systems and water treatment in Calvert County's rural and semi-rural properties where municipal water isn't available." },
      { q: "Can you handle a full bathroom remodel in Prince Frederick?", a: "Yes. Beyond plumbing repairs, EPR offers bathroom remodeling services including fixture replacement, pipe relocation, and new installations." },
      { q: "Are your technicians familiar with Calvert County homes?", a: "Yes. Our team regularly works in Calvert County and understands the mix of older rural homes and newer construction common throughout the area." },
    ],
  },
  "lexington-park": {
    name: "Lexington Park",
    state: "MD",
    county: "St. Mary's County",
    zip: "20653",
    title: "Plumber in Lexington Park, MD | EPR Plumbing & Remodeling",
    description: "Licensed plumbers serving Lexington Park and St. Mary's County 24/7. Drain cleaning, water heaters, pipe repair, emergency plumbing. Call (240) 381-9035.",
    badge: "Lexington Park, MD · St. Mary's County",
    heroLine1: "St. Mary's County",
    heroLine2: "Plumbing Experts.",
    heroSub: "EPR Plumbing serves Lexington Park and all of St. Mary's County with licensed technicians, 24/7 emergency dispatch, and the professional standard the community deserves.",
    intro: "Lexington Park is a growing community in St. Mary's County, home to military families, government contractors, and long-time Southern Maryland residents. EPR Plumbing understands the unique needs of this community — fast, reliable service with the discretion and professionalism that comes standard on every job. We're proud to serve NAS Patuxent River personnel and the surrounding area.",
    nearbyAreas: ["California, MD", "Great Mills", "Hollywood", "Leonardtown", "Mechanicsville"],
    faq: [
      { q: "Does EPR Plumbing serve Lexington Park, MD?", a: "Yes. EPR Plumbing serves Lexington Park and the greater St. Mary's County area including California, MD, Great Mills, and Leonardtown." },
      { q: "Do you work with military housing near Pax River?", a: "Yes. We serve military and civilian housing in and around NAS Patuxent River. Our technicians are background-checked and professional." },
      { q: "What's the fastest way to get plumbing help in Lexington Park?", a: "Call (240) 381-9035 directly — our dispatch team will confirm availability and give you an accurate ETA for Lexington Park." },
      { q: "Do you handle well and septic system plumbing in St. Mary's County?", a: "Yes. We work with well water systems and plumbing connected to septic systems, which are common throughout rural St. Mary's County." },
      { q: "Are you licensed for commercial plumbing in Lexington Park?", a: "Yes. EPR holds a Maryland commercial plumbing license and serves businesses, government contractors, and multi-unit properties in Lexington Park." },
    ],
  },
  "brandywine": {
    name: "Brandywine",
    state: "MD",
    county: "Prince George's County",
    zip: "20613",
    title: "Plumber in Brandywine, MD | EPR Plumbing & Remodeling",
    description: "Licensed plumbers serving Brandywine, MD 24/7. Fast drain cleaning, water heater service, pipe repair, and emergency plumbing in Prince George's County. Call (240) 381-9035.",
    badge: "Brandywine, MD · Prince George's County",
    heroLine1: "Brandywine Plumbing",
    heroLine2: "When You Need It.",
    heroSub: "EPR Plumbing covers Brandywine with same-day service, licensed technicians, and 24/7 emergency availability — because plumbing problems don't wait.",
    intro: "Brandywine sits at the crossroads of Charles and Prince George's Counties, and EPR Plumbing is one of the few licensed providers with the reach to serve it well. From rural properties with well systems to newer subdivisions on municipal water, we handle the full scope of residential and commercial plumbing with speed and precision.",
    nearbyAreas: ["Waldorf", "Clinton", "Accokeek", "Upper Marlboro", "La Plata"],
    faq: [
      { q: "Do you serve Brandywine, MD for plumbing repairs?", a: "Yes. EPR Plumbing serves Brandywine and the surrounding communities in Prince George's and Charles Counties." },
      { q: "How quickly can you respond to a plumbing emergency in Brandywine?", a: "We typically reach Brandywine within 60–90 minutes for urgent calls. Call (240) 381-9035 any time for emergency dispatch." },
      { q: "Do you work on rural properties with well systems in Brandywine?", a: "Yes. Many Brandywine properties use well water, and our technicians are experienced working with well-fed plumbing systems." },
      { q: "Can you clear a severe drain clog in Brandywine?", a: "Yes. We use professional hydro-jetting and snaking equipment to clear even the toughest blockages in Brandywine homes and businesses." },
      { q: "Is EPR Plumbing licensed in Prince George's County?", a: "Yes. We hold a valid Maryland plumbing license and are authorized to work throughout Prince George's County including Brandywine." },
    ],
  },
  "accokeek": {
    name: "Accokeek",
    state: "MD",
    county: "Prince George's County",
    zip: "20607",
    title: "Plumber in Accokeek, MD | EPR Plumbing & Remodeling",
    description: "Licensed plumbers serving Accokeek, MD 24/7. Drain cleaning, leak detection, water heater replacement, pipe repair in Prince George's County. Call (240) 381-9035.",
    badge: "Accokeek, MD · Prince George's County",
    heroLine1: "Accokeek Plumbing",
    heroLine2: "Local & Licensed.",
    heroSub: "EPR Plumbing serves Accokeek with experienced, licensed plumbers available 24/7 — from basic repairs to full emergency response. No dispatch delays, no runaround.",
    intro: "Accokeek is a quiet community on the Potomac with a mix of established homes and newer construction — and plumbing needs that require a provider who knows the area. EPR Plumbing brings the same professional service that Charles County and Southern Maryland trust, right to your Accokeek door. Upfront pricing, licensed techs, and a satisfaction guarantee on every job.",
    nearbyAreas: ["Fort Washington", "Waldorf", "Brandywine", "Indian Head", "Piscataway"],
    faq: [
      { q: "Does EPR Plumbing service Accokeek, MD?", a: "Yes. EPR Plumbing serves Accokeek and surrounding Prince George's County communities including Fort Washington and Brandywine." },
      { q: "What plumbing services are available in Accokeek?", a: "We offer drain cleaning, water heater service, pipe repair, leak detection, fixture installation, toilet repair, sewer line work, and emergency plumbing in Accokeek." },
      { q: "Do you serve older homes in Accokeek?", a: "Yes. Accokeek has many older homes with legacy plumbing. Our technicians work with galvanized pipe, cast iron drains, and older fixtures regularly." },
      { q: "How do I book a plumber in Accokeek?", a: "Call (240) 381-9035 or use the online booking form on our website. We'll confirm your appointment and send SMS and email confirmation." },
      { q: "Is EPR Plumbing licensed for work in Accokeek?", a: "Yes. We hold a valid Maryland state plumbing license and carry full liability insurance for all work in Accokeek and Prince George's County." },
    ],
  },
  "washington-dc": {
    name: "Washington",
    state: "DC",
    county: "Washington DC",
    zip: "20001",
    title: "Plumber in Washington DC | EPR Plumbing & Remodeling",
    description: "Licensed plumbers serving Washington DC 24/7. Fast drain cleaning, water heater service, pipe repair, leak detection, and emergency plumbing. Call (240) 381-9035.",
    badge: "Washington, DC · 24/7 Emergency Plumbing",
    heroLine1: "Washington DC's",
    heroLine2: "Trusted Plumbers.",
    heroSub: "EPR Plumbing serves Washington DC homeowners, businesses, and government facilities with licensed, insured technicians available 24/7 — fast response, upfront pricing.",
    intro: "Washington DC's diverse mix of historic row houses, modern condos, and government facilities demands a plumber who can handle it all. EPR Plumbing brings Maryland-licensed expertise across the District — from Capitol Hill to Georgetown, Southeast to Northwest. We understand DC's unique building stock and plumbing challenges, and we respond fast when it matters most.",
    nearbyAreas: ["Georgetown", "Capitol Hill", "Anacostia", "Petworth", "Silver Spring, MD", "Bethesda, MD"],
    faq: [
      { q: "Does EPR Plumbing serve Washington DC?", a: "Yes. EPR Plumbing serves Washington DC for residential, commercial, and government plumbing. Call (240) 381-9035 for same-day and emergency service." },
      { q: "Can you handle plumbing in DC row houses and older buildings?", a: "Absolutely. We regularly work in DC's historic row houses and older buildings, including properties with cast iron drains, galvanized supply lines, and lead service connections." },
      { q: "Do you offer emergency plumbing in DC?", a: "Yes — 24/7. Whether it's a burst pipe in the middle of the night or a sewer backup on a weekend, EPR dispatches to DC around the clock." },
      { q: "Are you licensed to do plumbing work in Washington DC?", a: "Yes. EPR Plumbing holds the licenses required to perform plumbing work in Washington DC and carries full liability insurance on every job." },
      { q: "Do you service government and commercial buildings in DC?", a: "Yes. EPR has experience with government facilities, multi-unit residential, and commercial properties across Washington DC, with vetted and background-checked technicians." },
    ],
  },
  "northern-virginia": {
    name: "Northern Virginia",
    state: "VA",
    county: "Northern Virginia",
    zip: "22201",
    title: "Plumber in Northern Virginia | EPR Plumbing & Remodeling",
    description: "Licensed plumbers serving Northern Virginia 24/7 — Arlington, Alexandria, Fairfax, Falls Church & more. Drain cleaning, water heaters, pipe repair, emergency service. Call (240) 381-9035.",
    badge: "Northern Virginia · Arlington · Alexandria · Fairfax",
    heroLine1: "Northern Virginia",
    heroLine2: "Plumbing Experts.",
    heroSub: "EPR Plumbing covers Northern Virginia with licensed, insured technicians — serving Arlington, Alexandria, Fairfax, and beyond with 24/7 emergency availability and same-day service.",
    intro: "Northern Virginia is one of the fastest-growing regions in the country, with a wide range of homes from post-war bungalows in Arlington to modern townhomes in Fairfax. EPR Plumbing brings the same professional standard we've built in Southern Maryland right across the river — fast response, transparent pricing, and licensed technicians who know what they're doing.",
    nearbyAreas: ["Arlington", "Alexandria", "Fairfax", "Falls Church", "McLean", "Reston"],
    faq: [
      { q: "Does EPR Plumbing serve Northern Virginia?", a: "Yes. EPR Plumbing serves the Northern Virginia area including Arlington, Alexandria, Fairfax, Falls Church, McLean, and surrounding communities." },
      { q: "Can I get same-day plumbing service in Northern Virginia?", a: "Yes. We offer same-day service in most of Northern Virginia. Call (240) 381-9035 early and we'll do our best to get a tech to you the same day." },
      { q: "Do you handle emergency plumbing in Northern Virginia?", a: "Yes — 24/7 emergency dispatch to Northern Virginia for burst pipes, major leaks, sewer backups, and other urgent plumbing situations." },
      { q: "Are you licensed to work in Virginia?", a: "Yes. EPR Plumbing holds the licenses required for plumbing work in Virginia and carries full liability insurance on all jobs in Northern Virginia." },
      { q: "What plumbing services do you offer in Northern Virginia?", a: "We offer drain cleaning, water heater service, pipe repair, leak detection, fixture installation, toilet repair, sewer line work, garbage disposal, and emergency plumbing throughout Northern Virginia." },
    ],
  },
};

type Props = { svc: LocationData; slug: string };

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const loc = LOCATIONS_DATA[params.slug as LocationSlug] ?? null;
    if (!loc) throw notFound();
    return { loc, slug: params.slug as LocationSlug };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.loc) return {};
    const { loc } = loaderData;
    return {
      meta: [
        { title: loc.title },
        { name: "description", content: loc.description },
        { property: "og:title", content: loc.title },
        { property: "og:description", content: loc.description },
        { name: "robots", content: "index, follow" },
      ],
    };
  },
  component: LocationPage,
});

function LocationPage() {
  const { loc, slug } = Route.useLoaderData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const ldLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "EPR Plumbing & Remodeling",
    description: `Licensed plumbers serving ${loc.name}, ${loc.state} and ${loc.county}.`,
    telephone: "+12403819035",
    email: EMAIL,
    url: `https://eprplumbingandremodeling.com/locations/${slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "8270 Fairground Rd",
      addressLocality: "La Plata",
      addressRegion: "MD",
      postalCode: "20646",
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: loc.name, containedInPlace: { "@type": "AdministrativeArea", name: loc.county } },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "47" },
  };

  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldLocalBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFaq) }} />

      <div className="min-h-screen bg-background text-charcoal">
        <SiteHeader />

        {/* Hero */}
        <section className="bg-charcoal text-white py-20 px-5 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              <MapPin className="size-3.5" /> {loc.badge}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mb-6">
              {loc.heroLine1} <span className="text-turquoise">{loc.heroLine2}</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-8">{loc.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4">
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

        {/* Trust strip */}
        <section className="bg-white border-b border-border py-5">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 flex flex-wrap gap-6 justify-center">
            {[
              [ShieldCheck, "Licensed & Insured"],
              [Clock, "Open 24/7"],
              [Star, "5★ Google Rating"],
              [CheckCircle2, "No Hidden Fees"],
              [MapPin, `Serving ${loc.county}`],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-2 text-sm font-medium text-charcoal">
                <Icon className="size-4 text-turquoise shrink-0" />
                <span>{label as string}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">Your Local Plumbers</p>
              <h2 className="font-display text-4xl font-semibold text-charcoal mb-5 leading-tight">
                Serving {loc.name}, {loc.county}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{loc.intro}</p>
            </div>
            <div className="bg-secondary/40 rounded-2xl p-6 space-y-3">
              <h3 className="font-semibold text-charcoal mb-4">Services Available in {loc.name}</h3>
              {[
                "Drain Cleaning & Hydro-Jetting",
                "Water Heater Install & Repair",
                "Pipe Repair & Replacement",
                "Fixture & Faucet Installation",
                "Toilet Repair & Replacement",
                "Sewer Line Inspection & Repair",
                "Leak Detection",
                "Garbage Disposal Service",
                "Emergency Plumbing (24/7)",
                "Preventive Inspections",
              ].map((s) => (
                <div key={s} className="flex items-center gap-2.5 text-sm text-charcoal/85">
                  <CheckCircle2 className="size-4 text-turquoise shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why EPR */}
        <section className="py-20 bg-charcoal text-white">
          <div className="max-w-5xl mx-auto px-5 lg:px-8">
            <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-center">Why {loc.name} Chooses EPR</p>
            <h2 className="font-display text-4xl font-semibold text-center mb-12">The EPR Difference</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "24/7 Availability", body: "We don't stop taking calls at 5pm. Emergencies happen at midnight — we're ready." },
                { icon: ShieldCheck, title: "Licensed & Insured", body: "Every tech is Maryland-licensed and fully insured. No unlicensed subs, ever." },
                { icon: CheckCircle2, title: "Upfront Pricing", body: "You get the price before we touch anything. No surprises, no invoice shock." },
                { icon: Star, title: "5★ Reputation", body: "Our reviews reflect real work done for real customers across Southern Maryland." },
                { icon: MapPin, title: "Local Coverage", body: `We know ${loc.name} and ${loc.county} — our response times prove it.` },
                { icon: ArrowRight, title: "Same-Day Service", body: "Book in the morning, get it fixed by evening. That's the EPR standard." },
              ].map((c) => (
                <div key={c.title} className="bg-white/5 rounded-2xl p-6">
                  <c.icon className="size-8 text-turquoise mb-4" />
                  <h3 className="font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 lg:px-8">
            <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-center">Common Questions</p>
            <h2 className="font-display text-4xl font-semibold text-charcoal text-center mb-10">
              Plumbing in {loc.name}, {loc.state}
            </h2>
            <div className="space-y-3">
              {loc.faq.map((item, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-charcoal hover:bg-secondary/40 transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`size-4 text-turquoise shrink-0 transition-transform ml-3 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby areas */}
        <section className="py-14 bg-secondary/40">
          <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
            <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">Also Serving Nearby</p>
            <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">Neighboring Communities</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {loc.nearbyAreas.map((area) => (
                <span key={area} className="bg-white border border-border rounded-full px-4 py-1.5 text-sm font-medium text-charcoal">
                  {area}, MD
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-charcoal text-white text-center px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-semibold mb-4">
              Need a Plumber in {loc.name}?
            </h2>
            <p className="text-white/70 mb-8 text-lg">Call or book online — EPR is ready for your home, business, or facility.</p>
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

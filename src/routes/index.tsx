import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getVisitorGeo } from "@/lib/getVisitorGeo";
import {
  Phone, Calendar, ShieldCheck, Clock, Home, Building2, Landmark,
  Wrench, Siren, CheckCircle2, ArrowRight, Mail, Droplets,
  Gauge, Star, AlertTriangle, Zap, Award, MapPin,
} from "lucide-react";
import hero1 from "@/assets/damaged-pipe-with-leaking.jpg";
import hero2 from "@/assets/is-your-toilet-leaking.jpg";
import hero3 from "@/assets/plumber-fixing-toilet-washroom.jpg";
import hero4 from "@/assets/Garbage-Disposal-Repair.jpg";
import { VoiceWidget } from "@/components/site/VoiceWidget";
import { Reveal } from "@/components/site/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/")({
  loader: async () => {
    const geo = await getVisitorGeo();
    return { geo };
  },
  component: Index,
  head: ({ loaderData }) => {
    const city = loaderData?.geo?.city ?? null;
    const locationLabel = city ? `${city}, MD` : "Southern Maryland";
    const titleCity = city ? `${city} MD` : "Southern Maryland";
    return {
      meta: [
        { title: `Plumber ${titleCity} | EPR Plumbing & Remodeling` },
        { name: "description", content: `Licensed plumbers serving ${locationLabel} — drain cleaning, water heaters, pipe repair & emergency service 24/7. Residential, commercial & government. Call (240) 381-9035.` },
        { property: "og:title", content: `EPR Plumbing & Remodeling — ${locationLabel}` },
        { property: "og:description", content: `Trusted plumbing and remodeling for homes, businesses, and government facilities in ${locationLabel}. Licensed, insured, open 24 hours.` },
        { property: "og:url", content: "https://eprplumbingandremodeling.com/" },
        { property: "og:image", content: "https://eprplumbingandremodeling.com/og-image.jpg" },
      ],
      links: [
        { rel: "canonical", href: "https://eprplumbingandremodeling.com/" },
      ],
    };
  },
});

const PHONE = "(240) 381-9035";
const EMAIL = "GetStarted@eprplumbingandremodeling.com";
const ADDRESS = "8270 Fairground Rd, La Plata, MD 20646";
const GOOGLE_REVIEW_COUNT = 47; // Update with actual Google review count

const HERO_SLIDES = [
  {
    img: hero1,
    flip: false,
    badge: "Pipe Leak · Southern Maryland",
    line1: "That Leak Is Getting",
    line2: "More Expensive.",
    sub: "Water damage starts in minutes. EPR's licensed plumbers respond fast — diagnosing and stopping pipe leaks before a small drip becomes a flooded home.",
  },
  {
    img: hero2,
    flip: true,
    badge: "Toilet Leak · Priority Dispatch",
    line1: "A Leaking Toilet Wastes",
    line2: "200 Gallons a Day.",
    sub: "Silent leaks rack up hundreds on your water bill before you notice. EPR finds the source and fixes it right — same day, guaranteed.",
  },
  {
    img: hero3,
    flip: false,
    badge: "Licensed Plumbers · La Plata, MD",
    line1: "Don't Trust Your Home",
    line2: "To Just Anyone.",
    sub: "EPR's licensed, background-checked plumbers show up on time, explain the fix clearly, and guarantee their work — no surprises, no runaround.",
  },
  {
    img: hero4,
    flip: true,
    badge: "Garbage Disposal · Fast Repair",
    line1: "Broken Disposal",
    line2: "Backing Up Your Sink.",
    sub: "A jammed or dead garbage disposal turns your kitchen into a mess fast. EPR repairs and replaces all major brands — usually fixed in a single visit.",
  },
] as const;


const REVIEWS = [
  { name: "James T.", location: "Waldorf, MD", rating: 5, text: "EPR came out same day for a burst pipe under my sink. Tech was professional, explained everything, and the price was fair. Couldn't ask for better service." },
  { name: "Maria L.", location: "La Plata, MD", rating: 5, text: "Called them at 7pm when my water heater quit. They had someone out by 9pm and it was replaced the next morning. Life savers. Will definitely use again." },
  { name: "Derrick H.", location: "Clinton, MD", rating: 5, text: "Had a stubborn drain clog that two other plumbers couldn't fix. EPR's tech came in, hydro-jetted the line, and it's been clear for months. Highly recommend." },
  { name: "Sandra W.", location: "Prince Frederick, MD", rating: 5, text: "These guys are the real deal. On time, no hidden fees, and they cleaned up after themselves. My bathroom fixture install looks perfect. 5 stars." },
];

// â”€â”€ Main page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TypeWriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-charcoal">
      <SiteHeader bookHref="#book-service" />
      <Hero />
      <TrustBar />
      <BookingWidget />
      <WhoWeServe />
      <Services />
      <EmergencyProtocol />
      <HowItWorks />
      <GoogleReviews />
      <ServiceArea />
      <FinalCTA />
      <SiteFooter />
      <VoiceWidget />
    </div>
  );
}


function Hero() {
  const [slide, setSlide] = useState(0);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % total), 5500);
    return () => clearInterval(t);
  }, [total]);

  const current = HERO_SLIDES[slide];

  return (
    <>
      {/* â”€â”€ Mobile hero: clean CTA panel, no images â”€â”€ */}
      <section className="md:hidden bg-charcoal px-5 py-10 flex flex-col gap-5">
        <div>
          <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <TypeWriter text="Quick Dispatch Services" />
          </p>
          <h1 className="font-display font-black text-white leading-none mb-4" style={{ fontSize: "min(15.5vw, 5.5rem)" }}>
            Need a Plumber<br /><span className="text-turquoise">Right Now?</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            EPR Plumbing handles drain clogs, water heaters, leaks, and emergency calls — same day, guaranteed.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a href="#book-service"
            className="bg-turquoise text-white font-semibold px-6 py-4 rounded-xl text-base flex items-center justify-center gap-2 hover:opacity-90 shadow-turquoise transition">
            <Calendar className="size-5" /> Schedule Service Now!
          </a>
          <a href={`tel:${PHONE}`}
            className="border-2 border-white/30 text-white font-semibold px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:border-turquoise hover:text-turquoise transition">
            <Phone className="size-5" /> Call Us Now!
          </a>
          <a href="https://share.google/4BzA8eE3sYbnUza0f" target="_blank" rel="noopener noreferrer"
            className="bg-white px-5 py-3.5 rounded-xl flex items-center justify-center gap-2.5 hover:opacity-90 transition shadow-md">
            <span className="flex gap-0.5">
              {[0,1,2,3,4].map((i) => <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />)}
            </span>
            <span className="text-charcoal font-bold text-sm">5.0</span>
            <span className="text-charcoal/20 text-sm">|</span>
            <span className="font-bold text-sm">
              <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
            </span>
            <span className="text-charcoal/50 text-xs font-medium">{GOOGLE_REVIEW_COUNT} Reviews</span>
          </a>
        </div>
      </section>

      {/* â”€â”€ Desktop hero: full slideshow â”€â”€ */}
      <section className="hidden md:flex relative min-h-[92vh] items-center overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <img key={i} src={s.img} alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"} ${s.flip ? "-scale-x-100" : ""}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-24 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <span className="size-1.5 rounded-full bg-turquoise animate-pulse" />
              {current.badge}
            </span>
            <h1 className="font-display text-6xl font-semibold text-white leading-[1.05] mb-6">
              {current.line1} <span className="text-turquoise">{current.line2}</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">{current.sub}</p>
            <div className="flex gap-4 mb-6">
              <a href="#book-service"
                className="group bg-turquoise text-white font-semibold px-7 py-4 rounded-xl text-base flex items-center gap-2 hover:opacity-90 shadow-turquoise transition">
                <Calendar className="size-5" /> Book a Service
                <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
              </a>
              <a href={`tel:${PHONE}`}
                className="pulse-ring relative bg-transparent border-2 border-white text-white font-semibold px-7 py-4 rounded-xl flex items-center gap-2 hover:bg-white hover:text-charcoal transition">
                <Phone className="size-5 text-turquoise" /> {PHONE}
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-turquoise" /> Open 24 Hours</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-turquoise" /> Licensed & Insured</span>
              <span className="flex items-center gap-1.5"><Award className="size-4 text-turquoise" /> Best of 2025</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${i === slide ? "w-8 h-2.5 bg-turquoise" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: "Licensed & Insured" },
    { icon: Clock, label: "Open 24 Hours" },
    { icon: CheckCircle2, label: "We Accept Most Forms of Payment" },
  ];
  return (
    <section className="hidden md:block bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2.5 text-sm flex-1">
            <it.icon className="size-5 text-turquoise shrink-0" />
            <span className="text-charcoal font-medium">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const GHL_CALENDAR_SRC = "https://links.getdrivynai.com/widget/booking/0JMl77bv4YoS6gaFPbyi";
const GHL_CALENDAR_ID = "0JMl77bv4YoS6gaFPbyi";

const SERVICES = [
  { key: "drain",       label: "Drain Cleaning",    icon: Droplets,      priority: false },
  { key: "water_heater",label: "Water Heater",       icon: Gauge,         priority: false },
  { key: "pipe_repair", label: "Pipe Repair",        icon: Wrench,        priority: false },
  { key: "fixture",     label: "Fixture Install",    icon: Home,          priority: false },
  { key: "toilet",      label: "Toilet Service",     icon: AlertTriangle, priority: true  },
  { key: "sewer",       label: "Sewer Line",         icon: Zap,           priority: false },
  { key: "leak",        label: "Leak Detection",     icon: Droplets,      priority: false },
  { key: "disposal",    label: "Garbage Disposal",   icon: Wrench,        priority: false },
] as const;

function BookingWidget() {
  const [selected, setSelected] = useState<string>("drain");
  const [showCalendar, setShowCalendar] = useState(false);

  const isToilet = selected === "toilet";
  const selectedService = SERVICES.find((s) => s.key === selected);
  const calendarUrl = `${GHL_CALENDAR_SRC}?notes=${encodeURIComponent(`Service: ${selectedService?.label ?? ""}`)}`;

  useEffect(() => {
    if (!showCalendar) return;
    if (document.getElementById("ghl-form-embed-script")) return;
    const script = document.createElement("script");
    script.id = "ghl-form-embed-script";
    script.src = "https://links.getdrivynai.com/js/form_embed.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, [showCalendar]);

  return (
    <section id="book-service" className="py-20 bg-secondary/40 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-charcoal mb-5 leading-tight">
                Book Your Service <br />in Seconds.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Select your service and we'll connect you with the next available time. Same-day slots available — emergency dispatch after hours.
              </p>
              <ul className="hidden md:block space-y-3">
                {[
                  "Same-day and next-morning availability",
                  "Emergency dispatch available after hours",
                  "SMS & email confirmation sent instantly",
                  "Toilet leaks flagged for priority dispatch",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal/85">
                    <CheckCircle2 className="size-4 text-turquoise shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {showCalendar ? (
              <div className="rounded-2xl shadow-2xl overflow-hidden bg-white">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal transition">
                    <ArrowRight className="size-4 rotate-180" /> Change Service
                  </button>
                  <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                    <Calendar className="size-4 text-turquoise" />
                    <span>{selectedService?.label}</span>
                  </div>
                </div>
                <iframe
                  src={calendarUrl}
                  id={GHL_CALENDAR_ID}
                  className="w-full"
                  style={{ border: "none", overflow: "hidden", minHeight: "620px" }}
                  scrolling="no"
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                  <div className="size-10 rounded-xl bg-turquoise/10 flex items-center justify-center">
                    <Calendar className="size-5 text-turquoise" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">Book a Service</p>
                    <p className="text-xs text-muted-foreground">EPR Plumbing & Remodeling</p>
                  </div>
                </div>

                <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-3">Select Service</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {SERVICES.slice(0, 4).map((s) => {
                    const Icon = s.icon;
                    return (
                      <button key={s.key} onClick={() => setSelected(s.key)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition ${
                          selected === s.key
                            ? "border-turquoise bg-turquoise/10 text-turquoise"
                            : "border-gray-200 text-charcoal hover:border-turquoise/50 hover:bg-turquoise/5"
                        }`}>
                        <Icon className="size-4 shrink-0" />
                        <span className="text-left leading-tight">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 gap-1.5 mb-5">
                  {SERVICES.slice(4).map((s) => (
                    <button key={s.key} onClick={() => setSelected(s.key)}
                      className={`px-2 py-1.5 rounded-lg border text-xs font-medium transition text-center leading-tight ${
                        selected === s.key
                          ? "border-turquoise bg-turquoise/10 text-turquoise"
                          : "border-gray-200 text-charcoal/70 hover:border-turquoise/50"
                      }`}>
                      {s.label}
                    </button>
                  ))}
                </div>

                {isToilet && (
                  <div className="flex items-start gap-2 bg-turquoise/8 border border-turquoise/30 rounded-xl px-3 py-2.5 mb-4 text-xs text-charcoal/80">
                    <AlertTriangle className="size-4 text-turquoise shrink-0 mt-0.5" />
                    <span><strong className="text-turquoise">Priority dispatch</strong> — toilet issues are flagged for our fastest available tech.</span>
                  </div>
                )}

                <button
                  onClick={() => setShowCalendar(true)}
                  className="w-full bg-turquoise hover:opacity-90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-turquoise">
                  <Calendar className="size-4" /> See Available Times
                  <ArrowRight className="size-4" />
                </button>

                <div className="mt-4 space-y-2">
                  {[
                    "No payment required to book",
                    "SMS & email confirmation sent instantly",
                    "Licensed & Insured · Open 24 Hours",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-charcoal/60">
                      <CheckCircle2 className="size-3.5 text-turquoise shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="text-center max-w-3xl mx-auto mb-14">
        {kicker && <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">{kicker}</p>}
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-charcoal mb-4">{title}</h2>
        {sub && <p className="text-lg text-muted-foreground leading-relaxed">{sub}</p>}
      </div>
    </Reveal>
  );
}

function WhoWeServe() {
  const cards = [
    {
      icon: Home, title: "Residential", tag: "Your home, your family — handled with care.",
      items: ["Emergency leak & burst pipe repair", "Drain cleaning & unclogging", "Water heater install & repair", "Toilet, faucet & fixture service", "Full bathroom & kitchen plumbing", "Preventive maintenance visits"],
    },
    {
      icon: Building2, title: "Commercial", tag: "Keeping your business flowing without interruption.",
      items: ["Commercial drain & sewer service", "Multi-unit building plumbing", "Grease trap cleaning & service", "Backflow prevention & testing", "Water line installation", "Code-compliant commercial work"],
    },
    {
      icon: Landmark, title: "Government", tag: "Meeting the highest standards for public facilities.",
      items: ["Government facility plumbing", "Compliance documentation", "Scheduled maintenance programs", "Priority emergency response", "Vetted & background-checked techs", "Long-term service contracts"],
    },
  ];
  return (
    <section id="who" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="Built for Every Customer" title="One team. Every plumbing need."
          sub="Residential, commercial, and government across Southern Maryland — one standard of excellence, every call." />
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="group h-full bg-white rounded-2xl border-t-4 border-turquoise p-8 shadow-sm hover:shadow-luxe transition-all hover:-translate-y-1">
                <c.icon className="size-10 text-turquoise mb-5" />
                <h3 className="font-display text-2xl font-semibold text-charcoal mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground italic mb-5">{c.tag}</p>
                <ul className="space-y-2.5">
                  {c.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-charcoal/85">
                      <CheckCircle2 className="size-4 text-turquoise shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const groups = [
    { icon: Droplets, title: "Drain & Sewer", items: ["Drain snaking & hydro-jetting", "Clogged toilet & sink repair", "Main sewer line clearing", "Sewer camera inspection", "Root intrusion removal", "Grease trap cleaning"] },
    { icon: Gauge, title: "Water Heater", items: ["Tank water heater install & repair", "Tankless water heater install", "Thermostat & element replacement", "Anode rod service", "Emergency same-day replacement", "Energy-efficient upgrades"] },
    { icon: Wrench, title: "Pipe & Leak Repair", items: ["Burst & leaking pipe repair", "Pipe rerouting & repiping", "Slab leak detection & repair", "Copper, PVC & PEX pipe work", "Pressure testing & balancing", "Whole-house repiping"] },
    { icon: Home, title: "Fixtures & Appliances", items: ["Faucet & sink installation", "Toilet install, repair & replace", "Shower & tub fixture service", "Garbage disposal install", "Dishwasher & appliance hookup", "Outdoor hose bib service"] },
    { icon: Siren, title: "Emergency Service", items: ["24/7 emergency dispatch", "Burst pipe response — fast", "Flood & overflow mitigation", "Shut-off valve service", "After-hours emergency slots from 3pm", "Priority toilet leak response"] },
    { icon: ShieldCheck, title: "Inspection & Prevention", items: ["Full plumbing inspections", "Backflow prevention & testing", "Water quality testing", "Preventive maintenance plans", "Pre-purchase inspections", "Water pressure optimization"] },
  ];
  return (
    <section id="services" className="py-24 bg-secondary/40 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="Everything Plumbing. All In One Place." title="A complete plumbing service."
          sub="We handle everything — from a dripping faucet to a full sewer line replacement. No subcontracting, no runaround." />
        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 80}>
              <div className="h-full p-8 rounded-2xl border border-border hover:border-turquoise/50 transition bg-white hover:shadow-luxe">
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-12 rounded-xl bg-turquoise/10 flex items-center justify-center">
                    <g.icon className="size-6 text-turquoise" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-charcoal">{g.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex gap-2 text-charcoal/85">
                      <CheckCircle2 className="size-4 text-turquoise shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmergencyProtocol() {
  const steps = [
    { icon: Phone, title: "You Call or Book", body: "Reach us by phone, chat, or our booking widget — any time, day or night. Our AI answers instantly so you never wait." },
    { icon: Siren, title: "We Screen & Confirm", body: "We ask about the nature and urgency of your issue. For after-hours requests, we confirm you're aware this is an emergency service and express that we're happy to help." },
    { icon: CheckCircle2, title: "Confirmation Sent", body: "You receive SMS and email confirmation the moment your appointment is set. Our night-duty manager receives a full job summary and your location." },
    { icon: Wrench, title: "Tech Dispatched", body: "A licensed EPR plumber heads your way. Toilet leaks and burst pipes get priority dispatch — we don't sit on urgent calls." },
  ];
  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">After-Hours Emergency Flow</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">We Handle Emergencies Right.</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Appointments from 3pm onwards are emergency slots. We screen every request, confirm urgency with care and empathy, and make sure help is on the way before we hang up.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="text-center">
                <div className="size-16 mx-auto rounded-2xl bg-turquoise/10 border border-turquoise/30 flex items-center justify-center mb-4">
                  <s.icon className="size-7 text-turquoise" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 rounded-2xl bg-turquoise/10 border border-turquoise/30 p-6 text-center max-w-2xl mx-auto">
            <p className="text-white/90 text-sm leading-relaxed">
              <strong className="text-turquoise">Priority flag:</strong> Toilet leaks are automatically escalated to our fastest available technician — no waiting, no delays.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Select Your Service", body: "Choose from our booking widget — drain, water heater, pipe repair, fixtures, and more. One click to start." },
    { n: "02", title: "Pick a Time Slot", body: "Standard slots from 9am–1pm. Emergency slots from 3pm onwards, same day. We'll confirm by SMS and email." },
    { n: "03", title: "EPR Shows Up. Problem Solved.", body: "A licensed tech arrives on time with the right parts. We do the job, walk you through it, and guarantee the work." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="How It Works" title="From Leak to Fixed in 3 Steps" />
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-turquoise/20 via-turquoise to-turquoise/20" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 150}>
              <div className="relative bg-secondary/40 rounded-2xl p-8 border border-border text-center">
                <div className="size-20 mx-auto rounded-full bg-white border-2 border-turquoise flex items-center justify-center font-display text-2xl font-bold text-turquoise mb-5 relative z-10 shadow-sm">
                  {s.n}
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleReviews() {
  return (
    <section className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="Google Reviews · 5â˜… Rated" title="What Southern Maryland Says About Us"
          sub="Trusted by homeowners, businesses, and facilities across Charles, Prince George's, Calvert & St. Mary's Counties." />
        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <div className="bg-white rounded-2xl p-7 border border-border hover:border-turquoise/30 transition hover:shadow-luxe">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="size-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground font-medium">Google Review</span>
                </div>
                <p className="text-charcoal/85 leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-turquoise/10 flex items-center justify-center text-turquoise font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{r.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="size-3" /> {r.location}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-center text-sm text-muted-foreground mt-8">Verified reviews from Google · EPR Plumbing & Remodeling</p>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceArea() {
  const areas = ["La Plata", "Waldorf", "White Plains", "Indian Head", "Port Tobacco", "Bryans Road", "Bowie", "Upper Marlboro", "Clinton", "Oxon Hill", "Prince Frederick", "Leonardtown"];
  return (
    <section id="area" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeader kicker="Service Area — Southern Maryland" title="Proudly Serving Southern Maryland"
          sub="Based in La Plata — covering Charles, Prince George's, Calvert & St. Mary's Counties." />
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {areas.map((a) => (
              <span key={a} className="bg-secondary/60 border border-border hover:border-turquoise px-5 py-2.5 rounded-full text-sm font-medium text-charcoal flex items-center gap-2 transition hover:shadow-sm">
                <MapPin className="size-4 text-turquoise" /> {a}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="book" className="bg-charcoal py-24 relative overflow-hidden scroll-mt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-turquoise/10 via-transparent to-transparent" />
      <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-white mb-5 leading-tight">
            That Leak Won't Fix Itself. <span className="text-turquoise">We Will.</span>
          </h2>
          <p className="text-white/75 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Book online or call EPR directly — Southern Maryland's trusted plumbing team is ready for your home, business, or facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#book-service" className="bg-turquoise text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:opacity-90 shadow-turquoise transition animate-float">
              <Calendar className="size-5" /> Book My Appointment
            </a>
            <a href={`tel:${PHONE}`} className="pulse-ring relative bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-white hover:text-charcoal transition">
              <Phone className="size-5" />
              <span className="md:hidden">Speak To Live Agent</span>
              <span className="hidden md:inline">{PHONE}</span>
            </a>
          </div>
          <div className="text-white/80 space-y-1">
            <p><a href={`mailto:${EMAIL}`} className="hover:text-turquoise inline-flex items-center gap-2"><Mail className="size-4" /> {EMAIL}</a></p>
            <p className="text-white/50 text-sm">{ADDRESS}</p>
          </div>
          <p className="text-white/50 text-sm mt-6">Licensed. Insured. Open 24 Hours. Serving Southern Maryland.</p>
        </Reveal>
      </div>
    </section>
  );
}


import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Phone, Calendar, ShieldCheck, Clock, Home, Building2, Landmark,
  Wrench, Siren, CheckCircle2, ArrowRight, Mail, Droplets,
  Gauge, Star, AlertTriangle, Zap, Award,
} from "lucide-react";
import hero1 from "@/assets/home-drainage-inspection.webp";
import hero2 from "@/assets/hero-burst-pipe.jpg";
import hero3 from "@/assets/hero-new3.jpg";
import { VoiceWidget } from "@/components/site/VoiceWidget";
import { AlexChat } from "@/components/site/AlexChat";
import { Reveal } from "@/components/site/Reveal";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EPR Plumbing & Remodeling — Southern Maryland's Trusted Plumbers" },
      { name: "description", content: "Licensed Southern Maryland plumbers serving Charles, Prince George's, Calvert & St. Mary's Counties. Drain cleaning, water heaters, pipe repair, emergency service 24/7. Call (240) 381-9035." },
      { property: "og:title", content: "EPR Plumbing & Remodeling — La Plata, MD" },
      { property: "og:description", content: "Trusted plumbing and remodeling for homes, businesses and government facilities in Southern Maryland." },
      { property: "og:image", content: hero1 },
    ],
  }),
});

const PHONE = "(240) 381-9035";
const EMAIL = "GetStarted@eprplumbingandremodeling.com";
const ADDRESS = "8270 Fairground Rd, La Plata, MD 20646";
const GHL_BOOKING_URL = "#book"; // Replace with GoHighLevel calendar link when ready

const HERO_SLIDES = [
  {
    img: hero1,
    flip: false,
    badge: "Home Drain Inspection · Southern Maryland",
    line1: "Hidden Drain Problems",
    line2: "We Find Them Fast.",
    sub: "Most drain failures start slow and go undetected. EPR's licensed technicians inspect your home's full drainage system before small issues become expensive disasters.",
  },
  {
    img: hero2,
    flip: true,
    badge: "Burst Pipe Emergency · Fast Dispatch",
    line1: "Burst Pipe.",
    line2: "We Answer the Call.",
    sub: "A burst pipe floods fast. EPR screens every call, confirms urgency, and dispatches a licensed tech right away — day or night, across Southern Maryland.",
  },
  {
    img: hero3,
    flip: false,
    badge: "Licensed Plumbers · No Drip Too Small",
    line1: "Every Drip",
    line2: "Costs You Money.",
    sub: "A slow drip wastes thousands of gallons a year. From leaking faucets to hidden pipe leaks, EPR finds and fixes it right — the first time.",
  },
] as const;

const SERVICES = [
  { key: "drain", label: "Drain Cleaning", icon: Droplets, priority: false },
  { key: "water_heater", label: "Water Heater", icon: Gauge, priority: false },
  { key: "pipe_repair", label: "Pipe Repair", icon: Wrench, priority: false },
  { key: "fixture", label: "Fixture Install", icon: Home, priority: false },
  { key: "toilet", label: "Toilet Repair/Install", icon: AlertTriangle, priority: true },
  { key: "sewer", label: "Sewer Line", icon: Zap, priority: false },
  { key: "leak", label: "Leak Detection", icon: Droplets, priority: false },
  { key: "disposal", label: "Garbage Disposal", icon: Wrench, priority: false },
] as const;

const STANDARD_SLOTS = ["9am", "11am", "1pm"];
const EMERGENCY_SLOTS = ["3pm", "5pm", "7pm", "9pm"];

const REVIEWS = [
  { name: "James T.", location: "Waldorf, MD", rating: 5, text: "EPR came out same day for a burst pipe under my sink. Tech was professional, explained everything, and the price was fair. Couldn't ask for better service." },
  { name: "Maria L.", location: "La Plata, MD", rating: 5, text: "Called them at 7pm when my water heater quit. They had someone out by 9pm and it was replaced the next morning. Life savers. Will definitely use again." },
  { name: "Derrick H.", location: "Clinton, MD", rating: 5, text: "Had a stubborn drain clog that two other plumbers couldn't fix. EPR's tech came in, hydro-jetted the line, and it's been clear for months. Highly recommend." },
  { name: "Sandra W.", location: "Prince Frederick, MD", rating: 5, text: "These guys are the real deal. On time, no hidden fees, and they cleaned up after themselves. My bathroom fixture install looks perfect. 5 stars." },
];

// ── Main page ─────────────────────────────────────────────────────────────────
function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-charcoal">
      <SiteHeader bookHref="#book-service" />
      <Hero onBook={() => setBookingOpen(true)} />
      <TrustBar />
      <BookingWidget />
      <WhoWeServe />
      <Services />
      <EmergencyProtocol />
      <HowItWorks />
      <GoogleReviews />
      <ServiceArea />
      <FinalCTA onBook={() => setBookingOpen(true)} />
      <SiteFooter />
      <VoiceWidget />
      <AlexChat open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}


function Hero({ onBook }: { onBook: () => void }) {
  const [slide, setSlide] = useState(0);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % total), 5500);
    return () => clearInterval(t);
  }, [total]);

  const current = HERO_SLIDES[slide];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
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
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-[1.05] mb-6">
            {current.line1} <span className="text-turquoise">{current.line2}</span>
          </h1>
          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">{current.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <a href="#book-service"
              className="group bg-turquoise text-white font-semibold px-7 py-4 rounded-xl text-base flex items-center justify-center gap-2 hover:opacity-90 shadow-turquoise transition">
              <Calendar className="size-5" /> Book a Service
              <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
            </a>
            <a href={`tel:${PHONE}`}
              className="pulse-ring relative bg-transparent border-2 border-white text-white font-semibold px-7 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-charcoal transition">
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
  );
}

function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: "Licensed & Insured" },
    { icon: Award, label: "Best of 2025" },
    { icon: Clock, label: "Open 24 Hours" },
    { icon: Star, label: "5★ Rated on Google" },
    { icon: CheckCircle2, label: "No Hidden Fees" },
  ];
  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-5 gap-5">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2.5 text-sm">
            <it.icon className="size-5 text-turquoise shrink-0" />
            <span className="text-charcoal font-medium">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookingWidget() {
  const [selected, setSelected] = useState<string>("drain");
  const [timeSlot, setTimeSlot] = useState<string>("9am");

  const isToilet = selected === "toilet";
  const isEmergency = EMERGENCY_SLOTS.includes(timeSlot);

  return (
    <section id="book-service" className="py-20 bg-secondary/40 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="text-turquoise text-xs font-semibold tracking-[0.2em] uppercase mb-3">Easy Online Booking</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-charcoal mb-5 leading-tight">
                Book Your Service <br />in Seconds.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Select your service, choose a time, and we'll handle the rest. Standard appointments run 9am–1pm in 2-hour slots. Need us after 3pm? That's our emergency window — same care, same team.
              </p>
              <ul className="space-y-3">
                {[
                  "Standard slots: 9am, 11am, 1pm (Mon–Sat)",
                  "Emergency slots: 3pm, 5pm, 7pm, 9pm (higher rate applies)",
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
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="size-10 rounded-xl bg-turquoise/10 flex items-center justify-center">
                  <Calendar className="size-5 text-turquoise" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">Book a Service</p>
                  <p className="text-xs text-muted-foreground">EPR Plumbing & Remodeling</p>
                </div>
              </div>

              {/* Service selection */}
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

              {/* Priority flag for toilet leaks */}
              {isToilet && (
                <div className="flex items-start gap-2 bg-turquoise/8 border border-turquoise/30 rounded-xl px-3 py-2.5 mb-4 text-xs text-charcoal/80">
                  <AlertTriangle className="size-4 text-turquoise shrink-0 mt-0.5" />
                  <span><strong className="text-turquoise">Priority dispatch</strong> — toilet issues are flagged for our fastest available tech.</span>
                </div>
              )}

              {/* Appointment time picker */}
              <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Appointment Time</p>
              <p className="text-[10px] text-charcoal/50 mb-2">Standard slots (Mon–Sat)</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {STANDARD_SLOTS.map((slot) => (
                  <button key={slot} onClick={() => setTimeSlot(slot)}
                    className={`py-2 rounded-xl border text-sm font-medium transition ${
                      timeSlot === slot
                        ? "border-turquoise bg-turquoise/10 text-turquoise"
                        : "border-gray-200 text-charcoal hover:border-turquoise/50 hover:bg-turquoise/5"
                    }`}>
                    {slot}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-amber-600 font-semibold mb-2 flex items-center gap-1">
                <Siren className="size-3" /> Emergency slots — after-hours
              </p>
              <div className="grid grid-cols-4 gap-1.5 mb-5">
                {EMERGENCY_SLOTS.map((slot) => (
                  <button key={slot} onClick={() => setTimeSlot(slot)}
                    className={`py-2 rounded-xl border text-xs font-semibold transition ${
                      timeSlot === slot
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-amber-200 text-amber-600 hover:border-amber-400 hover:bg-amber-50"
                    }`}>
                    ⚡ {slot}
                  </button>
                ))}
              </div>

              {isEmergency && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4 text-xs text-charcoal/80">
                  <Siren className="size-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong className="text-amber-600">Emergency rate applies</strong> — higher fee for after-hours service. We'll screen your request, confirm urgency, and dispatch fast. SMS & email confirmation sent instantly.</span>
                </div>
              )}

              <a href={GHL_BOOKING_URL}
                className="w-full bg-turquoise hover:opacity-90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-turquoise">
                {isEmergency ? <><Siren className="size-4" /> Request Emergency Service</> : <><Calendar className="size-4" /> Book My Appointment</>}
                <ArrowRight className="size-4" />
              </a>

              <p className="text-[10px] text-charcoal/40 text-center mt-3">
                Confirmation sent via SMS & email · No payment required to book
              </p>
            </div>
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
        <SectionHeader kicker="Google Reviews · 5★ Rated" title="What Southern Maryland Says About Us"
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

function FinalCTA({ onBook }: { onBook: () => void }) {
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
              <Phone className="size-5" /> {PHONE}
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


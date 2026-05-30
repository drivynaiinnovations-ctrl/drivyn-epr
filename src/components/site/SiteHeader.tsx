import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, ChevronDown, Droplets, Gauge, Wrench, Home, AlertTriangle, Zap, ShieldCheck, Siren, MapPin, CalendarDays } from "lucide-react";

const PHONE = "(605) 815-1039";

export const SERVICE_NAV = [
  { label: "Drain Cleaning",        href: "/services/drain-cleaning",        icon: Droplets },
  { label: "Water Heater",          href: "/services/water-heater",          icon: Gauge },
  { label: "Pipe Repair",           href: "/services/pipe-repair",           icon: Wrench },
  { label: "Fixture Install",       href: "/services/fixture-install",       icon: Home },
  { label: "Toilet Repair",         href: "/services/toilet-repair",         icon: AlertTriangle },
  { label: "Sewer Line",            href: "/services/sewer-line",            icon: Zap },
  { label: "Leak Detection",        href: "/services/leak-detection",        icon: Droplets },
  { label: "Garbage Disposal",      href: "/services/garbage-disposal",      icon: Wrench },
  { label: "Emergency Service",     href: "/services/emergency-service",     icon: Siren },
  { label: "Inspections",           href: "/services/inspection-prevention", icon: ShieldCheck },
] as const;

export const LOCATIONS_NAV = [
  { label: "La Plata, MD",          href: "/locations/la-plata" },
  { label: "Waldorf, MD",           href: "/locations/waldorf" },
  { label: "Clinton, MD",           href: "/locations/clinton" },
  { label: "Fort Washington, MD",   href: "/locations/fort-washington" },
  { label: "Prince Frederick, MD",  href: "/locations/prince-frederick" },
  { label: "Lexington Park, MD",    href: "/locations/lexington-park" },
  { label: "Brandywine, MD",        href: "/locations/brandywine" },
  { label: "Accokeek, MD",          href: "/locations/accokeek" },
  { label: "Washington, DC",        href: "/locations/washington-dc" },
  { label: "Northern Virginia",     href: "/locations/northern-virginia" },
] as const;

export function SiteHeader({ bookHref = "/#book-service" }: { bookHref?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "locations" | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const close = () => { setMenuOpen(false); setMobileServicesOpen(false); setMobileLocationsOpen(false); };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Main row — logo + nav + actions */}
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-lg bg-turquoise flex items-center justify-center text-white"><Droplets className="size-5" /></div>
            <span className="font-display text-xl font-semibold text-charcoal">EPR Plumbing</span>
          </Link>

          <nav ref={navRef} className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal/80">
            {/* Services dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
                onMouseEnter={() => setOpenDropdown("services")}
                className="flex items-center gap-1 hover:text-turquoise transition"
              >
                Services <ChevronDown className={`size-3.5 transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "services" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white rounded-2xl border border-border shadow-luxe p-3 grid grid-cols-2 gap-1 z-50"
                >
                  {SERVICE_NAV.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.href}
                        to={s.href}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-turquoise/10 hover:text-charcoal transition group"
                      >
                        <Icon className="size-4 text-turquoise shrink-0" />
                        <span className="text-sm font-medium">{s.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Locations dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "locations" ? null : "locations")}
                onMouseEnter={() => setOpenDropdown("locations")}
                className="flex items-center gap-1 hover:text-turquoise transition"
              >
                Locations <ChevronDown className={`size-3.5 transition-transform ${openDropdown === "locations" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "locations" && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl border border-border shadow-luxe p-3 flex flex-col gap-1 z-50"
                >
                  {LOCATIONS_NAV.map((loc) => (
                    <Link
                      key={loc.href}
                      to={loc.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-turquoise/10 hover:text-charcoal transition"
                    >
                      <MapPin className="size-4 text-turquoise shrink-0" />
                      <span className="text-sm font-medium">{loc.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/#who" className="hover:text-turquoise transition">Who We Serve</Link>
            <Link to="/faq" className="hover:text-turquoise transition">FAQ</Link>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-turquoise transition">
              <Phone className="size-4 text-turquoise" /> {PHONE}
            </a>
            <a href={bookHref} className="bg-turquoise text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition shadow-turquoise">
              Book Now
            </a>
          </div>

          {/* Mobile icon buttons */}
          <div className="md:hidden flex items-center gap-2">
            <a href={bookHref} aria-label="Book service"
              className="flex items-center justify-center size-10 rounded-lg bg-turquoise text-white hover:opacity-90 transition">
              <CalendarDays className="size-5" />
            </a>
            <a href={`tel:${PHONE}`} aria-label="Call us"
              className="flex items-center justify-center size-10 rounded-lg bg-charcoal text-white hover:opacity-90 transition">
              <Phone className="size-5" />
            </a>
            <button onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu"
              className="flex items-center justify-center size-10 rounded-lg border border-border text-charcoal hover:bg-secondary transition">
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-5 py-4 flex flex-col gap-2 text-sm font-medium text-charcoal/80">
          {/* Services accordion */}
          <button
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="flex items-center justify-between w-full py-2 hover:text-turquoise transition"
          >
            <span>Services</span>
            <ChevronDown className={`size-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileServicesOpen && (
            <div className="pl-3 flex flex-col gap-1 mb-2">
              {SERVICE_NAV.map((s) => (
                <Link key={s.href} to={s.href} onClick={close}
                  className="py-1.5 text-sm text-charcoal/70 hover:text-turquoise transition">
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          {/* Locations accordion */}
          <button
            onClick={() => setMobileLocationsOpen((v) => !v)}
            className="flex items-center justify-between w-full py-2 hover:text-turquoise transition"
          >
            <span>Locations</span>
            <ChevronDown className={`size-4 transition-transform ${mobileLocationsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileLocationsOpen && (
            <div className="pl-3 flex flex-col gap-1 mb-2">
              {LOCATIONS_NAV.map((loc) => (
                <Link key={loc.href} to={loc.href} onClick={close}
                  className="py-1.5 text-sm text-charcoal/70 hover:text-turquoise transition">
                  {loc.label}
                </Link>
              ))}
            </div>
          )}

          <Link to="/#who" onClick={close} className="py-2 hover:text-turquoise transition">Who We Serve</Link>
          <Link to="/faq" onClick={close} className="py-2 hover:text-turquoise transition">FAQ</Link>
          <a href={`tel:${PHONE}`} onClick={close} className="py-2 hover:text-turquoise transition">{PHONE}</a>
        </div>
      )}
    </header>
  );
}

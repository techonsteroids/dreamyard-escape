import { useState } from "react";
import { MapPin, Phone, MessageCircle, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, SectionHead, btn, Arrow } from "./primitives";
import { business, faqs, mapsDirections, mapsEmbed, whatsappLink } from "@/data/dreamyard";
import rooftopImg from "@/assets/rooftop-evening.jpg";
import lakeImg from "@/assets/lake-pichola.jpg";
import laneImg from "@/assets/old-city-lane.jpg";
import heroImg from "@/assets/hero-rooftop-sunset.jpg";
import dormImg from "@/assets/room-dorm.jpg";
import privateImg from "@/assets/room-private.jpg";

const enquiry = whatsappLink(
  "Hi Dreamyard Udaipur, I'd like to check availability for my dates. Please share details.",
);

export function Rooftop() {
  return (
    <section id="rooftop" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-editorial grid gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-7">
          <figure className="group overflow-hidden">
            <img
              src={rooftopImg}
              alt="Rooftop seating with string lights at Dreamyard Udaipur overlooking Lake Pichola at blue hour"
              width={1600}
              height={1104}
              loading="lazy"
              className="aspect-[16/11] w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-cinematic)] group-hover:scale-105"
            />
          </figure>
        </Reveal>
        <Reveal delay={130} className="lg:col-span-5">
          <p className="eyebrow mb-5">The rooftop</p>
          <h2 className="display-lg">Meet above the city.</h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground md:text-lg">
            From Old City lanes to rooftop evenings, Dreamyard gives you a place to pause, connect
            and take in Udaipur from above.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {["Rooftop", "Lake Pichola views", "Old City"].map((f) => (
              <li
                key={f}
                className="rounded-full border border-border px-4 py-2 text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground"
              >
                {f}
              </li>
            ))}
          </ul>
          <a href="#gallery" className={cn(btn.solid, "mt-9")}>
            Explore the rooftop <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const journey = [
  ["Arrive", "Step into Old Udaipur."],
  ["Explore", "Lose yourself in the lanes."],
  ["Connect", "Meet people from everywhere."],
  ["Unwind", "Return to the rooftop."],
  ["Remember", "Take Udaipur home with you."],
];

export function Journey() {
  return (
    <section aria-labelledby="journey" className="bg-charcoal py-24 text-ivory md:py-32">
      <div className="container-editorial">
        <h2 id="journey" className="eyebrow text-ivory/50">
          The traveller journey
        </h2>
        <ul className="mt-12 divide-y divide-ivory/12 border-y border-ivory/12">
          {journey.map(([title, line], i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 70}
              className="group flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between md:py-10"
            >
              <span className="font-display text-5xl leading-none text-ivory transition-colors duration-700 group-hover:text-saffron md:text-7xl">
                {title}
              </span>
              <span className="text-sm text-ivory/55 md:text-base">{line}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const gallery = [
  { src: heroImg, alt: "Sunset over Lake Pichola seen from a rooftop in Udaipur", span: "md:col-span-2 md:row-span-2" },
  { src: rooftopImg, alt: "Rooftop seating with string lights in the evening", span: "" },
  { src: laneImg, alt: "Old City lane with a carved wooden doorway in Udaipur", span: "md:row-span-2" },
  { src: dormImg, alt: "Shared room with wooden bunk beds and an arched window", span: "" },
  { src: lakeImg, alt: "Lake Pichola and the Udaipur skyline at dusk", span: "md:col-span-2" },
  { src: privateImg, alt: "Private room with a double bed and carved wooden window", span: "" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : gallery[open];

  return (
    <section id="gallery" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-editorial">
        <SectionHead eyebrow="Gallery" title="Moments from Dreamyard." />
        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal
              key={g.alt}
              delay={i * 60}
              className={cn("group overflow-hidden", g.span)}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="size-full cursor-zoom-in"
                aria-label={`View image: ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-cinematic)] group-hover:scale-110"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close image"
            className="absolute top-5 right-5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[85svh] w-auto max-w-full object-contain"
          />
        </div>
      ) : null}
    </section>
  );
}

const why = [
  ["01", "4.8★", `${business.reviewCount.toLocaleString("en-IN")}+ Google reviews`],
  ["02", "Old City", "Historic Udaipur location"],
  ["03", "Rooftop", "Lake Pichola views"],
  ["04", "Backpacker", "A place designed around travel and connection"],
];

export function WhyDreamyard() {
  return (
    <section aria-labelledby="why" className="border-y border-border bg-sand/40 py-20 md:py-28">
      <div className="container-editorial">
        <h2 id="why" className="eyebrow">
          Why Dreamyard
        </h2>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([n, big, small], i) => (
            <Reveal as="li" key={n} delay={i * 80}>
              <span className="text-terracotta text-xs tracking-[0.3em]">{n}</span>
              <p className="mt-5 font-display text-3xl">{big}</p>
              <p className="mt-2 text-sm text-muted-foreground">{small}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="location" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-editorial grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-5">Location</p>
          <h2 className="display-lg">In the heart of Old Udaipur.</h2>
          <address className="mt-8 text-base leading-relaxed text-muted-foreground not-italic md:text-lg">
            {business.address.line1},<br />
            {business.address.line2},<br />
            {business.address.city}, {business.address.state} {business.address.postalCode}
          </address>
          <ul className="mt-8 flex flex-wrap gap-2">
            {["Old City", "Lal Ghat", "Lake Pichola"].map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground"
              >
                <MapPin className="size-3.5 text-terracotta" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <a
            href={mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(btn.solid, "mt-9")}
          >
            Get directions <Arrow />
          </a>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <div className="h-[360px] overflow-hidden border border-border md:h-[460px]">
            <iframe
              title="Map showing Dreamyard Udaipur on Lal Ghat Road, Old City, Udaipur"
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-editorial grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionHead eyebrow="Good to know" title="Questions, answered." />
        </div>
        <div className="md:col-span-8">
          <ul className="border-t border-border">
            {faqs.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q} className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(on ? null : i)}
                      aria-expanded={on}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-base md:text-lg">{f.q}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-4 shrink-0 text-terracotta transition-transform duration-500",
                          on && "rotate-180",
                        )}
                      />
                    </button>
                  </h3>
                  <div
                    className={cn(
                      "grid transition-all duration-500 [transition-timing-function:var(--ease-cinematic)]",
                      on ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground md:text-base">
                      {f.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function BookingCTA() {
  return (
    <section aria-labelledby="cta" className="grain relative overflow-hidden bg-ink py-28 md:py-40">
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-30"
      />
      <div className="relative container-editorial text-center">
        <Reveal>
          <h2 id="cta" className="display-xl mx-auto max-w-3xl text-balance text-ivory">
            Your Udaipur story starts here.
          </h2>
          <p className="mx-auto mt-7 max-w-md text-base text-ivory/75 md:text-lg">
            Ready to experience the city from the heart of Old Udaipur?
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#book" className={cn(btn.accent, "px-8")}>
              Book your stay <Arrow />
            </a>
            <a
              href={enquiry}
              target="_blank"
              rel="noopener noreferrer"
              className={btn.ghostLight}
            >
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp us
            </a>
            <a href={`tel:${business.phoneE164}`} className={btn.ghostLight}>
              <Phone className="size-4" aria-hidden="true" /> Call {business.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const footerLinks = [
  ["Home", "#top"],
  ["Stay", "#stay"],
  ["Packages", "#packages"],
  ["Experience", "#experience"],
  ["Rooftop", "#rooftop"],
  ["Location", "#location"],
  ["FAQ", "#faq"],
  ["Book", "#book"],
];

export function Footer() {
  return (
    <footer className="bg-charcoal pt-20 pb-32 text-ivory md:pb-16">
      <div className="container-editorial">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="display-lg text-ivory">
              Dreamyard
              <br />
              Udaipur
            </p>
            <p className="mt-6 text-[0.68rem] tracking-[0.28em] text-ivory/50 uppercase">
              Stay close to the city.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <ul className="space-y-3">
              {footerLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-ivory/65 transition-colors hover:text-saffron"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-5 md:col-span-3">
            <a
              href={`tel:${business.phoneE164}`}
              className="block font-display text-2xl text-ivory hover:text-saffron"
            >
              {business.phone}
            </a>
            <address className="text-sm leading-relaxed text-ivory/60 not-italic">
              {business.address.line1},<br />
              {business.address.line2},<br />
              {business.address.city}, {business.address.state} {business.address.postalCode}
            </address>
            <div className="flex flex-wrap gap-3">
              <a
                href={mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.65rem] tracking-[0.2em] text-ivory/70 uppercase underline-offset-4 hover:text-saffron hover:underline"
              >
                Google Maps
              </a>
              <a
                href={enquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.65rem] tracking-[0.2em] text-ivory/70 uppercase underline-offset-4 hover:text-saffron hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/12 pt-6 text-[0.65rem] tracking-[0.18em] text-ivory/40 uppercase md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Dreamyard Udaipur</span>
          <span>
            Check-in {business.checkIn} · Check-out {business.checkOut}
          </span>
        </div>
      </div>
    </footer>
  );
}

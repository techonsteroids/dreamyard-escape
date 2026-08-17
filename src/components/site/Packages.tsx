import { useMemo, useState } from "react";
import { ChevronDown, MessageCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, SectionHead, btn, Arrow } from "./primitives";
import { packages, packageWhatsapp, whatsappLink, type StayPackage } from "@/data/dreamyard";

const steps = ["Choose package", "Select date", "Select guests", "Review", "Book / WhatsApp"];

function Value({ value }: { value: string | null }) {
  return value ? (
    <span>{value}</span>
  ) : (
    <span className="text-muted-foreground">Confirm with Dreamyard</span>
  );
}

function Inclusions({ pkg }: { pkg: StayPackage }) {
  const [open, setOpen] = useState(false);
  const has = pkg.inclusions.length > 0;

  return (
    <div className="border-t border-border pt-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="eyebrow text-foreground">What's included</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-500", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-500 [transition-timing-function:var(--ease-cinematic)]",
          open ? "grid-rows-[1fr] pt-5 opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          {has ? (
            <dl className="space-y-4">
              {pkg.inclusions.map((inc) => (
                <div key={inc.category}>
                  <dt className="eyebrow">{inc.category}</dt>
                  <dd className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {inc.items.map((it) => (
                      <p key={it} className="flex gap-2">
                        <Check className="mt-0.5 size-3.5 text-terracotta" aria-hidden="true" />
                        {it}
                      </p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Inclusions for this stay length — accommodation, meals, experiences and local
              activities — are confirmed directly with Dreamyard. Message us and we'll put together
              exactly what your trip needs.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ComparisonTable({ list }: { list: StayPackage[] }) {
  const rows: Array<[string, (p: StayPackage) => string | null]> = [
    ["Duration", (p) => p.subtitle],
    ["Stay", (p) => p.accommodation],
    ["Meals", (p) => p.meals],
    ["Experiences", (p) => (p.experiences.length ? p.experiences.join(", ") : null)],
    ["Activities", (p) => (p.activities.length ? p.activities.join(", ") : null)],
    ["Price", (p) => p.price],
  ];

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">Comparison of Dreamyard Udaipur stay durations</caption>
          <thead>
            <tr>
              <th scope="col" className="w-40 border-b border-border py-4 text-left eyebrow">
                Compare
              </th>
              {list.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className="border-b border-border px-4 py-4 text-left font-display text-lg font-normal"
                >
                  {p.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, get]) => (
              <tr key={label}>
                <th scope="row" className="border-b border-border py-4 text-left eyebrow">
                  {label}
                </th>
                {list.map((p) => (
                  <td key={p.id} className="border-b border-border px-4 py-4 align-top">
                    <Value value={get(p)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:hidden">
        {list.map((p) => (
          <li
            key={p.id}
            className="w-[78vw] shrink-0 snap-center border border-border bg-card p-6"
          >
            <h4 className="font-display text-2xl">{p.title}</h4>
            <dl className="mt-4 space-y-3 text-sm">
              {rows.map(([label, get]) => (
                <div key={label}>
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-1">
                    <Value value={get(p)} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

function TripBuilder() {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(3);
  const [who, setWho] = useState("Solo");
  const [pace, setPace] = useState("Balanced");

  const suggestion = packages.find((p) => p.days === days) ?? packages[0];
  const itinerary = useMemo(
    () =>
      Array.from({ length: days }, (_, i) => {
        const n = i + 1;
        if (n === 1) return "Arrive, settle in, and end the day on the rooftop.";
        if (n === days) return "Slow morning, last rooftop view, check-out at 10:30 AM.";
        if (pace === "Relaxed") return "Wander the Old City lanes at your own pace.";
        if (pace === "Adventurous") return "A full day out in the city, then back for the evening.";
        return "Explore the Old City, then meet other travellers upstairs.";
      }),
    [days, pace],
  );

  const message = whatsappLink(
    `Hi Dreamyard Udaipur, I'm planning a ${days}-day stay (${who.toLowerCase()}, ${pace.toLowerCase()} pace). Please share availability and details.`,
  );

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-[0.68rem] tracking-[0.16em] uppercase transition-all duration-400 min-h-11",
      active
        ? "border-terracotta bg-terracotta text-primary-foreground"
        : "border-border hover:border-terracotta",
    );

  return (
    <Reveal className="mt-20 border border-border bg-card p-7 md:p-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow mb-3">Not sure how long to stay?</p>
          <h3 className="display-lg text-3xl md:text-4xl">Build my Udaipur trip.</h3>
        </div>
        <button type="button" onClick={() => setOpen((o) => !o)} className={btn.solid}>
          {open ? "Close planner" : "Build my Udaipur trip"} <Arrow />
        </button>
      </div>

      {open ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <fieldset>
              <legend className="eyebrow mb-4">How many days?</legend>
              <div className="flex flex-wrap gap-2">
                {[2, 3, 4, 5, 6, 7].map((d) => (
                  <button key={d} type="button" onClick={() => setDays(d)} className={chip(days === d)}>
                    {d} days
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="eyebrow mb-4">Traveller type</legend>
              <div className="flex flex-wrap gap-2">
                {["Solo", "Couple", "Friends", "Family", "Backpacker"].map((t) => (
                  <button key={t} type="button" onClick={() => setWho(t)} className={chip(who === t)}>
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="eyebrow mb-4">Travel pace</legend>
              <div className="flex flex-wrap gap-2">
                {["Relaxed", "Balanced", "Adventurous"].map((t) => (
                  <button key={t} type="button" onClick={() => setPace(t)} className={chip(pace === t)}>
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="border border-border bg-background p-6 md:p-8">
            <p className="eyebrow">Suggested itinerary</p>
            <p className="mt-3 font-display text-2xl">
              {suggestion.title} · {suggestion.subtitle}
            </p>
            <ol className="mt-6 space-y-3 text-sm text-muted-foreground">
              {itinerary.map((line, i) => (
                <li key={i} className="flex gap-4 border-b border-border pb-3 last:border-0">
                  <span className="text-terracotta text-xs tracking-[0.2em]">
                    D{String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-muted-foreground">
              Suggested itinerary only. Confirm availability and inclusions with Dreamyard.
            </p>
            <a
              href={message}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(btn.accent, "mt-6 w-full")}
            >
              <MessageCircle className="size-4" aria-hidden="true" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </Reveal>
  );
}

export function Packages() {
  const active = packages.filter((p) => p.active);
  const [selectedId, setSelectedId] = useState(active[2]?.id ?? active[0].id);
  const [compare, setCompare] = useState(false);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  const pkg = active.find((p) => p.id === selectedId) ?? active[0];

  const bookMessage = whatsappLink(
    `Hi Dreamyard Udaipur, I'd like to book the ${pkg.title} package (${pkg.subtitle}).${
      date ? ` Check-in: ${date}.` : ""
    } Guests: ${guests}. Please share availability and details.`,
  );

  return (
    <section id="packages" className="scroll-mt-24 bg-sand/40 py-24 md:py-32">
      <div className="container-editorial">
        <SectionHead
          eyebrow="Stay packages"
          title={
            <>
              Your Udaipur.
              <br />
              <span className="text-terracotta">Your pace.</span>
            </>
          }
          intro="Choose how long you want to stay and discover a Udaipur experience built around your pace."
        />

        {/* Duration selector */}
        <Reveal className="mt-14">
          <div
            role="tablist"
            aria-label="Stay duration"
            className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
          >
            {active.map((p) => {
              const on = p.id === pkg.id;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setSelectedId(p.id);
                    setStep(0);
                  }}
                  className={cn(
                    "min-h-11 shrink-0 snap-start rounded-full border px-6 py-3 text-[0.68rem] tracking-[0.18em] uppercase transition-all duration-500 [transition-timing-function:var(--ease-cinematic)]",
                    on
                      ? "border-charcoal bg-charcoal text-ivory"
                      : "border-border bg-background hover:border-terracotta hover:text-terracotta",
                  )}
                >
                  {p.days} days
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Package card */}
        <div key={pkg.id} className="animate-rise mt-8 grid gap-px border border-border bg-border lg:grid-cols-5">
          <div className="bg-card p-8 md:p-12 lg:col-span-3">
            <p className="eyebrow">Our suggestion · {pkg.subtitle}</p>
            <h3 className="display-lg mt-4 text-4xl md:text-5xl">{pkg.title}</h3>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              {pkg.description}
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                ["Stay", pkg.accommodation],
                ["Meals", pkg.meals],
                ["Experiences", pkg.experiences.length ? pkg.experiences.join(", ") : null],
                ["Activities", pkg.activities.length ? pkg.activities.join(", ") : null],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <dt className="eyebrow">{label}</dt>
                  <dd className="mt-2 text-sm">
                    <Value value={value as string | null} />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <Inclusions pkg={pkg} />
            </div>
          </div>

          {/* Booking flow */}
          <div className="bg-background p-8 md:p-12 lg:col-span-2">
            <ol className="space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full text-[0.6rem] transition-colors duration-500",
                      i <= step
                        ? "bg-terracotta text-primary-foreground"
                        : "border border-border text-muted-foreground",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={i <= step ? "text-foreground" : "text-muted-foreground"}>{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="pkg-date" className="eyebrow mb-2 block">
                  Check-in date
                </label>
                <input
                  id="pkg-date"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setStep((s) => Math.max(s, 2));
                  }}
                  className="min-h-11 w-full border border-border bg-card px-4 text-sm outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label htmlFor="pkg-guests" className="eyebrow mb-2 block">
                  Guests
                </label>
                <select
                  id="pkg-guests"
                  value={guests}
                  onChange={(e) => {
                    setGuests(e.target.value);
                    setStep((s) => Math.max(s, 3));
                  }}
                  className="min-h-11 w-full border border-border bg-card px-4 text-sm outline-none focus:border-terracotta"
                >
                  {["1", "2", "3", "4", "5", "6+"].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <p className="font-display text-3xl">
                {pkg.price ?? <span className="text-xl">Check availability</span>}
              </p>

              <div className="space-y-3">
                <a
                  href={pkg.bookingUrl ?? bookMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setStep(4)}
                  className={cn(btn.solid, "w-full")}
                >
                  Book package <Arrow />
                </a>
                <a
                  href={whatsappLink(packageWhatsapp(pkg))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setStep(4)}
                  className={cn(btn.outline, "w-full")}
                >
                  <MessageCircle className="size-4" aria-hidden="true" /> Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <Reveal className="mt-10">
          <button type="button" onClick={() => setCompare((c) => !c)} className={btn.outline}>
            {compare ? "Hide comparison" : "Compare packages"} <Arrow dir="down" />
          </button>
          {compare ? (
            <div className="mt-8 animate-rise">
              <ComparisonTable list={active} />
            </div>
          ) : null}
        </Reveal>

        <TripBuilder />

        {/* Crawlable SEO content */}
        <div className="mt-24 grid gap-10 border-t border-border pt-14 md:grid-cols-12">
          <h2 className="display-lg text-3xl md:col-span-5 md:text-4xl">
            Udaipur stay packages for every traveller
          </h2>
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:col-span-7 md:text-base">
            <p>
              Dreamyard Udaipur is a backpacker hostel in the Old City, a short walk from the lanes
              around Lal Ghat and the waterfront of Lake Pichola. Whether you're planning a Udaipur
              short stay of two days or an extended week in Rajasthan, you can choose the stay
              length that fits your trip and confirm the details with us directly.
            </p>
            <p>
              A 3 day Udaipur itinerary gives you time for the Old City's main highlights; a 4 day
              Udaipur trip adds room to slow down; and a 6 day Udaipur itinerary lets you settle
              into the rhythm of the city. Every stay includes free Wi-Fi and air conditioning, and
              every evening ends on the rooftop with Lake Pichola in view.
            </p>
            <p>
              Looking for Udaipur hostel packages or Old City accommodation near Lal Ghat? Pick a
              duration above, then message us on WhatsApp — we confirm availability, inclusions and
              pricing personally rather than publishing fixed packages that may not match your
              dates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

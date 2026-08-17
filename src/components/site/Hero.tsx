import { useState } from "react";
import { cn } from "@/lib/utils";
import { btn, Arrow } from "./primitives";
import { business, whatsappLink } from "@/data/dreamyard";
import heroImg from "@/assets/hero-rooftop-sunset.jpg";

const headline = ["Your stay.", "Your people.", "Your Udaipur."];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Travellers watching the sunset over Lake Pichola from a rooftop in Udaipur's Old City"
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="animate-hero-zoom size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/85" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pt-28 pb-28 md:pb-24">
        <div className="container-editorial">
          <p
            className="animate-rise text-[0.68rem] tracking-[0.32em] text-ivory/70 uppercase"
            style={{ animationDelay: "120ms" }}
          >
            Dreamyard Udaipur
          </p>

          <h1 className="display-xl mt-5 text-ivory">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="animate-rise block"
                  style={{ animationDelay: `${260 + i * 130}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p
              className="animate-rise max-w-md text-base leading-relaxed text-ivory/80 md:text-lg"
              style={{ animationDelay: "700ms" }}
            >
              An unforgettable backpacker stay in the heart of Udaipur's Old City.
            </p>

            <div
              className="animate-rise flex items-center gap-4 border-l border-ivory/25 pl-5"
              style={{ animationDelay: "820ms" }}
            >
              <span className="text-saffron text-sm tracking-[0.2em]" aria-hidden="true">
                ★★★★★
              </span>
              <div className="text-ivory">
                <p className="font-display text-2xl leading-none">{business.rating} / 5</p>
                <p className="mt-1.5 text-[0.6rem] tracking-[0.22em] text-ivory/60 uppercase">
                  {business.reviewCount.toLocaleString("en-IN")}+ Google reviews
                </p>
              </div>
            </div>
          </div>

          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "940ms" }}
          >
            <a href="#book" className={cn(btn.accent, "px-8")}>
              Book your stay <Arrow />
            </a>
            <a href="#intro" className={btn.ghostLight}>
              Explore Dreamyard <Arrow dir="down" />
            </a>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="animate-scroll-hint absolute bottom-6 left-1/2 z-10 hidden h-10 w-px -translate-x-1/2 bg-ivory/50 md:block"
      />
    </section>
  );
}

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const message = whatsappLink(
    `Hi Dreamyard Udaipur, I'd like to check availability.${
      checkIn ? ` Check-in: ${checkIn}.` : ""
    }${checkOut ? ` Check-out: ${checkOut}.` : ""} Guests: ${guests}. Please share details.`,
  );

  const field =
    "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground";

  return (
    <div id="book" className="relative z-20 -mt-14 hidden scroll-mt-28 md:block">
      <div className="container-editorial">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.open(message, "_blank", "noopener");
          }}
          className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lift)]"
        >
          <div className="space-y-2">
            <label htmlFor="check-in" className="eyebrow block">
              Check-in
            </label>
            <input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className={field}
            />
          </div>
          <div className="space-y-2 border-l border-border pl-6">
            <label htmlFor="check-out" className="eyebrow block">
              Check-out
            </label>
            <input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className={field}
            />
          </div>
          <div className="space-y-2 border-l border-border pl-6">
            <label htmlFor="guests" className="eyebrow block">
              Guests
            </label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={field}
            >
              {["1", "2", "3", "4", "5", "6+"].map((g) => (
                <option key={g} value={g}>
                  {g} {g === "1" ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={cn(btn.solid, "whitespace-nowrap")}>
            Check availability <Arrow />
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Plan your stay directly with Dreamyard — we confirm availability personally on WhatsApp or
          by phone ({business.phone}).
        </p>
      </div>
    </div>
  );
}

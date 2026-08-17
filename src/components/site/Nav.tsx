import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { btn, Arrow } from "./primitives";
import { business, whatsappLink } from "@/data/dreamyard";

const links = [
  { href: "#stay", label: "Stay" },
  { href: "#packages", label: "Packages" },
  { href: "#experience", label: "Experience" },
  { href: "#rooftop", label: "Rooftop" },
  { href: "#location", label: "Location" },
];

const mobileLinks = [{ href: "#top", label: "Home" }, ...links, { href: "#faq", label: "FAQ" }];

const enquiry = whatsappLink(
  "Hi Dreamyard Udaipur, I'd like to check availability for my dates. Please share details.",
);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 [transition-timing-function:var(--ease-cinematic)]",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="container-editorial">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-4 transition-all duration-700 [transition-timing-function:var(--ease-cinematic)] md:px-6",
              scrolled
                ? "border border-border/70 bg-background/80 py-2.5 shadow-[var(--shadow-soft)] backdrop-blur-xl"
                : "border border-transparent py-3",
            )}
          >
            <a
              href="#top"
              className={cn(
                "font-display text-lg tracking-[0.18em] uppercase transition-colors",
                scrolled ? "text-foreground" : "text-ivory",
              )}
            >
              Dreamyard
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "text-[0.68rem] font-medium tracking-[0.2em] uppercase transition-colors",
                    scrolled
                      ? "text-muted-foreground hover:text-terracotta"
                      : "text-ivory/80 hover:text-ivory",
                  )}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#book"
                className={cn(
                  "hidden md:inline-flex",
                  scrolled ? btn.solid : btn.ghostLight,
                  "px-5 py-2.5",
                )}
              >
                Book now <Arrow />
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
                  scrolled
                    ? "border-border text-foreground"
                    : "border-ivory/40 text-ivory backdrop-blur-md",
                )}
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-ink text-ivory transition-all duration-500 [transition-timing-function:var(--ease-cinematic)] lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <span className="font-display text-lg tracking-[0.18em] uppercase">Dreamyard</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ivory/30"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5">
          {mobileLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl tracking-tight text-ivory/90 transition-colors hover:text-saffron"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="space-y-3 px-5 pb-10">
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className={cn(btn.accent, "w-full")}
          >
            Book your stay <Arrow />
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={enquiry}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(btn.ghostLight, "w-full")}
            >
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
            </a>
            <a href={`tel:${business.phoneE164}`} className={cn(btn.ghostLight, "w-full")}>
              <Phone className="size-4" aria-hidden="true" /> Call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur-xl md:hidden">
      <a href="#book" className={cn(btn.solid, "w-full px-4")}>
        Book
      </a>
      <a
        href={enquiry}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(btn.outline, "w-full px-4")}
      >
        WhatsApp
      </a>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Reveal, SectionHead, btn, Arrow } from "./primitives";
import { useCountUp } from "@/hooks/use-reveal";
import { business, rooms, whatsappLink } from "@/data/dreamyard";
import laneImg from "@/assets/old-city-lane.jpg";
import lakeImg from "@/assets/lake-pichola.jpg";
import dormImg from "@/assets/room-dorm.jpg";
import privateImg from "@/assets/room-private.jpg";

const roomImages = { dorm: dormImg, private: privateImg };

export function SocialProof() {
  const rating = useCountUp(business.rating);
  const reviews = useCountUp(business.reviewCount);

  const tickerItems = [
    "Rated 4.8/5 by 1,215+ guests on Google",
    "Rooftop · Lake Pichola views",
    "Lal Ghat · Old City · Udaipur",
    "Free Wi-Fi · Air conditioning",
  ];

  return (
    <section aria-labelledby="loved" className="border-y border-border bg-sand/40 py-16 md:py-24">
      <div className="container-editorial">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow mb-4">Social proof</p>
            <h2 id="loved" className="display-lg">
              Loved by travellers.
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex gap-12">
            <div>
              <p className="font-display text-5xl leading-none md:text-6xl">
                <span ref={rating.ref}>{rating.value.toFixed(1)}</span>
                <span className="text-terracotta"> ★</span>
              </p>
              <p className="eyebrow mt-3">Google rating</p>
            </div>
            <div>
              <p className="font-display text-5xl leading-none md:text-6xl">
                <span ref={reviews.ref}>{Math.round(reviews.value).toLocaleString("en-IN")}</span>+
              </p>
              <p className="eyebrow mt-3">Google reviews</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 overflow-hidden border-y border-border/70 py-4">
        <div className="animate-ticker flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-10" aria-hidden={dup === 1}>
              {tickerItems.map((t) => (
                <span key={t} className="eyebrow text-foreground/70">
                  {t} <span className="text-terracotta">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Intro() {
  return (
    <section id="intro" className="scroll-mt-24 py-24 md:py-36">
      <div className="container-editorial grid gap-14 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-6 lg:col-span-5">
          <p className="eyebrow mb-6">{business.neighborhood}</p>
          <h2 className="display-lg">
            Not just a bed.
            <br />
            <span className="text-terracotta">A place to belong.</span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Set inside the historic Old City of Udaipur, Dreamyard puts you close to the streets,
              stories and lakeside atmosphere that make the city unforgettable.
            </p>
            <p>
              Come for the stay. Stay for the people. Head upstairs for rooftop views over Lake
              Pichola.
            </p>
          </div>
          <div className="rule-motif mt-10 w-40" />
        </Reveal>

        <Reveal delay={150} className="md:col-span-6 md:col-start-8">
          <figure className="group relative overflow-hidden">
            <img
              src={laneImg}
              alt="A quiet lane in Udaipur's Old City leading to a carved wooden doorway"
              width={1200}
              height={1500}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-cinematic)] group-hover:scale-105"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-background/85 px-4 py-2 text-[0.6rem] tracking-[0.22em] uppercase backdrop-blur">
              Lal Ghat · Old City
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

const experiences = [
  {
    n: "01",
    title: "The rooftop",
    body: "End the day above the city with a rooftop atmosphere overlooking Lake Pichola.",
  },
  {
    n: "02",
    title: "Old City",
    body: "Step outside and you're already inside the character of historic Udaipur.",
  },
  {
    n: "03",
    title: "Meet travellers",
    body: "Discover the social energy of a stay created for curious travellers.",
  },
  {
    n: "04",
    title: "Slow down",
    body: "Explore the city, return to the rooftop, and let the evening unfold.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-charcoal py-24 text-ivory md:py-32">
      <div className="container-editorial">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-5 text-ivory/50">The Dreamyard experience</p>
          <h2 className="display-lg text-ivory">Stay. Meet. Explore. Repeat.</h2>
        </Reveal>

        <ul className="mt-16 grid gap-px border border-ivory/15 bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e, i) => (
            <Reveal as="li" key={e.n} delay={i * 90} className="group bg-charcoal p-8 md:p-10">
              <span className="text-terracotta text-xs tracking-[0.3em]">{e.n}</span>
              <h3 className="mt-8 font-display text-2xl text-ivory">{e.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/60">{e.body}</p>
              <span
                aria-hidden="true"
                className="mt-8 block h-px w-8 bg-terracotta transition-all duration-700 [transition-timing-function:var(--ease-cinematic)] group-hover:w-16"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LakeFeature() {
  return (
    <section aria-labelledby="lake" className="grain relative overflow-hidden">
      <img
        src={lakeImg}
        alt="Lake Pichola at dusk with the Udaipur city skyline reflected in the water"
        width={1920}
        height={1088}
        loading="lazy"
        className="h-[80svh] w-full object-cover md:h-[100svh]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/50" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-editorial">
          <Reveal>
            <h2 id="lake" className="display-xl max-w-4xl text-ivory">
              Udaipur, from a different point of view.
            </h2>
            <p className="mt-8 text-base leading-relaxed text-ivory/75 md:text-lg">
              Old-city streets below.
              <br />
              Lake Pichola beyond.
              <br />
              Your rooftop above it all.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Rooms() {
  return (
    <section id="stay" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-editorial">
        <SectionHead
          eyebrow="Stay"
          title="Find your space."
          intro="Availability and room details are confirmed directly with Dreamyard for your dates."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {rooms.map((room, i) => (
            <Reveal
              as="article"
              key={room.id}
              delay={i * 120}
              className="group overflow-hidden border border-border bg-card transition-shadow duration-700 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="overflow-hidden">
                <img
                  src={roomImages[room.image]}
                  alt={`${room.name} at Dreamyard Udaipur`}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-cinematic)] group-hover:scale-105"
                />
              </div>
              <div className="p-7 md:p-9">
                <h3 className="font-display text-3xl">{room.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {room.description}
                </p>
                {room.occupancy ? <p className="mt-4 eyebrow">{room.occupancy}</p> : null}
                <ul className="mt-6 flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border border-border px-3 py-1.5 text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <span className="font-display text-xl">
                    {room.price ?? (
                      <span className="text-base text-muted-foreground">Check availability</span>
                    )}
                  </span>
                  <a
                    href={whatsappLink(
                      `Hi Dreamyard Udaipur, I'd like to know about the ${room.name} option and availability for my dates.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(btn.outline, "px-6")}
                  >
                    Enquire <Arrow />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

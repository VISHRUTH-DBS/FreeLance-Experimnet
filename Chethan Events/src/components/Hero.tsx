import { useEffect, useRef, useState } from "react";
import { BIZ, FEATURED_IMAGES, TICKER, img, waLink } from "../data";
import { Btn, BulbString, Mandala, Marquee, Petals } from "./ui";
import {
  IconArrow,
  IconInstagram,
  IconPhone,
  IconStar,
  IconWhatsapp,
} from "./icons";

const HIGHLIGHTS = [
  { title: "Wedding", label: "Events & decoration" },
  { title: "Birthday", label: "Celebrations" },
  { title: "Family", label: "Baby shower & naming" },
  { title: "DJ Sound", label: "Sound & lighting" },
];

export function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();

      setP({
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      });
    };

    const onLeave = () => {
      setP({ x: 0, y: 0 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={wrap}
      className="relative overflow-hidden pt-36 md:pt-44"
    >
      {/* Layered ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_18%_0%,#3a1c33_0%,#22132a_38%,#140c16_78%)]" />

        <div className="a-glow absolute -top-24 -left-24 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(210,64,47,0.42),transparent_66%)] blur-2xl" />

        <div
          className="a-glow absolute top-1/4 -right-32 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(245,165,36,0.28),transparent_66%)] blur-2xl"
          style={{ animationDelay: "-6s" }}
        />

        <div
          className="a-glow absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(21,147,138,0.24),transparent_68%)] blur-2xl"
          style={{ animationDelay: "-12s" }}
        />

        <Mandala className="absolute -top-40 -right-52 h-[46rem] w-[46rem] text-gold/25" />
        <Mandala className="absolute -bottom-64 -left-56 h-[38rem] w-[38rem] text-kumkum/25" />

        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(251,243,228,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(251,243,228,.5)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="grain pointer-events-none absolute inset-0 -z-10" />
      <Petals count={16} className="-z-10" />

      {/* Bulb string */}
      <div className="pointer-events-none absolute inset-x-0 top-6 -z-[1] opacity-95 md:top-9">
        <BulbString count={32} sag={24} className="h-24" />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Hero copy */}
          <div className="relative z-10 pt-6 lg:pt-0">
            <div className="reveal in inline-flex items-center gap-3 rounded-full border border-gold/25 bg-ink/40 py-1.5 pr-4 pl-1.5 backdrop-blur">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-kumkum text-cream">
                <IconStar className="h-3 w-3" />
              </span>

              <span className="font-body text-[10.5px] font-bold tracking-[0.22em] text-cream/75 uppercase">
                {BIZ.address}
              </span>
            </div>

            <h1 className="mt-7 font-display leading-[0.86] tracking-[-0.035em]">
              <span className="block text-[clamp(2.4rem,6.4vw,4.6rem)] font-black text-cream">
                Every celebration
              </span>

              <span className="mt-1 block text-[clamp(2.4rem,6.4vw,4.6rem)] font-black text-cream">
                deserves a{" "}
                <em className="relative font-light text-marigold italic">
                  stage
                  <svg
                    viewBox="0 0 220 18"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 h-3 w-full text-kumkum"
                    aria-hidden
                  >
                    <path
                      d="M2 12C58 3 150 2 218 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </em>
                .
              </span>
            </h1>

            <p className="mt-6 max-w-xl font-body text-[clamp(0.95rem,1.6vw,1.15rem)] leading-relaxed font-medium text-cream/60">
              {BIZ.name} offers wedding events, birthday decoration, baby
              showers, naming ceremonies, DJ sound and lighting.
              <span className="text-cream">
                {" "}
                Share your event details with us.
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Btn
                href={waLink(
                  "Namaskara Chethan Events! I have an event coming up. I would like to discuss availability, services and pricing."
                )}
                external
              >
                <IconWhatsapp className="h-4 w-4" />
                Enquire on WhatsApp
              </Btn>

              <Btn href="#services" variant="outline">
                Explore our services
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Btn>
            </div>

            {/* Phone numbers */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-body text-[10.5px] font-bold tracking-[0.26em] text-cream/40 uppercase">
                Call for enquiries
              </span>

              {BIZ.phones.map((ph) => (
                <a
                  key={ph.raw}
                  href={`tel:+${ph.raw}`}
                  className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-cream transition-colors hover:text-marigold sm:text-xl"
                >
                  <IconPhone className="h-4 w-4 text-marigold transition-transform duration-300 group-hover:-rotate-12" />
                  {ph.display}
                </a>
              ))}
            </div>

            {/* Service highlights */}
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-5 sm:grid-cols-4">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="border-l border-gold/20 pl-4"
                >
                  <div className="font-display text-[1.7rem] leading-none font-black text-cream tabular-nums">
                    {item.title}
                  </div>

                  <div className="mt-1.5 font-body text-[10.5px] leading-tight font-semibold tracking-[0.16em] text-cream/45 uppercase">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client photo collage */}
          <div className="relative z-10 mx-auto w-full max-w-[34rem] lg:max-w-none">
            <div
              className="relative aspect-[4/5] w-full transition-transform duration-500 ease-out sm:aspect-[5/5]"
              style={{
                transform: `translate3d(${p.x * -14}px, ${p.y * -10}px, 0)`,
              }}
            >
              {/* Main stage photo */}
              <figure className="absolute inset-x-[8%] top-0 bottom-[14%] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-gold/25 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
                <img
                  src={img(FEATURED_IMAGES.hero)}
                  alt="Floral stage with a curved decorative backdrop"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                <figcaption className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="font-body text-[9.5px] font-bold tracking-[0.24em] text-marigold uppercase">
                      {BIZ.name}
                    </div>

                    <div className="mt-1 font-display text-lg leading-tight font-bold text-cream">
                      Floral stage decoration
                    </div>
                  </div>
                </figcaption>
              </figure>

              {/* Circular entrance-lighting photo */}
              <figure
                className="a-floaty absolute -top-2 -right-1 h-28 w-28 overflow-hidden rounded-full border-2 border-marigold/40 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.9)] sm:h-36 sm:w-36"
                style={{ ["--dur" as string]: "8s" }}
              >
                <img
                  src={img(FEATURED_IMAGES.heroLighting)}
                  alt="Illuminated venue entrance at night"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                <figcaption className="absolute inset-x-0 bottom-0 bg-ink/75 pb-3 pt-1 text-center font-body text-[8px] font-bold tracking-wide text-cream">
                  Entrance lighting
                </figcaption>
              </figure>

              {/* Tilted birthday card */}
              <figure
                className="a-floaty absolute -bottom-3 -left-2 w-[46%] -rotate-6 overflow-hidden rounded-2xl border border-gold/25 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.95)] transition-transform duration-500 hover:rotate-0 sm:-left-8 sm:w-[44%]"
                style={{
                  ["--dur" as string]: "10s",
                  ["--delay" as string]: "-3s",
                }}
              >
                <img
                  src={img(FEATURED_IMAGES.heroBirthday)}
                  alt="Pastel balloon birthday decoration with butterfly details"
                  className="h-32 w-full object-cover sm:h-40"
                  loading="lazy"
                  decoding="async"
                />

                <figcaption className="bg-ink2 px-3.5 py-3">
                  <div className="font-body text-[9px] font-bold tracking-[0.2em] text-peacock uppercase">
                    Birthday celebrations
                  </div>

                  <div className="mt-0.5 font-display text-sm font-bold text-cream">
                    Pastel balloon decoration
                  </div>
                </figcaption>
              </figure>

              {/* Instagram link */}
              <a
                href={BIZ.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visit ${BIZ.handle} on Instagram`}
                className="a-floaty absolute top-[38%] -left-4 flex items-center gap-2.5 rounded-full border border-gold/25 bg-ink/85 py-2 pr-4 pl-2.5 backdrop-blur-md sm:-left-10"
                style={{
                  ["--dur" as string]: "9s",
                  ["--delay" as string]: "-5s",
                }}
              >
                <span className="flex">
                  <IconInstagram className="h-4 w-4 text-marigold" />
                </span>

                <span className="font-body text-[11px] font-bold tracking-wide text-cream">
                  Follow on Instagram
                </span>
              </a>
            </div>

            {/* Kannada accent */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-center sm:left-auto sm:right-0 sm:translate-x-0">
              <div className="font-display text-sm tracking-[0.3em] text-gold/50">
                ಚೆತನ್ ಈವೆಂಟ್ಸ್
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service ticker */}
      <div className="relative mt-20 border-y border-gold/20 bg-gradient-to-r from-wine/70 via-ink2/70 to-wine/70 py-4 lg:mt-24">
        <Marquee
          items={TICKER}
          dur={48}
          className="text-cream/90"
          separator="✦"
        />
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import { BIZ, GALLERY, TESTIMONIALS, img, waLink } from "../data";
import { cn } from "../utils/cn";
import { Btn, Eyebrow, Mark, Reveal, SectionHeading } from "./ui";
import { IconArrow, IconChevron, IconInstagram, IconStar } from "./icons";

export function Voices() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="reviews" className="relative overflow-hidden border-b border-gold/12 bg-ink2 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_85%_15%,rgba(210,64,47,0.16),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="What families say"
          title="The message we get"
          italic="the next morning."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* main quote */}
          <Reveal>
            <div
              className="relative h-full overflow-hidden rounded-3xl border border-gold/18 bg-gradient-to-br from-plum/70 to-ink/70 p-7 sm:p-10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <span className="pointer-events-none absolute -top-10 -left-2 font-display text-[13rem] leading-none font-black text-marigold/10 select-none">
                &rdquo;
              </span>

              <div className="relative min-h-[16rem] sm:min-h-[15rem]">
                {TESTIMONIALS.map((q, k) => (
                  <figure
                    key={q.name}
                    className={cn(
                      "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      k === i
                        ? "relative translate-y-0 opacity-100"
                        : "pointer-events-none absolute inset-0 translate-y-4 opacity-0"
                    )}
                    aria-hidden={k !== i}
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: q.stars }).map((_, s) => (
                        <IconStar key={s} className="h-4 w-4 text-marigold" />
                      ))}
                    </div>
                    <blockquote className="mt-5 font-display text-[clamp(1.25rem,2.5vw,1.95rem)] leading-[1.32] font-light tracking-[-0.01em] text-cream italic">
                      {q.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3.5">
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-ink font-display text-sm font-black text-marigold">
                        {q.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block font-body text-sm font-bold tracking-wide text-cream">{q.name}</span>
                        <span className="mt-0.5 block font-body text-[11px] font-semibold tracking-[0.18em] text-peacock uppercase">
                          {q.meta}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="relative mt-8 flex items-center justify-between border-t border-gold/15 pt-6">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((q, k) => (
                    <button
                      key={q.name}
                      onClick={() => setI(k)}
                      aria-label={`Review ${k + 1}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        k === i ? "w-9 bg-marigold" : "w-3 bg-cream/20 hover:bg-cream/45"
                      )}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    aria-label="Previous review"
                    className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-cream/70 transition-all hover:border-marigold hover:text-marigold"
                  >
                    <IconChevron className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    onClick={() => setI((v) => (v + 1) % TESTIMONIALS.length)}
                    aria-label="Next review"
                    className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-cream/70 transition-all hover:border-marigold hover:text-marigold"
                  >
                    <IconChevron className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* rating panel */}
          <div className="flex flex-col gap-6">
            <Reveal delay={110}>
              <div className="rounded-3xl border border-gold/18 bg-ink/70 p-7 text-center">
                <div className="font-display text-[4.5rem] leading-none font-black text-cream">4.9</div>
                <div className="mt-2 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} className="h-4 w-4 text-marigold" />
                  ))}
                </div>
                <p className="mt-3 font-body text-[13px] leading-relaxed text-cream/55">
                  Average rating from families across Mysuru district — weddings, birthdays and
                  ceremonies we have decorated since we started.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex-1 rounded-3xl border border-gold/18 bg-gradient-to-br from-kumkum/25 to-ink/70 p-7">
                <Eyebrow>Booked this season</Eyebrow>
                <ul className="mt-5 space-y-3.5">
                  {[
                    ["Muhurtha stage & mandap", "Srirangapatna"],
                    ["Jungle-theme 2nd birthday", "Vijayanagar"],
                    ["Seemantham floral swing", "Kuvempunagar"],
                    ["Naamakarna cradle decor", "T. Rasipura"],
                  ].map(([a, b]) => (
                    <li key={a} className="flex items-baseline justify-between gap-3 border-b border-gold/12 pb-3 last:border-0">
                      <span className="font-body text-[13.5px] font-semibold text-cream/85">{a}</span>
                      <span className="shrink-0 font-body text-[10.5px] font-bold tracking-[0.16em] text-marigold uppercase">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Instagram                                                           */
/* ------------------------------------------------------------------ */
export function Instagram() {
  const tiles = GALLERY.slice(0, 8);
  return (
    <section className="relative overflow-hidden border-b border-gold/12 bg-ink py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Instagram"
              title="New setups,"
              italic="posted weekly."
              lead="We shoot every install before the guests arrive. Follow along for theme ideas, close-ups of the florals, and behind-the-scenes lighting rigs you can copy for your own function."
            />

            <Reveal delay={140}>
              <div className="mt-8 flex items-center gap-4 rounded-3xl border border-gold/18 bg-ink2/70 p-5">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] p-[2px]">
                  <span className="grid h-full w-full place-items-center rounded-[14px] bg-ink">
                    <Mark className="h-9 w-9" />
                  </span>
                </span>
                <div className="min-w-0">
                  <div className="font-display text-lg leading-tight font-black text-cream">
                    chethan_events__audio
                  </div>
                  <div className="mt-1 font-body text-[12.5px] leading-snug text-cream/55">
                    Event decorators · Mysuru
                    <br />
                    Wedding · Birthday · Baby shower · Lighting
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn href={BIZ.instagram} external>
                  <IconInstagram className="h-4 w-4" /> Follow on Instagram
                </Btn>
                <Btn href={waLink("Namaskara! I saw your Instagram page and liked a setup. Can I share the photo?")} external variant="outline">
                  DM us the theme <IconArrow className="h-4 w-4" />
                </Btn>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {tiles.map((s, i) => (
                <a
                  key={s.id}
                  href={BIZ.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-gold/12",
                    i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                  )}
                >
                  <img
                    src={img(s.id, 500)}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-0 grid place-items-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-ink/80 px-3.5 py-2 font-body text-[10.5px] font-bold tracking-[0.16em] text-cream uppercase backdrop-blur">
                      <IconInstagram className="h-3.5 w-3.5" /> View
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

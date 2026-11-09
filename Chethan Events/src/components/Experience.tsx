import { useState } from "react";
import { COVERAGE, PROCESS, THEMES, img, waLink } from "../data";
import { cn } from "../utils/cn";
import { Btn, Eyebrow, Mandala, Petals, Reveal, SectionHeading } from "./ui";
import { IconArrow, IconBulb, IconCheck, IconFlower, IconStar, IconWhatsapp } from "./icons";

/* ------------------------------------------------------------------ */
/* Why us — asymmetric bento                                           */
/* ------------------------------------------------------------------ */
const WHY = [
  {
    span: "lg:col-span-5 lg:row-span-2",
    icon: IconStar,
    title: "Our own crew, every single time",
    text: "The people who quote your function are the people who build it. No subcontracted labour turning up late, no 'that was not in my job' at 7 in the morning. One team, one coordinator, one phone number you already have.",
    image: 23953090,
  },
  {
    span: "lg:col-span-4",
    icon: IconCheck,
    title: "Muhurtha discipline",
    text: "We plan the install backwards from your auspicious time — usually 3 to 5 hours of buffer, and a standby crew through the function.",
  },
  {
    span: "lg:col-span-3",
    icon: IconFlower,
    title: "Flowers, cut the same morning",
    text: "Marigold, jasmine and rose come from Devaraja Market on the day of your function, never the day before.",
  },
  {
    span: "lg:col-span-4",
    icon: IconBulb,
    title: "Lighting we rig ourselves",
    text: "Truss, par-lights, fairy canopies, chandeliers and sound — our own stock, our own rigging, safely cabled for halls and homes.",
  },
  {
    span: "lg:col-span-3",
    icon: IconCheck,
    title: "One quote. No surprises.",
    text: "Itemised, in writing on WhatsApp. Travel, material and labour are already inside it — no additions after the date is booked.",
  },
];

export function Why() {
  return (
    <section className="relative overflow-hidden border-b border-gold/12 bg-ink2 py-24 lg:py-32">
      <Mandala className="pointer-events-none absolute -right-72 top-1/4 h-[44rem] w-[44rem] text-kumkum/15" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why families call us back"
          title="The part nobody photographs:"
          italic="the discipline."
          lead="Decoration looks easy in a reel. What decides your function is whether the arch is standing at 8:55 AM, whether the flowers are fresh, and whether somebody answers the phone."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {WHY.map((w, i) => {
            const Ico = w.icon;
            return (
              <Reveal key={w.title} delay={i * 80} className={cn("min-w-0", w.span)}>
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/16 bg-ink/70 transition-all duration-500 hover:-translate-y-1 hover:border-marigold/45",
                    w.image ? "justify-end" : "p-6 sm:p-7"
                  )}
                >
                  {w.image ? (
                    <>
                      <img
                        src={img(w.image, 900)}
                        alt="Chethan Events crew rigging ceiling drapes and lights"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
                      <div className="relative p-6 sm:p-8">
                        <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-marigold/40 bg-ink/70 text-marigold backdrop-blur">
                          <Ico className="h-5 w-5" />
                        </span>
                        <h3 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-black text-cream">
                          {w.title}
                        </h3>
                        <p className="mt-3 max-w-md font-body text-[14.5px] leading-relaxed text-cream/70">{w.text}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/10 text-marigold transition-colors duration-500 group-hover:bg-marigold group-hover:text-ink">
                        <Ico className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-display text-xl leading-tight font-black text-cream sm:text-2xl">
                        {w.title}
                      </h3>
                      <p className="mt-2.5 font-body text-[14px] leading-relaxed text-cream/60">{w.text}</p>
                      <span className="mt-auto pt-5 font-body text-[10px] font-bold tracking-[0.24em] text-gold/45 uppercase">
                        0{i + 1}
                      </span>
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */
export function Process() {
  return (
    <section id="process" className="relative overflow-hidden border-b border-gold/12 bg-ink py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_50%_at_15%_20%,rgba(245,165,36,0.1),transparent_70%)]" />
      <Petals count={8} className="opacity-50" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="How a booking runs"
            title="Four steps between"
            italic="a date and a stage."
          />
          <Reveal delay={140}>
            <p className="max-w-xl font-body text-[15px] leading-relaxed text-cream/60 lg:pb-3">
              Most of our families are booking two or three weeks ahead; wedding season, they book
              months ahead. Either way the process is the same, and it is deliberately boring —
              because the function itself should not be.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute top-[3.1rem] right-6 left-6 hidden border-t border-dashed border-gold/25 lg:block" />
          <div className="grid gap-6 lg:grid-cols-4">
            {PROCESS.map((s, i) => (
              <Reveal key={s.no} delay={i * 110}>
                <div className={cn("group relative", i % 2 === 1 && "lg:mt-14")}>
                  <div className="relative flex items-center gap-4 lg:block">
                    <span className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-gold/30 bg-ink font-display text-xl font-black text-marigold transition-all duration-500 group-hover:border-marigold group-hover:bg-marigold group-hover:text-ink">
                      {s.no}
                      <span className="a-ring absolute inset-0 rounded-full border border-marigold/40" />
                    </span>
                    <h3 className="font-display text-xl font-black tracking-tight text-cream lg:mt-6 lg:text-2xl">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 font-body text-[14px] leading-relaxed text-cream/58 lg:mt-3">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-16 flex flex-col items-start gap-5 rounded-3xl border border-gold/18 bg-gradient-to-r from-wine/45 to-ink2/60 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <div className="font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight font-black text-cream">
                Date already fixed? Send it across today.
              </div>
              <p className="mt-2 max-w-xl font-body text-sm text-cream/60">
                Muhurtha dates fill fast in Mysuru wedding season. A quick message locks your slot
                and starts the design conversation — no obligation.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Btn href={waLink("Namaskara! My function date is fixed. I would like to book decoration.")} external>
                <IconWhatsapp className="h-4 w-4" /> Hold my date
              </Btn>
              <Btn href="#contact" variant="outline">
                Fill the form <IconArrow className="h-4 w-4" />
              </Btn>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Theme library                                                       */
/* ------------------------------------------------------------------ */
export function Themes() {
  const [hover, setHover] = useState(-1);
  return (
    <section id="themes" className="relative overflow-hidden border-b border-gold/12 bg-ink2 py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The parts bin"
              title="Twenty-four things"
              italic="we can add."
              lead="Mix and match. Tell us the room and we'll tell you which of these actually work in it — ceiling height, wall colour and daylight change everything."
              tone="peacock"
            />
            <Reveal delay={160}>
              <div className="mt-8 rounded-3xl border border-gold/18 bg-ink/60 p-6">
                <Eyebrow>Most requested right now</Eyebrow>
                <ul className="mt-4 space-y-3">
                  {[
                    "LED neon name board behind the cake table",
                    "Fairy-light ceiling canopy over the dining area",
                    "Marigold torana with mango-leaf festoons",
                    "Balloon arch in a two-colour ombre palette",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 font-body text-[13.5px] leading-snug text-cream/75">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div
              onMouseLeave={() => setHover(-1)}
              className="relative flex flex-wrap gap-2.5 rounded-3xl border border-gold/16 bg-gradient-to-br from-plum/60 to-ink/70 p-6 sm:p-9"
            >
              {THEMES.map((t, i) => (
                <span
                  key={t}
                  onMouseEnter={() => setHover(i)}
                  className={cn(
                    "cursor-default rounded-full border px-4 py-2.5 font-body text-[13px] font-semibold transition-all duration-400",
                    hover === i
                      ? "-translate-y-1 scale-105 border-marigold bg-marigold text-ink shadow-[0_12px_28px_-10px_rgba(245,165,36,0.8)]"
                      : "border-gold/20 bg-ink/50 text-cream/70 hover:text-cream"
                  )}
                  style={{ transitionDelay: hover === i ? "0ms" : `${Math.min(i, 10) * 12}ms` }}
                >
                  {t}
                </span>
              ))}
              <div className="mt-4 w-full border-t border-gold/15 pt-5 font-body text-[13px] text-cream/45">
                Not on this list? Send a photo. We have built most of it at least once.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



/* ------------------------------------------------------------------ */
/* Lighting & sound band                                               */
/* ------------------------------------------------------------------ */
const GEAR = [
  ["Fairy-light canopies", "Ceiling runs in warm white, draped or taut, dimmable to cue."],
  ["Chandeliers & lanterns", "Hanging centrepieces for mandaps, reception stages and entry courts."],
  ["Par-lights & stage wash", "Colour-wash the stage, the wall behind it, or the whole hall."],
  ["Neon & LED lettering", "Names, ages, hashtags and single-word signs, cut to order."],
  ["DJ truss & sound", "Truss rig, speakers, wireless mics and a projector with screen."],
  ["Power & safety", "Our own cabling, boards and generator tie-in — taped down, never trailed."],
];

export function LightingBand() {
  return (
    <section className="relative isolate overflow-hidden border-b border-gold/12">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${img(30796037, 1600)})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/88 to-ink/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/70" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="peacock">Lighting &amp; sound</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,5.6vw,4.3rem)] leading-[0.94] font-black tracking-[-0.03em] text-cream">
              Light is the decor
              <br />
              everybody feels and
              <br />
              <em className="font-light text-haldi italic">nobody can name.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 max-w-xl font-body text-[15px] leading-relaxed text-cream/65">
              We rig it ourselves — no borrowed extension cords and no guessing the hall&rsquo;s
              fuse rating. Tell us the ceiling, the muhurtha time and the mood, and we&rsquo;ll tell
              you exactly what it can hold.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-gold/18 bg-gold/15 sm:grid-cols-2 lg:grid-cols-3">
          {GEAR.map(([t, d], i) => (
            <Reveal key={t} delay={i * 70}>
              <div className="group h-full bg-ink/88 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-ink/70">
                <div className="flex items-center gap-3">
                  <IconBulb className="h-5 w-5 text-haldi transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(255,201,74,0.9)]" />
                  <h3 className="font-display text-[17px] leading-tight font-bold text-cream">{t}</h3>
                </div>
                <p className="mt-3 font-body text-[13.5px] leading-relaxed text-cream/58">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Btn
              href={waLink("Namaskara! I need lighting and sound for my function. Details: ")}
              external
            >
              <IconWhatsapp className="h-4 w-4" /> Ask about lighting
            </Btn>
            <a
              href="#gallery"
              className="group inline-flex items-center gap-2 font-body text-[12px] font-bold tracking-[0.16em] text-cream/60 uppercase transition-colors hover:text-haldi"
            >
              See lighting installs
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Coverage                                                            */
/* ------------------------------------------------------------------ */
export function Coverage() {
  return (
    <section className="relative overflow-hidden border-b border-gold/12 bg-ink py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title="Mysuru city and"
              italic="60 km around it."
              lead="We are based in T. Rasipura and travel the whole district — plus Srirangapatna, Pandavapura, Maddur, Melukote and Nanjangud for wedding-scale work."
            />
            <div className="mt-9 flex flex-wrap gap-2">
              {COVERAGE.map((c, i) => (
                <Reveal key={c} delay={Math.min(i, 12) * 30}>
                  <span
                    className={cn(
                      "inline-block rounded-lg border px-3.5 py-2 font-body text-[12.5px] font-semibold transition-colors duration-300 hover:border-marigold hover:text-marigold",
                      c === "T. Rasipura"
                        ? "border-marigold/60 bg-marigold/12 text-marigold"
                        : "border-gold/18 bg-ink2/60 text-cream/65"
                    )}
                  >
                    {c}
                  </span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Btn href={waLink("Namaskara! Is my area covered? My function venue is: ")} external variant="outline">
                  <IconWhatsapp className="h-4 w-4" /> Check my venue
                </Btn>
                <span className="font-body text-[13px] text-cream/45">
                  Outside this list? Ask anyway — we travel for weddings.
                </span>
              </div>
            </Reveal>
          </div>

          {/* radar */}
          <Reveal delay={120}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full border border-gold/15" />
              <div className="absolute inset-[12%] rounded-full border border-gold/15" />
              <div className="absolute inset-[26%] rounded-full border border-gold/15" />
              <div className="absolute inset-[40%] rounded-full border border-gold/15" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="a-ring absolute h-24 w-24 rounded-full border border-marigold/50" />
                <span
                  className="a-ring absolute h-24 w-24 rounded-full border border-marigold/40"
                  style={{ animationDelay: "1.2s" }}
                />
                <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-marigold to-kumkum text-center shadow-[0_18px_50px_-14px_rgba(245,165,36,0.85)]">
                  <div>
                    <div className="font-display text-[13px] leading-none font-black text-ink">T. RASI</div>
                    <div className="font-display text-[13px] leading-none font-black text-ink">PURA</div>
                    <div className="mt-1 font-body text-[8.5px] font-bold tracking-[0.2em] text-ink/70 uppercase">
                      Base
                    </div>
                  </div>
                </div>
              </div>
              {[
                { t: "Mysuru City", x: "22%", y: "30%" },
                { t: "Srirangapatna", x: "68%", y: "18%" },
                { t: "Nanjangud", x: "78%", y: "66%" },
                { t: "Hunsur", x: "12%", y: "62%" },
                { t: "T. Narasipur", x: "48%", y: "86%" },
                { t: "Maddur", x: "86%", y: "40%" },
              ].map((d, i) => (
                <span
                  key={d.t}
                  className="a-floaty absolute flex items-center gap-2"
                  style={{ left: d.x, top: d.y, ["--dur" as string]: `${6 + i}s`, ["--delay" as string]: `${-i}s` }}
                >
                  <span className="h-2 w-2 rounded-full bg-peacock shadow-[0_0_12px_2px_rgba(21,147,138,0.7)]" />
                  <span className="rounded-full border border-gold/20 bg-ink/85 px-2.5 py-1 font-body text-[10.5px] font-bold tracking-wide text-cream/70 backdrop-blur">
                    {d.t}
                  </span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

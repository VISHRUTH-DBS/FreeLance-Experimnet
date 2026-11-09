import { useState } from "react";
import { BIZ, FAQS, PACKAGES, waLink } from "../data";
import { cn } from "../utils/cn";
import { Btn, Eyebrow, Reveal, SectionHeading } from "./ui";
import { IconArrow, IconCheck, IconPhone, IconPlus, IconWhatsapp } from "./icons";

const PRICE_FACTORS = [
  ["Hall size & ceiling height", "Higher ceilings need truss, ladders and more drape fabric."],
  ["Fresh vs. artificial florals", "Marigold and rose are quoted by the kilo, on the day's market rate."],
  ["Number of areas covered", "Stage + entrance + pathway + cake table is four builds, not one."],
  ["Lighting & sound add-ons", "Par-lights, fairy canopies, DJ truss, mic and projector."],
  ["Muhurtha timing", "Night installs and 4 AM muhurthas need an extra crew shift."],
  ["Travel beyond 25 km", "Outside Mysuru city we add transport and stay for the crew."],
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden border-b border-gold/12 bg-ink2 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(245,165,36,0.11),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Indicative pricing"
            title="Three scales of"
            italic="celebration."
            lead="These are honest starting points, not bait prices. Every final quote is itemised on WhatsApp after we know the venue, the date and how much of it you want covered."
          />
          <Reveal delay={150}>
            <div className="max-w-sm rounded-2xl border border-gold/20 bg-ink/60 p-5">
              <Eyebrow>Good to know</Eyebrow>
              <p className="mt-3 font-body text-[13.5px] leading-relaxed text-cream/60">
                A small advance reserves your date. The balance is settled after setup, on the day
                of the function — not before.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-5 lg:grid-cols-3 lg:gap-6">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.tier} delay={i * 110} className={cn(p.popular && "lg:-mt-8")}>
              <article
                className={cn(
                  "group relative overflow-hidden rounded-[28px] border transition-all duration-500 hover:-translate-y-1.5",
                  p.popular
                    ? "border-marigold/60 bg-gradient-to-b from-wine/45 to-ink/85 shadow-[0_40px_90px_-40px_rgba(245,165,36,0.6)]"
                    : "border-gold/18 bg-ink/65 hover:border-gold/40"
                )}
              >
                {p.popular && (
                  <div className="flex items-center justify-center gap-2 bg-marigold py-2 font-body text-[10.5px] font-bold tracking-[0.24em] text-ink uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink" /> Most booked
                  </div>
                )}

                <div className="p-7 sm:p-8">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-3xl leading-none font-black tracking-[-0.02em] text-cream">
                      {p.tier}
                    </h3>
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ background: p.accent, boxShadow: `0 0 14px ${p.accent}` }}
                    />
                  </div>
                  <p className="mt-2 font-body text-[12px] font-semibold tracking-[0.16em] text-marigold uppercase">
                    {p.subtitle}
                  </p>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="font-display text-[3.2rem] leading-none font-black text-cream">{p.price}</span>
                    <span className="pb-1.5 font-body text-[12px] font-semibold tracking-wide text-cream/45">
                      {p.unit}
                    </span>
                  </div>
                  <p className="mt-2.5 font-body text-[12.5px] text-cream/50">{p.best}</p>
                </div>

                {/* ticket notch divider */}
                <div className="relative h-px">
                  <div className="absolute inset-x-7 top-0 border-t border-dashed border-gold/25" />
                  <span className="absolute -top-3 -left-3 h-6 w-6 rounded-full border border-gold/18 bg-ink2" />
                  <span className="absolute -top-3 -right-3 h-6 w-6 rounded-full border border-gold/18 bg-ink2" />
                </div>

                <div className="p-7 sm:p-8">
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 font-body text-[13.5px] leading-snug text-cream/75">
                        <span
                          className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full"
                          style={{ background: `${p.accent}26`, color: p.accent }}
                        >
                          <IconCheck className="h-3 w-3" strokeWidth={2.6} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Btn
                    href={waLink(
                      `Namaskara Chethan Events! I am interested in the "${p.tier}" package (${p.price} onwards). My function details: `
                    )}
                    external
                    variant={p.popular ? "solid" : "outline"}
                    className="mt-7 w-full"
                  >
                    <IconWhatsapp className="h-4 w-4" /> Enquire about {p.tier}
                  </Btn>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center font-body text-[12px] tracking-wide text-cream/35">
          * Indicative starting prices. Final quote depends on venue, scale, materials and travel —
          shared in writing before anything is booked.
        </p>

        {/* what moves the price */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <div>
              <Eyebrow>Transparency</Eyebrow>
              <h3 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight font-black tracking-tight text-cream">
                Six things that <em className="font-light text-marigold italic">move the price</em>.
              </h3>
              <p className="mt-4 font-body text-[14.5px] leading-relaxed text-cream/58">
                We would rather explain it up front than surprise you later. Send us these six
                answers and your quote comes back the same day.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRICE_FACTORS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-gold/15 bg-ink/55 p-5 transition-all duration-400 hover:-translate-y-1 hover:border-peacock/45">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-[10.5px] font-bold tracking-[0.2em] text-peacock">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-display text-[15.5px] leading-tight font-bold text-cream">{t}</h4>
                  </div>
                  <p className="mt-2.5 font-body text-[13px] leading-relaxed text-cream/55">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative overflow-hidden border-b border-gold/12 bg-ink py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Before you enquire" title="Questions we" italic="get every week." />
            <Reveal delay={150}>
              <div className="mt-8 rounded-3xl border border-gold/18 bg-gradient-to-br from-plum/70 to-ink/70 p-7">
                <p className="font-body text-[14px] leading-relaxed text-cream/65">
                  Something not covered here? Chethan picks up his own phone — call either number
                  and you will get a straight answer, not a call-centre script.
                </p>
                <div className="mt-6 space-y-2.5">
                  {BIZ.phones.map((ph) => (
                    <a
                      key={ph.raw}
                      href={`tel:+${ph.raw}`}
                      className="group flex items-center gap-3 rounded-xl border border-gold/18 bg-ink/60 px-4 py-3 transition-all duration-300 hover:border-marigold/50"
                    >
                      <IconPhone className="h-4 w-4 text-marigold transition-transform duration-300 group-hover:-rotate-12" />
                      <span className="font-display text-lg font-bold text-cream">{ph.display}</span>
                    </a>
                  ))}
                </div>
                <Btn href={waLink("Namaskara! I have a question about decoration: ")} external className="mt-4 w-full">
                  <IconWhatsapp className="h-4 w-4" /> Ask on WhatsApp
                </Btn>
              </div>
            </Reveal>
          </div>

          <div className="divide-y divide-gold/15 border-y border-gold/15">
            {FAQS.map((f, i) => {
              const on = open === i;
              return (
                <Reveal key={f.q} delay={i * 55}>
                  <div>
                    <button
                      onClick={() => setOpen(on ? null : i)}
                      aria-expanded={on}
                      className="group flex w-full items-start gap-5 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "mt-1 font-body text-[11px] font-bold tracking-[0.2em] transition-colors duration-400",
                          on ? "text-marigold" : "text-cream/30"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 font-display text-[clamp(1.1rem,2vw,1.5rem)] leading-snug font-bold tracking-tight transition-colors duration-400",
                          on ? "text-marigold" : "text-cream group-hover:text-cream/75"
                        )}
                      >
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500",
                          on
                            ? "rotate-45 border-marigold bg-marigold text-ink"
                            : "border-gold/25 text-cream/60 group-hover:border-marigold group-hover:text-marigold"
                        )}
                      >
                        <IconPlus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        on ? "grid-rows-[1fr] pb-7 opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pl-11 font-body text-[14.5px] leading-relaxed text-cream/62">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={200}>
              <div className="flex flex-wrap items-center justify-between gap-4 py-7">
                <span className="font-body text-[13px] tracking-wide text-cream/45">
                  Ready when you are.
                </span>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 font-body text-[12px] font-bold tracking-[0.16em] text-marigold uppercase"
                >
                  Go to the enquiry form
                  <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

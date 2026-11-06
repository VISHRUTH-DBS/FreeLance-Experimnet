import { useState } from "react";
import { BIZ, GALLERY, OCCASIONS, SERVICES, img, waLink } from "../data";
import { cn } from "../utils/cn";
import { Btn, Eyebrow, Mandala, Reveal, SectionHeading } from "./ui";
import { ICONS, IconArrow, IconCheck, IconWhatsapp } from "./icons";

function photoTitle(id: number) {
  return (
    GALLERY.find((photo) => photo.id === id)?.title ??
    `Decoration photograph ${id}`
  );
}

function photoCaption(serviceId: string) {
  if (serviceId === "babyshower" || serviceId === "naming") {
    return "General decoration examples";
  }

  if (serviceId === "lighting") {
    return "Lighting and illuminated decorations";
  }

  return "Photos shared by Chethan Events";
}

export function Services() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-gold/12 bg-ink2 py-24 lg:py-32"
    >
      <Mandala className="pointer-events-none absolute -top-56 -left-64 h-[42rem] w-[42rem] text-gold/10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_80%_0%,rgba(245,165,36,0.09),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our services"
            title="For your"
            italic="celebrations."
            lead={`Wedding events, birthday decoration, baby showers, naming ceremonies, lighting and DJ sound. Contact ${BIZ.name} in ${BIZ.address} to discuss your requirements.`}
            className="max-w-2xl"
          />

          <Reveal delay={180}>
            <div className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-ink/60 px-5 py-4 backdrop-blur">
              <div>
                <div className="font-display text-3xl leading-none font-black text-marigold">
                  {String(SERVICES.length).padStart(2, "0")}
                </div>
                <div className="mt-1.5 font-body text-[10px] font-bold tracking-[0.2em] text-cream/50 uppercase">
                  Service categories
                </div>
              </div>

              <div className="h-12 w-px bg-gold/20" />

              <div>
                <div className="font-display text-3xl leading-none font-black text-peacock">
                  {String(BIZ.phones.length).padStart(2, "0")}
                </div>
                <div className="mt-1.5 font-body text-[10px] font-bold tracking-[0.2em] text-cream/50 uppercase">
                  Contact numbers
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Desktop service preview */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-t-[14rem] rounded-b-3xl border border-gold/25 bg-plum">
                {SERVICES.map((s, i) => (
                  <img
                    key={s.id}
                    src={img(s.images[0])}
                    alt={photoTitle(s.images[0])}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                      i === active
                        ? "scale-100 opacity-100"
                        : "scale-105 opacity-0"
                    )}
                    loading="lazy"
                    decoding="async"
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div
                    className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-body text-[10px] font-bold tracking-[0.2em] text-ink uppercase"
                    style={{ background: svc.accent }}
                  >
                    {svc.no} · Our services
                  </div>

                  <h3 className="font-display text-3xl leading-tight font-black text-cream">
                    {svc.name}
                  </h3>

                  <p className="mt-1 font-display text-base tracking-wide text-cream/50">
                    {svc.kannada}
                  </p>

                  <p className="mt-2 font-body text-[11px] leading-relaxed text-cream/60">
                    {photoCaption(svc.id)}
                  </p>

                  <div className="mt-5 flex items-end justify-between border-t border-cream/15 pt-4">
                    <div>
                      <div className="font-body text-[10px] font-bold tracking-[0.2em] text-cream/45 uppercase">
                        For pricing
                      </div>
                      <div className="font-display text-2xl font-black text-marigold">
                        Contact us
                      </div>
                    </div>

                    <div className="flex gap-1.5" aria-hidden="true">
                      {svc.images.map((id, k) => (
                        <span
                          key={id}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-500",
                            k === 0
                              ? "w-8 bg-marigold"
                              : "w-3 bg-cream/25"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                {SERVICES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${s.name}`}
                    aria-pressed={i === active}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-500",
                      i === active
                        ? "bg-marigold"
                        : "bg-cream/15 hover:bg-cream/35"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Service list */}
          <div>
            {SERVICES.map((s, i) => {
              const on = i === active;
              const detailsId = `service-details-${s.id}`;
              const triggerId = `service-trigger-${s.id}`;

              return (
                <Reveal key={s.id} delay={i * 70}>
                  <div
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "group relative border-t border-gold/15 transition-colors duration-500",
                      i === SERVICES.length - 1 && "border-b",
                      on && "border-marigold/35"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0 left-0 h-px bg-marigold transition-all duration-700",
                        on ? "w-full" : "w-0"
                      )}
                    />

                    <div className="flex w-full items-start gap-4 py-7 text-left sm:gap-7 sm:py-8">
                      <span
                        className={cn(
                          "mt-1 font-body text-[11px] font-bold tracking-[0.2em] transition-colors duration-500",
                          on ? "text-marigold" : "text-cream/30"
                        )}
                      >
                        {s.no}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3
                            className={cn(
                              "font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-tight font-black tracking-[-0.02em] transition-colors duration-500",
                              on
                                ? "text-marigold"
                                : "text-cream group-hover:text-cream"
                            )}
                          >
                            <button
                              id={triggerId}
                              type="button"
                              onClick={() => setActive(i)}
                              aria-expanded={on}
                              aria-controls={detailsId}
                              className="cursor-pointer text-left"
                            >
                              {s.name}
                            </button>
                          </h3>

                          <span className="font-display text-sm tracking-[0.18em] text-cream/35">
                            {s.kannada}
                          </span>
                        </div>

                        {/* Mobile client photos */}
                        <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
                          {s.images.slice(0, 2).map((id) => (
                            <img
                              key={id}
                              src={img(id)}
                              alt={photoTitle(id)}
                              className="h-28 w-full rounded-xl object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          ))}
                        </div>

                        <p className="mt-1 font-body text-[10px] text-cream/45 lg:hidden">
                          {photoCaption(s.id)}
                        </p>

                        <div
                          id={detailsId}
                          role="region"
                          aria-labelledby={triggerId}
                          aria-hidden={!on}
                          className={cn(
                            "grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            on
                              ? "mt-4 grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="max-w-xl font-body text-[15px] leading-relaxed text-cream/65">
                              {s.blurb}
                            </p>

                            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                              {s.points.map((pt) => (
                                <li
                                  key={pt}
                                  className="flex items-start gap-2.5 font-body text-[13px] leading-snug text-cream/75"
                                >
                                  <IconCheck className="mt-0.5 h-3.5 w-3.5" />
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-5 flex flex-wrap items-center gap-3">
                              <span className="rounded-full border border-gold/25 px-3.5 py-1.5 font-body text-[11px] font-bold tracking-[0.14em] text-gold uppercase">
                                Enquire for pricing
                              </span>

                              <a
                                href={waLink(
                                  `Namaskara! I am interested in ${s.name} by Chethan Events. Please share availability and pricing for my event.`
                                )}
                                target="_self"
                                rel="noreferrer noopener"
                                tabIndex={on ? 0 : -1}
                                className="inline-flex items-center gap-2 font-body text-[12px] font-bold tracking-[0.14em] text-peacock uppercase transition-colors hover:text-marigold"
                              >
                                <IconWhatsapp className="h-4 w-4" />
                                Enquire about this
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <IconArrow
                        className={cn(
                          "mt-2 h-5 w-5 transition-all duration-500",
                          on
                            ? "translate-x-0 text-marigold opacity-100"
                            : "-translate-x-2 text-cream/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        )}
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={120}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Eyebrow>Planning an event?</Eyebrow>

                <Btn
                  href={waLink(
                    "Namaskara Chethan Events! I would like to discuss the services needed for my event."
                  )}
                  external
                  variant="dark"
                >
                  <IconWhatsapp className="h-4 w-4" />
                  Discuss your event
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Confirmed occasions and services */}
        <div className="mt-20 rounded-3xl border border-gold/18 bg-gradient-to-br from-plum/80 to-ink/60 p-7 sm:p-10">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-black tracking-tight text-cream sm:text-3xl">
                Occasions &amp; services
              </h3>

              <p className="font-body text-sm text-cream/50">
                Contact us to discuss your date, venue and requirements.
              </p>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OCCASIONS.map((o, i) => {
              const Ico = ICONS[o.icon];

              return (
                <Reveal key={o.name} delay={i * 35}>
                  <div className="group flex items-center gap-3.5 rounded-2xl border border-gold/12 bg-ink/50 px-4 py-3.5 transition-all duration-400 hover:-translate-y-0.5 hover:border-marigold/45 hover:bg-marigold/8">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/10 text-marigold transition-all duration-400 group-hover:bg-marigold group-hover:text-ink">
                      {Ico ? <Ico className="h-5 w-5" /> : null}
                    </span>

                    <span className="font-body text-[13.5px] leading-tight font-semibold text-cream/85">
                      {o.name}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
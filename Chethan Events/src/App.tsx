import { BIZ, FEATURED_IMAGES, img, waLink } from "./data";
import { Contact } from "./components/Contact";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { FloatingDock, Header } from "./components/Nav";
import { Services } from "./components/Services";
import { Btn, Reveal, SectionHeading } from "./components/ui";
import { IconArrow, IconWhatsapp } from "./components/icons";

/* ------------------------------------------------------------------ */
/* About Chethan Events                                                */
/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-gold/12 bg-ink2 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_10%_90%,rgba(210,64,47,0.16),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Client photo collage */}
          <Reveal>
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <figure className="relative overflow-hidden rounded-[26px] border border-gold/22 shadow-[0_45px_90px_-40px_rgba(0,0,0,0.95)]">
                <img
                  src={img(FEATURED_IMAGES.aboutMain)}
                  alt="Stage decoration with floral arches"
                  className="aspect-[4/3.4] w-full object-cover transition-transform duration-[1600ms] hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />

                <figcaption className="absolute bottom-5 left-5 font-body text-[10.5px] font-bold tracking-[0.22em] text-marigold uppercase">
                  Floral stage decoration
                </figcaption>
              </figure>

              <figure className="absolute -right-3 -bottom-10 hidden w-[46%] overflow-hidden rounded-[22px] border border-gold/22 shadow-[0_35px_70px_-30px_rgba(0,0,0,0.95)] sm:block">
                <img
                  src={img(FEATURED_IMAGES.aboutDetail)}
                  alt="Green and cream decorative stage backdrop"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                <figcaption className="absolute inset-x-0 bottom-0 bg-ink/75 px-3 py-2 font-body text-[9px] font-bold tracking-[0.16em] text-cream uppercase">
                  Green &amp; cream stage
                </figcaption>
              </figure>

              {/* Brand seal */}
              <div className="a-floaty absolute -top-7 -left-4 grid h-24 w-24 place-items-center rounded-full border border-marigold/45 bg-ink/90 text-center backdrop-blur sm:h-28 sm:w-28">
                <div>
                  <div className="font-display text-2xl leading-none font-black text-marigold">
                    CE
                  </div>

                  <div className="mt-1 font-body text-[8.5px] font-bold tracking-[0.18em] text-cream/55 uppercase">
                    Events
                    <br />
                    &amp; Audio
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Business information */}
          <div>
            <SectionHeading
              eyebrow="About Chethan Events"
              title="Your occasions,"
              italic="our services."
            />

            <Reveal delay={120}>
              <div className="mt-7 space-y-5">
                <p className="font-body text-[15px] leading-relaxed text-cream/65">
                  {BIZ.name} is based in {BIZ.address}. Services include
                  wedding events, birthday decoration, baby showers,
                  naming ceremonies, DJ sound and lighting.
                </p>

                <p className="font-body text-[15px] leading-relaxed text-cream/65">
                  We also offer anniversary celebrations, bride-to-be
                  events, haldi decor, bachelorette parties, surprise
                  events, engagement decoration, college festivals,
                  inaugurations, launch events and festival lighting.
                </p>

                <p className="font-body text-[15px] leading-relaxed text-cream/65">
                  Planning an event? Call{" "}
                  <a
                    href={`tel:+${BIZ.phones[0].raw}`}
                    className="font-semibold text-marigold underline decoration-marigold/40 underline-offset-4 transition-colors hover:text-haldi"
                  >
                    {BIZ.phones[0].display}
                  </a>{" "}
                  or{" "}
                  <a
                    href={`tel:+${BIZ.phones[1].raw}`}
                    className="font-semibold text-marigold underline decoration-marigold/40 underline-offset-4 transition-colors hover:text-haldi"
                  >
                    {BIZ.phones[1].display}
                  </a>{" "}
                  to discuss your date, venue, service requirements and
                  pricing.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Celebrations", "Weddings, birthdays & anniversaries"],
                  ["Ceremonies", "Baby showers & naming ceremonies"],
                  ["Sound & lighting", "DJ sound & festival lighting"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-gold/16 bg-ink/55 p-4"
                  >
                    <div className="font-display text-[15px] leading-tight font-bold text-cream">
                      {title}
                    </div>

                    <div className="mt-1.5 font-body text-[12px] leading-snug text-cream/50">
                      {description}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Btn href="#contact" variant="dark">
                  Start an enquiry
                  <IconArrow className="h-4 w-4" />
                </Btn>

                <Btn
                  href={waLink(
                    "Namaskara Chethan Events! I would like to discuss services, availability and pricing for my event."
                  )}
                  external
                  variant="ghost"
                >
                  <IconWhatsapp className="h-4 w-4" />
                  Or message us
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex items-center gap-4 border-t border-gold/15 pt-6">
                <span className="font-display text-2xl text-marigold italic">
                  {BIZ.name}
                </span>

                <span className="font-body text-[12.5px] tracking-wide text-cream/40">
                  {BIZ.address}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink font-body text-cream antialiased">
      <a href="#services" className="skip-link">
        Skip to content
      </a>

      <Header />

      <main>
        <Hero />
        <Services />
        <Gallery />
        <Story />
        <Contact />
      </main>

      <FloatingDock />
    </div>
  );
}
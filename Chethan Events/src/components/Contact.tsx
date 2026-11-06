import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { BIZ, OCCASIONS, SERVICES, TICKER, waLink } from "../data";
import { cn } from "../utils/cn";
import {
  Btn,
  BulbString,
  Eyebrow,
  Mandala,
  Mark,
  Marquee,
  Petals,
  Reveal,
} from "./ui";
import {
  IconArrow,
  IconCheck,
  IconInstagram,
  IconPhone,
  IconPin,
  IconWhatsapp,
} from "./icons";

const FUNCTION_OPTS = [
  ...OCCASIONS.map((occasion) => occasion.name),
  "Lighting",
];

// Customer budget preferences only — not business prices or packages.
const BUDGETS = [
  "Under ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹40,000",
  "₹40,000+",
  "Not sure yet",
];

interface Form {
  name: string;
  phone: string;
  fn: string;
  date: string;
  venue: string;
  guests: string;
  budget: string;
  msg: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  guests?: string;
}

const EMPTY: Form = {
  name: "",
  phone: "",
  fn: "",
  date: "",
  venue: "",
  guests: "",
  budget: "Not sure yet",
  msg: "",
};

const field =
  "w-full rounded-xl border border-gold/22 bg-ink/70 px-4 py-3.5 font-body text-[14px] text-cream placeholder:text-cream/32 transition-all duration-300 outline-none focus:border-marigold focus:bg-ink focus:ring-4 focus:ring-marigold/12";

const labelCls =
  "mb-2 block font-body text-[10.5px] font-bold tracking-[0.2em] text-cream/45 uppercase";

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  return digits;
}

function buildMessage(form: Form) {
  return [
    `Namaskara ${BIZ.name}! I would like to enquire about your services.`,
    "",
    `Name: ${form.name.trim() || "-"}`,
    `Phone: ${normalizePhone(form.phone) || "-"}`,
    `Function / Service: ${form.fn || "Please discuss with me"}`,
    `Date: ${form.date || "Not fixed yet"}`,
    `Venue / Area: ${form.venue.trim() || "Not decided yet"}`,
    `Approx. guests: ${form.guests.trim() || "Not sure yet"}`,
    `My preferred budget: ${form.budget}`,
    ...(form.msg.trim()
      ? [`Requirements / ideas: ${form.msg.trim()}`]
      : []),
  ].join("\n");
}

export function Contact() {
  const [f, setF] = useState<Form>({ ...EMPTY });
  const [err, setErr] = useState<FormErrors>({});
  const [prepared, setPrepared] = useState(false);

  const set =
    (key: keyof Form) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = event.target.value;

      setF((previous) => ({
        ...previous,
        [key]: value,
      }));

      if (key === "name" || key === "phone" || key === "guests") {
        setErr((previous) => ({
          ...previous,
          [key]: undefined,
        }));
      }
    };

  const link = waLink(buildMessage(f));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next: FormErrors = {};

    if (f.name.trim().length < 2) {
      next.name = "Please enter your name";
    }

    const phone = normalizePhone(f.phone);

    if (!/^[6-9]\d{9}$/.test(phone)) {
      next.phone = "Enter a valid Indian mobile number, with or without +91";
    }

    const guests = f.guests.trim();

    if (guests && !/^[1-9]\d*$/.test(guests)) {
      next.guests = "Enter a positive whole number or leave this blank";
    }

    setErr(next);

    if (Object.keys(next).length > 0) {
      const firstErrorId = next.name
        ? "c-name"
        : next.phone
          ? "c-phone"
          : "c-guests";

      document.getElementById(firstErrorId)?.focus();
      return;
    }

    const cleaned: Form = {
      ...f,
      name: f.name.trim(),
      phone,
      venue: f.venue.trim(),
      guests,
      msg: f.msg.trim(),
    };

    setF(cleaned);
    setPrepared(true);

    // Opens a prefilled message. The customer sends it in WhatsApp.
    window.location.assign(waLink(buildMessage(cleaned)));
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink pt-24 lg:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,#33182e_0%,#1a1020_45%,#140c16_80%)]" />
      <div className="grain pointer-events-none absolute inset-0 -z-10" />
      <Mandala className="pointer-events-none absolute -bottom-72 -left-64 -z-10 h-[46rem] w-[46rem] text-gold/12" />
      <Petals count={10} className="-z-10 opacity-70" />

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-[1] opacity-80">
        <BulbString count={34} sag={18} className="h-16" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 pt-16 sm:px-6">
        <div className="text-center">
          <Reveal>
            <Eyebrow>Begin your celebration</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,6vw,4.6rem)] leading-[0.92] font-black tracking-[-0.03em] text-cream">
              Tell us the date.
              <br />
              <em className="font-light text-marigold italic">
                Let&rsquo;s discuss your event.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-2xl font-body text-[15px] leading-relaxed text-cream/60">
              Fill in your details to prepare a WhatsApp enquiry, or call us
              directly. Review the message and press Send in WhatsApp to
              contact the team.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Enquiry form */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[28px] border border-gold/20 bg-ink2/80 p-6 backdrop-blur sm:p-9">
              {prepared ? (
                <div
                  className="flex h-full min-h-[26rem] flex-col items-start justify-center"
                  role="status"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-peacock/18 text-peacock">
                    <IconCheck className="h-8 w-8" strokeWidth={2.2} />
                  </span>

                  <h3 className="mt-6 font-display text-3xl leading-tight font-black text-cream">
                    Your message is ready, {f.name.split(/\s+/)[0]}.
                  </h3>

                  <p className="mt-3 max-w-md font-body text-[14.5px] leading-relaxed text-cream/62">
                    This website has prepared your enquiry, but has not sent
                    it. Review the message and press Send in WhatsApp. If
                    WhatsApp did not open, use the button below or call us.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Btn href={link} external>
                      <IconWhatsapp className="h-4 w-4" />
                      Open WhatsApp again
                    </Btn>

                    <Btn
                      href={`tel:+${BIZ.phones[0].raw}`}
                      variant="outline"
                    >
                      <IconPhone className="h-4 w-4" />
                      Call {BIZ.phones[0].display}
                    </Btn>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPrepared(false);
                      setErr({});
                    }}
                    className="mt-8 font-body text-[11.5px] font-bold tracking-[0.18em] text-cream/40 uppercase transition-colors hover:text-marigold"
                  >
                    Edit your enquiry
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPrepared(false);
                      setF({ ...EMPTY });
                      setErr({});
                    }}
                    className="mt-4 font-body text-[11.5px] font-bold tracking-[0.18em] text-cream/40 uppercase transition-colors hover:text-marigold"
                  >
                    Start a new enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="c-name">
                        Your name *
                      </label>

                      <input
                        id="c-name"
                        name="name"
                        autoComplete="name"
                        required
                        maxLength={100}
                        className={cn(field, err.name && "border-kumkum")}
                        value={f.name}
                        onChange={set("name")}
                        placeholder="Your name"
                        aria-invalid={Boolean(err.name)}
                        aria-describedby={err.name ? "c-name-error" : undefined}
                      />

                      {err.name && (
                        <p
                          id="c-name-error"
                          role="alert"
                          className="mt-1.5 font-body text-[11.5px] text-kumkum"
                        >
                          {err.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="c-phone">
                        Mobile / WhatsApp *
                      </label>

                      <input
                        id="c-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        maxLength={20}
                        className={cn(field, err.phone && "border-kumkum")}
                        value={f.phone}
                        onChange={set("phone")}
                        placeholder="10-digit number or +91"
                        aria-invalid={Boolean(err.phone)}
                        aria-describedby={
                          err.phone ? "c-phone-error" : undefined
                        }
                      />

                      {err.phone && (
                        <p
                          id="c-phone-error"
                          role="alert"
                          className="mt-1.5 font-body text-[11.5px] text-kumkum"
                        >
                          {err.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="c-fn">
                        Function / service
                      </label>

                      <div className="relative">
                        <select
                          id="c-fn"
                          name="function"
                          className={cn(field, "appearance-none pr-11")}
                          value={f.fn}
                          onChange={set("fn")}
                        >
                          <option value="" className="bg-ink">
                            Select a service
                          </option>

                          {FUNCTION_OPTS.map((option) => (
                            <option
                              key={option}
                              value={option}
                              className="bg-ink"
                            >
                              {option}
                            </option>
                          ))}
                        </select>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-marigold"
                        >
                          <path
                            d="m6 9 6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="c-date">
                        Date of function
                      </label>

                      <input
                        id="c-date"
                        name="date"
                        type="date"
                        className={cn(field, "[color-scheme:dark]")}
                        value={f.date}
                        onChange={set("date")}
                      />
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="c-venue">
                        Venue / area
                      </label>

                      <input
                        id="c-venue"
                        name="venue"
                        maxLength={200}
                        className={field}
                        value={f.venue}
                        onChange={set("venue")}
                        placeholder="Venue name, town or area"
                      />
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="c-guests">
                        Approx. guests
                      </label>

                      <input
                        id="c-guests"
                        name="guests"
                        inputMode="numeric"
                        maxLength={7}
                        className={cn(field, err.guests && "border-kumkum")}
                        value={f.guests}
                        onChange={set("guests")}
                        placeholder="e.g. 150"
                        aria-invalid={Boolean(err.guests)}
                        aria-describedby={
                          err.guests ? "c-guests-error" : undefined
                        }
                      />

                      {err.guests && (
                        <p
                          id="c-guests-error"
                          role="alert"
                          className="mt-1.5 font-body text-[11.5px] text-kumkum"
                        >
                          {err.guests}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <span id="budget-label" className={labelCls}>
                        Your preferred budget
                      </span>

                      <div
                        className="flex flex-wrap gap-2"
                        role="group"
                        aria-labelledby="budget-label"
                        aria-describedby="budget-note"
                      >
                        {BUDGETS.map((budget) => (
                          <button
                            type="button"
                            key={budget}
                            aria-pressed={f.budget === budget}
                            onClick={() =>
                              setF((previous) => ({
                                ...previous,
                                budget,
                              }))
                            }
                            className={cn(
                              "rounded-full border px-4 py-2.5 font-body text-[12.5px] font-semibold transition-all duration-300",
                              f.budget === budget
                                ? "border-marigold bg-marigold text-ink"
                                : "border-gold/22 text-cream/60 hover:border-gold/55 hover:text-cream"
                            )}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>

                      <p
                        id="budget-note"
                        className="mt-2 font-body text-[11.5px] leading-relaxed text-cream/40"
                      >
                        These are enquiry preferences, not package prices.
                        Confirm pricing directly with the team.
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelCls} htmlFor="c-msg">
                        Requirements, ideas or references
                      </label>

                      <textarea
                        id="c-msg"
                        name="message"
                        rows={4}
                        maxLength={1500}
                        className={cn(field, "resize-none")}
                        value={f.msg}
                        onChange={set("msg")}
                        placeholder="Tell us about your event, decoration ideas, or sound and lighting requirements."
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col items-start gap-4 border-t border-gold/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs font-body text-[11.5px] leading-relaxed text-cream/40">
                      Your details will be included in a WhatsApp message.
                      Review it and press Send in WhatsApp to submit your
                      enquiry.
                    </p>

                    <Btn type="submit" className="w-full sm:w-auto">
                      Continue to WhatsApp
                      <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Btn>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact details */}
          <div className="flex flex-col gap-6">
            <Reveal delay={90}>
              <div className="rounded-[28px] border border-gold/20 bg-gradient-to-br from-wine/40 to-ink/70 p-7">
                <Eyebrow>Reach us directly</Eyebrow>

                <div className="mt-5 space-y-3">
                  {BIZ.phones.map((phone, index) => (
                    <a
                      key={phone.raw}
                      href={`tel:+${phone.raw}`}
                      className="group flex items-center gap-4 rounded-2xl border border-gold/18 bg-ink/55 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold/50"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-marigold/12 text-marigold transition-colors duration-300 group-hover:bg-marigold group-hover:text-ink">
                        <IconPhone className="h-4.5 w-4.5" />
                      </span>

                      <span>
                        <span className="block font-body text-[10px] font-bold tracking-[0.2em] text-cream/40 uppercase">
                          {index === 0 ? "Contact number" : "Alternate number"}
                        </span>

                        <span className="mt-0.5 block font-display text-xl leading-none font-black text-cream">
                          {phone.display}
                        </span>
                      </span>
                    </a>
                  ))}

                  <a
                    href={waLink(
                      "Namaskara Chethan Events! I would like to enquire about your services."
                    )}
                    target="_self"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-4 rounded-2xl border border-peacock/35 bg-peacock/10 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-peacock"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1FA855] text-white">
                      <IconWhatsapp className="h-5 w-5" />
                    </span>

                    <span>
                      <span className="block font-body text-[10px] font-bold tracking-[0.2em] text-cream/40 uppercase">
                        WhatsApp
                      </span>
                      <span className="mt-0.5 block font-display text-xl leading-none font-black text-cream">
                        Chat with us
                      </span>
                    </span>
                  </a>

                  <a
                    href={BIZ.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-4 rounded-2xl border border-gold/18 bg-ink/55 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#EE2A7B]/60"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white">
                      <IconInstagram className="h-5 w-5" />
                    </span>

                    <span className="min-w-0">
                      <span className="block font-body text-[10px] font-bold tracking-[0.2em] text-cream/40 uppercase">
                        Instagram
                      </span>
                      <span className="mt-0.5 block break-words font-display text-xl leading-none font-black text-cream">
                        {BIZ.handle}
                      </span>
                    </span>
                  </a>
                </div>

                <div className="mt-6 space-y-4 border-t border-gold/15 pt-6">
                  <a
                    href={BIZ.maps}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-start gap-3.5"
                  >
                    <IconPin className="mt-0.5 h-4.5 w-4.5 text-marigold" />

                    <span>
                      <span className="block font-body text-[10px] font-bold tracking-[0.2em] text-cream/40 uppercase">
                        Based in
                      </span>
                      <span className="mt-1 block font-body text-[14px] leading-snug font-semibold text-cream/85 group-hover:text-marigold">
                        {BIZ.address}
                      </span>
                    </span>
                  </a>

                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 text-peacock">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4.5 w-4.5"
                        aria-hidden
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M12 7v5.4l3.4 2"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    <span>
                      <span className="block font-body text-[10px] font-bold tracking-[0.2em] text-cream/40 uppercase">
                        Event availability
                      </span>
                      <span className="mt-1 block font-body text-[14px] font-semibold text-cream/85">
                        Contact the team to check your date and venue.
                      </span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <IconCheck className="mt-0.5 h-4.5 w-4.5 text-marigold" />

                    <span>
                      <span className="block font-body text-[10px] font-bold tracking-[0.2em] text-cream/40 uppercase">
                        Booking enquiries
                      </span>
                      <span className="mt-1 block font-body text-[14px] font-semibold text-cream/85">
                        Discuss services, pricing and booking terms directly.
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={170}>
              <div className="relative h-64 flex-1 overflow-hidden rounded-[28px] border border-gold/20">
                <iframe
                  title={`Locality map — ${BIZ.address}, not an exact business pin`}
                  src={BIZ.mapEmbed}
                  className="h-full w-full grayscale-[0.35] invert-[0.9] hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <span className="absolute top-4 left-4 rounded-full bg-ink/90 px-3 py-2 font-body text-[10px] text-cream/75 backdrop-blur">
                  Locality map · not an exact business pin
                </span>

                <a
                  href={BIZ.maps}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-ink/90 px-4 py-2.5 font-body text-[11px] font-bold tracking-[0.14em] text-marigold uppercase backdrop-blur transition-colors hover:bg-marigold hover:text-ink"
                >
                  View locality
                  <IconArrow className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-gold/18 bg-ink2/70">
      <div className="border-b border-gold/15 py-3.5">
        <Marquee
          items={[BIZ.name, BIZ.address, ...TICKER]}
          dur={40}
          className="text-cream/45"
          separator="❋"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-11 w-11" />

              <div>
                <div className="font-display text-2xl leading-none font-black tracking-[-0.03em] text-cream">
                  Chethan<span className="text-marigold"> Events</span>
                </div>
                <div className="mt-1.5 font-body text-[9.5px] font-bold tracking-[0.4em] text-cream/40 uppercase">
                  Events · Decoration · Audio
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-sm font-body text-[14px] leading-relaxed text-cream/55">
              Wedding events, birthday decoration, baby showers, naming
              ceremonies, DJ sound and lighting. Based in {BIZ.address}.
              Contact us to discuss your celebration.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={BIZ.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Instagram: ${BIZ.handle}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#EE2A7B] hover:text-[#EE2A7B]"
              >
                <IconInstagram className="h-4.5 w-4.5" />
              </a>

              <a
                href={waLink("Namaskara Chethan Events!")}
                target="_self"
                rel="noreferrer noopener"
                aria-label="Contact Chethan Events on WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#1FA855] hover:text-[#1FA855]"
              >
                <IconWhatsapp className="h-4.5 w-4.5" />
              </a>

              {BIZ.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:+${phone.raw}`}
                  aria-label={`Call ${phone.display}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-marigold hover:text-marigold"
                >
                  <IconPhone className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Services"
            links={SERVICES.map((service) => ({
              label: service.name,
              href: "#services",
            }))}
          />

          <FooterCol
            title="Explore"
            links={[
              { label: "Home", href: "#top" },
              { label: "Our services", href: "#services" },
              { label: "Gallery", href: "#gallery" },
              { label: "Enquiry form", href: "#contact" },
            ]}
          />

          <div>
            <h4 className="font-body text-[10.5px] font-bold tracking-[0.24em] text-marigold uppercase">
              Based in
            </h4>

            <p className="mt-5 font-body text-[13.5px] leading-relaxed text-cream/55">
              {BIZ.address}
            </p>

            <p className="mt-3 font-body text-[13.5px] leading-relaxed text-cream/55">
              Contact us to check availability for your event location.
            </p>

            <a
              href={BIZ.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-2 font-body text-[11.5px] font-bold tracking-[0.16em] text-peacock uppercase transition-colors hover:text-marigold"
            >
              <IconPin className="h-4 w-4" />
              View locality in Maps
            </a>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="mt-16 overflow-hidden">
          <div className="shimmer-text font-display text-[clamp(2.6rem,12.5vw,11rem)] leading-[0.85] font-black tracking-[-0.045em] select-none">
            CHETHAN EVENTS
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gold/15 pt-7 sm:flex-row">
          <p className="font-body text-[12px] tracking-wide text-cream/38">
            © {year} {BIZ.name} · {BIZ.address}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body text-[12px] text-cream/38">
            <a href="#top" className="underline-sweep hover:text-marigold">
              Back to top
            </a>

            <span className="hidden text-gold/30 sm:inline">·</span>

            <a
              href={`tel:+${BIZ.phones[1].raw}`}
              className="underline-sweep hover:text-marigold"
            >
              {BIZ.phones[1].display}
            </a>

            <span className="hidden text-gold/30 sm:inline">·</span>

            <a
              href={BIZ.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-sweep hover:text-marigold"
            >
              {BIZ.handle}
            </a>
          </div>
        </div>
      </div>

      <div className="h-16 sm:h-0" aria-hidden />
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-body text-[10.5px] font-bold tracking-[0.24em] text-marigold uppercase">
        {title}
      </h4>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-2 font-body text-[13.5px] font-semibold text-cream/60 transition-colors hover:text-marigold"
            >
              <span className="h-px w-0 bg-marigold transition-all duration-300 group-hover:w-4" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
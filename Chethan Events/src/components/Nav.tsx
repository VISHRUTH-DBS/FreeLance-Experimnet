import { useEffect, useRef, useState } from "react";
import { BIZ, waLink } from "../data";
import {
  useActiveSection,
  useBodyLock,
  useScrollProgress,
  useScrolled,
} from "../hooks";
import { cn } from "../utils/cn";
import { Btn, Mark } from "./ui";
import {
  IconClose,
  IconInstagram,
  IconMenu,
  IconPhone,
  IconWhatsapp,
} from "./icons";

export const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const IDS = NAV_LINKS.map((link) => link.id);

const ENQUIRY_MESSAGE =
  "Namaskara Chethan Events! I visited your website and would like to discuss services, availability and pricing for my event.";

export function Header() {
  const scrolled = useScrolled(60);
  const progress = useScrollProgress();
  const active = useActiveSection(IDS);
  const [open, setOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useBodyLock(open);

  useEffect(() => {
    if (!open) return;

    const trigger = menuButtonRef.current;
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const controls =
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );

      if (!controls?.length) return;

      const first = controls[0];
      const last = controls[controls.length - 1];
      const focused = document.activeElement;

      if (event.shiftKey && focused === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && focused === last) {
        event.preventDefault();
        first.focus();
      } else if (
        focused &&
        !drawerRef.current?.contains(focused)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);

      if (trigger?.isConnected && trigger.getClientRects().length > 0) {
        trigger.focus();
      }
    };
  }, [open]);

  // Close the mobile drawer when switching to the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");

    const onChange = () => {
      if (desktop.matches) {
        setOpen(false);
      }
    };

    onChange();
    desktop.addEventListener("change", onChange);

    return () => {
      desktop.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <>
      {/* Top utility strip */}
      <div
        aria-hidden={scrolled}
        className={cn(
          "fixed inset-x-0 top-0 z-50 hidden overflow-hidden border-b border-gold/15 bg-ink text-[11px] tracking-[0.18em] text-cream/55 uppercase transition-all duration-500 md:block",
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100"
        )}
      >
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-6 font-body">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-peacock" />
            Events · Decoration · DJ Sound
          </span>

          <span className="flex items-center gap-6">
            <span>{BIZ.address}</span>

            <a
              href={BIZ.instagram}
              target="_blank"
              rel="noreferrer noopener"
              tabIndex={scrolled ? -1 : 0}
              className="underline-sweep hover:text-marigold"
            >
              {BIZ.handle}
            </a>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "top-0 border-b border-gold/15 bg-ink/88 py-2.5 backdrop-blur-xl"
            : "md:top-9 top-0 py-4"
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <a
            href="#top"
            aria-label={`${BIZ.name} — home`}
            className="group flex items-center gap-3"
          >
            <span className="relative">
              <Mark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-45" />
            </span>

            <span className="leading-none">
              <span className="block font-display text-[1.35rem] font-black tracking-[-0.03em] text-cream">
                Chethan<span className="text-marigold"> Events</span>
              </span>

              <span className="mt-1 block font-body text-[9.5px] font-semibold uppercase tracking-[0.42em] text-cream/45">
                Events &amp; Audio
              </span>
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 font-body text-[12.5px] font-semibold tracking-wide transition-colors duration-300",
                  active === link.id
                    ? "text-marigold"
                    : "text-cream/65 hover:text-cream"
                )}
              >
                {link.label}

                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-marigold transition-transform duration-300",
                    active === link.id ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:+${BIZ.phones[0].raw}`}
              className="hidden items-center gap-2 rounded-full border border-gold/25 px-4 py-2.5 font-body text-[12.5px] font-bold tracking-wide text-cream/85 transition-all duration-300 hover:border-marigold hover:text-marigold sm:flex"
            >
              <IconPhone className="h-4 w-4" />
              {BIZ.phones[0].display}
            </a>

            <Btn
              href={waLink(ENQUIRY_MESSAGE)}
              external
              className="hidden !px-5 !py-2.5 md:inline-flex"
            >
              <IconWhatsapp className="h-4 w-4" />
              WhatsApp
            </Btn>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 text-cream transition-colors hover:border-marigold hover:text-marigold lg:hidden"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="absolute inset-x-0 -bottom-px h-px bg-gold/10"
          aria-hidden="true"
        >
          <div
            className="h-full origin-left bg-gradient-to-r from-kumkum via-marigold to-haldi"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-400",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          ref={drawerRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal={open ? true : undefined}
          aria-labelledby="mobile-menu-title"
          className={cn(
            "grain absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-hidden border-l border-gold/20 bg-plum transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-gold/15 px-6 py-5">
            <span
              id="mobile-menu-title"
              className="font-display text-lg font-black text-cream"
            >
              Menu
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-cream/70 hover:border-marigold hover:text-marigold"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex-1 overflow-y-auto px-6 py-6"
          >
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                tabIndex={open ? 0 : -1}
                aria-current={active === link.id ? "location" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-gold/10 py-4 font-display text-2xl font-bold text-cream transition-all duration-500 hover:text-marigold"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateX(24px)",
                  transitionDelay: `${120 + index * 55}ms`,
                }}
              >
                {link.label}

                <span className="font-body text-[11px] tracking-[0.2em] text-gold/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </nav>

          <div className="space-y-3 border-t border-gold/15 px-6 py-6">
            <a
              href={`tel:+${BIZ.phones[0].raw}`}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-marigold px-4 py-3.5 font-body text-sm font-bold text-ink"
            >
              <IconPhone className="h-4 w-4" />
              {BIZ.phones[0].display}
            </a>

            <a
              href={waLink(ENQUIRY_MESSAGE)}
              target="_self"
              rel="noreferrer noopener"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-peacock/50 px-4 py-3.5 font-body text-sm font-bold text-peacock"
            >
              <IconWhatsapp className="h-4 w-4" />
              Chat on WhatsApp
            </a>

            <a
              href={BIZ.instagram}
              target="_blank"
              rel="noreferrer noopener"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-gold/25 px-4 py-3.5 font-body text-sm font-bold text-cream/80"
            >
              <IconInstagram className="h-4 w-4 shrink-0" />
              <span className="min-w-0 break-words">{BIZ.handle}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Floating dock + mobile sticky bar                                   */
/* ------------------------------------------------------------------ */

export function FloatingDock() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 700);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed right-4 bottom-20 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        <a
          href="#top"
          aria-label="Back to top"
          aria-hidden={!show}
          tabIndex={show ? 0 : -1}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-ink/80 text-cream backdrop-blur transition-all duration-500 hover:border-marigold hover:text-marigold",
            show
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            aria-hidden
          >
            <path
              d="m6 14 6-6 6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <a
          href={`tel:+${BIZ.phones[0].raw}`}
          aria-label={`Call ${BIZ.name} on ${BIZ.phones[0].display}`}
          className="relative hidden h-12 w-12 place-items-center rounded-full border border-gold/40 bg-ink/85 text-marigold backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-marigold hover:text-ink sm:grid"
        >
          <span className="a-ring absolute inset-0 rounded-full border border-marigold/60" />
          <IconPhone className="h-5 w-5" />
        </a>

        <a
          href={waLink(ENQUIRY_MESSAGE)}
          target="_self"
          rel="noreferrer noopener"
          aria-label={`Chat with ${BIZ.name} on WhatsApp`}
          className="group flex h-12 min-w-12 items-center gap-0 overflow-hidden rounded-full bg-[#1FA855] pr-0 pl-3.5 text-white shadow-[0_14px_36px_-12px_rgba(31,168,85,0.9)] transition-all duration-400 hover:pr-5 hover:pl-4"
        >
          <IconWhatsapp className="h-6 w-6 shrink-0" />

          <span className="max-w-0 overflow-hidden font-body text-[12.5px] font-bold tracking-wide whitespace-nowrap transition-all duration-400 group-hover:ml-2.5 group-hover:max-w-[150px]">
            Chat with us
          </span>
        </a>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t border-gold/20 bg-gold/15 sm:hidden">
        <a
          href={`tel:+${BIZ.phones[0].raw}`}
          aria-label={`Call ${BIZ.name}`}
          className="flex items-center justify-center gap-2 bg-ink py-3.5 font-body text-[12px] font-bold tracking-wide text-cream"
        >
          <IconPhone className="h-4 w-4 text-marigold" />
          Call
        </a>

        <a
          href={waLink(ENQUIRY_MESSAGE)}
          target="_self"
          rel="noreferrer noopener"
          className="flex items-center justify-center gap-2 bg-[#1FA855] py-3.5 font-body text-[12px] font-bold tracking-wide text-white"
        >
          <IconWhatsapp className="h-4 w-4" />
          WhatsApp
        </a>

        <a
          href="#contact"
          className="flex items-center justify-center gap-2 bg-marigold py-3.5 font-body text-[12px] font-bold tracking-wide text-ink"
        >
          Enquire
        </a>
      </div>
    </>
  );
}
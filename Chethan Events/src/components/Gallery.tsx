import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BIZ, GALLERY, SERVICES, img } from "../data";
import { useBodyLock } from "../hooks";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./ui";
import { IconArrow, IconChevron, IconClose, IconInstagram } from "./icons";

type Filter = "all" | (typeof SERVICES)[number]["id"];

const FILTER_LABELS: Record<Filter, string> = {
  all: "Everything",
  wedding: "Stage Decor",
  birthday: "Birthday",
  babyshower: "Baby Shower",
  naming: "Naming",
  lighting: "Lighting",
};

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const shots = useMemo(
    () =>
      filter === "all"
        ? GALLERY
        : GALLERY.filter((shot) => shot.cat === filter),
    [filter]
  );

  const tabs: { id: Filter; label: string; n: number }[] = [
    {
      id: "all",
      label: FILTER_LABELS.all,
      n: GALLERY.length,
    },
    ...SERVICES.map((service) => ({
      id: service.id,
      label: FILTER_LABELS[service.id],
      n: GALLERY.filter((shot) => shot.cat === service.id).length,
    })).filter((tab) => tab.n > 0),
  ];

  const current =
    open !== null ? shots.find((shot) => shot.id === open) : undefined;

  const currentIdx = current
    ? shots.findIndex((shot) => shot.id === current.id)
    : -1;

  const isOpen = Boolean(current);

  const close = useCallback(() => {
    setOpen(null);
  }, []);

  const step = useCallback(
    (direction: number) => {
      setOpen((currentId) => {
        if (currentId === null || shots.length === 0) {
          return null;
        }

        const index = shots.findIndex((shot) => shot.id === currentId);

        if (index === -1) {
          return shots[0].id;
        }

        const nextIndex =
          (index + direction + shots.length) % shots.length;

        return shots[nextIndex].id;
      });
    },
    [shots]
  );

  useBodyLock(isOpen);

  // Focus the lightbox when opened and restore focus when closed.
  useEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current;
    closeButtonRef.current?.focus();

    return () => {
      if (trigger?.isConnected) {
        trigger.focus();
      }
    };
  }, [isOpen]);

  // Keyboard navigation and focus containment.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }

      if (event.key === "Tab") {
        const buttons =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])"
          );

        if (!buttons?.length) return;

        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey && activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (
          activeElement &&
          !dialogRef.current?.contains(activeElement)
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-b border-gold/12 bg-ink py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_100%,rgba(21,147,138,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6">
        <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our gallery"
            title="Celebrations,"
            italic="in pictures."
            lead="Explore photographs shared by Chethan Events—from stage decorations to birthday setups and lighting. Choose a category and tap any photo to view it."
            tone="peacock"
            className="max-w-2xl"
          />

          <Reveal delay={120}>
            <div
              className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
              role="group"
              aria-label="Filter gallery by category"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={filter === tab.id}
                  onClick={() => {
                    setFilter(tab.id);
                    setOpen(null);
                  }}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 font-body text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-400",
                    filter === tab.id
                      ? "border-marigold bg-marigold text-ink"
                      : "border-gold/22 text-cream/60 hover:border-gold/60 hover:text-cream"
                  )}
                >
                  {tab.label}

                  <span
                    className={cn(
                      "text-[10px]",
                      filter === tab.id
                        ? "text-ink/60"
                        : "text-cream/35"
                    )}
                  >
                    {tab.n}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {shots.length > 0 ? (
          <div
            key={filter}
            className="mt-12 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4"
          >
            {shots.map((shot, index) => (
              <Reveal
                key={`${filter}-${shot.id}`}
                delay={Math.min(index, 8) * 45}
                className="mb-3 break-inside-avoid md:mb-4"
              >
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setOpen(shot.id);
                  }}
                  aria-label={`Open ${shot.title}, picture ${shot.id}`}
                  aria-haspopup="dialog"
                  className="group relative block w-full overflow-hidden rounded-2xl border border-gold/12 bg-plum text-left"
                >
                  <img
                    src={img(shot.id)}
                    alt={shot.title}
                    className={cn(
                      "w-full object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]",
                      index % 5 === 0
                        ? "aspect-[3/4]"
                        : index % 7 === 3
                          ? "aspect-square"
                          : "aspect-[4/3]"
                    )}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 transition-transform duration-500 group-hover:translate-y-0">
                    <div className="font-display text-[15px] leading-tight font-bold text-cream">
                      {shot.title}
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 font-body text-[10px] font-semibold tracking-[0.16em] text-marigold uppercase">
                      {FILTER_LABELS[shot.cat]}
                      {shot.place ? ` · ${shot.place}` : ""}
                    </div>
                  </div>

                  <span className="absolute top-3 right-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-ink/70 text-cream opacity-0 backdrop-blur transition-all duration-400 group-hover:scale-100 group-hover:opacity-100">
                    <IconArrow className="h-4 w-4 -rotate-45" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        ) : (
          <div
            role="status"
            className="mt-12 rounded-3xl border border-gold/18 bg-ink2/70 px-6 py-8 text-center"
          >
            <p className="font-body text-sm text-cream/55">
              No photos are available in this category yet.
            </p>
          </div>
        )}

        <Reveal>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-gold/18 bg-ink2/70 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-2xl font-black tracking-tight text-cream">
                Find Chethan Events on Instagram
              </h3>

              <p className="mt-1.5 max-w-lg font-body text-sm text-cream/55">
                Visit our Instagram profile to explore the posts shared by
                Chethan Events.
              </p>
            </div>

            <a
              href={BIZ.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] px-6 py-3.5 font-body text-[12.5px] font-bold tracking-[0.12em] text-white uppercase transition-transform duration-300 hover:-translate-y-0.5"
            >
              <IconInstagram className="h-4.5 w-4.5" />
              Follow {BIZ.handle}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          aria-describedby="gallery-lightbox-description"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
        >
          <div
            className="absolute inset-0 bg-ink/95 backdrop-blur-md"
            onClick={close}
            aria-hidden="true"
          />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            className="absolute top-5 right-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-ink/70 text-cream transition-colors hover:border-marigold hover:text-marigold"
          >
            <IconClose className="h-5 w-5" />
          </button>

          {shots.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-gold/25 bg-ink/70 text-cream transition-all hover:scale-110 hover:border-marigold hover:text-marigold sm:left-8"
              >
                <IconChevron className="h-5 w-5 rotate-180" />
              </button>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-gold/25 bg-ink/70 text-cream transition-all hover:scale-110 hover:border-marigold hover:text-marigold sm:right-8"
              >
                <IconChevron className="h-5 w-5" />
              </button>
            </>
          )}

          <figure className="relative z-[1] max-h-full w-full max-w-5xl">
            <img
              key={current.id}
              src={img(current.id)}
              alt={current.title}
              className="a-kenburns max-h-[74vh] w-full rounded-2xl border border-gold/20 object-contain"
            />

            <figcaption
              className="mt-4 flex flex-wrap items-center justify-between gap-3"
              aria-live="polite"
              aria-atomic="true"
            >
              <div>
                <div
                  id="gallery-lightbox-title"
                  className="font-display text-xl font-black text-cream"
                >
                  {current.title}
                </div>

                <div
                  id="gallery-lightbox-description"
                  className="mt-1 font-body text-[11px] font-semibold tracking-[0.18em] text-marigold uppercase"
                >
                  {FILTER_LABELS[current.cat]}
                  {current.place ? ` · ${current.place}` : ""}
                  {" · "}
                  Picture {current.id}
                </div>
              </div>

              <div className="font-body text-xs tracking-[0.2em] text-cream/40 tabular-nums">
                {String(currentIdx + 1).padStart(2, "0")}
                {" / "}
                {String(shots.length).padStart(2, "0")}
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
"use client"

import { useEffect, useId, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2 } from "lucide-react"
import styles from "./portfolio-carousel.module.css"

type PortfolioImage = { id: number; alt: string; src: string }

export default function PortfolioCarousel({
  images,
  onOpenImage,
  onViewAll,
}: {
  images: PortfolioImage[]
  onOpenImage: (index: number) => void
  onViewAll: () => void
}) {
  const id = useId()
  const [selected, setSelected] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const photoButtons = useRef<(HTMLButtonElement | null)[]>([])
  const [viewportRef, api] = useEmblaCarousel({
    align: "start",
    loop: true,
    duration: reducedMotion ? 0 : 28,
  })

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!api) return
    const update = () => setSelected(api.selectedScrollSnap())
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  const number = (value: number) => String(value).padStart(2, "0")

  return (
    <section
      id="portfolio"
      className={styles.section}
      aria-labelledby={`${id}-title`}
      aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (api && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
          event.preventDefault()
          const direction = event.key === "ArrowLeft" ? -1 : 1
          const next = (api.selectedScrollSnap() + direction + images.length) % images.length
          api.scrollTo(next)
          if (photoButtons.current.includes(event.target as HTMLButtonElement)) {
            photoButtons.current[next]?.focus({ preventScroll: true })
          }
        }
      }}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" /> The live experience</p>
            <h2 id={`${id}-title`} className={styles.title}>Portfolio <em>Highlights</em></h2>
          </div>
          <button type="button" className={styles.viewAll} onClick={onViewAll}>
            View all {images.length} photos <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </header>

        <p id={`${id}-instructions`} className="sr-only">
          Swipe or use the previous and next buttons to explore. Use the left and right arrow keys when focused in this gallery. Select a photo to open its full-size preview.
        </p>
        <div id={`${id}-slides`} ref={viewportRef} className={styles.viewport} aria-describedby={`${id}-instructions`}>
          <div className={styles.track}>
            {images.map((image, index) => (
              <div
                key={image.id}
                className={styles.slide}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${images.length}: ${image.alt}`}
              >
                <button
                  type="button"
                  ref={(node) => { photoButtons.current[index] = node }}
                  className={styles.card}
                  onClick={() => onOpenImage(index)}
                  aria-label={`Open photo ${index + 1}: ${image.alt}`}
                  tabIndex={index === selected ? 0 : -1}
                >
                  <div className={styles.photo}>
                    {/* Original portfolio assets; reserve their layout and defer offscreen downloads. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.src} alt={image.alt} width={1200} height={900} loading="lazy" decoding="async" draggable={false} />
                    <span className={styles.expand} aria-hidden="true"><Maximize2 size={18} /></span>
                    <span className={styles.photoLabel}>Legacy Live</span>
                  </div>
                  <span className={styles.caption}>
                    <span>{image.alt}</span>
                    <span className={styles.photoNumber} aria-hidden="true">{number(index + 1)}</span>
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.position}>
            <span className={styles.count} aria-live="polite" aria-atomic="true">
              <span>{number(selected + 1)}</span><span className={styles.divider}> / </span>{number(images.length)}
              <span className="sr-only"> — {images[selected]?.alt}</span>
            </span>
            <div className={styles.progress} aria-hidden="true">
              <span style={{ transform: `scaleX(${(selected + 1) / images.length})` }} />
            </div>
            <span className={styles.hint}><span className={styles.desktopHint}>Drag</span><span className={styles.mobileHint}>Swipe</span> to explore</span>
          </div>
          <div className={styles.controls}>
            <button type="button" onClick={() => api?.scrollPrev()} aria-label="Previous portfolio photo" aria-controls={`${id}-slides`} disabled={!api}>
              <ArrowLeft size={21} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => api?.scrollNext()} aria-label="Next portfolio photo" aria-controls={`${id}-slides`} disabled={!api}>
              <ArrowRight size={21} aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  )
}

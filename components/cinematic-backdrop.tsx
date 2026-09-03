import Image from "next/image"

export function CinematicBackdrop({
  imageSrc,
  videoSrc,
  alt,
  intensity = "default",
  objectPosition = "center",
}: {
  imageSrc: string
  videoSrc?: string
  alt: string
  intensity?: "default" | "deep" | "soft" | "light"
  objectPosition?: string
}) {
  const wash =
    intensity === "deep"
      ? "bg-black/40"
      : intensity === "soft"
        ? "bg-black/20"
        : intensity === "light"
          ? "bg-black/24"
          : "bg-black/30"
  const vignette =
    intensity === "deep"
      ? "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.38)_45%,rgba(0,0,0,0.55)_100%)]"
      : intensity === "soft"
        ? "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.62)_100%)]"
        : intensity === "light"
          ? "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.22)_50%,rgba(0,0,0,0.42)_100%)]"
          : "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.32)_48%,rgba(0,0,0,0.5)_100%)]"

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority
        className="object-cover animate-hero-drift"
        style={{ objectPosition }}
      />
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={imageSrc}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      <div className={`absolute inset-0 ${wash}`} />
      <div className={`absolute inset-0 ${vignette}`} />
    </div>
  )
}

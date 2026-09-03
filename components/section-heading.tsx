export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "center",
  tone = "ink",
}: {
  eyebrow?: string
  title: string
  description?: string
  as?: "h1" | "h2"
  align?: "center" | "left"
  tone?: "ink" | "rose"
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-pink-600">{eyebrow}</p>
      ) : null}
      <Tag
        className={`font-display text-4xl leading-tight md:text-5xl ${
          tone === "rose" ? "text-[#be185d]" : "text-gray-900"
        }`}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={`mt-4 text-lg text-gray-600 ${
            align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

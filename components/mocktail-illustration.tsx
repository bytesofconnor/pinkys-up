type GlassProps = {
  id: string
  animate?: boolean
}

export function BlushHourGlass({ id, animate = true }: GlassProps) {
  return (
    <svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden="true">
      <path d="M90 50 L90 350 L210 350 L210 50" stroke="#E2E8F0" strokeWidth="4" />
      <path d="M85 350 L215 350" stroke="#E2E8F0" strokeWidth="4" />
      <path d="M90 100 L210 100 L210 350 L90 350 Z" fill={`url(#${id}-blush)`} opacity="0.92" />
      <circle cx="120" cy="200" r="4" fill="white" opacity="0.6">
        {animate ? <animate attributeName="cy" from="300" to="150" dur="3s" repeatCount="indefinite" /> : null}
      </circle>
      <circle cx="150" cy="250" r="3" fill="white" opacity="0.6">
        {animate ? <animate attributeName="cy" from="300" to="150" dur="2.5s" repeatCount="indefinite" /> : null}
      </circle>
      <circle cx="180" cy="180" r="5" fill="white" opacity="0.6">
        {animate ? <animate attributeName="cy" from="300" to="150" dur="3.5s" repeatCount="indefinite" /> : null}
      </circle>
      <circle cx="135" cy="220" r="2.5" fill="white" opacity="0.5">
        {animate ? <animate attributeName="cy" from="310" to="160" dur="2.8s" repeatCount="indefinite" /> : null}
      </circle>
      <path d="M150 80 C130 70,170 70,150 90" stroke="#FB7185" strokeWidth="2" fill="#F43F5E" />
      <path d="M160 85 C140 75,180 75,160 95" stroke="#FDBA74" strokeWidth="2" fill="#F97316" />
      <path d="M140 70 L160 70 L150 90 Z" fill="#FB7185" />
      <defs>
        <linearGradient id={`${id}-blush`} x1="150" y1="100" x2="150" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="55%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function PlusOneGlass({ id, animate = true }: GlassProps) {
  return (
    <svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden="true">
      <path d="M150 320 L140 300 C110 290,90 240,90 200 C90 140,150 100,150 100 C150 100,210 140,210 200 C210 240,190 290,160 300 L150 320" stroke="#E2E8F0" strokeWidth="4" />
      <path d="M130 320 L170 320" stroke="#E2E8F0" strokeWidth="4" />
      <path d="M140 320 L140 350 L160 350 L160 320" stroke="#E2E8F0" strokeWidth="4" />
      <path d="M130 350 L170 350" stroke="#E2E8F0" strokeWidth="4" />
      <path d="M150 105 C150 105,205 142,205 198 C205 235,187 282,160 292 L150 298 C150 298,115 282,95 198 C95 142,150 105,150 105" fill={`url(#${id}-plus)`} opacity="0.95" />
      <g fill="white" opacity="0.85">
        <path d="M130 150 L133 145 L136 150 L133 155 Z">
          {animate ? <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" /> : null}
        </path>
        <path d="M170 160 L173 155 L176 160 L173 165 Z">
          {animate ? <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" /> : null}
        </path>
        <path d="M150 170 L153 165 L156 170 L153 175 Z">
          {animate ? <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" /> : null}
        </path>
        <path d="M118 200 L121 195 L124 200 L121 205 Z">
          {animate ? <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" /> : null}
        </path>
      </g>
      <circle cx="138" cy="92" r="6" fill="#BE185D" />
      <circle cx="152" cy="86" r="5" fill="#DB2777" />
      <circle cx="164" cy="94" r="4" fill="#F472B6" />
      <path d="M172 84 C186 68,198 90,180 98" stroke="#86EFAC" strokeWidth="2" fill="#4ADE80" />
      <defs>
        <linearGradient id={`${id}-plus`} x1="150" y1="105" x2="150" y2="298" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBCFE8" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#9D174D" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function MirrorballGlass({ id, animate = true }: GlassProps) {
  return (
    <svg viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden="true">
      <path d="M100 100 L200 100 L150 300 L140 300 L150 320 L160 320 L150 300 Z" stroke="#E2E8F0" strokeWidth="4" />
      <path d="M101 101 L199 101 L152 290 L148 290 Z" fill={`url(#${id}-mirror)`} opacity="0.92" />
      <g opacity="0.85">
        <circle cx="130" cy="150" r="2" fill="white">
          {animate ? <animate attributeName="opacity" values="1;0.25;1" dur="2s" repeatCount="indefinite" /> : null}
        </circle>
        <circle cx="170" cy="170" r="2" fill="#FDE68A">
          {animate ? <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" /> : null}
        </circle>
        <circle cx="150" cy="190" r="2" fill="white">
          {animate ? <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" /> : null}
        </circle>
        <circle cx="140" cy="210" r="1.5" fill="#F9A8D4">
          {animate ? <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" /> : null}
        </circle>
        <circle cx="175" cy="145" r="1.5" fill="white">
          {animate ? <animate attributeName="opacity" values="1;0.2;1" dur="2.2s" repeatCount="indefinite" /> : null}
        </circle>
      </g>
      <circle cx="140" cy="160" r="1" fill="white" opacity="0.65" />
      <circle cx="160" cy="180" r="1" fill="#FDE68A" opacity="0.65" />
      <circle cx="180" cy="140" r="1" fill="white" opacity="0.65" />
      <circle cx="120" cy="200" r="1" fill="#F9A8D4" opacity="0.65" />
      <path d="M100 100 L200 100" stroke="#F9A8D4" strokeWidth="6" strokeLinecap="round" />
      <defs>
        <linearGradient id={`${id}-mirror`} x1="150" y1="100" x2="150" y2="290" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F9A8D4" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const illustrations = {
  "Blush Hour": BlushHourGlass,
  "Plus One": PlusOneGlass,
  Mirrorball: MirrorballGlass,
} as const

export function MocktailIllustration({
  name,
  instanceId = name,
  animate = true,
}: {
  name: keyof typeof illustrations
  instanceId?: string
  animate?: boolean
}) {
  const Illustration = illustrations[name]
  return <Illustration id={instanceId.replace(/\s+/g, "-")} animate={animate} />
}

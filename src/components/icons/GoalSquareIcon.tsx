export const GoalSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="6" fill="url(#GoalSquareIcon)" />
    <g filter="url(#filter0_d_1498_22857)">
      <path
        d="M7.04005 11.1384V18M7.04005 6.39996H16.6401L14.0455 9.57405L16.4325 12.4307H7.04005V6.39996Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1498_22857"
        x="6.54005"
        y="5.89996"
        width="10.6"
        height="13.3"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.7" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1498_22857" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1498_22857" result="shape" />
      </filter>
      <linearGradient id="GoalSquareIcon" x1="13.44" y1="24" x2="13.44" y2="1.52741e-07" gradientUnits="userSpaceOnUse">
        <stop stopColor="#695CCD" />
        <stop offset="1" stopColor="#968DE2" />
      </linearGradient>
    </defs>
  </svg>
);

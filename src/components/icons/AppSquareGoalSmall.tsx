export const AppSquareGoalSmallIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="2" y="2" width="16" height="16" rx="4" fill="url(#AppSquareGoalSmallIcon)" />
    <g filter="url(#filter0_d_1499_22998)">
      <path
        d="M6 9.2679V14M6 6H13L11.1081 8.18903L12.8486 10.1592H6V6Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1499_22998"
        x="5.5"
        y="5.5"
        width="8"
        height="9.7"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1499_22998" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1499_22998" result="shape" />
      </filter>
      <linearGradient id="AppSquareGoalSmallIcon" x1="10.96" y1="18" x2="10.96" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#695CCD" />
        <stop offset="1" stopColor="#968DE2" />
      </linearGradient>
    </defs>
  </svg>
);

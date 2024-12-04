export const AppRoundGoalSmallIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="2" y="2" width="16" height="16" rx="8" fill="url(#AppRoundGoalSmallIcon)" />
    <g filter="url(#filter0_d_10664_19600)">
      <path
        d="M7 9.60973V14.3418M7 6.34183H14L12.1081 8.53085L13.8486 10.501H7V6.34183Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_10664_19600"
        x="6.5"
        y="5.8418"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10664_19600" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10664_19600" result="shape" />
      </filter>
      <linearGradient id="AppRoundGoalSmallIcon" x1="10.96" y1="18" x2="10.96" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#695CCD" />
        <stop offset="1" stopColor="#968DE2" />
      </linearGradient>
    </defs>
  </svg>
);

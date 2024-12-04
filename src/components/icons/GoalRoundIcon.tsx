export const GoalRoundIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
    <rect x="0.5" width="24" height="24" rx="12" fill="url(#GoalRoundIcon)" />
    <mask
      id="mask0_1805_23835"
      style={{ maskType: 'luminance' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="25"
      height="24"
    >
      <rect x="0.5" width="24" height="24" rx="12" fill="white" />
    </mask>
    <g mask="url(#mask0_1805_23835)" />
    <g filter="url(#filter0_d_1805_23835)">
      <path
        d="M7.7 11.2V18.0615M7.7 6.46155H17.3L14.7054 9.63564L17.0924 12.4923H7.7V6.46155Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1805_23835"
        x="7.2"
        y="5.96155"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1805_23835" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1805_23835" result="shape" />
      </filter>
      <linearGradient id="GoalRoundIcon" x1="13.94" y1="24" x2="13.94" y2="1.52741e-07" gradientUnits="userSpaceOnUse">
        <stop stopColor="#695CCD" />
        <stop offset="1" stopColor="#968DE2" />
      </linearGradient>
    </defs>
  </svg>
);

export const AppRoundNoteSmallIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="2" y="2" width="16.0001" height="16.0001" rx="8.00003" fill="url(#AppRoundNoteSmallIcon)" />
    <g filter="url(#filter0_d_10664_17699)">
      <path
        d="M13 7H7.01272H7M13 9.93617H7.01272H7M13 13H7.01272H7"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_10664_17699"
        x="6.5"
        y="6.5"
        width="7"
        height="7.7"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10664_17699" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10664_17699" result="shape" />
      </filter>
      <linearGradient
        id="AppRoundNoteSmallIcon"
        x1="7.60002"
        y1="2"
        x2="7.86669"
        y2="18.0001"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#65A1FE" />
        <stop offset="1" stopColor="#2078FE" />
      </linearGradient>
    </defs>
  </svg>
);

export const AppRoundSurveySmallIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="2" y="2" width="16" height="16" rx="8" fill="url(#AppRoundSurveySmallIcon)" />
    <g filter="url(#filter0_d_10664_27608)">
      <path
        d="M10 6V10M10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6ZM10 10L6.40181 11.7494M10 10L13.5982 11.7494"
        stroke="white"
        strokeLinecap="round"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_10664_27608"
        x="5.5"
        y="5.5"
        width="9"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10664_27608" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10664_27608" result="shape" />
      </filter>
      <linearGradient
        id="AppRoundSurveySmallIcon"
        x1="10.2133"
        y1="1.2"
        x2="9.41335"
        y2="18"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F9ABDE" />
        <stop offset="1" stopColor="#D877B7" />
      </linearGradient>
    </defs>
  </svg>
);

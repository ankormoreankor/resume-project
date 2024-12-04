export const NoteSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="24" height="24" rx="6" fill="url(#paint0_linear_1498_22848)" />
    <g filter="url(#filter0_d_1498_22848)">
      <path
        d="M16.8 7.59998H7.22035H7.2M16.8 11.9064H7.22035H7.2M16.8 16.4H7.22035H7.2"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_1498_22848"
        x="6.7"
        y="7.09998"
        width="10.6"
        height="10.5"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1498_22848" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1498_22848" result="shape" />
      </filter>
      <linearGradient
        id="paint0_linear_1498_22848"
        x1="8.4"
        y1="-7.04825e-08"
        x2="8.8"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#65A1FE" />
        <stop offset="1" stopColor="#2078FE" />
      </linearGradient>
    </defs>
  </svg>
);

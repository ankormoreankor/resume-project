export const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="#F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      vectorEffect="non-scaling-stroke"
      d="M22.5 12a10.5 10.5 0 1 1-21 0 10.5 10.5 0 0 1 21 0h0Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      vectorEffect="non-scaling-stroke"
      d="M12 1.5A10.5 10.5 0 0 1 22.5 12"
    />
  </svg>
);

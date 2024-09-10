import { SVGProps } from "react";

export function CarbonFitToScreen(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M22 16h2V8h-8v2h6v6zM8 24h8v-2h-6v-6H8v8z"
      ></path>
      <path
        fill="currentColor"
        d="M26 28H6a2.002 2.002 0 0 1-2-2V6a2.002 2.002 0 0 1 2-2h20a2.002 2.002 0 0 1 2 2v20a2.002 2.002 0 0 1-2 2ZM6 6v20h20.001L26 6Z"
      ></path>
    </svg>
  );
}
/* eslint-disable react/no-unknown-property -- ignore the tw prop */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Callum Flack";
  const description = searchParams.get("description") || "Callum Flack";

  const fontData = await fetch(
    new URL(
      // "../../../packages/ui/src/fonts/neue-haas-unica-pro-medium.ttf",
      "./neue-haas-unica-pro-medium.ttf",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full justify-end bg-gray-200 relative">
        {/* <div tw="flex justify-end px-12 py-7">
          <img
            height="128"
            src="https://github.com/callumflack.png"
            style={{
              borderRadius: 64,
            }}
            width="128"
          />
        </div> */}
        <div tw="flex flex-col w-[93%] px-12 py-7">
          <h2 tw="text-4xl font-medium tracking-tight">{title}</h2>
          <p tw="text-4xl font-medium text-[#777] leading-[1.1]">
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "unica",
          data: fontData,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}

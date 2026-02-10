import { ImageResponse } from "next/og";
import BrandIcon from "../brand-icon";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <BrandIcon />,
    {
      width: 512,
      height: 512,
    }
  );
}

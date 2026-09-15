import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Omnia Osama | Full-Stack Web Developer";
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return createOgImage();
}

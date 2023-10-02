import { isWebPSupported } from "./webp";

interface IFitOptions {
  w?: number;
  h?: number;
  format?: string;
}

export type ImageFormat = "webp" | "jpeg" | "png";

export function fit(imageUrl: string | undefined, options: IFitOptions) {
  if (!imageUrl) return "";
  if (!options?.format && isWebPSupported()) {
    options = options || {};
    options.format = "webp";
  }
  const searchParams = new URLSearchParams();
  Object.entries(options).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });
  if (imageUrl.includes("?")) {
    return `${imageUrl}&${searchParams.toString()}`;
  }
  return `${imageUrl}?${searchParams.toString()}`;
}

export function fitToWidth(imageUrl: string | undefined, w: number, format?: ImageFormat) {
  return fit(imageUrl, { w, format });
}

export function fitToHeight(imageUrl: string | undefined, h: number, format?: ImageFormat) {
  return fit(imageUrl, { h, format });
}

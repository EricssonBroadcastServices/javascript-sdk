export enum CarouselLayout {
  CAROUSEL = "carousel",
  GRID = "grid",
  LIST = "list"
}

export enum CarouselImageOrientation {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait"
}

export interface IWLReference {
  internalUrl: string;
  id: string;
  authorized: boolean;
  type: string;
  presentation: {
    imageOrientation: CarouselImageOrientation;
    layout: CarouselLayout;
  };
}

import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Wallpaper {
  readonly id: string;
  readonly wallpaperID?: string;
  readonly isOrignal: string;
  readonly cost: string;
  readonly imageUrlIphone: string;
  readonly imageUrlIpad: string;
  readonly walllistID: string;
  constructor(init: ModelInit<Wallpaper>);
  static copyOf(source: Wallpaper, mutator: (draft: MutableModel<Wallpaper>) => MutableModel<Wallpaper> | void): Wallpaper;
}

export declare class WallList {
  readonly id: string;
  readonly title?: string;
  readonly order?: number;
  readonly Wallpapers?: Wallpaper[];
  constructor(init: ModelInit<WallList>);
  static copyOf(source: WallList, mutator: (draft: MutableModel<WallList>) => MutableModel<WallList> | void): WallList;
}
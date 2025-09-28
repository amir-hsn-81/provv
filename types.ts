
export enum ClothingCategory {
  TOPS = 'Tops',
  BOTTOMS = 'Bottoms',
}

export interface ClothingItemType {
  id: number;
  name: string;
  src: string;
  type: ClothingCategory;
}


import type { ClothingItemType } from './types';
import { ClothingCategory } from './types';

export const CLOTHING_ITEMS: ClothingItemType[] = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    src: 'https://i.imgur.com/k22gGz6.png', // Transparent PNG
    type: ClothingCategory.TOPS,
  },
  {
    id: 2,
    name: 'Black Crewneck T-Shirt',
    src: 'https://i.imgur.com/QeP5L2W.png', // Transparent PNG
    type: ClothingCategory.TOPS,
  },
  {
    id: 3,
    name: 'Red Hoodie',
    src: 'https://i.imgur.com/8Mrrc2c.png', // Transparent PNG
    type: ClothingCategory.TOPS,
  },
   {
    id: 4,
    name: 'Leather Jacket',
    src: 'https://i.imgur.com/s6n5J5g.png', // Transparent PNG
    type: ClothingCategory.TOPS,
  },
  {
    id: 5,
    name: 'Classic Blue Jeans',
    src: 'https://i.imgur.com/cWkdS83.png', // Transparent PNG
    type: ClothingCategory.BOTTOMS,
  },
  {
    id: 6,
    name: 'Gray Sweatpants',
    src: 'https://i.imgur.com/w2xAaTy.png', // Transparent PNG
    type: ClothingCategory.BOTTOMS,
  },
    {
    id: 7,
    name: 'Khaki Chinos',
    src: 'https://i.imgur.com/jB1tEwv.png', // Transparent PNG
    type: ClothingCategory.BOTTOMS,
  },
];

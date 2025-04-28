export interface Menu {
  menuId: number;
  name: string;
  description: string;
  active: boolean;
}

export interface MenuItem {
  itemId: number;
  name: string;
  description: string;
  price: number;
  itemQuantity: number;
  seasonal: boolean;
  menu?: Menu;
} 
import { MenuItem } from '../types/menu';

export const mockMenuItems: MenuItem[] = [
  {
    itemId: 1,
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with tender chicken pieces, aromatic spices, and herbs.',
    price: 12.99,
    itemQuantity: 1,
    seasonal: false,
    menu: {
      menuId: 1,
      name: 'Main Course',
      description: 'Our signature biryani dishes',
      active: true
    }
  },
  {
    itemId: 2,
    name: 'Vegetable Biryani',
    description: 'Aromatic basmati rice cooked with fresh vegetables and Indian spices.',
    price: 10.99,
    itemQuantity: 1,
    seasonal: false,
    menu: {
      menuId: 1,
      name: 'Main Course',
      description: 'Our signature biryani dishes',
      active: true
    }
  },
  {
    itemId: 3,
    name: 'Mutton Biryani',
    description: 'Tender mutton pieces cooked with fragrant basmati rice and special biryani spices.',
    price: 14.99,
    itemQuantity: 1,
    seasonal: false,
    menu: {
      menuId: 1,
      name: 'Main Course',
      description: 'Our signature biryani dishes',
      active: true
    }
  },
  {
    itemId: 4,
    name: 'Paneer Biryani',
    description: 'Cottage cheese biryani with aromatic spices and herbs.',
    price: 11.99,
    itemQuantity: 1,
    seasonal: false,
    menu: {
      menuId: 1,
      name: 'Main Course',
      description: 'Our signature biryani dishes',
      active: true
    }
  },
  {
    itemId: 5,
    name: 'Chicken Tikka',
    description: 'Tender chicken pieces marinated in spices and grilled to perfection.',
    price: 9.99,
    itemQuantity: 1,
    seasonal: false,
    menu: {
      menuId: 2,
      name: 'Appetizers',
      description: 'Start your meal with our delicious appetizers',
      active: true
    }
  },
  {
    itemId: 6,
    name: 'Vegetable Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas.',
    price: 4.99,
    itemQuantity: 1,
    seasonal: false,
    menu: {
      menuId: 2,
      name: 'Appetizers',
      description: 'Start your meal with our delicious appetizers',
      active: true
    }
  }
]; 
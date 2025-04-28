export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerId: number;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  note?: string;
} 
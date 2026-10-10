export interface Order {
    userId: string;
    id: string;
    orderNumber: string;
    customerId: string;
    type: string;
    status: string;
    itemCount: number;
    total: number;
    createdAt: string;
}
      
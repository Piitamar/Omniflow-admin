export interface DashboardState {
    userId: string;
    totalRevenue: number;
    revenueChange: number;
    ordersChange: number;
    totalOrders: number;
    conversionRate: number;
    conversionChange: number;
    activeUsers: number;
    activeUsersChange: number;
    grossRevenue: number;
    netRevenue: number;
    totalSales: number;
    categories: {
        id: string;
        category: string;
        percentage: number;
    }[],
    recentOrders: {
        id: string;
        userId: string;
        customer: string;
        type: string;
        date: string;
        amount: number;
        status: string;
    }[]
} 
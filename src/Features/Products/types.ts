export interface Product {
  sku: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  status: "active" | "inactive";
  createdAt: string;
}

export interface ProductPageProps {
  products: Product[];
  totalProducts: number;
  activeProducts: number;
  stockProducts: number;
  outOfStockProducts: number;
  selectedProduct: Product | null;
  addProduct: (product: Product) => void;
  isOpenProductModal: boolean;
}


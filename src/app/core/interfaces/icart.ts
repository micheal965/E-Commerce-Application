export interface Icart {
    _id: string;
    cartOwner: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}

interface Product {
    count: number;
    _id: string;
    product: ProductDetails;
    price: number;
}

interface ProductDetails {
    subcategory: Subcategory[];
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Category;
    ratingsAverage: number;
    id: string;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}
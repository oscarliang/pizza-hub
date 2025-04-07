// Export all data from sub-modules
export * from './categories';
export * from './products';
export * from './deals';
export * from './users';

/**
 * This file serves as a central export point for all mock data.
 * 
 * In a real application, these modules would be replaced with API calls to fetch
 * data from a backend server. The interface definitions would remain the same,
 * making the transition from mock data to real API relatively seamless.
 * 
 * Example of how this would be used with a real API:
 * 
 * // Before (with mock data):
 * import { products } from '@/app/data';
 * 
 * // After (with real API):
 * import { fetchProducts } from '@/app/api/products';
 * 
 * // The component would change from:
 * const product = products[id];
 * 
 * // To:
 * const [product, setProduct] = useState(null);
 * useEffect(() => {
 *   async function loadProduct() {
 *     const data = await fetchProduct(id);
 *     setProduct(data);
 *   }
 *   loadProduct();
 * }, [id]);
 */ 
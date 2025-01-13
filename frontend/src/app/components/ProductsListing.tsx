import Link from "next/link";
import { Product } from "@/lib/products";
import { BACKEND_API_URL } from "@/lib/constants";

export async function ProductListing() {
  const response = await fetch(`${BACKEND_API_URL}/products`, {
    headers: {
      Authorization: `Bearer todo_token`,
    },
  });
  const data = await response.json();

  return (
    <ul className="space-y-4">
      {data?.length === 0 && <li>No products found</li>}
      {data.map((product: Product) => (
        <li key={product.id} className="bg-white shadow rounded-lg p-4">
          <Link
            href={`/products/${product.id}`}
            className="text-blue-600 hover:underline"
          >
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

import { memo } from "react";
import { useProduct } from "../hooks/useProducts";
import { BACKEND_API_URL } from "@/lib/constants";

/*
  * This is a sample component that fetches product details.
  * This component is used to demonstrate the use of useProduct hook in CSR.
  */

function ProductDetails({ id }: { id: string }) {
  const { data, isLoading, error } = useProduct(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product</div>;
  }

  if (!data) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
      <p className="text-xl mb-6">Price: ${data.price}</p>
    </>
  );
}
export default memo(ProductDetails);

/*
  * This is a sample static component that fetches product details.
  * This component is used to demonstrate the use of ProductDetailsStatic in SSR specially for SEO purpose.
  */
export async function ProductDetailsStatic({ id }: { id: string }) {
  const response = await fetch(`${BACKEND_API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });
  const data = await response.json();

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
      <p className="text-xl mb-6">Price: ${data.price}</p>
    </>
  );
}

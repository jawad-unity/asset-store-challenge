import Link from "next/link";
import { ProductDetailsStatic } from "@/app/components/ProductDetails";

export default async function ProductPage(props: any) {
  const { id } = await props.params;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailsStatic id={id} />
      <Link href="/" className="text-blue-600 hover:underline">
        Back to product listing
      </Link>
    </div>
  );
}

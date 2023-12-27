"use client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/helpers/utils";
interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
}
const Card = ({ product }: { product: ProductType }) => {
  return (
    <>
      <Link
        key={product.id}
        legacyBehavior
        passHref
        href={`/product-details/${product.id}`}
      >
        <a className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <Image
              src={product?.image}
              width={500}
              height={500}
              alt="Picture of the author"
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </a>
      </Link>
    </>
  );
};

export default Card;

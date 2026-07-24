"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Heart } from "lucide-react";

import { Product } from "@/types/products";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";

import { addToCart } from "@/store/slices/cartSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();

  const wishlishItems = useSelector((state: RootState) => state.wishlist.items);

  const isWishlisted = wishlishItems.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="border rounded-lg p-3 hover:shadow-lg">
      <div className="flex justify-end">
        <button onClick={toggleWishlist}>
          <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <Link href={`/products/${product.id}`}>
        <div className="overflow-hidden rounded-lg border bg-white hover:shadow-lg transition cursor-pointer">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={300}
            height={300}
            className="h-48 w-full object-cover"
          ></Image>
          <div className="p-3">
            <h3 className="line-clamp-2 text-sm text-black">{product.name}</h3>

            <div className="mt-2">
              <span className="font-bold text-pink-600">৳ {product.price}</span>

              {/* {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ৳ {product.originalPrice}
              </span>
            )} */}
            </div>

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              {/* <span>⭐ {product.rating}</span>

            <span>{product.sold} sold</span> */}
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-2 w-full rounded bg-black text-white cursor-pointer"
      >
        Add To Cart
      </button>
    </div>
  );
}

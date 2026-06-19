import Image from "next/image";
import { Product } from "@/types/product";

type Props = {
  image: string;
  name: string;
};

export default function ProductGallery({ image, name }: Props) {
  return (
    <div>
      <Image
        src={image}
        alt={name}
        width={500}
        height={500}
        className="rounded-lg"
      ></Image>
    </div>
  );
}

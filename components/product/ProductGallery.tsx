import Image from "next/image";
import { Product } from "@/types/product";

type Props = {
  image: string;
  title: string;
};

export default function ProductGallery({ image, title }: Props) {
  return (
    <div>
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="rounded-lg"
      ></Image>
    </div>
  );
}

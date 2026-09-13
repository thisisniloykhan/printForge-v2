import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import Pill from "./Pill";
import { ModelCardProps } from "@/app/types";
import heroImageSquare from "@/../public/hero-image-square.png";

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Link
      href={`/3d-models/${model.id}`}
      className="block group hover:shadow-[0_5px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.75 transition-all"
      aria-labelledby={`model-${model.id}-title`}
    >
      <div
        className="overflow-hidden transition-shadow bg-card rounded-lg shadow-md hover:shadow-lg"
        role="article"
      >
        <div className="relative aspect-square ">
          <Image
            src={heroImageSquare}
            alt={model.name}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between mb-2 min-h-14">
            <h2
              id={`model-${model.id}-title`}
              className="text-xl font-semibold line-clamp-2 text-highlight-tertiary"
            >
              {model.name}
            </h2>
          </div>
          <p className="text-sm line-clamp-2 min-h-10 leading-5">
            {model.description}
          </p>
          <div className="mt-2">
            <Pill>{model.category}</Pill>
          </div>
          <div
            className="flex items-center mt-2 "
            aria-label={`${model.likes} likes`}
          >
            <FaRegHeart className="w-5 h-5 mr-1" aria-hidden="true" />
            <span>{model.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

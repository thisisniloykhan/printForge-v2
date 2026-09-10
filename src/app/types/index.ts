import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import type Link from "next/link";

// Data Types
export type Model = {
  id: number;
  name: string;
  description: string;
  likes: number;
  image: string;
  category: string;
  dateAdded: string;
};

export type ModelDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// Components Types
export type ModelsPageProps = {
  searchParams: {
    query?: string;
  };
};
export type ModelCardProps = {
  model: Model;
};

export type ModelsGridProps = {
  title: string;
  models: Model[];
};

export type PillProps = {
  children: ReactNode;
  className?: string;
};

export type GetModelsParams = {
  category?: string;
};

//category types

export type Category = {
  displayName: string;
  slug: string;
};

export type CategoriesData = {
  categories: Category[];
};

export type NavLinkProps = {
  href: string;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  ref?: Ref<HTMLAnchorElement>;
} & Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "children" | "className"
>;

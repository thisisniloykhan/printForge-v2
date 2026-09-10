import categories from "@/app/data/categories.json";
import type { Category } from "../types";

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const category: Category | undefined = categories.find(
    (c) => c.slug === slug,
  );

  return category;
}

export function getDisplayNameFromSlug(slug: string): string {
  const category: Category | undefined = getCategoryBySlug(slug);
  if (!category) {
    return "";
  }
  return category.displayName;
}

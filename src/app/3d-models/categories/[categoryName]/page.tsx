import { notFound } from "next/navigation";
import type { JSX } from "react";
import { getCategoryBySlug } from "@/app/lib/categories";
import { getModels } from "@/app/lib/models";
import type { Category } from "@/app/types";
import ModelsGrid from "@/app/components/ModelsGrid";

type CategoryPageProps = {
  params: Promise<{ categoryName: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps): Promise<JSX.Element> {
  const { categoryName } = await params;
  const category: Category | undefined = getCategoryBySlug(categoryName);
  if (!category) notFound();
  const models = await getModels({
    category: category.slug,
  });
  return (
    <>
      <ModelsGrid models={models} title={category.displayName} />
    </>
  );
}

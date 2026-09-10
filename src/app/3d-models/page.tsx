import { JSX } from "react";
import { getModels, getModelsByQuery } from "@/app/lib/models";
import type { Model, ModelsPageProps } from "@/app/types";
import ModelsGrid from "../components/ModelsGrid";
import ModelsSearch from "../components/ModelsSearch";

export default async function ModelsPage({
  searchParams,
}: ModelsPageProps): Promise<JSX.Element> {
  const query = (await searchParams)?.query?.toLowerCase() || "";
  const filteredModels: Model[] = query
    ? await getModelsByQuery(query)
    : await getModels();

  return (
    <>
      <div className="container px-2 xs:px-4 sm:px-6 md:px-8 py-8 mx-auto">
        <ModelsSearch query={query} />
      </div>

      <ModelsGrid title="3D Models" models={filteredModels} />
    </>
  );
}

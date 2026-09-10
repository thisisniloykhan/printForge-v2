import modelsData from "../data/models.json";
import type { Model, GetModelsParams } from "../types";

export async function getModels({ category }: GetModelsParams = {}): Promise<
  Model[]
> {
  let filteredModels: Model[] = [...modelsData];
  if (category) {
    filteredModels = modelsData.filter(
      (model: Model) => model.category === category,
    );
  }
  return filteredModels;
}

export async function getModelsByQuery(query: string): Promise<Model[]> {
  const filteredModels = modelsData.filter(
    (model: Model) =>
      model.name.toLowerCase().includes(query) ||
      model.category.toLowerCase().includes(query) ||
      model.description.toLowerCase().includes(query),
  );

  return filteredModels.length > 0 ? filteredModels : [];
}

export async function getModelById(
  id: string | number,
): Promise<Model | undefined> {
  // These functions don't technically need to be async functions,
  // but we're planning for the future when they'll be fetching
  // from a real data source.
  const foundModel: Model | undefined = modelsData.find(
    (model: Model) => model.id.toString() === id.toString(),
  );
  if (!foundModel) {
    return;
  }
  return foundModel;
}

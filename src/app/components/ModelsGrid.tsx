import ModelCard from "@/app/components/ModelCard";
import { ModelsGridProps, Model } from "@/app/types";

export default function ModelsGrid({ title, models }: ModelsGridProps) {
  return (
    <div className="container px-2 xs:px-4 sm:px-6 md:px-8 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-highlight-primary">
        {title}
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {models.length > 0 ? (
          models.map((model: Model) => (
            <ModelCard key={model.id} model={model} />
          ))
        ) : (
          <h2 className="text-2xl font-semibold text-destructive">
            Model not found!
          </h2>
        )}
      </div>
    </div>
  );
}

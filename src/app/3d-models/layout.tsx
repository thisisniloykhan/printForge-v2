import ModelsCategoriesNavbar from "../components/3dModelsNav";

export default function RootLayout({ children }: LayoutProps<"/3d-models">) {
  return (
    <div className="relative flex flex-col min-h-0 flex-1 md:flex-row">
      <ModelsCategoriesNavbar />
      <main className="flex flex-col flex-1 py-4 md:ml-64 md:border-l">
        {children}
      </main>
    </div>
  );
}

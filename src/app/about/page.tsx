import type { JSX } from "react";
import Image from "next/image";
import heroImageSquare from "@/../public/hero-image-square.png";

export default function AboutPage(): JSX.Element {
  return (
    <>
      <main className="min-h-dvh mx-auto md:p-3 flex flex-col justify-between items-center gap-6 max-w-7xl ">
        <section className="p-3 flex flex-col gap-1.5 md:gap-8 md:flex-row ">
          <h1 className="text-2xl font-bold text-highlight-tertiary  md:hidden">
            About PrintForge
          </h1>
          <div className="py-3 flex flex-col gap-2 md:flex-row md:justify-center md:gap-8 ">
            <div className="max-w-125 ">
              <Image
                src={heroImageSquare}
                alt="hero-image-square"
                className="rounded"
                priority
              />
            </div>

            <div className="h-full md:max-w-1/2 md:py-4 md:px-6 flex flex-col flex-1 gap-4 ">
              <p
                className="hidden md:block text-sm text-secondary-foreground uppercase"
                aria-hidden="true"
              >
                About PrintForge
              </p>
              <h2 className="text-2xl font-bold sm:text-4xl text-highlight-primary">
                Empowering Makers Worldwide
              </h2>
              <p className="md:block md:text-lg text-secondary-foreground">
                Founded in 2023, PrintForge has quickly become the go-to
                platform for 3D printing enthusiasts, makers, and professional
                designers to share and discover amazing STL files for 3D
                printing.
              </p>
              <p>
                Our mission is to foster a vibrant community where creativity
                meets technology, enabling anyone to bring their ideas to life
                through 3D printing.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-foreground w-full" aria-hidden="true" />

        <section className="px-3 py-12" aria-labelledby="key-features">
          <div>
            <h2 className="sr-only">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-4">
              <article className="md:p-6 border-border ">
                <h3 className="font-bold text-xl text-destructive">
                  100K+ Models
                </h3>
                <p className="text-secondary-foreground">
                  Access our vast library of community-created 3D models, from
                  practical tools to artistic creations.
                </p>
              </article>
              <article className="md:border-x border-border md:p-6">
                <h3 className="font-bold text-xl text-destructive">
                  Active Community
                </h3>
                <p className=" text-secondary-foreground">
                  Join thousands of makers who share tips, provide feedback, and
                  collaborate on projects.
                </p>
              </article>
              <article className="md:p-6 border-border">
                <h3 className="font-bold text-xl text-destructive">
                  Free to Use
                </h3>
                <p className="text-secondary-foreground">
                  Most models are free to download, with optional premium
                  features for power users.
                </p>
              </article>
            </div>
          </div>
        </section>

        <hr className="border-gray-400 w-full" aria-hidden="true" />

        <section className="p-3">
          <div className="py-4 md:p-4 flex flex-col flex-1 gap-4 ">
            <h2 className="text-2xl font-bold text-highlight-tertiary">
              Our Vision
            </h2>
            <p className="md:block md:text-lg text-secondary-foreground">
              At PrintForge, we believe that 3D printing is revolutionizing the
              way we create, prototype, and manufacture. Our platform serves as
              a bridge between designers and makers, enabling the sharing of
              knowledge and creativity that pushes the boundaries of what's
              possible with 3D printing.
            </p>
            <p className="md:block md:text-lg text-secondary-foreground">
              Whether you're a hobbyist looking for your next weekend project,
              an educator seeking teaching materials, or a professional designer
              wanting to share your creations, PrintForge provides the tools and
              community to support your journey in 3D printing.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

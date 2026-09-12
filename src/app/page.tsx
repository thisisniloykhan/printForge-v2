import type { JSX } from "react";
import Image from "next/image";
import NavLink from "./components/NavLink";
import heroImage from "@/../public/hero-image.png";

export default function Home(): JSX.Element {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col-reverse items-start justify-between gap-8 px-6 py-12 mx-auto md:flex-row md:justify-center max-w-7xl ">
          <div className="flex-1 space-y-6 ">
            <p className="hidden text-sm text-muted-foreground uppercase md:block">
              your go to platform for 3d printing file
            </p>
            <h1 className="text-2xl font-bold xxs:text-3xl xs:text-4xl ">
              Discover what's possible with <br />
              <span className="text-highlight-secondary"> 3D printing</span>
            </h1>
            <h1 className="text-2xl font-bold xxs:text-3xl xs:text-4xl ">
              Discover what's possible with <br />
              <span className="text-highlight-primary"> 3D printing</span>
            </h1>
            <h1 className="text-2xl font-bold xxs:text-3xl xs:text-4xl ">
              Discover what's possible with <br />
              <span className="text-highlight-tertiary"> 3D printing</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Join our community of creators and explore a vast library of
              user-submitted models
            </p>

            <div className="flex gap-4">
              <NavLink
                href="/3d-models"
                className="px-6 py-3 text-foreground transition
                font-semibold
                duration-100 bg-background border-2 border-foreground hover:bg-foreground hover:text-highlight-primary"
              >
                BROWSE MODELS
              </NavLink>
            </div>
          </div>
          <div className=" xs:max-w-125 md:max-w-100 ">
            <Image src={heroImage} alt="hero-img" priority />
          </div>
        </section>
      </main>
    </>
  );
}
